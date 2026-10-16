# XLOOKUP: Why Everyone Says It Replaced VLOOKUP

SAM: Okay, I have a confession before we start. I've used VLOOKUP for years and I've never once understood why it needs that column number.
ALEX: [laughs] Oh, I've got the opposite problem. I understood the column number. I just never trusted it.
SAM: Trusted it?
ALEX: Yeah. Because the notes make this point early on. If someone inserts a column into the table, the number doesn't move. So VLOOKUP quietly grabs the wrong column.
SAM: Quietly. No error?
ALEX: No error. Just a wrong answer that looks right.
SAM: Hm. That's worse than an error, honestly.
ALEX: Much worse. So, you read the XLOOKUP part more closely than I did. What's the actual fix?
SAM: So instead of one big table and a number, you point at two things. The column you're searching in, and the column you want back.
ALEX: And because you pointed at the actual column...
SAM: ...inserting stuff in between doesn't matter. Right.
ALEX: Okay, here's what I want to know though. Is it slower? I'd always assumed the newer functions were heavier.
SAM: Honestly? I don't know. And I looked, and the notes don't say anything about speed either way. So I'm not going to guess.
ALEX: Fair. We'll leave that one open. What about the bit where it can't find something?
SAM: Oh, that part I loved. Wait, you tell me, because I think you had a note on IFERROR.
ALEX: I did, and I was wrong about it. I assumed you still had to wrap it in IFERROR, like with VLOOKUP.
SAM: And you don't.
ALEX: I don't! The notes say there's a fourth argument, "if not found". You type what you want shown, and that's it.
SAM: See, that's the kind of thing that changes how a spreadsheet feels to use.
ALEX: Can I ask you one I genuinely couldn't work out? The notes say it can "look left". What does that even mean?
SAM: Okay, so with VLOOKUP, the answer column had to be to the right of the search column. Always.
ALEX: Oh. So if the ID was in column D and the name was in column B...
SAM: VLOOKUP just couldn't do it. You'd rearrange your table, or use INDEX and MATCH.
ALEX: Which was Day 17.
SAM: Exactly. XLOOKUP doesn't care which side the answer is on.
ALEX: Okay. So what's still open for you? Because something is, I can tell.
SAM: [laughs] The notes say exact match is the default now, which is great. But they don't say when you'd ever want the approximate kind. I'd like an example of that.
ALEX: Same. That's one for the next episode. My takeaway is simple. Point at what you search, point at what you want, and stop counting columns.
SAM: And mine is: when something's missing, tell XLOOKUP what to say instead of letting it throw an error at you.
