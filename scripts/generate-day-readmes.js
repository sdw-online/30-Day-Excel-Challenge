#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const days = [
  { day: 1, folder: 'day_01_getting_started', topic: 'Getting Started with Excel', slug: 'getting-started', diff: 'Beginner', week: 1, video: 'https://www.youtube.com/watch?v=jAryJn2vhNQ', learn: ['Excel interface and navigation', 'Creating workbooks and worksheets', 'Entering and editing data', 'Saving and organising files'] },
  { day: 2, folder: 'day_02_formatting_for_analysis', topic: 'Formatting Data for Analysis', slug: 'formatting', diff: 'Beginner', week: 1, video: 'https://www.youtube.com/watch?v=Ttb1WuotHIs', learn: ['Number and date formats', 'Cell styles and themes', 'Converting ranges to tables', 'Formatting for readability'] },
  { day: 3, folder: 'day_03_formulas_and_functions', topic: 'Formulas & Functions', slug: 'formulas', diff: 'Beginner', week: 1, video: 'https://www.youtube.com/watch?v=ggQBWnZUclo', learn: ['SUM, AVERAGE, MAX, MIN, COUNT', 'Relative and absolute cell references', 'Auto-fill and formula logic', 'Common formula errors'] },
  { day: 4, folder: 'day_04_sorting_and_filtering', topic: 'Sorting & Filtering', slug: 'sorting-filtering', diff: 'Beginner', week: 1, video: 'https://www.youtube.com/watch?v=3FZcAIGCB3g', learn: ['Single and multi-level sorting', 'AutoFilter for quick filtering', 'Custom and advanced filters', 'Filtering by colour and icon'] },
  { day: 5, folder: 'day_05_data_viz_basics', topic: 'Data Visualisation Basics', slug: 'data-viz', diff: 'Beginner', week: 1, video: 'https://www.youtube.com/watch?v=xo-kVwDqaWc', learn: ['Column, bar, line, and pie charts', 'Choosing the right chart type', 'Formatting axes and labels', 'Making charts presentation-ready'] },
  { day: 6, folder: 'day_06_conditional_formatting_1', topic: 'Conditional Formatting (Part 1)', slug: 'cond-format-1', diff: 'Beginner', week: 1, video: 'https://www.youtube.com/watch?v=kWVdkiz6-2M', learn: ['Highlight cell rules', 'Data bars for visual comparison', 'Colour scales for gradients', 'Icon sets for status indicators'] },
  { day: 7, folder: 'day_07_week1_practice', topic: 'Project: Week 1 Data Project', slug: 'project-week1', diff: 'Beginner', week: 1, video: 'https://www.youtube.com/watch?v=fQMHEIgvv8U', learn: ['Combine everything from Week 1', 'Work with a real dataset', 'Build a complete report', 'Present your findings'] },
  { day: 8, folder: 'day_08_logical_functions', topic: 'Logical Functions (IF, IFS, AND, OR)', slug: 'logical-functions', diff: 'Intermediate', week: 2, video: 'https://www.youtube.com/watch?v=5oJ5T9o0GJw', learn: ['IF function for conditional logic', 'Nested IF and IFS for multiple conditions', 'AND/OR for combining tests', 'IFERROR for handling errors'] },
  { day: 9, folder: 'day_09_text_functions', topic: 'Text Functions', slug: 'text-functions', diff: 'Intermediate', week: 2, video: 'https://www.youtube.com/watch?v=ns1dbkGGt-k', learn: ['LEFT, RIGHT, MID for extraction', 'CONCATENATE and TEXTJOIN', 'TRIM, CLEAN for whitespace', 'LEN, FIND, SUBSTITUTE'] },
  { day: 10, folder: 'day_10_aggregate_functions', topic: 'Aggregate Functions', slug: 'aggregate-functions', diff: 'Intermediate', week: 2, video: 'https://www.youtube.com/watch?v=X9N7qNgegZ8', learn: ['SUMIFS with multiple criteria', 'COUNTIFS for conditional counting', 'AVERAGEIFS for filtered averages', 'Combining conditions effectively'] },
  { day: 11, folder: 'day_11_pivot_tables_1', topic: 'Pivot Tables (Part 1)', slug: 'pivot-tables-1', diff: 'Intermediate', week: 2, video: 'https://www.youtube.com/watch?v=8CPdq6LSF5U', learn: ['Creating your first pivot table', 'Dragging fields to rows and columns', 'Changing value field settings', 'Grouping dates and numbers'] },
  { day: 12, folder: 'day_12_pivot_tables_2', topic: 'Pivot Tables (Part 2)', slug: 'pivot-tables-2', diff: 'Intermediate', week: 2, video: 'https://www.youtube.com/watch?v=iyDYuZAMD9A', learn: ['Calculated fields for custom metrics', 'Slicers for interactive filtering', 'Pivot charts for visual summaries', 'Refreshing when data changes'] },
  { day: 13, folder: 'day_13_data_validation', topic: 'Data Validation', slug: 'data-validation', diff: 'Intermediate', week: 2, video: 'https://www.youtube.com/watch?v=-Kafb-ypHaM', learn: ['Building drop-down lists', 'Setting input rules and restrictions', 'Custom error messages', 'Dependent/cascading lists'] },
  { day: 14, folder: 'day_14_week2_practice', topic: 'Project: Week 2 Data Project', slug: 'project-week2', diff: 'Intermediate', week: 2, video: 'https://www.youtube.com/watch?v=Y_fwPqS0YHs', learn: ['Combine functions and pivot tables', 'Work with a real dataset', 'Build a complete analytical report', 'Present data-driven findings'] },
  { day: 15, folder: 'day_15_conditional_formatting_2', topic: 'Conditional Formatting (Part 2)', slug: 'cond-format-2', diff: 'Intermediate', week: 3, video: 'https://www.youtube.com/watch?v=q5IrQWp_Z8E', learn: ['Custom formula-based rules', 'Highlighting entire rows', 'Dynamic conditional formatting', 'Advanced pattern matching'] },
  { day: 16, folder: 'day_16_vlookup_hlookup', topic: 'VLOOKUP & HLOOKUP', slug: 'vlookup', diff: 'Intermediate', week: 3, video: 'https://www.youtube.com/watch?v=G6_TYOiv1wg', learn: ['VLOOKUP syntax and logic', 'Exact vs approximate matching', 'HLOOKUP for horizontal lookups', 'Common VLOOKUP errors and fixes'] },
  { day: 17, folder: 'day_17_index_match', topic: 'INDEX & MATCH', slug: 'index-match', diff: 'Intermediate', week: 3, video: 'https://www.youtube.com/watch?v=mqtgqlj6QMc', learn: ['INDEX for returning values', 'MATCH for finding positions', 'Left lookups (VLOOKUP cannot do this)', 'Two-way lookups'] },
  { day: 18, folder: 'day_18_xlookup', topic: 'XLOOKUP', slug: 'xlookup', diff: 'Intermediate', week: 3, video: 'https://www.youtube.com/watch?v=vJf5CWBtA_4', learn: ['XLOOKUP syntax (simpler than VLOOKUP)', 'Exact match, wildcard, approximate', 'Returning multiple columns', 'Why XLOOKUP replaces VLOOKUP'] },
  { day: 19, folder: 'day_19_data_cleaning', topic: 'Data Cleaning', slug: 'data-cleaning', diff: 'Intermediate', week: 3, video: 'https://www.youtube.com/watch?v=RgAOED78C-E', learn: ['Find & Replace for bulk fixes', 'Remove Duplicates', 'Text to Columns for splitting data', 'Flash Fill for pattern-based extraction'] },
  { day: 20, folder: 'day_20_power_query_1', topic: 'Power Query (Part 1)', slug: 'power-query-1', diff: 'Advanced', week: 3, video: 'https://www.youtube.com/watch?v=R1M2p3kV9mo', learn: ['Get & Transform data sources', 'Query Editor interface', 'Applied Steps pane', 'Auto-refresh on data changes'] },
  { day: 21, folder: 'day_21_week3_practice', topic: 'Project: Week 3 Data Project', slug: 'project-week3', diff: 'Advanced', week: 3, video: 'https://www.youtube.com/watch?v=J7YeXpfXTxI', learn: ['Lookups + data cleaning combined', 'Power Query pipeline', 'Work with a real dataset', 'Build a polished output'] },
  { day: 22, folder: 'day_22_data_viz_advanced', topic: 'Data Visualisation (Advanced)', slug: 'data-viz-advanced', diff: 'Advanced', week: 4, video: 'https://www.youtube.com/watch?v=FuTsKAqN3NY', learn: ['Combo charts for dual-axis data', 'Sparklines for inline trends', 'Dynamic chart ranges', 'Dashboard layout principles'] },
  { day: 23, folder: 'day_23_dynamic_arrays_text', topic: 'Dynamic Array Functions', slug: 'dynamic-arrays', diff: 'Advanced', week: 4, video: 'https://www.youtube.com/watch?v=YykiAwglQFQ', learn: ['FILTER for live-updating subsets', 'SORT and SORTBY', 'UNIQUE for distinct values', 'Spill ranges and # references'] },
  { day: 24, folder: 'day_24_power_query_2', topic: 'Power Query (Part 2)', slug: 'power-query-2', diff: 'Advanced', week: 4, video: 'https://www.youtube.com/watch?v=JZs-nMaiaPI', learn: ['Merge queries (like SQL JOINs)', 'Append queries (like SQL UNION)', 'Custom columns with M language', 'Parameters for reusable queries'] },
  { day: 25, folder: 'day_25_power_pivot', topic: 'Power Pivot & DAX', slug: 'power-pivot', diff: 'Advanced', week: 4, video: 'https://www.youtube.com/watch?v=oD7HE3W8EuY', learn: ['Building a Data Model', 'Creating table relationships', 'Writing DAX measures', 'Calculated columns vs measures'] },
  { day: 26, folder: 'day_26_data_quality_auditing', topic: 'Data Quality & Auditing', slug: 'data-quality', diff: 'Advanced', week: 4, video: 'https://www.youtube.com/watch?v=jvjCL3Ht0RQ', learn: ['Error checking tools', 'Formula auditing (Trace Precedents/Dependents)', 'Data profiling techniques', 'Quality rules and validation'] },
  { day: 27, folder: 'day_27_macros_automation', topic: 'Macros & VBA Automation', slug: 'macros', diff: 'Advanced', week: 4, video: 'https://www.youtube.com/watch?v=LVPJCpfrd54', learn: ['Recording your first macro', 'VBA basics and the Editor', 'Automating repetitive tasks', 'Assigning macros to buttons'] },
  { day: 28, folder: 'day_28_data_entry_forms', topic: 'Building a Data-Entry Form', slug: 'data-entry', diff: 'Advanced', week: 4, video: 'https://www.youtube.com/watch?v=zQoKK_-0vUk', learn: ['Form controls and layout', 'Input validation on forms', 'User-friendly design', 'Auto-populating fields'] },
  { day: 29, folder: 'day_29_useful_shortcuts', topic: 'Keyboard Shortcuts', slug: 'shortcuts', diff: 'Advanced', week: 4, video: 'https://www.youtube.com/watch?v=hNgZAPLCjwo', learn: ['Navigation shortcuts', 'Selection shortcuts', 'Formatting shortcuts', 'Formula shortcuts'] },
  { day: 30, folder: 'day_30_final_project', topic: 'Capstone: Final Data Project', slug: 'capstone', diff: 'Advanced', week: 4, video: 'https://www.youtube.com/watch?v=lz_JA_t_DSg', learn: ['Full data pipeline', 'Dashboard build', 'Presentation-ready output', 'Portfolio piece'] },
];

let count = 0;
for (const d of days) {
  const dd = String(d.day).padStart(2, '0');
  const prev = days.find(x => x.day === d.day - 1);
  const next = days.find(x => x.day === d.day + 1);

  const prevLink = prev ? `[<< Day ${prev.day}: ${prev.topic}](../${prev.folder}/)` : 'Start of challenge';
  const nextLink = next ? `[Day ${next.day}: ${next.topic} >>](../${next.folder}/)` : 'Challenge complete!';
  const prevBottom = prev ? `<a href="../${prev.folder}/">&#9664; Day ${prev.day}: ${prev.topic}</a>` : '';
  const nextBottom = next ? `<a href="../${next.folder}/">Day ${next.day}: ${next.topic} &#9654;</a>` : '';
  const bottomNav = [prevBottom, nextBottom].filter(Boolean).join(' &nbsp;&nbsp;|&nbsp;&nbsp; ');
  const showSubscribe = d.day % 5 === 0 || [7, 14, 21, 30].includes(d.day);

  let md = '';
  md += `<p align="center">\n  <a href="${d.video}"><img src="../assets/banners/day-${dd}-${d.slug}.svg" width="800" alt="Day ${d.day} - ${d.topic}"></a>\n</p>\n\n`;
  md += `<p align="center">\n`;
  md += `  <a href="${d.video}"><img src="https://img.shields.io/badge/Watch_Lesson-YouTube-red?logo=youtube" alt="Watch on YouTube"></a>\n`;
  md += `  <img src="https://img.shields.io/badge/Day-${d.day}_of_30-blue" alt="Day ${d.day}">\n`;
  md += `  <img src="https://img.shields.io/badge/Week-${d.week}-purple" alt="Week ${d.week}">\n`;
  md += `  <img src="https://img.shields.io/badge/Difficulty-${d.diff}-orange" alt="${d.diff}">\n`;
  md += `</p>\n\n`;
  md += `# Day ${d.day} - ${d.topic}\n\n`;
  md += `${prevLink} | ${nextLink}\n\n---\n\n`;
  md += `## What You'll Learn\n\n`;
  for (const item of d.learn) { md += `- ${item}\n`; }
  md += `\n---\n\n`;
  md += `## Files\n\nOpen the workbook in this folder and follow along with the [video lesson](${d.video}). Then test yourself with the challenge in the [\`practice/\`](practice/) folder. When you are done, check your work against the solution workbook [\`practice/Day${dd}_Practice_Solution.xlsx\`](practice/Day${dd}_Practice_Solution.xlsx) in that folder.\n\n---\n\n`;

  if (showSubscribe) {
    md += `<p align="center">\n  <a href="https://www.youtube.com/@sdw-online?sub_confirmation=1"><img src="../assets/banners/support-creator.svg" width="800" alt="Subscribe on YouTube"></a>\n</p>\n\n`;
  }

  md += `## Where To Next?\n\n`;
  md += `<p align="center">\n  <img src="../assets/banners/day-${dd}-where-next.svg" width="900" alt="Where To Next?">\n</p>\n\n---\n\n`;
  md += `<p align="center">\n  ${bottomNav}\n</p>\n`;

  fs.writeFileSync(path.join(ROOT, d.folder, 'README.md'), md);
  count++;
}

console.log(`Generated ${count} day READMEs`);
