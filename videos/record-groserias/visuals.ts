// =====================================================================
//  Custom visuals for "Récord Guinness de groserías" (flat 2D, HyperFrames).
//  Swear words ONLY as censored symbols (#@$%!). Generic gold trophy (never the real statuette), generic silhouettes,
//  no South Park characters. Shared props come from styles/flat2d/library.ts.
// =====================================================================
{
  const Y = F2.yellow, SW = '#@$%!';
  // a spiky "swear" bubble
  const spiky = (id: string, x: number, y: number, s: number, c: string, t = SW, cls = '') => {
    const pts = [...Array(16)].map((_, i) => { const a = i / 16 * Math.PI * 2, r = i % 2 ? 120 : 160; return `${(Math.cos(a) * r * 1.5).toFixed(0)} ${(Math.sin(a) * r).toFixed(0)}`; }).join(' L');
    return `<g ${id ? `id="${id}"` : ''} ${cls ? `class="${cls}"` : ''}><g transform="translate(${x} ${y}) scale(${s})"><path d="M${pts}Z" fill="${c}"/>${f2Txt(0, 26, 76, F2.night, t)}</g></g>`;
  };
  const medal = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-90 -250 L-20 -90 L-70 -80 L-150 -250Z" fill="${F2.blue}"/><path d="M90 -250 L20 -90 L70 -80 L150 -250Z" fill="${F2.red}"/>
      <circle cx="0" cy="20" r="150" fill="${Y}"/><circle cx="0" cy="20" r="120" fill="#e0a21f"/>
      <path d="M0 -50 L18 -6 L66 -6 L28 22 L42 68 L0 40 L-42 68 L-28 22 L-66 -6 L-18 -6Z" fill="#fff" opacity="0.9"/>
      <rect x="-130" y="110" width="260" height="62" rx="16" fill="${F2.night}"/>${f2Txt(0, 154, 40, Y, 'RÉCORD')}</g></g>`;
  // a movie poster (local: x -170..170, y -230..230)
  const poster = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-170" y="-230" width="340" height="460" rx="16" fill="#000" opacity="0.25" transform="translate(10 12)"/>
      <rect x="-170" y="-230" width="340" height="460" rx="16" fill="${F2.purple}"/><rect x="-150" y="-210" width="300" height="420" rx="10" fill="none" stroke="${Y}" stroke-width="6"/>
      <circle cx="0" cy="-70" r="90" fill="${F2.sky}"/><path d="M-90 -40 Q-40 -120 0 -60 Q40 -120 90 -40 L90 20 L-90 20Z" fill="#fff" opacity="0.85"/>
      ${f2Txt(0, 90, 46, '#fff', 'LA')}${f2Txt(0, 150, 46, '#fff', 'PELÍCULA')}${[-60, 0, 60].map((sx) => `<circle cx="${sx}" cy="190" r="10" fill="${Y}"/>`).join('')}</g></g>`;
  const kid = (x: number, y: number, s: number, c: string) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-70" y="-180" width="140" height="180" rx="56" fill="${c}"/><circle cx="0" cy="-240" r="72" fill="#f2c29b"/>
      <circle cx="-24" cy="-246" r="9" fill="#111"/><circle cx="24" cy="-246" r="9" fill="#111"/><ellipse cx="0" cy="-206" rx="18" ry="14" fill="#7a2f2f"/></g>`;
  const clock = (id: string, x: number, y: number, r: number) => `<g id="${id}"><g transform="translate(${x} ${y})"><circle r="${r + 16}" fill="${F2.red}"/><circle r="${r}" fill="#fff"/>
      <rect class="mm" x="-6" y="${-r * 0.8}" width="12" height="${r * 0.85}" rx="6" fill="${F2.red}"/><rect x="-8" y="${-r * 0.5}" width="16" height="${r * 0.55}" rx="8" fill="${F2.night}" transform="rotate(60)"/><circle r="14" fill="${F2.night}"/></g></g>`;

  defineVisuals({
    hook: {
      bg: F2.night,
      html: () => svg(`${f2Stars()}<rect x="-20" y="1450" width="1120" height="600" fill="#24324f"/>
        ${medal('hMedal', 300, 1080, 0.95)}${f2Toon('hT', 760, 1450, 0.78, 'spiky')}${spiky('hSwear', 690, 820, 0.6, F2.red)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#hMedal'), { y: -700, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }, K('medal') - 0.3);
        tl.to($('#hMedal'), { rotation: 6, transformOrigin: '50% 0%', duration: 0.5, yoyo: true, repeat: f2Reps(s.t1 - K('medal'), 0.5), ease: 'sine.inOut' }, K('medal') + 0.2);
        tl.fromTo($('#hT'), { x: 600 }, { x: 0, duration: 0.45, ease: 'power3.out' }, s.t0 + 0.05);
        f2Blink(tl, $('#hT'), [s.t0 + 1.0]);
        f2Arm(tl, $('#hT'), 'L', K('swear') - 0.15, 140); f2Arm(tl, $('#hT'), 'R', K('swear') - 0.15, -140);
        f2Talk(tl, $('#hT'), K('swear') - 0.1, s.t1 - K('swear'), 0.07, -28);
        tl.fromTo($('#hSwear'), { scale: 0, rotation: -20, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(3)' }, K('swear') - 0.1);
        tl.to($('#hSwear'), { x: 8, duration: 0.05, yoyo: true, repeat: 7 }, K('swear') + 0.2);
      },
    },
    movie: {
      bg: '#2a1f5c',
      html: () => svg(`${f2Stars(14)}
        <g id="mPosterG">${poster('mPoster', 505, 1030, 1.0)}</g>
        <g id="mNoCut"><g transform="translate(820 1340)"><circle r="80" fill="#fff"/><g transform="rotate(90) scale(0.55)"><circle cx="-40" cy="80" r="40" fill="none" stroke="${F2.night}" stroke-width="20"/><circle cx="40" cy="80" r="40" fill="none" stroke="${F2.night}" stroke-width="20"/><path d="M-10 40 L-30 -180 L0 -180Z M10 40 L30 -180 L0 -180Z" fill="#8d99ae"/></g>
          <circle r="80" fill="none" stroke="${F2.red}" stroke-width="16"/><rect x="-74" y="-8" width="148" height="16" fill="${F2.red}" transform="rotate(-45)"/></g></g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#mPoster'), K('poster') - 0.2, 0.45);
        tl.to($('#mPosterG'), { scale: 1.2, svgOrigin: '505 800', duration: 0.35, ease: 'back.out(2)' }, K('big') - 0.1);
        tl.to($('#mPosterG'), { scaleY: 1.45, svgOrigin: '505 800', duration: 0.35, ease: 'back.out(2)' }, K('long') - 0.1);
        f2Pop(tl, $('#mNoCut'), K('long') + 0.5, 0.35);
      },
    },
    story: {
      bg: F2.night,
      html: () => svg(`${f2Stars(10)}
        <g id="sScreen"><rect x="120" y="680" width="840" height="380" rx="20" fill="#e9eef8"/><rect x="120" y="680" width="840" height="380" rx="20" fill="none" stroke="#3d4258" stroke-width="16"/></g>
        ${spiky('sSwear', 540, 870, 0.8, F2.red)}
        <rect x="-20" y="1380" width="1120" height="600" fill="#24324f"/>
        <g id="sKids">${[[250, F2.green], [505, F2.blue], [760, F2.orange]].map(([x, c], i) => `<g class="kd"><g>${kid(x as number, 1400, 0.95, c as string)}</g>${spiky('', x as number, 1060 + (i % 2) * 30, 0.42, Y, '#@!', 'kb')}</g>`).join('')}</g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#sScreen'), s.t0 + 0.05, 0.4);
        tl.fromTo($('#sSwear'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(3)' }, K('screen') - 0.1);
        tl.fromTo($('#sKids .kd'), { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)', stagger: 0.1 }, s.t0 + 0.3);
        tl.fromTo($('#sKids .kb'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, ease: 'back.out(3)', stagger: 0.12 }, K('kids') - 0.05);
        tl.to($('#sKids .kd'), { y: -20, duration: 0.2, yoyo: true, repeat: f2Reps(s.t1 - K('kids') - 0.5, 0.2), ease: 'sine.inOut', stagger: 0.07 }, K('kids') + 0.4);
      },
    },
    count: {
      bg: '#2a1f5c',
      html: () => svg(`${f2Stars(10)}
        ${[[190, 760], [420, 730], [640, 780], [250, 940], [480, 910], [180, 1110], [420, 1090], [575, 1000], [600, 1180]].map(([x, y], i) => spiky('', x, y, 0.36, RAINBOW[i % RAINBOW.length], SW, 'rain')).join('')}
        ${clock('cClock', 800, 1120, 110)}
        <g id="cTag"><g transform="translate(800 910)"><rect x="-140" y="-36" width="280" height="72" rx="20" fill="${Y}"/>${f2Txt(0, 14, 38, F2.night, '≈ 5 / MIN')}</g></g>`),
      anim(tl, s, K, $) {
        tl.fromTo($('.rain'), { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'bounce.out', stagger: 0.08 }, s.t0 + 0.05);
        tl.to($('.rain'), { y: '+=18', duration: 0.35, yoyo: true, repeat: f2Reps(s.t1 - s.t0 - 1.2, 0.35), ease: 'sine.inOut', stagger: 0.05 }, s.t0 + 1.2);
        f2Pop(tl, $('#cClock'), K('stat') - 0.2, 0.4);
        tl.fromTo($('#cClock .mm'), { rotation: 0, svgOrigin: '0 0' }, { rotation: 360 * 3, svgOrigin: '0 0', duration: s.t1 - K('stat'), ease: 'none' }, K('stat'));
        f2Pop(tl, $('#cTag'), K('minute') - 0.1, 0.35);
      },
    },
    book: {
      bg: F2.night,
      html: () => svg(`${f2Stars(14)}
        <g id="bClosed"><g transform="translate(505 1050)"><rect x="-200" y="-250" width="400" height="500" rx="20" fill="#000" opacity="0.25" transform="translate(12 14)"/>
          <rect x="-200" y="-250" width="400" height="500" rx="20" fill="#b3262f"/><rect x="-200" y="-250" width="50" height="500" rx="14" fill="#8a1c24"/>
          ${f2Txt(25, -60, 64, Y, 'LIBRO DE')}${f2Txt(25, 20, 64, Y, 'RÉCORDS')}<rect x="-110" y="70" width="270" height="10" rx="5" fill="${Y}"/></g></g>
        <g id="bOpen"><g transform="translate(505 1050)"><path d="M0 -200 Q-200 -250 -380 -200 L-380 220 Q-200 170 0 220Z" fill="#fff8ea"/><path d="M0 -200 Q200 -250 380 -200 L380 220 Q200 170 0 220Z" fill="#f1e8d6"/>
          ${[0, 1, 2, 3].map((i) => `<rect x="-320" y="${-120 + i * 60}" width="${260 - (i % 2) * 70}" height="18" rx="9" fill="${F2.gray}"/>`).join('')}
          <g transform="translate(190 0)"><circle r="100" fill="${Y}"/>${f2Txt(0, 34, 96, F2.night, '#1')}</g></g></g>
        <g id="bRibbon"><g transform="translate(505 1360)"><path d="M-330 -50 L330 -50 L300 0 L330 50 L-330 50 L-300 0Z" fill="${Y}"/>${f2Txt(0, 16, 44, F2.night, 'MÁS PALABROTAS')}</g></g>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#bClosed'), { y: 700 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)' }, s.t0 + 0.05);
        tl.set($('#bOpen'), { opacity: 0 }, s.t0);
        tl.to($('#bClosed'), { scaleX: 0, svgOrigin: '505 1050', duration: 0.2, ease: 'power2.in' }, K('book') - 0.2);
        tl.fromTo($('#bOpen'), { scaleX: 0, opacity: 1, svgOrigin: '505 1050' }, { scaleX: 1, opacity: 1, svgOrigin: '505 1050', duration: 0.3, ease: 'back.out(1.6)', immediateRender: false }, K('book'));
        f2Pop(tl, $('#bRibbon'), K('ribbon') - 0.15, 0.4);
      },
    },
    irony: {
      bg: '#2a1f5c',
      html: () => svg(`${f2Stars(14)}
        ${poster('iPoster', 310, 1060, 0.95)}
        <g id="iTape">${[45, -45].map((r) => `<g transform="translate(310 1060) rotate(${r})"><rect x="-260" y="-40" width="520" height="80" fill="${Y}"/>${[...Array(7)].map((_, i) => `<path d="M${-260 + i * 80} -40 L${-220 + i * 80} -40 L${-260 + i * 80} 40 L${-300 + i * 80} 40Z" fill="${F2.night}" opacity="0.85"/>`).join('')}</g>`).join('')}
          <g transform="translate(310 1060)"><rect x="-180" y="-38" width="360" height="76" rx="12" fill="${F2.night}"/>${f2Txt(0, 16, 42, Y, 'CENSURADO')}</g></g>
        ${f2Trophy('iCup', 770, 1100, 1.0, 'OSCAR')}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#iPoster'), s.t0 + 0.05, 0.4);
        tl.fromTo($('#iTape'), { scale: 1.8, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('tape') - 0.2);
        tl.fromTo($('#iCup'), { y: 700, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }, K('oscar') - 0.3);
      },
    },
    critic: {
      bg: F2.night,
      html: () => svg(`${f2Stars(14)}
        ${spiky('', 280, 960, 0.6, F2.red, SW, 'cb')}${spiky('', 740, 990, 0.6, F2.pink, SW, 'cb')}${spiky('', 505, 840, 0.55, Y, SW, 'cb')}
        <g id="cBar">${[0, 1, 2, 3].map((i) => `<rect class="pc" x="${100 + i * 220}" y="900" width="220" height="140" fill="#000"/>`).join('')}${f2Txt(540, 992, 60, '#fff', 'CENSURA')}</g>
        <rect x="-20" y="1460" width="1120" height="600" fill="#24324f"/>
        ${f2Toon('cT', 260, 1460, 0.58, 'spiky')}${f2Toon('cM', 760, 1460, 0.58, 'curly')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('.cb'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(3)', stagger: 0.1 }, s.t0 + 0.1);
        tl.fromTo($('#cBar'), { x: -1000 }, { x: 0, duration: 0.4, ease: 'power3.out' }, s.t0 + 0.6);
        tl.fromTo($('#cT, #cM'), { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.3)', stagger: 0.1 }, s.t0 + 0.05);
        f2Talk(tl, $('#cT'), s.t0 + 0.4, s.t1 - s.t0 - 0.6, 0.08, -26); f2Talk(tl, $('#cM'), s.t0 + 0.5, s.t1 - s.t0 - 0.7, 0.09, -26);
        f2Swing(tl, $('#cT'), 'R', s.t0 + 0.4, K('break') - s.t0 - 0.4, -40, -120, 0.14); f2Swing(tl, $('#cM'), 'L', s.t0 + 0.5, K('break') - s.t0 - 0.5, 40, 120, 0.14);
        for (const sel of ['#cT', '#cM']) { f2Arm(tl, $(sel), 'L', K('break') + 0.05, 150); f2Arm(tl, $(sel), 'R', K('break') + 0.05, -150); }
        tl.to($('#cT, #cM'), { y: -18, duration: 0.15, yoyo: true, repeat: f2Reps(s.t1 - K('break') - 0.4, 0.15) | 1, stagger: 0.06 }, K('break') + 0.2);
        tl.to($('#cBar text'), { opacity: 0, duration: 0.1 }, K('break') - 0.05);
        [[-260, -200, -40], [-80, 260, 30], [120, -240, -25], [300, 220, 45]].forEach(([x, y, r], i) =>
          tl.to($(`#cBar .pc:nth-of-type(${i + 1})`), { x, y, rotation: r, opacity: 0, transformOrigin: '50% 50%', duration: 0.45, ease: 'power2.out' }, K('break')));
        tl.to($('.cb'), { scale: 1.15, transformOrigin: '50% 50%', duration: 0.2, yoyo: true, repeat: f2Reps(s.t1 - K('break') - 0.3, 0.2) }, K('break') + 0.2);
      },
    },
    closing: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Cloud('clC1', 170, 1430, 1.0)}${f2Cloud('clC2', 870, 1440, 0.85)}
        <g id="clFaceG">${f2Toon('clT', 505, 1450, 1.0, 'curly')}</g>
        <g id="clZip"><g transform="translate(505 1450)"><rect x="-120" y="-487" width="240" height="34" rx="17" fill="#8d99ae"/>${[...Array(11)].map((_, i) => `<rect x="${-110 + i * 21}" y="${i % 2 ? -487 : -469}" width="12" height="16" fill="#555b6e"/>`).join('')}
          <g id="clPull"><rect x="-140" y="-492" width="30" height="46" rx="8" fill="#555b6e"/><rect x="-136" y="-450" width="22" height="40" rx="8" fill="#8d99ae"/></g></g></g>
        ${f2Bubble('clB1', 190, 790, 0.6, F2.green)}${f2Bubble('clB2', 840, 780, 0.6, F2.pink)}${f2Bubble('clB3', 190, 1130, 0.6, '#fff')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#clFaceG'), { y: 700 }, { y: 0, duration: 0.4, ease: 'back.out(1.3)' }, s.t0 + 0.05);
        f2Talk(tl, $('#clT'), s.t0 + 0.4, K('zip') - s.t0 - 0.8, 0.09, -24);
        f2Swing(tl, $('#clT'), 'R', s.t0 + 0.4, K('zip') - s.t0 - 0.8, -30, -110, 0.15);
        tl.set($('#clZip'), { opacity: 0 }, s.t0);
        tl.set($('#clZip'), { opacity: 1 }, K('zip') - 0.35);
        tl.to($('#clT .eyes'), { x: 14, duration: 0.2 }, K('zip') + 0.2);
        f2Blink(tl, $('#clT'), [K('zip') + 0.7]);
        tl.fromTo($('#clC1'), { x: -40 }, { x: 40, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clC2'), { x: 30 }, { x: -30, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clPull'), { x: 0 }, { x: 250, duration: 0.4, ease: 'power2.inOut' }, K('zip') - 0.3);
        f2Pop(tl, $('#clB1'), K('comments') - 0.05, 0.35);
        f2Pop(tl, $('#clB2'), K('comments') + 0.05, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.15, 0.35);
      },
    },
  });
}
