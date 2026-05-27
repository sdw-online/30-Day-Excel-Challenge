#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const required = ['What You\'ll Learn', 'Where To Next'];

const dayFolders = fs.readdirSync(ROOT).filter(f => f.startsWith('day_') && fs.statSync(path.join(ROOT, f)).isDirectory());

for (const folder of dayFolders) {
  const readme = path.join(ROOT, folder, 'README.md');
  if (!fs.existsSync(readme)) continue;

  const content = fs.readFileSync(readme, 'utf8');

  for (const section of required) {
    if (!content.includes(`## ${section}`)) {
      errors.push(`${folder}: missing section "${section}"`);
    }
  }
}

if (errors.length > 0) {
  console.error('README template check FAILED:\n');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('README template check PASSED: all days have required sections.');
}
