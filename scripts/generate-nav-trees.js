#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'assets', 'banners');
const A = '#217346';
const AL = '#34d399';
const BG0 = '#0a1a0e';
const BG1 = '#0d3320';
const DIM = '#6ee7b7';
const MUTED = '#a0c4b0';

function escXml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;'); }

const folders = [
  'day_01_getting_started','day_02_formatting_for_analysis','day_03_formulas_and_functions',
  'day_04_sorting_and_filtering','day_05_data_viz_basics','day_06_conditional_formatting_1',
  'day_07_week1_practice','day_08_logical_functions','day_09_text_functions',
  'day_10_aggregate_functions','day_11_pivot_tables_1','day_12_pivot_tables_2',
  'day_13_data_validation','day_14_week2_practice','day_15_conditional_formatting_2',
  'day_16_vlookup_hlookup','day_17_index_match','day_18_xlookup',
  'day_19_data_cleaning','day_20_power_query_1','day_21_week3_practice',
  'day_22_data_viz_advanced','day_23_dynamic_arrays_text','day_24_power_query_2',
  'day_25_power_pivot','day_26_data_quality_auditing','day_27_macros_automation',
  'day_28_data_entry_forms','day_29_useful_shortcuts','day_30_final_project',
];

const topics = [
  'Getting Started','Formatting','Formulas & Functions','Sorting & Filtering',
  'Data Viz Basics','Conditional Formatting 1','Week 1 Project','Logical Functions',
  'Text Functions','Aggregate Functions','Pivot Tables 1','Pivot Tables 2',
  'Data Validation','Week 2 Project','Conditional Formatting 2','VLOOKUP & HLOOKUP',
  'INDEX & MATCH','XLOOKUP','Data Cleaning','Power Query 1',
  'Week 3 Project','Data Viz Advanced','Dynamic Arrays','Power Query 2',
  'Power Pivot','Data Quality','Macros & VBA','Data-Entry Forms',
  'Keyboard Shortcuts','Capstone Project',
];

function navTree(day, topic, cont, apply, brush, skip) {
  const dd = String(day).padStart(2, '0');
  const isLast = day === 30;
  const titleText = isLast ? "What&apos;s Next?" : 'Where To Next?';
  const subtitleText = isLast
    ? 'You completed the 30 Day Excel Challenge!'
    : `You just finished Day ${dd}: ${escXml(topic)}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 320" fill="none">
  <defs>
    <linearGradient id="wnbg" x1="450" y1="0" x2="900" y2="320" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${BG0}"/><stop offset="100%" stop-color="${BG1}"/>
    </linearGradient>
    <filter id="glow2"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="900" height="320" rx="12" fill="url(#wnbg)"/>
  <rect x="1" y="1" width="898" height="318" rx="12" fill="none" stroke="${A}" stroke-width="1.5" opacity="0.35" filter="url(#glow2)"/>
  <circle cx="820" cy="16" r="2" fill="${A}" opacity="0.2"/><circle cx="840" cy="16" r="2" fill="${A}" opacity="0.25"/><circle cx="860" cy="16" r="2" fill="${A}" opacity="0.3"/><circle cx="880" cy="16" r="2" fill="${A}" opacity="0.35"/>
  <circle cx="840" cy="36" r="2" fill="${A}" opacity="0.15"/><circle cx="860" cy="36" r="2" fill="${A}" opacity="0.2"/><circle cx="880" cy="36" r="2" fill="${A}" opacity="0.25"/>
  <text x="450" y="38" font-family="Segoe UI, system-ui, sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">${titleText}</text>
  <text x="450" y="58" font-family="Segoe UI, system-ui, sans-serif" font-size="12" fill="${MUTED}" text-anchor="middle">${subtitleText}</text>
  <rect x="320" y="76" width="260" height="40" rx="8" fill="${A}" opacity="0.15"/>
  <rect x="320" y="76" width="260" height="40" rx="8" fill="none" stroke="${A}" stroke-width="1.5"/>
  <text x="450" y="101" font-family="Segoe UI, system-ui, sans-serif" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">What do you want to do?</text>
  <line x1="450" y1="116" x2="450" y2="138" stroke="${AL}" stroke-width="1.5"/>
  <line x1="130" y1="138" x2="770" y2="138" stroke="${AL}" stroke-width="1.5"/>
  <circle cx="450" cy="138" r="3" fill="${AL}"/><circle cx="310" cy="138" r="3" fill="${AL}"/><circle cx="590" cy="138" r="3" fill="${AL}"/><circle cx="130" cy="138" r="3" fill="${AL}" opacity="0.6"/><circle cx="770" cy="138" r="3" fill="${AL}" opacity="0.6"/>
  <line x1="310" y1="138" x2="310" y2="160" stroke="${AL}" stroke-width="1.5"/>
  <line x1="590" y1="138" x2="590" y2="160" stroke="${AL}" stroke-width="1.5"/>
  <line x1="130" y1="138" x2="130" y2="240" stroke="${AL}" stroke-width="1" opacity="0.6"/>
  <line x1="770" y1="138" x2="770" y2="240" stroke="${AL}" stroke-width="1" opacity="0.6"/>
  <rect x="190" y="160" width="240" height="52" rx="8" fill="${A}"/>
  <text x="310" y="182" font-family="Segoe UI, system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">${escXml(cont[0])}</text>
  <text x="310" y="202" font-family="Segoe UI, system-ui, sans-serif" font-size="11" fill="${DIM}" text-anchor="middle">${escXml(cont[1])}</text>
  <rect x="470" y="160" width="240" height="52" rx="8" fill="${A}"/>
  <text x="590" y="182" font-family="Segoe UI, system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">${escXml(apply[0])}</text>
  <text x="590" y="202" font-family="Segoe UI, system-ui, sans-serif" font-size="11" fill="${DIM}" text-anchor="middle">${escXml(apply[1])}</text>
  <rect x="16" y="240" width="230" height="52" rx="8" fill="${A}" opacity="0.15"/>
  <rect x="16" y="240" width="230" height="52" rx="8" fill="none" stroke="${A}" stroke-width="1"/>
  <text x="131" y="262" font-family="Segoe UI, system-ui, sans-serif" font-size="11" font-weight="600" fill="${AL}" text-anchor="middle">${escXml(brush[0])}</text>
  <text x="131" y="280" font-family="Segoe UI, system-ui, sans-serif" font-size="11" fill="${MUTED}" text-anchor="middle">${escXml(brush[1])}</text>
  <rect x="654" y="240" width="230" height="52" rx="8" fill="${A}" opacity="0.15"/>
  <rect x="654" y="240" width="230" height="52" rx="8" fill="none" stroke="${A}" stroke-width="1"/>
  <text x="769" y="262" font-family="Segoe UI, system-ui, sans-serif" font-size="11" font-weight="600" fill="${AL}" text-anchor="middle">${escXml(skip[0])}</text>
  <text x="769" y="280" font-family="Segoe UI, system-ui, sans-serif" font-size="11" fill="${MUTED}" text-anchor="middle">${escXml(skip[1])}</text>
</svg>`;
}

let count = 0;
for (let i = 0; i < 30; i++) {
  const day = i + 1;
  const dd = String(day).padStart(2, '0');
  const topic = topics[i];
  const isProject = [7, 14, 21, 30].includes(day);
  const nextTopic = i < 29 ? topics[i + 1] : '';
  const prevTopic = i > 0 ? topics[i - 1] : '';
  const weekSkip = day <= 7 ? 8 : day <= 14 ? 15 : day <= 21 ? 22 : 30;
  const weekSkipLabel = day <= 7 ? 'Jump to Week 2' : day <= 14 ? 'Jump to Week 3' : day <= 21 ? 'Jump to Week 4' : 'Jump to Capstone';

  let cont, apply, brush, skip;

  if (day === 30) {
    cont = ['Review weak areas', ''];
    apply = ['Redo projects (Day 7/14/21)', ''];
    brush = ['Star this repo', ''];
    skip = ['Try the SQL Challenge', ''];
  } else {
    cont = [`Day ${day + 1}`, nextTopic];
    apply = [isProject ? 'Redo project your own way' : `Day ${day} practice files`, ''];
    brush = [i > 0 ? `Day ${day - 1} (${prevTopic})` : 'Rewatch setup guide', ''];
    skip = [`Day ${weekSkip}`, weekSkipLabel];
  }

  fs.writeFileSync(path.join(OUT, `day-${dd}-where-next.svg`), navTree(day, topic, cont, apply, brush, skip));
  count++;
}

console.log(`Generated ${count} navigation tree SVGs`);
