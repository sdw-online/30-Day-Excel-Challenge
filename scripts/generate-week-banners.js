#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'assets', 'banners');
const A = '#217346'; // Excel green
const BG0 = '#0a1a0e';
const BG1 = '#0d3320';
const DIM = '#6ee7b7';
const MUTED = '#a0c4b0';

function escXml(s) { return s.replace(/&/g, '&amp;'); }

function weekBanner(num, title, topics) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 120" fill="none">
  <defs>
    <linearGradient id="fbg" x1="400" y1="0" x2="800" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${BG0}"/><stop offset="100%" stop-color="${BG1}"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="800" height="120" rx="12" fill="url(#fbg)"/>
  <rect x="1" y="1" width="798" height="118" rx="12" fill="none" stroke="${A}" stroke-width="1.5" opacity="0.35" filter="url(#glow)"/>
  <circle cx="640" cy="16" r="2" fill="${A}" opacity="0.12"/><circle cx="660" cy="16" r="2" fill="${A}" opacity="0.15"/><circle cx="680" cy="16" r="2" fill="${A}" opacity="0.18"/><circle cx="700" cy="16" r="2" fill="${A}" opacity="0.22"/><circle cx="720" cy="16" r="2" fill="${A}" opacity="0.26"/><circle cx="740" cy="16" r="2" fill="${A}" opacity="0.3"/><circle cx="760" cy="16" r="2" fill="${A}" opacity="0.35"/><circle cx="780" cy="16" r="2" fill="${A}" opacity="0.4"/>
  <circle cx="660" cy="36" r="2" fill="${A}" opacity="0.1"/><circle cx="680" cy="36" r="2" fill="${A}" opacity="0.14"/><circle cx="700" cy="36" r="2" fill="${A}" opacity="0.18"/><circle cx="720" cy="36" r="2" fill="${A}" opacity="0.22"/><circle cx="740" cy="36" r="2" fill="${A}" opacity="0.26"/><circle cx="760" cy="36" r="2" fill="${A}" opacity="0.3"/><circle cx="780" cy="36" r="2" fill="${A}" opacity="0.35"/>
  <circle cx="680" cy="56" r="2" fill="${A}" opacity="0.08"/><circle cx="700" cy="56" r="2" fill="${A}" opacity="0.12"/><circle cx="720" cy="56" r="2" fill="${A}" opacity="0.16"/><circle cx="740" cy="56" r="2" fill="${A}" opacity="0.2"/><circle cx="760" cy="56" r="2" fill="${A}" opacity="0.24"/><circle cx="780" cy="56" r="2" fill="${A}" opacity="0.28"/>
  <circle cx="700" cy="76" r="2" fill="${A}" opacity="0.08"/><circle cx="720" cy="76" r="2" fill="${A}" opacity="0.12"/><circle cx="740" cy="76" r="2" fill="${A}" opacity="0.16"/><circle cx="760" cy="76" r="2" fill="${A}" opacity="0.2"/><circle cx="780" cy="76" r="2" fill="${A}" opacity="0.24"/>
  <circle cx="720" cy="96" r="2" fill="${A}" opacity="0.06"/><circle cx="740" cy="96" r="2" fill="${A}" opacity="0.1"/><circle cx="760" cy="96" r="2" fill="${A}" opacity="0.14"/><circle cx="780" cy="96" r="2" fill="${A}" opacity="0.18"/>
  <rect x="24" y="24" width="72" height="72" rx="10" fill="${A}"/>
  <text x="60" y="55" font-family="Segoe UI, system-ui, sans-serif" font-size="12" font-weight="600" fill="${DIM}" text-anchor="middle">WEEK</text>
  <text x="60" y="80" font-family="Segoe UI, system-ui, sans-serif" font-size="30" font-weight="800" fill="#ffffff" text-anchor="middle">${num}</text>
  <text x="118" y="52" font-family="Segoe UI, system-ui, sans-serif" font-size="26" font-weight="700" fill="#ffffff">${escXml(title)}</text>
  <text x="118" y="80" font-family="Segoe UI, system-ui, sans-serif" font-size="13" fill="${MUTED}">${escXml(topics)}</text>
</svg>`;
}

const weeks = [
  [1, 'Excel Fundamentals', 'Days 1-7  |  Interface, Formatting, Formulas, Sorting, Charts, Conditional Formatting, Project'],
  [2, 'Functions & Pivot Tables', 'Days 8-14  |  IF/IFS/AND/OR, Text Functions, Aggregates, Pivot Tables, Validation, Project'],
  [3, 'Lookups & Data Cleaning', 'Days 15-21  |  Conditional Formatting, VLOOKUP, INDEX+MATCH, XLOOKUP, Cleaning, Power Query, Project'],
  [4, 'Advanced Analytics & Automation', 'Days 22-30  |  Advanced Charts, Dynamic Arrays, Power Query, Power Pivot, Macros, Capstone'],
];

for (const [num, title, topics] of weeks) {
  fs.writeFileSync(path.join(OUT, `week-${num}-banner.svg`), weekBanner(num, title, topics));
}

console.log('Generated: cover.svg + 4 week banners');
