import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('assets');

const ICONS = {
  globe: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm7.93 9h-3.18a15.6 15.6 0 0 0-1.38-5.38A8 8 0 0 1 19.93 11zM12 4.07c.88 1.48 1.55 3.75 1.73 6.93H10.27c.18-3.18.85-5.45 1.73-6.93zM4.07 13h3.18a15.6 15.6 0 0 0 1.38 5.38A8 8 0 0 1 4.07 13zm3.18-2H4.07a8 8 0 0 1 4.56-5.38A15.6 15.6 0 0 0 7.25 11zm3.02 2h3.46c-.18 3.18-.85 5.45-1.73 6.93-.88-1.48-1.55-3.75-1.73-6.93zm5.19 5.38A15.6 15.6 0 0 0 16.82 13h3.11a8 8 0 0 1-4.46 5.38z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  mail: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
};

const BUTTON_SPECS = [
  { id: 'portfolio', label: 'Portfolio', icon: 'globe', color: '#10B981', w: 140 },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', color: '#0A66C2', w: 140 },
  { id: 'email', label: 'Email', icon: 'mail', color: '#EA4335', w: 130 },
  { id: 'instagram', label: 'GitHub', icon: 'github', color: '#8b949e', w: 136 },
  { id: 'github', label: 'GitHub', icon: 'github', color: '#8b949e', w: 136 }
];

function makeButtonSvg(spec, theme) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#121212' : '#ffffff';
  const pillBg = isDark ? '#191919' : '#f8f9fa';
  const pillStroke = isDark ? '#333333' : '#d1d5db';
  const textCol = isDark ? '#ffffff' : '#111827';
  const iconCol = isDark ? (spec.color === '#8b949e' ? '#ffffff' : spec.color) : (spec.color === '#8b949e' ? '#24292f' : spec.color);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${spec.w}" height="42" viewBox="0 0 ${spec.w} 42" role="img" aria-label="${spec.label}">
<style>
.hand{font-family:"Excalifont","Virgil","Segoe Print","Bradley Hand","Chalkboard SE","Comic Sans MS",cursive}
</style>
<defs>
<filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.8"/>
</filter>
</defs>
<rect filter="url(#rough)" x="2" y="2" width="${spec.w - 4}" height="38" rx="10" fill="${pillBg}" stroke="${pillStroke}" stroke-width="1.2"/>
<g transform="translate(14 11) scale(0.85)">
  <path d="${ICONS[spec.icon]}" fill="${iconCol}"/>
</g>
<text class="hand" x="44" y="26" font-size="14.5" font-weight="600" fill="${textCol}">${spec.label}</text>
</svg>`;
}

// Generate Buttons
for (const spec of BUTTON_SPECS) {
  fs.writeFileSync(path.join(OUT, `btn-${spec.id}-dark.svg`), makeButtonSvg(spec, 'dark'), 'utf8');
  fs.writeFileSync(path.join(OUT, `btn-${spec.id}-light.svg`), makeButtonSvg(spec, 'light'), 'utf8');
}
console.log('Buttons generated successfully.');

// Generate Footer (Desktop 900x200, Mobile 540x280)
function makeFooterSvg(isMobile, theme) {
  const isDark = theme === 'dark';
  const W = isMobile ? 540 : 900;
  const H = isMobile ? 280 : 200;

  const bg = isDark ? '#121212' : '#ffffff';
  const border = isDark ? '#2a2a2a' : '#e5e5e5';
  const titleCol = isDark ? '#ffffff' : '#111827';
  const subCol = isDark ? 'rgba(255,255,255,0.65)' : '#4b5563';
  const eyeCol = isDark ? 'rgba(255,255,255,0.45)' : '#6b7280';
  const strokeLine = isDark ? '#ffffff' : '#111827';
  const pillBg = isDark ? '#191919' : '#f3f4f6';
  const pillStroke = isDark ? '#333333' : '#d1d5db';
  const nodeFill = isDark ? '#1c1c1c' : '#e5e7eb';
  const nodeStroke = isDark ? '#ffffff' : '#1f2937';

  if (!isMobile) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Let's build reliable systems together">
<style>
.hand{font-family:"Excalifont","Virgil","Segoe Print","Bradley Hand","Chalkboard SE","Comic Sans MS",cursive}
.rise{animation:rise .5s cubic-bezier(.2,.7,.2,1) both}
.fade{animation:fade .6s ease-out both}
.float{animation:float 3.5s ease-in-out infinite alternate}
@keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes float{from{transform:translateY(0)}to{transform:translateY(-5px)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<defs>
<filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/>
</filter>
<clipPath id="card"><rect width="${W}" height="${H}" rx="14"/></clipPath>
</defs>
<g clip-path="url(#card)">
<rect width="${W}" height="${H}" fill="${bg}"/>

<g class="hand">
  <g class="rise" style="animation-delay:0ms">
    <text x="44" y="48" font-size="12" letter-spacing="2" font-weight="700" fill="${eyeCol}">LET'S CONNECT · OPEN FOR OPPORTUNITIES</text>
  </g>
  <g class="rise" style="animation-delay:70ms">
    <text x="42" y="86" font-size="30" font-weight="700" fill="${titleCol}">Let's build reliable systems together.</text>
  </g>
  <g filter="url(#rough)" class="fade" style="animation-delay:200ms">
    <path d="M44 97 C180 92 360 102 520 95 S 620 98 640 96" fill="none" stroke="${strokeLine}" stroke-width="2.2" stroke-linecap="round"/>
  </g>
  <g class="rise" style="animation-delay:140ms">
    <text x="44" y="125" font-size="14.5" fill="${subCol}">Backend architecture, distributed services &amp; automated cloud infrastructure.</text>
  </g>

  <!-- Email CTA Pill -->
  <g class="rise" style="animation-delay:200ms">
    <rect filter="url(#rough)" x="44" y="142" width="310" height="38" rx="10" fill="${pillBg}" stroke="${pillStroke}" stroke-width="1.2"/>
    <g transform="translate(56 151) scale(0.85)">
      <path d="${ICONS.mail}" fill="#EA4335"/>
    </g>
    <text class="hand" x="84" y="166" font-size="14.5" font-weight="600" fill="${titleCol}">rifkinauvaldzaki08@gmail.com</text>
  </g>
</g>

<!-- Isometric Doodle Server Beacon on Right Side -->
<g class="float" transform="translate(760 100)">
  <g filter="url(#rough)" fill="none" stroke="${nodeStroke}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">
    <polygon points="50,28 0,56 0,50 50,22" fill="${nodeFill}"/>
    <polygon points="-50,28 0,56 0,50 -50,22" fill="${isDark ? '#0b0b0b' : '#d1d5db'}"/>
    <polygon points="0,-6 50,22 0,50 -50,22" fill="${isDark ? '#151515' : '#f3f4f6'}"/>
    
    <polygon points="50,-10 0,18 0,12 50,-16" fill="${nodeFill}"/>
    <polygon points="-50,-10 0,18 0,12 -50,-16" fill="${isDark ? '#0b0b0b' : '#d1d5db'}"/>
    <polygon points="0,-44 50,-16 0,12 -50,-16" fill="${isDark ? '#151515' : '#f3f4f6'}"/>
    
    <line x1="0" y1="-44" x2="0" y2="-62" stroke-dasharray="2 3"/>
    <circle cx="0" cy="-66" r="5" fill="#3fb950" stroke="none"/>
  </g>
</g>
</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="13.5" fill="none" stroke="${border}"/>
</svg>`;
  } else {
    // Mobile narrow
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Let's build reliable systems together">
<style>
.hand{font-family:"Excalifont","Virgil","Segoe Print","Bradley Hand","Chalkboard SE","Comic Sans MS",cursive}
.rise{animation:rise .5s cubic-bezier(.2,.7,.2,1) both}
.fade{animation:fade .6s ease-out both}
@keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<defs>
<filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/>
</filter>
<clipPath id="card"><rect width="${W}" height="${H}" rx="14"/></clipPath>
</defs>
<g clip-path="url(#card)">
<rect width="${W}" height="${H}" fill="${bg}"/>

<g class="hand">
  <g class="rise" style="animation-delay:0ms">
    <text x="36" y="52" font-size="12" letter-spacing="2" font-weight="700" fill="${eyeCol}">LET'S CONNECT · OPEN TO ROLES</text>
  </g>
  <g class="rise" style="animation-delay:70ms">
    <text x="34" y="92" font-size="25" font-weight="700" fill="${titleCol}">Let's build reliable systems</text>
    <text x="34" y="122" font-size="25" font-weight="700" fill="${titleCol}">together.</text>
  </g>
  <g filter="url(#rough)" class="fade" style="animation-delay:200ms">
    <path d="M36 132 C120 128 240 136 340 131 S 400 134 420 132" fill="none" stroke="${strokeLine}" stroke-width="2.2" stroke-linecap="round"/>
  </g>
  <g class="rise" style="animation-delay:140ms">
    <text x="36" y="164" font-size="14" fill="${subCol}">Backend architecture, DevOps &amp; cloud systems.</text>
  </g>

  <!-- Email CTA Pill -->
  <g class="rise" style="animation-delay:200ms">
    <rect filter="url(#rough)" x="36" y="186" width="310" height="42" rx="10" fill="${pillBg}" stroke="${pillStroke}" stroke-width="1.2"/>
    <g transform="translate(50 197) scale(0.85)">
      <path d="${ICONS.mail}" fill="#EA4335"/>
    </g>
    <text class="hand" x="78" y="213" font-size="14.5" font-weight="600" fill="${titleCol}">rifkinauvaldzaki08@gmail.com</text>
  </g>

  <g class="rise" style="animation-delay:260ms">
    <text x="36" y="254" font-size="12" letter-spacing="1.2" fill="${eyeCol}">INDONESIA (UTC+7) · TELKOM UNIVERSITY</text>
  </g>
</g>
</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="13.5" fill="none" stroke="${border}"/>
</svg>`;
  }
}

fs.writeFileSync(path.join(OUT, 'footer-dark.svg'), makeFooterSvg(false, 'dark'), 'utf8');
fs.writeFileSync(path.join(OUT, 'footer-light.svg'), makeFooterSvg(false, 'light'), 'utf8');
fs.writeFileSync(path.join(OUT, 'footer-dark-narrow.svg'), makeFooterSvg(true, 'dark'), 'utf8');
fs.writeFileSync(path.join(OUT, 'footer-light-narrow.svg'), makeFooterSvg(true, 'light'), 'utf8');
console.log('Footers generated successfully.');

