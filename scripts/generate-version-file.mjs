#!/usr/bin/env node
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Root dir assumed to be one level up from scripts
const rootDir = join(__dirname, '..');

const pkgPath = join(rootDir, 'package.json');
const outDir = join(rootDir, 'public', 'api');
const outFile = join(outDir, 'version.json');

try {
  const pkgRaw = readFileSync(pkgPath, 'utf-8');
  const pkg = JSON.parse(pkgRaw);
  const version = pkg.version || '0.0.0';
  const timestamp = new Date().toISOString();
  const build = process.env.GITHUB_RUN_NUMBER || process.env.BUILD_NUMBER || null;

  const payload = {
    version,
    timestamp,
    build,
    commit: process.env.GITHUB_SHA || null,
    description: 'Static build metadata generated at build time.'
  };

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, JSON.stringify(payload, null, 2));
  console.log(`Wrote version file to ${outFile}:`, payload);
} catch (err) {
  console.error('Failed to generate version file', err);
  process.exitCode = 1;
}
