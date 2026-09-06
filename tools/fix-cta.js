// Fixes a layout bug that exists in the original export:
// the CTA card is a hard 760px tall while the hills image scales with viewport width,
// so the image only lines up at ~1040px — wider it gets clipped, narrower it leaves a grey gap.
// Fix: anchor the image to the card's bottom edge and let the card grow instead of clipping.
const fs = require('fs');
const f = process.argv[2] || 'dist/index.html';
let h = fs.readFileSync(f, 'utf8'), n = 0;
const sub = (from, to) => { const before = h; h = h.split(from).join(to); if (h !== before) n++; else console.log('!! not found:', from); };
sub('overflow: hidden; height: 760px;', 'overflow: hidden; min-height: 760px;');
sub('flex: 0 0 auto; top: 430px;', 'flex: 0 0 auto; top: auto; bottom: 0;');
sub('[data-m="cta-hills"]{position:relative!important;top:auto!important;margin-top:24px!important}',
    '[data-m="cta-hills"]{position:relative!important;top:auto!important;margin-top:auto!important}');
fs.writeFileSync(f, h);
console.log('patched', n, 'of 3 rules in', f);
