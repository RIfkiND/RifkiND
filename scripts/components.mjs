// SVG components for Rifki Nauva Dzaki's Portfolio Design System.
// Native, scalable, and responsive SVG illustrations following the dark technical aesthetic.

import { Svg, measure, wrap, brandIcon, rng, n } from './lib.mjs';
import { profile, focus, stack, projects, footer } from './content.mjs';

const W = 1200;

// ---------------------------------------------------------------- geometry & utilities

function poly(points, fill, stroke = 'none', sw = 1, extra = '') {
  const pts = points.map(([x, y]) => `${n(x)},${n(y)}`).join(' ');
  return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
}

// 3D Isometric Box
function isoBox(cx, cy, w, d, h, colors, stroke = '#303030', sw = 1.2) {
  const pTop = [
    [cx, cy - h],
    [cx + w, cy - h + w * 0.5],
    [cx + w - d, cy - h + (w + d) * 0.5],
    [cx - d, cy - h + d * 0.5],
  ];
  const pLeft = [
    [cx - d, cy - h + d * 0.5],
    [cx + w - d, cy - h + (w + d) * 0.5],
    [cx + w - d, cy + (w + d) * 0.5],
    [cx - d, cy + d * 0.5],
  ];
  const pRight = [
    [cx + w - d, cy - h + (w + d) * 0.5],
    [cx + w, cy - h + w * 0.5],
    [cx + w, cy + w * 0.5],
    [cx + w - d, cy + (w + d) * 0.5],
  ];
  return [
    poly(pLeft, colors.left, stroke, sw),
    poly(pRight, colors.right, stroke, sw),
    poly(pTop, colors.top, stroke, sw),
  ].join('');
}

// 3D Isometric Cylinder (Database nodes)
function isoCylinder(cx, cy, rx, ry, h, colors, stroke = '#303030', sw = 1.2) {
  const pathD = `M ${n(cx - rx)} ${n(cy - h)} v ${n(h)} A ${n(rx)} ${n(ry)} 0 0 0 ${n(cx + rx)} ${n(cy)} v ${n(-h)} A ${n(rx)} ${n(ry)} 0 0 1 ${n(cx - rx)} ${n(cy - h)} Z`;
  return [
    `<path d="${pathD}" fill="${colors.body}" stroke="${stroke}" stroke-width="${sw}"/>`,
    `<ellipse cx="${n(cx)}" cy="${n(cy - h)}" rx="${n(rx)}" ry="${n(ry)}" fill="${colors.top}" stroke="${stroke}" stroke-width="${sw}"/>`,
  ].join('');
}

// Isometric Grid Floor
function isoGrid(cx, cy, cols, rows, size, color, opacity = 0.25) {
  const lines = [];
  for (let c = 0; c <= cols; c++) {
    const x1 = cx + c * size;
    const y1 = cy + c * size * 0.5;
    const x2 = cx + c * size - rows * size;
    const y2 = cy + (c + rows) * size * 0.5;
    lines.push(`<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1"/>`);
  }
  for (let r = 0; r <= rows; r++) {
    const x1 = cx - r * size;
    const y1 = cy + r * size * 0.5;
    const x2 = cx + cols * size - r * size;
    const y2 = cy + (cols + r) * size * 0.5;
    lines.push(`<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1"/>`);
  }
  return lines.join('');
}

function technicalCard(s, t, w, h, glows = []) {
  s.defs.push(
    `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.canvas}"/><stop offset="1" stop-color="${t.canvas2}"/></linearGradient>`,
    `<clipPath id="clip"><rect width="${w}" height="${h}" rx="22"/></clipPath>`,
    ...glows.map((g, i) => `<radialGradient id="glow${i}"><stop offset="0" stop-color="${g.color}" stop-opacity="${g.opacity}"/><stop offset="1" stop-color="${g.color}" stop-opacity="0"/></radialGradient>`),
  );
  return [
    `<rect width="${w}" height="${h}" rx="22" fill="url(#bg)"/>`,
    `<g clip-path="url(#clip)">`,
    ...glows.map((g, i) => `<circle cx="${g.cx}" cy="${g.cy}" r="${g.r}" fill="url(#glow${i})"/>`),
  ];
}

function closeTechnicalCard(t, w, h) {
  return [
    `</g>`,
    `<rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="21.5" fill="none" stroke="${t.border}" stroke-width="1"/>`,
  ];
}

function packet(color, path, dur, delay = 0) {
  return `<g opacity="0"><circle r="7" fill="url(#pg-${color.replace('#', '')})"/><circle r="2.5" fill="${color}"/>` +
    `<animateMotion dur="${dur}s" begin="${delay}s" repeatCount="indefinite" path="${path}"/>` +
    `<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.85;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/></g>`;
}

function packetGlow(color) {
  return `<radialGradient id="pg-${color.replace('#', '')}"><stop offset="0" stop-color="${color}" stop-opacity=".65"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
}

const ICONS = {
  arrow: (c, w = 1.8) => `<path d="M7 17L17 7M9 7h8v8" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`,
  mail: (c) => `<rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="${c}" stroke-width="1.8"/><path d="M4 7.5l8 5.5 8-5.5" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  globe: (c) => `<circle cx="12" cy="12" r="9" fill="none" stroke="${c}" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9s1.3-6.4 3.8-9z" fill="none" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"/>`,
  terminal: (c) => `<rect x="3" y="4" width="18" height="16" rx="3" fill="none" stroke="${c}" stroke-width="1.8"/><path d="M7 9l3 3-3 3M13 15h4" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>`,
  server: (c) => `<rect x="3" y="4" width="18" height="7" rx="2" fill="none" stroke="${c}" stroke-width="1.8"/><rect x="3" y="13" width="18" height="7" rx="2" fill="none" stroke="${c}" stroke-width="1.8"/><circle cx="7" cy="7.5" r="1" fill="${c}"/><circle cx="7" cy="16.5" r="1" fill="${c}"/>`,
  database: (c) => `<ellipse cx="12" cy="5" rx="8" ry="3" fill="none" stroke="${c}" stroke-width="1.8"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" fill="none" stroke="${c}" stroke-width="1.8"/>`,
  pin: (c) => `<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" fill="none" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="${c}" stroke-width="1.8"/>`,
};

function uiIcon(name, x, y, size, color) {
  const renderer = ICONS[name] ?? ICONS.terminal;
  return `<g transform="translate(${n(x)} ${n(y)}) scale(${n(size / 24)})">${renderer(color)}</g>`;
}

const delay = (s) => `animation-delay:${s}s`;

// ---------------------------------------------------------------- HERO

export function hero(t) {
  const H = 480;
  const s = new Svg({
    width: W,
    height: H,
    title: `${profile.fullName} — ${profile.role}`,
    desc: `${profile.role}. Dark technical portfolio featuring custom isometric backend architecture illustrations and restrained orange-red accents.`,
  });

  s.css.push(`
.flow{stroke-dasharray:4 6;animation:flow 1.5s linear infinite}
@keyframes flow{to{stroke-dashoffset:-20}}
.ping{transform-box:fill-box;transform-origin:center;animation:ping 2.4s cubic-bezier(0,0,.2,1) infinite}
@keyframes ping{0%{transform:scale(1);opacity:.85}80%,100%{transform:scale(2.6);opacity:0}}
.blink{animation:blink 1.2s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.pulse{animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
.float1{animation:float 7s ease-in-out infinite}
.float2{animation:float 6s ease-in-out -2s infinite}
.float3{animation:float 8s ease-in-out -4s infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
`);

  s.defs.push(
    packetGlow(t.accent),
    packetGlow(t.accentSoft),
    packetGlow(t.infra),
  );

  s.add(...technicalCard(s, t, W, H, [
    { cx: 940, cy: 240, r: 320, color: t.accent, opacity: t.glow },
    { cx: 800, cy: 120, r: 220, color: t.devops, opacity: t.glow * 0.6 },
  ]));

  // Left column: Typography & Status
  const X = 76;
  const status = profile.status.toUpperCase();
  const statusW = measure(status, { font: 'mono', weight: 500, size: 13, ls: 2 });
  s.add(
    `<g class="fu" style="${delay(0.05)}">`,
    `<rect x="${X}" y="70" width="${n(statusW + 52)}" height="34" rx="17" fill="${t.chip}" stroke="${t.border}"/>`,
    `<circle cx="${X + 20}" cy="87" r="4" fill="${t.accent}"/><circle cx="${X + 20}" cy="87" r="4" fill="none" stroke="${t.accent}" class="ping"/>`,
    s.text(status, { x: X + 35, y: 92, font: 'mono', weight: 500, size: 13, ls: 2, fill: t.accent }),
    `</g>`,
  );

  let nameSize = 74;
  while (measure(profile.name, { weight: 800, size: nameSize, ls: -2 }) > 580) nameSize -= 2;
  s.add(s.text(profile.name, { x: X - 2, y: 190, weight: 800, size: nameSize, ls: -2, fill: t.text, cls: 'fu', style: delay(0.12) }));

  s.add(s.text(profile.role, { x: X, y: 244, weight: 600, size: 28, ls: -0.4, fill: t.text, cls: 'fu', style: delay(0.24) }));

  profile.tagline.forEach((line, i) => {
    s.add(s.text(line, { x: X, y: 288 + i * 28, weight: 400, size: 20, fill: t.text2, cls: 'fu', style: delay(0.32 + i * 0.05) }));
  });

  let cx = X;
  focus.forEach((f, i) => {
    const w = 28 + measure(f.title, { weight: 500, size: 15 }) + 16;
    const c = t[f.accent] ?? t.accent;
    s.add(
      `<g class="fu" style="${delay(0.48 + i * 0.07)}">`,
      `<rect x="${n(cx)}" y="356" width="${n(w)}" height="36" rx="18" fill="${t.chip}" stroke="${t.border}"/>`,
      `<circle cx="${n(cx + 17)}" cy="374" r="3.5" fill="${c}"/>`,
      s.text(f.title, { x: cx + 28, y: 379.5, weight: 500, size: 15, fill: t.text2 }),
      `</g>`,
    );
    cx += w + 10;
  });

  const meta = `${profile.location.toUpperCase()}   ·   ${profile.timezone}`;
  s.add(
    `<g class="fu" style="${delay(0.7)}">`,
    uiIcon('pin', X - 2, 420, 17, t.muted),
    s.text(meta, { x: X + 24, y: 433, font: 'mono', weight: 400, size: 14, ls: 0.6, fill: t.muted }),
    `</g>`,
  );

  // Right column: Isometric Technical Architecture System
  const art = [];
  const gridOriginX = 940;
  const gridOriginY = 170;

  // Background Isometric Grid
  art.push(isoGrid(gridOriginX, gridOriginY, 5, 5, 48, t.border, 0.45));

  // Node 1: API Gateway (Isometric Box)
  const gwX = 810;
  const gwY = 220;
  art.push(
    `<g class="float1">`,
    isoBox(gwX, gwY, 54, 54, 38, {
      top: t.raised,
      left: t.platform,
      right: t.canvas,
    }, t.outline, 1.2),
    // Gateway top interface & LED
    `<line x1="${gwX}" y1="${gwY - 38}" x2="${gwX + 30}" y2="${gwY - 38 + 15}" stroke="${t.accent}" stroke-width="2"/>`,
    `<circle cx="${gwX + 16}" cy="${gwY - 26}" r="3" fill="${t.accent}" class="pulse"/>`,
    s.text('API GATEWAY', { x: gwX - 20, y: gwY - 48, font: 'mono', weight: 500, size: 12, ls: 1.5, fill: t.accent }),
    `</g>`,
  );

  // Node 2: Core Backend Services Cluster (Tiered Server Rack)
  const srvX = 950;
  const srvY = 320;
  art.push(
    `<g class="float2">`,
    isoBox(srvX, srvY, 68, 68, 72, {
      top: t.raised,
      left: t.platform,
      right: t.canvas,
    }, t.outline, 1.2),
    // Server rack horizontal slots
    [20, 36, 52].map((off) => `<line x1="${srvX - 68}" y1="${srvY - off + 34}" x2="${srvX}" y2="${srvY - off + 68}" stroke="${t.outlineSecondary}" stroke-width="1.2"/>`).join(''),
    [20, 36, 52].map((off, idx) => `<circle cx="${srvX - 54 + idx * 8}" cy="${srvY - off + 41 + idx * 4}" r="2" fill="${t.accentSoft}"/>`).join(''),
    s.text('CORE SERVICES', { x: srvX - 10, y: srvY - 82, font: 'mono', weight: 500, size: 12, ls: 1.5, fill: t.text2 }),
    `</g>`,
  );

  // Node 3: Distributed Data Store (PostgreSQL / Redis Cylinders)
  const dbX = 1080;
  const dbY = 210;
  art.push(
    `<g class="float3">`,
    isoCylinder(dbX, dbY + 22, 38, 19, 26, {
      top: t.raised,
      body: t.platform,
    }, t.outline, 1.2),
    isoCylinder(dbX, dbY - 14, 38, 19, 26, {
      top: t.raised,
      body: t.platform,
    }, t.outline, 1.2),
    // Database glowing data ring
    `<ellipse cx="${dbX}" cy="${dbY + 6}" rx="38" ry="19" fill="none" stroke="${t.accent}" stroke-width="1.6" stroke-dasharray="3 5" class="flow"/>`,
    s.text('STORAGE & CACHE', { x: dbX - 35, y: dbY - 48, font: 'mono', weight: 500, size: 12, ls: 1.5, fill: t.accentSoft }),
    `</g>`,
  );

  // Isometric Bus Connectors with Flowing Packets
  const pathGwToSrv = `M ${gwX + 24} ${gwY + 12} L ${srvX - 24} ${srvY - 30}`;
  const pathSrvToDb = `M ${srvX + 24} ${srvY - 40} L ${dbX - 20} ${dbY + 10}`;
  art.push(
    `<path d="${pathGwToSrv}" stroke="${t.border}" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 6" class="flow"/>`,
    `<path d="${pathSrvToDb}" stroke="${t.border}" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 6" class="flow"/>`,
    packet(t.accent, pathGwToSrv, 2.2, 0.2),
    packet(t.accentSoft, pathSrvToDb, 2.4, 0.8),
  );

  // Engineering Philosophy watermark
  const meaningW = measure(profile.meaning, { font: 'mono', weight: 400, size: 13, ls: 1.5 });
  art.push(
    `<circle cx="${W - 54 - meaningW - 10}" cy="428" r="3" fill="${t.accent}"/>`,
    s.text(profile.meaning, { x: W - 50, y: 432, font: 'mono', weight: 400, size: 13, ls: 1.5, anchor: 'end', fill: t.muted }),
  );

  s.add(`<g class="fi" style="${delay(0.3)}">`, ...art, `</g>`);
  s.add(...closeTechnicalCard(t, W, H));
  return s;
}

// ---------------------------------------------------------------- BUTTONS

export function button(t, link) {
  const label = link.label;
  const labelW = measure(label, { weight: 600, size: 16 });
  const w = Math.ceil(48 + labelW + 14 + 16 + 18);
  const h = 48;
  const s = new Svg({ width: w, height: h, title: label });
  const accent = t.accent;

  s.add(`<rect x=".75" y=".75" width="${w - 1.5}" height="${h - 1.5}" rx="${h / 2 - 0.75}" fill="${t.surface}" stroke="${t.border}" stroke-width="1.5"/>`);
  s.add(link.icon in ICONS ? uiIcon(link.icon, 18, 14, 20, accent) : brandIcon(link.icon, 20, 15, 18, accent));
  s.add(s.text(label, { x: 48, y: 30, weight: 600, size: 16, fill: t.text }));
  s.add(uiIcon('arrow', w - 34, 17, 14, t.accent));
  return s;
}

// ---------------------------------------------------------------- SECTION HEADERS

export function sectionHeader(t, sec) {
  const H = 120;
  const top = 24;
  const s = new Svg({ width: W, height: H, title: `${sec.no} — ${sec.title}` });
  const noW = measure(sec.no, { font: 'mono', weight: 500, size: 16, ls: 2 });

  s.add(
    `<g class="fu">`,
    s.text(sec.no, { x: 0, y: top + 26, font: 'mono', weight: 500, size: 16, ls: 2, fill: t.accent }),
    s.text(`/  ${sec.eyebrow}`, { x: noW + 12, y: top + 26, font: 'mono', weight: 500, size: 15, ls: 2, fill: t.muted }),
    `</g>`,
  );

  s.add(s.text(sec.title, { x: -2, y: top + 76, weight: 700, size: 38, ls: -0.8, fill: t.text, cls: 'fu', style: delay(0.08) }));

  const x1 = measure(sec.title, { weight: 700, size: 38, ls: -0.8 }) + 32;
  const x2 = W - 20;
  s.add(`<line x1="${n(x1)}" y1="${top + 64}" x2="${x2}" y2="${top + 64}" stroke="${t.border}" stroke-width="1.5" class="draw" style="--len:${n(x2 - x1)}px;${delay(0.2)}"/>`);
  s.add(`<circle cx="${W - 10}" cy="${top + 64}" r="4" fill="${t.accent}"/>`);
  return s;
}

// ---------------------------------------------------------------- FOCUS CARDS (Pillars)

export function focusCards(t) {
  const H = 300;
  const cardW = 384;
  const s = new Svg({ width: W, height: H, title: 'Engineering Focus', desc: focus.map((f) => `${f.title}: ${f.desc}`).join(' ') });

  // Custom Isometric SVGs for each card
  const illustrations = {
    backend: (c) => [
      isoBox(58, 64, 20, 20, 24, { top: t.raised, left: t.platform, right: t.canvas }, c, 1.2),
      `<circle cx="58" cy="46" r="2.5" fill="${c}"/>`,
      `<line x1="58" y1="52" x2="68" y2="57" stroke="${c}" stroke-width="1.5"/>`,
    ].join(''),
    devops: (c) => [
      isoBox(52, 62, 18, 18, 18, { top: t.raised, left: t.platform, right: t.canvas }, c, 1.2),
      isoBox(68, 70, 18, 18, 18, { top: t.raised, left: t.platform, right: t.canvas }, c, 1.2),
      `<path d="M42 56 L62 46" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`,
    ].join(''),
    data: (c) => [
      isoCylinder(58, 70, 18, 9, 14, { top: t.raised, body: t.platform }, c, 1.2),
      isoCylinder(58, 52, 18, 9, 14, { top: t.raised, body: t.platform }, c, 1.2),
      `<ellipse cx="58" cy="61" rx="18" ry="9" fill="none" stroke="${c}" stroke-width="1.2" stroke-dasharray="2 3"/>`,
    ].join(''),
  };

  focus.forEach((f, i) => {
    const x = i * (cardW + 24);
    const c = t[f.accent] ?? t.accent;
    const descLines = wrap(f.desc, cardW - 56, { weight: 400, size: 18 });

    s.add(
      `<g class="fu" style="${delay(i * 0.12)}"><g transform="translate(${x} 0)">`,
      `<rect x=".75" y=".75" width="${cardW - 1.5}" height="${H - 1.5}" rx="18" fill="${t.surface}" stroke="${t.border}" stroke-width="1.5"/>`,
      `<rect x="26" y="26" width="64" height="64" rx="14" fill="${t.chip}" stroke="${t.border}" stroke-width="1.2"/>`,
      illustrations[f.id](c),
      s.text(f.label, { x: cardW - 28, y: 50, font: 'mono', weight: 500, size: 13, ls: 2.2, anchor: 'end', fill: c }),
      s.text(f.title, { x: 28, y: 132, weight: 700, size: 25, ls: -0.4, fill: t.text }),
      ...descLines.slice(0, 3).map((line, j) => s.text(line, { x: 28, y: 170 + j * 27, weight: 400, size: 18, fill: t.text2 })),
      s.text(f.tags.join(' · '), { x: 28, y: 268, font: 'mono', weight: 500, size: 13, ls: 1.2, fill: c }),
      `</g></g>`,
    );
  });
  return s;
}

// ---------------------------------------------------------------- TECH STACK

export function stackCard(t) {
  const labelX = 34;
  const chipsX = 230;
  const maxX = W - 30;
  const chipH = 44;
  const gap = 10;
  const padY = 16;
  const rows = [];
  let y = 14;
  let index = 0;

  for (const group of stack) {
    const chips = [];
    let x = chipsX;
    let line = 0;
    for (const [label, slug] of group.items) {
      const w = 41 + measure(label, { weight: 500, size: 16 }) + 14;
      if (x + w > maxX) {
        x = chipsX;
        line += 1;
      }
      chips.push({ label, slug, x, line, w, index: index++ });
      x += w + gap;
    }
    const height = padY * 2 + (line + 1) * chipH + line * gap;
    rows.push({ group, chips, y, height });
    y += height;
  }

  const H = y + 14;
  const s = new Svg({
    width: W,
    height: H,
    title: 'Technologies & Infrastructure',
    desc: stack.map((g) => `${g.label}: ${g.items.map((i) => i[0]).join(', ')}`).join('. '),
  });

  s.add(`<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="20" fill="${t.surface}" stroke="${t.border}" stroke-width="1.5"/>`);

  rows.forEach(({ group, chips, y: ry, height }, i) => {
    const accent = group.accent ? (t[group.accent] ?? t.accent) : t.muted;
    if (i > 0) s.add(`<line x1="28" y1="${ry}" x2="${W - 28}" y2="${ry}" stroke="${t.hairline}" stroke-width="1.5"/>`);
    const midY = ry + padY + chipH / 2;
    s.add(
      `<circle cx="${labelX + 4}" cy="${midY}" r="4" fill="${accent}"/>`,
      s.text(group.label.toUpperCase(), { x: labelX + 18, y: midY + 5, font: 'mono', weight: 500, size: 13, ls: 1.6, fill: t.text2 }),
    );

    for (const c of chips) {
      const cy = ry + padY + c.line * (chipH + gap);
      s.add(
        `<g class="fu" style="${delay(0.04 + c.index * 0.03)}">`,
        `<rect x="${n(c.x)}" y="${cy}" width="${n(c.w)}" height="${chipH}" rx="10" fill="${t.chip}" stroke="${t.border}" stroke-width="1.2"/>`,
        brandIcon(c.slug, c.x + 13, cy + 12, 20, accent),
        s.text(c.label, { x: c.x + 41, y: cy + 28, weight: 500, size: 16, fill: t.text }),
        `</g>`,
      );
    }
  });
  return s;
}

// ---------------------------------------------------------------- PROJECT CARDS

const PANEL_H = 220;

export function projectCard(t, project) {
  const s = new Svg({ width: 588, height: PANEL_H, title: project.name, desc: project.desc });
  const c = t[project.accent] ?? t.accent;
  const descLines = wrap(project.desc, 588 - 56, { weight: 400, size: 17 });

  s.add(
    `<rect x=".75" y=".75" width="586.5" height="${PANEL_H - 1.5}" rx="18" fill="${t.surface}" stroke="${t.border}" stroke-width="1.5"/>`,
    `<circle cx="28" cy="38" r="4" fill="${c}"/>`,
    s.text(project.kind, { x: 42, y: 42, font: 'mono', weight: 500, size: 12, ls: 2, fill: c }),
    s.text(project.name, { x: 28, y: 80, weight: 700, size: 24, ls: -0.4, fill: t.text }),
    ...descLines.slice(0, 2).map((l, i) => s.text(l, { x: 28, y: 114 + i * 26, weight: 400, size: 17, fill: t.text2 })),
    s.text(project.stack.join(' · '), { x: 28, y: 188, font: 'mono', weight: 500, size: 13, ls: 1.4, fill: t.muted }),
    uiIcon('arrow', 588 - 44, 28, 16, c),
  );
  return s;
}

// ---------------------------------------------------------------- FOOTER

export function footerCard(t) {
  const H = 280;
  const gap = 16;
  const s = new Svg({ width: W, height: H + gap, title: footer.title, desc: footer.sub });

  s.add(`<g transform="translate(0 ${gap})">`);
  s.add(...technicalCard(s, t, W, H, [
    { cx: 600, cy: 90, r: 240, color: t.accent, opacity: t.glow },
    { cx: 600, cy: 220, r: 320, color: t.devops, opacity: t.glow * 0.4 },
  ]));

  // Background telemetry line
  s.add(
    `<line x1="80" y1="90" x2="1120" y2="90" stroke="${t.border}" stroke-width="1" stroke-dasharray="4 8"/>`,
    `<circle cx="600" cy="90" r="28" fill="${t.surface}" stroke="${t.border}"/>`,
    `<circle cx="600" cy="90" r="6" fill="${t.accent}"/>`,
    `<circle cx="600" cy="90" r="6" fill="none" stroke="${t.accent}" class="ping"/>`,
  );

  s.add(s.text(footer.title, { x: 600, y: 156, weight: 800, size: 42, ls: -1, anchor: 'middle', fill: t.text, cls: 'fu' }));
  s.add(s.text(footer.sub, { x: 600, y: 198, weight: 400, size: 19, anchor: 'middle', fill: t.text2, cls: 'fu', style: delay(0.1) }));
  s.add(s.text(`${profile.location.toUpperCase()}   ·   ${profile.timezone}`, { x: 600, y: 242, font: 'mono', weight: 500, size: 12, ls: 2.2, anchor: 'middle', fill: t.muted, cls: 'fu', style: delay(0.2) }));

  s.add(...closeTechnicalCard(t, W, H), `</g>`);
  return s;
}

// ---------------------------------------------------------------- ACTIVITY CARD

export function activityCard(t, data) {
  const PAD = 32;
  const cell = 16;
  const step = 20;
  const gridX = 84;
  const gridY = 190;
  const first = new Date(`${data.days[0].date}T00:00:00Z`);
  const offset = first.getUTCDay();
  const weeks = Math.ceil((data.days.length + offset) / 7);
  const gridBottom = gridY + 6 * step + cell;
  const langY = gridBottom + 96;
  const H = langY + 110;
  const fmt = (v) => v.toLocaleString('en-US');
  const updated = data.updated.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Jakarta' });

  const s = new Svg({
    width: W,
    height: H,
    title: 'GitHub Engineering Cadence',
    desc: `${fmt(data.total)} contributions in the last year, current streak ${data.current} days, longest streak ${data.longest} days, ${data.repos} public repositories.`,
  });

  s.css.push(`
.cell{opacity:0;animation:fi .6s ease forwards}
.seg{transform-box:fill-box;transform-origin:left center;transform:scaleX(0);animation:seg 1.1s cubic-bezier(.6,0,.2,1) forwards}
@keyframes seg{to{transform:scaleX(1)}}
.today{transform-box:fill-box;transform-origin:center;animation:today 2.4s ease-in-out infinite}
@keyframes today{0%,100%{opacity:1}50%{opacity:.35}}
@media (prefers-reduced-motion:reduce){.cell{opacity:1}.seg{transform:none}}
`);

  s.add(`<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="20" fill="${t.surface}" stroke="${t.border}" stroke-width="1.5"/>`);

  // Headline numbers
  const stats = [
    [fmt(data.total), '', 'CONTRIBUTIONS · LAST YEAR'],
    [String(data.current), data.current === 1 ? 'day' : 'days', 'CURRENT STREAK'],
    [String(data.longest), data.longest === 1 ? 'day' : 'days', 'LONGEST STREAK'],
    [String(data.repos), '', 'PUBLIC REPOSITORIES'],
  ];
  const colW = (W - PAD * 2) / stats.length;
  stats.forEach(([value, unit, label], i) => {
    const x = PAD + i * colW + (i ? 28 : 0);
    if (i) s.add(`<line x1="${n(PAD + i * colW)}" y1="40" x2="${n(PAD + i * colW)}" y2="118" stroke="${t.hairline}" stroke-width="1.5"/>`);
    const vw = measure(value, { weight: 800, size: 44, ls: -1.2 });
    s.add(
      `<g class="fu" style="${delay(i * 0.08)}">`,
      s.text(value, { x, y: 88, weight: 800, size: 44, ls: -1.2, fill: i === 0 ? t.accent : t.text }),
      unit ? s.text(unit, { x: x + vw + 8, y: 88, weight: 500, size: 18, fill: t.text2 }) : '',
      s.text(label, { x, y: 118, font: 'mono', weight: 500, size: 13, ls: 1.4, fill: t.muted }),
      `</g>`,
    );
  });
  s.add(`<line x1="${PAD}" y1="146" x2="${W - PAD}" y2="146" stroke="${t.hairline}" stroke-width="1.5"/>`);

  // Contribution heatmap
  const months = new Set();
  data.days.forEach((d, i) => {
    const pos = i + offset;
    const week = Math.floor(pos / 7);
    const dow = pos % 7;
    const x = gridX + week * step;
    const y = gridY + dow * step;
    const isLast = i === data.days.length - 1;
    s.add(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="3.5" fill="${t.heat[d.level]}" class="cell${isLast ? ' today' : ''}" style="${delay(n(0.15 + week * 0.014 + dow * 0.02))}"/>`);
    const date = new Date(`${d.date}T00:00:00Z`);
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    if (date.getUTCDate() <= 7 && dow === 0 && !months.has(key) && week < weeks - 1) {
      months.add(key);
      s.add(s.text(date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }), { x, y: gridY - 12, font: 'mono', weight: 400, size: 12, ls: 0.4, fill: t.muted }));
    }
  });

  [['Mon', 1], ['Wed', 3], ['Fri', 5]].forEach(([label, dow]) => {
    s.add(s.text(label, { x: PAD, y: gridY + dow * step + 12, font: 'mono', weight: 400, size: 12, ls: 0.4, fill: t.muted }));
  });

  const legendY = gridBottom + 34;
  const legendX = gridX + weeks * step - 4 - 5 * step;
  s.add(
    s.text(`Updated ${updated}`, { x: gridX, y: legendY + 11, font: 'mono', weight: 400, size: 12, ls: 0.4, fill: t.muted }),
    s.text('Less', { x: legendX - 10, y: legendY + 11, font: 'mono', weight: 400, size: 12, ls: 0.4, anchor: 'end', fill: t.muted }),
    ...t.heat.map((c, i) => `<rect x="${legendX + i * step}" y="${legendY}" width="${cell - 2}" height="${cell - 2}" rx="3" fill="${c}"/>`),
    s.text('More', { x: legendX + 5 * step + 6, y: legendY + 11, font: 'mono', weight: 400, size: 12, ls: 0.4, fill: t.muted }),
  );
  s.add(`<line x1="${PAD}" y1="${legendY + 34}" x2="${W - PAD}" y2="${legendY + 34}" stroke="${t.hairline}" stroke-width="1.5"/>`);

  // Languages
  const top = data.languages.slice(0, 5);
  const other = 100 - top.reduce((a, l) => a + l.pct, 0);
  const langs = other > 0.5 ? [...top, { name: 'Other', pct: other }] : top;
  const colors = [
    [t.accent, 1],
    [t.accentSoft, 1],
    [t.devops, 0.9],
    [t.infra, 0.85],
    [t.data, 0.8],
    [t.muted, 0.6],
  ];

  s.add(s.text('TOP LANGUAGES · BY CODE VOLUME', { x: PAD, y: langY, font: 'mono', weight: 500, size: 13, ls: 1.4, fill: t.muted }));
  const barW = W - PAD * 2;
  let bx = PAD;
  langs.forEach((l, i) => {
    const w = (l.pct / 100) * barW;
    const [c, o] = colors[i] ?? [t.muted, 0.5];
    s.add(`<rect x="${n(bx)}" y="${langY + 18}" width="${n(Math.max(w - 3, 2))}" height="10" rx="5" fill="${c}" fill-opacity="${o}" class="seg" style="${delay(0.3 + i * 0.12)}"/>`);
    bx += w;
  });

  let lx = PAD;
  langs.forEach((l, i) => {
    const [c, o] = colors[i] ?? [t.muted, 0.5];
    const pct = `${l.pct.toFixed(1)}%`;
    const nw = measure(l.name, { weight: 500, size: 16 });
    s.add(
      `<g class="fu" style="${delay(0.5 + i * 0.06)}">`,
      `<circle cx="${n(lx + 5)}" cy="${langY + 61}" r="5" fill="${c}" fill-opacity="${o}"/>`,
      s.text(l.name, { x: lx + 18, y: langY + 66, weight: 500, size: 16, fill: t.text }),
      s.text(pct, { x: lx + 18 + nw + 8, y: langY + 66, font: 'mono', weight: 400, size: 14, fill: t.muted }),
      `</g>`,
    );
    lx += 18 + nw + 8 + measure(pct, { font: 'mono', weight: 400, size: 14 }) + 32;
  });

  return s;
}
