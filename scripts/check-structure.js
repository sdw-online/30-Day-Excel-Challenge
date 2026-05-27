#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const errors = [];

for (let i = 1; i <= 30; i++) {
  const dd = String(i).padStart(2, '0');
  // Find folder matching day_DD_*
  const entries = fs.readdirSync(ROOT).filter(f => f.startsWith(`day_${dd}_`) && fs.statSync(path.join(ROOT, f)).isDirectory());

  if (entries.length === 0) {
    errors.push(`day ${dd}: no folder found`);
    continue;
  }

  const dir = path.join(ROOT, entries[0]);

  if (!fs.existsSync(path.join(dir, 'README.md'))) {
    errors.push(`${entries[0]}: README.md missing`);
  }
}

if (errors.length > 0) {
  console.error('Structure check FAILED:\n');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('Structure check PASSED: all 30 day folders valid.');
}
