// =====================================================================
//  Custom visuals for "El Creeper nació de un error" (flat 2D, HyperFrames). Canal: videojuegos.
//  Original block art only: a generic green block creature with cartoon eyes and a generic block pig (NOT the
//  game's designs), error windows, code, a pixel explosion. The game's names appear only as text.
//  Helpers live inside this block (shared type-check scope).
// =====================================================================
{
  const BG = '#1a1033', BG2 = '#24164a', CYAN = '#00e5ff', MAG = '#ff3df2', LIME = '#39d97a', LIMED = '#23a85a', PINK = '#ff9bb5', PINKD = '#e2708f';
  const grid = () => [...Array(12)].map((_, i) => `<rect x="${(i * 173) % 1000 + 40}" y="${700 + ((i * 281) % 700)}" width="26" height="26" fill="#fff" opacity="0.06"/>`).join('');
  // a generic block creature: origin at the feet, ~470 tall at s = 1 (cartoon round eyes, NOT the game's face)
  const mob = (id: string, x: number, y: number, s: number, c: string, cd: string) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="6" rx="120" ry="14" fill="#000" opacity="0.25"/>
      <rect x="-78" y="-70" width="58" height="70" fill="${cd}"/><rect x="20" y="-70" width="58" height="70" fill="${cd}"/>
      <rect x="-62" y="-300" width="124" height="240" fill="${c}"/><rect x="10" y="-300" width="52" height="240" fill="${cd}" opacity="0.5"/>
      <rect x="-88" y="-470" width="176" height="176" fill="${c}"/><rect x="20" y="-470" width="68" height="176" fill="${cd}" opacity="0.5"/>
      <circle cx="-36" cy="-392" r="26" fill="#fff"/><circle cx="36" cy="-392" r="26" fill="#fff"/><circle cx="-30" cy="-388" r="12" fill="${F2.night}"/><circle cx="42" cy="-388" r="12" fill="${F2.night}"/>
      <ellipse cx="0" cy="-334" rx="16" ry="12" fill="${F2.night}"/></g></g>`;
  // a generic block pig: origin at the feet, facing left, ~250 tall x 400 long at s = 1
  const pig = (id: string, x: number, y: number, s: number) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><g class="pb">
      <ellipse cx="0" cy="6" rx="170" ry="14" fill="#000" opacity="0.25"/>
      ${[-120, -60, 60, 120].map((lx) => `<rect x="${lx - 22}" y="-64" width="44" height="64" fill="${PINKD}"/>`).join('')}
      <rect x="-150" y="-200" width="300" height="140" fill="${PINK}"/><rect x="40" y="-200" width="110" height="140" fill="${PINKD}" opacity="0.4"/>
      <rect x="-250" y="-250" width="140" height="140" fill="${PINK}"/><rect x="-272" y="-196" width="56" height="44" fill="${PINKD}"/>
      <rect x="-262" y="-184" width="10" height="16" fill="${F2.night}"/><rect x="-238" y="-184" width="10" height="16" fill="${F2.night}"/>
      <circle cx="-200" cy="-212" r="13" fill="#fff"/><circle cx="-204" cy="-210" r="7" fill="${F2.night}"/></g></g></g>`;
  // an error window: origin at its center
  const errWin = (id: string, x: number, y: number, w: number, h: number, t: string, c = F2.red) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="18" fill="#000" opacity="0.3" transform="translate(10 12)"/>
      <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="18" fill="#fff"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="54" rx="18" fill="${c}"/><rect x="${-w / 2}" y="${-h / 2 + 30}" width="${w}" height="24" fill="${c}"/>
      <circle cx="${w / 2 - 34}" cy="${-h / 2 + 27}" r="13" fill="#fff" opacity="0.8"/>
      <g transform="translate(${-w / 2 + 80} ${27})"><path d="M0 -46 L44 32 L-44 32Z" fill="${F2.yellow}"/>${f2Txt(0, 24, 56, F2.night, '!')}</g>
      ${f2Txt(40, 46, Math.min(84, h * 0.34), F2.night, t)}</g></g>`;
  const boom = (id: string, x: number, y: number, r: number) => `<g id="${id}">${[...Array(18)].map((_, i) => {
      const a = i / 18 * Math.PI * 2, d = r * (0.55 + (i % 3) * 0.22), c = [F2.yellow, F2.orange, '#fff', F2.red][i % 4], z = 26 + (i % 3) * 12;
      return `<rect class="px" x="${(x + Math.cos(a) * d - z / 2).toFixed(1)}" y="${(y + Math.sin(a) * d - z / 2).toFixed(1)}" width="${z}" height="${z}" fill="${c}"/>`;
    }).join('')}<circle class="core" cx="${x}" cy="${y}" r="${r * 0.55}" fill="#fff"/></g>`;
  const laptop = (id: string, x: number, y: number, s: number, screen: string) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-250" y="-340" width="500" height="330" rx="22" fill="#2b2d42"/><rect x="-230" y="-320" width="460" height="290" rx="10" fill="#0b1226"/>${screen}
      <path d="M-290 -10 L290 -10 L320 30 L-320 30Z" fill="#8d99ae"/></g></g>`;
  const crown = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-80 30 L-90 -50 L-40 -10 L0 -70 L40 -10 L90 -50 L80 30Z" fill="${F2.yellow}"/><rect x="-80" y="20" width="160" height="26" fill="#e0a21f"/>
      <circle cx="0" cy="0" r="12" fill="${F2.red}"/></g></g>`;
  const pill = (id: string, x: number, y: number, t: string, bg: string, fg: string, w = 300) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="${-w / 2}" y="-50" width="${w}" height="100" rx="50" fill="#000" opacity="0.3" transform="translate(6 8)"/><rect x="${-w / 2}" y="-50" width="${w}" height="100" rx="50" fill="${bg}"/>${f2Txt(0, 22, 60, fg, t)}</g></g>`;
  const cross = (id: string, x: number, y: number, r: number) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="${-r}" y="-16" width="${2 * r}" height="32" rx="16" fill="${F2.red}" transform="rotate(45)"/><rect x="${-r}" y="-16" width="${2 * r}" height="32" rx="16" fill="${F2.red}" transform="rotate(-45)"/></g></g>`;
  const star = (id: string, x: number, y: number, r: number, c = F2.yellow) => {
    let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += `${i ? 'L' : 'M'}${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)} `; }
    return `<g id="${id}"><g transform="translate(${x} ${y})"><path d="${d}Z" fill="#000" opacity="0.25" transform="translate(8 10)"/><path d="${d}Z" fill="${c}"/></g></g>`;
  };
  const popBoom = (tl: gsap.core.Timeline, sel: string, t: number) => {
    tl.fromTo(`${sel} .px`, { scale: 0, opacity: 1, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, ease: 'back.out(3)', stagger: 0.01 }, t);
    tl.fromTo(`${sel} .core`, { scale: 0, opacity: 1, transformOrigin: '50% 50%' }, { scale: 1, opacity: 0, duration: 0.35, ease: 'power2.out' }, t);
    tl.to(`${sel} .px`, { opacity: 0, duration: 0.2 }, t + 0.3);
  };

  defineVisuals({
    hook: {
      bg: BG,
      html: () => svg(`${grid()}
        <rect x="-20" y="1400" width="1120" height="600" fill="${BG2}"/>
        ${mob('hMob', 505, 1410, 1.1, LIME, LIMED)}
        <g id="hQ"><g transform="translate(830 1060) rotate(12)">${f2Txt(0, 0, 150, CYAN, '?', F2OUTLINE)}</g></g>
        ${errWin('hErr', 520, 770, 560, 220, 'ERROR')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#hMob'), { y: 700 }, { y: 0, duration: 0.4, ease: 'back.out(1.5)' }, s.t0 + 0.05);
        f2Pop(tl, $('#hQ'), K('monster') + 0.4, 0.35);
        tl.fromTo($('#hErr'), { scale: 0, rotation: -6, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(2.2)' }, K('error') - 0.1);
        tl.to($('#hErr'), { x: 10, duration: 0.05, yoyo: true, repeat: 5 }, K('error') + 0.25);
      },
    },
    code: {
      bg: BG2,
      html: () => svg(`${grid()}
        <rect x="-20" y="1250" width="1120" height="40" fill="#5a3e8a"/><rect x="-20" y="1290" width="1120" height="700" fill="${BG}"/>
        ${f2Person('cDev', 190, 1040, 0.95)}
        ${laptop('cLap', 600, 1240, 0.95, `
          ${[[300, CYAN], [220, MAG], [340, LIME], [180, F2.yellow], [260, CYAN]].map(([w, c], i) => `<rect class="cl" x="-205" y="${-300 + i * 30}" width="${w}" height="16" rx="8" fill="${c}"/>`).join('')}
          <g id="cPigWrap">${pig('cPig', 30, -45, 0.45)}</g>`)}
        <g id="cBr"><g transform="translate(880 830)">${f2Txt(0, 0, 90, MAG, '{ }', F2OUTLINE)}</g></g>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#cDev'), { x: -400 }, { x: 0, duration: 0.4, ease: 'back.out(1.4)' }, K('dev') - 0.4);
        f2Pop(tl, $('#cLap'), K('dev') - 0.2, 0.4);
        f2Pop(tl, $('#cPigWrap'), K('pig') - 0.15, 0.4);
        tl.fromTo($('.cl'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.18, stagger: 0.12, ease: 'none' }, K('code') - 0.3);
        f2Pop(tl, $('#cBr'), K('code'), 0.35);
        tl.to($('#cBr'), { rotation: 8, transformOrigin: '50% 50%', duration: 0.4, yoyo: true, repeat: f2Reps(s.t1 - K('code') - 0.4, 0.4), ease: 'sine.inOut' }, K('code') + 0.4);
      },
    },
    mistake: {
      bg: BG,
      html: () => svg(`${grid()}
        <rect x="-20" y="1350" width="1120" height="700" fill="${BG2}"/>
        <g id="mLong">${f2Arrow('mL1', 505, 990, 230, 990, CYAN, 14)}${f2Arrow('mL2', 505, 990, 780, 990, CYAN, 14)}${f2Txt(505, 960, 46, CYAN, 'LARGO')}</g>
        ${pig('mPig', 560, 1350, 1.2)}
        <g id="mTall">${f2Arrow('mT1', 740, 1060, 740, 820, MAG, 14)}${f2Arrow('mT2', 740, 1060, 740, 1330, MAG, 14)}${f2Txt(850, 1075, 46, MAG, 'ALTO')}</g>
        ${errWin('mErr', 760, 720, 330, 150, '¡UPS!')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#mPig'), { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)' }, s.t0 + 0.1);
        f2Pop(tl, $('#mLong'), s.t0 + 0.4, 0.35);
        f2Pop(tl, $('#mErr'), K('oops') - 0.15, 0.35);
        tl.to($('#mLong'), { opacity: 0, duration: 0.2 }, K('swap') - 0.2);
        tl.to($('#mPig .pb'), { scaleX: 0.55, scaleY: 1.9, svgOrigin: '0 0', duration: 0.45, ease: 'back.out(1.6)' }, K('swap') - 0.1);
        f2Pop(tl, $('#mTall'), K('swap') + 0.4, 0.35);
        tl.to($('#mPig'), { rotation: 5, svgOrigin: '560 1350', duration: 0.25, yoyo: true, repeat: f2Reps(s.t1 - K('thin'), 0.25), ease: 'sine.inOut' }, K('thin') - 0.1);
      },
    },
    green: {
      bg: BG2,
      html: () => svg(`${grid()}
        <rect x="-20" y="1340" width="1120" height="700" fill="${BG}"/>
        <g id="gCan"><g transform="translate(200 1340)"><path d="M-80 -200 L80 -200 L66 0 L-66 0Z" fill="#8d99ae"/><path d="M-40 -180 L-34 -20 M0 -180 L0 -20 M40 -180 L34 -20" stroke="#6c7891" stroke-width="10"/>
          <g class="lid"><rect x="-96" y="-232" width="192" height="30" rx="12" fill="#6c7891"/><rect x="-26" y="-254" width="52" height="24" rx="10" fill="#6c7891"/></g></g></g>
        ${cross('gX', 200, 1230, 90)}
        ${mob('gPink', 560, 1340, 0.95, PINK, PINKD)}${mob('gMob', 560, 1340, 0.95, LIME, LIMED)}
        ${f2Person('gMe', 860, 1180, 0.7)}
        ${boom('gBoom', 640, 1130, 230)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#gCan'), s.t0 + 0.15, 0.4);
        tl.fromTo($('#gPink'), { y: 600 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)' }, s.t0 + 0.2);
        tl.set($('#gMob'), { opacity: 0 }, s.t0);
        tl.to($('#gCan .lid'), { rotation: -35, svgOrigin: '-96 -217', duration: 0.2 }, K('erase') - 0.4);
        tl.to($('#gCan .lid'), { rotation: 0, svgOrigin: '-96 -217', duration: 0.2 }, K('erase'));
        f2Pop(tl, $('#gX'), K('erase') + 0.05, 0.3);
        tl.to($('#gMob'), { opacity: 1, duration: 0.3 }, K('green') - 0.2);
        tl.to($('#gPink'), { opacity: 0, duration: 0.3 }, K('green') - 0.2);
        tl.fromTo($('#gMe'), { x: 300 }, { x: 0, duration: 0.35, ease: 'power2.out' }, K('green'));
        tl.to($('#gMob, #gPink'), { x: 130, duration: 0.45, ease: 'power2.in' }, K('chase') - 0.2);
        tl.to($('#gMe'), { x: 70, duration: 0.4, ease: 'power2.out' }, K('chase'));
        tl.to($('#gMob'), { scale: 1.12, transformOrigin: '50% 100%', duration: 0.12, yoyo: true, repeat: 1 }, K('boom') - 0.25);
        tl.to($('#gMob'), { opacity: 0, duration: 0.05 }, K('boom'));
        popBoom(tl, $('#gBoom'), K('boom') - 0.02);
        tl.to($('#gMe'), { x: 200, rotation: 25, duration: 0.4, ease: 'power2.out' }, K('boom'));
      },
    },
    today: {
      bg: BG,
      html: () => svg(`${grid()}
        ${pill('tName', 505, 760, 'CREEPER', LIME, F2.night, 460)}
        ${mob('tMob', 300, 1250, 0.72, LIME, LIMED)}
        ${crown('tCrown', 300, 870, 0.9)}
        ${f2Trophy('tTro', 730, 1080, 0.95, '#1')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#tMob'), { y: 600 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)' }, s.t0 + 0.1);
        f2Pop(tl, $('#tName'), K('name') - 0.15, 0.4);
        tl.fromTo($('#tCrown'), { y: -400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'bounce.out' }, K('symbol') - 0.3);
        f2Pop(tl, $('#tTro'), K('symbol') + 0.1, 0.45);
        tl.to($('#tTro'), { rotation: 4, transformOrigin: '50% 100%', duration: 0.4, yoyo: true, repeat: f2Reps(s.t1 - K('symbol') - 0.6, 0.4), ease: 'sine.inOut' }, K('symbol') + 0.6);
      },
    },
    closing: {
      bg: BG2,
      html: () => svg(`${grid()}
        ${errWin('clErr', 505, 960, 560, 250, 'ERROR')}
        ${star('clStar', 505, 960, 210)}
        ${boom('clBoom', 505, 960, 300)}
        ${f2Bubble('clB1', 220, 1330, 0.65, CYAN)}${f2Bubble('clB2', 505, 1360, 0.65, LIME)}${f2Bubble('clB3', 790, 1330, 0.65, MAG)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#clErr'), s.t0 + 0.1, 0.4);
        tl.to($('#clErr'), { x: 10, duration: 0.05, yoyo: true, repeat: 5 }, K('oops'));
        tl.to($('#clErr'), { scale: 0, transformOrigin: '50% 50%', duration: 0.2, ease: 'power2.in' }, K('better') - 0.25);
        tl.fromTo($('#clStar'), { scale: 0, rotation: -40, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2)' }, K('better') - 0.05);
        tl.to($('#clStar'), { rotation: 8, transformOrigin: '50% 50%', duration: 0.5, yoyo: true, repeat: f2Reps(s.t1 - K('better') - 0.4, 0.5), ease: 'sine.inOut' }, K('better') + 0.4);
        popBoom(tl, $('#clBoom'), K('boom') - 0.05);
        f2Pop(tl, $('#clB1'), K('comments') - 0.15, 0.35);
        f2Pop(tl, $('#clB2'), K('comments') - 0.05, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.05, 0.35);
      },
    },
  });
}
