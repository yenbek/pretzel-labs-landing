// repeat(auto-fit, minmax(320px, 1fr)) sets a hard 320px floor on the column. Inside a card that
// is 315px wide with 40px padding there are only 235px to give it, so the column overflows and
// `overflow: hidden` slices the pills, the copy and the panel — exactly what an iPhone 13 mini
// (375px) shows. minmax(min(320px, 100%), 1fr) keeps the intent on wide screens and lets the
// column shrink below 320px when that is all there is.
const fs = require('fs'), crypto = require('crypto');
let h = fs.readFileSync('dist/index.html', 'utf8');
const OLD = "minmax(320px, 1fr)";  // a 260px floor is patched the same way
const NEW = 'minmax(min(320px, 100%), 1fr)';
const n = h.split(OLD).length - 1;
if (!n) { console.log('nothing to patch'); process.exit(0); }
h = h.split(OLD).join(NEW);
const hash = crypto.createHash('sha256').update(fs.readFileSync('dist/app.js')).digest('hex').slice(0, 8);
h = h.replace(/src="app\.js(\?v=[a-f0-9]+)?"/, 'src="app.js?v=' + hash + '"');
fs.writeFileSync('dist/index.html', h);
console.log('patched', n, 'grid(s): 320px floor -> min(320px, 100%)');
