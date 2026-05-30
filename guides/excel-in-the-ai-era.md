<p align="center">
  <a href="../README.md"><img src="../assets/banners/excel-in-the-ai-era.svg" width="800" alt="Excel in the AI Era"></a>
</p>

<p align="center">
  <a href="../README.md"><img src="https://img.shields.io/badge/Back-Main_Page-grey" alt="Back to Main"></a>
  <a href="why-this-challenge.md"><img src="https://img.shields.io/badge/Next-Why_This_Challenge-blue" alt="Why This Challenge"></a>
</p>

# Excel in the AI Era

"Why would I learn Excel when ChatGPT can write formulas for me?"

Fair question. Here's the honest answer.

---

## AI can write formulas. It can't guarantee they're correct.

Ask an LLM to write an Excel formula and you'll get something that looks right. It'll have proper syntax, reasonable cell references, and a plausible structure. It might even produce a result.

But "produces a result" and "produces the right result" are two completely different things.

Here's what goes wrong in practice:

- **It guesses your data layout.** If your column headers are in row 2 instead of row 1, the ranges are wrong. If your sheet is named "Sales Data" and the AI writes "Sheet1", the formula breaks entirely.
- **It gets lookup logic wrong.** The difference between an exact match and approximate match in VLOOKUP changes your result. The AI doesn't know your data well enough to choose correctly. One wrong argument and every matched value is quietly incorrect.
- **It ignores blanks.** Most AI-generated formulas don't handle empty cells or text-formatted numbers properly. A SUMIF that skips blank rows can undercount by thousands - and you'd never know unless you understand what's happening.
- **It can't sense-check.** AI writes formulas that run. It doesn't know if the answer is plausible. If your total revenue comes back as -$4,000 or $40 million, the formula won't tell you something's wrong. You have to know that yourself.

The people who use AI effectively for Excel are the ones who already know Excel. They use it to draft faster, then verify and fix. That's not "AI replacing Excel skills" - that's "Excel skills making AI useful."

---

## But the bigger reason isn't about AI at all

Even if AI could write perfect formulas every time (it can't), learning Excel would still be worth it. Here's why.

---

<p align="center">
  <img src="../assets/banners/why-decompose.svg" width="800" alt="Decompose Problems">
</p>

### Excel teaches you to structure messy reality

Every complex spreadsheet starts as a mess. Raw exports, inconsistent formats, duplicate rows, merged cells, values stored as text. Before you can answer any question, you have to impose structure.

What does "total revenue by region" actually mean? Which sheet has the source data? Is the region column consistent, or does it say "North", "north", and "N." in different rows? Are the dates formatted correctly, or stored as text that SUMIFS can't read?

Excel forces you to answer all of those questions before a single formula works. You learn to look at raw data and see the cleaning steps needed before you can trust the output:

1. Standardise the region column
2. Fix the date format
3. Remove duplicate rows
4. Then aggregate

That data-wrangling instinct transfers to everything - analysis, reporting, data engineering, product work. It's not an Excel skill. It's a thinking skill that Excel happens to teach better than almost anything else.

---

<p align="center">
  <img src="../assets/banners/why-precision.svg" width="800" alt="Precision">
</p>

### Excel teaches you to be systematic

A spreadsheet doesn't guess what you meant. If your formula references the wrong range, your totals are wrong - and they're wrong silently. The cell shows a number. That number might be completely off.

This forces a kind of discipline that most people never develop:

- You learn to check your outputs against totals you can verify manually
- You learn that VLOOKUP with approximate match returns the nearest value, not an error, when nothing matches exactly
- You learn that a filtered table and an unfiltered table give different AVERAGE results
- You learn to spot when a formula has dragged into the wrong column and returned nonsense

That systematic checking makes you a better analyst, a better communicator, and a more reliable person to work with. It's the difference between someone who sends a number and someone who sends a number they'd stake their reputation on.

---

<p align="center">
  <img src="../assets/banners/why-direct-access.svg" width="800" alt="Direct Access">
</p>

### Excel gives you immediate power over data

Not everyone has access to a database. Not everyone works at a company with a data team. But almost everyone has Excel - and almost every business runs on spreadsheets whether they admit it or not.

Knowing Excel properly means you don't have to wait for someone else to build you a report. You can:

- Pull together data from three different exports in an hour
- Build a tracker that updates itself when new rows are added
- Create a dashboard your manager can actually use without breaking it
- Answer a question in a meeting instead of saying "I'll get back to you"

That kind of immediate, self-sufficient capability is rare. Most people use Excel at 20% of what it can do. The ones who've put in the time to learn it properly stand out immediately - in interviews, in their teams, and in the quality of work they produce.

---

## The bottom line

AI makes Excel faster to use. It doesn't make Excel knowledge optional.

The people who get the most out of AI tools are the ones who understand what the tool is doing - and can catch it when it's wrong. That requires knowing Excel properly, not just knowing how to prompt for a formula.

This challenge teaches you that. And it's completely free.

You now understand something most people skip - why the skill matters, not just the syntax. If that shift in thinking clicked for you, [subscribe on YouTube](https://www.youtube.com/@sdw-online?sub_confirmation=1) - new challenges drop regularly and the next one builds on exactly this kind of foundation.

<p align="center">
  <a href="https://www.youtube.com/@sdw-online?sub_confirmation=1"><img src="../assets/banners/support-creator.svg" width="800" alt="Subscribe on YouTube"></a>
</p>

---

<p align="center">
  <a href="where-to-start.md"><strong>Find your starting point &rarr;</strong></a>
</p>

<p align="center">
  <a href="../day_01_getting_started/">Or just start Day 1</a>
</p>
