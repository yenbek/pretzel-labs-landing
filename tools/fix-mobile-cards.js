// Mobile layout repairs for defects that are present in the original export:
//  - two bento containers keep aspect-ratio 1.1/1 + 40px padding on phones, leaving 220px of inner
//    height for a card that needs ~363px, so it is clipped and spills out of its parent;
//  - the forecast panel is pinned to height:220px and its content is cut off at the bottom.
// Both are scoped to <=1024px; desktop is untouched.
const fs = require('fs'), crypto = require('crypto');
let h = fs.readFileSync('dist/index.html', 'utf8');
const MARK = 'aspect-ratio:auto!important;padding:28px!important';
if (h.includes(MARK)) { console.log('already applied'); process.exit(0); }
const CSS = '@media (max-width:1024px){' +
  '[style*="aspect-ratio: 1.1 / 1"][style*="padding: 40px"][style*="border-radius: 30px"]{' + MARK + '}' +
  '[data-h-ui]{height:auto!important}' +
  '}';
h = h.replace('</head>', '<style>' + CSS + '</style></head>');
const hash = crypto.createHash('sha256').update(fs.readFileSync('dist/app.js')).digest('hex').slice(0, 8);
h = h.replace(/src="app\.js(\?v=[a-f0-9]+)?"/, 'src="app.js?v=' + hash + '"');
fs.writeFileSync('dist/index.html', h);
console.log('mobile card fixes injected');
