// =====================================================================
//  Custom visuals for "La siesta que la NASA midió en pilotos" (flat 2D, HyperFrames). Canal: curiosidades.
//  Original art only: a generic airliner (no airline, no NASA logo: the name only as text), generic pilots with caps,
//  a clock, meters, a runway, an alarm clock, a pillow. Helpers live inside this block (shared type-check scope).
// =====================================================================
{
  const NAVY = '#1f3566', PURP = '#2a1f5c', SK = '#f2c29b';
  // a generic airliner facing left (no airline, no logo): origin at its center, ~520 x 220 at s = 1.
  // Fuselage with belly shading and a blue cheatline, cockpit windows, passenger windows, a door, a swept wing with an
  // engine, flap lines, a tail fin with a stripe and a horizontal stabilizer.
  const plane = (id: string, x: number, y: number, s = 1, rot = 0) => `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="M150 -34 L196 -128 Q204 -140 220 -140 L250 -140 Q258 -140 254 -128 L232 -34Z" fill="#e8edf6"/>
      <path d="M172 -80 L212 -136 L240 -136 L222 -80Z" fill="${F2.blue}"/>
      <path d="M200 -14 L268 -40 L282 -34 L246 2Z" fill="#c9d3ea"/>
      <path d="M-30 -10 L60 -10 L-60 -100 L-96 -100 Z" fill="#b8c3da"/>
      <path d="M-236 0 Q-236 -42 -180 -44 L236 -44 Q262 -44 262 -16 L262 4 Q262 30 236 30 L-180 30 Q-236 30 -236 0Z" fill="#fff"/>
      <path d="M-236 6 Q-232 30 -180 30 L236 30 Q262 30 262 6Z" fill="#dde4f1"/>
      <path d="M-218 -6 L250 -6 L252 4 L-222 4Z" fill="${F2.blue}"/>
      <path d="M-226 -18 Q-222 -36 -196 -38 L-176 -38 L-182 -18Z" fill="${F2.night}"/><path d="M-170 -38 L-150 -38 L-152 -18 L-176 -18Z" fill="${F2.night}"/>
      <path d="M-216 -22 L-202 -34" stroke="#fff" stroke-width="3" opacity="0.6"/>
      <rect x="-120" y="-36" width="26" height="40" rx="8" fill="none" stroke="#c9d3ea" stroke-width="4"/>
      ${[...Array(8)].map((_, i) => `<rect x="${-72 + i * 36}" y="-30" width="16" height="18" rx="7" fill="${F2.skyD}"/>`).join('')}
      <path d="M-40 10 L70 10 L150 104 L110 104Z" fill="#c9d3ea"/><path d="M40 40 L88 96 M60 30 L118 98" stroke="#aab4cc" stroke-width="4"/>
      <g transform="translate(30 58)"><rect x="-56" y="-18" width="104" height="40" rx="20" fill="#8d99ae"/><ellipse cx="-56" cy="2" rx="12" ry="20" fill="#555b6e"/><rect x="-10" y="-30" width="18" height="16" fill="#aab4cc"/></g>
    </g></g>`;
  // a pilot (bust/full): origin at the feet like f2Person; .eyes, .mask (eye mask), .cap
  const pilot = (id: string, x: number, y: number, s = 1, shirt = '#fff') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-50" y="0" width="100" height="160" rx="40" fill="${shirt}"/><path d="M-12 0 L12 0 L8 60 L0 70 L-8 60Z" fill="${F2.night}"/>
      <rect x="-50" y="20" width="22" height="10" rx="4" fill="${F2.yellow}"/><rect x="28" y="20" width="22" height="10" rx="4" fill="${F2.yellow}"/>
      <circle cx="0" cy="-50" r="54" fill="${SK}"/>
      <g class="eyes"><circle cx="-18" cy="-52" r="8" fill="${F2.night}"/><circle cx="18" cy="-52" r="8" fill="${F2.night}"/></g>
      <path d="M-14 -24 Q0 -14 14 -24" stroke="${F2.night}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g class="mask" opacity="0"><rect x="-50" y="-66" width="100" height="30" rx="15" fill="${F2.purple}"/><path d="M-50 -52 L-58 -56 M50 -52 L58 -56" stroke="${F2.purple}" stroke-width="6"/></g>
      <g class="cap"><path d="M-58 -78 Q0 -140 58 -78Z" fill="#1d2235"/><rect x="-64" y="-86" width="128" height="18" rx="9" fill="#1d2235"/><rect x="-14" y="-118" width="28" height="16" rx="5" fill="${F2.yellow}"/></g></g></g>`;
  const pill = (id: string, x: number, y: number, t: string, bg: string, fg: string, w = 300) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="${-w / 2}" y="-46" width="${w}" height="92" rx="46" fill="#000" opacity="0.2" transform="translate(6 8)"/><rect x="${-w / 2}" y="-46" width="${w}" height="92" rx="46" fill="${bg}"/>${f2Txt(0, 20, 54, fg, t)}</g></g>`;
  // a bed with someone sleeping in it (head on the pillow, closed eyes, blanket): origin on the floor, ~470 wide
  const bed = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="6" rx="250" ry="16" fill="#000" opacity="0.15"/>
      <rect x="-236" y="-270" width="44" height="270" rx="16" fill="#a0673a"/><rect x="-236" y="-270" width="44" height="40" rx="16" fill="#7c4a25"/>
      <rect x="196" y="-160" width="38" height="160" rx="14" fill="#a0673a"/>
      <rect x="-196" y="-62" width="400" height="26" rx="8" fill="#7c4a25"/>
      <rect x="-196" y="-118" width="400" height="60" rx="18" fill="#fff"/>
      <ellipse cx="-126" cy="-128" rx="66" ry="30" fill="#e3e9f5"/><ellipse cx="-130" cy="-134" rx="62" ry="26" fill="#fff"/>
      <circle cx="-118" cy="-172" r="46" fill="${SK}"/>
      <path d="M-164 -176 Q-160 -224 -112 -222 Q-74 -220 -72 -184 Q-90 -204 -118 -200 Q-142 -198 -150 -176Z" fill="#3b2a24"/>
      <path d="M-138 -166 Q-128 -158 -118 -166 M-104 -168 Q-94 -160 -84 -168" stroke="${F2.night}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M-112 -148 Q-104 -142 -96 -148" stroke="${F2.night}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="-142" cy="-152" r="7" fill="#ff9aa2" opacity="0.5"/>
      <path d="M-84 -160 Q40 -186 204 -150 L204 -58 L-84 -58Z" fill="${F2.blue}"/>
      <path d="M-84 -160 Q-40 -170 0 -172 L0 -146 Q-40 -144 -84 -134Z" fill="#fff" opacity="0.75"/>
      <path d="M40 -150 Q100 -140 160 -146 M60 -112 Q120 -104 190 -110" stroke="#2f55c9" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.6"/>
      <rect x="-196" y="-38" width="22" height="38" rx="6" fill="#7c4a25"/><rect x="180" y="-38" width="22" height="38" rx="6" fill="#7c4a25"/></g></g>`;
  const alarm = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <circle cx="-72" cy="-82" r="34" fill="${F2.red}"/><circle cx="72" cy="-82" r="34" fill="${F2.red}"/><rect x="-6" y="-128" width="12" height="30" fill="${F2.night}"/>
      <rect x="-80" y="80" width="24" height="44" rx="10" fill="${F2.night}" transform="rotate(25 -68 80)"/><rect x="56" y="80" width="24" height="44" rx="10" fill="${F2.night}" transform="rotate(-25 68 80)"/>
      <circle r="104" fill="${F2.red}"/><circle r="84" fill="#fff"/>
      <rect x="-5" y="-62" width="10" height="66" rx="5" fill="${F2.night}"/><rect x="-5" y="-5" width="48" height="10" rx="5" fill="${F2.night}"/><circle r="10" fill="${F2.night}"/></g></g>`;
  const check = (id: string, x: number, y: number, r = 50) => `<g id="${id}"><g transform="translate(${x} ${y})"><circle r="${r}" fill="${F2.green}"/>
      <path d="M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.35} L${r * 0.5} ${-r * 0.35}" stroke="#fff" stroke-width="${r * 0.22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
  const cross = (id: string, x: number, y: number, r: number) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="${-r}" y="-16" width="${2 * r}" height="32" rx="16" fill="${F2.red}" transform="rotate(45)"/><rect x="${-r}" y="-16" width="${2 * r}" height="32" rx="16" fill="${F2.red}" transform="rotate(-45)"/></g></g>`;
  const zz = (cls: string, x: number, y: number) => [0, 1, 2].map((i) => `<g class="${cls}"><g transform="translate(${x + i * 50} ${y - i * 64})">${f2Txt(0, 0, 60 + i * 16, '#fff', 'Z', F2OUTLINE)}</g></g>`).join('');

  defineVisuals({
    hook: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Cloud('hC1', 170, 760, 0.8)}${f2Cloud('hC2', 860, 760, 0.8)}${f2Cloud('hC3', 760, 1440, 0.9)}
        ${plane('hPlane', 540, 820, 0.95, -6)}
        ${bed('hBed', 350, 1380, 1.0)}
        ${zz('hz', 225, 1130)}
        ${pilot('hPilot', 790, 1190, 1.0)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#hPlane'), { x: 700 }, { x: -60, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#hC2'), { x: 0 }, { x: 120, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        f2Pop(tl, $('#hBed'), K('nap') - 0.15, 0.4);
        tl.fromTo($('.hz'), { opacity: 0, y: 30 }, { opacity: 1, y: -20, duration: 0.6, stagger: { each: 0.2, repeat: f2Reps(s.t1 - K('nap') - 0.6, 0.6) }, ease: 'sine.out' }, K('nap') + 0.2);
        tl.fromTo($('#hPilot'), { y: 600, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.6)' }, K('pilot') - 0.3);
      },
    },
    study: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>${f2Cloud('sC1', 180, 760, 0.8)}${f2Cloud('sC2', 900, 700, 0.6)}
        <path d="M40 1960 L40 980 Q40 690 540 670 Q1040 690 1040 980 L1040 1960Z" fill="#fff"/>
        <path d="M40 1330 L1040 1330 L1040 1380 L40 1380Z" fill="${F2.red}"/>
        <rect x="150" y="810" width="350" height="300" rx="40" fill="${NAVY}"/><rect x="580" y="810" width="350" height="300" rx="40" fill="${NAVY}"/>
        <g clip-path="url(#sWinL)">${pilot('sP1', 325, 1060, 0.95)}</g>
        <g clip-path="url(#sWinR)">${pilot('sP2', 755, 1060, 0.95)}<g id="sYoke"><rect x="680" y="1060" width="150" height="26" rx="13" fill="${F2.night}"/></g></g>
        ${zz('sz', 230, 860)}
        ${pill('sForty', 540, 1220, '40 MIN', F2.night, F2.yellow)}
        ${f2Arrow('sRoute', 160, 1480, 920, 1480, F2.night, 12)}`, `<clipPath id="sWinL"><rect x="150" y="810" width="350" height="300" rx="40"/></clipPath><clipPath id="sWinR"><rect x="580" y="810" width="350" height="300" rx="40"/></clipPath>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#sP1'), { y: 300 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)' }, s.t0 + 0.15);
        tl.fromTo($('#sP2'), { y: 300 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)' }, s.t0 + 0.3);
        tl.fromTo($('#sRoute'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, K('long') - 0.3);
        tl.to($('#sP1 .mask'), { opacity: 1, duration: 0.1 }, K('rest') - 0.1);
        tl.to($('#sP1'), { rotation: -14, svgOrigin: '325 1060', duration: 0.4, ease: 'power2.out' }, K('rest'));
        tl.fromTo($('.sz'), { opacity: 0, y: 30 }, { opacity: 1, y: -20, duration: 0.6, stagger: { each: 0.2, repeat: f2Reps(s.t1 - K('rest') - 0.8, 0.6) }, ease: 'sine.out' }, K('rest') + 0.3);
        f2Pop(tl, $('#sForty'), K('forty') - 0.15, 0.4);
        tl.to($('#sYoke'), { rotation: 10, svgOrigin: '755 1073', duration: 0.3, yoyo: true, repeat: f2Reps(s.t1 - K('copilot') - 0.3, 0.3), ease: 'sine.inOut' }, K('copilot') - 0.1);
      },
    },
    sleep: {
      bg: PURP,
      html: () => {
        const R = 190, C = 2 * Math.PI * R;
        const arc = (cls: string, frac: number, c: string, w: number) => `<circle class="${cls}" cx="0" cy="0" r="${R}" fill="none" stroke="${c}" stroke-width="${w}" stroke-dasharray="${(C * frac).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90)"/>`;
        const a6 = (6 / 60) * Math.PI * 2 - Math.PI / 2;
        return svg(`${f2Stars(16)}
          <g id="slClock"><g transform="translate(505 960)"><circle r="270" fill="#000" opacity="0.2" transform="translate(10 12)"/><circle r="270" fill="#fff"/>
            ${arc('win', 40 / 60, '#dfe4f2', 64)}${arc('slept', 26 / 60, F2.purple, 64)}
            ${[...Array(12)].map((_, i) => `<rect x="-5" y="-262" width="10" height="${i % 3 ? 16 : 30}" rx="5" fill="${F2.night}" transform="rotate(${i * 30})"/>`).join('')}
            ${f2Txt(0, -10, 64, F2.night, '40 MIN')}${f2Txt(0, 50, 34, '#8a93ad', 'para descansar')}
            <g id="slMoon"><g transform="translate(${(Math.cos(a6) * R).toFixed(1)} ${(Math.sin(a6) * R).toFixed(1)})"><circle r="40" fill="${F2.yellow}"/><circle cx="16" cy="-10" r="34" fill="${F2.purple}"/></g></g></g></g>`);
      },
      anim(tl, s, K, $) {
        f2Pop(tl, $('#slClock'), s.t0 + 0.1, 0.45);
        const C = 2 * Math.PI * 190, L = C * 26 / 60;
        tl.fromTo($('.slept'), { strokeDashoffset: L }, { strokeDashoffset: 0, duration: K('stat') - K('asleep'), ease: 'none' }, K('asleep'));
        f2Pop(tl, $('#slMoon'), K('asleep') - 0.1, 0.35);
      },
    },
    better: {
      bg: NAVY,
      html: () => svg(`${f2Stars(14)}
        ${[['bA', 210, 'ALERTA', F2.green], ['bR', 400, 'RINDE', F2.yellow]].map(([id, x, t, c]) => `<g id="${id}">${f2Txt(+x, 1110, 36, '#fff', String(t))}
          <rect x="${+x - 55}" y="690" width="110" height="370" rx="34" fill="#000" opacity="0.3"/><rect class="fill" x="${+x - 55}" y="690" width="110" height="370" rx="34" fill="${c}"/></g>`).join('')}
        ${f2Arrow('bUp', 560, 1040, 560, 720, F2.green, 18)}
        <rect x="-20" y="1330" width="1120" height="700" fill="#24324f"/>
        <rect x="120" y="1270" width="840" height="60" rx="10" fill="#555b6e"/>${[...Array(7)].map((_, i) => `<rect x="${150 + i * 115}" y="1294" width="70" height="12" rx="6" fill="#fff"/>`).join('')}
        ${plane('bPlane', 560, 1225, 0.7)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#bA .fill'), { scaleY: 0.25, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.5, ease: 'back.out(1.4)' }, K('alert') - 0.3);
        tl.fromTo($('#bR .fill'), { scaleY: 0.25, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.5, ease: 'back.out(1.4)' }, K('better') - 0.3);
        f2Pop(tl, $('#bUp'), K('better') + 0.1, 0.35);
        tl.fromTo($('#bPlane'), { x: 520, y: -460, rotation: -14 }, { x: 0, y: 0, rotation: 0, duration: K('land') - s.t0 - 0.2, ease: 'power1.out' }, s.t0 + 0.2);
        tl.to($('#bPlane'), { y: -10, duration: 0.15, yoyo: true, repeat: 1 }, K('land'));
      },
    },
    short: {
      bg: F2.night,
      html: () => svg(`${f2Stars(12)}
        <rect x="90" y="680" width="420" height="760" rx="40" fill="#3a1f3a"/><rect x="570" y="680" width="380" height="760" rx="40" fill="#14403a"/>
        <g id="shL">${pill('shTwo', 300, 790, '2 HORAS', F2.red, '#fff', 300)}</g>${cross('shX', 455, 725, 42)}
        ${f2Me('shP1', 300, 1126, 0.95, F2.purple)}
        <g id="shStars">${[0, 1, 2, 3].map((i) => { const a = i / 4 * Math.PI * 2; return `<g transform="translate(${300 + Math.cos(a) * 80} ${1060 + Math.sin(a) * 26})">${f2Txt(0, 14, 44, F2.yellow, '★')}</g>`; }).join('')}</g>
        ${pill('shTwenty', 760, 790, '20 MIN', F2.green, F2.night, 260)}${check('shOk', 860, 720, 40)}
        ${f2Me('shP2', 760, 1126, 0.95, F2.green, '#8a5a33')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#shP1, #shP2'), { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)', stagger: 0.15 }, s.t0 + 0.1);
        f2Pop(tl, $('#shTwo'), K('twoh') - 0.3, 0.35);
        tl.fromTo($('#shX'), { scale: 0, rotation: -30, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(2)' }, K('twoh') + 0.1);
        f2Pop(tl, $('#shTwenty'), K('short') - 0.2, 0.35);
        f2Pop(tl, $('#shOk'), K('short') + 0.15, 0.3);
        tl.to($('#shP2'), { y: -30, duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.out' }, K('short') + 0.2);
        tl.fromTo($('#shStars'), { scale: 0, transformOrigin: '300px 1060px' }, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, K('dizzy') - 0.15);
        tl.fromTo($('#shStars'), { x: 0 }, { x: 20, duration: 0.15, yoyo: true, repeat: f2Reps(s.t1 - K('dizzy'), 0.15), ease: 'sine.inOut' }, K('dizzy') + 0.15);
        tl.to($('#shP1'), { rotation: 8, svgOrigin: '300 1340', duration: 0.3, yoyo: true, repeat: f2Reps(s.t1 - K('dizzy'), 0.3), ease: 'sine.inOut' }, K('dizzy'));
      },
    },
    tip: {
      bg: F2.cream, ink: F2.night,
      html: () => svg(`
        ${f2Sun('tSun', 820, 760, 70, F2.orange)}
        <rect x="-20" y="1370" width="1120" height="700" fill="#f3d9a8"/>
        ${f2Me('tMe', 300, 1126, 1.05, F2.blue)}
        <g id="tYawn"><ellipse cx="300" cy="1098" rx="16" ry="20" fill="${F2.night}"/></g>
        ${pill('tTwenty', 740, 1000, '20 MIN', F2.night, F2.yellow, 280)}
        ${alarm('tAlarm', 740, 1240, 0.95)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#tSun'), { y: -120 }, { y: 30, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#tMe'), { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)' }, s.t0 + 0.1);
        tl.fromTo($('#tYawn'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, K('afternoon') - 0.1);
        tl.to($('#tYawn'), { scale: 0, duration: 0.3 }, K('afternoon') + 1.0);
        f2Pop(tl, $('#tTwenty'), K('twenty') - 0.15, 0.4);
        f2Pop(tl, $('#tAlarm'), K('twenty') + 0.4, 0.35);
        tl.to($('#tAlarm'), { rotation: 9, transformOrigin: '50% 50%', duration: 0.05, yoyo: true, repeat: 7 }, K('alarm') - 0.05);
      },
    },
    closing: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Cloud('clC1', 170, 1480, 1.0)}${f2Cloud('clC2', 880, 1490, 0.85)}
        ${bed('clBed', 505, 1200, 1.15)}
        ${zz('clz', 345, 925)}
        <g id="clStamp" data-layout-allow-overlap="true"><g transform="translate(690 770) rotate(-10)"><rect x="-210" y="-60" width="420" height="120" rx="22" fill="#000" opacity="0.25" transform="translate(8 10)"/><rect x="-210" y="-60" width="420" height="120" rx="22" fill="${F2.green}"/><rect x="-197" y="-47" width="394" height="94" rx="16" fill="none" stroke="#fff" stroke-width="7"/>${f2Txt(0, 22, 62, "#fff", "APROBADO")}</g></g>
        ${f2Bubble('clB1', 220, 1300, 0.65, F2.yellow)}${f2Bubble('clB2', 505, 1330, 0.65, F2.green)}${f2Bubble('clB3', 790, 1300, 0.65, F2.pink)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#clC1'), { x: -40 }, { x: 40, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clC2'), { x: 30 }, { x: -30, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        f2Pop(tl, $('#clBed'), s.t0 + 0.1, 0.45);
        tl.fromTo($('#clStamp'), { scale: 2.4, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('stamp') - 0.2);
        tl.fromTo($('.clz'), { opacity: 0, y: 30 }, { opacity: 1, y: -20, duration: 0.6, stagger: { each: 0.2, repeat: f2Reps(s.t1 - K('excuse'), 0.6) }, ease: 'sine.out' }, K('excuse') - 0.1);
        f2Pop(tl, $('#clB1'), K('comments') - 0.15, 0.35);
        f2Pop(tl, $('#clB2'), K('comments') - 0.05, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.05, 0.35);
      },
    },
  });
}
