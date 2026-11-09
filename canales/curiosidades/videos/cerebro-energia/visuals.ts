// =====================================================================
//  Custom visuals for "Tu cerebro se come la quinta parte de tu energía" (flat 2D, HyperFrames). Canal: curiosidades.
//  The video's character is an original pink cartoon brain with a face. Props: scale, pie chart, neuron network,
//  bed, plate, battery, clock. Helpers live inside this block (shared type-check scope).
// =====================================================================
{
  const PINK = '#ff9bb5', PINKD = '#e2708f', TEAL = '#0f3d3e', PURP = '#2a1f5c', NAVY = '#1f3566';
  // the brain (a nerd!): origin at its center, ~380 x 300 at s = 1. Two-tone lobes, folds, a centre fissure, round
  // glasses with tape, buck teeth and a bow tie. Parts: .body (squash), .eyes / .shut (sleep), .mouth
  const LOBES: number[][] = [[-100, -20, 90], [-30, -70, 100], [70, -55, 92], [115, 25, 82], [-115, 45, 76], [0, 35, 112]];
  const brain = (id: string, x: number, y: number, s = 1, extra = '') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="158" rx="160" ry="18" fill="#000" opacity="0.18"/>
      <g class="body">
        ${LOBES.map(([cx, cy, r]) => `<circle cx="${cx + 8}" cy="${cy + 10}" r="${r}" fill="${PINKD}"/>`).join('')}
        ${LOBES.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${PINK}"/>`).join('')}
        <path d="M0 -168 Q-14 -140 4 -118 Q20 -96 2 -74 Q-12 -58 0 -40" stroke="${PINKD}" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="M-150 -10 Q-110 -60 -70 -25 Q-40 5 -70 50 M-60 -150 Q-30 -120 -50 -90 Q-70 -60 -40 -40 M60 -140 Q30 -100 70 -80 Q110 -60 90 -30
          M140 -40 Q110 -10 150 20 M-170 70 Q-130 60 -110 100 M110 70 Q130 90 160 80 M-120 -60 Q-100 -90 -70 -80" stroke="${PINKD}" stroke-width="10" fill="none" stroke-linecap="round"/>
        <ellipse cx="-110" cy="-70" rx="34" ry="18" fill="#fff" opacity="0.35" transform="rotate(-30 -110 -70)"/><circle cx="-40" cy="-130" r="12" fill="#fff" opacity="0.35"/>
        <g class="eyes"><ellipse cx="-42" cy="30" rx="20" ry="24" fill="#fff"/><ellipse cx="42" cy="30" rx="20" ry="24" fill="#fff"/><circle cx="-38" cy="35" r="10" fill="${F2.night}"/><circle cx="38" cy="35" r="10" fill="${F2.night}"/>
          <circle cx="-35" cy="31" r="3.5" fill="#fff"/><circle cx="41" cy="31" r="3.5" fill="#fff"/></g>
        <g class="shut" opacity="0"><path d="M-60 34 Q-42 48 -24 34 M24 34 Q42 48 60 34" stroke="${F2.night}" stroke-width="8" fill="none" stroke-linecap="round"/></g>
        <g class="glasses"><circle cx="-42" cy="30" r="38" fill="#cfe9ff" opacity="0.18"/><circle cx="42" cy="30" r="38" fill="#cfe9ff" opacity="0.18"/>
          <circle cx="-42" cy="30" r="38" fill="none" stroke="${F2.night}" stroke-width="10"/><circle cx="42" cy="30" r="38" fill="none" stroke="${F2.night}" stroke-width="10"/>
          <path d="M-80 24 L-118 14 M80 24 L118 14" stroke="${F2.night}" stroke-width="9" stroke-linecap="round"/>
          <rect x="-12" y="18" width="24" height="18" rx="4" fill="#fff"/><path d="M-6 20 L-6 34 M0 20 L0 34 M6 20 L6 34" stroke="#d6dbe8" stroke-width="2"/>
          <path d="M-64 6 L-52 -2 M20 6 L32 -2" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="0.7"/></g>
        <circle cx="-86" cy="84" r="13" fill="#ff6f91" opacity="0.55"/><circle cx="86" cy="84" r="13" fill="#ff6f91" opacity="0.55"/>
        <path class="mouth" d="M-30 88 Q0 112 30 88" stroke="${F2.night}" stroke-width="8" fill="none" stroke-linecap="round"/>
        <rect x="-11" y="96" width="10" height="13" rx="2" fill="#fff"/><rect x="1" y="96" width="10" height="13" rx="2" fill="#fff"/>
        <g class="bow"><path d="M0 142 L-46 118 L-46 166Z M0 142 L46 118 L46 166Z" fill="${F2.red}"/><circle cx="0" cy="142" r="12" fill="#c43d42"/></g>
      </g>${extra}</g></g>`;
  const bolt = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M12 -60 L-30 8 L-2 8 L-14 60 L30 -8 L2 -8Z" fill="${F2.yellow}"/></g></g>`;
  const pill = (id: string, x: number, y: number, t: string, bg: string, fg: string, w = 300) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="${-w / 2}" y="-46" width="${w}" height="92" rx="46" fill="#000" opacity="0.2" transform="translate(6 8)"/><rect x="${-w / 2}" y="-46" width="${w}" height="92" rx="46" fill="${bg}"/>${f2Txt(0, 20, 54, fg, t)}</g></g>`;
  const clock = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <circle r="96" fill="#000" opacity="0.2" transform="translate(8 10)"/><circle r="96" fill="${F2.red}"/><circle r="78" fill="#fff"/>
      ${[...Array(12)].map((_, i) => `<rect x="-4" y="-70" width="8" height="${i % 3 ? 10 : 18}" rx="4" fill="${F2.night}" transform="rotate(${i * 30})"/>`).join('')}
      <rect x="-5" y="-6" width="46" height="12" rx="6" fill="${F2.night}"/><g class="hand"><rect x="-5" y="-58" width="10" height="64" rx="5" fill="${F2.night}"/></g><circle r="10" fill="${F2.night}"/></g></g>`;

  defineVisuals({
    hook: {
      bg: PURP,
      html: () => svg(`${f2Stars()}
        ${brain('hBrain', 505, 1030, 1.3)}
        <g id="hTag"><line x1="735" y1="772" x2="668" y2="862" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="668" cy="862" r="8" fill="#fff"/>
          <g transform="translate(820 800) rotate(12)"><rect x="-90" y="-60" width="180" height="96" rx="20" fill="${F2.yellow}"/><circle cx="-74" cy="-12" r="8" fill="${PURP}"/>${f2Txt(14, 6, 50, F2.night, '+1 KG')}</g></g>
        ${[[-400, -160], [-420, 120], [420, -120], [410, 150]].map(([dx, dy], i) => `<g class="hb"><g transform="translate(${dx} ${dy})">${bolt(`hb${i}`, 505, 1140, 0.9)}</g></g>`).join('')}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#hBrain'), s.t0 + 0.05, 0.45);
        tl.fromTo($('#hTag'), { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'bounce.out' }, K('kilo') - 0.25);
        // the bolts wait outside the frame-side (their group is offset by dx, dy) and fly into the mouth
        tl.set($('.hb'), { opacity: 0 }, s.t0);
        tl.set($('.hb'), { opacity: 1 }, K('eat') - 0.25);
        tl.fromTo($('[id^=hb]'), { x: 0, y: 0, scale: 1 }, { x: (i: number) => [400, 420, -420, -410][i], y: (i: number) => [160, -120, 120, -150][i], scale: 0.2, duration: 0.35, ease: 'power2.in', stagger: 0.08, immediateRender: false }, K('eat') - 0.25);
        tl.set($('.hb'), { opacity: 0 }, K('eat') + 0.45);
        tl.to($('#hBrain .body'), { scaleY: 0.88, scaleX: 1.08, transformOrigin: '50% 100%', duration: 0.1, yoyo: true, repeat: 3 }, K('eat') + 0.15);
      },
    },
    weight: {
      bg: NAVY,
      html: () => svg(`${f2Stars(12)}
        <g id="wScale">
          <rect x="490" y="870" width="30" height="370" fill="${F2.gray}"/><path d="M395 1262 L615 1262 L585 1222 L425 1222Z" fill="${F2.gray}"/>
          <g id="wBeam">
            <rect x="165" y="858" width="680" height="24" rx="12" fill="${F2.yellow}"/><circle cx="505" cy="870" r="22" fill="#e0a21f"/>
            <line x1="205" y1="870" x2="205" y2="1010" stroke="#fff" stroke-width="6"/><ellipse cx="205" cy="1012" rx="125" ry="22" fill="#fff"/>
            <line x1="805" y1="870" x2="805" y2="1010" stroke="#fff" stroke-width="6"/><ellipse cx="805" cy="1012" rx="125" ry="22" fill="#fff"/>
            ${brain('wBrain', 205, 960, 0.28)}${f2Me('wMe', 805, 842, 0.75, F2.blue)}
          </g>
        </g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#wScale'), s.t0 + 0.1, 0.45);
        tl.fromTo($('#wBeam'), { rotation: 0, svgOrigin: '505 870' }, { rotation: 8, svgOrigin: '505 870', duration: 0.45, ease: 'back.out(2)' }, K('stat') - 0.3);
      },
    },
    energy: {
      bg: TEAL,
      html: () => svg(`
        <g id="ePie"><g transform="translate(640 920)"><circle r="240" fill="#000" opacity="0.2" transform="translate(10 12)"/><circle r="240" fill="#2c7a7b"/>
          ${f2Txt(-40, 90, 60, '#bfe3e3', '80%')}${f2Txt(-40, 140, 30, '#bfe3e3', 'resto del cuerpo')}</g></g>
        <g id="eSlice"><g transform="translate(640 920)"><path d="M0 0 L0 -240 A240 240 0 0 1 228 -74 Z" fill="${F2.yellow}"/>${f2Txt(92, -110, 54, F2.night, '20%')}</g></g>
        <g id="eSofa"><rect x="90" y="1040" width="260" height="90" rx="30" fill="#e06d14"/>
          ${brain('eBrain', 220, 1010, 0.42)}
          <rect x="100" y="1110" width="240" height="90" rx="26" fill="${F2.orange}"/><rect x="70" y="1080" width="56" height="140" rx="24" fill="#e06d14"/><rect x="314" y="1080" width="56" height="140" rx="24" fill="#e06d14"/></g>`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#ePie'), s.t0 + 0.2, 0.45);
        f2Pop(tl, $('#eSofa'), K('rest') - 0.2, 0.4);
        tl.fromTo($('#eSlice'), { scale: 0, transformOrigin: '640px 920px' }, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, K('stat') - 0.15);
        tl.to($('#eSlice'), { x: 28, y: -28, duration: 0.3, ease: 'back.out(2)' }, K('stat') + 0.2);
        tl.to($('#eBrain .body'), { y: -8, duration: 0.6, yoyo: true, repeat: f2Reps(s.t1 - K('rest'), 0.6), ease: 'sine.inOut' }, K('rest') + 0.3);
      },
    },
    neurons: {
      bg: F2.night,
      html: () => {
        const N = [[170, 760], [360, 700], [560, 760], [760, 700], [890, 860], [650, 900], [440, 880], [230, 950], [150, 1150], [350, 1100], [560, 1090], [780, 1080], [880, 1260], [640, 1280], [420, 1300], [210, 1330]];
        const L: string[] = [];
        N.forEach(([x, y], i) => [1, 4].forEach((d) => { const j = i + d; if (j < N.length) L.push(`<line class="ln" x1="${x}" y1="${y}" x2="${N[j][0]}" y2="${N[j][1]}" stroke="#3b4a75" stroke-width="8" stroke-linecap="round"/>`); }));
        return svg(`${f2Stars(14)}${L.join('')}
          ${N.map(([x, y]) => `<g class="nd"><circle cx="${x}" cy="${y}" r="30" fill="#5b6b9a"/><circle class="on" cx="${x}" cy="${y}" r="30" fill="${F2.yellow}" opacity="0"/><circle class="halo" cx="${x}" cy="${y}" r="52" fill="${F2.yellow}" opacity="0"/></g>`).join('')}
          <g id="nNum">${f2Txt(505, 1440, 84, F2.yellow, '86.000.000.000', F2OUTLINE)}</g>`);
      },
      anim(tl, s, K, $) {
        tl.fromTo($('.ln'), { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: { amount: 0.4 } }, K('neurons') - 0.45);
        tl.fromTo($('.nd'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, ease: 'back.out(2)', stagger: { amount: 0.4 } }, K('neurons') - 0.45);
        f2Pop(tl, $('#nNum'), K('num') - 0.1, 0.4);
        tl.to($('.on'), { opacity: 1, duration: 0.1, stagger: { amount: 0.45 } }, K('lights') - 0.25);
        tl.fromTo($('.halo'), { opacity: 0 }, { opacity: 0.25, duration: 0.25, yoyo: true, repeat: f2Reps(s.t1 - K('lights'), 0.25), ease: 'sine.inOut' }, K('lights') + 0.2);
      },
    },
    sleep: {
      bg: '#1b1446',
      html: () => svg(`${f2Stars(18)}
        <g transform="translate(200 760)"><circle r="80" fill="${F2.cream}"/><circle cx="34" cy="-20" r="72" fill="#1b1446"/></g>
        <circle id="sHalo" cx="505" cy="1060" r="270" fill="${F2.purple}" opacity="0.3"/>
        <ellipse cx="505" cy="1220" rx="330" ry="80" fill="#fff"/>
        ${brain('sBrain', 505, 1060, 1.1, `<path d="M-70 -150 Q40 -275 180 -205 L160 -160 Q60 -205 0 -120Z" fill="${F2.red}"/><circle cx="188" cy="-198" r="28" fill="#fff"/>`)}
        <rect x="140" y="1190" width="730" height="240" rx="50" fill="${F2.blue}"/><rect x="140" y="1190" width="730" height="46" rx="23" fill="#fff" opacity="0.6"/>
        ${[0, 1, 2].map((i) => `<g class="z"><g transform="translate(${720 + i * 54} ${880 - i * 70})">${f2Txt(0, 0, 64 + i * 16, '#fff', 'Z', F2OUTLINE)}</g></g>`).join('')}
        ${bolt('sB1', 140, 960, 0.8)}${bolt('sB2', 900, 1000, 0.8)}`),
      anim(tl, s, K, $) {
        tl.to($('#sBrain .eyes'), { opacity: 0, duration: 0.1 }, s.t0 + 0.5);
        tl.to($('#sBrain .shut'), { opacity: 1, duration: 0.1 }, s.t0 + 0.5);
        tl.fromTo($('.z'), { opacity: 0, y: 30 }, { opacity: 1, y: -30, duration: 0.7, stagger: { each: 0.25, repeat: f2Reps(s.t1 - s.t0 - 0.7, 0.7) }, ease: 'sine.out' }, s.t0 + 0.7);
        tl.fromTo($('#sHalo'), { scale: 0.9, opacity: 0.25, transformOrigin: "50% 50%" }, { scale: 1.12, opacity: 0.6, duration: 0.4, yoyo: true, repeat: f2Reps(s.t1 - K('sleep') + 0.3, 0.4), ease: 'sine.inOut' }, K('sleep') - 0.3);
        tl.fromTo($('#sB1'), { x: 0, y: 0, opacity: 1, scale: 1 }, { x: 360, y: 120, scale: 0.2, opacity: 0, duration: 0.45, ease: 'power2.in' }, K('sleep') - 0.2);
        tl.fromTo($('#sB2'), { x: 0, y: 0, opacity: 1, scale: 1 }, { x: -380, y: 80, scale: 0.2, opacity: 0, duration: 0.45, ease: 'power2.in' }, K('sleep'));
      },
    },
    tip: {
      bg: F2.cream, ink: F2.night,
      html: () => svg(`
        <g id="tBed"><g transform="translate(250 850)"><rect x="-170" y="-110" width="38" height="200" rx="14" fill="#a0673a"/><rect x="134" y="-30" width="38" height="120" rx="14" fill="#a0673a"/>
          <rect x="-160" y="-10" width="320" height="72" rx="18" fill="${F2.blue}"/><rect x="-130" y="-52" width="100" height="46" rx="22" fill="#fff"/><rect x="-160" y="52" width="320" height="26" rx="10" fill="#a0673a"/></g></g>
        <g id="tPlate"><g transform="translate(250 1160)"><ellipse rx="160" ry="50" fill="#d9dfec" transform="translate(6 8)"/><ellipse rx="160" ry="50" fill="#fff"/><ellipse rx="115" ry="32" fill="#eef2f9"/>
          <circle cx="-45" cy="-12" r="32" fill="${F2.green}"/><circle cx="25" cy="-16" r="34" fill="${F2.orange}"/><rect x="-6" y="-26" width="62" height="24" rx="12" fill="#c0703a"/></g></g>
        ${f2Arrow('tA1', 430, 860, 590, 960, F2.night)}${f2Arrow('tA2', 430, 1150, 590, 1060, F2.night)}
        <g id="tBat"><g transform="translate(770 1080)"><rect x="-60" y="-262" width="120" height="40" rx="12" fill="${F2.night}"/>
          <rect x="-120" y="-230" width="240" height="430" rx="34" fill="${F2.night}"/><rect x="-96" y="-206" width="192" height="382" rx="20" fill="#2b3a5c"/>
          <rect x="-96" y="120" width="192" height="56" rx="16" fill="${F2.red}"/>
          <rect class="lvl" x="-96" y="-206" width="192" height="382" rx="20" fill="${F2.green}"/>
          <g class="zap" opacity="0"><path d="M14 -80 L-44 14 L-6 14 L-20 90 L42 -6 L4 -6Z" fill="${F2.yellow}"/></g></g></g>
        ${brain('tBrain', 770, 720, 0.42)}`),
      anim(tl, s, K, $) {
        f2Pop(tl, $('#tBat'), s.t0 + 0.15, 0.4);
        f2Pop(tl, $('#tBrain'), s.t0 + 0.35, 0.4);
        f2Pop(tl, $('#tBed'), K('bed') - 0.15, 0.4);
        f2Pop(tl, $('#tPlate'), K('food') - 0.15, 0.4);
        f2Pop(tl, $('#tA1'), K('food') + 0.6, 0.3);
        f2Pop(tl, $('#tA2'), K('food') + 0.8, 0.3);
        tl.fromTo($('#tBat .lvl'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.5, ease: 'power2.out' }, K('battery') - 0.3);
        tl.to($('#tBat .zap'), { opacity: 1, duration: 0.15 }, K('battery') + 0.1);
        tl.to($('#tBrain'), { y: -30, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.out' }, K('battery') + 0.2);
      },
    },
    closing: {
      bg: F2.sky, ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="${F2.sky}"/>
        ${f2Cloud('clC1', 170, 1480, 1.0)}${f2Cloud('clC2', 880, 1490, 0.85)}
        ${brain('clBrain', 505, 980, 1.0)}
        <g id="clPlate"><ellipse cx="505" cy="1190" rx="170" ry="40" fill="#fff"/></g>
        ${[-80, 0, 80].map((dx, i) => bolt(`clBo${i}`, 505 + dx, 1150, 0.7)).join('')}
        ${pill('clSteps', 790, 760, '0 PASOS', F2.night, F2.yellow, 290)}
        ${clock('clClock', 210, 780, 0.9)}
        ${f2Bubble('clB1', 220, 1340, 0.65, F2.yellow)}${f2Bubble('clB2', 505, 1370, 0.65, F2.green)}${f2Bubble('clB3', 790, 1340, 0.65, F2.pink)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#clC1'), { x: -40 }, { x: 40, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        tl.fromTo($('#clC2'), { x: 30 }, { x: -30, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
        f2Pop(tl, $('#clBrain'), s.t0 + 0.1, 0.4);
        f2Pop(tl, $('#clPlate'), s.t0 + 0.3, 0.35);
        tl.fromTo($('[id^=clBo]'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.1 }, s.t0 + 0.4);
        tl.to($('[id^=clBo]'), { y: (i: number) => -90, x: (i: number) => [80, 0, -80][i], scale: 0.1, opacity: 0, duration: 0.35, ease: 'power2.in', stagger: 0.07 }, K('eat') - 0.3);
        tl.to($('#clBrain .body'), { scaleY: 0.9, scaleX: 1.06, transformOrigin: '50% 100%', duration: 0.1, yoyo: true, repeat: 3 }, K('eat') + 0.05);
        f2Pop(tl, $('#clSteps'), K('still') - 0.1, 0.4);
        f2Pop(tl, $('#clClock'), K('clock') - 0.15, 0.4);
        tl.fromTo($('#clClock .hand'), { rotation: 0, svgOrigin: '0 0' }, { rotation: 360, svgOrigin: '0 0', duration: s.t1 - K('clock'), ease: 'none' }, K('clock'));
        f2Pop(tl, $('#clB1'), K('comments') - 0.15, 0.35);
        f2Pop(tl, $('#clB2'), K('comments') - 0.05, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.05, 0.35);
      },
    },
  });
}
