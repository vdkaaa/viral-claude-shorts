// =====================================================================
//  Custom visuals for "Fueron a los Oscar vestidos de mujer" (flat 2D, HyperFrames).
//  The two creators as ORIGINAL cartoon caricatures: big round heads whose top half flips up when they talk (a nod to
//  the show's "Canadian" style, with our own design: own hair, colours and faces). Generic gold trophy (never the real
//  statuette); no drugs shown (just colour swirls and spiral eyes). Shared props come from styles/flat2d/library.ts.
// =====================================================================
{
  const PINK = '#ff7eb6', PINKD = '#e85d9c', GREEN = '#2fbf71', GREEND = '#22995a', CARPET = '#d7263d', CARPETD = '#a3182c';
  const SKIN = '#f2c29b', SKIND = '#e3a77b', MOUTH = '#7a2f2f';
  const dressPath = 'M-46 -330 L46 -330 L58 -236 L132 0 L-132 0 L-58 -236Z';
  const dressShape = (c: string, cd: string) => `<path d="${dressPath}" fill="${c}"/><path d="M0 -330 L46 -330 L58 -236 L132 0 L0 0Z" fill="${cd}"/>
      <rect x="-60" y="-246" width="120" height="20" rx="10" fill="#fff" opacity="0.5"/><path d="M-40 -330 L-30 -370 M40 -330 L30 -370" stroke="${c}" stroke-width="10" stroke-linecap="round"/>`;
  const dress = (id: string, x: number, y: number, s: number, c: string, cd: string) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">${dressShape(c, cd)}</g></g>`;

  // ---- the cartoon creators ----
  // Origin at the feet, ~600 units tall. Animatable parts (all positioned in local coords, pivots given):
  //   .top  = top half of the head (flips up to talk; pivot -125 -470)   .eyes = eyes (blink)   .spir = spiral eyes (hidden)
  //   .armL / .armR = arms (pivots -88 -312 / 88 -312)                     .dr   = dress over the suit
  type Hair = 'spiky' | 'curly';
  const hair = (h: Hair) => h === 'spiky'
    ? `<path d="M-110 -540 L-96 -610 L-62 -566 L-40 -628 L-10 -572 L18 -632 L40 -570 L72 -620 L84 -560 L112 -590 L112 -530 Q0 -600 -110 -540Z" fill="#3b2a24"/>`
    : `${[[-92, -548, 34], [-50, -584, 38], [0, -598, 40], [50, -584, 38], [92, -548, 34], [-20, -560, 30], [30, -562, 30]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#8a5a33"/>`).join('')}`;
  const toon = (id: string, x: number, y: number, s: number, h: Hair, dc: string, dcd: string, suit = '#2b2d42') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="8" rx="130" ry="16" fill="#000" opacity="0.2"/>
      <rect x="-52" y="-120" width="38" height="118" rx="14" fill="#1d2235"/><rect x="14" y="-120" width="38" height="118" rx="14" fill="#1d2235"/>
      <ellipse cx="-38" cy="-4" rx="34" ry="14" fill="#111"/><ellipse cx="38" cy="-4" rx="34" ry="14" fill="#111"/>
      <g class="armL"><rect x="-108" y="-326" width="40" height="90" rx="20" fill="${suit}"/><rect x="-104" y="-256" width="32" height="96" rx="16" fill="${SKIN}"/><circle cx="-88" cy="-160" r="22" fill="${SKIN}"/></g>
      <g class="armR"><rect x="68" y="-326" width="40" height="90" rx="20" fill="${suit}"/><rect x="72" y="-256" width="32" height="96" rx="16" fill="${SKIN}"/><circle cx="88" cy="-160" r="22" fill="${SKIN}"/></g>
      <rect x="-76" y="-340" width="152" height="240" rx="46" fill="${suit}"/>
      <path d="M-30 -340 L0 -280 L30 -340Z" fill="#fff"/><path d="M-10 -330 L10 -330 L14 -250 L0 -236 L-14 -250Z" fill="${F2.red}"/>
      <g class="dr">${dressShape(dc, dcd)}</g>
      <path d="M-125 -470 A125 115 0 0 0 125 -470Z" fill="${SKIN}"/><path d="M40 -470 L125 -470 A125 115 0 0 1 40 -362Z" fill="${SKIND}" opacity="0.5"/>
      <circle cx="-70" cy="-430" r="16" fill="#ff9aa2" opacity="0.6"/><circle cx="70" cy="-430" r="16" fill="#ff9aa2" opacity="0.6"/>
      <path d="M-112 -470 A112 64 0 0 1 112 -470Z" fill="${MOUTH}"/><path d="M-96 -470 L96 -470 L90 -456 L-90 -456Z" fill="#fff"/>
      <g class="top"><path d="M-125 -470 A125 115 0 0 1 125 -470Z" fill="${SKIN}"/><rect x="-125" y="-474" width="250" height="6" rx="3" fill="${SKIND}"/>
        ${hair(h)}
        <path d="M-66 -560 L-20 -552 M20 -552 L66 -560" stroke="#3b2a24" stroke-width="9" stroke-linecap="round"/>
        <g class="eyes"><ellipse cx="-40" cy="-516" rx="24" ry="28" fill="#fff"/><ellipse cx="40" cy="-516" rx="24" ry="28" fill="#fff"/>
          <circle cx="-34" cy="-510" r="11" fill="#111"/><circle cx="34" cy="-510" r="11" fill="#111"/></g>
        <g class="spir" opacity="0">${[-40, 40].map((ex) => `<g class="sp"><circle cx="${ex}" cy="-516" r="26" fill="#fff"/><path d="M${ex} -516 m-4 0 a4 4 0 1 1 8 0 a8 8 0 1 1 -16 0 a12 12 0 1 1 24 0 a16 16 0 1 1 -32 0" stroke="#8b6cff" stroke-width="5" fill="none"/></g>`).join('')}</g></g></g></g>`;
  // talk: the top of the head flaps for `dur` seconds (always ends closed)
  const talk = (tl: gsap.core.Timeline, $: (s: string) => string, sel: string, t: number, dur: number, sp = 0.13, ang = -16) => {
    let n = Math.floor(dur / sp); if (n % 2 === 1) n -= 1; if (n < 2) return;   // even number of half-flaps -> odd yoyo repeats -> ends closed
    tl.fromTo($(`${sel} .top`), { rotation: 0, svgOrigin: '-125 -470' }, { rotation: ang, svgOrigin: '-125 -470', duration: sp, yoyo: true, repeat: n - 1, ease: 'sine.inOut', immediateRender: false }, t);
  };
  const blink = (tl: gsap.core.Timeline, $: (s: string) => string, sel: string, times: number[]) =>
    times.forEach((t) => tl.to($(`${sel} .eyes`), { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.07, yoyo: true, repeat: 1 }, t));
  const arm = (tl: gsap.core.Timeline, $: (s: string) => string, sel: string, side: 'L' | 'R', t: number, ang: number, d = 0.3) =>
    tl.to($(`${sel} .arm${side}`), { rotation: ang, svgOrigin: side === 'L' ? '-88 -312' : '88 -312', duration: d, ease: 'back.out(2)' }, t);
  const wave = (tl: gsap.core.Timeline, $: (s: string) => string, sel: string, side: 'L' | 'R', t: number, dur: number) => {
    const up = side === 'L' ? 150 : -150, o = side === 'L' ? '-88 -312' : '88 -312';
    tl.to($(`${sel} .arm${side}`), { rotation: up, svgOrigin: o, duration: 0.25, ease: 'back.out(2)' }, t);
    tl.to($(`${sel} .arm${side}`), { rotation: up + (side === 'L' ? -25 : 25), svgOrigin: o, duration: 0.18, yoyo: true, repeat: f2Reps(dur - 0.5, 0.18) | 1, ease: 'sine.inOut' }, t + 0.25);
    tl.to($(`${sel} .arm${side}`), { rotation: 0, svgOrigin: o, duration: 0.25 }, t + dur - 0.25);
  };

  const carpet = (id: string) => `<g id="${id}"><path d="M380 900 L700 900 L1000 1920 L80 1920Z" fill="${CARPET}"/><path d="M540 900 L700 900 L1000 1920 L540 1920Z" fill="${CARPETD}" opacity="0.5"/></g>`;
  const beams = (id: string) => `<g id="${id}"><path d="M120 300 L200 300 L520 1500 L260 1500Z" fill="#fff" opacity="0.06"/><path d="M880 300 L960 300 L820 1500 L560 1500Z" fill="#fff" opacity="0.06"/></g>`;
  const note = (x: number, y: number, s: number, c: string) => `<g class="nt"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-14" cy="40" rx="26" ry="20" fill="${c}"/><rect x="6" y="-50" width="12" height="94" fill="${c}"/><path d="M6 -50 Q50 -40 40 0 Q36 -24 18 -26Z" fill="${c}"/></g></g>`;
  const LEAF = [[0, -120], [22, -72], [52, -84], [42, -30], [94, -52], [84, -18], [116, 0], [62, 22], [72, 54], [18, 40], [8, 96]];
  const leafPath = 'M' + [...LEAF, ...LEAF.slice(0, -1).reverse().map(([x, y]) => [-x, y])].map(([x, y]) => `${x} ${y}`).join(' L') + 'Z';
  const leaf = (id: string, x: number, y: number, s: number) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="${leafPath}" fill="${F2.red}"/><rect x="-6" y="80" width="12" height="70" rx="6" fill="${F2.red}"/></g></g>`;
  const flash = (id: string, x: number, y: number) => `<g id="${id}"><g transform="translate(${x} ${y})"><path d="M0 -70 L16 -16 L70 0 L16 16 L0 70 L-16 16 L-70 0 L-16 -16Z" fill="#fff"/><circle r="22" fill="#fff"/></g></g>`;
  const swirl = (id: string, cx: number, cy: number) => `<g id="${id}">${RAINBOW.map((c, i) => `<circle cx="${cx}" cy="${cy}" r="${380 - i * 58}" fill="${c}" opacity="0.55"/>`).join('')}
      ${[...Array(8)].map((_, i) => { const a = i / 8 * Math.PI * 2; return `<path d="M${cx} ${cy} L${cx + Math.cos(a) * 420} ${cy + Math.sin(a) * 420} L${cx + Math.cos(a + 0.22) * 420} ${cy + Math.sin(a + 0.22) * 420}Z" fill="#fff" opacity="0.12"/>`; }).join('')}</g>`;
  const star5 = (c: string) => `<path d="M0 -30 L9 -10 L30 -9 L14 5 L19 27 L0 15 L-19 27 L-14 5 L-30 -9 L-9 -10Z" fill="${c}"/>`;
  const hideDress = (tl: gsap.core.Timeline, $: (s: string) => string, sel: string, t: number) => tl.set($(`${sel} .dr`), { opacity: 0 }, t);
  const dropDress = (tl: gsap.core.Timeline, $: (s: string) => string, sel: string, t: number) =>
    tl.fromTo($(`${sel} .dr`), { y: -450, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'bounce.out', immediateRender: false }, t);

  defineVisuals({
    hook: {
      bg: F2.night,
      html: () => svg(`${f2Stars()}${beams('hBeams')}
        ${carpet('hCarpet')}
        ${f2Trophy('hCup', 540, 790, 0.8, 'OSCAR')}
        ${toon('hT', 270, 1440, 0.95, 'spiky', PINK, PINKD)}${toon('hM', 800, 1440, 0.95, 'curly', GREEN, GREEND)}`),
      anim(tl, s, K, $) {
        hideDress(tl, $, '#hT', s.t0); hideDress(tl, $, '#hM', s.t0);
        tl.fromTo($('#hCarpet'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.45, ease: 'power3.out' }, K('carpet') - 0.35);
        f2Pop(tl, $('#hCup'), K('carpet') - 0.05, 0.4);
        tl.fromTo($('#hT'), { x: -600 }, { x: 0, duration: 0.45, ease: 'power3.out' }, s.t0 + 0.1);
        tl.fromTo($('#hM'), { x: 600 }, { x: 0, duration: 0.45, ease: 'power3.out' }, s.t0 + 0.2);
        wave(tl, $, '#hT', 'R', s.t0 + 0.6, 1.2);
        wave(tl, $, '#hM', 'L', s.t0 + 0.7, 1.2);
        blink(tl, $, '#hT', [s.t0 + 1.9]); blink(tl, $, '#hM', [s.t0 + 1.6]);
        dropDress(tl, $, '#hT', K('dress') - 0.3);
        dropDress(tl, $, '#hM', K('dress') - 0.15);
        talk(tl, $, '#hM', K('dress') + 0.3, s.t1 - K('dress') - 0.4, 0.09, -20);
      },
    },
    song: {
      bg: '#2a1f5c',
      html: () => svg(`${f2Stars(18)}
        <rect x="-20" y="1400" width="1120" height="600" fill="#3a2c7a"/>
        ${toon('sT', 290, 1440, 1.0, 'spiky', PINK, PINKD)}
        <g id="sMic"><rect x="380" y="1050" width="16" height="360" rx="8" fill="#555b6e"/><rect x="360" y="990" width="56" height="90" rx="28" fill="#8d99ae"/></g>
        <g id="sNotes">${note(470, 800, 1.1, F2.yellow)}${note(590, 900, 0.9, '#fff')}${note(500, 1000, 0.8, F2.pink)}</g>
        ${leaf('sLeaf', 790, 860, 1.0)}
        <g id="sEnv"><g transform="translate(760 1220)"><rect x="-160" y="-110" width="320" height="220" rx="18" fill="${F2.yellow}"/><path d="M-160 -110 L0 20 L160 -110" fill="#e0a21f"/>
          <rect x="-140" y="40" width="280" height="56" rx="14" fill="${F2.night}"/>${f2Txt(0, 80, 34, F2.yellow, 'NOMINADA')}</g></g>`),
      anim(tl, s, K, $) {
        hideDress(tl, $, '#sT', s.t0);
        tl.fromTo($('#sT'), { y: 700 }, { y: 0, duration: 0.4, ease: 'back.out(1.3)' }, s.t0 + 0.05);
        f2Pop(tl, $('#sMic'), s.t0 + 0.2, 0.35);
        arm(tl, $, '#sT', 'R', s.t0 + 0.4, -60);
        talk(tl, $, '#sT', s.t0 + 0.5, s.t1 - s.t0 - 0.7, 0.16, -22);
        tl.to($('#sT'), { rotation: 4, transformOrigin: '50% 100%', duration: 0.5, yoyo: true, repeat: f2Reps(s.t1 - s.t0 - 0.6, 0.5), ease: 'sine.inOut' }, s.t0 + 0.5);
        blink(tl, $, '#sT', [s.t0 + 2.2, s.t0 + 4.8]);
        tl.fromTo($('#sNotes > g'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.08 }, K('notes') - 0.1);
        tl.to($('#sNotes > g'), { y: -16, duration: 0.5, yoyo: true, repeat: f2Reps(s.t1 - K('notes'), 0.5), ease: 'sine.inOut', stagger: 0.15 }, K('notes') + 0.4);
        tl.fromTo($('#sLeaf'), { scale: 0, rotation: -60, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2)' }, K('leaf') - 0.15);
        tl.fromTo($('#sEnv'), { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }, K('nominee') - 0.3);
      },
    },
    dresses: {
      bg: F2.night,
      html: () => svg(`${f2Stars(16)}${beams('dBeams')}
        <rect x="-20" y="1380" width="1120" height="600" fill="${CARPET}"/><rect x="-20" y="1380" width="1120" height="20" fill="${CARPETD}"/>
        ${toon('dT', 300, 1420, 1.1, 'spiky', PINK, PINKD)}${toon('dM', 740, 1420, 1.1, 'curly', GREEN, GREEND)}
        ${flash('dFl1', 150, 780)}${flash('dFl2', 920, 740)}${flash('dFl3', 930, 1120)}`),
      anim(tl, s, K, $) {
        hideDress(tl, $, '#dT', s.t0); hideDress(tl, $, '#dM', s.t0);
        tl.fromTo($('#dBeams'), { opacity: 0.5 }, { opacity: 1, duration: 0.6, yoyo: true, repeat: f2Reps(s.t1 - s.t0, 0.6), ease: 'sine.inOut' }, s.t0);
        tl.fromTo($('#dT'), { x: -700 }, { x: 0, duration: 0.45, ease: 'power3.out' }, K('duo') - 0.3);
        tl.fromTo($('#dM'), { x: 700 }, { x: 0, duration: 0.45, ease: 'power3.out' }, K('duo') - 0.2);
        wave(tl, $, '#dT', 'R', K('duo') + 0.3, 1.6);
        wave(tl, $, '#dM', 'L', K('duo') + 0.5, 1.6);
        talk(tl, $, '#dT', K('duo') + 2.0, 1.2); talk(tl, $, '#dM', K('duo') + 2.3, 1.0);
        blink(tl, $, '#dT', [K('duo') + 1.2, K('dresses') + 0.8]); blink(tl, $, '#dM', [K('duo') + 1.5]);
        dropDress(tl, $, '#dT', K('dresses') - 0.25);
        dropDress(tl, $, '#dM', K('dresses') - 0.1);
        arm(tl, $, '#dT', 'L', K('flash') - 0.2, -120); arm(tl, $, '#dT', 'R', K('flash') - 0.2, 120);
        arm(tl, $, '#dM', 'L', K('flash') - 0.1, -120); arm(tl, $, '#dM', 'R', K('flash') - 0.1, 120);
        tl.fromTo($('#dFl1, #dFl2, #dFl3'), { scale: 0, opacity: 1, transformOrigin: '50% 50%' }, { scale: 1.3, opacity: 0, duration: 0.25, stagger: 0.12 }, K('flash'));
        tl.fromTo($('#dFl1, #dFl2, #dFl3'), { scale: 0, opacity: 1, transformOrigin: '50% 50%' }, { scale: 1.3, opacity: 0, duration: 0.25, stagger: 0.12, immediateRender: false }, K('flash') + 0.6);
      },
    },
    secret: {
      bg: '#2a1f5c',
      html: () => svg(`${swirl('scSwirl', 505, 1000)}
        ${toon('scT', 505, 1440, 1.15, 'spiky', PINK, PINKD)}
        ${f2Stamp('scStamp', 505, 1180, 'SECRETO', F2.red, -10, 460)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#scT'), { y: 700 }, { y: 0, duration: 0.45, ease: 'back.out(1.3)' }, s.t0 + 0.05);
        arm(tl, $, '#scT', 'R', s.t0 + 0.5, -150);
        talk(tl, $, '#scT', s.t0 + 0.6, 0.6, 0.1, -10);
        tl.fromTo($('#scStamp'), { scale: 2.2, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('secret') - 0.2);
        arm(tl, $, '#scT', 'R', K('secret') + 0.4, 0);
        tl.to($('#scStamp'), { opacity: 0, duration: 0.3 }, K('trip') - 0.4);
        tl.fromTo($('#scSwirl'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.4)' }, K('trip') - 0.2);
        tl.to($('#scSwirl'), { rotation: 200, svgOrigin: '505 1000', duration: s.t1 - K('trip'), ease: 'none' }, K('trip') - 0.2);
        tl.to($('#scT .eyes'), { opacity: 0, duration: 0.1 }, K('trip'));
        tl.to($('#scT .spir'), { opacity: 1, duration: 0.1 }, K('trip'));
        tl.to($('#scT .sp'), { rotation: 720, transformOrigin: '50% 50%', duration: s.t1 - K('trip'), ease: 'none' }, K('trip'));
        talk(tl, $, '#scT', K('trip') + 0.2, s.t1 - K('trip') - 0.3, 0.1, -24);
        tl.to($('#scT'), { rotation: 5, transformOrigin: '50% 100%', duration: 0.4, yoyo: true, repeat: f2Reps(s.t1 - K('trip'), 0.4), ease: 'sine.inOut' }, K('trip'));
      },
    },
    dizzy: {
      bg: '#4b3a9a',
      html: () => svg(`${f2Stars(14)}
        <rect x="-20" y="1400" width="1120" height="600" fill="${CARPET}"/>
        ${toon('dzM', 505, 1430, 1.05, 'curly', GREEN, GREEND)}
        <g id="dzStars">${[0, 1, 2, 3].map((i) => { const a = i / 4 * Math.PI * 2; return `<g transform="translate(${505 + Math.cos(a) * 150} ${750 + Math.sin(a) * 25}) scale(1.15)">${star5(F2.yellow)}</g>`; }).join('')}</g>
        ${[[190, 880, -12], [840, 920, 12], [850, 1220, 6]].map(([x, y, r]) => `<g class="q"><g transform="translate(${x} ${y}) rotate(${r})">${f2Txt(0, 0, 110, '#fff', '?', F2OUTLINE)}</g></g>`).join('')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#dzM'), { y: 700 }, { y: 0, duration: 0.45, ease: 'back.out(1.3)' }, s.t0 + 0.05);
        tl.to($('#dzM'), { rotation: 7, transformOrigin: '50% 100%', duration: 0.45, yoyo: true, repeat: f2Reps(s.t1 - s.t0 - 0.5, 0.45), ease: 'sine.inOut' }, s.t0 + 0.5);
        arm(tl, $, '#dzM', 'L', s.t0 + 0.5, 60); arm(tl, $, '#dzM', 'R', s.t0 + 0.5, -60);
        talk(tl, $, '#dzM', s.t0 + 0.7, 1.0, 0.18, -12);
        tl.to($('#dzM .eyes'), { opacity: 0, duration: 0.1 }, K('dizzy'));
        tl.to($('#dzM .spir'), { opacity: 1, duration: 0.1 }, K('dizzy'));
        tl.to($('#dzM .sp'), { rotation: -720, transformOrigin: '50% 50%', duration: s.t1 - K('dizzy'), ease: 'none' }, K('dizzy'));
        f2Pop(tl, $('#dzStars'), K('dizzy') - 0.2, 0.35);
        tl.to($('#dzStars'), { rotation: 360, svgOrigin: '505 750', duration: s.t1 - K('dizzy'), ease: 'none' }, K('dizzy') - 0.2);
        tl.fromTo($('.q'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2.5)', stagger: 0.08 }, K('dizzy'));
      },
    },
    winner: {
      bg: F2.night,
      html: () => svg(`${f2Stars(16)}
        <rect x="-20" y="1440" width="1120" height="600" fill="#24324f"/>
        <g id="wJungle"><path d="M720 640 Q780 900 720 1180" stroke="#24a872" stroke-width="22" fill="none" stroke-linecap="round"/>
          ${[[710, 760, -30], [760, 900, 30], [720, 1040, -30], [750, 1150, 30]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="70" ry="30" fill="${F2.green}" transform="rotate(${r} ${x} ${y})"/>`).join('')}
          ${note(880, 820, 1.2, F2.yellow)}</g>
        <g id="wCupG">${f2Trophy('wCup', 330, 870, 1.0, 'OSCAR')}</g>
        <g id="wX"><g transform="translate(330 860)"><rect x="-22" y="-180" width="44" height="360" rx="22" fill="${F2.red}" transform="rotate(45)"/><rect x="-22" y="-180" width="44" height="360" rx="22" fill="${F2.red}" transform="rotate(-45)"/></g></g>
        ${toon('wT', 210, 1470, 0.72, 'spiky', PINK, PINKD)}${toon('wM', 460, 1470, 0.72, 'curly', GREEN, GREEND)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#wT, #wM'), { y: 600 }, { y: 0, duration: 0.4, ease: 'back.out(1.3)', stagger: 0.1 }, s.t0 + 0.05);
        f2Pop(tl, $('#wCupG'), s.t0 + 0.1, 0.45);
        arm(tl, $, '#wT', 'L', s.t0 + 0.4, -140); arm(tl, $, '#wM', 'R', s.t0 + 0.4, 140);
        tl.fromTo($('#wX'), { scale: 0, rotation: -30, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.35, ease: 'back.out(2.5)' }, K('lose') - 0.1);
        arm(tl, $, '#wT', 'L', K('lose'), 0); arm(tl, $, '#wM', 'R', K('lose'), 0);
        tl.to($('#wT, #wM'), { rotation: -6, transformOrigin: '50% 100%', duration: 0.18, yoyo: true, repeat: 5, ease: 'sine.inOut' }, K('lose') + 0.1);
        talk(tl, $, '#wM', K('lose') + 0.3, 0.8, 0.1, -12);
        tl.to($('#wX'), { opacity: 0, duration: 0.25 }, K('win') - 0.5);
        tl.fromTo($('#wJungle'), { x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.3)' }, K('win') - 0.6);
        tl.to($('#wCupG'), { x: 450, y: 260, scale: 0.75, rotation: 360, transformOrigin: '50% 50%', duration: 0.5, ease: 'power2.inOut' }, K('win') - 0.1);
        blink(tl, $, '#wT', [K('win') + 0.6]); blink(tl, $, '#wM', [K('win') + 0.8]);
        talk(tl, $, '#wT', K('win') + 0.5, 0.9, 0.11, -14);
      },
    },
    closing: {
      bg: '#1f3566',
      html: () => svg(`${f2Stars(18)}
        <rect x="-20" y="1420" width="1120" height="600" fill="${CARPET}"/>
        ${toon('cT', 300, 1440, 1.0, 'spiky', PINK, PINKD)}${toon('cM', 720, 1440, 1.0, 'curly', GREEN, GREEND)}
        ${f2Confetti('cConf', 26, 640, 640)}
        ${f2Bubble('cB1', 170, 760, 0.6, F2.green)}${f2Bubble('cB2', 870, 760, 0.6, F2.yellow)}${f2Bubble('cB3', 520, 700, 0.55, F2.pink)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#cT'), { x: -700 }, { x: 0, duration: 0.4, ease: 'power3.out' }, s.t0 + 0.05);
        tl.fromTo($('#cM'), { x: 700 }, { x: 0, duration: 0.4, ease: 'power3.out' }, s.t0 + 0.12);
        tl.fromTo($('#cConf .drop'), { y: -700, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power2.out', stagger: 0.02 }, K('party'));
        tl.to($('#cConf .bit'), { rotation: '+=300', transformOrigin: '50% 50%', duration: s.t1 - K('party'), ease: 'none' }, K('party'));
        const d = s.t1 - K('party') - 0.6;
        tl.to($('#cT, #cM'), { y: -30, duration: 0.3, yoyo: true, repeat: f2Reps(d, 0.3), ease: 'sine.inOut', stagger: 0.15 }, K('party') + 0.5);
        for (const [sel, side] of [['#cT', 'L'], ['#cT', 'R'], ['#cM', 'L'], ['#cM', 'R']] as const) {
          const o = side === 'L' ? '-88 -312' : '88 -312', up = side === 'L' ? 150 : -150;
          tl.to($(`${sel} .arm${side}`), { rotation: up, svgOrigin: o, duration: 0.3, yoyo: true, repeat: f2Reps(d, 0.3), ease: 'sine.inOut' }, K('party') + 0.5 + (side === 'R' ? 0.3 : 0));
        }
        talk(tl, $, '#cT', K('party') + 0.6, d, 0.12, -20); talk(tl, $, '#cM', K('party') + 0.7, d, 0.1, -20);
        f2Pop(tl, $('#cB1'), K('comments') - 0.1, 0.35);
        f2Pop(tl, $('#cB2'), K('comments') + 0.0, 0.35);
        f2Pop(tl, $('#cB3'), K('comments') + 0.1, 0.35);
      },
    },
  });
}
