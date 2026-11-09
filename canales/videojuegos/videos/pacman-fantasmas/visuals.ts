// =====================================================================
//  Custom visuals for "Los fantasmas de Pac-Man no te persiguen igual" (flat 2D, HyperFrames). Canal: videojuegos.
//  Original art only: generic cartoon sheet ghosts (red, pink, light blue, orange) and a generic yellow round player
//  with eyes (NOT the game's characters), a generic neon maze. Names appear only as text.
//  Helpers live inside this block (shared type-check scope).
// =====================================================================
{
  const BG = '#1a1033', BG2 = '#24164a', CYAN = '#00e5ff', MAG = '#ff3df2';
  const RED = '#ff4d5e', PNK = '#ff8ad8', BLU = '#5fe3ff', ORG = '#ffa53d';
  // a cartoon sheet ghost: origin at its center, ~130 x 150 at s = 1
  const ghost = (id: string, x: number, y: number, s: number, c: string) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="84" rx="56" ry="10" fill="#000" opacity="0.25"/>
      <path d="M-62 60 L-62 -8 Q-62 -76 0 -76 Q62 -76 62 -8 L62 60 Q48 46 31 64 Q16 46 0 64 Q-16 46 -31 64 Q-48 46 -62 60Z" fill="${c}"/>
      <path d="M20 -72 Q62 -60 62 -8 L62 60 Q48 46 31 64 L31 -40 Q31 -66 20 -72Z" fill="#000" opacity="0.1"/>
      <ellipse cx="-22" cy="-14" rx="16" ry="20" fill="#fff"/><ellipse cx="22" cy="-14" rx="16" ry="20" fill="#fff"/>
      <g class="pu"><circle cx="-19" cy="-10" r="8" fill="${F2.night}"/><circle cx="25" cy="-10" r="8" fill="${F2.night}"/></g>
      <circle cx="-38" cy="14" r="8" fill="#fff" opacity="0.35"/><circle cx="38" cy="14" r="8" fill="#fff" opacity="0.35"/></g></g>`;
  // the player: a yellow ball with eyes (NOT the game's character)
  const hero = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="62" rx="46" ry="9" fill="#000" opacity="0.25"/><circle r="56" fill="${F2.yellow}"/><path d="M18 -52 A56 56 0 0 1 18 52 A70 70 0 0 0 18 -52Z" fill="#e0a21f" opacity="0.6"/>
      <g class="eyes"><ellipse cx="-18" cy="-12" rx="9" ry="12" fill="${F2.night}"/><ellipse cx="18" cy="-12" rx="9" ry="12" fill="${F2.night}"/></g>
      <path d="M-20 16 Q0 32 20 16" stroke="${F2.night}" stroke-width="6" fill="none" stroke-linecap="round"/></g></g>`;
  // a generic neon maze filling the art area
  const maze = () => `<rect x="100" y="690" width="840" height="620" rx="34" fill="#0b0620"/><rect x="100" y="690" width="840" height="620" rx="34" fill="none" stroke="${CYAN}" stroke-width="8" opacity="0.8"/>
      ${[[230, 900, 160, 40], [690, 900, 160, 40], [460, 790, 120, 40], [460, 1190, 120, 40], [230, 1100, 40, 120], [770, 1100, 40, 120]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="none" stroke="${CYAN}" stroke-width="7" opacity="0.5"/>`).join('')}
      ${[...Array(9)].map((_, i) => `<circle cx="${180 + i * 85}" cy="1265" r="7" fill="#ffe7b0" opacity="0.6"/>`).join('')}${[...Array(9)].map((_, i) => `<circle cx="${180 + i * 85}" cy="740" r="7" fill="#ffe7b0" opacity="0.6"/>`).join('')}`;
  const target = (id: string, x: number, y: number, c: string) => `<g id="${id}"><g transform="translate(${x} ${y})"><circle r="50" fill="none" stroke="${c}" stroke-width="10"/><circle r="12" fill="${c}"/>
      <rect x="-70" y="-5" width="30" height="10" fill="${c}"/><rect x="40" y="-5" width="30" height="10" fill="${c}"/><rect x="-5" y="-70" width="10" height="30" fill="${c}"/><rect x="-5" y="40" width="10" height="30" fill="${c}"/></g></g>`;
  const dash = (id: string, x1: number, y1: number, x2: number, y2: number, c: string) => `<line id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="10" stroke-dasharray="22 16" stroke-linecap="round"/>`;
  const card = (id: string, x: number, y: number, c: string, icon: string, name: string) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="-170" y="-80" width="340" height="160" rx="26" fill="#000" opacity="0.3" transform="translate(6 8)"/><rect x="-170" y="-80" width="340" height="160" rx="26" fill="#fff"/>
      ${ghost(`${id}g`, -100, -6, 0.7, c)}<g transform="translate(40 -20)">${icon}</g>${f2Txt(52, 58, 27, F2.night, name)}</g></g>`;
  const cross = (id: string, x: number, y: number, r: number) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="${-r}" y="-14" width="${2 * r}" height="28" rx="14" fill="${F2.red}" transform="rotate(45)"/><rect x="${-r}" y="-14" width="${2 * r}" height="28" rx="14" fill="${F2.red}" transform="rotate(-45)"/></g></g>`;
  const drop = (id: string, x: number, y: number) => `<g id="${id}"><path d="M${x} ${y - 30} Q${x + 22} ${y} ${x} ${y + 14} Q${x - 22} ${y} ${x} ${y - 30}Z" fill="${F2.sky}"/></g>`;
  const bang = (id: string, x: number, y: number, c = F2.yellow) => `<g id="${id}"><g transform="translate(${x} ${y})">${f2Txt(0, 0, 110, c, '!', F2OUTLINE)}</g></g>`;

  defineVisuals({
    hook: {
      bg: BG,
      html: () => svg(`${maze()}
        ${hero('hHero', 505, 1180, 0.9)}
        ${ghost('hR', 230, 820, 0.9, RED)}${ghost('hP', 410, 820, 0.9, PNK)}${ghost('hB', 600, 820, 0.9, BLU)}${ghost('hO', 790, 820, 0.9, ORG)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#hHero'), s.t0 + 0.05, 0.35);
        tl.fromTo($('#hR, #hP, #hB, #hO'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2.5)', stagger: 0.1 }, K('ghosts') - 0.1);
        tl.to($('#hR'), { x: 200, y: 260, duration: 0.5, ease: 'power2.inOut' }, K('chase') - 0.2);
        tl.to($('#hP'), { x: 380, y: 140, duration: 0.5, ease: 'power2.inOut' }, K('chase') - 0.1);
        tl.to($('#hB'), { x: 140, y: 320, duration: 0.5, ease: 'power2.inOut' }, K('chase'));
        tl.to($('#hO'), { x: 40, y: -40, duration: 0.5, ease: 'power2.inOut' }, K('chase') + 0.1);
      },
    },
    creator: {
      bg: BG2,
      html: () => svg(`
        ${f2Person('cDes', 200, 1060, 0.95)}
        <g id="cPencil"><g transform="translate(290 1080) rotate(-35)"><rect x="-10" y="-90" width="20" height="120" fill="${F2.yellow}"/><path d="M-10 30 L10 30 L0 54Z" fill="#f2c29b"/></g></g>
        ${card('cC1', 670, 760, RED, `<rect x="-20" y="-14" width="70" height="20" rx="10" fill="${RED}"/><path d="M50 -28 L84 -4 L50 20Z" fill="${RED}"/>`, 'DIRECTO')}
        ${card('cC2', 670, 940, PNK, `<g transform="translate(30 -4)"><circle r="26" fill="none" stroke="${PNK}" stroke-width="8"/><circle r="7" fill="${PNK}"/></g>`, 'EMBOSCADA')}
        ${card('cC3', 670, 1120, BLU, `<g transform="translate(30 -4)"><path d="M-30 20 L0 -30 L30 20" stroke="${BLU}" stroke-width="8" fill="none" stroke-dasharray="10 6"/></g>`, 'CALCULA')}
        ${card('cC4', 670, 1300, ORG, `<path d="M-10 0 L10 -20 L30 0 L50 -20 L70 0" stroke="${ORG}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, 'TÍMIDO')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#cDes'), { x: -400 }, { x: 0, duration: 0.4, ease: 'back.out(1.4)' }, K('creator') - 0.35);
        f2Pop(tl, $('#cPencil'), K('creator') + 0.1, 0.3);
        tl.to($('#cPencil'), { rotation: 10, transformOrigin: '50% 100%', duration: 0.15, yoyo: true, repeat: f2Reps(K('each') - K('creator') - 0.5, 0.15) | 1, ease: 'sine.inOut' }, K('creator') + 0.4);
        tl.fromTo($('#cC1, #cC2, #cC3, #cC4'), { x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.6)', stagger: 0.15 }, K('each') - 0.15);
      },
    },
    blinky: {
      bg: BG,
      html: () => svg(`${maze()}
        ${f2Arrow('bArr', 320, 900, 690, 1110, RED, 16)}
        ${hero('bHero', 760, 1150, 0.9)}
        ${ghost('bG', 250, 850, 1.0, RED)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#bHero'), s.t0 + 0.05, 0.3);
        f2Pop(tl, $('#bG'), K('red') + 0.05, 0.35);
        tl.fromTo($('#bArr'), { scale: 0, transformOrigin: '0% 0%' }, { scale: 1, duration: 0.35, ease: 'power2.out' }, K('direct') - 0.3);
        tl.to($('#bG .pu'), { x: 6, y: 5, duration: 0.15 }, K('direct') - 0.3);
        tl.to($('#bG'), { x: 330, y: 190, duration: s.t1 - K('direct'), ease: 'power1.in' }, K('direct'));
      },
    },
    pinky: {
      bg: BG,
      html: () => svg(`${maze()}
        ${[0, 1, 2, 3].map((i) => `<g class="tile"><rect x="${372 + i * 82}" y="1112" width="74" height="74" rx="12" fill="${PNK}" opacity="0.35"/>${f2Txt(409 + i * 82, 1166, 40, '#fff', String(i + 1))}</g>`).join('')}
        ${target('pT', 700, 1150, PNK)}
        ${hero('pHero', 240, 1150, 0.85)}
        ${ghost('pG', 700, 800, 1.0, PNK)}
        ${bang('pBang', 240, 1030)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#pHero'), s.t0 + 0.05, 0.3);
        f2Pop(tl, $('#pG'), K('pink') + 0.05, 0.35);
        tl.fromTo($('.tile'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.2, ease: 'back.out(2)', stagger: 0.1 }, K('four') - 0.1);
        f2Pop(tl, $('#pT'), K('four') + 0.4, 0.3);
        tl.to($('#pHero'), { x: 60, duration: K('ambush') - s.t0 - 0.3, ease: 'none' }, s.t0 + 0.3);
        tl.to($('#pG .pu'), { y: 6, duration: 0.15 }, K('four') + 0.6);
        tl.to($('#pG'), { y: 340, duration: 0.45, ease: 'power2.inOut' }, K('ambush') - 0.4);
        f2Pop(tl, $('#pBang'), K('ambush') + 0.05, 0.3);
      },
    },
    inky: {
      bg: BG,
      html: () => svg(`${maze()}
        ${dash('iL1', 380, 1200, 640, 1100, '#c9d3ea')}${dash('iL2', 640, 1100, 880, 990, BLU)}
        ${target('iT', 880, 990, BLU)}<circle id="iP" cx="640" cy="1100" r="14" fill="#fff"/>
        ${hero('iHero', 540, 1140, 0.8)}
        ${ghost('iR', 380, 1200, 0.85, RED)}
        ${ghost('iG', 820, 790, 1.0, BLU)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#iHero, #iR'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.1 }, s.t0 + 0.05);
        f2Pop(tl, $('#iG'), K('blue') + 0.1, 0.35);
        f2Pop(tl, $('#iP'), K('calc') - 0.15, 0.25);
        tl.fromTo($('#iL1'), { scale: 0, transformOrigin: '0% 100%' }, { scale: 1, duration: 0.35, ease: 'power2.out' }, K('calc'));
        tl.fromTo($('#iL2'), { scale: 0, transformOrigin: '0% 100%' }, { scale: 1, duration: 0.35, ease: 'power2.out' }, K('calc') + 0.4);
        f2Pop(tl, $('#iT'), K('calc') + 0.8, 0.3);
        tl.to($('#iG'), { x: 60, y: 200, duration: 0.45, ease: 'power2.inOut' }, K('blinky') - 0.3);
      },
    },
    clyde: {
      bg: BG,
      html: () => svg(`${maze()}
        <g id="cHome"><rect x="130" y="1150" width="150" height="130" rx="20" fill="${ORG}" opacity="0.25"/>${f2Txt(205, 1135, 34, ORG, 'ESQUINA')}</g>
        ${hero('cHero', 720, 1010, 0.9)}
        ${ghost('cG', 230, 800, 1.0, ORG)}
        ${drop('cDrop', 616, 840)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#cHero'), s.t0 + 0.05, 0.3);
        f2Pop(tl, $('#cG'), K('orange') - 0.1, 0.35);
        f2Pop(tl, $('#cHome'), K('orange') + 0.3, 0.3);
        tl.to($('#cG'), { x: 300, y: 130, duration: K('near') - K('chase') + 0.2, ease: 'power1.inOut' }, K('chase') - 0.2);
        tl.fromTo($('#cDrop'), { opacity: 0, y: -10 }, { opacity: 1, y: 10, duration: 0.3 }, K('near') + 0.05);
        tl.to($('#cG'), { rotation: -8, transformOrigin: '50% 50%', duration: 0.08, yoyo: true, repeat: 3 }, K('near'));
        tl.to($('#cDrop'), { opacity: 0, duration: 0.15 }, K('back') - 0.1);
        tl.to($('#cG'), { x: -25, y: 410, duration: 0.5, ease: 'power3.out' }, K('back'));
      },
    },
    scatter: {
      bg: BG2,
      html: () => svg(`${maze()}
        ${hero('sHero', 505, 1000, 1.1)}
        ${ghost('sR', 450, 1150, 0.85, RED)}${ghost('sP', 560, 1150, 0.85, PNK)}${ghost('sB', 400, 860, 0.85, BLU)}${ghost('sO', 610, 860, 0.85, ORG)}
        <g id="sAhh"><g transform="translate(700 870)">${f2Txt(0, 0, 60, '#fff', 'AHHH', F2OUTLINE)}</g></g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#sHero'), s.t0 + 0.05, 0.35);
        tl.fromTo($('#sR, #sP, #sB, #sO'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.08 }, s.t0 + 0.2);
        tl.to($('#sR, #sP, #sB, #sO'), { x: 6, duration: 0.08, yoyo: true, repeat: f2Reps(K('corners') - s.t0 - 1.0, 0.08) | 1 }, s.t0 + 0.6);
        tl.to($('#sR'), { x: 380, y: 140, duration: 0.45, ease: 'power3.out' }, K('corners') - 0.25);
        tl.to($('#sP'), { x: -380, y: -380, duration: 0.45, ease: 'power3.out' }, K('corners') - 0.2);
        tl.to($('#sB'), { x: 440, y: -100, duration: 0.45, ease: 'power3.out' }, K('corners') - 0.15);
        tl.to($('#sO'), { x: -440, y: 380, duration: 0.45, ease: 'power3.out' }, K('corners') - 0.1);
        tl.to($('#sHero'), { scale: 1.12, transformOrigin: '50% 50%', duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' }, K('breathe') - 0.3);
        f2Pop(tl, $('#sAhh'), K('breathe') - 0.2, 0.3);
      },
    },
    closing: {
      bg: BG2,
      html: () => svg(`${f2Stars(14)}
        <g id="clClover"><g transform="translate(200 790)">${[0, 90, 180, 270].map((r) => `<circle cx="0" cy="-36" r="34" fill="${F2.green}" transform="rotate(${r})"/>`).join('')}<rect x="-6" y="20" width="12" height="70" rx="6" fill="${F2.greenD}" transform="rotate(20)"/></g></g>
        ${cross('clX', 200, 790, 90)}
        ${hero('clHero', 505, 1050, 1.1)}
        ${ghost('clR', 260, 870, 0.95, RED)}${ghost('clP', 750, 870, 0.95, PNK)}${ghost('clB', 260, 1230, 0.95, BLU)}${ghost('clO', 750, 1230, 0.95, ORG)}
        <g id="clQ"><g transform="translate(505 840)">${f2Txt(0, 0, 120, F2.yellow, '?', F2OUTLINE)}</g></g>
        ${f2Bubble('clB1', 220, 1390, 0.6, CYAN)}${f2Bubble('clB2', 505, 1410, 0.6, F2.yellow)}${f2Bubble('clB3', 790, 1390, 0.6, MAG)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#clHero'), s.t0 + 0.05, 0.35);
        f2Pop(tl, $('#clClover'), s.t0 + 0.3, 0.35);
        tl.fromTo($('#clX'), { scale: 0, rotation: -30, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(2)' }, K('luck') - 0.1);
        tl.fromTo($('#clR, #clP, #clB, #clO'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.06 }, K('team') - 0.6);
        tl.to($('#clR'), { x: 70, y: 50, duration: 0.3, ease: 'power2.in' }, K('team') - 0.1);
        tl.to($('#clP'), { x: -70, y: 50, duration: 0.3, ease: 'power2.in' }, K('team') - 0.1);
        tl.to($('#clB'), { x: 70, y: -50, duration: 0.3, ease: 'power2.in' }, K('team') - 0.1);
        tl.to($('#clO'), { x: -70, y: -50, duration: 0.3, ease: 'power2.in' }, K('team') - 0.1);
        tl.to($('#clHero'), { x: 6, duration: 0.05, yoyo: true, repeat: 5 }, K('team') + 0.2);
        f2Pop(tl, $('#clQ'), K('question') - 0.1, 0.35);
        f2Pop(tl, $('#clB1'), K('comments') - 0.15, 0.35);
        f2Pop(tl, $('#clB2'), K('comments') - 0.05, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.05, 0.35);
      },
    },
  });
}
