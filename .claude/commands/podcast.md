---
description: Turn notes into a NotebookLM-style two-host podcast, rendered locally
argument-hint: <notes file or folder> [minutes] [extra direction]
---

Make a "deep dive" audio overview, the way NotebookLM does, from: $ARGUMENTS

## 1. Read the source

Read the notes file(s) given above. If a folder is given, read its README.md and any
other .md files in it. These notes are the only source of facts: do not invent
statistics, features or claims that aren't supported by them.

## 2. Write the script

Write a conversation between two hosts, **ALEX** and **SAM**, and save it to
`podcast/scripts/<short_snake_case_name>.md`. Target length: the minutes given in the
arguments, otherwise about 5 minutes (roughly 150 spoken words per minute).

Format, strictly one turn per line, nothing else but an optional `#` title:

```
ALEX: line
SAM: line
```

Style, matching the NotebookLM audio overview feel:
- ALEX steers: sets up the topic, asks the questions a curious learner would ask.
- SAM explains: concrete examples, analogies, the "why", the common mistakes.
- Open with a hook, not "Welcome to the podcast". Close with a 1-2 line takeaway.
- Short turns (1-3 sentences), frequent back-and-forth, natural reactions
  ("Right.", "Wait, so...", "Exactly.") and the occasional [laughs].
- Write for the ear: no bullet lists, tables, URLs, code blocks or markdown.
  Spell out symbols and formulas the way you'd say them aloud
  ("equals XLOOKUP, open bracket..."), and keep formulas short.
- Follow any extra direction in the arguments (audience, tone, focus).

## 3. Render the audio

Run:

```
python podcast/make_podcast.py podcast/scripts/<name>.md
```

If it reports missing dependencies, run `pip install -r podcast/requirements.txt` first.
The first run downloads the Kokoro model (~350 MB) into `~/.cache/local-podcast`.

Finish by telling me the script path, the audio path and the episode length.
