---
name: podcast
description: Turn any text source (notes, a file, a folder, pasted text, a Google Doc, a web page) into a natural two-host podcast conversation and render it to MP3 locally, like NotebookLM's audio overviews. Use when the user runs /podcast, or asks to make a podcast, audio overview, or conversation from some text.
argument-hint: "[file, folder, link or pasted text] [length / audience / focus]"
---

# /podcast: text in, natural two-host conversation out

The user gives a source, you write a conversation between two hosts who have both read
it, and the bundled renderer turns that conversation into an MP3. Everything after the
source is optional. Don't ask questions you can answer with a sensible default.

Paths below marked `<skill>/` are relative to this skill's base directory.

## 1. Find the source

Work out what the user pointed at, in this order:

| They gave you | Do this |
|---|---|
| Pasted text in the message | Use it as is |
| A file path (.md .txt .pdf .docx, an image of a page) | Read it. For .docx, use `pandoc` or `python-docx` if Read can't open it |
| A folder | Read the text files in it (README first) |
| A web link | Fetch it |
| A Google Doc name or link | Find and read it with the Google Drive tools, if connected |
| Nothing | Use every file in `podcasts/inbox/` (relative to the current working directory). If the inbox is empty or missing, create it and reply with just: *"Drop your notes into `podcasts/inbox/` (or paste them here, or give me a path), then run /podcast again."* |

Anything else in the arguments is direction: length ("10 min"), audience ("for new
believers"), focus ("just chapter 3"), tone. Default length is about 6 minutes
(about 150 spoken words a minute).

Pick a short `slug` from the source's topic, for example `solomon-success`, and create
`podcasts/<slug>/`. Save a copy of the source text as `podcasts/<slug>/source.md`, so the
episode always travels with what it was made from. If the source came from the inbox,
move those files into `podcasts/<slug>/` so the inbox is empty for next time.

## 2. Write the conversation

Read `<skill>/example-script.md` first. It shows the target feel.

Save the conversation to `podcasts/<slug>/script.md`, one turn per line, with
`# <Episode title>` as the only other line:

```
# Episode title
ALEX: ...
SAM: ...
```

### The hosts are two curious equals, not an interviewer and an expert

- **Both ask, both answer.** Neither host is "the questions one". Each of them should
  ask roughly half the questions and explain roughly half the ideas. Hand the lead back
  and forth: one explains a point, the other picks it up, adds to it, then asks
  something back.
- **They noticed different things.** Each host brings a different angle on the same
  source, such as one who loves the big picture and one who loves the details. Each
  has their own favourite line and their own question they can't settle.
- **They're honest about what they don't know.** When a host isn't sure, they say so
  ("Honestly, I don't know", "I'd have guessed X, but..."), and then the source settles
  it: "Actually, the notes say...". Let at least one host be wrong once and get
  corrected by the text, and let them enjoy being corrected.
- **The source is the authority.** Facts come from the source. A host can bring in
  outside knowledge or a personal take, but must flag it ("This isn't in the notes,
  but...", "My own read is...") and must never let it overrule the source. When the
  source is silent or unfinished, they say that plainly instead of filling the gap.
  If the source looks mistaken (a wrong reference, say), they raise it gently as a
  thing to check, not as a verdict.
- **They react and build.** They interrupt with short reactions ("Wait, really?",
  "Hm.", "Right, right."), finish each other's thoughts, push back, change their minds
  and use callbacks to earlier moments. Mostly short turns, with the occasional longer
  one when someone's on a roll. One or two `[laughs]` at most.
- **They quote, then unpack.** Read key lines from the source word for word (for
  scripture, say the reference too), then talk about what they mean.
- **Shape:** open cold on the most intriguing idea or question, not "welcome to the
  show". Explore 3 to 5 threads. Before the close, name the open questions the source
  leaves unanswered. End with one takeaway from each host, in their own words.

### Write for the ear

No lists, tables, URLs, markdown or abbreviations a person wouldn't say aloud. Write
numbers and references the way they're spoken ("First Kings chapter three, verse
three"). Avoid jargon unless they explain it.

## 3. Check, then render

Check the balance first. This takes a second and doesn't load the voice model:

```
python <skill>/make_podcast.py podcasts/<slug>/script.md --check
```

If it prints a warning (for example, one host asking almost all the questions), revise
the script and check again. Then render:

```
python <skill>/make_podcast.py podcasts/<slug>/script.md -o podcasts/<slug>/<slug>.mp3
```

If it says dependencies are missing, run `pip install -r <skill>/requirements.txt` and
retry. The first render downloads the voice model (about 350 MB, once).

## 4. Hand it over

Reply briefly with:

- 🎧 the MP3 path and its length
- 📝 the script path, plus one line on what the hosts dig into
- ✏️ "Want changes? Tell me (e.g. *make it shorter*, *more on chapter 2*, *British
  voices*), or edit `script.md` yourself and say **re-render**."

**Voices:** `--voices "ALEX=bm_george,SAM=bf_emma" --lang en-gb` gives British hosts.
`--list-voices` lists all of them. `--speed 1.1` speaks faster.
