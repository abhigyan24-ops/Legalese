/**
 * linkChecker.js
 * 
 * Dev script (npm run check-links) — validates every `next` reference in the
 * story modules under src/content/stories/ resolves to a real node id, and that
 * every ending node is marked end:true with an outcome. Per spec Section 8 rule 4
 * and Section 19 (Day 2).
 */

import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const storiesDir = new URL('../content/stories/', import.meta.url);

const pad = (n) => String(n).padStart(2, '0');

async function checkStory(file) {
  const fileUrl = new URL(file, storiesDir).href;
  const mod = await import(fileUrl);
  const story = mod.default;
  const errors = [];
  const warnings = [];

  const nodes = story?.nodes;
  if (!nodes) {
    errors.push(`[${file}] missing "nodes" object`);
    return { file, ok: false, errors, warnings };
  }

  const nodeIds = Object.keys(nodes);

  if (!story.startNode) {
    errors.push(`[${file}] missing startNode`);
  } else if (!(story.startNode in nodes)) {
    errors.push(`[${file}] startNode "${story.startNode}" not found in nodes`);
  }

  for (const [id, node] of Object.entries(nodes)) {
    if (!node) {
      errors.push(`[${file}] node "${id}" is empty`);
      continue;
    }
    if (node.end) {
      if (node.outcome === undefined) {
        errors.push(`[${file}] ending "${id}" missing outcome`);
      }
      if (!node.badge) warnings.push(`[${file}] ending "${id}" has no badge`);
      if (node.choices && node.choices.length) {
        errors.push(`[${file}] ending "${id}" must not have choices`);
      }
    } else if (node.choices && node.choices.length) {
      for (const choice of node.choices) {
        if (!choice.next) {
          errors.push(`[${file}] node "${id}" has a choice missing "next"`);
        } else if (!(choice.next in nodes)) {
          errors.push(`[${file}] node "${id}" -> dangling next "${choice.next}"`);
        }
        if (!choice.label) {
          warnings.push(`[${file}] node "${id}" choice missing label`);
        }
      }
    } else if (!node.choices) {
      errors.push(`[${file}] non-ending node "${id}" has no choices`);
    }
  }

  return { file, ok: errors.length === 0, errors, warnings };
}

async function main() {
  const files = (await readdir(storiesDir)).filter((f) => f.endsWith('.js'));
  if (!files.length) {
    console.log('No story modules found in src/content/stories/');
    return;
  }

  const results = [];
  for (const f of files) results.push(await checkStory(f));

  let totalErrors = 0;
  let totalWarnings = 0;
  for (const r of results) {
    const tag = r.ok ? 'PASS' : 'FAIL';
    console.log(`[${pad(results.indexOf(r) + 1)}/${pad(files.length)}] ${tag} ${r.file}`);
    for (const e of r.errors) console.log(`    ERROR:  ${e}`);
    for (const w of r.warnings) console.log(`    WARN:   ${w}`);
    totalErrors += r.errors.length;
    totalWarnings += r.warnings.length;
  }

  console.log('\n---');
  console.log(`Stories checked: ${results.length}`);
  console.log(`Errors: ${totalErrors}  Warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.error('\n✗ Story link validation failed.');
    process.exit(1);
  }
  console.log('\n✓ All story links valid.');
}

main().catch((err) => {
  console.error('linkChecker crashed:', err);
  process.exit(1);
});
