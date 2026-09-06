// Four small corrections:
//  1. 200px of section padding above a 216px decorative pretzel left a lot of dead space
//  2. the tick was a text glyph — geometrically centred, but its ink sits high in the line box,
//     so it read as crooked. An inline SVG puts the ink exactly where we want it.
//  3. the footer e-mail was a dark pill pointing at #cta instead of opening mail
//  4. "Learn more" was a bare 14px text link — small target, no hover feedback
const fs = require('fs'), crypto = require('crypto');
let h = fs.readFileSync('dist/index.html', 'utf8');
if (h.includes('data-m="learn-more"')) { console.log('already applied'); process.exit(0); }
const count = (s) => (h.split(s).length - 1);

// ---- 1. section rhythm ---------------------------------------------------
const padCount = count('padding: 200px 30px');
h = h.split('padding: 200px 30px').join('padding: 130px 30px');
h = h.replace('section[data-screen-label]{padding-top:110px!important}',
              'section[data-screen-label]{padding-top:90px!important}');
console.log('1. section padding 200 -> 130px on', padCount, 'sections (mobile 110 -> 90)');

// ---- 2. tick as SVG ------------------------------------------------------
const TICK_OLD = '<span style="width: 18px; height: 18px; border-radius: 50%; background: rgb(29, 29, 29); color: rgb(255, 255, 255); font-size: 11px; display: inline-flex; align-items: center; justify-content: center;">✓</span>';
const TICK_NEW = '<span style="width: 18px; height: 18px; border-radius: 50%; background: rgb(29, 29, 29); color: rgb(255, 255, 255); display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto;">' +
  '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M1.6 5.1 3.9 7.4 8.4 2.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
const tickCount = count(TICK_OLD);
if (!tickCount) throw new Error('tick markup not found');
h = h.split(TICK_OLD).join(TICK_NEW);
console.log('2. tick -> inline svg on', tickCount, 'items');

// ---- 3. footer e-mail ----------------------------------------------------
const MAIL_OLD = '<a href="#cta" class="scp8" style="display: inline-flex; align-self: flex-start; padding: 10px 20px; border-radius: 100px; background: rgb(29, 29, 29); color: rgb(255, 255, 255); font-weight: 600; font-size: 16px; transition: background 0.2s;">hello@pretzel-labs.com</a>';
const MAIL_NEW = '<a href="mailto:hello@pretzel-labs.com" style="align-self: flex-start; font-weight: 600; font-size: 16px; color: rgb(29, 29, 29); transition: color 0.2s;" onmouseover="this.style.color=\'#f64c26\'" onmouseout="this.style.color=\'rgb(29, 29, 29)\'">hello@pretzel-labs.com</a>';
if (!h.includes(MAIL_OLD)) throw new Error('footer e-mail not found');
h = h.replace(MAIL_OLD, MAIL_NEW);
console.log('3. e-mail: #cta -> mailto:, dark pill -> plain link');

// ---- 4. "Learn more" hit area -------------------------------------------
const lm = count('>Learn more →</a>');
h = h.replace(/<a href="#cta"((?:(?!<\/a>).)*?)>Learn more →<\/a>/g,
              '<a href="#cta" data-m="learn-more"$1>Learn more →</a>');
const CSS = '[data-m="learn-more"]{display:inline-flex;align-items:center;gap:6px;' +
  'padding:8px 14px;margin:-8px -14px;border-radius:100px;' +
  'transition:background .2s,color .2s}' +
  '[data-m="learn-more"]:hover{background:rgba(246,76,38,.1)}';
h = h.replace('</head>', '<style>' + CSS + '</style></head>');
console.log('4. "Learn more" given a padded hit area + hover fill on', lm, 'links');

const hash = crypto.createHash('sha256').update(fs.readFileSync('dist/app.js')).digest('hex').slice(0, 8);
h = h.replace(/src="app\.js(\?v=[a-f0-9]+)?"/, 'src="app.js?v=' + hash + '"');
fs.writeFileSync('dist/index.html', h);

// ---- 5. optical alignment of the split section head -----------------------
// The line boxes of the 64px heading and the 20px paragraph start at the same y,
// but the heading carries ~5px more leading above its caps, so the two texts read
// as misaligned. Nudge the right column down by the measured difference.
