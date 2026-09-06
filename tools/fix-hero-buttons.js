// Hero buttons didn't match:
//   primary  = 6px translucent halo + a 48px coloured pill  (outer 60px)
//   secondary= a bare 59px white pill, no halo
// So the two coloured shapes were 48 vs 59 — that is what reads as "different heights".
// Give the secondary the same halo and the same 48px pill, and make both full width on phones,
// where the long label made the white button almost twice as wide as the orange one.
const fs = require('fs'), crypto = require('crypto');
let h = fs.readFileSync('dist/index.html', 'utf8');

if (h.includes('data-m="hero-cta"')) { console.log('already applied'); process.exit(0); }

// 1. hook on the button row
const ROW = '<div style="display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;">';
if (!h.includes(ROW)) throw new Error('hero button row not found');
h = h.replace(ROW, '<div data-m="hero-cta" style="display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;">');

// 2. rebuild the secondary as halo + pill, mirroring the primary
const OLD = '<a href="#" class="scp3" style="display: inline-flex; align-items: center; height: 59px; padding: 18px 44px; border-radius: 100px; background: rgb(255, 255, 255); color: rgb(29, 29, 29); font-size: 18px; font-weight: 600; transition: background 0.2s;">Watch a 4-min tour</a>';
const NEW = '<a href="#" style="display: inline-flex; padding: 6px; border-radius: 100px; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(5px);">' +
  '<span class="scp3" style="display: inline-flex; align-items: center; justify-content: center; height: 48px; padding: 0px 40px; border-radius: 100px; background: rgb(255, 255, 255); color: rgb(29, 29, 29); font-size: 18px; font-weight: 600; transition: background 0.2s;">Watch a 4-min tour</span></a>';
if (!h.includes(OLD)) throw new Error('secondary button not found');
h = h.replace(OLD, NEW);

// 3. on phones give both buttons the same width instead of sizing them to their labels
const CSS = '@media (max-width:640px){' +
  '[data-m="hero-cta"]{width:100%;flex-direction:column;align-items:stretch}' +
  '[data-m="hero-cta"] > a{width:100%}' +
  '[data-m="hero-cta"] > a > span{width:100%;justify-content:center;padding:0 20px;height:48px;text-align:center}' +
  '}';
h = h.replace('</head>', '<style>' + CSS + '</style></head>');

const hash = crypto.createHash('sha256').update(fs.readFileSync('dist/app.js')).digest('hex').slice(0, 8);
h = h.replace(/src="app\.js(\?v=[a-f0-9]+)?"/, 'src="app.js?v=' + hash + '"');
fs.writeFileSync('dist/index.html', h);
console.log('hero buttons: secondary given the halo, both pills 48px, equal width on phones');
