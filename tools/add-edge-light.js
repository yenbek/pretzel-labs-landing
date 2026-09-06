// Adds a slow, barely-there light travelling around the edge of the frosted-glass UI cards.
// Ring is drawn with a masked conic-gradient so it rides exactly on the existing 1px border.
const fs = require('fs');
const CSS = `
@property --edge-sweep{syntax:"<angle>";initial-value:0deg;inherits:false}
[data-h-ui]{position:relative}
[data-h-ui]::after{
  content:"";position:absolute;inset:-1px;border-radius:inherit;padding:1px;
  background:conic-gradient(from var(--edge-sweep) at 50% 50%,
    rgba(255,255,255,0) 0deg,rgba(255,255,255,0) 190deg,
    rgba(255,255,255,1) 250deg,
    rgba(255,255,255,0) 310deg,rgba(255,255,255,0) 360deg);
  -webkit-mask:linear-gradient(#000,#000) content-box,linear-gradient(#000,#000);
          mask:linear-gradient(#000,#000) content-box,linear-gradient(#000,#000);
  -webkit-mask-composite:xor;mask-composite:exclude;
  opacity:.7;pointer-events:none;
  animation:edge-sweep 9s linear infinite;animation-play-state:paused}
[data-h-ui].edge-live::after{animation-play-state:running}
@keyframes edge-sweep{to{--edge-sweep:360deg}}
@media (prefers-reduced-motion:reduce){[data-h-ui]::after{animation:none;opacity:0}}
`.replace(/\n\s*/g, '');

const JSSNIP = `
  // --- barely-there light travelling along the glass cards' edge ---
  var glassCards = [].slice.call(document.querySelectorAll('[data-h-ui]'));
  glassCards.forEach(function (c) { c.classList.add('edge-live'); });
  if (glassCards.length && 'IntersectionObserver' in window) {
    var edgeIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('edge-live', e.isIntersecting); });
    }, { rootMargin: '150px' });
    glassCards.forEach(function (c) { edgeIO.observe(c); });
  }
})();`;

let h = fs.readFileSync('dist/index.html', 'utf8');
if (h.includes('--edge-sweep')) { console.log('css already present'); }
else { h = h.replace('</head>', '<style>' + CSS + '</style></head>'); fs.writeFileSync('dist/index.html', h); console.log('css injected'); }

let a = fs.readFileSync('dist/app.js', 'utf8');
if (a.includes('edge-live')) { console.log('js already present'); }
else { a = a.replace(/\}\)\(\);\s*$/, JSSNIP + '\n'); fs.writeFileSync('dist/app.js', a); console.log('js injected'); }
