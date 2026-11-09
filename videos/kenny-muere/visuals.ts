// =====================================================================
//  Custom visuals for "Mataron a Kenny de verdad" (flat 2D, HyperFrames).
//  A kid in an orange parka with the hood closed, in our own flat style (evokes the character without copying the show's
//  design). Comic deaths as icons only (anvil, flames, rat): no gore. Shared props come from styles/flat2d/library.ts.
// =====================================================================
{
  const O = '#ff8a2a', OD = '#e06d14', FUR = '#7c4a25', SKIN = '#f2c29b';
  // the parka kid: origin at the feet, ~460 units tall
  const parka = (id: string, x: number, y: number, s = 1, extra = '') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="8" rx="120" ry="14" fill="#000" opacity="0.18"/>
      <ellipse cx="-42" cy="-8" rx="42" ry="18" fill="#3b2a24"/><ellipse cx="42" cy="-8" rx="42" ry="18" fill="#3b2a24"/>
      <rect x="-104" y="-240" width="208" height="236" rx="74" fill="${O}"/><path d="M10 -240 L30 -240 Q104 -240 104 -166 L104 -78 Q104 -4 30 -4 L10 -4Z" fill="${OD}"/>
      <circle cx="-112" cy="-96" r="32" fill="${FUR}"/><circle cx="112" cy="-96" r="32" fill="${FUR}"/>
      <circle cx="0" cy="-330" r="144" fill="${O}"/><path d="M40 -468 A144 144 0 0 1 40 -192 A150 150 0 0 0 40 -468Z" fill="${OD}"/>
      <ellipse cx="0" cy="-316" rx="96" ry="84" fill="${FUR}"/><ellipse cx="0" cy="-316" rx="78" ry="66" fill="${SKIN}"/>
      <ellipse cx="-28" cy="-322" rx="20" ry="25" fill="#fff"/><ellipse cx="28" cy="-322" rx="20" ry="25" fill="#fff"/>
      <circle cx="-24" cy="-318" r="9" fill="#111"/><circle cx="24" cy="-318" r="9" fill="#111"/>
      <path d="M-14 -232 L-26 -190 M14 -232 L26 -190" stroke="${FUR}" stroke-width="8" stroke-linecap="round"/><circle cx="0" cy="-234" r="11" fill="${FUR}"/>
      ${extra}</g></g>`;
  const heart = (c: string) => `<path d="M0 34 C-70 -8 -46 -66 0 -30 C46 -66 70 -8 0 34Z" fill="${c}"/>`;
  const anvil = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-120 -60 L90 -60 Q130 -60 140 -30 L60 -20 L50 20 L80 60 L-80 60 L-50 20 L-60 -20 L-120 -30Z" fill="#555b6e"/><path d="M-120 -60 L90 -60 Q130 -60 140 -30 L-120 -30Z" fill="#8d99ae"/></g></g>`;
  const flame = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <g class="fl"><path d="M0 70 Q-90 60 -70 -10 Q-50 -60 -20 -110 Q-10 -50 20 -60 Q10 -100 40 -140 Q100 -60 80 10 Q70 70 0 70Z" fill="${F2.red}"/>
      <path d="M0 70 Q-50 60 -40 10 Q-30 -20 -10 -50 Q0 -10 20 -20 Q40 10 40 30 Q40 70 0 70Z" fill="${F2.yellow}"/></g></g></g>`;
  const rat = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M90 20 Q160 30 170 -30" stroke="#e8a0a0" stroke-width="10" fill="none" stroke-linecap="round"/>
      <ellipse cx="10" cy="0" rx="100" ry="60" fill="#8d99ae"/><ellipse cx="-80" cy="-10" rx="56" ry="46" fill="#8d99ae"/>
      <circle cx="-70" cy="-60" r="26" fill="#a9b4c8"/><circle cx="-70" cy="-60" r="14" fill="#e8a0a0"/>
      <circle cx="-120" cy="-8" r="10" fill="#e8a0a0"/><circle cx="-90" cy="-20" r="8" fill="#111"/>
      <rect x="-40" y="50" width="20" height="24" rx="8" fill="#6c7891"/><rect x="40" y="50" width="20" height="24" rx="8" fill="#6c7891"/></g></g>`;
  const burst = (id: string, x: number, y: number, r: number, c: string = F2.yellow) => `<g id="${id}">${[...Array(10)].map((_, i) => {
      const a = i / 10 * Math.PI * 2;
      return `<rect x="${x + Math.cos(a) * r - 8}" y="${y + Math.sin(a) * r - 26}" width="16" height="52" rx="8" fill="${c}" transform="rotate(${a * 180 / Math.PI + 90} ${x + Math.cos(a) * r} ${y + Math.sin(a) * r})"/>`;
    }).join('')}</g>`;

  defineVisuals({
    hook: {
      bg: F2.night,
      html: () => svg(`${f2Stars()}
        <rect x="-20" y="1400" width="1120" height="600" fill="#24324f"/>
        ${f2Grave('hGrave', 760, 1310, 1.3, '∞')}
        ${parka('hKid', 360, 1430, 1.2)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#hKid'), { y: 900, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.4)' }, K('kid') - 0.35);
        tl.fromTo($('#hGrave'), { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'bounce.out' }, K('forever') - 0.25);
        tl.to($('#hKid'), { rotation: -4, transformOrigin: '50% 100%', duration: 0.12, yoyo: true, repeat: 3 }, K('forever') + 0.1);
      },
    },
    tally: {
      bg: '#2a1f5c',
      html: () => svg(`${f2Stars(16)}
        <rect x="120" y="700" width="840" height="470" rx="26" fill="#a0673a"/><rect x="146" y="726" width="788" height="418" rx="14" fill="#2d4a3e"/>
        ${[...Array(5)].map((_, g) => { const gx = 200 + g * 150; return [...Array(4)].map((__, i) => `<rect class="mk" x="${gx + i * 26}" y="790" width="12" height="130" rx="6" fill="#fff"/>`).join('')
          + `<rect class="mk" x="${gx - 14}" y="848" width="128" height="12" rx="6" fill="#fff" transform="rotate(-24 ${gx + 50} 854)"/>`; }).join('')}
        ${[...Array(5)].map((_, g) => { const gx = 200 + g * 150; return [...Array(4)].map((__, i) => `<rect class="mk2" x="${gx + i * 26}" y="980" width="12" height="130" rx="6" fill="#fff"/>`).join(''); }).join('')}
        ${[0, 1, 2, 3, 4].map((i) => f2Grave(`tG${i}`, 180 + i * 180, 1330, 0.75)).join('')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('.mk'), { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: 0.07, stagger: 0.06 }, K('count') - 0.4);
        tl.fromTo($('.mk2'), { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: 0.07, stagger: 0.06 }, K('count') + 1.1);
        [0, 1, 2, 3, 4].forEach((i) => tl.fromTo($(`#tG${i}`), { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'bounce.out' }, s.t0 + 0.15 + i * 0.35));
      },
    },
    deaths: {
      bg: F2.night,
      html: () => svg(`${f2Stars(16)}
        <rect x="-20" y="1400" width="1120" height="600" fill="#24324f"/>
        ${anvil('dAnvil', 220, 820, 0.95)}${flame('dFire', 505, 820, 1.0)}${rat('dRat', 790, 830, 0.85)}
        ${burst('dBurst', 505, 1220, 230)}
        ${parka('dKid', 505, 1430, 0.95)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#dAnvil'), { y: -700, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.in' }, K('anvil') - 0.3);
        f2Pop(tl, $('#dFire'), K('fire') - 0.1, 0.4);
        tl.to($('#dFire .fl'), { scaleY: 1.12, transformOrigin: '50% 100%', duration: 0.18, yoyo: true, repeat: f2Reps(s.t1 - K('fire'), 0.18), ease: 'sine.inOut' }, K('fire') + 0.3);
        tl.fromTo($('#dRat'), { x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, K('rats') - 0.2);
        tl.fromTo($('#dKid'), { y: 700, scaleY: 0.6, opacity: 0, transformOrigin: '50% 100%' }, { y: 0, scaleY: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, K('back') - 0.2);
        tl.fromTo($('#dBurst rect'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.015 }, K('back') + 0.1);
        tl.to($('#dBurst'), { rotation: 25, svgOrigin: '505 1220', duration: s.t1 - K('back'), ease: 'none' }, K('back') + 0.1);
      },
    },
    phrase: {
      bg: '#4b3a9a',
      html: () => svg(`${f2Stars(16)}
        <g id="pBub"><g transform="translate(505 920)"><rect x="-390" y="-170" width="780" height="320" rx="80" fill="#000" opacity="0.2" transform="translate(10 14)"/>
          <rect x="-390" y="-170" width="780" height="320" rx="80" fill="#fff"/><path d="M-120 140 L-200 260 L-20 150Z" fill="#fff"/>
          ${f2Txt(0, -30, 104, F2.red, '¡DIOS MÍO!')}${f2Txt(0, 70, 56, F2.night, '¡MATARON A KENNY!')}</g></g>
        <g id="pBadge"><g transform="translate(720 1270)"><circle r="120" fill="${F2.yellow}"/><circle r="96" fill="#e0a21f"/>${f2Txt(0, 34, 100, '#fff', '#1')}
          <rect x="-150" y="96" width="300" height="56" rx="16" fill="${F2.red}"/>${f2Txt(0, 136, 30, '#fff', 'LA MÁS FAMOSA')}</g></g>
        ${burst('pBurst', 720, 1270, 190)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#pBub'), { scale: 0, rotation: -8, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2.2)' }, K('shout') - 0.1);
        tl.to($('#pBub'), { x: 6, duration: 0.05, yoyo: true, repeat: 7 }, K('shout') + 0.3);
        f2Pop(tl, $('#pBadge'), K('famous') - 0.15, 0.4);
        tl.fromTo($('#pBurst rect'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.015 }, K('famous'));
        tl.to($('#pBurst'), { rotation: 30, svgOrigin: '720 1270', duration: s.t1 - K('famous'), ease: 'none' }, K('famous'));
      },
    },
    bored: {
      bg: F2.night,
      html: () => svg(`${f2Stars(16)}
        <g id="bPage"><g transform="translate(290 1060) rotate(-6)"><rect x="-150" y="-200" width="300" height="400" rx="16" fill="#000" opacity="0.2" transform="translate(10 12)"/>
          <rect x="-150" y="-200" width="300" height="400" rx="16" fill="#fff8ea"/>${f2Txt(0, -130, 48, F2.night, 'GUION')}
          ${[0, 1, 2, 3, 4].map((i) => `<rect x="-100" y="${-80 + i * 50}" width="${200 - (i % 2) * 60}" height="18" rx="9" fill="${F2.gray}"/>`).join('')}</g></g>
        ${[0, 1, 2].map((i) => `<g class="z"><g transform="translate(${360 + i * 50} ${830 - i * 60})">${f2Txt(0, 0, 60 + i * 16, '#fff', 'Z', F2OUTLINE)}</g></g>`).join('')}
        ${f2Tv('bTv', 700, 1100, 0.78, `${f2Static()}<g class="word" opacity="0">${f2Txt(-32, 0, 66, F2.yellow, 'KENNY DIES')}</g>`)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#bPage'), { y: 700 }, { y: 0, duration: 0.45, ease: 'back.out(1.4)' }, s.t0 + 0.1);
        tl.fromTo($('.z'), { opacity: 0, y: 30 }, { opacity: 1, y: -30, duration: 0.6, stagger: { each: 0.2, repeat: f2Reps(s.t1 - K('zzz'), 0.6) }, ease: 'sine.out' }, K('zzz') - 0.1);
        f2Pop(tl, $('#bTv'), K('tv') - 0.6, 0.4);
        tl.fromTo($('#bTv .static'), { opacity: 1 }, { opacity: 0, duration: 0.3 }, K('tv'));
        tl.fromTo($('#bTv .word'), { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, K('tv') + 0.15);
      },
    },
    dies: {
      bg: '#1f3566',
      html: () => svg(`${f2Stars(16)}
        <rect x="-20" y="1400" width="1120" height="600" fill="#24324f"/>
        ${f2Grave('dGrave', 320, 1310, 1.4)}
        ${parka('dsKid', 320, 1430, 1.0, `<g class="thermo"><rect x="30" y="-290" width="110" height="18" rx="9" fill="#fff" transform="rotate(-15 30 -281)"/><circle cx="138" cy="-318" r="14" fill="${F2.red}"/></g>`)}
        ${f2Calendar('dCal', 750, 1000, 0.95, 'AÑO', '1')}
        ${[0, 1, 2].map((i) => `<g class="pg"><rect x="${640 + i * 10}" y="${850 + i * 6}" width="200" height="240" rx="16" fill="#fff" opacity="0.9"/></g>`).join('')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#dsKid'), { y: 700 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)' }, s.t0 + 0.05);
        f2Pop(tl, $('#dsKid .thermo'), K('sick') - 0.15, 0.35);
        tl.to($('#dsKid'), { rotation: -3, transformOrigin: '50% 100%', duration: 0.15, yoyo: true, repeat: 1 }, K('sick') + 0.2);
        tl.to($('#dsKid'), { opacity: 0, y: -40, duration: 0.35 }, K('grave') - 0.2);
        tl.fromTo($('#dGrave'), { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'bounce.out' }, K('grave') - 0.1);
        f2Pop(tl, $('#dCal'), K('year') - 0.4, 0.4);
        tl.set($('.pg'), { opacity: 0 }, s.t0);
        tl.fromTo($('.pg'), { x: 0, y: 0, rotation: 0, opacity: 1 }, { x: 420, y: -320, rotation: 50, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.in', immediateRender: false }, K('year'));
      },
    },
    return: {
      bg: '#2a1f5c',
      html: () => svg(`${f2Stars(16)}
        <rect x="-20" y="1400" width="1120" height="600" fill="#3a2c7a"/>
        ${f2Grave('rGrave', 300, 1310, 1.4)}
        <g id="rT6"><g transform="translate(780 800)"><rect x="-110" y="-60" width="220" height="120" rx="30" fill="${F2.yellow}"/>${f2Txt(0, 28, 76, F2.night, 'T6')}</g></g>
        ${parka('rKid', 720, 1430, 1.0)}
        ${[[560, 980, -14], [900, 1000, 12], [880, 1260, 8]].map(([x, y, r]) => `<g class="q"><g transform="translate(${x} ${y}) rotate(${r})">${f2Txt(0, 0, 100, F2.yellow, '?', F2OUTLINE)}</g></g>`).join('')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#rGrave'), { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.3)' }, s.t0 + 0.05);
        f2Pop(tl, $('#rT6'), K('season') - 0.15, 0.4);
        tl.fromTo($('#rKid'), { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, K('back') - 0.3);
        tl.fromTo($('.q'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2.5)', stagger: 0.07 }, K('back') + 0.1);
        tl.to($('.q'), { y: -12, duration: 0.4, yoyo: true, repeat: f2Reps(s.t1 - K('back') - 0.5, 0.4), ease: 'sine.inOut' }, K('back') + 0.5);
      },
    },
    closing: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Cloud('clC1', 170, 1420, 1.0)}${f2Cloud('clC2', 870, 1440, 0.85)}
        <g id="clHearts">${[...Array(6)].map((_, i) => { const a = i / 6 * Math.PI * 2; return `<g transform="translate(${505 + Math.cos(a) * 300} ${1080 + Math.sin(a) * 250}) scale(1.1)">${heart(F2.red)}</g>`; }).join('')}</g>
        ${parka('clKid', 505, 1380, 1.05)}
        <g id="clInf">${f2Txt(505, 770, 200, F2.red, '∞', F2OUTLINE)}</g>
        ${f2Bubble('clB1', 190, 1250, 0.65, F2.green)}${f2Bubble('clB2', 830, 1230, 0.65, F2.yellow)}${f2Bubble('clB3', 190, 860, 0.6, F2.pink)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#clKid'), { y: 700 }, { y: 0, duration: 0.45, ease: 'back.out(1.4)' }, s.t0 + 0.05);
        tl.fromTo($('#clC1'), { x: -40 }, { x: 40, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clC2'), { x: 30 }, { x: -30, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clHearts'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.45, ease: 'back.out(1.6)' }, K('lives') - 0.2);
        tl.to($('#clHearts'), { rotation: 120, svgOrigin: '505 1080', duration: s.t1 - K('lives'), ease: 'none' }, K('lives') - 0.2);
        f2Pop(tl, $('#clInf'), K('lives'), 0.4);
        f2Pop(tl, $('#clB1'), K('comments') - 0.1, 0.35);
        f2Pop(tl, $('#clB2'), K('comments') + 0.0, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.1, 0.35);
      },
    },
  });
}
