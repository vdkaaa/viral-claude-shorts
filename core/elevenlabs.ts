#!/usr/bin/env node
// guion.md -> audio.mp3 with the ElevenLabs API (replaces copying the text into the ElevenLabs website by hand).
//   usage: node core/elevenlabs.ts videos/<topic> [--voice <voice id>] [--model eleven_v3] [--force]
//          node core/elevenlabs.ts --voices        (lists your voices with their ids)
// Reads the section "## Texto para pegar en ElevenLabs" of videos/<topic>/guion.md (up to the next "## " heading),
// generates it in ONE take and writes videos/<topic>/audio.mp3, the pipeline's input.
// Config in .env at the repo root (never committed):
//   ELEVENLABS_API_KEY=...        (elevenlabs.io -> Developers -> API keys; "Text to Speech" + "Voices: read" permissions)
//   ELEVENLABS_VOICE_ID=...       (the voice you use; see --voices)
//   ELEVENLABS_MODEL=eleven_v3    (optional; with eleven_multilingual_v2 the [tags] are removed automatically)
// To protect your credits it won't regenerate if audio.mp3 already exists for the same text; --force does.
import fs from 'node:fs';
import path from 'node:path';

const ROOTDIR = path.resolve(import.meta.dirname, '..');
if (fs.existsSync(path.join(ROOTDIR, '.env'))) process.loadEnvFile(path.join(ROOTDIR, '.env'));
const argv = process.argv.slice(2);
const opt = (k: string, d: string) => { const i = argv.indexOf(k); return i >= 0 ? argv.splice(i, 2)[1] : d; };
const flag = (k: string) => { const i = argv.indexOf(k); return i >= 0 ? (argv.splice(i, 1), true) : false; };
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.error('missing ELEVENLABS_API_KEY: create a .env file at the repo root (see .env.example)'); process.exit(1); }
const API = 'https://api.elevenlabs.io';
const headers = { 'xi-api-key': KEY, 'content-type': 'application/json' };

// NOTE: after a fetch, end with process.exitCode (not process.exit): on Windows, exiting while fetch's sockets close
// crashes Node with "Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)".
async function listVoices() {
  const r = await fetch(`${API}/v2/voices?page_size=100`, { headers });
  if (!r.ok) {
    console.error(`voices: HTTP ${r.status} ${await r.text()}\n(the API key needs the "Voices: read" permission; your voice id can also be copied from the voice's page on elevenlabs.io)`);
    process.exitCode = 1; return;
  }
  const { voices } = await r.json() as { voices: { voice_id: string; name: string; category?: string; labels?: Record<string, string> }[] };
  for (const v of voices) console.log(`${v.voice_id}  ${v.name}  ${v.category ?? ''}  ${Object.values(v.labels ?? {}).join(', ')}`);
}
if (flag('--voices')) await listVoices();
else await main();

async function main() {
const VOICE = opt('--voice', process.env.ELEVENLABS_VOICE_ID || '');
const MODEL = opt('--model', process.env.ELEVENLABS_MODEL || 'eleven_v3');
const FORCE = flag('--force');
const DIR = argv[0];
if (!DIR) { console.error('usage: node core/elevenlabs.ts videos/<topic> [--voice <id>] [--model eleven_v3] [--force]'); process.exit(2); }
if (!VOICE) { console.error('missing the voice: set ELEVENLABS_VOICE_ID in .env or pass --voice <id> (list them with --voices)'); process.exit(1); }

const ROOT = path.resolve(DIR), GUION = path.join(ROOT, 'guion.md');
if (!fs.existsSync(GUION)) { console.error(`${GUION} doesn't exist`); process.exit(1); }
const md = fs.readFileSync(GUION, 'utf8');
const m = /^##\s*Texto para pegar en ElevenLabs\s*$([\s\S]*?)(?=^##\s|(?![\s\S]))/m.exec(md);
if (!m) { console.error('guion.md has no "## Texto para pegar en ElevenLabs" section'); process.exit(1); }
let text = m[1].split(/\n\s*\n/).map((p) => p.trim().replace(/\s*\n\s*/g, ' ')).filter(Boolean).join('\n\n');
if (MODEL !== 'eleven_v3') text = text.replace(/\[[^\]]*\]\s*/g, '');   // only v3 understands the [tags]
if (!text) { console.error('the ElevenLabs section is empty'); process.exit(1); }

const OUT = path.join(ROOT, 'audio.mp3'), STAMP = path.join(ROOT, 'voice', 'elevenlabs.txt');
const stamp = `${MODEL}\n${VOICE}\n${text}`;
if (!FORCE && fs.existsSync(OUT) && fs.existsSync(STAMP) && fs.readFileSync(STAMP, 'utf8') === stamp) {
  console.log(`audio.mp3 is already up to date with guion.md (use --force to regenerate) -> ${OUT}`); process.exit(0);
}
if (!FORCE && fs.existsSync(OUT) && !fs.existsSync(STAMP)) {
  console.error(`${OUT} already exists and wasn't made by this script (maybe you recorded it): use --force to replace it`); process.exit(1);
}

process.stdout.write(`  generating ${text.length} characters with ${MODEL}… `);
const r = await fetch(`${API}/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`, {
  method: 'POST', headers,
  body: JSON.stringify({ text, model_id: MODEL, language_code: 'es' }),
});
if (!r.ok) { console.error(`\ntext-to-speech: HTTP ${r.status} ${await r.text()}`); process.exitCode = 1; return; }
fs.writeFileSync(OUT, Buffer.from(await r.arrayBuffer()));
fs.mkdirSync(path.dirname(STAMP), { recursive: true });
fs.writeFileSync(STAMP, stamp);
console.log(`ok\n-> ${OUT}`);
}
