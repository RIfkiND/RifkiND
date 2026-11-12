// Renders the live activity card. Run by .github/workflows/activity.yml; also works locally.
// Usage: node scripts/activity.mjs [outDir]
import fs from 'node:fs/promises';
import path from 'node:path';
import { loadFonts } from './lib.mjs';
import { themes } from './theme.mjs';
import { activityCard } from './components.mjs';
import { fetchActivity } from './data.mjs';

const LOGIN = 'RifkiND';
const out = path.resolve(process.argv[2] ?? 'dist');

await loadFonts({ sans: [400, 500, 600, 700, 800], mono: [400, 500, 700] });
const data = await fetchActivity(LOGIN);
await fs.mkdir(out, { recursive: true });
for (const theme of Object.values(themes)) {
  await fs.writeFile(path.join(out, `activity-${theme.id}.svg`), await activityCard(theme, data).render());
}
console.log(`${data.total} contributions · streak ${data.current}/${data.longest} · ${data.repos} repos · ${data.languages.length} languages → ${out}`);
