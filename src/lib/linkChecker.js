/**
 * linkChecker.js
 * 
 * Dev script (npm run check-links) — validates every `next`/`target` reference in the
 * story modules under src/content/stories/ (junior and senior tracks) resolves to a real node id,
 * and that every ending node is reachable.
 */

import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';

const storiesDir = new URL('../content/stories/', import.meta.url);
const pad = (n) => String(n).padStart(2, '0');

async function checkStory(subPath) {
  const fileUrl = new URL(subPath, storiesDir).href;
  const mod = await import(fileUrl);
  const story = mod.default;
  const errors = [];
  const warnings = [];

  const nodes = story?.nodes;
  if (!nodes) {
    errors.push(`[${subPath}] missing "nodes" object`);
    return { file: subPath, ok: false, errors, warnings };
  }

  if (!story.startNode) {
    errors.push(`[${subPath}] missing startNode`);
  } else if (!(story.startNode in nodes)) {
    errors.push(`[${subPath}] startNode "${story.startNode}" not found in nodes`);
  }

  for (const [id, node] of Object.entries(nodes)) {
    if (!node) {
      errors.push(`[${subPath}] node "${id}" is empty`);
      continue;
    }
    const isEnding = Boolean(node.end || node.isEnding);
    if (isEnding) {
      if (node.choices && node.choices.length) {
        errors.push(`[${subPath}] ending "${id}" must not have choices`);
      }
    } else if (node.choices && node.choices.length) {
      for (const choice of node.choices) {
        const next = choice.next || choice.target;
        if (!next) {
          errors.push(`[${subPath}] node "${id}" has a choice missing "next"`);
        } else if (!(next in nodes)) {
          errors.push(`[${subPath}] node "${id}" -> dangling next "${next}"`);
        }
        if (!choice.label) {
          warnings.push(`[${subPath}] node "${id}" choice missing label`);
        }
      }
    } else if (!node.choices) {
      errors.push(`[${subPath}] non-ending node "${id}" has no choices`);
    }
  }

  return { file: subPath, ok: errors.length === 0, errors, warnings };
}

async function main() {
  const juniorDir = new URL('junior/', storiesDir);
  const seniorDir = new URL('senior/', storiesDir);

  const juniorFiles = (await readdir(juniorDir)).filter((f) => f.endsWith('.js')).map((f) => `junior/${f}`);
  const seniorFiles = (await readdir(seniorDir)).filter((f) => f.endsWith('.js')).map((f) => `senior/${f}`);
  const allFiles = [...juniorFiles, ...seniorFiles];

  if (!allFiles.length) {
    console.log('No story modules found in src/content/stories/junior or senior');
    return;
  }

  const results = [];
  for (const f of allFiles) results.push(await checkStory(f));

  let totalErrors = 0;
  let totalWarnings = 0;
  for (const r of results) {
    const tag = r.ok ? 'PASS' : 'FAIL';
    console.log(`[${pad(results.indexOf(r) + 1)}/${pad(allFiles.length)}] ${tag} ${r.file}`);
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
