// Shared helpers for the SVG asset generator: fonts, text measuring, and an SVG document builder.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import opentype from 'opentype.js';
import * as simpleIcons from 'simple-icons';

const CACHE_DIR = path.resolve(import.meta.dirname, '../.cache/fonts');
// Google Fonts serves plain TrueType files to non-browser user agents.
const FONT_UA = 'curl/8.0';

const FAMILIES = { sans: 'Plus Jakarta Sans', mono: 'JetBrains Mono' };
const ALIASES = { sans: 'BF Sans', mono: 'BF Mono' };

async function cached(name, produce) {
  const file = path.join(CACHE_DIR, name);
  try {
    return await fs.readFile(file);
  } catch {
    const buf = await produce();
    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(file, buf);
    return buf;
  }
}

async function googleFont(kind, weight, text) {
  let url = `https://fonts.googleapis.com/css2?family=${FAMILIES[kind].replace(/ /g, '+')}:wght@${weight}`;
  if (text) url += `&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url, { headers: { 'User-Agent': FONT_UA } })).text();
  const src = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!src) throw new Error(`No font file for ${FAMILIES[kind]} ${weight}`);
  return Buffer.from(await (await fetch(src)).arrayBuffer());
}

// Full fonts, used only to measure text so layouts can be computed ahead of time.
const metrics = new Map();

export async function loadFonts(spec) {
  for (const [kind, weights] of Object.entries(spec)) {
    for (const weight of weights) {
      const buf = await cached(`${kind}-${weight}.ttf`, () => googleFont(kind, weight));
      metrics.set(`${kind}-${weight}`, opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)));
    }
  }
}

export function measure(str, { font = 'sans', weight = 400, size = 16, ls = 0 } = {}) {
  const f = metrics.get(`${font}-${weight}`);
  if (!f) throw new Error(`Font not loaded: ${font}-${weight}`);
  // Sum advances by hand: opentype.js' shaper chokes on some GSUB lookups in these fonts.
  let units = 0;
  let prev = null;
  for (const ch of str) {
    const glyph = f.charToGlyph(ch);
    units += glyph.advanceWidth ?? 0;
    if (prev) units += f.getKerningValue(prev, glyph);
    prev = glyph;
  }
  return (units * size) / f.unitsPerEm + ls * [...str].length;
}

export function wrap(str, maxWidth, opts) {
  const lines = [];
  let line = '';
  for (const word of str.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && measure(next, opts) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const n = (v) => Math.round(v * 100) / 100;

// Deterministic PRNG so regenerated assets stay identical.
export function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Four-point "bintang" sparkle centred on (cx, cy).
export function sparkle(cx, cy, r, k = 0.16) {
  const c = r * k;
  return `M${n(cx)} ${n(cy - r)}C${n(cx + c)} ${n(cy - c)} ${n(cx + c)} ${n(cy - c)} ${n(cx + r)} ${n(cy)}` +
    `C${n(cx + c)} ${n(cy + c)} ${n(cx + c)} ${n(cy + c)} ${n(cx)} ${n(cy + r)}` +
    `C${n(cx - c)} ${n(cy + c)} ${n(cx - c)} ${n(cy + c)} ${n(cx - r)} ${n(cy)}` +
    `C${n(cx - c)} ${n(cy - c)} ${n(cx - c)} ${n(cy - c)} ${n(cx)} ${n(cy - r)}Z`;
}

// LinkedIn was removed from simple-icons; this is its last published path.
const LINKEDIN = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';

// Filled brand glyph on a 24×24 grid, placed at (x, y) and scaled to `size`.
export function brandIcon(slug, x, y, size, fill) {
  const d = slug === 'linkedin' ? LINKEDIN : simpleIcons[`si${slug[0].toUpperCase()}${slug.slice(1)}`]?.path;
  if (!d) throw new Error(`Unknown icon: ${slug}`);
  return `<path transform="translate(${n(x)} ${n(y)}) scale(${n(size / 24)})" d="${d}" fill="${fill}"/>`;
}

// Base styles shared by every asset. Entrance animations stay visible when motion is reduced.
const BASE_CSS = `
.fs{font-family:'BF Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif}
.fm{font-family:'BF Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.fu{opacity:0;animation:fu .9s cubic-bezier(.2,.7,.2,1) forwards}
.fi{opacity:0;animation:fi 1.2s ease forwards}
.draw{stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:draw 1.6s cubic-bezier(.6,0,.2,1) forwards}
.tw{animation:tw 4s ease-in-out infinite}
@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{to{opacity:1}}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes tw{0%,100%{opacity:.2}50%{opacity:1}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.fu,.fi{opacity:1}.draw{stroke-dashoffset:0}}
`;

export class Svg {
  constructor({ width, height, title, desc = '' }) {
    Object.assign(this, { width, height, title, desc });
    this.glyphs = new Map();
    this.defs = [];
    this.css = [];
    this.body = [];
  }

  add(...parts) {
    this.body.push(...parts);
    return this;
  }

  // Text element using the embedded fonts; records glyphs so only they get embedded.
  text(str, { x, y, font = 'sans', weight = 400, size = 16, fill, ls = 0, anchor, cls = '', style, opacity } = {}) {
    const key = `${font}-${weight}`;
    const set = this.glyphs.get(key) ?? new Set();
    for (const ch of str) set.add(ch);
    this.glyphs.set(key, set);
    const attrs = [
      `x="${n(x)}" y="${n(y)}"`,
      `class="${font === 'mono' ? 'fm' : 'fs'}${cls ? ` ${cls}` : ''}"`,
      `font-weight="${weight}" font-size="${size}"`,
      ls ? `letter-spacing="${ls}"` : '',
      anchor ? `text-anchor="${anchor}"` : '',
      `fill="${fill}"`,
      opacity != null ? `opacity="${opacity}"` : '',
      style ? `style="${style}"` : '',
    ].filter(Boolean);
    return `<text ${attrs.join(' ')}>${esc(str)}</text>`;
  }

  async fontFaces() {
    const faces = [];
    for (const [key, set] of this.glyphs) {
      const [kind, weight] = key.split('-');
      const chars = [...set].sort().join('');
      const hash = crypto.createHash('sha1').update(`${key}:${chars}`).digest('hex').slice(0, 12);
      const buf = await cached(`subset-${key}-${hash}.ttf`, () => googleFont(kind, weight, chars));
      faces.push(`@font-face{font-family:'${ALIASES[kind]}';font-weight:${weight};src:url(data:font/ttf;base64,${buf.toString('base64')}) format('truetype')}`);
    }
    return faces.join('\n');
  }

  async render() {
    const { width: w, height: h } = this;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d">
<title id="t">${esc(this.title)}</title>
<desc id="d">${esc(this.desc)}</desc>
<style>
${await this.fontFaces()}
${BASE_CSS}
${this.css.join('\n')}
</style>
<defs>${this.defs.join('')}</defs>
${this.body.join('\n')}
</svg>
`;
  }
}
