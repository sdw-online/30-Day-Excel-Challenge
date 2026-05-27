#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const errors = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const dir = path.dirname(filePath);
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const target = match[2];
    if (target.startsWith('http') || target.startsWith('#') || target.startsWith('mailto:')) continue;
    if (target === 'COMING_SOON') continue;

    const cleanTarget = target.split('#')[0];
    if (!cleanTarget) continue;

    const resolved = path.resolve(dir, cleanTarget);

    if (!fs.existsSync(resolved)) {
      const rel = path.relative(ROOT, filePath);
      errors.push(`${rel}: broken link [${match[1]}](${target})`);
    }
  }
}

// Check all day READMEs
const dayFolders = fs.readdirSync(ROOT).filter(f => f.startsWith('day_') && fs.statSync(path.join(ROOT, f)).isDirectory());
for (const folder of dayFolders) {
  const readme = path.join(ROOT, folder, 'README.md');
  if (fs.existsSync(readme)) checkFile(readme);
}

// Check root README
const rootReadme = path.join(ROOT, 'README.md');
if (fs.existsSync(rootReadme)) checkFile(rootReadme);

// Check guides
const guidesDir = path.join(ROOT, 'guides');
if (fs.existsSync(guidesDir)) {
  for (const f of fs.readdirSync(guidesDir).filter(f => f.endsWith('.md'))) {
    checkFile(path.join(guidesDir, f));
  }
}

if (errors.length > 0) {
  console.error('Link check FAILED:\n');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('Link check PASSED: all relative links resolve.');
}
