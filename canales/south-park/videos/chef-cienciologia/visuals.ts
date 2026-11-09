// =====================================================================
//  Custom visuals for "Por qué desapareció Chef" (flat 2D, HyperFrames).
//  Original art only: chef's hat, pot, microphone, generic gold trophy, TV, member card, letter, spiral, grave, tapes, scissors.
//  No South Park characters, no Scientology symbols, no real Oscar statuette (names appear only as text).
//  Helpers live inside this block so they don't clash with other videos in the shared type-check scope.
// =====================================================================
{
  const C = { gold: '#ffc83d', goldD: '#e0a21f', wood: '#a0673a', woodD: '#7c4a25', woodL: '#c8844e', hatS: '#d9dfee', paper: '#fff8ea', ink: '#2b2d42' };
  const FONT = 'font-family="Nunito, Avenir Next, Arial, sans-serif" font-weight="900"';
  const txt = (x: number, y: number, size: number, fill: string, t: string, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${fill}" ${FONT} ${extra}>${t}</text>`;
  const stars = (n = 26) => [...Array(n)].map((_, i) => `<circle cx="${(i * 197) % 1080}" cy="${640 + ((i * 331) % 860)}" r="${2 + (i % 3)}" fill="#fff" opacity="0.25"/>`).join('');
  const reps = (d: number, per: number) => Math.max(0, Math.ceil(d / per) - 1);

  // a puffy chef's hat (generic object, no character)
  const hatShape = (fill: string, shade: string) => `
      <circle cx="-62" cy="-40" r="62" fill="${shade}"/><circle cx="62" cy="-40" r="62" fill="${shade}"/><circle cx="0" cy="-86" r="74" fill="${shade}"/>
      <circle cx="-66" cy="-46" r="58" fill="${fill}"/><circle cx="58" cy="-46" r="58" fill="${fill}"/><circle cx="-4" cy="-92" r="70" fill="${fill}"/>
      <rect x="-86" y="-30" width="172" height="90" rx="16" fill="${fill}"/><rect x="-86" y="34" width="172" height="26" rx="10" fill="${shade}"/>`;
  const chefHat = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="10" cy="76" rx="100" ry="14" fill="#000" opacity="0.15"/>${hatShape('#fff', C.hatS)}</g></g>`;
  // a cook in our flat style (evokes the character without copying the show's design): chef's hat, red shirt,
  // blue trousers, black shoes, dark skin, moustache. Origin at the feet; about 850 units tall. Class "arm" waves.
  const SKIN = '#6b4423', SKIN_D = '#55351b';
  const cook = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="10" rx="150" ry="20" fill="#000" opacity="0.2"/>
      <ellipse cx="-46" cy="-8" rx="50" ry="22" fill="#111"/><ellipse cx="46" cy="-8" rx="50" ry="22" fill="#111"/>
      <rect x="-84" y="-250" width="80" height="240" rx="26" fill="#3f5fbf"/><rect x="4" y="-250" width="80" height="240" rx="26" fill="#2f4a9e"/>
      <rect x="-90" y="-290" width="180" height="80" rx="24" fill="#3f5fbf"/>
      <rect x="-150" y="-520" width="44" height="200" rx="22" fill="${F2.red}"/><circle cx="-128" cy="-300" r="30" fill="${SKIN}"/>
      <g class="arm"><rect x="106" y="-520" width="44" height="200" rx="22" fill="#d9454a"/><circle cx="128" cy="-300" r="30" fill="${SKIN_D}"/></g>
      <rect x="-118" y="-560" width="236" height="300" rx="70" fill="${F2.red}"/><path d="M10 -560 L48 -560 Q118 -560 118 -490 L118 -330 Q118 -260 48 -260 L10 -260Z" fill="#d9454a"/>
      <rect x="-26" y="-580" width="52" height="40" rx="14" fill="${SKIN_D}"/>
      <circle cx="-104" cy="-680" r="22" fill="${SKIN_D}"/><circle cx="104" cy="-680" r="22" fill="${SKIN_D}"/>
      <circle cx="0" cy="-680" r="106" fill="${SKIN}"/>
      <ellipse cx="-36" cy="-700" rx="20" ry="24" fill="#fff"/><ellipse cx="36" cy="-700" rx="20" ry="24" fill="#fff"/>
      <circle cx="-32" cy="-696" r="10" fill="#111"/><circle cx="32" cy="-696" r="10" fill="#111"/>
      <path d="M-62 -646 Q-30 -670 0 -652 Q30 -670 62 -646 Q30 -632 0 -640 Q-30 -632 -62 -646Z" fill="#111"/>
      <path d="M-34 -618 Q0 -590 34 -618" stroke="#2a1608" stroke-width="9" fill="none" stroke-linecap="round"/>
      <g transform="translate(0 -748) scale(0.95)">${hatShape('#fff', C.hatS)}</g></g></g>`;

  const pot = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      ${[-50, 0, 50].map((dx) => `<path class="steam" d="M${dx} -110 q-20 -30 0 -60 q20 -30 0 -60" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.8"/>`).join('')}
      <rect x="-150" y="-70" width="40" height="24" rx="10" fill="#6c7891"/><rect x="110" y="-70" width="40" height="24" rx="10" fill="#6c7891"/>
      <path d="M-120 -90 L120 -90 L104 70 Q100 90 80 90 L-80 90 Q-100 90 -104 70Z" fill="#8d99ae"/><path d="M20 -90 L120 -90 L104 70 Q100 90 80 90 L20 90Z" fill="#6c7891"/>
      <rect x="-134" y="-104" width="268" height="28" rx="14" fill="#a9b4c8"/></g></g>`;

  // a stage microphone on a stand; "waves" are sound arcs to its right
  const mic = (id: string, x: number, y: number, s = 1, head = true) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="300" rx="120" ry="18" fill="#000" opacity="0.2"/><rect x="-90" y="270" width="180" height="30" rx="14" fill="${C.ink}"/>
      <rect x="-10" y="-40" width="20" height="320" rx="10" fill="#555b6e"/>
      ${head ? `<rect x="-44" y="-200" width="88" height="170" rx="44" fill="#3d4258"/><rect x="-44" y="-200" width="88" height="110" rx="44" fill="#8d99ae"/>
      ${[0, 1, 2, 3].map((i) => `<rect x="-36" y="${-176 + i * 22}" width="72" height="6" rx="3" fill="#6c7891"/>`).join('')}` : '<rect x="-30" y="-56" width="60" height="22" rx="8" fill="#555b6e"/>'}</g></g>`;
  const waves = (id: string, x: number, y: number) => `<g id="${id}">${[0, 1, 2].map((i) => `<path class="w" d="M${x + 60 + i * 50} ${y - 60 - i * 34} Q${x + 100 + i * 64} ${y} ${x + 60 + i * 50} ${y + 60 + i * 34}" stroke="${C.gold}" stroke-width="14" fill="none" stroke-linecap="round"/>`).join('')}</g>`;

  // a generic gold trophy with a star and a plate (NOT the Oscar statuette)
  const trophy = (id: string, x: number, y: number, s = 1, plate = '') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-100 -150 L100 -150 Q100 10 0 40 Q-100 10 -100 -150Z" fill="${C.gold}"/><path d="M0 -150 L100 -150 Q100 10 0 40Z" fill="${C.goldD}"/>
      <path d="M-100 -120 Q-170 -120 -160 -60 Q-150 -10 -80 -10" fill="none" stroke="${C.gold}" stroke-width="22"/>
      <path d="M100 -120 Q170 -120 160 -60 Q150 -10 80 -10" fill="none" stroke="${C.goldD}" stroke-width="22"/>
      <rect x="-22" y="30" width="44" height="60" fill="${C.goldD}"/><rect x="-100" y="86" width="200" height="70" rx="12" fill="${C.ink}"/>
      ${plate ? txt(0, 134, 36, C.gold, plate) : ''}
      <path d="M0 -122 L14 -88 L50 -88 L22 -66 L32 -30 L0 -52 L-32 -30 L-22 -66 L-50 -88 L-14 -88Z" fill="#fff" opacity="0.9"/></g></g>`;

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

  const grave = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-80 80 L-80 -50 Q-80 -110 0 -110 Q80 -110 80 -50 L80 80Z" fill="#8d99ae"/><path d="M14 80 L14 -108 Q80 -100 80 -50 L80 80Z" fill="#6c7891"/>
      ${txt(0, 0, 46, '#4a5368', 'RIP')}<rect x="-104" y="74" width="208" height="26" rx="10" fill="#5a6378"/></g></g>`;

  // a strip of audio tape with a speech bubble on it, split in two halves (class "L" / "R") so the scissors can cut it
  const tape = (id: string, y: number, label: string, c: string) => `<g id="${id}">
      <g class="L"><rect x="120" y="${y - 50}" width="390" height="100" fill="#3d4258"/>${[...Array(6)].map((_, i) => `<rect x="${140 + i * 64}" y="${y - 40}" width="30" height="14" rx="4" fill="#8d99ae"/><rect x="${140 + i * 64}" y="${y + 26}" width="30" height="14" rx="4" fill="#8d99ae"/>`).join('')}
        <rect x="230" y="${y - 22}" width="250" height="44" rx="22" fill="${c}"/>${txt(355, y + 14, 32, F2.night, label)}</g>
      <g class="R"><rect x="510" y="${y - 50}" width="390" height="100" fill="#3d4258"/>${[...Array(6)].map((_, i) => `<rect x="${530 + i * 64}" y="${y - 40}" width="30" height="14" rx="4" fill="#8d99ae"/><rect x="${530 + i * 64}" y="${y + 26}" width="30" height="14" rx="4" fill="#8d99ae"/>`).join('')}
        <path d="M560 ${y} q30 -24 60 0 t60 0 t60 0 t60 0 t60 0" stroke="${C.gold}" stroke-width="8" fill="none"/></g></g>`;
  const scissors = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <g class="bB"><path d="M2 22 L34 8 Q38 -140 2 -290Z" fill="#b8c3da"/><path d="M4 10 L-34 96" stroke="#d9454a" stroke-width="28" stroke-linecap="round"/>
        <ellipse cx="-44" cy="140" rx="42" ry="52" fill="none" stroke="#d9454a" stroke-width="24"/></g>
      <g class="bA"><path d="M-2 22 L-34 8 Q-38 -140 -2 -290Z" fill="#eef2f9"/><path d="M-4 10 L34 96" stroke="${F2.red}" stroke-width="28" stroke-linecap="round"/>
        <ellipse cx="44" cy="140" rx="42" ry="52" fill="none" stroke="${F2.red}" stroke-width="24"/></g>
      <circle r="16" fill="${C.ink}"/><circle cx="-4" cy="-4" r="5" fill="#8d99ae"/></g></g>`;

  // an Archimedean spiral (hypnosis)
  const spiral = (id: string, cx: number, cy: number) => {
    let d = `M${cx} ${cy}`;
    for (let a = 0; a < Math.PI * 12; a += 0.15) { const r = 11 * a; d += ` L${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`; }
    return `<g id="${id}"><path d="${d}" fill="none" stroke="#fff" stroke-width="26" stroke-linecap="round" opacity="0.35"/></g>`;
  };

  defineVisuals({
    hook: {
      bg: '#1f3566',
      html: () => svg(`${stars()}
        <rect x="-20" y="1400" width="1120" height="600" fill="${C.woodD}"/><rect x="-20" y="1390" width="1120" height="24" fill="${C.wood}"/>
        <g id="hTable"><rect x="620" y="1230" width="300" height="34" rx="12" fill="${C.woodL}"/><rect x="650" y="1260" width="28" height="140" fill="${C.wood}"/><rect x="862" y="1260" width="28" height="140" fill="${C.wood}"/></g>
        ${pot('hPot', 770, 1140, 0.85)}
        ${cook('hCook', 340, 1440, 0.85)}
        <g id="hQ">${txt(340, 1130, 260, C.gold, '?', 'stroke="#14213d" stroke-width="14" paint-order="stroke"')}</g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#hTable'), s.t0 + 0.05, 0.4);
        f2Pop(tl, $('#hPot'), s.t0 + 0.15, 0.45);
        tl.fromTo($('#hPot .steam'), { y: 0, opacity: 0.8 }, { y: -70, opacity: 0, duration: 1.2, ease: 'none', stagger: { each: 0.4, repeat: reps(s.t1 - s.t0, 1.2) } }, s.t0 + 0.2);
        tl.fromTo($('#hCook'), { y: 900 }, { y: 0, duration: 0.45, ease: 'back.out(1.4)' }, K('hat') - 0.35);
        tl.fromTo($('#hCook .arm'), { rotation: 0, svgOrigin: '128 -500' }, { rotation: -150, svgOrigin: '128 -500', duration: 0.3, ease: 'back.out(2)' }, K('hat') + 0.15);
        tl.to($('#hCook .arm'), { rotation: -120, svgOrigin: '128 -500', duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('hat') + 0.45);
        tl.to($('#hCook .arm'), { rotation: 0, svgOrigin: '128 -500', duration: 0.3 }, K('real') - 0.4);
        tl.to($('#hCook'), { opacity: 0.15, duration: 0.3 }, K('real') - 0.05);
        tl.fromTo($('#hQ'), { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, K('real'));
      },
    },
    voice: {
      bg: '#2a1f5c',
      html: () => svg(`${stars(22)}
        <path d="M250 300 L420 300 L560 1420 L80 1420Z" fill="${C.gold}" opacity="0.1"/>
        ${mic('vMic', 320, 1080, 1.1)}
        ${waves('vWaves', 320, 900)}
        ${trophy('vCup', 760, 1060, 1.05, 'OSCAR')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#vMic'), { y: 700 }, { y: 0, duration: 0.45, ease: 'back.out(1.4)' }, K('mic') - 0.35);
        tl.fromTo($('#vWaves .w'), { opacity: 0, x: -20 }, { opacity: 1, x: 20, duration: 0.5, ease: 'sine.inOut', stagger: { each: 0.15, repeat: reps(s.t1 - K('mic'), 0.8), yoyo: true } }, K('mic'));
        tl.fromTo($('#vCup'), { x: 600, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }, K('oscar') - 0.25);
      },
    },
    episode: {
      bg: '#1f3566',
      html: () => svg(`${stars(18)}
        ${tv('eTv', 500, 1060, 1.25, `${statik()}<g class="word" opacity="0">${txt(-32, -4, 50, C.gold, 'CIENCIOLOGÍA')}</g>`)}
        ${[[200, 760, -12], [820, 800, 10], [170, 1340, 8], [840, 1360, -8]].map(([x, y, r], i) => `<g class="ja"><g transform="translate(${x} ${y}) rotate(${r})">${txt(0, 0, 72, i % 2 ? F2.pink : C.gold, 'JA', 'stroke="#14213d" stroke-width="10" paint-order="stroke"')}</g></g>`).join('')}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#eTv'), s.t0 + 0.05, 0.4);
        tl.fromTo($('#eTv .static'), { opacity: 1 }, { opacity: 0, duration: 0.3 }, K('tv'));
        tl.fromTo($('#eTv .word'), { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, K('tv') + 0.2);
        tl.fromTo($('.ja'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2.5)', stagger: 0.05 }, K('laugh') - 0.1);
        tl.to($('#eTv'), { rotation: 2, transformOrigin: '50% 100%', duration: 0.12, yoyo: true, repeat: 5, ease: 'sine.inOut' }, K('laugh'));
      },
    },
    member: {
      bg: '#14213d',
      html: () => svg(`${stars(18)}
        <g id="mCard"><g transform="translate(500 1040) rotate(-4)">
          <rect x="-290" y="-170" width="600" height="360" rx="34" fill="#000" opacity="0.25"/>
          <rect x="-300" y="-180" width="600" height="360" rx="34" fill="${C.paper}"/><rect x="-300" y="-180" width="600" height="70" rx="34" fill="${F2.blue}"/><rect x="-300" y="-140" width="600" height="30" fill="${F2.blue}"/>
          <rect x="-250" y="-80" width="190" height="220" rx="20" fill="${F2.gray}"/><circle cx="-155" cy="-10" r="52" fill="#8d99ae"/><rect x="-225" y="50" width="140" height="90" rx="40" fill="#8d99ae"/>
          ${[0, 1, 2].map((i) => `<rect x="-20" y="${-60 + i * 56}" width="${260 - i * 50}" height="24" rx="12" fill="${F2.gray}"/>`).join('')}
          <g transform="translate(200 110) scale(0.35)"><rect x="-44" y="-200" width="88" height="170" rx="44" fill="#3d4258"/><rect x="-10" y="-40" width="20" height="120" rx="10" fill="#555b6e"/></g></g></g>
        ${stamp('mStamp', 560, 1150, 'MIEMBRO', F2.red, -12)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#mCard'), { x: -900, rotation: -20, transformOrigin: '50% 50%' }, { x: 0, rotation: 0, duration: 0.45, ease: 'back.out(1.3)' }, K('card') - 0.3);
        tl.fromTo($('#mStamp'), { scale: 2.2, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('stamp') - 0.2);
        tl.to($('#mCard'), { y: 10, duration: 0.08, yoyo: true, repeat: 1 }, K('stamp') + 0.05);
      },
    },
    quit: {
      bg: '#14213d',
      html: () => svg(`${stars(18)}
        <g id="qLetter"><g transform="translate(300 1000) rotate(-7)">
          <rect x="-160" y="-210" width="320" height="420" rx="16" fill="#000" opacity="0.25" transform="translate(10 12)"/>
          <rect x="-160" y="-210" width="320" height="420" rx="16" fill="${C.paper}"/>${txt(0, -110, 66, F2.red, 'ME VOY')}
          ${[0, 1, 2, 3, 4].map((i) => `<rect x="-110" y="${-50 + i * 46}" width="${220 - (i % 2) * 60}" height="18" rx="9" fill="${F2.gray}"/>`).join('')}</g></g>
        <path id="qSpot" d="M650 520 L830 520 L960 1420 L520 1420Z" fill="#fff" opacity="0.08"/>
        ${mic('qMic', 740, 1100, 0.95, false)}
        <g id="qX"><g transform="translate(740 1000)"><rect x="-20" y="-170" width="40" height="340" rx="20" fill="${F2.red}" transform="rotate(45)"/><rect x="-20" y="-170" width="40" height="340" rx="20" fill="${F2.red}" transform="rotate(-45)"/></g></g>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#qLetter'), { x: -500, y: -600, rotation: -40, opacity: 0, transformOrigin: '50% 50%' }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, K('letter') - 0.3);
        tl.to($('#qLetter'), { y: -14, duration: 1, yoyo: true, repeat: reps(s.t1 - K('letter'), 1), ease: 'sine.inOut' }, K('letter') + 0.3);
        tl.fromTo($('#qSpot'), { opacity: 0 }, { opacity: 0.08, duration: 0.4 }, K('letter') + 0.4);
        f2Pop(tl, $('#qMic'), K('letter') + 0.5, 0.4);
        tl.fromTo($('#qX'), { scale: 0, rotation: -30, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.35, ease: 'back.out(2.5)' }, K('empty') - 0.1);
      },
    },
    brainwash: {
      bg: '#4b3a9a',
      html: () => svg(`${spiral('bSpiral', 500, 980)}
        <rect x="-20" y="1380" width="1120" height="600" fill="#3a2c7a"/>
        ${grave('bGrave', 500, 1270, 1.6)}
        ${chefHat('bHat', 500, 1000, 1.15)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#bHat'), s.t0 + 0.1, 0.45);
        tl.fromTo($('#bSpiral'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.45, ease: 'back.out(1.5)' }, K('spiral') - 0.2);
        tl.fromTo($('#bSpiral'), { rotation: 0 }, { rotation: 900, svgOrigin: '500 980', duration: s.t1 - K('spiral'), ease: 'none' }, K('spiral') - 0.2);
        tl.to($('#bHat'), { rotation: 8, transformOrigin: '50% 100%', duration: 0.35, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('spiral') + 0.2);
        tl.to($('#bSpiral'), { opacity: 0, duration: 0.3 }, K('dies') - 0.1);
        tl.fromTo($('#bGrave'), { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'bounce.out' }, K('dies') - 0.1);
        tl.to($('#bHat'), { y: 30, scale: 0.75, rotation: -8, duration: 0.4, ease: 'power2.out' }, K('dies') - 0.1);
      },
    },
    clips: {
      bg: '#1f3566',
      html: () => svg(`${stars(18)}
        ${tape('cT1', 800, '¡HOLA!', F2.green)}${tape('cT2', 1010, 'MMM…', C.gold)}${tape('cT3', 1220, '¡NIÑOS!', F2.pink)}
        ${scissors('cScis', 510, 1260, 1.1)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#cT1'), { x: -1100 }, { x: 0, duration: 0.4, ease: 'power3.out' }, K('tapes') - 0.25);
        tl.fromTo($('#cT2'), { x: 1100 }, { x: 0, duration: 0.4, ease: 'power3.out' }, K('tapes') - 0.15);
        tl.fromTo($('#cT3'), { x: -1100 }, { x: 0, duration: 0.4, ease: 'power3.out' }, K('tapes') - 0.05);
        tl.fromTo($('#cScis'), { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }, K('cut') - 0.5);
        tl.fromTo($('#cScis .bA'), { rotation: -24, svgOrigin: '0 0' }, { rotation: 0, duration: 0.15, yoyo: true, repeat: 1 }, K('cut'));
        tl.fromTo($('#cScis .bB'), { rotation: 24, svgOrigin: '0 0' }, { rotation: 0, duration: 0.15, yoyo: true, repeat: 1 }, K('cut'));
        tl.to($('.L'), { x: -50, rotation: -3, transformOrigin: '100% 50%', duration: 0.3, ease: 'back.out(2)' }, K('cut') + 0.1);
        tl.to($('.R'), { x: 50, rotation: 3, transformOrigin: '0% 50%', duration: 0.3, ease: 'back.out(2)' }, K('cut') + 0.1);
      },
    },
    closing: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Cloud('clC1', 200, 1380, 1.1)}${f2Cloud('clC2', 820, 1420, 0.9)}
        <ellipse id="clHalo" cx="500" cy="830" rx="120" ry="30" fill="none" stroke="${C.gold}" stroke-width="18"/>
        ${chefHat('clHat', 500, 1020, 1.1)}
        ${bubble('clW1', 180, 820, 0.6, '#fff')}${bubble('clW2', 830, 900, 0.6, '#fff')}${bubble('clW3', 200, 1150, 0.55, '#fff')}${bubble('clW4', 820, 1180, 0.55, '#fff')}
        ${bubble('clB1', 260, 1320, 0.7, F2.green)}${bubble('clB2', 760, 1300, 0.7, C.gold)}${bubble('clB3', 520, 1420, 0.6, F2.pink)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#clHat'), s.t0 + 0.1, 0.45);
        tl.fromTo($('#clC1'), { x: -40 }, { x: 40, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clC2'), { x: 30 }, { x: -30, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clW1, #clW3'), { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)', stagger: 0.08 }, K('words') - 0.2);
        tl.fromTo($('#clW2, #clW4'), { x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)', stagger: 0.08 }, K('words') - 0.1);
        tl.fromTo($('#clHalo'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, K('miss') - 0.1);
        tl.to($('#clHat, #clHalo'), { y: -40, duration: s.t1 - K('miss'), ease: 'sine.inOut' }, K('miss'));
        f2Pop(tl, $('#clB1'), K('comments') - 0.1, 0.35);
        f2Pop(tl, $('#clB2'), K('comments') + 0.0, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.1, 0.35);
      },
    },
  });
}
