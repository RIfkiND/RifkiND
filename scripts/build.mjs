// Builds every README asset into ./assets in a dark and a light variant.
// Usage: npm install && npm run build
import fs from 'node:fs/promises';
import path from 'node:path';
import { loadFonts } from './lib.mjs';
import { themes } from './theme.mjs';
import { links, sections, projects } from './content.mjs';
import { hero, button, sectionHeader, focusCards, stackCard, projectCard, footerCard } from './components.mjs';

const OUT = path.resolve(import.meta.dirname, '../assets');

await loadFonts({ sans: [400, 500, 600, 700, 800], mono: [400, 500, 700] });
await fs.mkdir(OUT, { recursive: true });

const jobs = [
  ['hero', hero],
  ['focus', focusCards],
  ['stack', stackCard],
  ['footer', footerCard],
  ...links.map((l) => [`btn-${l.id}`, (t) => button(t, l)]),
  ...sections.map((s) => [`section-${s.id}`, (t) => sectionHeader(t, s)]),
  ...projects.map((p) => [`project-${p.id}`, (t) => projectCard(t, p)]),
];

for (const theme of Object.values(themes)) {
  for (const [name, make] of jobs) {
    const file = path.join(OUT, `${name}-${theme.id}.svg`);
    await fs.writeFile(file, await make(theme).render());
  }
}
console.log(`Wrote ${jobs.length * Object.keys(themes).length} files to ${path.relative(process.cwd(), OUT)}/`);
