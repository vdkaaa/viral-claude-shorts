// =====================================================================
//  Custom visuals for "Los hábitos NO tardan 21 días" (flat 2D, HyperFrames). Canal: curiosidades.
//  Original art only: calendars, generic people, everyday icons, a dot grid, a snail, progress bars, a staircase.
//  Helpers live inside this block so they don't clash with other videos in the shared type-check scope.
// =====================================================================
{
  const TEAL = '#0f3d3e', TEALL = '#1d5c5d', PURP = '#2a1f5c', NAVY = '#1f3566';
  const glass = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-50 -70 L50 -70 L40 70 L-40 70Z" fill="#dff3ff"/><path d="M-45 -10 L45 -10 L40 70 L-40 70Z" fill="${F2.sky}"/><path d="M0 -10 L45 -10 L40 70 L0 70Z" fill="${F2.skyD}" opacity="0.5"/></g></g>`;
  const apple = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-4" y="-74" width="12" height="36" rx="6" fill="#7c4a25"/><ellipse cx="26" cy="-58" rx="26" ry="12" fill="${F2.green}"/>
      <circle cx="-22" cy="8" r="52" fill="${F2.red}"/><circle cx="22" cy="8" r="52" fill="#e04449"/><circle cx="-36" cy="-12" r="12" fill="#fff" opacity="0.6"/></g></g>`;
  // a side-view sneaker facing right: midsole, toe cap, laces, side stripes, heel tab
  const shoe = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="6" cy="62" rx="104" ry="8" fill="#000" opacity="0.12"/>
      <path d="M-30 -52 Q-28 -76 -6 -72 L4 -40Z" fill="#e06d14"/>
      <path d="M-96 34 L-96 -26 Q-96 -50 -72 -52 L-34 -56 Q-14 -56 -6 -38 L8 -16 Q30 2 72 8 Q110 14 110 36Z" fill="${F2.orange}"/>
      <path d="M-96 -26 Q-96 -50 -72 -52 L-48 -54 Q-58 -30 -78 -22 Q-90 -18 -96 -8Z" fill="#e06d14"/>
      <rect x="-104" y="-40" width="16" height="34" rx="6" fill="${F2.night}"/>
      <path d="M62 8 Q104 14 110 36 L58 36Z" fill="#fff" opacity="0.9"/>
      <path d="M-70 14 Q-20 -10 40 16 M-74 -2 Q-30 -24 20 -2" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M-24 -44 L-6 -52 M-12 -30 L6 -38 M0 -16 L18 -24" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      <path d="M-104 34 L110 34 Q120 34 120 46 Q120 58 106 58 L-98 58 Q-110 58 -110 46 Q-110 34 -104 34Z" fill="#fff"/>
      <rect x="-104" y="52" width="216" height="8" rx="4" fill="${F2.gray}"/></g></g>`;
  // a person with more detail (same face as f2Person): origin at the chest top, head centre (0,-50), feet at ~224
  const SKIN = '#f2c29b', SKIND = '#e3a77b';
  const me = (id: string, x: number, y: number, s = 1, shirt: string = F2.red, hair = '#3b2a24', pants = '#3f5aa6') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="226" rx="64" ry="10" fill="#000" opacity="0.2"/>
      <rect x="-38" y="116" width="32" height="96" rx="12" fill="${pants}"/><rect x="6" y="116" width="32" height="96" rx="12" fill="${pants}"/>
      <path d="M-48 204 L-4 204 Q4 204 4 214 L4 222 L-52 222 Q-56 210 -48 204Z" fill="#fff"/><rect x="-54" y="217" width="58" height="8" rx="4" fill="#8d99ae"/>
      <path d="M4 204 L48 204 Q56 210 52 222 L-4 222 L-4 214 Q-4 204 4 204Z" fill="#fff"/><rect x="-4" y="217" width="58" height="8" rx="4" fill="#8d99ae"/>
      <g transform="rotate(10 -54 14)"><rect x="-66" y="8" width="24" height="104" rx="12" fill="${shirt}"/><circle cx="-54" cy="118" r="13" fill="${SKIN}"/></g>
      <g transform="rotate(-10 54 14)"><rect x="42" y="8" width="24" height="104" rx="12" fill="${shirt}"/><circle cx="54" cy="118" r="13" fill="${SKIN}"/></g>
      <rect x="-48" y="0" width="96" height="132" rx="34" fill="${shirt}"/><path d="M12 0 Q48 0 48 34 L48 98 Q48 132 12 132Z" fill="#000" opacity="0.12"/>
      <rect x="-46" y="106" width="92" height="14" fill="#2b2d42" opacity="0.45"/>
      <rect x="-12" y="-8" width="24" height="16" fill="${SKIND}"/><path d="M-22 0 L0 24 L22 0Z" fill="#fff"/><path d="M-6 0 L0 8 L6 0Z" fill="${SKIND}"/>
      <circle cx="-52" cy="-48" r="11" fill="${SKIND}"/><circle cx="52" cy="-48" r="11" fill="${SKIND}"/>
      <circle cx="0" cy="-50" r="52" fill="${SKIN}"/><path d="M-52 -60 Q0 -130 52 -60 Q30 -90 0 -88 Q-30 -90 -52 -60Z" fill="${hair}"/>
      <circle cx="14" cy="-62" r="7" fill="${F2.night}"/><circle cx="-14" cy="-62" r="7" fill="${F2.night}"/><path d="M-12 -36 Q0 -26 12 -36" stroke="${F2.night}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="-30" cy="-40" r="8" fill="#ff9aa2" opacity="0.5"/><circle cx="30" cy="-40" r="8" fill="#ff9aa2" opacity="0.5"/></g></g>`;
  const SHIRTS = [F2.red, F2.blue, F2.green, F2.orange, F2.purple, F2.pink, '#e0a21f'], HAIRS = ['#3b2a24', '#8a5a33', '#1d1d1d', '#c98a4b', '#5a3b1c', '#1d1d1d', '#8a5a33'];
  const card = (id: string, x: number, y: number, inner: string) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="-118" y="-112" width="236" height="236" rx="34" fill="#000" opacity="0.2" transform="translate(8 10)"/><rect x="-118" y="-112" width="236" height="236" rx="34" fill="#fff"/>${inner}</g></g>`;
  const star = (id: string, x: number, y: number, r: number, c = F2.yellow) => {
    let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += `${i ? 'L' : 'M'}${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)} `; }
    return `<g id="${id}"><g transform="translate(${x} ${y})"><path d="${d}Z" fill="#000" opacity="0.2" transform="translate(8 10)"/><path d="${d}Z" fill="${c}"/></g></g>`;
  };
  const cross = (id: string, x: number, y: number, r: number) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="${-r}" y="-16" width="${2 * r}" height="32" rx="16" fill="${F2.red}" transform="rotate(45)"/><rect x="${-r}" y="-16" width="${2 * r}" height="32" rx="16" fill="${F2.red}" transform="rotate(-45)"/></g></g>`;
  // a progress bar: animate ".fill" with scaleX (origin left)
  const bar = (id: string, x: number, y: number, w: number, c: string, h = 46) => `<g id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="#000" opacity="0.25"/>
      <rect class="fill" x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}"/></g>`;
  const snail = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${-s} ${s})">
      <path d="M-110 0 Q-120 -40 -90 -40 L60 -40 Q100 -40 100 0Z" fill="#f2c29b"/><path d="M-96 -36 L-110 -84 M-80 -38 L-84 -88" stroke="#f2c29b" stroke-width="8" stroke-linecap="round"/>
      <circle cx="-110" cy="-88" r="9" fill="${F2.night}"/><circle cx="-84" cy="-92" r="9" fill="${F2.night}"/>
      <circle cx="20" cy="-70" r="66" fill="${F2.orange}"/><path d="M20 -70 m-10 0 a10 10 0 1 1 20 0 a22 22 0 1 1 -44 0 a34 34 0 1 1 68 0 a46 46 0 1 1 -92 0" stroke="#c25f1f" stroke-width="9" fill="none"/></g></g>`;
  const dayDot = (cls: string, x: number, y: number, on: boolean) => `<g class="${cls}"><g transform="translate(${x} ${y})"><circle r="32" fill="${on ? F2.green : '#c9d3ea'}"/>
      ${on ? '<path d="M-14 0 L-4 11 L15 -11" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' : ''}</g></g>`;

  defineVisuals({
    hook: {
      bg: F2.night,
      html: () => svg(`${f2Stars()}
        <rect x="-20" y="1440" width="1120" height="600" fill="#24324f"/>
        ${f2Calendar('hCal', 360, 1000, 1.15, 'DÍAS', '21')}
        ${me('hMe', 790, 1210, 1.05)}
        <g id="hQ"><g transform="translate(860 930)">${f2Txt(0, 0, 120, F2.yellow, '?', F2OUTLINE)}</g></g>
        <g id="hStamp" data-layout-allow-overlap="true"><g transform="translate(380 1060) rotate(-14)"><rect x="-190" y="-72" width="380" height="144" rx="26" fill="#000" opacity="0.35" transform="translate(8 10)"/><rect x="-190" y="-72" width="380" height="144" rx="26" fill="${F2.red}"/><rect x="-174" y="-56" width="348" height="112" rx="18" fill="none" stroke="#fff" stroke-width="8"/>${f2Txt(0, 36, 104, '#fff', 'MITO')}</g></g>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#hMe'), { x: 500 }, { x: 0, duration: 0.45, ease: 'back.out(1.4)' }, s.t0 + 0.1);
        tl.fromTo($('#hCal'), { y: -900, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'bounce.out' }, K('cal') - 0.3);
        f2Pop(tl, $('#hQ'), K('cal') + 0.4, 0.35);
        tl.to($('#hQ'), { rotation: 12, transformOrigin: '50% 100%', duration: 0.4, yoyo: true, repeat: f2Reps(K('lie') - K('cal') - 0.8, 0.4), ease: 'sine.inOut' }, K('cal') + 0.8);
        tl.fromTo($('#hStamp'), { scale: 2.4, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('lie') - 0.2);
        tl.to($('#hCal'), { x: 8, duration: 0.05, yoyo: true, repeat: 5 }, K('lie') + 0.05);
      },
    },
    study: {
      bg: NAVY,
      html: () => svg(`${f2Stars(14)}
        ${[...Array(7)].map((_, i) => me(`sP${i}`, 150 + i * 120, 820, 0.55, SHIRTS[i], HAIRS[i])).join('')}
        <g id="sBadge"><g transform="translate(505 1010)"><rect x="-150" y="-46" width="300" height="92" rx="46" fill="${F2.yellow}"/>${f2Txt(0, 24, 64, F2.night, '× 96')}</g></g>
        ${card('sC1', 220, 1290, glass('sG', 0, 6, 1.1))}${card('sC2', 505, 1290, apple('sA', 0, 14, 1.1))}${card('sC3', 790, 1290, shoe('sS', 0, 6, 1.0))}`),
      anim(tl, s, K, $) {
        tl.fromTo($('[id^=sP]'), { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.6)', stagger: 0.05 }, K('people') - 0.45);
        f2Pop(tl, $('#sBadge'), K('people') + 0.1, 0.4);
        f2Pop(tl, $('#sC1'), K('water') - 0.1, 0.4);
        f2Pop(tl, $('#sC2'), K('fruit') - 0.1, 0.4);
        f2Pop(tl, $('#sC3'), K('run') - 0.1, 0.4);
        tl.to($('#sS'), { rotation: -10, transformOrigin: '50% 100%', duration: 0.18, yoyo: true, repeat: f2Reps(s.t1 - K('run') - 0.6, 0.18), ease: 'sine.inOut' }, K('run') + 0.3);
      },
    },
    avg: {
      bg: PURP,
      html: () => svg(`${f2Stars(14)}
        ${[0, 1, 2, 3].map((i) => `<g class="pg"><rect x="${210 + i * 6}" y="${800 + i * 4}" width="240" height="280" rx="20" fill="#fff" opacity="0.95"/></g>`).join('')}
        ${f2Calendar('aCal', 330, 960, 1.0, 'DÍA', '66', F2.green)}
        ${f2Txt(780, 720, 40, '#fff', 'AUTOMÁTICO')}
        <rect x="710" y="750" width="140" height="460" rx="40" fill="#000" opacity="0.25"/>
        <rect id="aFill" x="710" y="750" width="140" height="460" rx="40" fill="${F2.green}"/>
        <g id="aOk"><g transform="translate(780 980)"><circle r="56" fill="#fff"/><path d="M-26 0 L-6 22 L28 -22" stroke="${F2.greenD}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#aCal'), s.t0 + 0.1, 0.4);
        tl.set($('.pg'), { opacity: 0 }, s.t0);
        tl.fromTo($('.pg'), { x: 0, y: 0, rotation: 0, opacity: 1 }, { x: -420, y: -300, rotation: -50, opacity: 0, duration: 0.4, stagger: 0.3, ease: 'power2.in', immediateRender: false }, s.t0 + 0.4);
        tl.fromTo($('#aFill'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: K('stat') - s.t0 - 0.3, ease: 'power1.inOut' }, s.t0 + 0.3);
        f2Pop(tl, $('#aOk'), K('stat'), 0.4);
      },
    },
    some: {
      bg: NAVY,
      html: () => svg(`${f2Stars(10)}
        ${[...Array(254)].map((_, i) => { const c = i % 22, r = Math.floor(i / 22); return `<circle class="${i < 66 ? 'd1' : 'd2'}" cx="${166 + c * 35.5}" cy="${690 + r * 34}" r="12" fill="${i < 66 ? F2.green : F2.orange}"/>`; }).join('')}
        <rect x="-20" y="1180" width="1120" height="16" rx="8" fill="#2c4675"/>
        ${snail('soSnail', 200, 1178, 0.8)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('.d1'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.2, stagger: { amount: 0.45 } }, s.t0 + 0.15);
        tl.fromTo($('.d2'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.15, stagger: { amount: 0.5 } }, K('stat') - 0.25);
        tl.fromTo($('#soSnail'), { x: 0 }, { x: 560, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      },
    },
    skip: {
      bg: F2.cream, ink: F2.night,
      html: () => svg(`
        ${f2Txt(505, 740, 44, F2.greenD, 'FALTASTE 1 DÍA')}
        ${[...Array(10)].map((_, i) => dayDot('rA', 160 + i * 82, 820, i !== 4)).join('')}
        ${bar('bA', 140, 890, 740, F2.green)}
        <g id="okA"><g transform="translate(880 913)"><circle r="44" fill="#fff"/><circle r="36" fill="${F2.greenD}"/><path d="M-16 0 L-4 13 L18 -13" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>
        <g id="rowB">${f2Txt(505, 1090, 44, F2.red, 'A RATOS')}
        ${[1, 0, 0, 1, 0, 1, 0, 0, 0, 1].map((on, i) => dayDot('rB', 160 + i * 82, 1170, !!on)).join('')}</g>
        ${bar('bB', 140, 1240, 740, F2.red)}
        ${cross('xB', 500, 1263, 60)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('.rA'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, ease: 'back.out(2)', stagger: 0.04 }, K('skip') - 0.45);
        tl.fromTo($('#bA .fill'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, K('ok') - 0.4);
        f2Pop(tl, $('#okA'), K('ok'), 0.35);
        tl.fromTo($('#rowB'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, K('ratos') - 0.7);
        tl.fromTo($('#bB .fill'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 0.42, duration: 0.4, ease: 'power2.out' }, K('ratos') - 0.4);
        f2Pop(tl, $('#xB'), K('ratos'), 0.35);
      },
    },
    tip: {
      bg: TEAL,
      html: () => svg(`
        ${f2Calendar('tCal', 505, 860, 0.8, 'SEMANAS', '3', F2.orange)}
        <rect x="-20" y="1330" width="1120" height="700" fill="${TEALL}"/>
        ${bar('tBar', 120, 1260, 820, F2.yellow, 54)}
        <g id="tFlag"><g transform="translate(545 1260)"><rect x="-5" y="-170" width="10" height="170" fill="#fff"/><path d="M5 -170 L120 -140 L5 -110Z" fill="${F2.red}"/>${f2Txt(64, -192, 40, '#fff', '50%')}</g></g>
        ${me('tMe', 150, 1124, 0.62, F2.blue)}
        ${f2Txt(880, 1230, 40, '#fff', 'META')}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#tCal'), K('weeks') - 0.15, 0.4);
        tl.fromTo($('#tBar .fill'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 0.5, duration: K('half') - s.t0 - 0.3, ease: 'none' }, s.t0 + 0.3);
        tl.fromTo($('#tMe'), { x: 0 }, { x: 300, duration: K('half') - s.t0 - 0.3, ease: 'none' }, s.t0 + 0.3);
        tl.to($('#tMe'), { y: -14, duration: 0.2, yoyo: true, repeat: f2Reps(K('half') - s.t0 - 0.3, 0.2) | 1, ease: 'sine.inOut' }, s.t0 + 0.3);
        tl.fromTo($('#tFlag'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.35, ease: 'back.out(2)' }, K('half') - 0.1);
      },
    },
    const: {
      bg: F2.night,
      html: () => svg(`${f2Stars(14)}
        ${star('cStar', 290, 960, 190)}${f2Txt(290, 1230, 50, F2.yellow, 'PERFECTO')}
        ${cross('cX', 290, 960, 170)}
        ${[0, 1, 2, 3, 4].map((i) => `<rect class="st" x="${560 + i * 76}" y="${1400 - (i + 1) * 90}" width="76" height="${(i + 1) * 90}" fill="${i % 2 ? F2.blue : F2.blueD}"/>`).join('')}
        ${me('cMe', 598, 1218, 0.42, F2.orange)}
        ${f2Txt(745, 1460, 46, F2.green, 'CONSTANCIA')}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#cStar'), s.t0 + 0.15, 0.45);
        tl.fromTo($('#cX'), { scale: 0, rotation: -30, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(2)' }, K('perf') - 0.1);
        tl.to($('#cStar'), { opacity: 0.4, duration: 0.3 }, K('perf') + 0.1);
        tl.fromTo($('.st'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.3, stagger: 0.06, ease: 'back.out(1.6)' }, s.t0 + 0.3);
        tl.set($('#cMe'), { opacity: 0 }, s.t0);
        tl.to($('#cMe'), { opacity: 1, duration: 0.2 }, K('const') - 0.4);
        [1, 2, 3, 4].forEach((i) => tl.to($('#cMe'), { x: i * 76, y: -i * 90, duration: 0.3, ease: 'power2.out' }, K('const') + (i - 1) * 0.35));
      },
    },
    closing: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Cloud('clC1', 170, 1460, 1.0)}${f2Cloud('clC2', 880, 1470, 0.85)}
        ${f2Calendar('clCal', 260, 900, 0.8, 'DÍAS', '21')}${cross('clX', 260, 900, 150)}
        ${f2Calendar('clM1', 620, 870, 0.7, 'MES', '1', F2.green)}${f2Calendar('clM2', 800, 960, 0.7, 'MES', '2', F2.green)}
        ${f2Bubble('clB1', 230, 1250, 0.7, F2.yellow)}${f2Bubble('clB2', 520, 1300, 0.7, F2.green)}${f2Bubble('clB3', 810, 1250, 0.7, F2.pink)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#clC1'), { x: -40 }, { x: 40, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clC2'), { x: 30 }, { x: -30, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        f2Pop(tl, $('#clCal'), s.t0 + 0.15, 0.4);
        tl.fromTo($('#clX'), { scale: 0, rotation: -30, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(2)' }, K('no21') - 0.1);
        f2Pop(tl, $('#clM1'), K('months') - 0.5, 0.4);
        f2Pop(tl, $('#clM2'), K('months') - 0.2, 0.4);
        f2Pop(tl, $('#clB1'), K('comments') - 0.15, 0.35);
        f2Pop(tl, $('#clB2'), K('comments') - 0.05, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.05, 0.35);
      },
    },
  });
}
