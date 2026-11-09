// =====================================================================
//  Custom visuals for "¿Un videojuego ganó un Emmy?" (flat 2D, HyperFrames).
//  Original art only: controller, generic gold trophy, TV, generic hooded avatar, cartoon boars, XP bar, gaming chair…
//  No characters from South Park or Warcraft, no Blizzard logo, no real Emmy statuette (names appear only as text).
//  Helpers live inside this block so they don't clash with other videos in the shared type-check scope.
// =====================================================================
{
  const C = { gold: '#ffc83d', goldD: '#e0a21f', purple: '#2a1f5c', purpleL: '#4b3a9a', red: '#ff5a5f', wood: '#a0673a', woodD: '#7c4a25', skin: '#f2c29b', pale: '#f6efe8' };
  const FONT = 'font-family="Nunito, Avenir Next, Arial, sans-serif" font-weight="900"';
  const txt = (x: number, y: number, size: number, fill: string, t: string, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${fill}" ${FONT} ${extra}>${t}</text>`;

  // background stars (deterministic)
  const stars = (n = 30) => [...Array(n)].map((_, i) => `<circle cx="${(i * 197) % 1080}" cy="${600 + ((i * 331) % 900)}" r="${2 + (i % 3)}" fill="#fff" opacity="0.3"/>`).join('');

  // a game controller
  const controller = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-150 -60 Q-160 -80 -120 -84 L120 -84 Q160 -80 150 -60 L190 70 Q200 120 150 120 Q120 120 95 70 L-95 70 Q-120 120 -150 120 Q-200 120 -190 70Z" fill="#000" opacity="0.2" transform="translate(8 12)"/>
      <path d="M-150 -60 Q-160 -80 -120 -84 L120 -84 Q160 -80 150 -60 L190 70 Q200 120 150 120 Q120 120 95 70 L-95 70 Q-120 120 -150 120 Q-200 120 -190 70Z" fill="#5b5f97"/>
      <rect x="-122" y="-24" width="70" height="22" rx="6" fill="#2b2d42"/><rect x="-98" y="-48" width="22" height="70" rx="6" fill="#2b2d42"/>
      <circle cx="96" cy="-40" r="15" fill="${F2.green}"/><circle cx="126" cy="-12" r="15" fill="${F2.red}"/><circle cx="66" cy="-12" r="15" fill="${F2.blue}"/><circle cx="96" cy="16" r="15" fill="${C.gold}"/>
      <circle cx="-40" cy="40" r="22" fill="#2b2d42"/><circle cx="40" cy="40" r="22" fill="#2b2d42"/></g></g>`;

  // a generic gold trophy with a star (NOT the Emmy statuette)
  const trophy = (id: string, x: number, y: number, s = 1, plate = '') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-100 -150 L100 -150 Q100 10 0 40 Q-100 10 -100 -150Z" fill="${C.gold}"/>
      <path d="M0 -150 L100 -150 Q100 10 0 40Z" fill="${C.goldD}"/>
      <path d="M-100 -120 Q-170 -120 -160 -60 Q-150 -10 -80 -10" fill="none" stroke="${C.gold}" stroke-width="22"/>
      <path d="M100 -120 Q170 -120 160 -60 Q150 -10 80 -10" fill="none" stroke="${C.goldD}" stroke-width="22"/>
      <rect x="-22" y="30" width="44" height="60" fill="${C.goldD}"/>
      <rect x="-90" y="86" width="180" height="70" rx="12" fill="#2b2d42"/>
      ${plate ? txt(0, 134, 34, C.gold, plate) : ''}
      <path d="M0 -122 L14 -88 L50 -88 L22 -66 L32 -30 L0 -52 L-32 -30 L-22 -66 L-50 -88 L-14 -88Z" fill="#fff" opacity="0.9"/></g></g>`;

  const burst = (id: string, x: number, y: number, r: number, c = C.gold) => `<g id="${id}">${[...Array(10)].map((_, i) => {
      const a = i / 10 * Math.PI * 2;
      return `<rect x="${x + Math.cos(a) * r - 8}" y="${y + Math.sin(a) * r - 28}" width="16" height="56" rx="8" fill="${c}" transform="rotate(${a * 180 / Math.PI + 90} ${x + Math.cos(a) * r} ${y + Math.sin(a) * r})"/>`;
    }).join('')}</g>`;

  // a retro TV: screen spans x -240..190, y -170..150 (local); inner content goes in "screen"
  const tv = (id: string, x: number, y: number, s: number, screen: string) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <line x1="-30" y1="-210" x2="-120" y2="-310" stroke="${F2.gray}" stroke-width="10" stroke-linecap="round"/><line x1="30" y1="-210" x2="120" y2="-310" stroke="${F2.gray}" stroke-width="10" stroke-linecap="round"/>
      <rect x="-280" y="-196" width="580" height="380" rx="40" fill="#000" opacity="0.2"/><rect x="-290" y="-210" width="580" height="380" rx="40" fill="${C.wood}"/>
      <rect x="-262" y="-184" width="460" height="330" rx="24" fill="#0b1226"/>${screen}
      <circle cx="242" cy="-110" r="24" fill="${C.woodD}"/><circle cx="242" cy="-30" r="24" fill="${C.woodD}"/></g></g>`;

  // a generic hooded avatar with glowing eyes and a sword
  const avatar = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <g class="sword"><rect x="120" y="-250" width="26" height="250" rx="8" fill="#dfe6f3"/><rect x="92" y="-6" width="82" height="22" rx="8" fill="${C.gold}"/><rect x="122" y="14" width="22" height="60" rx="6" fill="${C.woodD}"/></g>
      <path d="M-150 220 Q-150 -40 0 -170 Q150 -40 150 220Z" fill="#000" opacity="0.2" transform="translate(10 10)"/>
      <path d="M-150 220 Q-150 -40 0 -170 Q150 -40 150 220Z" fill="${C.purpleL}"/>
      <ellipse cx="0" cy="-40" rx="78" ry="70" fill="#120b2e"/>
      <g class="eyes"><ellipse cx="-30" cy="-44" rx="16" ry="10" fill="${F2.red}"/><ellipse cx="30" cy="-44" rx="16" ry="10" fill="${F2.red}"/></g>
      <path d="M-60 90 L60 90 L40 220 L-40 220Z" fill="#3a2c7a"/></g></g>`;

  const grave = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-60 60 L-60 -40 Q-60 -90 0 -90 Q60 -90 60 -40 L60 60Z" fill="#8d99ae"/><path d="M10 60 L10 -88 Q60 -80 60 -40 L60 60Z" fill="#6c7891"/>
      ${txt(0, -10, 34, '#4a5368', 'RIP')}<rect x="-80" y="56" width="160" height="20" rx="8" fill="#5a6378"/></g></g>`;

  // a cartoon boar (original design)
  // facing left; class "bod" bobs while alive. Flat shading: darker bristly back, lighter belly.
  const boar = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><g class="bod">
      <ellipse cx="0" cy="96" rx="120" ry="14" fill="#000" opacity="0.15"/>
      <path d="M112 -6 q34 -10 26 -34 q-8 -18 -22 -4" stroke="#6b3f22" stroke-width="9" fill="none" stroke-linecap="round"/>
      ${[[-72, 0], [-30, 1], [40, 0], [78, 1]].map(([lx, k]) => `<rect x="${lx - 13}" y="40" width="26" height="54" rx="10" fill="${k ? '#5c3418' : '#6b3f22'}"/><rect x="${lx - 14}" y="80" width="28" height="16" rx="6" fill="#2b1a10"/>`).join('')}
      <ellipse cx="10" cy="8" rx="118" ry="76" fill="#8f5832"/>
      <path d="M-70 40 Q10 96 100 36 Q60 78 -20 74 Q-60 66 -70 40Z" fill="#b98055"/>
      <path d="M-90 -48 L-72 -96 L-56 -60 L-36 -108 L-18 -66 L4 -112 L20 -68 L42 -104 L56 -62 L78 -92 L86 -50 Q20 -80 -90 -48Z" fill="#4a2a14"/>
      <ellipse cx="-104" cy="2" rx="66" ry="58" fill="#8f5832"/>
      <path d="M-112 -52 L-96 -98 L-76 -48Z" fill="#4a2a14"/><path d="M-104 -56 L-95 -84 L-84 -54Z" fill="#e8a0a0"/>
      <rect x="-190" y="-8" width="58" height="50" rx="22" fill="#f0a9a3"/><rect x="-192" y="-4" width="20" height="42" rx="10" fill="#e08b86"/>
      <ellipse cx="-178" cy="16" rx="6" ry="9" fill="#5c3418"/><ellipse cx="-160" cy="16" rx="6" ry="9" fill="#5c3418"/>
      <path d="M-140 46 Q-160 52 -170 22" stroke="#fff6e0" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M-118 48 Q-132 58 -146 34" stroke="#fff6e0" stroke-width="9" fill="none" stroke-linecap="round"/>
      <circle cx="-112" cy="-14" r="15" fill="#fff"/><circle cx="-116" cy="-12" r="8" fill="${F2.night}"/>
      <path d="M-136 -38 L-94 -26" stroke="#2b1a10" stroke-width="9" stroke-linecap="round"/></g></g></g>`;
  // a dust cloud ("poof") centered at x, y
  const poof = (id: string, x: number, y: number) => `<g id="${id}">${[[0, 0, 46], [-50, 14, 34], [50, 12, 36], [-24, -34, 30], [28, -36, 32], [0, 36, 28]].map(([dx, dy, r]) => `<circle cx="${x + dx}" cy="${y + dy}" r="${r}" fill="#fff"/>`).join('')}</g>`;

  // four ORIGINAL gamer kids (cap, headphones, glasses, bun), seen from the front. Classes for the transformation:
  // "skin" (turns pale), "bags" (dark circles), "spots" (pimples), "chin" (double chin), "belly" (gets wider), "hp" (health bar fill)
  type Acc = 'cap' | 'phones' | 'glasses' | 'bun';
  const KIDS: [Acc, string, string][] = [['cap', F2.green, '#3b2a24'], ['phones', F2.purple, '#1d1d1d'], ['glasses', F2.orange, '#8a4b20'], ['bun', F2.pink, '#5a3a2a']];
  const accFront = (a: Acc, hair: string) => a === 'cap'
    ? `<path d="M-72 -92 Q0 -176 72 -92Z" fill="${F2.red}"/><rect x="-20" y="-104" width="118" height="20" rx="10" fill="#c23b40"/>`
    : a === 'phones' ? `<path d="M-70 -86 Q0 -168 70 -86 Q40 -120 0 -118 Q-40 -120 -70 -86Z" fill="${hair}"/><path d="M-78 -70 Q-80 -160 0 -160 Q80 -160 78 -70" stroke="#2b2d42" stroke-width="14" fill="none"/><rect x="-96" y="-90" width="30" height="50" rx="12" fill="#2b2d42"/><rect x="66" y="-90" width="30" height="50" rx="12" fill="#2b2d42"/>`
    : a === 'glasses' ? `<path d="M-70 -86 Q0 -168 70 -86 Q40 -120 0 -118 Q-40 -120 -70 -86Z" fill="${hair}"/><circle cx="-26" cy="-70" r="22" fill="none" stroke="#2b2d42" stroke-width="7"/><circle cx="26" cy="-70" r="22" fill="none" stroke="#2b2d42" stroke-width="7"/><rect x="-6" y="-73" width="12" height="6" fill="#2b2d42"/>`
    : `<circle cx="0" cy="-150" r="30" fill="${hair}"/><path d="M-72 -80 Q0 -170 72 -80 Q40 -118 0 -116 Q-40 -118 -72 -80Z" fill="${hair}"/>`;
  const kid = (id: string, x: number, y: number, s: number, [acc, shirt, hair]: [Acc, string, string]) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <g class="belly"><rect x="-80" y="0" width="160" height="210" rx="72" fill="${shirt}"/><rect x="-30" y="60" width="60" height="44" rx="12" fill="#000" opacity="0.15"/></g>
      <ellipse class="chin" cx="0" cy="-4" rx="52" ry="22" fill="${C.pale}" opacity="0"/>
      <circle class="skin" cx="0" cy="-70" r="70" fill="${C.skin}"/>
      <g class="bags" opacity="0"><ellipse cx="-26" cy="-50" rx="20" ry="8" fill="#9b7fb8"/><ellipse cx="26" cy="-50" rx="20" ry="8" fill="#9b7fb8"/></g>
      <circle cx="-26" cy="-70" r="9" fill="${F2.night}"/><circle cx="26" cy="-70" r="9" fill="${F2.night}"/>
      <path d="M-18 -28 Q0 -16 18 -28" stroke="${F2.night}" stroke-width="7" fill="none" stroke-linecap="round"/>
      ${accFront(acc, hair)}
      <g class="spots"><circle cx="-44" cy="-34" r="7" fill="${F2.red}"/><circle cx="40" cy="-98" r="6" fill="${F2.red}"/><circle cx="48" cy="-40" r="6" fill="${F2.red}"/><circle cx="-34" cy="-104" r="5" fill="${F2.red}"/><circle cx="8" cy="-46" r="5" fill="${F2.red}"/></g>
      <g transform="translate(0 -196)"><rect x="-70" y="-12" width="140" height="24" rx="12" fill="${F2.night}"/><rect class="hp" x="-64" y="-7" width="128" height="14" rx="7" fill="${F2.green}"/></g></g></g>`;
  // the same kids seen from behind, sitting in gaming chairs
  const kidBack = (id: string, x: number, y: number, s: number, [acc, , hair]: [Acc, string, string]) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <circle class="head" cx="0" cy="-200" r="62" fill="${acc === 'cap' ? F2.red : hair}"/>${acc === 'bun' ? `<circle cx="0" cy="-262" r="28" fill="${hair}"/>` : ''}
      ${acc === 'phones' ? `<path d="M-66 -200 Q-66 -276 0 -276 Q66 -276 66 -200" stroke="#2b2d42" stroke-width="14" fill="none"/><rect x="-80" y="-220" width="26" height="46" rx="10" fill="#2b2d42"/><rect x="54" y="-220" width="26" height="46" rx="10" fill="#2b2d42"/>` : ''}
      <rect x="-100" y="-170" width="200" height="250" rx="60" fill="${F2.red}"/><rect x="-46" y="-146" width="92" height="190" rx="34" fill="#c23b40"/>
      <rect x="-116" y="70" width="232" height="40" rx="18" fill="#2b2d42"/><rect x="-12" y="106" width="24" height="60" fill="#555"/>
      <path d="M-90 176 L90 176" stroke="#555" stroke-width="16" stroke-linecap="round"/></g></g>`;

  // MMO-style floating damage number
  const dmg = (id: string, x: number, y: number, t: string, c: string = C.gold) => `<g id="${id}">${txt(x, y, 54, c, t, 'stroke="#14213d" stroke-width="10" paint-order="stroke"')}</g>`;

  const bubble = (id: string, x: number, y: number, s: number, c: string) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-110" y="-70" width="220" height="130" rx="40" fill="${c}"/><path d="M-50 50 L-80 100 L-10 56 Z" fill="${c}"/>
      <circle cx="-50" cy="-5" r="14" fill="${F2.night}"/><circle cx="0" cy="-5" r="14" fill="${F2.night}"/><circle cx="50" cy="-5" r="14" fill="${F2.night}"/></g></g>`;

  const stamp = (id: string, x: number, y: number, t: string, c: string, rot = -8) => `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot})">
      <rect x="-210" y="-62" width="420" height="124" rx="22" fill="none" stroke="${c}" stroke-width="12"/>${txt(0, 28, 78, c, t)}</g></g>`;

  const confetti = (id: string, n: number, y0: number, h: number) => `<g id="${id}">${[...Array(n)].map((_, i) => {
      const x = 100 + ((i * 0.618034) % 1) * 800, y = y0 + ((i * 0.7548777) % 1) * h, c = RAINBOW[(i * 5) % RAINBOW.length], r = (i * 47) % 180;
      const sh = i % 3 === 0 ? `<rect x="-22" y="-12" width="44" height="24" rx="6" fill="${c}"/>` : i % 3 === 1 ? `<circle r="16" fill="${c}"/>` : `<path d="M0 -21 L19 14 L-19 14Z" fill="${c}"/>`;
      return `<g transform="translate(${x} ${y})"><g class="drop"><g class="bit" transform="rotate(${r})">${sh}</g></g></g>`;
    }).join('')}</g>`;

  defineVisuals({
    hook: {
      bg: F2.night,
      html: () => svg(`${stars()}
        ${burst('hBurst', 700, 960, 250)}
        ${controller('hPad', 300, 1020, 1.05)}
        ${trophy('hCup', 700, 980, 1.3, 'EMMY')}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#hPad'), K('game') - 0.15, 0.45);
        tl.to($('#hPad'), { rotation: -6, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, K('game') + 0.3);
        tl.fromTo($('#hCup'), { y: 700, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, K('award') - 0.2);
        tl.fromTo($('#hBurst rect'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.02 }, K('award') + 0.3);
        tl.to($('#hBurst'), { rotation: 30, svgOrigin: '700 960', duration: s.t1 - K('award'), ease: 'none' }, K('award') + 0.3);
      },
    },
    episode: {
      bg: '#1f3566',
      html: () => svg(`
        ${tv('eTv', 490, 1040, 1.25, `<g class="static">${[...Array(12)].map((_, i) => `<rect x="-262" y="${-184 + i * 27.5}" width="460" height="14" fill="#fff" opacity="${0.08 + (i % 3) * 0.08}"/>`).join('')}</g>
          <g class="name">${txt(-32, -50, 52, C.gold, 'MAKE LOVE,')}${txt(-32, 30, 50, '#fff', 'NOT WARCRAFT')}${txt(-32, 100, 28, F2.gray, 'SOUTH PARK', 'letter-spacing="6"')}</g>`)}
        <g id="eBadge"><g transform="translate(760 680) rotate(8)"><rect x="-130" y="-46" width="260" height="92" rx="46" fill="${F2.red}"/>${txt(0, 18, 50, '#fff', 'T10 · E8')}</g></g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#eTv'), s.t0 + 0.1, 0.5);
        tl.set($('#eTv .name'), { opacity: 0 }, s.t0);
        tl.fromTo($('#eTv .static'), { opacity: 0 }, { opacity: 1, duration: 0.1 }, K('sp') - 0.1);
        tl.to($('#eTv .static'), { y: 14, duration: 0.08, yoyo: true, repeat: Math.ceil((K('title') - K('sp')) / 0.08), ease: 'none' }, K('sp'));
        tl.to($('#eTv .static'), { opacity: 0, duration: 0.15 }, K('title') - 0.15);
        tl.fromTo($('#eTv .name'), { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, K('title') - 0.05);
        f2Pop(tl, $('#eBadge'), K('sp') + 0.1, 0.4);
      },
    },
    villain: {
      bg: C.purple,
      html: () => svg(`${stars(24)}
        <rect x="0" y="1340" width="1080" height="600" fill="#1d1544"/>
        ${[[120, 1290, 0.75], [250, 1390, 0.85], [760, 1390, 0.85], [890, 1290, 0.75], [180, 1120, 0.6], [830, 1120, 0.6]].map(([x, y, k], i) => grave('gr' + i, x, y, k)).join('')}
        ${avatar('vAv', 505, 1080, 1.25)}
        <g id="vName"><g transform="translate(490 832)">${txt(0, 0, 36, F2.red, 'JUGADOR HOSTIL', 'stroke="#14213d" stroke-width="8" paint-order="stroke"')}
          <rect x="-120" y="14" width="240" height="22" rx="11" fill="#14213d"/><rect x="-115" y="18" width="230" height="14" rx="7" fill="${F2.red}"/></g></g>
        ${stamp('vStamp', 505, 700, '¡A TODOS!', F2.red)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#vAv'), K('player') - 0.15, 0.5);
        f2Pop(tl, $('#vName'), K('player') + 0.2, 0.4);
        tl.fromTo($('#vAv .eyes'), { opacity: 1 }, { opacity: 0.35, duration: 0.4, yoyo: true, repeat: Math.ceil((s.t1 - s.t0) / 0.4), ease: 'sine.inOut' }, s.t0);
        tl.fromTo($('#vAv .sword'), { rotation: 0, svgOrigin: '133 20' }, { rotation: -60, duration: 0.18, ease: 'power2.in', yoyo: true, repeat: 3 }, K('kill') - 0.1);
        for (let i = 0; i < 6; i++) f2Pop(tl, $('#gr' + i), K('kill') + i * 0.18, 0.35);
        tl.fromTo($('#vStamp'), { scale: 2.2, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('all') - 0.2);
      },
    },
    grind: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Hill('gHill', 1330, F2.green, F2.greenD, 40)}
        <g id="xp"><rect x="110" y="650" width="790" height="70" rx="35" fill="${F2.night}"/><rect class="fill" x="122" y="662" width="766" height="46" rx="23" fill="${C.gold}"/>
          ${txt(505, 702, 40, F2.night, 'EXPERIENCIA', 'class="lbl"')}</g>
        ${[[240, 1200], [520, 1270], [800, 1200]].map(([x, y], i) => boar('b' + i, x, y, 0.85) + poof('p' + i, x - 20, y + 10)).join('')}
        ${dmg('d0', 230, 1070, '-250')}${dmg('d1', 505, 1130, '¡CRÍTICO!', F2.red)}${dmg('d2', 780, 1070, '-280')}
        <g id="gUp"><g transform="translate(505 1180) rotate(-4)"><rect x="-280" y="-56" width="560" height="112" rx="56" fill="${C.gold}"/>${txt(0, 18, 50, F2.night, '¡SUBES DE NIVEL!')}</g></g>
        <g id="gSword"><g transform="translate(505 960) rotate(35)"><rect x="-14" y="-200" width="28" height="220" rx="8" fill="#eef2f8"/><rect x="-60" y="14" width="120" height="24" rx="10" fill="${C.gold}"/><rect x="-12" y="36" width="24" height="70" rx="8" fill="${C.woodD}"/></g></g>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#gHill'), { y: 300 }, { y: 0, duration: 0.5, ease: 'power3.out' }, s.t0);
        f2Pop(tl, $('#gSword'), K('kids') - 0.15, 0.45);
        f2Pop(tl, $('#xp'), K('level') - 0.4, 0.4);
        tl.fromTo($('#xp .fill'), { scaleX: 0.02, svgOrigin: '122 685' }, { scaleX: 0.25, duration: 0.6, ease: 'power2.out' }, K('level'));
        for (let i = 0; i < 3; i++) {
          const tin = K('level') + 0.3 + i * 0.25, hit = K('boars') + i * 0.2;
          f2Pop(tl, $('#b' + i), tin, 0.4);
          tl.set($('#p' + i + ' circle'), { scale: 0, transformOrigin: '50% 50%' }, s.t0);
          // snorting and bouncing while alive
          tl.fromTo($('#b' + i + ' .bod'), { y: 0 }, { y: -12, duration: 0.2, ease: 'sine.inOut', yoyo: true, repeat: 2 * Math.floor((hit - tin - 0.45) / 0.4) + 1 }, tin + 0.4);
          // hit: knocked up and flipped, then a puff of dust
          tl.to($('#b' + i), { y: -150, rotation: i % 2 ? -200 : 200, transformOrigin: '50% 50%', duration: 0.28, ease: 'power2.out' }, hit);
          tl.to($('#b' + i), { opacity: 0, scale: 0.4, transformOrigin: '50% 50%', duration: 0.15, ease: 'power2.in' }, hit + 0.22);
          tl.fromTo($('#p' + i + ' circle'), { scale: 0, opacity: 1, transformOrigin: '50% 50%' }, { scale: 1.3, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.02 }, hit + 0.05);
        }
        tl.to($('#gSword'), { rotation: -40, svgOrigin: '505 1060', duration: 0.22, yoyo: true, repeat: Math.ceil((K('boars') + 0.4 - K('level') - 0.6) / 0.22), ease: 'sine.inOut' }, K('level') + 0.6);
        tl.to($('#xp .fill'), { scaleX: 1, svgOrigin: '122 685', duration: 0.5, ease: 'power2.out' }, K('boars'));
        for (let i = 0; i < 3; i++) {
          tl.set($('#d' + i), { opacity: 0 }, s.t0);
          tl.fromTo($('#d' + i), { opacity: 1, y: 0 }, { opacity: 0, y: -90, duration: 0.45, ease: 'power1.out' }, K('boars') + i * 0.2);
        }
        f2Pop(tl, $('#gUp'), K('boars') + 0.45, 0.4);
      },
    },
    chair: {
      bg: F2.night,
      html: () => svg(`${stars(20)}
        <g id="cCal"><g transform="translate(250 780)" data-layout-allow-overlap=""><rect x="-130" y="-120" width="260" height="250" rx="22" fill="#000" opacity="0.2" transform="translate(8 10)"/>
          ${['28', '21', '14', '7', '1'].map((d) => `<g class="page"><rect x="-130" y="-120" width="260" height="250" rx="22" fill="#fff"/><rect x="-130" y="-120" width="260" height="66" rx="22" fill="${F2.red}"/><rect x="-130" y="-80" width="260" height="26" fill="${F2.red}"/>${txt(0, -70, 34, '#fff', 'DÍA')}${txt(0, 90, 120, F2.night, d)}</g>`).join('')}</g></g>
        <g id="cWin"><g transform="translate(700 770)"><rect x="-170" y="-130" width="340" height="250" rx="16" fill="#5b4632"/>
          <rect x="-150" y="-110" width="300" height="210" fill="#1f3566"/>
          <path d="M-150 60 L-90 -30 L-40 30 L20 -60 L80 20 L150 -20 L150 100 L-150 100Z" fill="#3d5488"/>
          <path d="M-104 -9 L-90 -30 L-76 -9Z M6 -39 L20 -60 L34 -39Z" fill="#fff"/><path d="M-150 70 Q-60 50 0 72 T150 64 L150 100 L-150 100Z" fill="#fff"/>
          <g transform="translate(70 40)"><rect x="-4" y="10" width="8" height="40" fill="#8d99ae"/><rect x="-62" y="-22" width="124" height="40" rx="6" fill="#1d7a4a"/>${txt(0, 6, 20, '#fff', 'SOUTH PARK')}</g>
          <rect x="-4" y="-110" width="8" height="210" fill="#5b4632"/></g></g>
        <g id="cMons">${[175, 395, 615, 835].map((x) => `<g transform="translate(${x} 1000)"><rect x="-95" y="-70" width="190" height="130" rx="14" fill="#2b2d42"/><rect class="glow" x="-82" y="-58" width="164" height="106" rx="8" fill="${F2.blue}"/></g>`).join('')}</g>
        ${KIDS.map((k, i) => kidBack('cK' + i, [175, 395, 615, 835][i], 1290, 0.72, k)).join('')}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#cWin'), s.t0 + 0.05, 0.45);
        tl.fromTo($('#cMons > g'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.06 }, s.t0 + 0.05);
        for (let i = 0; i < 4; i++) f2Pop(tl, $('#cK' + i), s.t0 + 0.2 + i * 0.08, 0.4);
        f2Pop(tl, $('#cCal'), s.t0 + 0.1, 0.45);
        tl.to($('#cMons .glow'), { opacity: 0.6, duration: 0.3, yoyo: true, repeat: Math.ceil((s.t1 - s.t0) / 0.3), ease: 'sine.inOut' }, s.t0);
        // the last page in the DOM is on top: tear off "1", "7", "14", "21" one by one
        [4, 3, 2, 1].forEach((p, i) => tl.to($(`#cCal .page:nth-child(${p + 2})`), { y: -260, rotation: -25, opacity: 0, transformOrigin: '50% 0%', duration: 0.3, ease: 'power2.in' }, K('weeks') + 0.15 + i * 0.35));
        for (let i = 0; i < 4; i++) tl.to($('#cK' + i), { rotation: i % 2 ? -4 : 4, transformOrigin: '50% 100%', duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('chair') + i * 0.04);
      },
    },
    result: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/><rect y="1350" width="1080" height="600" fill="${F2.skyD}" opacity="0.4"/>
        <g id="rAura"><ellipse cx="505" cy="1120" rx="470" ry="360" fill="${C.gold}" opacity="0.3"/><ellipse cx="505" cy="1120" rx="400" ry="290" fill="${C.gold}" opacity="0.3"/>
          ${[...Array(8)].map((_, i) => { const a = i / 8 * Math.PI * 2; return `<path d="M${505 + Math.cos(a) * 420} ${1120 + Math.sin(a) * 330} l14 -40 l-24 8 l14 -40" stroke="${C.goldD}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }).join('')}</g>
        ${KIDS.map((k, i) => kid('rK' + i, [180, 393, 607, 820][i], 1140, 0.95, k)).join('')}
        <g id="rTag"><g transform="translate(505 1430)"><rect x="-170" y="-46" width="340" height="92" rx="46" fill="${F2.night}"/>${txt(0, 18, 50, C.gold, 'NIVEL MÁX')}</g></g>`),
      anim(tl, s, K, $) {
        for (let i = 0; i < 4; i++) f2Pop(tl, $('#rK' + i), s.t0 + 0.1 + i * 0.08, 0.45);
        // pale, dark circles, health drains
        tl.fromTo($('.skin'), { fill: C.skin }, { fill: C.pale, duration: 0.4 }, K('pale') - 0.1);
        tl.fromTo($('.bags'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, K('pale'));
        tl.fromTo($('.hp'), { scaleX: 1, fill: F2.green, svgOrigin: '-64 0' }, { scaleX: 0.25, fill: F2.red, duration: 0.5, ease: 'power2.out' }, K('pale'));
        // pimples, then fat with a double chin
        tl.fromTo($('.spots circle'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, ease: 'back.out(3)', stagger: 0.02 }, K('fat') - 0.6);
        tl.fromTo($('.belly'), { scaleX: 1, scaleY: 1, svgOrigin: '0 210' }, { scaleX: 1.65, scaleY: 1.1, duration: 0.4, ease: 'back.out(2)' }, K('fat') - 0.1);
        tl.fromTo($('.chin'), { opacity: 0, scale: 0.6, svgOrigin: '0 -4' }, { opacity: 1, scale: 1.3, duration: 0.35, ease: 'back.out(2)' }, K('fat') - 0.05);
        // ...but super powerful
        tl.fromTo($('#rAura'), { scale: 0, opacity: 0, svgOrigin: '505 1120' }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, K('power') - 0.1);
        tl.to($('.hp'), { scaleX: 1, fill: C.gold, svgOrigin: '-64 0', duration: 0.4, ease: 'power2.out' }, K('power'));
        for (let i = 0; i < 4; i++) tl.to($('#rK' + i), { y: -24, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, K('power') + 0.1 + i * 0.06);
        f2Pop(tl, $('#rTag'), K('power') + 0.15, 0.4);
      },
    },
    real: {
      bg: '#14213d',
      html: () => svg(`${stars(20)}
        <g id="rlMon"><g transform="translate(505 980)">
          <rect x="-270" y="-190" width="540" height="370" rx="30" fill="#000" opacity="0.2" transform="translate(8 10)"/><rect x="-270" y="-190" width="540" height="370" rx="30" fill="#2b2d42"/>
          <rect x="-240" y="-160" width="480" height="300" rx="14" fill="#7a5cc9"/>
          <path d="M-240 60 L-160 -40 L-90 30 L-10 -70 L70 20 L130 -30 L240 60 L240 140 L-240 140Z" fill="#4b3a9a"/>
          <g fill="#2b2d42"><rect x="40" y="-30" width="120" height="120"/><rect x="20" y="-70" width="40" height="160"/><rect x="140" y="-70" width="40" height="160"/>
            <rect x="20" y="-90" width="12" height="20"/><rect x="48" y="-90" width="12" height="20"/><rect x="140" y="-90" width="12" height="20"/><rect x="168" y="-90" width="12" height="20"/><path d="M80 90 L80 40 Q100 20 120 40 L120 90Z" fill="#14213d"/></g>
          <path d="M-240 100 Q-100 80 0 110 T240 96 L240 140 L-240 140Z" fill="${F2.green}"/>
          <g class="rec"><circle cx="-190" cy="-120" r="16" fill="${F2.red}"/>${txt(-130, -108, 34, '#fff', 'REC')}</g>
          <rect x="-30" y="180" width="60" height="60" fill="#2b2d42"/><rect x="-140" y="236" width="280" height="26" rx="12" fill="#2b2d42"/></g></g>
        <g id="rlClap"><g transform="translate(790 1340) rotate(-6)"><rect x="-110" y="-40" width="220" height="140" rx="10" fill="#2b2d42"/>
          <g class="top"><rect x="-110" y="-84" width="220" height="40" rx="6" fill="#2b2d42"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${-100 + i * 44} -84 L${-80 + i * 44} -84 L${-96 + i * 44} -44 L${-116 + i * 44} -44Z" fill="#fff"/>`).join('')}</g>
          <line x1="-90" y1="10" x2="90" y2="10" stroke="#fff" stroke-width="6"/><line x1="-90" y1="50" x2="90" y2="50" stroke="#fff" stroke-width="6"/></g></g>
        ${stamp('rlStamp', 505, 700, '¡REAL!', F2.green, 6)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#rlMon'), s.t0 + 0.1, 0.5);
        tl.to($('#rlMon .rec'), { opacity: 0.2, duration: 0.35, yoyo: true, repeat: Math.ceil((s.t1 - s.t0) / 0.35), ease: 'steps(1)' }, s.t0 + 0.4);
        f2Pop(tl, $('#rlClap'), K('scenes') - 0.3, 0.35);
        tl.fromTo($('#rlClap .top'), { rotation: -25, svgOrigin: '-110 -44' }, { rotation: 0, duration: 0.12, ease: 'power3.in' }, K('scenes') - 0.1);
        tl.fromTo($('#rlStamp'), { scale: 2.2, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('real') - 0.2);
      },
    },
    blizzard: {
      bg: '#1f3566',
      html: () => {
        const piece = (id: string, x: number, c: string, label: string, side: 1 | -1) => `<g id="${id}"><g transform="translate(${x} 1060)">
            <rect x="-170" y="-130" width="340" height="260" rx="26" fill="${c}"/>
            ${side === 1 ? `<circle cx="170" cy="0" r="48" fill="${c}"/>` : `<circle cx="-170" cy="0" r="50" fill="#1f3566"/>`}
            ${txt(side === 1 ? -10 : 20, 16, 46, '#fff', label)}</g></g>`;
        return svg(`${stars(18)}
          ${burst('blBurst', 505, 1060, 260)}
          ${piece('blRight', 675, F2.orange, 'BLIZZARD', -1)}
          ${piece('blLeft', 335, F2.blue, 'SOUTH PARK', 1)}
          <g id="blPlus"><g transform="translate(505 760)"><circle r="70" fill="${C.gold}"/>${txt(0, 28, 90, F2.night, '+')}</g></g>`);
      },
      anim(tl, s, K, $) {
        tl.fromTo($('#blLeft'), { x: -620 }, { x: -70, duration: 0.45, ease: 'back.out(1.4)' }, s.t0 + 0.15);
        tl.fromTo($('#blRight'), { x: 620 }, { x: 70, duration: 0.45, ease: 'back.out(1.4)' }, K('blizz') - 0.25);
        f2Pop(tl, $('#blPlus'), K('blizz') + 0.4, 0.4);
        tl.to($('#blLeft'), { x: 0, duration: 0.18, ease: 'power3.in' }, K('help') - 0.18);
        tl.to($('#blRight'), { x: 0, duration: 0.18, ease: 'power3.in' }, K('help') - 0.18);
        tl.fromTo($('#blBurst rect'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.015 }, K('help'));
        tl.to($('#blBurst'), { opacity: 0, duration: 0.4 }, K('help') + 0.8);
      },
    },
    emmy: {
      bg: F2.night,
      html: () => svg(`${stars(26)}
        <path id="eSpot" d="M420 220 L590 220 L840 1240 L170 1240Z" fill="${C.gold}" opacity="0.14"/>
        <g id="ePod"><rect x="250" y="1160" width="510" height="120" rx="16" fill="#3d5488"/><rect x="250" y="1160" width="510" height="26" rx="10" fill="#4f6aa8"/></g>
        ${trophy('eCup', 505, 920, 1.55, 'EMMY')}
        ${confetti('eConf', 26, 600, 520)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#eSpot'), { opacity: 0 }, { opacity: 0.14, duration: 0.4 }, s.t0 + 0.05);
        tl.fromTo($('#ePod'), { y: 400 }, { y: 0, duration: 0.45, ease: 'power3.out' }, s.t0 + 0.1);
        tl.fromTo($('#eCup'), { y: 600, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, K('stat') - 0.2);
        tl.fromTo($('#eConf .drop'), { y: -600, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power2.out', stagger: 0.02 }, K('win'));
        tl.to($('#eConf .bit'), { rotation: '+=300', transformOrigin: '50% 50%', duration: s.t1 - K('win'), ease: 'none' }, K('win'));
        tl.to($('#eCup'), { rotation: 5, transformOrigin: '50% 100%', duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('win') + 0.2);
      },
    },
    closing: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${controller('cPad', 250, 840, 0.85)}
        <g id="cEq"><rect x="465" y="800" width="80" height="20" rx="10" fill="${F2.night}"/><rect x="465" y="850" width="80" height="20" rx="10" fill="${F2.night}"/></g>
        ${trophy('cCup', 760, 860, 0.95, 'PREMIO')}
        <g id="cClock"><g transform="translate(505 1200)"><circle r="130" fill="#fff"/><circle r="130" fill="none" stroke="${F2.night}" stroke-width="16"/>
          ${[...Array(12)].map((_, i) => { const a = i / 12 * Math.PI * 2; return `<circle cx="${Math.sin(a) * 104}" cy="${-Math.cos(a) * 104}" r="6" fill="${F2.night}"/>`; }).join('')}
          <rect class="hh" x="-7" y="-60" width="14" height="66" rx="7" fill="${F2.night}"/><rect class="mm" x="-5" y="-96" width="10" height="102" rx="5" fill="${F2.red}"/><circle r="12" fill="${F2.night}"/></g></g>
        ${bubble('cb1', 210, 1240, 0.75, F2.green)}${bubble('cb2', 810, 1180, 0.75, C.gold)}${bubble('cb3', 800, 1400, 0.65, '#fff')}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#cPad'), s.t0 + 0.1, 0.45);
        f2Pop(tl, $('#cEq'), K('prize') - 0.25, 0.35);
        f2Pop(tl, $('#cCup'), K('prize') - 0.1, 0.45);
        f2Pop(tl, $('#cClock'), K('hours') - 0.2, 0.4);
        tl.fromTo($('#cClock .mm'), { rotation: 0, svgOrigin: '0 0' }, { rotation: 360 * 6, duration: s.t1 - K('hours'), ease: 'power1.inOut' }, K('hours'));
        tl.fromTo($('#cClock .hh'), { rotation: 0, svgOrigin: '0 0' }, { rotation: 180, duration: s.t1 - K('hours'), ease: 'power1.inOut' }, K('hours'));
        f2Pop(tl, $('#cb1'), K('comments') - 0.1, 0.4);
        f2Pop(tl, $('#cb2'), K('comments') + 0.1, 0.4);
        f2Pop(tl, $('#cb3'), K('comments') + 0.3, 0.4);
      },
    },
  });
}
