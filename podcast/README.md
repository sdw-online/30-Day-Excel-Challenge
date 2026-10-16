# Local Podcast Generator

A local stand-in for NotebookLM's audio overviews. Write notes in Claude Code, and get
back a two-host "deep dive" episode as an MP3, with no copy-pasting into NotebookLM.

NotebookLM does two things, and this splits them the same way:

| Step | NotebookLM | Here |
|------|-----------|------|
| 1. Notes → two-host conversation | Gemini writes a dialogue | Claude Code writes it, via the `/podcast` command |
| 2. Conversation → audio | Google's cloud voices | [Kokoro](https://github.com/thewh1teagle/kokoro-onnx), an open-weight TTS model that runs on your CPU |

You keep the script as a plain text file, so you can edit a line before you render it.
NotebookLM doesn't let you do that.

## Setup (once)

```bash
pip install -r podcast/requirements.txt
```

You also need `ffmpeg` on your PATH for MP3 output (`brew install ffmpeg` or `winget install ffmpeg`).
Without it you get a WAV file instead. The first render downloads the Kokoro model
(~350 MB) into `~/.cache/local-podcast`. After that, everything runs offline.

## Use it

In Claude Code, from the repo root:

```
/podcast day_18_xlookup
/podcast my_notes.md 8 "aimed at complete beginners, upbeat"
```

Claude reads the notes and writes `podcast/scripts/<name>.md`. Then it renders
`podcast/episodes/<name>.mp3`. On a laptop CPU, rendering takes about 20-40 seconds per minute of audio.

To re-render a script after you edit it by hand:

```bash
python podcast/make_podcast.py podcast/scripts/day_18_xlookup.md
```

## Options

```bash
python podcast/make_podcast.py --list-voices                       # all voice ids
python podcast/make_podcast.py script.md --voices "ALEX=bm_george,SAM=bf_emma" --lang en-gb
python podcast/make_podcast.py script.md --speed 1.1 -o out/episode.wav
```

Voice ids start with a two-letter code: `a` = American, `b` = British, `f` = female,
`m` = male. By default the first speaker gets `am_michael` and the second gets `af_heart`.

## Script format

```
# Optional title
ALEX: One turn per line.
SAM: Any NAME: prefix works, and each name gets its own voice. [laughs]
```

The renderer strips stage directions like `[laughs]` and markdown, and skips headings and blank lines.
See [`scripts/day_18_xlookup.md`](scripts/day_18_xlookup.md) for a full example.
