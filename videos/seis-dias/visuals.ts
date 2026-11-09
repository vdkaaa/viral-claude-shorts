// =====================================================================
//  Custom visuals for "Cada capítulo se hace en 6 días" (flat 2D, HyperFrames).
//  Original props only: calendars, hourglass, snail, rocket, day strip, clock, ON AIR lamp, newspaper, ballot box, TV,
//  clapperboard, poster, film reel, notebook. No South Park characters, no real politicians.
//  Shared props come from styles/flat2d/library.ts.
// =====================================================================
{
  const Y = F2.yellow;
  const hourglass = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><g class="hg">
      <rect x="-110" y="-190" width="220" height="30" rx="12" fill="#a0673a"/><rect x="-110" y="160" width="220" height="30" rx="12" fill="#a0673a"/>
      <path d="M-90 -160 L90 -160 Q90 -60 12 0 Q90 60 90 160 L-90 160 Q-90 60 -12 0 Q-90 -60 -90 -160Z" fill="#dff1ff" opacity="0.9"/>
      <path d="M-60 -110 L60 -110 Q50 -50 0 -10 Q-50 -50 -60 -110Z" fill="${Y}"/><path d="M-70 150 L70 150 Q40 90 0 80 Q-40 90 -70 150Z" fill="${Y}"/></g></g></g>`;
  const snail = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-120 40 Q-130 0 -90 0 L90 0 Q140 0 150 -40 L160 -80" stroke="#f2c29b" stroke-width="40" fill="none" stroke-linecap="round"/>
      <circle cx="160" cy="-90" r="8" fill="#111"/><line x1="150" y1="-80" x2="140" y2="-130" stroke="#f2c29b" stroke-width="8"/><circle cx="140" cy="-132" r="9" fill="#f2c29b"/>
      <circle cx="0" cy="-60" r="80" fill="#c87f3c"/><path d="M0 -60 m-50 0 a50 50 0 1 1 50 50 a32 32 0 1 1 -32 -32 a16 16 0 1 1 16 16" stroke="#8a4b20" stroke-width="10" fill="none"/></g></g>`;
  const rocket = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <g class="fire"><path d="M-40 150 Q0 300 40 150Z" fill="${F2.orange}"/><path d="M-22 150 Q0 240 22 150Z" fill="${Y}"/></g>
      <path d="M-70 60 L-130 160 L-60 140Z" fill="${F2.red}"/><path d="M70 60 L130 160 L60 140Z" fill="${F2.red}"/>
      <path d="M0 -220 Q90 -120 70 150 L-70 150 Q-90 -120 0 -220Z" fill="#fff"/><path d="M0 -220 Q90 -120 70 150 L0 150Z" fill="${F2.gray}"/>
      <circle cx="0" cy="-40" r="40" fill="${F2.blue}"/><circle cx="0" cy="-40" r="26" fill="#9fd3ff"/>${f2Txt(0, 90, 44, F2.night, 'SP')}</g></g>`;
  const clock = (id: string, x: number, y: number, r: number) => `<g id="${id}"><g transform="translate(${x} ${y})"><circle r="${r + 20}" fill="${F2.red}"/><circle r="${r}" fill="#fff"/>
      ${[...Array(12)].map((_, i) => { const a = i / 12 * Math.PI * 2; return `<circle cx="${Math.sin(a) * (r - 30)}" cy="${-Math.cos(a) * (r - 30)}" r="8" fill="${F2.night}"/>`; }).join('')}
      <rect class="hh" x="-9" y="${-r * 0.5}" width="18" height="${r * 0.55}" rx="9" fill="${F2.night}"/><rect class="mm" x="-6" y="${-r * 0.8}" width="12" height="${r * 0.85}" rx="6" fill="${F2.red}"/><circle r="16" fill="${F2.night}"/></g></g>`;
  const tvScreen = (t: string, size = 54) => `${f2Static()}<g class="word" opacity="0">${f2Txt(-32, 0, size, Y, t)}</g>`;
  const tvOn = (tl: gsap.core.Timeline, $: (s: string) => string, sel: string, t: number) => {
    tl.fromTo($(`${sel} .static`), { opacity: 1 }, { opacity: 0, duration: 0.3 }, t);
    tl.fromTo($(`${sel} .word`), { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, t + 0.1);
  };
  const DAYS = ['JUE', 'VIE', 'SÁB', 'DOM', 'LUN', 'MAR', 'MIÉ'];

  defineVisuals({
    hook: {
      bg: F2.night,
      html: () => svg(`${f2Stars()}<rect x="-20" y="1440" width="1120" height="600" fill="#24324f"/>
        ${f2Calendar('hCal', 330, 960, 1.1, 'DÍAS', '6')}${hourglass('hHg', 470, 1330, 0.5)}${f2Toon('hT', 770, 1450, 0.95, 'spiky')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#hT'), { x: 600 }, { x: 0, duration: 0.45, ease: 'power3.out' }, s.t0 + 0.05);
        f2Blink(tl, $('#hT'), [s.t0 + 0.9]);
        f2Talk(tl, $('#hT'), s.t0 + 0.5, 1.2, 0.13, -14);
        f2Arm(tl, $('#hT'), 'L', K('cal') - 0.1, 80);
        f2Talk(tl, $('#hT'), K('cal') + 0.2, s.t1 - K('cal') - 0.3, 0.09, -24);
        f2Pop(tl, $('#hHg'), s.t0 + 0.15, 0.4);
        tl.to($('#hHg .hg'), { rotation: 180, svgOrigin: '0 0', duration: 0.5, ease: 'back.inOut(1.5)', repeat: f2Reps(s.t1 - s.t0 - 0.6, 1.0), repeatDelay: 0.5 }, s.t0 + 0.6);
        tl.fromTo($('#hCal'), { scale: 0, rotation: -12, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2)' }, K('cal') - 0.2);
      },
    },
    others: {
      bg: '#1f3566',
      html: () => svg(`${f2Stars(16)}
        <rect x="-20" y="1380" width="1120" height="600" fill="#24324f"/>
        <g id="oPages">${[0, 1, 2].map((i) => `<rect x="${170 + i * 16}" y="${900 + i * 14}" width="230" height="250" rx="18" fill="#fff" opacity="${0.7 + i * 0.15}"/>`).join('')}${f2Txt(317, 1060, 52, F2.night, 'MESES')}</g>
        <path id="oRope" d="M320 1176 Q300 1260 220 1290" stroke="#c9a46a" stroke-width="8" fill="none"/>
        ${snail('oSnail', 230, 1360, 0.8)}
        <g id="oLaunch"><rect x="640" y="1340" width="240" height="40" rx="16" fill="#555b6e"/></g>
        ${rocket('oRocket', 760, 1130, 0.9)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#oPages'), s.t0 + 0.15, 0.4);
        f2Pop(tl, $('#oRocket'), s.t0 + 0.3, 0.4);
        tl.fromTo($('#oSnail'), { x: -400 }, { x: 0, duration: 0.45, ease: 'power2.out' }, K('snail') - 0.3);
        tl.to($('#oSnail, #oPages, #oRope'), { x: '+=40', duration: s.t1 - K('snail'), ease: 'none' }, K('snail') + 0.2);
        tl.fromTo($('#oRocket .fire'), { scaleY: 0.3, transformOrigin: '50% 0%' }, { scaleY: 1.2, duration: 0.12, yoyo: true, repeat: f2Reps(s.t1 - K('rocket'), 0.12) }, K('rocket') - 0.2);
        tl.to($('#oRocket'), { y: -260, duration: 0.5, ease: 'power2.in' }, K('rocket'));
      },
    },
    week: {
      bg: F2.night,
      html: () => svg(`${f2Stars(14)}
        ${DAYS.map((d, i) => `<g class="day"><rect x="${146 + i * 114}" y="760" width="104" height="130" rx="18" fill="#2b3a5c"/><rect class="lit" x="${146 + i * 114}" y="760" width="104" height="130" rx="18" fill="${Y}"/>${f2Txt(198 + i * 114, 840, 34, '#fff', d, 'stroke="#14213d" stroke-width="7" paint-order="stroke"')}</g>`).join('')}
        <rect x="146" y="930" width="788" height="30" rx="15" fill="#2b3a5c"/><rect id="wBar" x="146" y="930" width="788" height="30" rx="15" fill="${Y}"/>
        ${f2Tv('wTv', 505, 1200, 0.62, tvScreen('¡AL AIRE!', 70))}
        <rect x="-20" y="1450" width="1120" height="600" fill="#24324f"/>
        ${f2Toon('wT', 190, 1450, 0.7, 'spiky')}${f2Toon('wM', 830, 1450, 0.7, 'curly')}
        <g class="desk"><rect x="40" y="1330" width="300" height="34" rx="10" fill="#a0673a"/><rect x="60" y="1360" width="22" height="100" fill="#7c4a25"/><rect x="298" y="1360" width="22" height="100" fill="#7c4a25"/><rect x="130" y="1300" width="120" height="34" rx="6" fill="#fff"/></g><g class="desk"><rect x="680" y="1330" width="300" height="34" rx="10" fill="#a0673a"/><rect x="700" y="1360" width="22" height="100" fill="#7c4a25"/><rect x="938" y="1360" width="22" height="100" fill="#7c4a25"/><rect x="770" y="1300" width="120" height="34" rx="6" fill="#fff"/></g>
        ${[60, 300, 700, 900].map((x, i) => `<g class="pp"><rect x="${x}" y="1240" width="60" height="76" rx="6" fill="#fff" transform="rotate(${i % 2 ? 14 : -14} ${x + 30} 1278)"/></g>`).join('')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('.day'), { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.6)', stagger: 0.04 }, s.t0 + 0.05);
        tl.set($('.lit'), { opacity: 0 }, s.t0);
        const span = K('tv') - K('start');
        tl.fromTo($('#wBar'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: span, ease: 'none' }, K('start'));
        tl.to($('.lit'), { opacity: 1, duration: 0.15, stagger: span / 6.5 }, K('start'));
        tl.fromTo($('#wT, #wM'), { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.3)', stagger: 0.1 }, s.t0 + 0.1);
        const work = K('tv') - K('start') - 0.3;
        for (const sel of ['#wT', '#wM']) { f2Swing(tl, $(sel), 'L', K('start'), work, 10, 40, 0.1); f2Swing(tl, $(sel), 'R', K('start') + 0.05, work, -10, -40, 0.1); }
        f2Talk(tl, $('#wT'), K('start') + 0.4, 1.4, 0.12, -12); f2Talk(tl, $('#wM'), K('start') + 2.0, 1.2, 0.12, -12);
        f2Blink(tl, $('#wT'), [K('start') + 2.4]); f2Blink(tl, $('#wM'), [K('start') + 1.1]);
        tl.set($('.pp'), { opacity: 0 }, s.t0);
        tl.fromTo($('.pp'), { y: 0, x: 0, rotation: 0, opacity: 1 }, { y: -260, x: (i: number) => (i % 2 ? 60 : -60), rotation: (i: number) => (i % 2 ? 90 : -90), opacity: 0, duration: 0.8, stagger: { each: 0.25, repeat: f2Reps(work, 0.8) }, ease: 'power1.out', immediateRender: false }, K('start') + 0.2);
        f2Pop(tl, $('#wTv'), K('tv') - 0.45, 0.4);
        tvOn(tl, $, '#wTv', K('tv'));
        for (const sel of ['#wT', '#wM']) { f2Arm(tl, $(sel), 'L', K('tv'), 150); f2Arm(tl, $(sel), 'R', K('tv'), -150); }
        f2Talk(tl, $('#wT'), K('tv') + 0.1, s.t1 - K('tv') - 0.2, 0.09, -24); f2Talk(tl, $('#wM'), K('tv') + 0.15, s.t1 - K('tv') - 0.25, 0.1, -24);
      },
    },
    rush: {
      bg: '#2a1f5c',
      html: () => svg(`${f2Stars(14)}
        <rect x="-20" y="1450" width="1120" height="600" fill="#3a2c7a"/>
        ${clock('rClock', 330, 960, 170)}
        ${f2Toon('rT', 760, 1450, 0.85, 'spiky')}
        ${[[620, 980], [900, 990], [630, 1090]].map(([x, y]) => `<g class="drop"><path d="M${x} ${y - 40} Q${x + 28} ${y} ${x} ${y + 20} Q${x - 28} ${y} ${x} ${y - 40}Z" fill="#7fd1ff"/></g>`).join('')}
        <g id="rLamp"><g transform="translate(330 1330)"><rect x="-150" y="-70" width="300" height="140" rx="30" fill="#3a1a22"/>
          <rect class="on" x="-150" y="-70" width="300" height="140" rx="30" fill="${F2.red}" opacity="0"/>${f2Txt(0, 24, 60, '#fff', 'ON AIR')}</g></g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#rClock'), s.t0 + 0.05, 0.4);
        tl.fromTo($('#rClock .mm'), { rotation: 0, svgOrigin: '0 0' }, { rotation: 360 * 8, svgOrigin: '0 0', duration: s.t1 - s.t0, ease: 'power1.in' }, s.t0);
        tl.fromTo($('#rClock .hh'), { rotation: 0, svgOrigin: '0 0' }, { rotation: 360, svgOrigin: '0 0', duration: s.t1 - s.t0, ease: 'power1.in' }, s.t0);
        tl.fromTo($('.drop'), { y: 0, opacity: 0 }, { y: 60, opacity: 1, duration: 0.5, ease: 'power1.in', stagger: { each: 0.2, repeat: f2Reps(s.t1 - K('clock'), 0.5) } }, K('clock') - 0.2);
        f2Pop(tl, $('#rLamp'), K('clock'), 0.35);
        tl.fromTo($('#rT'), { x: 600 }, { x: 0, duration: 0.4, ease: 'power3.out' }, s.t0 + 0.05);
        f2Swing(tl, $('#rT'), 'L', s.t0 + 0.5, s.t1 - s.t0 - 0.8, 60, 150, 0.12); f2Swing(tl, $('#rT'), 'R', s.t0 + 0.56, s.t1 - s.t0 - 0.8, -60, -150, 0.12);
        f2Talk(tl, $('#rT'), s.t0 + 0.5, s.t1 - s.t0 - 0.7, 0.08, -26);
        tl.to($('#rT'), { x: 14, duration: 0.06, yoyo: true, repeat: f2Reps(s.t1 - K('onair') - 0.1, 0.06) | 1 }, K('onair'));
        tl.to($('#rLamp .on'), { opacity: 1, duration: 0.15 }, K('onair'));
        tl.to($('#rLamp'), { scale: 1.06, transformOrigin: '50% 50%', duration: 0.2, yoyo: true, repeat: f2Reps(s.t1 - K('onair'), 0.2) }, K('onair') + 0.15);
      },
    },
    news: {
      bg: '#1f3566',
      html: () => svg(`${f2Stars(14)}
        <g id="nPaper"><g transform="translate(505 950) rotate(-4) scale(0.8)"><rect x="-300" y="-230" width="600" height="460" rx="12" fill="#000" opacity="0.2" transform="translate(12 14)"/>
          <rect x="-300" y="-230" width="600" height="460" rx="12" fill="#f4f1e8"/>${f2Txt(0, -150, 80, F2.night, 'NOTICIAS')}<rect x="-260" y="-120" width="520" height="10" fill="${F2.night}"/>
          <rect x="-260" y="-90" width="230" height="170" rx="8" fill="${F2.gray}"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="10" y="${-90 + i * 36}" width="${250 - (i % 2) * 50}" height="16" rx="8" fill="#b9c2d6"/>`).join('')}
          ${[0, 1, 2].map((i) => `<rect x="-260" y="${110 + i * 34}" width="${520 - (i % 2) * 90}" height="16" rx="8" fill="#b9c2d6"/>`).join('')}</g></g>
        <rect x="-20" y="1460" width="1120" height="600" fill="#24324f"/>
        ${f2Toon('nT', 210, 1460, 0.6, 'spiky')}${f2Toon('nM', 820, 1460, 0.6, 'curly')}
        ${[[170, 760, -12], [880, 780, 10], [370, 1220, 8], [660, 1230, -8]].map(([x, y, r], i) => `<g class="ja"><g transform="translate(${x} ${y}) rotate(${r})">${f2Txt(0, 0, 76, i % 2 ? F2.pink : Y, 'JA', F2OUTLINE)}</g></g>`).join('')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#nPaper'), { scale: 0, rotation: -540, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.5, ease: 'power3.out' }, K('paper') - 0.3);
        tl.fromTo($('.ja'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2.5)', stagger: 0.06 }, K('paper') + 0.3);
        tl.fromTo($('#nT, #nM'), { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.3)', stagger: 0.1 }, s.t0 + 0.05);
        const lol = s.t1 - K('paper') - 0.6;
        for (const sel of ['#nT', '#nM']) { f2Arm(tl, $(sel), 'L', K('paper') + 0.3, -25); f2Arm(tl, $(sel), 'R', K('paper') + 0.3, 25); }
        f2Talk(tl, $('#nT'), K('paper') + 0.4, lol, 0.08, -26); f2Talk(tl, $('#nM'), K('paper') + 0.45, lol, 0.09, -26);
        tl.to($('#nT, #nM'), { y: -16, duration: 0.12, yoyo: true, repeat: f2Reps(lol, 0.12) | 1, stagger: 0.05 }, K('paper') + 0.4);
        f2Blink(tl, $('#nT'), [s.t0 + 0.8]); f2Blink(tl, $('#nM'), [s.t0 + 1.0]);
        tl.to($('.ja'), { y: -14, duration: 0.25, yoyo: true, repeat: f2Reps(s.t1 - K('paper') - 0.7, 0.25), ease: 'sine.inOut' }, K('paper') + 0.7);
      },
    },
    election: {
      bg: F2.night,
      html: () => svg(`${f2Stars(14)}
        <g id="eBox"><g transform="translate(290 1180)"><rect x="-170" y="-130" width="340" height="260" rx="20" fill="${F2.blue}"/><rect x="0" y="-130" width="170" height="260" rx="20" fill="${F2.blueD}"/>
          <rect x="-90" y="-140" width="180" height="22" rx="10" fill="${F2.night}"/>${f2Txt(0, 40, 50, '#fff', 'VOTO')}</g></g>
        <g id="eBallot"><g transform="translate(290 960)"><rect x="-60" y="-80" width="120" height="160" rx="10" fill="#fff"/><path d="M-30 0 L-8 26 L34 -30" stroke="${F2.green}" stroke-width="14" fill="none" stroke-linecap="round"/></g></g>
        <g id="eTue"><g transform="translate(290 820)"><rect x="-130" y="-46" width="260" height="92" rx="24" fill="${Y}"/>${f2Txt(0, 18, 50, F2.night, 'MARTES')}</g></g>
        ${f2Arrow('eArrow', 470, 1120, 560, 1120, '#fff', 16)}
        ${f2Tv('eTv', 760, 1170, 0.55, tvScreen('NUEVO', 80))}
        <g id="eWed"><g transform="translate(760 820)"><rect x="-160" y="-46" width="320" height="92" rx="24" fill="${F2.pink}"/>${f2Txt(0, 18, 48, F2.night, 'MIÉRCOLES')}</g></g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#eBox'), s.t0 + 0.05, 0.4);
        f2Pop(tl, $('#eTue'), s.t0 + 0.3, 0.4);
        tl.fromTo($('#eBallot'), { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, K('vote') - 0.5);
        tl.to($('#eBallot'), { y: 220, scaleY: 0.2, transformOrigin: '50% 100%', duration: 0.3, ease: 'power2.in' }, K('vote') - 0.15);
        tl.fromTo($('#eArrow'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.35 }, K('vote') + 0.4);
        f2Pop(tl, $('#eTv'), K('tv') - 0.4, 0.4);
        f2Pop(tl, $('#eWed'), K('tv') - 0.2, 0.4);
        tvOn(tl, $, '#eTv', K('tv'));
      },
    },
    doc: {
      bg: '#2a1f5c',
      html: () => svg(`${f2Stars(14)}
        <g id="dClap"><g transform="translate(300 1120)"><rect x="-170" y="-60" width="340" height="230" rx="16" fill="#2b2d42"/>${f2Txt(0, 70, 44, '#fff', 'TOMA 1')}
          <g class="top"><rect x="-170" y="-130" width="340" height="60" rx="10" fill="#2b2d42"/>${[0, 1, 2, 3].map((i) => `<path d="M${-150 + i * 84} -130 L${-110 + i * 84} -130 L${-140 + i * 84} -70 L${-180 + i * 84} -70Z" fill="#fff"/>`).join('')}</g></g></g>
        <g id="dPoster"><g transform="translate(740 1060)"><rect x="-170" y="-260" width="340" height="520" rx="16" fill="#000" opacity="0.25" transform="translate(12 14)"/>
          <rect x="-170" y="-260" width="340" height="520" rx="16" fill="${F2.night}"/><rect x="-150" y="-240" width="300" height="480" rx="10" fill="none" stroke="${Y}" stroke-width="6"/>
          ${f2Txt(0, -120, 120, Y, '6')}${f2Txt(0, -20, 52, '#fff', 'DAYS')}${f2Txt(0, 40, 52, '#fff', 'TO AIR')}
          <g transform="translate(0 150)"><circle r="54" fill="#fff"/><rect x="-5" y="-40" width="10" height="44" rx="5" fill="${F2.red}"/><rect x="-5" y="-5" width="34" height="10" rx="5" fill="${F2.night}"/></g></g></g>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#dClap'), { y: 600 }, { y: 0, duration: 0.45, ease: 'back.out(1.4)' }, s.t0 + 0.05);
        tl.fromTo($('#dClap .top'), { rotation: -28, svgOrigin: '-170 -70' }, { rotation: 0, svgOrigin: '-170 -70', duration: 0.15, ease: 'power3.in' }, K('clap') - 0.15);
        tl.fromTo($('#dPoster'), { scale: 0, rotation: 15, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(1.8)' }, K('poster') - 0.2);
      },
    },
    homework: {
      bg: F2.night,
      html: () => svg(`${f2Stars(14)}
        <g id="hReel"><g transform="translate(300 960)"><circle r="190" fill="#3d4258"/><circle r="160" fill="#555b6e"/>
          ${[...Array(6)].map((_, i) => { const a = i / 6 * Math.PI * 2; return `<circle cx="${Math.cos(a) * 95}" cy="${Math.sin(a) * 95}" r="38" fill="#2b2d42"/>`; }).join('')}<circle r="26" fill="${Y}"/></g></g>
        <path id="hBolt" d="M330 840 L260 980 L320 980 L270 1090 L400 940 L335 940 L380 840Z" fill="${Y}"/>
        <g id="hBook"><g transform="translate(750 960) rotate(4)"><rect x="-170" y="-210" width="340" height="420" rx="18" fill="${F2.green}"/><rect x="-170" y="-210" width="40" height="420" rx="12" fill="${F2.greenD}"/>
          <rect x="-110" y="-150" width="250" height="90" rx="12" fill="#fff"/>${f2Txt(15, -90, 52, F2.night, 'TAREA')}</g></g>
        ${snail('hSnail', 760, 760, 0.6)}
        <rect x="-20" y="1470" width="1120" height="600" fill="#24324f"/>
        ${f2Toon('hwT', 300, 1470, 0.5, 'spiky')}${f2Toon('hwM', 760, 1470, 0.5, 'curly')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#hReel'), { x: -500 }, { x: 0, duration: 0.45, ease: 'power3.out' }, K('reel') - 0.3);
        tl.fromTo($('#hReel'), { rotation: 0 }, { rotation: 1440, svgOrigin: '300 960', duration: s.t1 - K('reel') + 0.3, ease: 'none' }, K('reel') - 0.3);
        f2Pop(tl, $('#hBolt'), K('reel'), 0.35);
        tl.fromTo($('#hBook'), { x: 500 }, { x: 0, duration: 0.45, ease: 'power3.out' }, K('reel') - 0.1);
        tl.fromTo($('#hwT, #hwM'), { y: 400 }, { y: 0, duration: 0.4, ease: 'back.out(1.3)', stagger: 0.1 }, s.t0 + 0.05);
        f2Arm(tl, $('#hwT'), 'L', K('reel'), 150); f2Arm(tl, $('#hwT'), 'R', K('reel'), -150);
        f2Talk(tl, $('#hwT'), K('reel') + 0.1, 1.2, 0.09, -24);
        tl.to($('#hwM .eyes'), { scaleY: 0.45, transformOrigin: '50% 100%', duration: 0.3 }, K('snail') - 0.2);
        f2Talk(tl, $('#hwM'), K('snail'), s.t1 - K('snail') - 0.2, 0.35, -8);
        tl.to($('#hwM'), { rotation: -6, transformOrigin: '50% 100%', duration: 0.6 }, K('snail'));
        tl.fromTo($('#hSnail'), { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'bounce.out' }, K('snail') - 0.2);
      },
    },
    closing: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Cloud('clC1', 170, 1430, 1.0)}${f2Cloud('clC2', 870, 1440, 0.85)}
        <g id="clCal"><g transform="translate(505 1060)"><rect x="-300" y="-250" width="600" height="500" rx="30" fill="#000" opacity="0.12" transform="translate(10 12)"/>
          <rect x="-300" y="-250" width="600" height="500" rx="30" fill="#fff"/><rect x="-300" y="-250" width="600" height="100" rx="30" fill="${F2.red}"/><rect x="-300" y="-180" width="600" height="30" fill="${F2.red}"/>
          ${f2Txt(0, -180, 50, '#fff', 'ENTREGA')}
          ${[...Array(20)].map((_, i) => `<rect x="${-260 + (i % 5) * 106}" y="${-130 + Math.floor(i / 5) * 90}" width="90" height="74" rx="12" fill="${i === 19 ? '#ffe3e3' : '#eef2f9'}"/>`).join('')}
          <circle id="clRing" cx="${-260 + 4 * 106 + 45}" cy="${-130 + 3 * 90 + 37}" r="58" fill="none" stroke="${F2.red}" stroke-width="12"/></g></g>
        ${f2Bubble('clB1', 190, 790, 0.6, F2.green)}${f2Bubble('clB2', 840, 780, 0.6, Y)}${f2Bubble('clB3', 520, 1420, 0.6, F2.pink)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#clCal'), s.t0 + 0.05, 0.4);
        tl.fromTo($('#clC1'), { x: -40 }, { x: 40, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clC2'), { x: 30 }, { x: -30, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clRing'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.35, ease: 'back.out(3)' }, K('last') - 0.1);
        f2Pop(tl, $('#clB1'), K('comments') - 0.1, 0.35);
        f2Pop(tl, $('#clB2'), K('comments') + 0.0, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.1, 0.35);
      },
    },
  });
}
