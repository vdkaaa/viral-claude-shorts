#!/usr/bin/env node
// Channels: each account/niche lives in canales/<canal>/ with its config (canal.json), formula, idea bank, results and videos.
//   node core/canal.ts                  -> lists every channel and the state of each of its videos
//   node core/canal.ts nuevo <nombre>   -> creates canales/<nombre>/ from canales/_plantilla/
// Other scripts import canalDe(videoDir) to read the channel config of a video (voice, language, Metricool brand…).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const REPO = path.resolve(import.meta.dirname, '..');
export const CANALES = path.join(REPO, 'canales');

export interface Canal {
  nombre: string;
  nicho: string;
  idioma: string;                    // ISO code: "es", "en"… (transcription and ElevenLabs)
  estilo: string;                    // styles/<estilo>
  voz: { id: string | null; modelo: string; acento?: string; tono?: string };   // id null -> ELEVENLABS_VOICE_ID from .env
  metricool: { blogId: string | null; timezone: string };
  redes: { instagram: string | null; youtube: string | null; tiktok: string | null };
  horarios: Record<string, string>;
  videosPorSemana: number;
  hashtagsBase: string[];
  guionModelo: string | null;        // path (relative to the channel) of the script to copy the format from
}

// The channel a video belongs to: the nearest canal.json above videoDir (null for ejemplos/ or loose folders).
export function canalDe(videoDir: string): { dir: string; id: string; cfg: Canal } | null {
  for (let d = path.resolve(videoDir); d !== path.dirname(d); d = path.dirname(d)) {
    const f = path.join(d, 'canal.json');
    if (fs.existsSync(f)) return { dir: d, id: path.basename(d), cfg: JSON.parse(fs.readFileSync(f, 'utf8')) };
    if (d === REPO) break;
  }
  return null;
}

// A video's state, from the files it has (the same states as each ideas.md).
export function estado(v: string): string {
  const has = (f: string) => fs.existsSync(path.join(v, f));
  if (has('publish.json')) {
    const p = JSON.parse(fs.readFileSync(path.join(v, 'publish.json'), 'utf8'));
    const dates: string[] = [...(p.scheduled ?? []), ...(p.tiktok ? [p.tiktok] : [])].map((s: { date: string }) => s.date.split(' ')[0]);
    if (dates.length) return dates.every((d) => new Date(d) < new Date()) ? 'publicado' : 'programado';
  }
  if (has('final.mp4')) return 'video';
  if (has('scenes.json')) return 'animando';
  if (['audio.mp3', 'audio.wav', 'audio.m4a'].some(has)) return 'audio';
  if (has('guion.md')) return 'guion';
  return 'idea';
}

const canales = () => fs.existsSync(CANALES)
  ? fs.readdirSync(CANALES).filter((c) => !c.startsWith('_') && fs.existsSync(path.join(CANALES, c, 'canal.json'))) : [];

function listar() {
  const all = canales();
  if (!all.length) { console.log('no channels yet: node core/canal.ts nuevo <nombre>'); return; }
  for (const c of all) {
    const cfg: Canal = JSON.parse(fs.readFileSync(path.join(CANALES, c, 'canal.json'), 'utf8'));
    const vd = path.join(CANALES, c, 'videos');
    const vids = fs.existsSync(vd) ? fs.readdirSync(vd).filter((x) => fs.statSync(path.join(vd, x)).isDirectory()) : [];
    const count: Record<string, number> = {};
    for (const x of vids) { const e = estado(path.join(vd, x)); count[e] = (count[e] ?? 0) + 1; }
    const brand = cfg.metricool.blogId ? `Metricool ${cfg.metricool.blogId}` : 'Metricool: sin conectar';
    console.log(`\n${c}  (${cfg.nombre} · ${brand} · ${cfg.videosPorSemana}/semana)\n  ${cfg.nicho}`);
    console.log('  ' + (vids.length ? Object.entries(count).map(([k, n]) => `${k}: ${n}`).join(' · ') : 'sin videos todavía'));
    for (const x of vids) console.log(`    ${estado(path.join(vd, x)).padEnd(10)} ${x}`);
  }
}

function nuevo(nombre: string) {
  if (!/^[a-z0-9-]+$/.test(nombre)) { console.error('el nombre va en minúsculas, sin espacios ni acentos (ej: datos-humanos)'); process.exit(2); }
  const dst = path.join(CANALES, nombre);
  if (fs.existsSync(dst)) { console.error(`${dst} ya existe`); process.exit(1); }
  fs.cpSync(path.join(CANALES, '_plantilla'), dst, { recursive: true });
  fs.mkdirSync(path.join(dst, 'videos'), { recursive: true });
  console.log(`creado ${dst}: completa canal.json, formula.md e ideas.md`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const [cmd, arg] = process.argv.slice(2);
  if (!cmd) listar();
  else if (cmd === 'nuevo' && arg) nuevo(arg);
  else { console.error('usage: node core/canal.ts            (lists channels)\n       node core/canal.ts nuevo <nombre>'); process.exit(2); }
}
