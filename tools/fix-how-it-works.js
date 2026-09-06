// "How it works": the card is a grid (auto-fit, minmax(320px,1fr)) and the frosted panel is
// pinned with position:absolute; right:40px; bottom:40px. On desktop that drops it neatly into
// the empty second column. Below 1024px the grid collapses to one column, the content column
// takes the full width, and the pinned panel lands straight on top of the step copy.
// Fix: un-pin it on narrow screens so it becomes an ordinary grid item under the text.
const fs = require('fs'), crypto = require('crypto');
let h = fs.readFileSync('dist/index.html', 'utf8');
const MARK = 'right: 40px; bottom: 40px"]';
if (h.includes(MARK)) { console.log('already applied'); process.exit(0); }
const CSS = '@media (max-width:1024px){' +
  '[style*="right: 40px; bottom: 40px"]{position:static!important;width:100%!important;max-width:100%!important}' +
  '}';
h = h.replace('</head>', '<style>' + CSS + '</style></head>');
const hash = crypto.createHash('sha256').update(fs.readFileSync('dist/app.js')).digest('hex').slice(0, 8);
h = h.replace(/src="app\.js(\?v=[a-f0-9]+)?"/, 'src="app.js?v=' + hash + '"');
fs.writeFileSync('dist/index.html', h);
console.log('panel un-pinned below 1024px');
