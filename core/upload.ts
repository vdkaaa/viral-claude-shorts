#!/usr/bin/env node
// final.mp4 -> a public link that Metricool can download to publish it on Instagram / YouTube.
//   usage: node core/upload.ts canales/<canal>/videos/<topic> [--tag shorts]
// Uploads canales/<canal>/videos/<topic>/final.mp4 as <topic>.mp4 to a GitHub release (default tag "shorts"; created if missing),
// prints the public URL and saves it as "videoUrl" in canales/<canal>/videos/<topic>/publish.json.
// Needs: the GitHub CLI logged in (`gh auth login`) and a PUBLIC repo (on a private repo the link needs a login and
// Metricool can't download it).
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const argv = process.argv.slice(2);
const opt = (k: string, d: string) => { const i = argv.indexOf(k); return i >= 0 ? argv.splice(i, 2)[1] : d; };
const TAG = opt('--tag', 'shorts');
const DIR = argv[0];
if (!DIR) { console.error('usage: node core/upload.ts canales/<canal>/videos/<topic> [--tag shorts]'); process.exit(2); }
const ROOT = path.resolve(DIR), TOPIC = path.basename(ROOT), VIDEO = path.join(ROOT, 'final.mp4');
if (!fs.existsSync(VIDEO)) { console.error(`${VIDEO} doesn't exist: render it first (node core/render.ts ${DIR})`); process.exit(1); }

const gh = (...args: string[]) => spawnSync('gh', args, { encoding: 'utf8' });
const repo = gh('repo', 'view', '--json', 'nameWithOwner,visibility');
if (repo.status !== 0) { console.error('the GitHub CLI is not ready. Run: gh auth login\n' + repo.stderr); process.exit(1); }
const { nameWithOwner, visibility } = JSON.parse(repo.stdout) as { nameWithOwner: string; visibility: string };
if (visibility !== 'PUBLIC') console.warn(`warning: ${nameWithOwner} is ${visibility}: Metricool won't be able to download the link`);

if (gh('release', 'view', TAG).status !== 0) {
  const c = gh('release', 'create', TAG, '--title', 'Shorts', '--notes', 'Final videos, uploaded by core/upload.ts');
  if (c.status !== 0) { console.error(c.stderr); process.exit(1); }
}
// the asset is named after the topic so every video gets its own stable link
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'upload-')), asset = path.join(tmp, `${TOPIC}.mp4`);
fs.copyFileSync(VIDEO, asset);
const up = gh('release', 'upload', TAG, asset, '--clobber');
fs.rmSync(tmp, { recursive: true, force: true });
if (up.status !== 0) { console.error(up.stderr); process.exit(1); }

const url = `https://github.com/${nameWithOwner}/releases/download/${TAG}/${TOPIC}.mp4`;
const pj = path.join(ROOT, 'publish.json');
const data = fs.existsSync(pj) ? JSON.parse(fs.readFileSync(pj, 'utf8')) : {};
data.videoUrl = url;
fs.writeFileSync(pj, JSON.stringify(data, null, 2) + '\n');
console.log(url);
