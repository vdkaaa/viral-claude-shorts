// =====================================================================
//  Custom visuals for "¿South Park empezó como una tarjeta?" (flat 2D, HyperFrames).
//  Original art only: objects (card, paper, scissors, camera, VHS, TV) and generic people. No characters from the show.
//  Helpers live inside this block so they don't clash with other videos in the shared type-check scope.
// =====================================================================
{
  const XMAS = { red: '#e63946', redD: '#b8232f', green: '#2a9d5c', greenD: '#1f7a47', gold: '#ffc83d', snow: '#ffffff', wood: '#a0673a', woodD: '#7c4a25' };
  const FONT = 'font-family="Nunito, Avenir Next, Arial, sans-serif" font-weight="900"';

  // falling snow: deterministic dots spread over a frame taller than the screen, moved down by the timeline
  const snow = (id: string, n = 46) => `<g id="${id}">${[...Array(n)].map((_, i) => `<circle cx="${(i * 233) % 1080}" cy="${((i * 397) % 2300) - 300}" r="${4 + (i % 4) * 2}" fill="#fff" opacity="${0.35 + (i % 3) * 0.2}"/>`).join('')}</g>`;
  const snowAnim = (tl: gsap.core.Timeline, sel: string, s: Scene) => tl.fromTo(sel, { y: -160, x: 0 }, { y: 220, x: 30, duration: s.t1 - s.t0, ease: 'none' }, s.t0);

  // a Christmas card: cream inside with a big "?" and a red cover (class "cover") that opens to the left
  const xmasCard = (id: string, x: number, y: number, s = 1, inside = '?') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-200" y="-136" width="400" height="300" rx="26" fill="#000" opacity="0.18"/>
      <rect x="-210" y="-150" width="420" height="300" rx="26" fill="${F2.cream}"/>
      <text class="inside" x="0" y="70" text-anchor="middle" font-size="210" fill="${XMAS.red}" ${FONT}>${inside}</text>
      <g class="cover"><rect x="-210" y="-150" width="420" height="300" rx="26" fill="${XMAS.red}"/><rect x="-210" y="100" width="420" height="50" rx="0" fill="${XMAS.redD}"/>
        <path d="M0 -110 L80 40 L-80 40 Z" fill="${XMAS.green}"/><path d="M0 -60 L95 90 L-95 90 Z" fill="${XMAS.green}"/><rect x="-14" y="90" width="28" height="26" fill="${XMAS.wood}"/>
        <circle cx="0" cy="-118" r="16" fill="${XMAS.gold}"/><circle cx="-30" cy="20" r="9" fill="${XMAS.gold}"/><circle cx="34" cy="55" r="9" fill="#fff"/><circle cx="-45" cy="70" r="9" fill="#fff"/></g></g></g>`;

  // a generic person (body color, hair color), seen from the front
  const person = (id: string, x: number, y: number, s: number, shirt: string, hair: string, tie = false) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-62" y="0" width="124" height="190" rx="54" fill="${shirt}"/>${tie ? `<path d="M0 8 L16 30 L6 120 L0 132 L-6 120 L-16 30 Z" fill="${F2.red}"/><path d="M-30 0 L0 22 L30 0 Z" fill="#fff"/>` : ''}
      <circle cx="0" cy="-62" r="66" fill="#f2c29b"/><path d="M-66 -74 Q0 -165 66 -74 Q38 -110 0 -106 Q-38 -110 -66 -74Z" fill="${hair}"/>
      <circle cx="-22" cy="-62" r="9" fill="${F2.night}"/><circle cx="22" cy="-62" r="9" fill="${F2.night}"/><path d="M-18 -30 Q0 -16 18 -30" stroke="${F2.night}" stroke-width="7" fill="none" stroke-linecap="round"/></g></g>`;

  // a VHS tape
  const vhs = (id: string, x: number, y: number, s = 1, label = XMAS.gold) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-150" y="-80" width="300" height="170" rx="16" fill="#000" opacity="0.2"/><rect x="-160" y="-92" width="320" height="174" rx="16" fill="#2b2d42"/>
      <rect x="-120" y="-72" width="240" height="56" rx="8" fill="${label}"/><rect x="-96" y="0" width="192" height="60" rx="30" fill="#14152a"/>
      <circle cx="-56" cy="30" r="22" fill="#e7e7f0"/><circle cx="56" cy="30" r="22" fill="#e7e7f0"/><circle cx="-56" cy="30" r="8" fill="#2b2d42"/><circle cx="56" cy="30" r="8" fill="#2b2d42"/></g></g>`;

  const heart = (id: string, x: number, y: number, s = 1, c = F2.red) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M0 30 C -60 -10, -40 -60, 0 -30 C 40 -60, 60 -10, 0 30Z" fill="${c}"/></g></g>`;
  const bubble = (id: string, x: number, y: number, s: number, c: string, txt = '') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-110" y="-70" width="220" height="130" rx="40" fill="${c}"/><path d="M-50 50 L-80 100 L-10 56 Z" fill="${c}"/>
      ${txt ? `<text x="0" y="22" text-anchor="middle" font-size="76" fill="${F2.night}" ${FONT}>${txt}</text>` : `<circle cx="-50" cy="-5" r="14" fill="${F2.night}"/><circle cx="0" cy="-5" r="14" fill="${F2.night}"/><circle cx="50" cy="-5" r="14" fill="${F2.night}"/>`}</g></g>`;

  defineVisuals({
    hook: {
      bg: F2.night,
      html: () => svg(`
        ${snow('snowH')}
        ${f2Hill('groundH', 1390, '#eaf3ff', '#c7d9f2', 40)}
        ${xmasCard('cardH', 505, 1080, 1.5)}`),
      anim(tl, s, K, $) {
        snowAnim(tl, $('#snowH'), s);
        tl.fromTo($('#groundH'), { y: 300 }, { y: 0, duration: 0.5, ease: 'power3.out' }, s.t0 + 0.05);
        f2Pop(tl, $('#cardH'), s.t0 + 0.25, 0.5);
        tl.fromTo($('#cardH .cover'), { scaleX: 1, transformOrigin: '0% 50%' }, { scaleX: 0, duration: 0.4, ease: 'power2.in' }, K('card') - 0.15);
        tl.fromTo($('#cardH .inside'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, K('card') + 0.2);
        tl.to($('#cardH'), { rotation: 4, transformOrigin: '50% 50%', duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 3 }, K('card') + 0.6);
      },
    },
    students: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`
        <rect width="1080" height="1920" fill="${F2.sky}"/><rect y="1290" width="1080" height="700" fill="${F2.skyD}" opacity="0.4"/>
        ${person('p1', 310, 960, 1.3, F2.green, '#3b2a24')}
        ${person('p2', 700, 960, 1.3, F2.purple, '#8a4b20')}
        <g id="table"><rect x="80" y="1205" width="860" height="56" rx="16" fill="${XMAS.wood}"/><rect x="80" y="1245" width="860" height="22" rx="8" fill="${XMAS.woodD}"/>
          <rect x="140" y="1260" width="34" height="200" fill="${XMAS.woodD}"/><rect x="846" y="1260" width="34" height="200" fill="${XMAS.woodD}"/></g>
        <g id="scraps">${[...Array(10)].map((_, i) => { const x = 170 + i * 74, y = 1150 + (i % 3) * 18, c = RAINBOW[i % 6], r = (i * 37) % 60 - 30;
          return i % 2 ? `<rect x="${x - 30}" y="${y - 22}" width="60" height="44" rx="6" fill="${c}" transform="rotate(${r} ${x} ${y})"/>` : `<path d="M${x} ${y - 32} L${x + 32} ${y + 22} L${x - 32} ${y + 22}Z" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`; }).join('')}</g>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#table'), { y: 400 }, { y: 0, duration: 0.5, ease: 'power3.out' }, s.t0 + 0.05);
        f2Pop(tl, $('#p1'), K('two') - 0.1, 0.45);
        f2Pop(tl, $('#p2'), K('two') + 0.1, 0.45);
        tl.to($('#p1'), { y: -14, duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: 7 }, K('two') + 0.5);
        tl.to($('#p2'), { y: -14, duration: 0.55, ease: 'sine.inOut', yoyo: true, repeat: 6 }, K('two') + 0.6);
        tl.fromTo($('#scraps > *'), { y: -520, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'bounce.out', stagger: 0.015 }, K('paper') - 0.15);
      },
    },
    tools: {
      bg: '#1f3566',
      html: () => svg(`
        <g id="tCard"><g transform="translate(270 880) scale(1.1) rotate(-8)"><rect x="-120" y="-150" width="240" height="300" rx="14" fill="#000" opacity="0.2"/><rect x="-130" y="-160" width="240" height="300" rx="14" fill="${XMAS.green}"/>
          <path d="M-10 -80 L14 -24 L74 -24 L26 12 L44 70 L-10 36 L-64 70 L-46 12 L-94 -24 L-34 -24Z" fill="${XMAS.greenD}"/></g></g>
        <g id="tScissors"><g transform="translate(700 900) scale(1.15)">
          <g class="bladeA"><path d="M-6 0 L170 -34 L176 -14 Z" fill="#e7ecf5"/><circle cx="-70" cy="44" r="42" fill="none" stroke="${F2.red}" stroke-width="24"/><rect x="-44" y="4" width="50" height="20" rx="10" fill="${F2.red}" transform="rotate(-30)"/></g>
          <g class="bladeB"><path d="M-6 0 L170 34 L176 14 Z" fill="#c9d3ea"/><circle cx="-70" cy="-44" r="42" fill="none" stroke="${F2.orange}" stroke-width="24"/><rect x="-44" y="-24" width="50" height="20" rx="10" fill="${F2.orange}" transform="rotate(30)"/></g>
          <circle r="12" fill="${F2.night}"/></g></g>
        <g id="tCamera"><g transform="translate(520 1270) scale(1.25)">
          <rect x="-120" y="-70" width="240" height="170" rx="22" fill="#000" opacity="0.2"/><rect x="-130" y="-84" width="240" height="170" rx="22" fill="${F2.gray}"/>
          <rect x="-90" y="-116" width="80" height="40" rx="10" fill="${F2.gray}"/><circle cx="-10" cy="0" r="62" fill="${F2.night}"/><circle cx="-10" cy="0" r="40" fill="${F2.blue}"/>
          <circle class="shine" cx="-26" cy="-16" r="12" fill="#fff" opacity="0.85"/><circle cx="76" cy="-56" r="12" fill="${F2.red}"/></g></g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#tCard'), K('card') - 0.15, 0.45);
        f2Pop(tl, $('#tScissors'), K('scissors') - 0.15, 0.45);
        tl.to($('#tScissors .bladeA'), { rotation: 12, svgOrigin: '700 900', duration: 0.18, ease: 'sine.inOut', yoyo: true, repeat: Math.ceil((s.t1 - K('scissors')) / 0.18) }, K('scissors') + 0.3);
        tl.to($('#tScissors .bladeB'), { rotation: -12, svgOrigin: '700 900', duration: 0.18, ease: 'sine.inOut', yoyo: true, repeat: Math.ceil((s.t1 - K('scissors')) / 0.18) }, K('scissors') + 0.3);
        f2Pop(tl, $('#tCamera'), K('camera') - 0.15, 0.45);
        tl.fromTo($('#tCamera .shine'), { opacity: 0.85 }, { opacity: 0.2, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('camera') + 0.35);
      },
    },
    exec: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`
        <rect width="1080" height="1920" fill="${F2.sky}"/><rect y="1330" width="1080" height="600" fill="${F2.skyD}" opacity="0.4"/>
        ${person('boss', 290, 1120, 1.4, '#2b2d42', '#1d1d1d', true)}
        ${bubble('ask', 700, 840, 1.35, '#fff', '?')}
        <g id="gift"><g transform="translate(720 1260) scale(1.25)">${vhs('tapeE', 0, 0, 0.85, XMAS.green).replace('id="tapeE"', '')}
          <rect x="-14" y="-82" width="28" height="160" fill="${XMAS.red}"/><path d="M0 -80 C -60 -150, -90 -70, 0 -80 C 90 -70, 60 -150, 0 -80Z" fill="${XMAS.red}"/></g></g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#boss'), K('exec') - 0.2, 0.5);
        tl.to($('#boss'), { rotation: 3, transformOrigin: '50% 100%', duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: Math.ceil((s.t1 - K('exec')) / 0.6) }, K('exec') + 0.4);
        f2Pop(tl, $('#ask'), K('weird') - 0.2, 0.45);
        f2Pop(tl, $('#gift'), K('gift') - 0.1, 0.5);
        tl.to($('#gift'), { y: -16, duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: Math.ceil((s.t1 - K('gift')) / 0.45) }, K('gift') + 0.5);
      },
    },
    fight: {
      bg: F2.night,
      html: () => svg(`
        ${snow('snowF', 30)}
        <g id="left"><g transform="translate(270 1060) rotate(-6)"><rect x="-150" y="-200" width="300" height="400" rx="30" fill="#000" opacity="0.2"/><rect x="-160" y="-212" width="300" height="400" rx="30" fill="${F2.blue}"/>
          <ellipse cx="-10" cy="-110" rx="80" ry="22" fill="none" stroke="${XMAS.gold}" stroke-width="16"/><circle cx="-10" cy="-30" r="58" fill="#fff" opacity="0.92"/>
          <path d="M-90 150 Q-10 10 70 150Z" fill="#fff" opacity="0.92"/></g></g>
        <g id="right"><g transform="translate(740 1060) rotate(6)"><rect x="-150" y="-200" width="300" height="400" rx="30" fill="#000" opacity="0.2"/><rect x="-160" y="-212" width="300" height="400" rx="30" fill="${XMAS.red}"/>
          <path d="M-90 -60 Q-20 -200 70 -110 L60 -60 Z" fill="#fff"/><path d="M-90 -60 Q-10 -230 80 -150 L60 -70 Z" fill="${XMAS.redD}"/><circle cx="84" cy="-150" r="26" fill="#fff"/>
          <rect x="-110" y="-74" width="200" height="40" rx="20" fill="#fff"/><path d="M-90 -10 Q-10 200 70 -10Z" fill="#fff"/></g></g>
        <g id="vs"><g transform="translate(505 1060)"><circle r="92" fill="${XMAS.gold}"/><text y="34" text-anchor="middle" font-size="96" fill="${F2.night}" ${FONT}>VS</text></g></g>`),
      anim(tl, s, K, $) {
        snowAnim(tl, $('#snowF'), s);
        f2Pop(tl, $('#vs'), K('fight') - 0.15, 0.45);
        tl.fromTo($('#left'), { x: -560 }, { x: 0, duration: 0.4, ease: 'back.out(1.6)' }, K('jesus') - 0.2);
        tl.fromTo($('#right'), { x: 560 }, { x: 0, duration: 0.4, ease: 'back.out(1.6)' }, K('santa') - 0.2);
        tl.to($('#left'), { x: 24, duration: 0.1, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('santa') + 0.25);
        tl.to($('#right'), { x: -24, duration: 0.1, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('santa') + 0.25);
      },
    },
    vhs: {
      bg: '#2a1f5c',
      html: () => {
        const ring = [...Array(6)].map((_, i) => { const a = -Math.PI / 2 + i * Math.PI / 3; return [505 + Math.cos(a) * 330, 1090 + Math.sin(a) * 300]; });
        return svg(`
          <g id="links">${ring.map(([x, y], i) => { const [x2, y2] = ring[(i + 1) % 6]; return f2Arrow('l' + i, x + (x2 - x) * 0.3, y + (y2 - y) * 0.3, x + (x2 - x) * 0.7, y + (y2 - y) * 0.7, F2.pink, 12); }).join('')}</g>
          <g id="copies">${ring.map(([x, y], i) => vhs('cp' + i, x, y, 0.62, RAINBOW[i])).join('')}</g>
          ${vhs('mainTape', 505, 1090, 1.2)}
          <g id="web"><g transform="translate(505 1090)"><circle r="130" fill="${F2.blue}"/><ellipse rx="56" ry="130" fill="none" stroke="#fff" stroke-width="12"/>
            <line x1="-130" y1="0" x2="130" y2="0" stroke="#fff" stroke-width="12"/><path d="M-112 -64 Q0 -40 112 -64 M-112 64 Q0 40 112 64" stroke="#fff" stroke-width="12" fill="none"/>
            <circle r="130" fill="none" stroke="#fff" stroke-width="12"/></g></g>`);
      },
      anim(tl, s, K, $) {
        f2Pop(tl, $('#mainTape'), s.t0 + 0.15, 0.5);
        tl.to($('#mainTape'), { rotation: -6, transformOrigin: '50% 50%', duration: 0.12, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('nobody') + 0.1);
        tl.fromTo($('#copies > g'), { scale: 0, x: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.02 }, K('vhs') - 0.1);
        tl.fromTo($('#links > g'), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.03 }, K('hand') - 0.1);
        tl.to($('#links'), { scale: 1.05, svgOrigin: '505 1090', duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('hand') + 0.3);
        tl.to($('#mainTape'), { scale: 0, transformOrigin: '50% 50%', duration: 0.25, ease: 'power2.in' }, K('web') - 0.2);
        f2Pop(tl, $('#web'), K('web'), 0.45);
      },
    },
    viral: {
      bg: F2.night,
      html: () => svg(`
        <g id="burst">${[...Array(12)].map((_, i) => { const a = i / 12 * Math.PI * 2, x = 505 + Math.cos(a) * 360, y = 1060 + Math.sin(a) * 330;
          return i % 3 === 2 ? f2Arrow('sh' + i, x - 34, y + 20, x + 34, y - 20, F2.green, 14) : heart('h' + i, x, y, 0.9, i % 2 ? F2.red : F2.pink); }).join('')}</g>
        <g id="monitor"><g transform="translate(505 1060)">
          <rect x="-220" y="-170" width="440" height="320" rx="34" fill="#000" opacity="0.2"/><rect x="-230" y="-184" width="440" height="320" rx="34" fill="#e9dcc3"/>
          <rect x="-196" y="-152" width="372" height="232" rx="18" fill="#14213d"/>
          <g class="bars">${[0, 1, 2, 3, 4].map((i) => `<rect x="${-170 + i * 72}" y="${60 - (i + 1) * 36}" width="50" height="${(i + 1) * 36}" rx="8" fill="${RAINBOW[i + 1]}"/>`).join('')}</g>
          <rect x="-70" y="136" width="120" height="40" fill="#cfc0a3"/><rect x="-140" y="170" width="260" height="30" rx="12" fill="#e9dcc3"/></g></g>
        <g id="badge"><g transform="translate(760 820) rotate(10)"><rect x="-150" y="-56" width="300" height="112" rx="56" fill="${XMAS.gold}"/>
          <text y="26" text-anchor="middle" font-size="68" fill="${F2.night}" ${FONT}>¿VIRAL?</text></g></g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#monitor'), s.t0 + 0.1, 0.5);
        tl.fromTo($('#monitor .bars rect'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.03 }, K('viral') - 0.25);
        tl.fromTo($('#burst > g'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2.5)', stagger: 0.012 }, K('viral') - 0.05);
        tl.to($('#burst'), { rotation: 25, svgOrigin: '505 1060', duration: s.t1 - K('viral'), ease: 'none' }, K('viral'));
        f2Pop(tl, $('#badge'), K('word') - 0.15, 0.45);
        tl.to($('#monitor'), { scale: 1.06, transformOrigin: '50% 50%', duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, K('word') + 0.2);
      },
    },
    premiere: {
      bg: F2.night,
      html: () => svg(`
        ${snow('snowP', 26)}
        <g id="tv"><g transform="translate(505 960)">
          <line x1="-30" y1="-200" x2="-110" y2="-300" stroke="${F2.gray}" stroke-width="10" stroke-linecap="round"/><line x1="30" y1="-200" x2="110" y2="-300" stroke="${F2.gray}" stroke-width="10" stroke-linecap="round"/>
          <rect x="-240" y="-190" width="480" height="340" rx="40" fill="#000" opacity="0.2"/><rect x="-250" y="-204" width="480" height="340" rx="40" fill="${XMAS.wood}"/>
          <rect x="-220" y="-176" width="330" height="284" rx="26" fill="#0b1226"/>
          <g class="colorbars">${RAINBOW.map((c, i) => `<rect x="${-220 + i * 55}" y="-176" width="55" height="284" fill="${c}"/>`).join('')}</g>
          <path class="star" d="M-55 -110 L-34 -52 L28 -52 L-22 -16 L-4 44 L-55 8 L-106 44 L-88 -16 L-138 -52 L-76 -52Z" fill="${XMAS.gold}"/>
          <circle cx="170" cy="-100" r="24" fill="${XMAS.woodD}"/><circle cx="170" cy="-24" r="24" fill="${XMAS.woodD}"/><rect x="146" y="40" width="48" height="10" rx="5" fill="${XMAS.woodD}"/></g></g>`),
      anim(tl, s, K, $) {
        snowAnim(tl, $('#snowP'), s);
        f2Pop(tl, $('#tv'), s.t0 + 0.1, 0.5);
        tl.set($('#tv .colorbars'), { opacity: 0 }, s.t0);
        tl.set($('#tv .star'), { opacity: 0 }, s.t0);
        tl.fromTo($('#tv .colorbars'), { opacity: 0, scaleY: 0.02, transformOrigin: '50% 50%' }, { opacity: 1, scaleY: 1, duration: 0.3, ease: 'power2.out' }, K('stat') - 0.1);
        tl.to($('#tv .colorbars'), { opacity: 0, duration: 0.25 }, K('on') - 0.25);
        tl.fromTo($('#tv .star'), { opacity: 0, scale: 0, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, K('on') - 0.05);
        tl.to($('#tv .star'), { rotation: 20, transformOrigin: '50% 50%', duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut' }, K('on') + 0.45);
      },
    },
    closing: {
      bg: F2.night,
      html: () => svg(`
        ${snow('snowC')}
        ${f2Hill('groundC', 1400, '#eaf3ff', '#c7d9f2', 40)}
        ${xmasCard('cardC', 505, 1040, 1.3, '!')}
        ${bubble('c1', 230, 740, 0.8, F2.green)}${bubble('c2', 790, 750, 0.8, XMAS.gold)}${bubble('c3', 250, 1350, 0.7, F2.pink)}${bubble('c4', 770, 1350, 0.75, '#fff')}`),
      anim(tl, s, K, $) {
        snowAnim(tl, $('#snowC'), s);
        tl.fromTo($('#groundC'), { y: 300 }, { y: 0, duration: 0.5, ease: 'power3.out' }, s.t0 + 0.05);
        f2Pop(tl, $('#cardC'), s.t0 + 0.15, 0.5);
        tl.fromTo($('#cardC .cover'), { scaleX: 1, transformOrigin: '0% 50%' }, { scaleX: 0, duration: 0.4, ease: 'power2.in' }, K('card') - 0.1);
        f2Pop(tl, $('#c1'), K('ask') - 0.1, 0.4);
        f2Pop(tl, $('#c2'), K('ask') + 0.15, 0.4);
        f2Pop(tl, $('#c3'), K('comments') - 0.1, 0.4);
        f2Pop(tl, $('#c4'), K('comments') + 0.1, 0.4);
      },
    },
  });
}
