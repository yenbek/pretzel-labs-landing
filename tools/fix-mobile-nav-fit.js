// On phones the nav pill runs out of room: in the ORIGINAL export the "Request access" label
// already wraps to two lines and spills out of its 38px pill at <=420px. Adding a burger makes it
// worse. Fix: below 640px keep only the pretzel mark in the logo and stop the CTA from wrapping.
const fs = require('fs'), crypto = require('crypto');
let h = fs.readFileSync('dist/index.html', 'utf8');

const OLD = '" decoding="async" fetchpriority="auto">\n      Pretzel Labs\n    </a>';
const NEW = '" decoding="async" fetchpriority="auto"><span data-m="nav-wordmark">Pretzel Labs</span></a>';
if (h.includes('nav-wordmark')) console.log('wordmark already wrapped');
else if (!h.includes(OLD)) throw new Error('logo text node not found');
else { h = h.split(OLD).join(NEW); console.log('wordmark wrapped'); }

const CSS = `@media (max-width:640px){[data-m="nav-wordmark"]{display:none}[data-m="nav-logo"]{padding-left:0!important;gap:0!important}[data-m="nav-cta"]{white-space:nowrap!important}}`;
if (h.includes('nav-wordmark]{display:none')) console.log('css already present');
else { h = h.replace('</head>', '<style>' + CSS + '</style></head>'); console.log('css injected'); }

const hash = crypto.createHash('sha256').update(fs.readFileSync('dist/app.js')).digest('hex').slice(0, 8);
h = h.replace(/src="app\.js(\?v=[a-f0-9]+)?"/, 'src="app.js?v=' + hash + '"');
fs.writeFileSync('dist/index.html', h);
console.log('done');
