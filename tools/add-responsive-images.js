// The hero pretzel is the LCP element and was shipping 1377px for a 228px box on phones.
// Serve width-appropriate variants, and teach the preload scanner about them too.
const fs = require('fs'), crypto = require('crypto');
let h = fs.readFileSync('dist/index.html', 'utf8');
const SRCSET = 'assets/pretzel-2d-460.webp 460w, assets/pretzel-2d-840.webp 840w, assets/pretzel-2d.webp 1377w';
const SIZES  = '(max-width:640px) 240px, (max-width:1024px) 440px, 740px';

if (h.includes('pretzel-2d-460')) { console.log('already applied'); process.exit(0); }

// 1. the hero <img>
const before = h;
h = h.replace(/<img src="assets\/pretzel-2d\.webp"/,
  `<img src="assets/pretzel-2d.webp" srcset="${SRCSET}" sizes="${SIZES}"`);
if (h === before) throw new Error('hero pretzel img not found');

// 2. its preload must pick the same variant, or it fetches the full-size file anyway
h = h.replace('<link rel="preload" as="image" href="assets/pretzel-2d.webp" fetchpriority="high">',
  `<link rel="preload" as="image" href="assets/pretzel-2d.webp" imagesrcset="${SRCSET}" imagesizes="${SIZES}" fetchpriority="high">`);

// 3. the two 32px logo marks don't need a 240px file
const n = (h.match(/src="assets\/eyebrow\/7\.webp" alt="Pretzel Labs" style="width: 32px/g) || []).length;
h = h.split('src="assets/eyebrow/7.webp" alt="Pretzel Labs" style="width: 32px')
     .join('src="assets/eyebrow/7-64.webp" alt="Pretzel Labs" style="width: 32px');
h = h.replace('<link rel="preload" as="image" href="assets/eyebrow/7.webp">',
              '<link rel="preload" as="image" href="assets/eyebrow/7-64.webp">');
console.log('32px logo marks switched to 64w:', n);

const hash = crypto.createHash('sha256').update(fs.readFileSync('dist/app.js')).digest('hex').slice(0, 8);
h = h.replace(/src="app\.js(\?v=[a-f0-9]+)?"/, 'src="app.js?v=' + hash + '"');
fs.writeFileSync('dist/index.html', h);
console.log('srcset + preload updated');
