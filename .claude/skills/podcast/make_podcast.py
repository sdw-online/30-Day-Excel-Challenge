#!/usr/bin/env python3
"""
Local NotebookLM-style podcast renderer.

Turns a two-host dialogue script into a single audio file using Kokoro,
an open-weight text-to-speech model that runs entirely on your machine
(CPU is fine, no API keys, no uploads).

Script format (Markdown or plain text), one turn per line:

    ALEX: So today we're digging into XLOOKUP.
    SAM: Which, honestly, is the function that finally killed VLOOKUP for me.
    ALEX: [laughs] Bold claim. Let's earn it.

- Any `NAME:` prefix works; each distinct name gets its own voice.
- Lines without a `NAME:` prefix continue the previous speaker's turn.
- Headings (#), blank lines, and HTML comments are ignored.
- Bracketed stage directions like [laughs] or (pause) are stripped.

Usage:
    python make_podcast.py script.md --check     # balance report only, no audio
    python make_podcast.py script.md             # writes script.mp3 next to it
    python make_podcast.py script.md --voices "ALEX=bm_george,SAM=bf_emma" --lang en-gb
    python make_podcast.py --list-voices
"""

import argparse
import re
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

MODEL_BASE_URL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0"
MODEL_FILES = ["kokoro-v1.0.onnx", "voices-v1.0.bin"]
DEFAULT_MODEL_DIR = Path.home() / ".cache" / "local-podcast"

# Voices handed out in order to speakers that aren't given one explicitly.
# Alternating male/female keeps the two hosts easy to tell apart.
DEFAULT_VOICE_ROTATION = ["am_michael", "af_heart", "bm_george", "bf_emma"]

SAMPLE_RATE = 24000
PAUSE_SAME_SPEAKER = 0.25  # seconds between chunks of one speaker's turn
PAUSE_SPEAKER_CHANGE = 0.45  # seconds when the other host picks up
PAUSE_QUICK_REACTION = 0.15  # seconds around a short "Right." or "Wait, what?"
QUICK_REACTION_WORDS = 4

TURN_RE = re.compile(r"^\s*\**([A-Za-z][\w .'-]{0,30}?)\**\s*:\s*(.+)$")
STAGE_DIRECTION_RE = re.compile(r"\[[^\]]*\]|\((?:laughs?|pause|beat|chuckles?|sighs?)[^)]*\)", re.I)
MARKDOWN_RE = re.compile(r"[*_`]+")


def parse_script(text):
    """Return a list of (speaker, line) turns."""
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    turns = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or line == "---":
            continue
        match = TURN_RE.match(line)
        if match:
            speaker, spoken = match.group(1).strip().upper(), match.group(2)
        elif turns:
            speaker, spoken = turns[-1][0], line
        else:
            continue  # preamble before the first speaker tag
        spoken = MARKDOWN_RE.sub("", STAGE_DIRECTION_RE.sub("", spoken))
        spoken = re.sub(r"\s+", " ", spoken).strip()
        if not spoken:
            continue
        if turns and turns[-1][0] == speaker and not match:
            turns[-1] = (speaker, f"{turns[-1][1]} {spoken}")
        else:
            turns.append((speaker, spoken))
    return turns


def balance_report(turns):
    """Print per-host stats and return warnings if one host dominates."""
    stats = {}
    for speaker, line in turns:
        s = stats.setdefault(speaker, {"turns": 0, "words": 0, "questions": 0})
        s["turns"] += 1
        s["words"] += len(line.split())
        s["questions"] += line.count("?")
    total_words = sum(s["words"] for s in stats.values())
    total_questions = sum(s["questions"] for s in stats.values())
    for speaker, s in stats.items():
        print(f"  {speaker:<10} {s['turns']:>3} turns  {s['words']:>5} words  {s['questions']:>3} questions")
    print(f"  ~{total_words / 150:.1f} min of speech")

    warnings = []
    if len(stats) < 2:
        warnings.append("Only one speaker found. Is the NAME: format right?")
    for speaker, s in stats.items():
        if len(stats) == 2 and total_questions >= 4 and s["questions"] / total_questions < 0.3:
            warnings.append(f"{speaker} asks only {s['questions']} of {total_questions} questions. Let both hosts ask.")
        if len(stats) == 2 and s["words"] / total_words > 0.65:
            warnings.append(f"{speaker} speaks {s['words'] * 100 // total_words}% of the words. Share the explaining.")
    for w in warnings:
        print(f"  WARNING: {w}")
    return warnings


def ensure_models(model_dir):
    model_dir.mkdir(parents=True, exist_ok=True)
    for name in MODEL_FILES:
        target = model_dir / name
        if target.exists():
            continue
        print(f"Downloading {name} (one-time, ~350 MB total) -> {target}")
        tmp = target.with_suffix(target.suffix + ".part")
        urllib.request.urlretrieve(f"{MODEL_BASE_URL}/{name}", tmp)
        tmp.rename(target)
    return model_dir / MODEL_FILES[0], model_dir / MODEL_FILES[1]


def assign_voices(speakers, overrides):
    voices, rotation = {}, [v for v in DEFAULT_VOICE_ROTATION if v not in overrides.values()]
    for speaker in speakers:
        voices[speaker] = overrides.get(speaker) or rotation[len(voices) % len(rotation)]
    return voices


def parse_voice_overrides(spec):
    overrides = {}
    for pair in filter(None, (p.strip() for p in (spec or "").split(","))):
        name, _, voice = pair.partition("=")
        if not voice:
            sys.exit(f"--voices entry '{pair}' must look like NAME=voice_id")
        overrides[name.strip().upper()] = voice.strip()
    return overrides


def export(audio, out_path):
    import soundfile as sf

    out_path.parent.mkdir(parents=True, exist_ok=True)
    if out_path.suffix.lower() == ".wav":
        sf.write(out_path, audio, SAMPLE_RATE)
        return out_path
    wav_path = out_path.with_suffix(".wav")
    sf.write(wav_path, audio, SAMPLE_RATE)
    if not shutil.which("ffmpeg"):
        print("ffmpeg not found, so keeping the WAV instead of MP3.")
        return wav_path
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav_path), "-b:a", "128k", str(out_path)],
        check=True,
    )
    wav_path.unlink()
    return out_path


def main():
    parser = argparse.ArgumentParser(description="Render a two-host podcast script to audio, locally.")
    parser.add_argument("script", nargs="?", type=Path, help="dialogue script (.md or .txt)")
    parser.add_argument("-o", "--out", type=Path, help="output .mp3 or .wav (default: podcast/episodes/<script>.mp3)")
    parser.add_argument("--voices", help='speaker voices, e.g. "ALEX=am_michael,SAM=af_heart"')
    parser.add_argument("--speed", type=float, default=1.0, help="speaking rate, 0.5-2.0 (default 1.0)")
    parser.add_argument("--lang", default="en-us", help="en-us or en-gb (default en-us)")
    parser.add_argument("--model-dir", type=Path, default=DEFAULT_MODEL_DIR, help=f"where model files live (default {DEFAULT_MODEL_DIR})")
    parser.add_argument("--check", action="store_true", help="only print the conversation balance report")
    parser.add_argument("--list-voices", action="store_true", help="print available voice ids and exit")
    args = parser.parse_args()

    if args.check:
        if not args.script:
            parser.error("--check needs a script file")
        turns = parse_script(args.script.read_text(encoding="utf-8"))
        print(f"Balance check: {args.script}")
        sys.exit(1 if balance_report(turns) else 0)

    try:
        import numpy as np
        from kokoro_onnx import Kokoro
    except ImportError:
        sys.exit(f"Missing dependencies. Run: pip install -r {Path(__file__).parent / 'requirements.txt'}")

    kokoro = Kokoro(*map(str, ensure_models(args.model_dir)))

    if args.list_voices:
        print("\n".join(sorted(kokoro.get_voices())))
        print("\nPrefix guide: a=American, b=British; f=female, m=male (e.g. bf_emma = British female).")
        return

    if not args.script:
        parser.error("a script file is required (or use --list-voices)")

    turns = parse_script(args.script.read_text(encoding="utf-8"))
    if not turns:
        sys.exit(f"No 'NAME: line' turns found in {args.script}")

    speakers = list(dict.fromkeys(s for s, _ in turns))
    voices = assign_voices(speakers, parse_voice_overrides(args.voices))
    available = set(kokoro.get_voices())
    for speaker, voice in voices.items():
        if voice not in available:
            sys.exit(f"Unknown voice '{voice}' for {speaker}. See --list-voices.")
    print("Cast: " + ", ".join(f"{s} -> {v}" for s, v in voices.items()))

    pieces, previous = [], None
    for i, (speaker, line) in enumerate(turns, 1):
        print(f"[{i}/{len(turns)}] {speaker}: {line[:70]}{'...' if len(line) > 70 else ''}")
        samples, _ = kokoro.create(line, voice=voices[speaker], speed=args.speed, lang=args.lang)
        if previous is not None:
            if speaker == previous:
                gap = PAUSE_SAME_SPEAKER
            elif min(len(line.split()), len(turns[i - 2][1].split())) <= QUICK_REACTION_WORDS:
                gap = PAUSE_QUICK_REACTION
            else:
                gap = PAUSE_SPEAKER_CHANGE
            pieces.append(np.zeros(int(gap * SAMPLE_RATE), dtype=np.float32))
        pieces.append(samples.astype(np.float32))
        previous = speaker

    out = args.out or args.script.with_suffix(".mp3")
    written = export(np.concatenate(pieces), out)
    minutes, seconds = divmod(int(sum(len(p) for p in pieces) / SAMPLE_RATE), 60)
    print(f"\nDone: {written} ({minutes}m {seconds:02d}s)")


if __name__ == "__main__":
    main()
