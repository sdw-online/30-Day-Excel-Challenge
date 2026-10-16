# /podcast: a local NotebookLM-style audio overview

Turn any notes into a natural conversation between two hosts, as an MP3, entirely on
your machine.

## Use it

Give it a source in whichever way is easiest:

```
/podcast                                   ← uses whatever you dropped in podcasts/inbox/
/podcast notes/proverbs.md                 ← a file (.md .txt .pdf .docx) or a folder
/podcast my "Solomon" Google Doc           ← a Google Doc, if Drive is connected
/podcast https://example.com/article       ← a web page
/podcast <paste your text>                 ← pasted text
```

Add direction in plain words: `/podcast notes.md 10 min, for new believers, focus on chapter 3`.

You get one folder per episode:

```
podcasts/solomon-success/
├── source.md              what it was made from
├── script.md              the conversation (edit it freely)
└── solomon-success.mp3    the episode
```

Want changes? Just say *shorter*, *more on verse 3*, or *British voices*. Or edit
`script.md` yourself and say **re-render**.

## What the hosts are like

They're two equals who have both read your source. Both ask and both answer. They
admit when they don't know something and check the text, they get corrected by it, and
they say when the source is silent. If they bring in outside knowledge, they flag it.
`make_podcast.py --check` flags a script where one host does all the asking or talking,
so it gets rewritten before it's rendered.

## Setup (once)

```bash
pip install -r .claude/skills/podcast/requirements.txt
```

You also need `ffmpeg` for MP3 output (`brew install ffmpeg` or `winget install ffmpeg`).
Without it you get a WAV. The first render downloads the Kokoro voice model (~350 MB) to
`~/.cache/local-podcast`. After that everything runs offline.

To use `/podcast` in every project, not just this repo, copy this folder to
`~/.claude/skills/podcast`.
