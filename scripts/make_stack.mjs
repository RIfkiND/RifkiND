import fs from 'node:fs';

const icons = JSON.parse(fs.readFileSync('scripts/icons_cache.json', 'utf8'));

const groups = [
  {
    title: 'LANGUAGES &amp; RUNTIMES',
    items: [
      { name: 'Go', key: 'Go', w: 82 },
      { name: 'Python', key: 'Python', w: 104 },
      { name: 'PHP', key: 'PHP', w: 84 },
      { name: 'C++', key: 'C++', w: 84 },
      { name: 'TypeScript', key: 'TypeScript', w: 132 },
      { name: 'JavaScript', key: 'JavaScript', w: 126 },
      { name: 'Bash', key: 'Bash', w: 90 },
    ]
  },
  {
    title: 'DEVOPS, SYSTEMS &amp; CLOUD',
    items: [
      { name: 'Docker', key: 'Docker', w: 105 },
      { name: 'Linux', key: 'Linux', w: 94 },
      { name: 'Git', key: 'Git', w: 80 },
      { name: 'GitHub Actions', key: 'GitHub Actions', w: 156 },
      { name: 'Nginx', key: 'Nginx', w: 96 },
    ]
  },
  {
    title: 'DATABASES &amp; IN-MEMORY CACHING',
    items: [
      { name: 'Redis', key: 'Redis', w: 95 },
      { name: 'PostgreSQL', key: 'PostgreSQL', w: 134 },
      { name: 'MySQL', key: 'MySQL', w: 102 },
    ]
  }
];

function renderDesktopStack(isDark) {
  const bg = isDark ? '#121212' : '#ffffff';
  const border = isDark ? '#2a2a2a' : '#e5e5e5';
  const textPrimary = isDark ? '#ffffff' : '#111827';
  const textSecondary = isDark ? 'rgba(255,255,255,0.6)' : '#4b5563';
  const textMuted = isDark ? 'rgba(255,255,255,0.45)' : '#6b7280';
  const chipBg = isDark ? '#191919' : '#f9fafb';
  const chipStroke = isDark ? '#333333' : '#d1d5db';
  const roughStroke = isDark ? '#ffffff' : '#1f2937';

  let sectionsSvg = '';
  let startY = 126;
  const startX = 44;
  const gap = 12;

  groups.forEach((g, gIdx) => {
    sectionsSvg += `
    <g class="rise" style="animation-delay:${100 + gIdx * 70}ms">
      <text class="hand" x="${startX}" y="${startY}" font-size="12" letter-spacing="1.8" font-weight="700" fill="${textMuted}">${g.title}</text>
    </g>`;

    let curX = startX;
    const chipY = startY + 12;

    g.items.forEach((item, iIdx) => {
      const icon = icons[item.key];
      const iconHex = icon ? `#${icon.hex}` : '#fff';
      const iconPath = icon ? icon.path : '';
      const w = item.w;

      sectionsSvg += `
      <g class="rise" style="animation-delay:${150 + gIdx * 60 + iIdx * 30}ms">
        <rect filter="url(#rough)" x="${curX}" y="${chipY}" width="${w}" height="38" rx="9" fill="${chipBg}" stroke="${chipStroke}" stroke-width="1.2"/>
        <g transform="translate(${curX + 11} ${chipY + 9}) scale(0.83)">
          <path d="${iconPath}" fill="${iconHex}"/>
        </g>
        <text class="hand" x="${curX + 38}" y="${chipY + 24}" font-size="14.5" font-weight="600" fill="${textPrimary}">${item.name}</text>
      </g>`;

      curX += w + gap;
    });

    startY += 92;
  });

  // Decorative doodle isometric elements on bottom right
  const decoSvg = isDark ? `
  <g transform="translate(680 340) scale(0.72)">
    <g filter="url(#rough)" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">
      <polygon points="69.28,40 0,80 0,74 69.28,34" fill="#1c1c1c"/>
      <polygon points="-69.28,40 0,80 0,74 -69.28,34" fill="#0b0b0b"/>
      <polygon points="0,-6 69.28,34 0,74 -69.28,34" fill="#151515"/>
      <!-- Database cylinder -->
      <path d="M-14 26 V38 A10 5 0 0 0 6 38 V26" fill="#121212"/>
      <ellipse cx="-4" cy="26" rx="10" ry="5" fill="#1c1c1c"/>
      <!-- Server mini block -->
      <polygon points="20,18 28,22.5 28,31.5 20,27" fill="#0b0b0b"/>
      <polygon points="36,18 28,22.5 28,31.5 36,27" fill="#1f1f1f"/>
      <polygon points="28,13.5 36,18 28,22.5 20,18" fill="#151515"/>
    </g>
    <text class="hand" x="-60" y="-12" font-size="12" font-weight="700" letter-spacing="1.5" fill="#fff" fill-opacity=".8">HIGH PERFORMANCE &amp; RESILIENT</text>
  </g>` : `
  <g transform="translate(680 340) scale(0.72)">
    <g filter="url(#rough)" fill="none" stroke="#1f2937" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">
      <polygon points="69.28,40 0,80 0,74 69.28,34" fill="#e5e7eb"/>
      <polygon points="-69.28,40 0,80 0,74 -69.28,34" fill="#d1d5db"/>
      <polygon points="0,-6 69.28,34 0,74 -69.28,34" fill="#f3f4f6"/>
      <!-- Database cylinder -->
      <path d="M-14 26 V38 A10 5 0 0 0 6 38 V26" fill="#ffffff"/>
      <ellipse cx="-4" cy="26" rx="10" ry="5" fill="#e5e7eb"/>
      <!-- Server mini block -->
      <polygon points="20,18 28,22.5 28,31.5 20,27" fill="#d1d5db"/>
      <polygon points="36,18 28,22.5 28,31.5 36,27" fill="#e5e7eb"/>
      <polygon points="28,13.5 36,18 28,22.5 20,18" fill="#f3f4f6"/>
    </g>
    <text class="hand" x="-60" y="-12" font-size="12" font-weight="700" letter-spacing="1.5" fill="#111827" fill-opacity=".8">HIGH PERFORMANCE &amp; RESILIENT</text>
  </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="430" viewBox="0 0 900 430" role="img" aria-label="Rifki Nauva Dzaki — Tech Stack"><title>Rifki Nauva Dzaki — Tech Stack</title>
<style>
.hand{font-family:"Excalifont","Virgil","Segoe Print","Bradley Hand","Chalkboard SE","Comic Sans MS",cursive}
.rise{animation:rise .5s cubic-bezier(.2,.7,.2,1) both}
.fade{animation:fade .6s ease-out both}
@keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<defs>
<filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter>
<clipPath id="card"><rect width="900" height="430" rx="14"/></clipPath>
</defs>
<g clip-path="url(#card)">
<rect width="900" height="430" fill="${bg}"/>

<g class="hand">
  <g class="rise" style="animation-delay:0ms">
    <text x="44" y="52" font-size="23" font-weight="700" fill="${textPrimary}">🛠 Tech Stack &amp; Infrastructure</text>
  </g>
  <g filter="url(#rough)" class="fade" style="animation-delay:150ms">
    <path d="M44 63 C180 58 340 68 480 62 S 580 65 610 63" fill="none" stroke="${roughStroke}" stroke-width="2.4" stroke-linecap="round"/>
  </g>
  <g class="rise" style="animation-delay:70ms">
    <text x="44" y="86" font-size="13.5" fill="${textSecondary}">Core languages, backend runtimes, databases, and automated infrastructure tools.</text>
  </g>
</g>

${sectionsSvg}

${decoSvg}

</g>
<rect x=".5" y=".5" width="899" height="429" rx="13.5" fill="none" stroke="${border}"/>
</svg>`;
}

function renderNarrowStack(isDark) {
  const bg = isDark ? '#121212' : '#ffffff';
  const border = isDark ? '#2a2a2a' : '#e5e5e5';
  const textPrimary = isDark ? '#ffffff' : '#111827';
  const textSecondary = isDark ? 'rgba(255,255,255,0.6)' : '#4b5563';
  const textMuted = isDark ? 'rgba(255,255,255,0.45)' : '#6b7280';
  const chipBg = isDark ? '#191919' : '#f9fafb';
  const chipStroke = isDark ? '#333333' : '#d1d5db';
  const roughStroke = isDark ? '#ffffff' : '#1f2937';

  let sectionsSvg = '';
  let curY = 118;
  const startX = 32;
  const maxX = 540 - 32;
  const gap = 10;
  const rowHeight = 44;

  groups.forEach((g, gIdx) => {
    sectionsSvg += `
    <g class="rise" style="animation-delay:${100 + gIdx * 70}ms">
      <text class="hand" x="${startX}" y="${curY}" font-size="11.5" letter-spacing="1.6" font-weight="700" fill="${textMuted}">${g.title}</text>
    </g>`;

    let curX = startX;
    let lineY = curY + 10;

    g.items.forEach((item, iIdx) => {
      const icon = icons[item.key];
      const iconHex = icon ? `#${icon.hex}` : '#fff';
      const iconPath = icon ? icon.path : '';
      const w = item.w;

      if (curX + w > maxX) {
        curX = startX;
        lineY += rowHeight;
      }

      sectionsSvg += `
      <g class="rise" style="animation-delay:${150 + gIdx * 60 + iIdx * 25}ms">
        <rect filter="url(#rough)" x="${curX}" y="${lineY}" width="${w}" height="36" rx="8" fill="${chipBg}" stroke="${chipStroke}" stroke-width="1.2"/>
        <g transform="translate(${curX + 10} ${lineY + 8}) scale(0.83)">
          <path d="${iconPath}" fill="${iconHex}"/>
        </g>
        <text class="hand" x="${curX + 36}" y="${lineY + 23}" font-size="13.5" font-weight="600" fill="${textPrimary}">${item.name}</text>
      </g>`;

      curX += w + gap;
    });

    curY = lineY + 54;
  });

  const totalHeight = curY + 20;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="540" height="${totalHeight}" viewBox="0 0 540 ${totalHeight}" role="img" aria-label="Rifki Nauva Dzaki — Tech Stack"><title>Rifki Nauva Dzaki — Tech Stack</title>
<style>
.hand{font-family:"Excalifont","Virgil","Segoe Print","Bradley Hand","Chalkboard SE","Comic Sans MS",cursive}
.rise{animation:rise .5s cubic-bezier(.2,.7,.2,1) both}
.fade{animation:fade .6s ease-out both}
@keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<defs>
<filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter>
<clipPath id="card"><rect width="540" height="${totalHeight}" rx="14"/></clipPath>
</defs>
<g clip-path="url(#card)">
<rect width="540" height="${totalHeight}" fill="${bg}"/>

<g class="hand">
  <g class="rise" style="animation-delay:0ms">
    <text x="32" y="48" font-size="20" font-weight="700" fill="${textPrimary}">🛠 Tech Stack</text>
  </g>
  <g filter="url(#rough)" class="fade" style="animation-delay:150ms">
    <path d="M32 58 C110 54 220 62 300 58 S 360 61 380 59" fill="none" stroke="${roughStroke}" stroke-width="2.2" stroke-linecap="round"/>
  </g>
  <g class="rise" style="animation-delay:70ms">
    <text x="32" y="78" font-size="12.5" fill="${textSecondary}">Core languages, backend systems, and DevOps automation.</text>
  </g>
</g>

${sectionsSvg}

</g>
<rect x=".5" y=".5" width="539" height="${totalHeight - 1}" rx="13.5" fill="none" stroke="${border}"/>
</svg>`;
}

fs.writeFileSync('assets/stack-dark.svg', renderDesktopStack(true));
fs.writeFileSync('assets/stack-light.svg', renderDesktopStack(false));
fs.writeFileSync('assets/stack-dark-narrow.svg', renderNarrowStack(true));
fs.writeFileSync('assets/stack-light-narrow.svg', renderNarrowStack(false));
console.log('Generated desktop and narrow stack SVGs');

