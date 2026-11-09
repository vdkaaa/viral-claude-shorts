// =====================================================================
//  Custom visuals for "Los videojuegos enterrados en el desierto" (flat 2D, HyperFrames). Canal: videojuegos.
//  Original art only: generic cartridges (names only as text: no E.T. character, no Atari logo), desert, cactus,
//  a generic UFO, a dump truck, a sign, an excavator, a museum case. Helpers live inside this block.
// =====================================================================
{
  const BG = '#1a1033', BG2 = '#24164a', DUSK = '#3b2a6b', SAND = '#d99a55', SANDD = '#b8783c', NAVY = '#1f3566', CYAN = '#00e5ff', MAG = '#ff3df2';
  const LABELS = [F2.orange, CYAN, MAG, F2.yellow, F2.green];
  // a generic game cartridge: origin at its center, 160 x 200 at s = 1
  const cart = (id: string, x: number, y: number, s = 1, label = '', c = F2.orange, rot = 0) => `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="M-80 -100 L80 -100 L80 100 L60 100 L60 84 L-60 84 L-60 100 L-80 100Z" fill="#000" opacity="0.25" transform="translate(6 8)"/>
      <path d="M-80 -100 L80 -100 L80 100 L60 100 L60 84 L-60 84 L-60 100 L-80 100Z" fill="#4a4e69"/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="-70" y="${-92 + i * 12}" width="140" height="5" fill="#3a3d55"/>`).join('')}
      <rect x="-62" y="-30" width="124" height="96" rx="8" fill="${c}"/>${label ? f2Txt(0, 34, 44, F2.night, label) : `<rect x="-40" y="0" width="80" height="12" rx="6" fill="#fff" opacity="0.6"/>`}</g></g>`;
  const cactus = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-30" y="-260" width="60" height="260" rx="30" fill="#2f9e5b"/><rect x="-100" y="-180" width="44" height="110" rx="22" fill="#2f9e5b"/><rect x="-100" y="-96" width="90" height="40" rx="20" fill="#2f9e5b"/>
      <rect x="56" y="-220" width="44" height="120" rx="22" fill="#2f9e5b"/><rect x="10" y="-130" width="90" height="40" rx="20" fill="#2f9e5b"/><rect x="0" y="-260" width="30" height="260" rx="15" fill="#24804a" opacity="0.6"/></g></g>`;
  const ufo = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="-40" rx="70" ry="60" fill="${CYAN}" opacity="0.6"/><ellipse cx="0" cy="0" rx="170" ry="46" fill="${F2.gray}"/><ellipse cx="0" cy="-10" rx="170" ry="26" fill="#e3e9f5"/>
      ${[-110, -40, 40, 110].map((dx) => `<circle cx="${dx}" cy="10" r="12" fill="${F2.yellow}"/>`).join('')}</g></g>`;
  const tree = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-20" y="-40" width="40" height="50" fill="#7c4a25"/><path d="M0 -300 L110 -120 L-110 -120Z M0 -230 L140 -40 L-140 -40Z" fill="#2f9e5b"/>
      <path d="M0 -330 L10 -306 L36 -306 L16 -290 L24 -264 L0 -280 L-24 -264 L-16 -290 L-36 -306 L-10 -306Z" fill="${F2.yellow}"/>
      ${[[-40, -150, F2.red], [50, -100, F2.yellow], [-70, -70, CYAN], [20, -200, MAG]].map(([cx, cy, c]) => `<circle cx="${cx}" cy="${cy}" r="14" fill="${c}"/>`).join('')}</g></g>`;
  // a dump truck (drawn facing right, mirrored so it faces left and dumps to the right): origin on the ground under its center; .bed tilts (pivot at its back-bottom corner)
  const truck = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${-s} ${s})">
      <g class="bed"><path d="M-200 -170 L60 -170 L60 -60 L-180 -60Z" fill="${F2.yellow}"/><rect x="-200" y="-180" width="260" height="20" fill="#e0a21f"/></g>
      <rect x="60" y="-150" width="140" height="110" rx="16" fill="${F2.red}"/><rect x="120" y="-136" width="62" height="50" rx="8" fill="${F2.sky}"/>
      <rect x="-210" y="-60" width="420" height="30" rx="10" fill="#555b6e"/>
      ${[-140, -60, 140].map((wx) => `<circle cx="${wx}" cy="-20" r="40" fill="#2b2d42"/><circle cx="${wx}" cy="-20" r="16" fill="#8d99ae"/>`).join('')}</g></g>`;
  const sign = (id: string, x: number, y: number, l1: string, l2: string) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="-12" y="0" width="24" height="230" fill="#7c4a25"/><rect x="-140" y="-120" width="280" height="140" rx="16" fill="#000" opacity="0.2" transform="translate(6 8)"/>
      <rect x="-140" y="-120" width="280" height="140" rx="16" fill="${F2.green}"/><rect x="-128" y="-108" width="256" height="116" rx="10" fill="none" stroke="#fff" stroke-width="5"/>
      ${f2Txt(0, -62, 40, '#fff', l1)}${f2Txt(0, -14, 40, '#fff', l2)}</g></g>`;
  // an excavator facing right: origin on the ground; .arm rotates around (40 -150)
  const digger = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-170" y="-50" width="300" height="50" rx="25" fill="#2b2d42"/>${[-130, -60, 10, 90].map((wx) => `<circle cx="${wx}" cy="-25" r="16" fill="#555b6e"/>`).join('')}
      <rect x="-150" y="-200" width="200" height="150" rx="18" fill="${F2.yellow}"/><rect x="-60" y="-186" width="90" height="70" rx="10" fill="${F2.sky}"/>
      <g class="arm"><path d="M30 -160 L220 -290 L244 -262 L60 -130Z" fill="#e0a21f"/><path d="M220 -290 L300 -120 L270 -108 L196 -270Z" fill="#e0a21f"/>
        <path d="M262 -126 L340 -126 L320 -60 L270 -70Z" fill="#555b6e"/></g></g></g>`;
  const pill = (id: string, x: number, y: number, t: string, bg: string, fg: string, w = 300) => `<g id="${id}"><g transform="translate(${x} ${y})">
      <rect x="${-w / 2}" y="-46" width="${w}" height="92" rx="46" fill="#000" opacity="0.25" transform="translate(6 8)"/><rect x="${-w / 2}" y="-46" width="${w}" height="92" rx="46" fill="${bg}"/>${f2Txt(0, 20, 54, fg, t)}</g></g>`;

  defineVisuals({
    hook: {
      bg: DUSK,
      html: () => svg(`${f2Stars(14)}
        <g transform="translate(800 760)"><circle r="70" fill="${F2.cream}"/><circle cx="28" cy="-16" r="62" fill="${DUSK}"/></g>
        <g id="hDunes">${f2Hill('hD1', 1120, SANDD, SAND, 50)}</g>
        ${cactus('hCactus', 840, 1220, 0.9)}
        <g id="hCarts">${[[210, 1270, -18], [380, 1250, 10], [560, 1280, -8], [710, 1300, 16]].map(([x, y, r], i) => cart(`hC${i}`, x, y, 0.9, '', LABELS[i], r)).join('')}</g>
        <rect x="-20" y="1330" width="1120" height="700" fill="${SAND}"/><path d="M-20 1330 Q260 1300 540 1330 T1100 1320 L1100 1360 L-20 1360Z" fill="${SAND}"/>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#hDunes'), { y: 400 }, { y: 0, duration: 0.5, ease: 'power2.out' }, K('desert') - 0.3);
        tl.fromTo($('#hCactus'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.4, ease: 'back.out(2)' }, K('desert') + 0.3);
        tl.fromTo($('[id^=hC]:not(#hCactus):not(#hCarts)'), { y: 220 }, { y: 0, duration: 0.35, ease: 'back.out(2)', stagger: 0.12 }, K('buried') - 0.2);
      },
    },
    et: {
      bg: BG2,
      html: () => svg(`${f2Stars(14)}
        ${ufo('eUfo', 300, 780, 0.8)}
        ${cart('eCart', 300, 1120, 1.6, 'E.T.', F2.orange)}
        ${pill('eYear', 300, 1390, 'ATARI 2600', CYAN, F2.night, 330)}
        ${f2Calendar('eCal', 750, 900, 0.8, 'SEMANAS', '5', MAG)}
        ${tree('eTree', 750, 1380, 0.8)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#eCart'), { y: 700, rotation: -10 }, { y: 0, rotation: 0, duration: 0.45, ease: 'back.out(1.5)' }, K('release') - 0.35);
        f2Pop(tl, $('#eYear'), K('release') + 0.2, 0.35);
        tl.fromTo($('#eUfo'), { x: -600 }, { x: 0, duration: 0.45, ease: 'power2.out' }, K('alien') - 0.3);
        tl.to($('#eUfo'), { y: -16, duration: 0.5, yoyo: true, repeat: f2Reps(s.t1 - K('alien') - 0.2, 0.5), ease: 'sine.inOut' }, K('alien') + 0.2);
        f2Pop(tl, $('#eCal'), K('weeks') - 0.15, 0.4);
        tl.fromTo($('#eTree'), { scale: 0, transformOrigin: '50% 100%' }, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, K('xmas') - 0.15);
      },
    },
    flop: {
      bg: NAVY,
      html: () => svg(`${f2Stars(10)}
        ${f2Person('fMe', 240, 1010, 1.05)}
        ${[[150, 860, -14], [250, 800, 6], [340, 870, 16]].map(([x, y, r]) => `<g class="fq"><g transform="translate(${x} ${y}) rotate(${r})">${f2Txt(0, 0, 90, F2.yellow, '?', F2OUTLINE)}</g></g>`).join('')}
        <g id="fShelf"><rect x="500" y="740" width="440" height="560" rx="16" fill="#a0673a"/><rect x="520" y="760" width="400" height="520" rx="8" fill="#7c4a25"/>
          ${[920, 1100, 1280].map((sy) => `<rect x="500" y="${sy}" width="440" height="20" fill="#a0673a"/>`).join('')}</g>
        ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<g class="fc">${cart(`fc${r}${c}`, 575 + c * 95, 860 + r * 180, 0.5, '', LABELS[(r + c) % 5])}</g>`).join('')).join('')}
        <g id="fStamp"><g transform="translate(720 1030) rotate(-12)"><rect x="-220" y="-62" width="440" height="124" rx="22" fill="#fff"/><rect x="-208" y="-50" width="416" height="100" rx="16" fill="none" stroke="${F2.red}" stroke-width="10"/>${f2Txt(0, 24, 64, F2.red, 'SIN VENDER')}</g></g>`),
      anim(tl, s, K, $) {
        tl.fromTo($('#fMe'), { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.4)' }, s.t0 + 0.1);
        tl.fromTo($('.fq'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(2.5)', stagger: 0.1 }, K('confused') - 0.1);
        tl.to($('.fq'), { y: -10, duration: 0.4, yoyo: true, repeat: f2Reps(s.t1 - K('confused') - 0.5, 0.4), ease: 'sine.inOut' }, K('confused') + 0.4);
        f2Pop(tl, $('#fShelf'), s.t0 + 0.3, 0.4);
        tl.fromTo($('.fc'), { y: -600, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'bounce.out', stagger: 0.035 }, K('shops') - 0.3);
        tl.fromTo($('#fStamp'), { scale: 2.4, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('nobody') - 0.2);
      },
    },
    dump: {
      bg: '#ffcf8a', ink: F2.night,
      html: () => svg(`<rect width="1080" height="1920" fill="#ffcf8a"/>
        ${f2Sun('dSun', 860, 760, 60, F2.orange)}
        <rect x="-20" y="1250" width="1120" height="700" fill="${SAND}"/><path d="M-20 1250 Q300 1220 600 1250 T1100 1240 L1100 1280 L-20 1280Z" fill="${SANDD}" opacity="0.4"/>
        ${cactus('dCactus', 120, 1260, 0.6)}
        <g id="dPile">${[[700, 1220, -20], [780, 1230, 14], [860, 1215, -8], [740, 1150, 22], [820, 1140, -14], [780, 1070, 6]].map(([x, y, r], i) => `<g class="dp">${cart(`dp${i}`, x, y, 0.55, '', LABELS[i % 5], r)}</g>`).join('')}</g>
        ${truck('dTruck', 380, 1260, 1.0)}
        ${sign('dSign', 790, 880, 'NUEVO', 'MÉXICO')}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#dTruck'), { x: -700 }, { x: 0, duration: 0.5, ease: 'power2.out' }, K('trucks') - 0.4);
        tl.to($('#dTruck .bed'), { rotation: -28, svgOrigin: '-200 -60', duration: 0.4, ease: 'power2.out' }, K('dump') - 0.3);
        tl.fromTo($('.dp'), { x: -260, y: -160, opacity: 0, rotation: -60 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.3, ease: 'power2.in', stagger: 0.06 }, K('dump') - 0.05);
        tl.fromTo($('#dSign'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.4, ease: 'back.out(2)' }, K('place') - 0.15);
      },
    },
    legend: {
      bg: BG,
      html: () => svg(`${f2Stars(18)}
        ${[[200, 780, -12], [520, 720, 8], [850, 800, 16]].map(([x, y, r]) => `<g class="lq"><g transform="translate(${x} ${y}) rotate(${r})">${f2Txt(0, 0, 100, CYAN, '?', F2OUTLINE)}</g></g>`).join('')}
        ${f2Hill('lD', 1180, SANDD, SAND, 30)}
        <ellipse id="lHole" cx="700" cy="1210" rx="150" ry="36" fill="#5a3b1c"/>
        ${[[640, 1150, -20, 0], [720, 1130, 12, 1], [790, 1160, 25, 2]].map(([x, y, r, i]) => `<g class="lc">${cart(`lc${i}`, x, y, 0.5, '', LABELS[i], r)}</g>`).join('')}
        ${digger('lDig', 300, 1230, 0.85)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('.lq'), { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.12, ease: 'back.out(2)' }, K('legend') - 0.3);
        tl.to($('.lq'), { opacity: 0, y: -40, duration: 0.3 }, K('dig') - 0.4);
        tl.fromTo($('#lDig'), { x: -500 }, { x: 0, duration: 0.45, ease: 'power2.out' }, K('legend') + 0.4);
        tl.fromTo($('#lHole'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3 }, K('dig') + 0.1);
        tl.to($('#lDig .arm'), { rotation: 18, svgOrigin: '40 -150', duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('dig') - 0.2);
        tl.set($('.lc'), { opacity: 0 }, s.t0);
        tl.fromTo($('.lc'), { y: 120, opacity: 1, scale: 0.4, transformOrigin: '50% 50%' }, { y: -120, scale: 1, duration: 0.4, ease: 'back.out(1.6)', stagger: 0.1, immediateRender: false }, K('stat') - 0.4);
      },
    },
    closing: {
      bg: BG2,
      html: () => svg(`${f2Stars(12)}
        <path id="mLight" d="M505 640 L330 1260 L680 1260Z" fill="${F2.yellow}" opacity="0.18"/>
        <g id="mCase"><rect x="300" y="1240" width="410" height="200" rx="12" fill="#a0673a"/><rect x="300" y="1240" width="410" height="30" fill="#c58a52"/>
          ${cart('mCart', 505, 1100, 1.0, 'E.T.', F2.orange)}
          <rect x="330" y="900" width="350" height="340" rx="10" fill="${CYAN}" opacity="0.18"/><rect x="330" y="900" width="350" height="340" rx="10" fill="none" stroke="#bfefff" stroke-width="8"/>
          <path d="M370 940 L430 940 L370 1020Z" fill="#fff" opacity="0.35"/></g>
        ${f2Stamp('mStamp', 300, 800, 'PEOR JUEGO', F2.red, -12, 400, 60)}
        ${f2Bubble('clB1', 190, 1360, 0.6, CYAN)}${f2Bubble('clB3', 830, 1360, 0.6, MAG)}`),
      anim(tl, s, K, $) {
        tl.fromTo($('#mStamp'), { scale: 2.4, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }, K('worst') - 0.2);
        f2Pop(tl, $('#mCase'), K('museum') - 0.3, 0.45);
        tl.fromTo($('#mLight'), { opacity: 0 }, { opacity: 0.22, duration: 0.3 }, K('museum'));
        tl.to($('#mLight'), { opacity: 0.12, duration: 0.6, yoyo: true, repeat: f2Reps(s.t1 - K('museum') - 0.3, 0.6), ease: 'sine.inOut' }, K('museum') + 0.3);
        f2Pop(tl, $('#clB1'), K('comments') - 0.1, 0.35);
        f2Pop(tl, $('#clB3'), K('comments') + 0.05, 0.35);
      },
    },
  });
}
