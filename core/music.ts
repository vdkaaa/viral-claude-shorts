#!/usr/bin/env node
// Background music + sound effects, synthesized in code and locked to the scenes (no third-party audio files).
//   usage: node core/music.ts videos/<topic> [--mood warm|technical|airy|cinematic] [--bpm 100]
//   reads  scenes.json (with timings: run core/scenes.ts first)
//   writes videos/<topic>/music.wav (48 kHz stereo): a chord pad, a soft pulse, a "swish" on every
//   scene change and a low hit on "stat" scenes (the number is the strong moment).
// The default mood comes from the style: papercut=warm, isometric=technical, flat2d=airy, 3d=cinematic.
// If you bring your own music, save it as videos/<topic>/own-music.wav and this step is skipped.
import fs from 'node:fs';
import path from 'node:path';
import type { Plan } from './types.ts';

const argv = process.argv.slice(2);
const opt = (k: string, d: string) => { const i = argv.indexOf(k); return i >= 0 ? argv.splice(i, 2)[1] : d; };
const DIR = argv[0];
if (!DIR) { console.error('usage: node core/music.ts videos/<topic> [--mood warm]'); process.exit(2); }
const ROOT = path.resolve(DIR);
const E: Plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'scenes.json'), 'utf8'));
if (E.duration == null || E.scenes.some((s) => s.t0 == null)) { console.error('scenes.json has no timings: run node core/scenes.ts first'); process.exit(1); }
const MOODS: Record<string, string> = { papercut: 'warm', isometric: 'technical', flat2d: 'airy', '3d': 'cinematic' };
const MOOD = opt('--mood', MOODS[E.style] || 'warm');
const BPMS: Record<string, number> = { warm: 96, technical: 110, airy: 90, cinematic: 84 };
const BPM = Number(opt('--bpm', String(BPMS[MOOD] ?? 96)));
const SR = 48000, DUR = E.duration, N = Math.ceil(DUR * SR);
const L = new Float32Array(N), R = new Float32Array(N);

// deterministic: the same plan always gives the same audio
let seed = 1234567;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const NOTE: Record<string, number> = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 };
const nz = (n: string) => { const m = /^([A-G])(s|b)?(\d)$/.exec(n)!; const st = NOTE[m[1]] + (m[2] === 's' ? 1 : m[2] === 'b' ? -1 : 0); return 440 * 2 ** (st / 12 + (Number(m[3]) - 4)); };
const PROGS: Record<string, string[][]> = {
  warm: [['D3', 'A3', 'Fs4', 'D4'], ['B2', 'Fs3', 'D4', 'A4'], ['G2', 'D3', 'B3', 'D4'], ['A2', 'E3', 'Cs4', 'A3']],
  technical: [['A2', 'E3', 'B3', 'C4'], ['F2', 'C3', 'G3', 'A3'], ['C3', 'G3', 'D4', 'E4'], ['G2', 'D3', 'A3', 'B3']],
  airy: [['C3', 'G3', 'E4', 'B4'], ['A2', 'E3', 'C4', 'G4'], ['F2', 'C3', 'A3', 'E4'], ['G2', 'D3', 'B3', 'Fs4']],
  cinematic: [['D2', 'A2', 'F3', 'A3'], ['Bb1', 'F2', 'D3', 'F3'], ['F2', 'C3', 'A3', 'C4'], ['C2', 'G2', 'E3', 'G3']],
};
const PROG = PROGS[MOOD] ?? PROGS.warm;
const TIMBRES: Record<string, string> = { warm: 'tri', technical: 'saw', airy: 'sine', cinematic: 'saw' };
const TIMBRE = TIMBRES[MOOD] ?? 'sine';
const osc = (type: string, ph: number) => type === 'sine' ? Math.sin(ph) : type === 'tri' ? 2 / Math.PI * Math.asin(Math.sin(ph)) : 2 * ((ph / (2 * Math.PI)) % 1) - 1;
function add(t0: number, dur: number, fn: (u: number) => number, vol: number, pan = 0, bus: Float32Array[] = [L, R]) {   // fn(local t) -> sample; the caller applies the envelope
  const a = Math.max(0, Math.floor(t0 * SR)), b = Math.min(N, Math.floor((t0 + dur) * SR));
  const gl = vol * Math.cos((pan + 1) * Math.PI / 4), gr = vol * Math.sin((pan + 1) * Math.PI / 4);
  for (let i = a; i < b; i++) { const v = fn((i - a) / SR); bus[0][i] += v * gl; bus[1][i] += v * gr; }
}
// pad: one chord per bar, slow attack and release, filtered (one pole)
const BAR = 4 * 60 / BPM;
for (let k = 0, t = 0; t < DUR; k++, t += BAR) {
  const ch = PROG[k % PROG.length];
  ch.forEach((n, j) => {
    const f = nz(n), det = 1 + (j % 2 ? 0.002 : -0.002); let y = 0;
    add(t, BAR + 0.6, (u) => { const env = Math.min(1, u / 0.5) * Math.min(1, (BAR + 0.6 - u) / 0.6); const x = osc(TIMBRE, 2 * Math.PI * f * det * u); y += 0.06 * (x - y); return env * y; }, 0.16, j % 2 ? 0.35 : -0.35);
  });
}
// pulse: a short chord note every eighth, soft (goes quiet 1.2 s before every "stat": the silence before the hit)
const E8 = 30 / BPM, stats = E.scenes.filter((s) => s.type === 'stat').map((s) => s.t0);
for (let k = 0, t = E8; t < DUR - 0.5; k++, t += E8) {
  if (stats.some((d) => t > d - 1.2 && t < d)) continue;
  const ch = PROG[Math.floor(t / BAR) % PROG.length], f = nz(ch[(k * 3) % ch.length]) * 2;
  add(t, 0.35, (u) => Math.sin(2 * Math.PI * f * u) * Math.exp(-u * 11), k % 2 ? 0.05 : 0.075, k % 4 < 2 ? 0.25 : -0.25);
}
// per-scene effects: a filtered-noise swish on entry, a low hit + bell on stats
for (const s of E.scenes.slice(1)) {
  let y = 0; const d = 0.32;
  add(s.t0 - d * 0.7, d, (u) => { y += 0.18 * ((rnd() * 2 - 1) - y); return y * Math.sin(Math.PI * u / d) ** 2; }, 0.28, 0);
}
for (const t of stats) {
  add(t, 0.9, (u) => Math.sin(2 * Math.PI * (55 + 50 * Math.exp(-u * 18)) * u) * Math.exp(-u * 4.5), 0.9, 0);
  [nz('A5'), nz('E6')].forEach((f, j) => add(t + j * 0.06, 1.4, (u) => Math.sin(2 * Math.PI * f * u) * Math.exp(-u * 3), 0.07, j ? 0.3 : -0.3));
}
// outro: final fade
for (let i = Math.max(0, N - SR); i < N; i++) { const g = (N - i) / SR; L[i] *= g; R[i] *= g; }

// ---- object sound effects -> sfx.wav (its own track: mix.ts lays it over the voice WITHOUT ducking it under the voice)
// In scenes.json any key can carry "sfx": "pop" or a list ["whoosh@-0.2", "punch@0.25"] (name@offset in seconds from the key).
const XL = new Float32Array(N), XR = new Float32Array(N), X = [XL, XR];
const noise = () => rnd() * 2 - 1;
const SFX: Record<string, (t: number, pan: number) => void> = {
  pop(t, p) { let ph = 0; add(t, 0.16, (u) => { ph += 2 * Math.PI * (260 + 5200 * u) / SR; return Math.sin(ph) * Math.exp(-u * 28); }, 0.55, p, X); },
  whoosh(t, p) { let y = 0; const d = 0.42; add(t - d * 0.6, d, (u) => { const k = Math.sin(Math.PI * u / d); y += (0.04 + 0.35 * k) * (noise() - y); return y * k * k; }, 0.9, p, X); },
  snip(t, p) { for (const o of [0, 0.075]) { let y = 0; add(t + o, 0.04, (u) => { const x = noise(); const h = x - y; y += 0.3 * (x - y); return h * Math.exp(-u * 160); }, 0.45, p, X); } },
  click(t, p) {
    for (const [o, k] of [[0, 260], [0.07, 140]]) { let y = 0; add(t + o, 0.06, (u) => { const x = noise(); const h = x - y; y += 0.25 * (x - y); return h * Math.exp(-u * k); }, 0.5, p, X); }
    add(t, 0.12, (u) => Math.sin(2 * Math.PI * 140 * u) * Math.exp(-u * 45), 0.5, p, X);
  },
  boing(t, p) { let ph = 0; add(t, 0.65, (u) => { ph += 2 * Math.PI * (200 + 60 * Math.sin(2 * Math.PI * 11 * u) * Math.exp(-u * 3) + 140 * Math.exp(-u * 12)) / SR; return Math.sin(ph) * Math.exp(-u * 5); }, 0.45, p, X); },
  punch(t, p) {
    add(t, 0.4, (u) => Math.sin(2 * Math.PI * (42 + 120 * Math.exp(-u * 24)) * u) * Math.exp(-u * 8), 1.0, p, X);
    let y = 0; add(t, 0.12, (u) => { y += 0.25 * (noise() - y); return y * Math.exp(-u * 35); }, 0.9, p, X);
  },
  jingle(t, p) {   // sleigh bells: three quick shakes of high, inharmonic partials
    for (const o of [0, 0.1, 0.2]) [2950, 4170, 5310, 6830].forEach((f, j) => { const ph = rnd() * 6.28; add(t + o, 0.35, (u) => Math.sin(2 * Math.PI * f * u + ph) * Math.exp(-u * 16), 0.09, p + (j % 2 ? 0.25 : -0.25), X); });
  },
  ding(t, p) { [[1318.5, 3, 0.24], [2637, 5, 0.1], [3955, 8, 0.05]].forEach(([f, k, v]) => add(t, 1.5, (u) => Math.sin(2 * Math.PI * f * u) * Math.exp(-u * k), v, p, X)); },
  sparkle(t, p) { ['C6', 'E6', 'G6', 'C7', 'E7'].forEach((n, j) => add(t + j * 0.05, 0.45, (u) => Math.sin(2 * Math.PI * nz(n) * u) * Math.exp(-u * 10), 0.12, j % 2 ? 0.4 : -0.4, X)); },
  tape(t, p) {   // VHS whirr: a rising buzz
    const d = 0.5; let ph = 0; add(t, d, (u) => { ph += 2 * Math.PI * (90 + 220 * u / d) / SR; return osc('saw', ph) * Math.min(1, u / 0.03) * Math.min(1, (d - u) / 0.08); }, 0.12, p, X);
    let y = 0; add(t, d, (u) => { y += 0.1 * (noise() - y); return y * Math.min(1, (d - u) / 0.08); }, 0.25, p, X);
  },
  grunt(t, p) {   // a low, gruff animal grunt: a buzzy saw tone, chopped ~24 times a second, low-passed
    const d = 0.3; let ph = 0, y = 0;
    add(t, d, (u) => { ph += 2 * Math.PI * (95 + 25 * Math.sin(Math.PI * u / d)) / SR; const x = osc('saw', ph) * (0.6 + 0.4 * Math.sin(2 * Math.PI * 24 * u)); y += 0.12 * (x - y); return y * Math.min(1, u / 0.02) * Math.min(1, (d - u) / 0.08); }, 0.9, p, X);
  },
  oink(t, p) {   // a pig squeal: a nasal tone that rises and falls, with a fast wobble
    const d = 0.32; let ph = 0;
    add(t, d, (u) => { ph += 2 * Math.PI * (430 + 420 * Math.sin(Math.PI * Math.min(1, u / (d * 0.7))) + 25 * Math.sin(2 * Math.PI * 32 * u)) / SR;
      return (Math.sin(ph) + 0.55 * Math.sin(2 * ph) + 0.35 * Math.sin(3 * ph) + 0.2 * Math.sin(4 * ph)) * Math.min(1, u / 0.015) * Math.exp(-u * 3) * Math.min(1, (d - u) / 0.05); }, 0.14, p, X);
  },
  tv(t, p) { add(t, 0.32, (u) => noise() * (Math.floor(u * 40) % 3 ? 1 : 0.4) * Math.min(1, (0.32 - u) / 0.06), 0.18, p, X); SFX.click(t + 0.3, p); },
};
let nSfx = 0;
for (const s of E.scenes) for (const k of s.keys || []) {
  const list = (k as { sfx?: string | string[] }).sfx; if (!list) continue;
  for (const item of Array.isArray(list) ? list : [list]) {
    const m = /^(\w+)(?:@([-+]?\d*\.?\d+))?$/.exec(item.trim());
    if (!m || !SFX[m[1]]) { console.error(`${s.id}.${k.id}: unknown sound effect "${item}" (${Object.keys(SFX).join(', ')})`); process.exit(1); }
    SFX[m[1]](k.t + Number(m[2] || 0), 0); nSfx++;
  }
}

// to 16-bit WAV (with a soft limiter)
function wav(file: string, A: Float32Array, B: Float32Array) {
  const buf = Buffer.alloc(44 + N * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(Math.tanh(A[i]) * 32000), 44 + i * 4); buf.writeInt16LE(Math.round(Math.tanh(B[i]) * 32000), 46 + i * 4); }
  fs.writeFileSync(file, buf);
}
wav(path.join(ROOT, 'music.wav'), L, R);
if (nSfx) wav(path.join(ROOT, 'sfx.wav'), XL, XR); else fs.rmSync(path.join(ROOT, 'sfx.wav'), { force: true });
console.log(`music.wav: ${DUR.toFixed(2)} s, mood ${MOOD}, ${BPM} BPM, ${E.scenes.length - 1} swishes, ${stats.length} stat hit(s)${nSfx ? `; sfx.wav: ${nSfx} sound effect(s)` : ''}`);
