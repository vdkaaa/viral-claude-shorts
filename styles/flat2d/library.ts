// =====================================================================
//  Flat 2D — library: reusable flat SVG pieces and one generic scene per type.
//  Runs in the browser (the adapter strips the types). Every piece returns SVG markup (a string). Frame coordinates: 1080 x 1920.
//  Safe zone (TikTok/Reels/Shorts cover the rest with their interface): x 60–940, y 220–1480 (SAFE). Titles sit on top,
//  so the art's usable area is y 660–1270 with a stat card, down to 1480 without one. Only backgrounds go past it.
//  Style rules: flat colors, no outlines, one flat shadow (same color, darker) offset.
//  GSAP NOTE: every piece puts its id on a <g> WITHOUT a transform and the position on an inner <g>; that way GSAP's
//  x/y/scale add to the position instead of replacing it.
// =====================================================================
const F2 = {
  blue: '#4c7dff', blueD: '#2f55c9', sky: '#5fb6f5', skyD: '#3a8fd8', night: '#14213d', yellow: '#ffc83d', orange: '#ff8a3d', red: '#ff5a5f',
  green: '#3ccf91', greenD: '#24a872', purple: '#8b6cff', pink: '#ff7eb6', white: '#ffffff', cream: '#fff4dc', gray: '#c9d3ea',
};
// same numbers as SAFE in core/style.ts (the browser can't import it)
const SAFE = { left: 60, right: 940, top: 220, bottom: 1480 };
const RAINBOW = ['#ff5a5f', '#ff8a3d', '#ffc83d', '#3ccf91', '#4c7dff', '#8b6cff'];
const svg = (body: string, defs = '') => `<svg viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg"><defs>${defs}</defs>${body}</svg>`;
function f2Sun(id: string, cx: number, cy: number, r: number, c = F2.yellow) {
  let rays = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; rays += `<rect x="${-10}" y="${-r - 70}" width="20" height="44" rx="10" fill="${c}" transform="rotate(${a * 180 / Math.PI})"/>`; }
  return `<g id="${id}"><g transform="translate(${cx} ${cy})"><g class="rays">${rays}</g><circle r="${r + 14}" fill="${c}" opacity="0.35"/><circle class="disc" r="${r}" fill="${c}"/></g></g>`;
}
function f2Cloud(id: string, x: number, y: number, s = 1, c = F2.white) {
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="6" cy="14" rx="130" ry="40" fill="#000" opacity="0.08"/>
    <circle cx="-60" cy="0" r="46" fill="${c}"/><circle cx="0" cy="-26" r="62" fill="${c}"/><circle cx="62" cy="-4" r="48" fill="${c}"/><rect x="-110" y="0" width="220" height="46" rx="23" fill="${c}"/></g></g>`;
}
function f2Hill(id: string, y: number, c: string, c2: string, amp = 60) {
  return `<g id="${id}"><path d="M-40 ${y} C 260 ${y - amp}, 600 ${y + amp}, 1120 ${y - amp * 0.5} L1120 1960 L-40 1960 Z" fill="${c}"/>
    <path d="M-40 ${y + 40} C 300 ${y - amp + 40}, 640 ${y + amp + 50}, 1120 ${y - amp * 0.5 + 40} L1120 1960 L-40 1960 Z" fill="${c2}" opacity="0.5"/></g>`;
}
function f2Molecule(id: string, x: number, y: number, r = 34, c = F2.white, c2 = F2.gray) {   // two joined spheres (N2 / O2), with a flat shine
  return `<g id="${id}"><g transform="translate(${x} ${y})"><circle cx="-${r * 0.7}" cy="6" r="${r}" fill="${c2}"/><circle cx="${r * 0.7}" cy="6" r="${r}" fill="${c2}"/>
    <circle cx="-${r * 0.7}" r="${r}" fill="${c}"/><circle cx="${r * 0.7}" r="${r}" fill="${c}"/><circle cx="-${r * 0.9}" cy="-${r * 0.35}" r="${r * 0.25}" fill="#fff" opacity="0.8"/></g></g>`;
}
// a wave (for light): from x0 to x1 at height y, with wavelength L and amplitude A
function f2Wave(id: string, x0: number, x1: number, y: number, L: number, A: number, c: string, w = 12) {
  let d = `M${x0} ${y}`; for (let x = x0; x <= x1; x += 6) d += ` L${x} ${(y + Math.sin((x - x0) / L * Math.PI * 2) * A).toFixed(1)}`;
  return `<path id="${id}" d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function f2Arrow(id: string, x1: number, y1: number, x2: number, y2: number, c: string, w = 14) {
  const a = Math.atan2(y2 - y1, x2 - x1), h = w * 2.4;
  return `<g id="${id}"><line x1="${x1}" y1="${y1}" x2="${x2 - Math.cos(a) * h * 0.6}" y2="${y2 - Math.sin(a) * h * 0.6}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M${x2} ${y2} L${x2 - Math.cos(a - 0.5) * h} ${y2 - Math.sin(a - 0.5) * h} L${x2 - Math.cos(a + 0.5) * h} ${y2 - Math.sin(a + 0.5) * h} Z" fill="${c}"/></g>`;
}
function f2Person(id: string, x: number, y: number, s = 1) {   // a simple person looking up
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-46" y="0" width="92" height="150" rx="40" fill="${F2.red}"/>
    <rect x="-38" y="130" width="30" height="90" rx="14" fill="${F2.night}"/><rect x="8" y="130" width="30" height="90" rx="14" fill="${F2.night}"/>
    <circle cx="0" cy="-50" r="52" fill="#f2c29b"/><path d="M-52 -60 Q0 -130 52 -60 Q30 -90 0 -88 Q-30 -90 -52 -60Z" fill="#3b2a24"/>
    <circle cx="14" cy="-62" r="7" fill="${F2.night}"/><circle cx="-14" cy="-62" r="7" fill="${F2.night}"/><path d="M-12 -36 Q0 -26 12 -36" stroke="${F2.night}" stroke-width="5" fill="none" stroke-linecap="round"/></g></g>`;
}
// a detailed person (same friendly face as f2Person): eyebrows, nose, ears, fuller hair, shirt with collar and buttons,
// sleeves and hands, belt, pants and white sneakers. Origin at the chest top like f2Person: head centre (0,-50), feet at ~226.
// Parts: .eyes (blink), .armL / .armR (pivots -54 14 / 54 14)
function f2Me(id: string, x: number, y: number, s = 1, shirt: string = F2.red, hair = '#3b2a24', pants = '#3f5aa6', skin = '#f2c29b') {
  const SKD = '#e3a77b';
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="228" rx="66" ry="10" fill="#000" opacity="0.2"/>
    <rect x="-38" y="114" width="33" height="98" rx="12" fill="${pants}"/><rect x="5" y="114" width="33" height="98" rx="12" fill="${pants}"/>
    <rect x="-22" y="130" width="4" height="74" rx="2" fill="#000" opacity="0.15"/><rect x="20" y="130" width="4" height="74" rx="2" fill="#000" opacity="0.15"/>
    <path d="M-48 204 L-4 204 Q4 204 4 214 L4 222 L-54 222 Q-58 210 -48 204Z" fill="#fff"/><rect x="-56" y="217" width="60" height="9" rx="4" fill="#8d99ae"/>
    <path d="M4 204 L48 204 Q58 210 54 222 L-4 222 L-4 214 Q-4 204 4 204Z" fill="#fff"/><rect x="-4" y="217" width="60" height="9" rx="4" fill="#8d99ae"/>
    <g class="armL"><rect x="-68" y="6" width="26" height="62" rx="13" fill="${shirt}"/><rect x="-65" y="56" width="20" height="54" rx="10" fill="${skin}"/><circle cx="-55" cy="114" r="14" fill="${skin}"/></g>
    <g class="armR"><rect x="42" y="6" width="26" height="62" rx="13" fill="${shirt}"/><rect x="45" y="56" width="20" height="54" rx="10" fill="${skin}"/><circle cx="55" cy="114" r="14" fill="${skin}"/></g>
    <rect x="-48" y="0" width="96" height="128" rx="32" fill="${shirt}"/><path d="M12 0 Q48 0 48 32 L48 96 Q48 128 12 128Z" fill="#000" opacity="0.12"/>
    <rect x="-46" y="104" width="92" height="16" fill="#2b2d42"/><rect x="-10" y="105" width="20" height="14" rx="3" fill="${F2.yellow}"/>
    ${[38, 62, 86].map((by) => `<circle cx="0" cy="${by}" r="4" fill="#fff" opacity="0.8"/>`).join('')}
    <rect x="-12" y="-10" width="24" height="18" fill="${SKD}"/>
    <path d="M-24 -2 L0 24 L-6 -2Z M24 -2 L0 24 L6 -2Z" fill="#fff"/>
    <circle cx="-52" cy="-46" r="11" fill="${SKD}"/><circle cx="52" cy="-46" r="11" fill="${SKD}"/>
    <circle cx="0" cy="-50" r="52" fill="${skin}"/>
    <path d="M-54 -50 Q-60 -110 -6 -112 Q46 -116 56 -64 Q58 -48 50 -40 Q46 -76 18 -84 Q-10 -70 -40 -80 Q-50 -66 -50 -42 Q-56 -44 -54 -50Z" fill="${hair}"/>
    <path d="M-26 -96 L-4 -100" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.25"/>
    <path d="M-24 -76 L-6 -78 M6 -78 L24 -76" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>
    <g class="eyes"><circle cx="14" cy="-62" r="7" fill="${F2.night}"/><circle cx="-14" cy="-62" r="7" fill="${F2.night}"/><circle cx="16" cy="-64" r="2.5" fill="#fff"/><circle cx="-12" cy="-64" r="2.5" fill="#fff"/></g>
    <path d="M0 -56 Q6 -46 0 -44" stroke="${SKD}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M-12 -34 Q0 -24 12 -34" stroke="${F2.night}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="-30" cy="-38" r="8" fill="#ff9aa2" opacity="0.5"/><circle cx="30" cy="-38" r="8" fill="#ff9aa2" opacity="0.5"/></g></g>`;
}
// pops an element in (scale 0 -> 1 with a little bounce): the most common entrance
const f2Pop = (tl: gsap.core.Timeline, sel: string, t: number, d = 0.45) => tl.fromTo(sel, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: d, ease: 'back.out(2)' }, t);

// ---------- shared props (used by several videos) ----------
const F2FONT = 'font-family="Nunito, Avenir Next, Arial, sans-serif" font-weight="900"';
const f2Txt = (x: number, y: number, size: number, fill: string, t: string, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${fill}" ${F2FONT} ${extra}>${t}</text>`;
const F2OUTLINE = 'stroke="#14213d" stroke-width="10" paint-order="stroke"';
// how many repeats of a loop of length `per` fill `d` seconds (for yoyo/repeat loops that must not outlive the scene)
const f2Reps = (d: number, per: number) => Math.max(0, Math.ceil(d / per) - 1);
// deterministic background stars in the art area
const f2Stars = (n = 22) => [...Array(n)].map((_, i) => `<circle cx="${(i * 197) % 1080}" cy="${640 + ((i * 331) % 860)}" r="${2 + (i % 3)}" fill="#fff" opacity="0.25"/>`).join('');
// a retro TV; screen spans x -262..198, y -184..146 (local). Put f2Static() first in `screen` for the static (class "static").
function f2Tv(id: string, x: number, y: number, s: number, screen: string) {
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
    <line x1="-30" y1="-210" x2="-120" y2="-310" stroke="${F2.gray}" stroke-width="10" stroke-linecap="round"/><line x1="30" y1="-210" x2="120" y2="-310" stroke="${F2.gray}" stroke-width="10" stroke-linecap="round"/>
    <rect x="-280" y="-196" width="580" height="380" rx="40" fill="#000" opacity="0.2"/><rect x="-290" y="-210" width="580" height="380" rx="40" fill="#a0673a"/>
    <rect x="-262" y="-184" width="460" height="330" rx="24" fill="#0b1226"/>${screen}
    <circle cx="242" cy="-110" r="24" fill="#7c4a25"/><circle cx="242" cy="-30" r="24" fill="#7c4a25"/></g></g>`;
}
const f2Static = () => `<g class="static">${[...Array(12)].map((_, i) => `<rect x="-262" y="${-184 + i * 27.5}" width="460" height="14" fill="#fff" opacity="${0.08 + (i % 3) * 0.08}"/>`).join('')}</g>`;
// a generic gold trophy with a star and a plate (never a real award statuette)
function f2Trophy(id: string, x: number, y: number, s = 1, plate = '') {
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-100 -150 L100 -150 Q100 10 0 40 Q-100 10 -100 -150Z" fill="#ffc83d"/><path d="M0 -150 L100 -150 Q100 10 0 40Z" fill="#e0a21f"/>
    <path d="M-100 -120 Q-170 -120 -160 -60 Q-150 -10 -80 -10" fill="none" stroke="#ffc83d" stroke-width="22"/>
    <path d="M100 -120 Q170 -120 160 -60 Q150 -10 80 -10" fill="none" stroke="#e0a21f" stroke-width="22"/>
    <rect x="-22" y="30" width="44" height="60" fill="#e0a21f"/><rect x="-100" y="86" width="200" height="70" rx="12" fill="#2b2d42"/>
    ${plate ? f2Txt(0, 134, 36, '#ffc83d', plate) : ''}
    <path d="M0 -122 L14 -88 L50 -88 L22 -66 L32 -30 L0 -52 L-32 -30 L-22 -66 L-50 -88 L-14 -88Z" fill="#fff" opacity="0.9"/></g></g>`;
}
// a rubber stamp (animate it with scale 2 -> 1 for the "thump")
function f2Stamp(id: string, x: number, y: number, t: string, c: string, rot = -10, w = 420, size = 74) {
  return `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot})"><rect x="${-w / 2}" y="-62" width="${w}" height="124" rx="22" fill="none" stroke="${c}" stroke-width="12"/>${f2Txt(0, size * 0.38, size, c, t)}</g></g>`;
}
// a comment bubble with "..." (or a short text)
function f2Bubble(id: string, x: number, y: number, s: number, c: string, t = '') {
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-110" y="-70" width="220" height="130" rx="40" fill="${c}"/><path d="M-50 50 L-80 100 L-10 56 Z" fill="${c}"/>
    ${t ? f2Txt(0, 14, 50, F2.night, t) : `<circle cx="-50" cy="-5" r="14" fill="${F2.night}"/><circle cx="0" cy="-5" r="14" fill="${F2.night}"/><circle cx="50" cy="-5" r="14" fill="${F2.night}"/>`}</g></g>`;
}
function f2Grave(id: string, x: number, y: number, s = 1, t = 'RIP') {
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-80 80 L-80 -50 Q-80 -110 0 -110 Q80 -110 80 -50 L80 80Z" fill="#8d99ae"/><path d="M14 80 L14 -108 Q80 -100 80 -50 L80 80Z" fill="#6c7891"/>
    ${f2Txt(0, 0, 46, '#4a5368', t)}<rect x="-104" y="74" width="208" height="26" rx="10" fill="#5a6378"/></g></g>`;
}
// falling confetti: animate ".drop" (y) and ".bit" (rotation)
function f2Confetti(id: string, n: number, y0: number, h: number) {
  return `<g id="${id}">${[...Array(n)].map((_, i) => {
    const x = 100 + ((i * 0.618034) % 1) * 800, y = y0 + ((i * 0.7548777) % 1) * h, c = RAINBOW[(i * 5) % RAINBOW.length], r = (i * 47) % 180;
    const sh = i % 3 === 0 ? `<rect x="-22" y="-12" width="44" height="24" rx="6" fill="${c}"/>` : i % 3 === 1 ? `<circle r="16" fill="${c}"/>` : `<path d="M0 -21 L19 14 L-19 14Z" fill="${c}"/>`;
    return `<g transform="translate(${x} ${y})"><g class="drop"><g class="bit" transform="rotate(${r})">${sh}</g></g></g>`;
  }).join('')}</g>`;
}
// a wall calendar page: `big` is the big text (a day number or word), `top` the header
function f2Calendar(id: string, x: number, y: number, s: number, top: string, big: string, c = F2.red) {
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-150" y="-170" width="300" height="340" rx="26" fill="#000" opacity="0.2" transform="translate(10 12)"/>
    <rect x="-150" y="-170" width="300" height="340" rx="26" fill="#fff"/><rect x="-150" y="-170" width="300" height="90" rx="26" fill="${c}"/><rect x="-150" y="-110" width="300" height="30" fill="${c}"/>
    ${f2Txt(0, -110, 44, '#fff', top)}${f2Txt(0, 70, 150, F2.night, big)}<circle cx="-80" cy="-170" r="14" fill="#555b6e"/><circle cx="80" cy="-170" r="14" fill="#555b6e"/></g></g>`;
}

// ---------- recurring cartoon creators (original design; head top flips up to talk) ----------
// f2Toon: origin at the feet, ~600 units tall. Animatable parts (local pivots):
//   .top (head top; pivot -125 -470, use f2Talk)  .eyes (f2Blink)  .spir (spiral eyes, hidden)  .armL/.armR (pivots -88 -312 / 88 -312)
//   .dr (dress, only if `dress` is given)
type F2Hair = 'spiky' | 'curly';
function f2Toon(id: string, x: number, y: number, s: number, hair: F2Hair, suit = '#2b2d42', dress?: [string, string]) {
  const SK = '#f2c29b', SKD = '#e3a77b';
  const h = hair === 'spiky'
    ? `<path d="M-110 -540 L-96 -610 L-62 -566 L-40 -628 L-10 -572 L18 -632 L40 -570 L72 -620 L84 -560 L112 -590 L112 -530 Q0 -600 -110 -540Z" fill="#3b2a24"/>`
    : [[-92, -548, 34], [-50, -584, 38], [0, -598, 40], [50, -584, 38], [92, -548, 34], [-20, -560, 30], [30, -562, 30]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#8a5a33"/>`).join('');
  const dr = dress ? `<g class="dr"><path d="M-46 -330 L46 -330 L58 -236 L132 0 L-132 0 L-58 -236Z" fill="${dress[0]}"/><path d="M0 -330 L46 -330 L58 -236 L132 0 L0 0Z" fill="${dress[1]}"/>
      <rect x="-60" y="-246" width="120" height="20" rx="10" fill="#fff" opacity="0.5"/></g>` : '';
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="8" rx="130" ry="16" fill="#000" opacity="0.2"/>
    <rect x="-52" y="-120" width="38" height="118" rx="14" fill="#1d2235"/><rect x="14" y="-120" width="38" height="118" rx="14" fill="#1d2235"/>
    <ellipse cx="-38" cy="-4" rx="34" ry="14" fill="#111"/><ellipse cx="38" cy="-4" rx="34" ry="14" fill="#111"/>
    <g class="armL"><rect x="-108" y="-326" width="40" height="90" rx="20" fill="${suit}"/><rect x="-104" y="-256" width="32" height="96" rx="16" fill="${SK}"/><circle cx="-88" cy="-160" r="22" fill="${SK}"/></g>
    <g class="armR"><rect x="68" y="-326" width="40" height="90" rx="20" fill="${suit}"/><rect x="72" y="-256" width="32" height="96" rx="16" fill="${SK}"/><circle cx="88" cy="-160" r="22" fill="${SK}"/></g>
    <rect x="-76" y="-340" width="152" height="240" rx="46" fill="${suit}"/>
    <path d="M-30 -340 L0 -280 L30 -340Z" fill="#fff"/><path d="M-10 -330 L10 -330 L14 -250 L0 -236 L-14 -250Z" fill="${F2.red}"/>${dr}
    <path d="M-125 -470 A125 115 0 0 0 125 -470Z" fill="${SK}"/><path d="M40 -470 L125 -470 A125 115 0 0 1 40 -362Z" fill="${SKD}" opacity="0.5"/>
    <circle cx="-70" cy="-430" r="16" fill="#ff9aa2" opacity="0.6"/><circle cx="70" cy="-430" r="16" fill="#ff9aa2" opacity="0.6"/>
    <path d="M-112 -470 A112 64 0 0 1 112 -470Z" fill="#7a2f2f"/><path d="M-96 -470 L96 -470 L90 -456 L-90 -456Z" fill="#fff"/>
    <g class="top"><path d="M-125 -470 A125 115 0 0 1 125 -470Z" fill="${SK}"/><rect x="-125" y="-474" width="250" height="6" rx="3" fill="${SKD}"/>${h}
      <path d="M-66 -560 L-20 -552 M20 -552 L66 -560" stroke="#3b2a24" stroke-width="9" stroke-linecap="round"/>
      <g class="eyes"><ellipse cx="-40" cy="-516" rx="24" ry="28" fill="#fff"/><ellipse cx="40" cy="-516" rx="24" ry="28" fill="#fff"/><circle cx="-34" cy="-510" r="11" fill="#111"/><circle cx="34" cy="-510" r="11" fill="#111"/></g>
      <g class="spir" opacity="0">${[-40, 40].map((ex) => `<g class="sp"><circle cx="${ex}" cy="-516" r="26" fill="#fff"/><path d="M${ex} -516 m-4 0 a4 4 0 1 1 8 0 a8 8 0 1 1 -16 0 a12 12 0 1 1 24 0 a16 16 0 1 1 -32 0" stroke="#8b6cff" stroke-width="5" fill="none"/></g>`).join('')}</g></g></g></g>`;
}
// the head top flaps for `dur` seconds and always ends closed
function f2Talk(tl: gsap.core.Timeline, sel: string, t: number, dur: number, sp = 0.13, ang = -16) {
  let n = Math.floor(dur / sp); if (n % 2 === 1) n -= 1; if (n < 2) return;   // even number of half-flaps -> odd yoyo repeats -> ends closed
  tl.fromTo(`${sel} .top`, { rotation: 0, svgOrigin: '-125 -470' }, { rotation: ang, svgOrigin: '-125 -470', duration: sp, yoyo: true, repeat: n - 1, ease: 'sine.inOut', immediateRender: false }, t);
}
function f2Blink(tl: gsap.core.Timeline, sel: string, times: number[]) {
  times.forEach((t) => tl.to(`${sel} .eyes`, { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.07, yoyo: true, repeat: 1 }, t));
}
// rotate an arm to `ang` degrees (L: positive = up/out, R: negative = up/out)
function f2Arm(tl: gsap.core.Timeline, sel: string, side: 'L' | 'R', t: number, ang: number, d = 0.3) {
  tl.to(`${sel} .arm${side}`, { rotation: ang, svgOrigin: side === 'L' ? '-88 -312' : '88 -312', duration: d, ease: 'back.out(2)' }, t);
}
// an arm swings between `a` and `b` degrees for `dur` seconds (typing, waving, flailing), then rests
function f2Swing(tl: gsap.core.Timeline, sel: string, side: 'L' | 'R', t: number, dur: number, a: number, b: number, sp = 0.15) {
  const o = side === 'L' ? '-88 -312' : '88 -312';
  tl.fromTo(`${sel} .arm${side}`, { rotation: a, svgOrigin: o }, { rotation: b, svgOrigin: o, duration: sp, yoyo: true, repeat: f2Reps(dur, sp) | 1, ease: 'sine.inOut', immediateRender: false }, t);
  tl.to(`${sel} .arm${side}`, { rotation: 0, svgOrigin: o, duration: 0.2 }, t + dur);
}

// generic scenes by type: { bg?, ink?, html(s), anim(tl, s, K, $) }. On a light background set ink: F2.night.
const LIBRARY: Record<string, Visual> = {
  question: { html: () => svg(`${f2Sun('sun', 540, 1000, 120)}`), anim: (tl, s, K, $) => tl.fromTo($('#sun'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, ease: 'back.out(2)' }, s.t0 + 0.2) },
  object: { html: () => svg(`<circle id="obj" cx="505" cy="1000" r="180" fill="${F2.blue}"/>`), anim: (tl, s, K, $) => tl.fromTo($('#obj'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, ease: 'back.out(2)' }, s.t0 + 0.2) },
  process: { html: () => svg([0, 1, 2].map((i) => `<circle class="step" cx="${215 + i * 290}" cy="1000" r="110" fill="${RAINBOW[i * 2]}"/>`).join('')), anim: (tl, s, K, $) => tl.fromTo($('.step'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.4 }, s.t0 + 0.2) },
  comparison: { html: () => svg(`<rect id="a" x="140" y="760" width="300" height="500" rx="30" fill="${F2.red}"/><rect id="b" x="600" y="760" width="300" height="500" rx="30" fill="${F2.blue}"/>`), anim: () => {} },
  stat: { html: () => svg(`<circle id="st" cx="505" cy="1000" r="200" fill="${F2.yellow}"/>`), anim: (tl, s, K, $) => tl.fromTo($('#st'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, ease: 'back.out(2)' }, K('stat')) },
  map: { html: () => svg(`<circle cx="505" cy="1000" r="300" fill="${F2.sky}"/><path d="M380 900 Q460 820 560 880 T640 1040 Q520 1100 420 1030Z" fill="${F2.green}"/>`), anim: () => {} },
  asset: { html: (s) => svg(`<image href="assets/${s.asset}" x="140" y="700" width="730" height="560" preserveAspectRatio="xMidYMid meet"/>`), anim: () => {} },
  closing: { html: () => svg(`${f2Sun('sunC', 505, 1050, 150)}`), anim: (tl, s, K, $) => tl.fromTo($('#sunC'), { rotation: 0, transformOrigin: '50% 50%' }, { rotation: 90, duration: s.t1 - s.t0, ease: 'none' }, s.t0) },
};

// each video's visuals.ts fills this with defineVisuals({ sceneId: { bg, ink, html, anim }, ... })
const VISUALS: Record<string, Visual> = {};
function defineVisuals(v: Record<string, Visual>) { Object.assign(VISUALS, v); }
