#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'assets', 'banners');
const A = '#217346';
const BG0 = '#0a1a0e';
const BG1 = '#0d3320';
const MUTED = '#a0c4b0';

function escXml(s) { return s.replace(/&/g, '&amp;'); }

function guideBanner(title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 100" fill="none">
  <defs>
    <linearGradient id="gbg" x1="400" y1="0" x2="800" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${BG0}"/><stop offset="100%" stop-color="${BG1}"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="800" height="100" rx="12" fill="url(#gbg)"/>
  <rect x="1" y="1" width="798" height="98" rx="12" fill="none" stroke="${A}" stroke-width="1.5" opacity="0.35" filter="url(#glow)"/>
  <circle cx="720" cy="16" r="2" fill="${A}" opacity="0.2"/><circle cx="740" cy="16" r="2" fill="${A}" opacity="0.25"/><circle cx="760" cy="16" r="2" fill="${A}" opacity="0.3"/><circle cx="780" cy="16" r="2" fill="${A}" opacity="0.35"/>
  <circle cx="740" cy="36" r="2" fill="${A}" opacity="0.15"/><circle cx="760" cy="36" r="2" fill="${A}" opacity="0.2"/><circle cx="780" cy="36" r="2" fill="${A}" opacity="0.25"/>
  <text x="40" y="44" font-family="Segoe UI, system-ui, sans-serif" font-size="22" font-weight="700" fill="#ffffff">${escXml(title)}</text>
  <text x="40" y="72" font-family="Segoe UI, system-ui, sans-serif" font-size="13" fill="${MUTED}">${escXml(subtitle)}</text>
</svg>`;
}

const banners = [
  ['why-this-challenge.svg', 'Why This Challenge?', 'Daily practice, real data, career-ready exercises. Here is why this one is different.'],
  ['why-daily-practice.svg', 'Daily Practice', '30 minutes a day beats a 15-hour weekend binge. Consistency builds fluency.'],
  ['why-real-data.svg', 'Real Data', 'Sales reports, expense tracking, HR data - the kind of spreadsheets you will actually see in a job.'],
  ['why-career-exercises.svg', 'Career-Ready Exercises', 'Every exercise puts you in a real role solving real business problems.'],
  ['where-to-start.svg', 'Where Should I Start?', 'Find your starting point based on what you already know.'],
  ['excel-in-the-ai-era.svg', 'Excel in the AI Era', 'AI can generate formulas. It cannot guarantee they are correct.'],
  ['why-decompose.svg', 'Break Down Problems', 'Every complex spreadsheet starts as a vague request. Excel teaches you to be systematic.'],
  ['why-precision.svg', 'Be Precise', 'One wrong cell reference cascades through everything. You learn rigour.'],
  ['why-direct-access.svg', 'Direct Access to Data', 'Open the file, build the analysis yourself. No middleman.'],
];

// Subscribe banner (YouTube red, not Excel green)
const subscribe = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 80" fill="none">
  <defs>
    <linearGradient id="sbg" x1="400" y1="0" x2="800" y2="80" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${BG0}"/><stop offset="100%" stop-color="${BG1}"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="800" height="80" rx="12" fill="url(#sbg)"/>
  <rect x="1" y="1" width="798" height="78" rx="12" fill="none" stroke="${A}" stroke-width="1.5" opacity="0.35" filter="url(#glow)"/>
  <circle cx="740" cy="16" r="2" fill="${A}" opacity="0.2"/><circle cx="760" cy="16" r="2" fill="${A}" opacity="0.25"/><circle cx="780" cy="16" r="2" fill="${A}" opacity="0.3"/>
  <rect x="30" y="22" width="44" height="36" rx="8" fill="#dc2626"/>
  <polygon points="47,32 47,50 60,41" fill="#ffffff"/>
  <text x="90" y="36" font-family="Segoe UI, system-ui, sans-serif" font-size="16" font-weight="700" fill="#ffffff">You're building momentum. Subscribe to keep it going.</text>
  <text x="90" y="58" font-family="Segoe UI, system-ui, sans-serif" font-size="12" fill="${MUTED}">New challenges, projects, and deep dives drop regularly - straight to your feed.</text>
</svg>`;

let count = 0;
for (const [file, title, subtitle] of banners) {
  fs.writeFileSync(path.join(OUT, file), guideBanner(title, subtitle));
  count++;
}
fs.writeFileSync(path.join(OUT, 'support-creator.svg'), subscribe);
count++;

console.log(`Generated ${count} guide + subscribe banners`);
