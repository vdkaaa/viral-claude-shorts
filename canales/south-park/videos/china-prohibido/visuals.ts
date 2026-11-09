// =====================================================================
//  Custom visuals for "China borró South Park de internet" (flat 2D, HyperFrames).
//  Original art only: browser window, eraser, TV, plane, generic map blob, fence, honey pot with bees, censor bar,
//  faceless suit silhouette, phone search, apology letter, balance scale, sorghum stalks.
//  No South Park characters, NO Winnie the Pooh (just a generic honey pot), no real politicians (names appear only as text).
//  Helpers live inside this block so they don't clash with other videos in the shared type-check scope.
// =====================================================================
{
  const C = { gold: '#ffc83d', goldD: '#e0a21f', red: '#d7263d', redD: '#a3182c', wood: '#a0673a', woodD: '#7c4a25', paper: '#fff8ea', ink: '#2b2d42', honey: '#f7a928', honeyD: '#d9861a' };
  const FONT = 'font-family="Nunito, Avenir Next, Arial, sans-serif" font-weight="900"';
  const txt = (x: number, y: number, size: number, fill: string, t: string, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${fill}" ${FONT} ${extra}>${t}</text>`;
  const stars = (n = 22) => [...Array(n)].map((_, i) => `<circle cx="${(i * 197) % 1080}" cy="${640 + ((i * 331) % 860)}" r="${2 + (i % 3)}" fill="#fff" opacity="0.25"/>`).join('');
  const reps = (d: number, per: number) => Math.max(0, Math.ceil(d / per) - 1);
  const outline = 'stroke="#14213d" stroke-width="10" paint-order="stroke"';

  const tv = (id: string, x: number, y: number, s: number, screen: string) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <line x1="-30" y1="-210" x2="-120" y2="-310" stroke="${F2.gray}" stroke-width="10" stroke-linecap="round"/><line x1="30" y1="-210" x2="120" y2="-310" stroke="${F2.gray}" stroke-width="10" stroke-linecap="round"/>
      <rect x="-280" y="-196" width="580" height="380" rx="40" fill="#000" opacity="0.2"/><rect x="-290" y="-210" width="580" height="380" rx="40" fill="${C.wood}"/>
      <rect x="-262" y="-184" width="460" height="330" rx="24" fill="#0b1226"/>${screen}
      <circle cx="242" cy="-110" r="24" fill="${C.woodD}"/><circle cx="242" cy="-30" r="24" fill="${C.woodD}"/></g></g>`;
  const statik = () => `<g class="static">${[...Array(12)].map((_, i) => `<rect x="-262" y="${-184 + i * 27.5}" width="460" height="14" fill="#fff" opacity="${0.08 + (i % 3) * 0.08}"/>`).join('')}</g>`;

  const stamp = (id: string, x: number, y: number, t: string, c: string, rot = -10, w = 420) => `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot})">
      <rect x="${-w / 2}" y="-62" width="${w}" height="124" rx="22" fill="none" stroke="${c}" stroke-width="12"/>${txt(0, 28, 74, c, t)}</g></g>`;
  const bubble = (id: string, x: number, y: number, s: number, c: string) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-110" y="-70" width="220" height="130" rx="40" fill="${c}"/><path d="M-50 50 L-80 100 L-10 56 Z" fill="${c}"/>
      <circle cx="-50" cy="-5" r="14" fill="${F2.night}"/><circle cx="0" cy="-5" r="14" fill="${F2.night}"/><circle cx="50" cy="-5" r="14" fill="${F2.night}"/></g></g>`;

  // a generic honey pot with a label and two bees orbiting (class "bee")
  const honeyPot = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="150" rx="150" ry="18" fill="#000" opacity="0.18"/>
      <path d="M-110 -80 Q-170 40 -110 140 L110 140 Q170 40 110 -80Z" fill="${C.honey}"/><path d="M20 -80 L110 -80 Q170 40 110 140 L20 140Z" fill="${C.honeyD}"/>
      <rect x="-124" y="-120" width="248" height="50" rx="20" fill="${C.wood}"/>
      <path d="M-80 -78 Q-70 -20 -86 10 Q-70 30 -60 -10 Q-56 -50 -40 -78Z" fill="#ffd166"/>
      <rect x="-80" y="0" width="160" height="80" rx="16" fill="${C.paper}"/>${txt(0, 56, 46, C.woodD, 'MIEL')}
      ${[[-150, -170], [150, -120]].map(([bx, by]) => `<g class="bee"><g transform="translate(${bx} ${by})"><ellipse cx="0" cy="-22" rx="16" ry="20" fill="#fff" opacity="0.8"/><ellipse cx="0" cy="0" rx="28" ry="20" fill="${C.gold}"/><rect x="-6" y="-19" width="10" height="38" fill="${F2.night}"/><circle cx="22" cy="-4" r="4" fill="${F2.night}"/></g></g>`).join('')}</g></g>`;

  // a simple stylised country blob (not a precise map)
  const blob = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-200 -40 Q-170 -140 -60 -150 Q20 -200 100 -150 Q200 -150 220 -60 Q260 20 190 90 Q120 160 20 140 Q-80 170 -150 110 Q-230 50 -200 -40Z" fill="${C.redD}"/>
      <path d="M-210 -50 Q-180 -150 -70 -160 Q10 -210 90 -160 Q190 -160 210 -70 Q250 10 180 80 Q110 150 10 130 Q-90 160 -160 100 Q-240 40 -210 -50Z" fill="${C.red}"/>
      <path d="M40 -60 L52 -26 L88 -26 L60 -4 L70 30 L40 10 L10 30 L20 -4 L-8 -26 L28 -26Z" fill="${C.gold}"/></g></g>`;
  const plane = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-120 0 Q-120 -26 -90 -26 L110 -26 Q160 -20 170 0 Q160 20 110 26 L-90 26 Q-120 26 -120 0Z" fill="#fff"/>
      <path d="M-10 -20 L40 -110 L70 -110 L50 -20Z" fill="${F2.gray}"/><path d="M-10 20 L40 110 L70 110 L50 20Z" fill="${F2.gray}"/>
      <path d="M-110 -20 L-130 -70 L-100 -70 L-80 -20Z" fill="${F2.gray}"/>
      ${[0, 1, 2, 3].map((i) => `<circle cx="${10 + i * 32}" cy="-4" r="8" fill="${F2.skyD}"/>`).join('')}</g></g>`;
  const fence = (id: string, x0: number, x1: number, y: number) => {
    const posts = [...Array(6)].map((_, i) => x0 + (i * (x1 - x0)) / 5);
    return `<g id="${id}">${posts.map((px) => `<rect x="${px - 10}" y="${y - 260}" width="20" height="280" rx="6" fill="#6c7891"/><path d="M${px - 26} ${y - 260} L${px + 26} ${y - 290}" stroke="#6c7891" stroke-width="10" stroke-linecap="round"/>`).join('')}
      ${[0, 1, 2, 3].map((i) => `<path d="M${x0} ${y - 30 - i * 64} L${x1} ${y - 30 - i * 64}" stroke="#a9b4c8" stroke-width="6"/>`).join('')}
      ${[...Array(10)].map((_, i) => { const px = x0 + 40 + i * ((x1 - x0 - 80) / 9); return `<path d="M${px - 10} ${y - 282} l10 -14 l10 14 l10 -14" stroke="#a9b4c8" stroke-width="5" fill="none"/>`; }).join('')}</g>`;
  };
  // a faceless suit-and-tie silhouette (generic, no real person)
  const suit = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="190" rx="140" ry="16" fill="#000" opacity="0.18"/>
      <path d="M-130 190 L-130 40 Q-130 -20 -60 -30 L60 -30 Q130 -20 130 40 L130 190Z" fill="#3d4258"/>
      <path d="M-40 -30 L0 40 L40 -30Z" fill="#fff"/><path d="M-10 -14 L10 -14 L18 90 L0 110 L-18 90Z" fill="${C.red}"/>
      <circle cx="0" cy="-110" r="80" fill="#8d99ae"/></g></g>`;

  const phone = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-200" y="-330" width="400" height="660" rx="50" fill="#000" opacity="0.25" transform="translate(12 14)"/>
      <rect x="-200" y="-330" width="400" height="660" rx="50" fill="${C.ink}"/><rect x="-176" y="-290" width="352" height="580" rx="24" fill="#f4f6fb"/>
      <rect x="-50" y="-316" width="100" height="14" rx="7" fill="#555b6e"/>
      <rect x="-150" y="-240" width="300" height="70" rx="35" fill="#fff" stroke="${F2.gray}" stroke-width="5"/>
      <g transform="translate(118 -205)"><circle r="16" fill="none" stroke="#8d99ae" stroke-width="6"/><path d="M11 11 L22 22" stroke="#8d99ae" stroke-width="7" stroke-linecap="round"/></g>
      <text x="-128" y="-193" font-size="32" fill="${F2.night}" ${FONT}>SOUTH PARK</text>
      <rect class="cover" x="-134" y="-232" width="230" height="56" fill="#fff"/>
      <g class="zero">${txt(0, -40, 88, C.red, '0')}${txt(0, 20, 34, '#6c7891', 'RESULTADOS')}
        <g transform="translate(0 150)"><circle r="62" fill="none" stroke="#8d99ae" stroke-width="16"/><path d="M44 44 L90 90" stroke="#8d99ae" stroke-width="20" stroke-linecap="round"/>
        <circle cx="-20" cy="-10" r="7" fill="#8d99ae"/><circle cx="20" cy="-10" r="7" fill="#8d99ae"/><path d="M-22 26 Q0 8 22 26" stroke="#8d99ae" stroke-width="7" fill="none" stroke-linecap="round"/></g></g></g></g>`;

  const letter = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s}) rotate(-6)">
      <rect x="-170" y="-220" width="340" height="440" rx="16" fill="#000" opacity="0.25" transform="translate(10 12)"/>
      <rect x="-170" y="-220" width="340" height="440" rx="16" fill="${C.paper}"/>${txt(0, -130, 48, F2.night, 'LO SENTIMOS')}
      ${[0, 1, 2, 3].map((i) => `<rect x="-120" y="${-80 + i * 44}" width="${240 - (i % 2) * 70}" height="18" rx="9" fill="${F2.gray}"/>`).join('')}
      <g transform="translate(80 150) rotate(-10)"><rect x="-18" y="-60" width="22" height="80" rx="11" fill="#f2c29b"/><rect x="-4" y="-66" width="22" height="80" rx="11" fill="#e8b48a" transform="rotate(22 7 14)"/><rect x="-30" y="0" width="60" height="50" rx="20" fill="#f2c29b"/></g></g></g>`;

  // a balance scale: the beam ("beam") tilts; the pans hang from its ends
  const balance = (id: string, x: number, y: number) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="-14" y="-40" width="28" height="330" rx="10" fill="${C.goldD}"/><rect x="-110" y="280" width="220" height="34" rx="14" fill="${C.goldD}"/>
      <g class="beam"><rect x="-300" y="-56" width="600" height="26" rx="13" fill="${C.gold}"/>
        <g class="panL"><path d="M-300 -40 L-370 110 M-300 -40 L-230 110" stroke="${C.goldD}" stroke-width="6"/><path d="M-390 110 L-210 110 Q-220 160 -300 160 Q-380 160 -390 110Z" fill="${C.gold}"/>
          <g transform="translate(-300 50)"><path d="M-60 60 Q-80 -10 -30 -40 L30 -40 Q80 -10 60 60Z" fill="#7fb069"/><rect x="-30" y="-58" width="60" height="22" rx="8" fill="#5e8c4a"/>${txt(0, 40, 64, '#fff', '$')}</g></g>
        <g class="panR"><path d="M300 -40 L230 110 M300 -40 L370 110" stroke="${C.goldD}" stroke-width="6"/><path d="M210 110 L390 110 Q380 160 300 160 Q220 160 210 110Z" fill="${C.gold}"/>
          <g transform="translate(300 76)"><rect x="-100" y="-26" width="200" height="52" rx="14" fill="#fff"/>${txt(0, 13, 32, F2.blue, 'LIBERTAD')}</g></g></g>
      <circle cx="0" cy="-43" r="20" fill="${C.goldD}"/></g></g>`;

  const sorghum = (id: string, x: number, base: number, h: number, s = 1) => `<g id="${id}" class="stalk"><g transform="translate(${x} ${base}) scale(${s})">
      <rect x="-8" y="${-h}" width="16" height="${h}" rx="8" fill="${F2.greenD}"/>
      <path d="M0 ${-h * 0.35} Q60 ${-h * 0.45} 110 ${-h * 0.3} Q60 ${-h * 0.38} 0 ${-h * 0.28}Z" fill="${F2.green}"/>
      <path d="M0 ${-h * 0.6} Q-60 ${-h * 0.7} -110 ${-h * 0.55} Q-60 ${-h * 0.63} 0 ${-h * 0.53}Z" fill="${F2.green}"/>
      ${[...Array(14)].map((_, i) => `<circle cx="${((i % 3) - 1) * 22 + (i % 2) * 6}" cy="${-h - 20 - Math.floor(i / 3) * 26}" r="17" fill="${i % 2 ? '#b5452b' : '#cf5f37'}"/>`).join('')}</g></g>`;

  defineVisuals({
    hook: {
      bg: '#3a0f19',
      html: () => svg(`${stars()}
        <g id="hWin"><g transform="translate(500 1040)">
          <rect x="-370" y="-260" width="740" height="520" rx="30" fill="#000" opacity="0.25" transform="translate(12 14)"/>
          <rect x="-370" y="-260" width="740" height="520" rx="30" fill="#f4f6fb"/><rect x="-370" y="-260" width="740" height="70" rx="30" fill="${F2.gray}"/><rect x="-370" y="-220" width="740" height="30" fill="${F2.gray}"/>
          <circle cx="-320" cy="-225" r="12" fill="${F2.red}"/><circle cx="-284" cy="-225" r="12" fill="${C.gold}"/><circle cx="-248" cy="-225" r="12" fill="${F2.green}"/>
          <rect x="-200" y="-240" width="400" height="32" rx="16" fill="#fff"/>
          <g class="content">${txt(0, -10, 96, F2.night, 'SOUTH PARK')}
            ${[0, 1, 2].map((i) => `<rect x="${-300 + i * 210}" y="50" width="180" height="140" rx="18" fill="${RAINBOW[i * 2]}"/>`).join('')}</g>
          <g class="empty" opacity="0"><rect x="-300" y="-150" width="600" height="360" rx="20" fill="none" stroke="${F2.gray}" stroke-width="10" stroke-dasharray="30 20"/></g></g></g>
        <g id="hEraser"><g transform="translate(500 1040) rotate(-25)"><rect x="-90" y="-150" width="180" height="300" rx="30" fill="${F2.pink}"/><rect x="-90" y="40" width="180" height="110" rx="30" fill="${F2.blue}"/><rect x="-90" y="40" width="180" height="30" fill="${F2.blue}"/></g></g>
        ${stamp('hOne', 500, 1420, '1 CAPÍTULO', C.gold, -6, 520)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#hWin'), K('browser') - 0.4, 0.45);
        tl.set($('#hEraser'), { x: -700, y: -200 }, s.t0);
        tl.to($('#hEraser'), { x: 1000, y: 300, duration: 0.5, ease: 'power2.inOut' }, K('erase') - 0.3);
        tl.to($('#hWin .content'), { opacity: 0, duration: 0.3 }, K('erase') - 0.1);
        tl.to($('#hWin .empty'), { opacity: 1, duration: 0.3 }, K('erase') + 0.1);
        tl.fromTo($('#hOne'), { scale: 2, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('one') - 0.2);
      },
    },
    episode: {
      bg: '#1f3566',
      html: () => svg(`${stars(18)}
        ${tv('eTv', 500, 1060, 1.25, `${statik()}<g class="word" opacity="0">${txt(-32, -20, 62, C.gold, 'BAND IN CHINA')}<rect x="-122" y="20" width="180" height="56" rx="16" fill="${C.red}"/>${txt(-32, 60, 34, '#fff', 'T23 · E2')}</g>`)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#eTv'), s.t0 + 0.05, 0.4);
        tl.fromTo($('#eTv .static'), { opacity: 1 }, { opacity: 0, duration: 0.3 }, K('tv'));
        tl.fromTo($('#eTv .word'), { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, K('tv') + 0.2);
      },
    },
    trip: {
      bg: '#3a0f19',
      html: () => svg(`${stars(18)}
        ${blob('tMap', 500, 960, 1.4)}
        ${plane('tPlane', 500, 760, 0.8)}
        ${honeyPot('tHoney', 500, 1230, 0.9)}
        ${fence('tFence', 120, 900, 1450)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#tMap'), s.t0 + 0.1, 0.45);
        tl.fromTo($('#tPlane'), { x: -800 }, { x: 0, duration: 0.5, ease: 'power2.out' }, K('plane') - 0.4);
        tl.to($('#tPlane'), { y: -12, duration: 0.6, yoyo: true, repeat: reps(s.t1 - K('plane'), 0.6), ease: 'sine.inOut' }, K('plane') + 0.1);
        tl.to($('#tMap'), { opacity: 0.35, duration: 0.3 }, K('camp') - 0.2);
        tl.fromTo($('#tFence'), { y: 600 }, { y: 0, duration: 0.4, ease: 'back.out(1.3)' }, K('camp') - 0.2);
        tl.fromTo($('#tHoney'), { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }, K('honey') - 0.2);
        tl.to($('#tHoney .bee'), { y: -20, x: 10, duration: 0.3, yoyo: true, repeat: reps(s.t1 - K('honey'), 0.3), ease: 'sine.inOut' }, K('honey'));
      },
    },
    censor: {
      bg: '#14213d',
      html: () => svg(`${stars(18)}
        ${honeyPot('cHoney', 280, 1090, 0.85)}
        <g id="cBar"><g transform="translate(280 1080) rotate(-8)"><rect x="-200" y="-46" width="400" height="92" rx="10" fill="#000"/>${txt(0, 18, 50, '#fff', 'CENSURADO')}</g></g>
        <g id="cEq">${txt(560, 1110, 140, C.gold, '=', outline)}</g>
        ${suit('cSuit', 790, 1080, 0.85)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#cHoney'), s.t0 + 0.1, 0.45);
        tl.to($('#cHoney .bee'), { y: -20, x: 10, duration: 0.3, yoyo: true, repeat: reps(s.t1 - s.t0, 0.3), ease: 'sine.inOut' }, s.t0 + 0.5);
        tl.fromTo($('#cBar'), { scale: 2.4, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('bar') - 0.2);
        tl.fromTo($('#cSuit'), { x: 600 }, { x: 0, duration: 0.45, ease: 'back.out(1.3)' }, K('compare') - 0.45);
        f2Pop(tl, $('#cEq'), K('compare'), 0.4);
      },
    },
    erased: {
      bg: '#3a0f19',
      html: () => svg(`${stars(18)}${phone('ePhone', 500, 1080, 1.0)}
        <g id="eDots">${[0, 1, 2].map((i) => `<circle class="dot" cx="${450 + i * 50}" cy="1000" r="16" fill="${F2.blue}"/>`).join('')}</g>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#ePhone'), { y: 900 }, { y: 0, duration: 0.45, ease: 'back.out(1.3)' }, s.t0 + 0.05);
        tl.to($('#ePhone'), { rotation: 3, transformOrigin: '50% 100%', duration: 0.7, yoyo: true, repeat: reps(K('zero') - s.t0 - 0.6, 0.7), ease: 'sine.inOut' }, s.t0 + 0.5);
        tl.fromTo($('#eDots'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, K('type') + 0.3);
        tl.fromTo($('#eDots .dot'), { y: 0 }, { y: -24, duration: 0.25, yoyo: true, repeat: reps(K('zero') - K('type') - 0.5, 0.25), stagger: 0.1, ease: 'sine.inOut' }, K('type') + 0.3);
        tl.to($('#eDots'), { opacity: 0, duration: 0.15 }, K('zero') - 0.2);
        tl.fromTo($('#ePhone .cover'), { scaleX: 1, transformOrigin: '100% 50%' }, { scaleX: 0, duration: 0.45, ease: 'steps(10)' }, K('type') - 0.2);
        tl.fromTo($('#ePhone .zero'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, K('zero') - 0.1);
        tl.to($('#ePhone'), { x: 14, duration: 0.06, yoyo: true, repeat: 5 }, K('zero') + 0.3);
      },
    },
    apology: {
      bg: '#1f3566',
      html: () => svg(`${stars(18)}
        ${letter('aLetter', 500, 1000, 0.9)}
        ${balance('aScale', 500, 1080)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#aLetter'), { y: -900, rotation: -30, opacity: 0, transformOrigin: '50% 50%' }, { y: 0, rotation: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, K('letter') - 0.3);
        tl.to($('#aLetter'), { x: -800, opacity: 0, duration: 0.35, ease: 'power2.in' }, K('scale') - 0.6);
        tl.fromTo($('#aScale'), { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.6)' }, K('scale') - 0.4);
        tl.fromTo($('#aScale .beam'), { rotation: 0, svgOrigin: '0 -43' }, { rotation: -14, svgOrigin: '0 -43', duration: 0.45, ease: 'back.out(2)' }, K('scale'));
        tl.fromTo($('#aScale .panL'), { rotation: 0, svgOrigin: '-300 -40' }, { rotation: 14, svgOrigin: '-300 -40', duration: 0.45, ease: 'back.out(2)' }, K('scale'));
        tl.fromTo($('#aScale .panR'), { rotation: 0, svgOrigin: '300 -40' }, { rotation: 14, svgOrigin: '300 -40', duration: 0.45, ease: 'back.out(2)' }, K('scale'));
      },
    },
    sorghum: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Sun('sSun', 830, 650, 50)}
        <rect x="-20" y="1380" width="1120" height="600" fill="#c98a4b"/><rect x="-20" y="1380" width="1120" height="30" fill="#b07436"/>
        ${sorghum('sS1', 180, 1390, 420, 0.95)}${sorghum('sS2', 340, 1390, 520, 1)}${sorghum('sS3', 500, 1390, 460, 1)}${sorghum('sS4', 660, 1390, 540, 1)}${sorghum('sS5', 830, 1390, 430, 0.95)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#sSun'), s.t0 + 0.1, 0.5);
        tl.to($('#sSun .rays'), { rotation: 60, svgOrigin: '0 0', duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('.stalk'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.4, ease: 'back.out(1.6)', stagger: 0.025 }, K('grow') - 0.35);
        tl.to($('.stalk'), { rotation: 2, transformOrigin: '50% 100%', duration: 0.9, yoyo: true, repeat: reps(s.t1 - K('grow'), 0.9), ease: 'sine.inOut' }, K('grow') + 0.2);
      },
    },
    closing: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Cloud('clC1', 200, 1420, 1.1)}${f2Cloud('clC2', 840, 1440, 0.9)}
        ${stamp('clBan', 500, 940, 'VETADOS', C.red, -8, 480)}
        ${[[230, 1130, -12], [790, 1130, 10], [500, 1200, -4]].map(([x, y, r], i) => `<g class="ja"><g transform="translate(${x} ${y}) rotate(${r})">${txt(0, 0, 84, [C.gold, F2.pink, '#fff'][i], 'JA', outline)}</g></g>`).join('')}
        ${bubble('clB1', 260, 1340, 0.7, F2.green)}${bubble('clB2', 760, 1320, 0.7, C.gold)}${bubble('clB3', 520, 1440, 0.6, F2.pink)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#clC1'), { x: -40 }, { x: 40, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clC2'), { x: 30 }, { x: -30, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clBan'), { scale: 2.2, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('banned') - 0.2);
        tl.fromTo($('.ja'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2.5)', stagger: 0.06 }, K('laugh') - 0.1);
        tl.to($('.ja'), { y: -14, duration: 0.25, yoyo: true, repeat: reps(s.t1 - K('laugh'), 0.25), ease: 'sine.inOut' }, K('laugh') + 0.3);
        f2Pop(tl, $('#clB1'), K('comments') - 0.1, 0.35);
        f2Pop(tl, $('#clB2'), K('comments') + 0.0, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.1, 0.35);
      },
    },
  });
}
