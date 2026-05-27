#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'assets', 'banners');
const A = '#217346';
const BG0 = '#0a1a0e';
const BG1 = '#0d3320';
const DIM = '#6ee7b7';
const MUTED = '#a0c4b0';
const LIGHT = '#ecfdf5';

function escXml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;'); }

const days = [
  { day: 1, slug: 'getting-started', topic: 'Getting Started with Excel', diff: 'Beginner', learn: ['Excel interface', 'Workbooks & sheets', 'Data entry', 'Basic navigation'] },
  { day: 2, slug: 'formatting', topic: 'Formatting Data for Analysis', diff: 'Beginner', learn: ['Number formats', 'Cell styles', 'Tables', 'Conditional layout'] },
  { day: 3, slug: 'formulas', topic: 'Formulas & Functions', diff: 'Beginner', learn: ['SUM/AVERAGE/MAX', 'Cell references', 'Auto-fill', 'Formula logic'] },
  { day: 4, slug: 'sorting-filtering', topic: 'Sorting & Filtering', diff: 'Beginner', learn: ['Single/multi sort', 'AutoFilter', 'Custom filters', 'Filter by colour'] },
  { day: 5, slug: 'data-viz', topic: 'Data Visualisation Basics', diff: 'Beginner', learn: ['Column/bar charts', 'Line charts', 'Pie charts', 'Chart formatting'] },
  { day: 6, slug: 'cond-format-1', topic: 'Conditional Formatting (Part 1)', diff: 'Beginner', learn: ['Highlight rules', 'Data bars', 'Colour scales', 'Icon sets'] },
  { day: 7, slug: 'project-week1', topic: 'Project: Week 1 Data Project', diff: 'Beginner', learn: ['Combine Week 1', 'Real dataset', 'Build a report', 'Present findings'] },
  { day: 8, slug: 'logical-functions', topic: 'Logical Functions (IF, IFS, AND, OR)', diff: 'Intermediate', learn: ['IF function', 'Nested IF/IFS', 'AND/OR logic', 'Error handling'] },
  { day: 9, slug: 'text-functions', topic: 'Text Functions', diff: 'Intermediate', learn: ['LEFT/RIGHT/MID', 'CONCATENATE', 'TRIM/CLEAN', 'Text extraction'] },
  { day: 10, slug: 'aggregate-functions', topic: 'Aggregate Functions', diff: 'Intermediate', learn: ['SUMIFS/COUNTIFS', 'AVERAGEIFS', 'Criteria ranges', 'Multi-condition'] },
  { day: 11, slug: 'pivot-tables-1', topic: 'Pivot Tables (Part 1)', diff: 'Intermediate', learn: ['Create pivots', 'Rows & columns', 'Value fields', 'Grouping'] },
  { day: 12, slug: 'pivot-tables-2', topic: 'Pivot Tables (Part 2)', diff: 'Intermediate', learn: ['Calculated fields', 'Slicers', 'Pivot charts', 'Refresh logic'] },
  { day: 13, slug: 'data-validation', topic: 'Data Validation', diff: 'Intermediate', learn: ['Drop-down lists', 'Input rules', 'Error messages', 'Dependent lists'] },
  { day: 14, slug: 'project-week2', topic: 'Project: Week 2 Data Project', diff: 'Intermediate', learn: ['Combine Week 2', 'Functions + pivots', 'Real dataset', 'Full report'] },
  { day: 15, slug: 'cond-format-2', topic: 'Conditional Formatting (Part 2)', diff: 'Intermediate', learn: ['Custom formulas', 'Row highlighting', 'Dynamic rules', 'Advanced patterns'] },
  { day: 16, slug: 'vlookup', topic: 'VLOOKUP & HLOOKUP', diff: 'Intermediate', learn: ['VLOOKUP syntax', 'Exact vs approx', 'HLOOKUP', 'Common errors'] },
  { day: 17, slug: 'index-match', topic: 'INDEX & MATCH', diff: 'Intermediate', learn: ['INDEX function', 'MATCH function', 'Left lookups', 'Two-way lookup'] },
  { day: 18, slug: 'xlookup', topic: 'XLOOKUP', diff: 'Intermediate', learn: ['XLOOKUP syntax', 'Exact/wildcard', 'Multiple returns', 'Replaces VLOOKUP'] },
  { day: 19, slug: 'data-cleaning', topic: 'Data Cleaning', diff: 'Intermediate', learn: ['Find & Replace', 'Remove duplicates', 'Text to Columns', 'Flash Fill'] },
  { day: 20, slug: 'power-query-1', topic: 'Power Query (Part 1)', diff: 'Advanced', learn: ['Get & Transform', 'Query Editor', 'Steps pane', 'Auto-refresh'] },
  { day: 21, slug: 'project-week3', topic: 'Project: Week 3 Data Project', diff: 'Advanced', learn: ['Lookups + cleaning', 'Power Query pipeline', 'Real dataset', 'Full report'] },
  { day: 22, slug: 'data-viz-advanced', topic: 'Data Visualisation (Advanced)', diff: 'Advanced', learn: ['Combo charts', 'Sparklines', 'Dynamic charts', 'Dashboard layout'] },
  { day: 23, slug: 'dynamic-arrays', topic: 'Dynamic Array Functions', diff: 'Advanced', learn: ['FILTER', 'SORT/SORTBY', 'UNIQUE', 'Spill ranges'] },
  { day: 24, slug: 'power-query-2', topic: 'Power Query (Part 2)', diff: 'Advanced', learn: ['Merge queries', 'Append queries', 'Custom columns', 'Parameters'] },
  { day: 25, slug: 'power-pivot', topic: 'Power Pivot & DAX', diff: 'Advanced', learn: ['Data Model', 'Relationships', 'DAX measures', 'Calculated columns'] },
  { day: 26, slug: 'data-quality', topic: 'Data Quality & Auditing', diff: 'Advanced', learn: ['Error checking', 'Audit formulas', 'Data profiling', 'Quality rules'] },
  { day: 27, slug: 'macros', topic: 'Macros & VBA Automation', diff: 'Advanced', learn: ['Record macros', 'VBA basics', 'Automate tasks', 'Button triggers'] },
  { day: 28, slug: 'data-entry', topic: 'Building a Data-Entry Form', diff: 'Advanced', learn: ['Form controls', 'Input validation', 'User experience', 'Auto-populate'] },
  { day: 29, slug: 'shortcuts', topic: 'Keyboard Shortcuts', diff: 'Advanced', learn: ['Navigation', 'Selection', 'Formatting', 'Formula shortcuts'] },
  { day: 30, slug: 'capstone', topic: 'Capstone: Final Data Project', diff: 'Advanced', learn: ['Full pipeline', 'Dashboard build', 'Presentation', 'Portfolio piece'] },
];

function conceptCard({ day, topic, diff, learn }) {
  const dd = String(day).padStart(2, '0');
  const diffColor = diff === 'Beginner' ? '#22c55e' : diff === 'Intermediate' ? '#f59e0b' : '#ef4444';
  const bullets = learn.map((item, i) => {
    const y = 108 + i * 22;
    return `  <circle cx="126" cy="${y}" r="3" fill="${A}"/>
  <text x="138" y="${y + 4}" font-family="Segoe UI, system-ui, sans-serif" font-size="12" fill="${LIGHT}">${escXml(item)}</text>`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" fill="none">
  <defs>
    <linearGradient id="fbg" x1="400" y1="0" x2="800" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${BG0}"/><stop offset="100%" stop-color="${BG1}"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="800" height="200" rx="12" fill="url(#fbg)"/>
  <rect x="1" y="1" width="798" height="198" rx="12" fill="none" stroke="${A}" stroke-width="1.5" opacity="0.35" filter="url(#glow)"/>
  <circle cx="640" cy="16" r="2" fill="${A}" opacity="0.12"/><circle cx="660" cy="16" r="2" fill="${A}" opacity="0.15"/><circle cx="680" cy="16" r="2" fill="${A}" opacity="0.18"/><circle cx="700" cy="16" r="2" fill="${A}" opacity="0.22"/><circle cx="720" cy="16" r="2" fill="${A}" opacity="0.26"/><circle cx="740" cy="16" r="2" fill="${A}" opacity="0.3"/><circle cx="760" cy="16" r="2" fill="${A}" opacity="0.35"/><circle cx="780" cy="16" r="2" fill="${A}" opacity="0.4"/>
  <circle cx="660" cy="36" r="2" fill="${A}" opacity="0.1"/><circle cx="680" cy="36" r="2" fill="${A}" opacity="0.14"/><circle cx="700" cy="36" r="2" fill="${A}" opacity="0.18"/><circle cx="720" cy="36" r="2" fill="${A}" opacity="0.22"/><circle cx="740" cy="36" r="2" fill="${A}" opacity="0.26"/><circle cx="760" cy="36" r="2" fill="${A}" opacity="0.3"/><circle cx="780" cy="36" r="2" fill="${A}" opacity="0.35"/>
  <circle cx="680" cy="56" r="2" fill="${A}" opacity="0.08"/><circle cx="700" cy="56" r="2" fill="${A}" opacity="0.12"/><circle cx="720" cy="56" r="2" fill="${A}" opacity="0.16"/><circle cx="740" cy="56" r="2" fill="${A}" opacity="0.2"/><circle cx="760" cy="56" r="2" fill="${A}" opacity="0.24"/><circle cx="780" cy="56" r="2" fill="${A}" opacity="0.28"/>
  <circle cx="700" cy="76" r="2" fill="${A}" opacity="0.08"/><circle cx="720" cy="76" r="2" fill="${A}" opacity="0.12"/><circle cx="740" cy="76" r="2" fill="${A}" opacity="0.16"/><circle cx="760" cy="76" r="2" fill="${A}" opacity="0.2"/><circle cx="780" cy="76" r="2" fill="${A}" opacity="0.24"/>
  <circle cx="720" cy="96" r="2" fill="${A}" opacity="0.06"/><circle cx="740" cy="96" r="2" fill="${A}" opacity="0.1"/><circle cx="760" cy="96" r="2" fill="${A}" opacity="0.14"/><circle cx="780" cy="96" r="2" fill="${A}" opacity="0.18"/>
  <rect x="24" y="24" width="72" height="72" rx="10" fill="${A}"/>
  <text x="60" y="52" font-family="Segoe UI, system-ui, sans-serif" font-size="12" font-weight="600" fill="${DIM}" text-anchor="middle">DAY</text>
  <text x="60" y="78" font-family="Segoe UI, system-ui, sans-serif" font-size="28" font-weight="800" fill="#ffffff" text-anchor="middle">${day}</text>
  <text x="118" y="46" font-family="Segoe UI, system-ui, sans-serif" font-size="18" font-weight="700" fill="#ffffff">${escXml(topic)}</text>
  <text x="118" y="70" font-family="Segoe UI, system-ui, sans-serif" font-size="11" fill="${diffColor}">${diff}</text>
  <text x="118" y="96" font-family="Segoe UI, system-ui, sans-serif" font-size="12" fill="${MUTED}">What you&apos;ll learn:</text>
${bullets}
</svg>`;
}

let count = 0;
for (const d of days) {
  const dd = String(d.day).padStart(2, '0');
  fs.writeFileSync(path.join(OUT, `day-${dd}-${d.slug}.svg`), conceptCard(d));
  count++;
}
console.log(`Generated ${count} day concept card SVGs`);
