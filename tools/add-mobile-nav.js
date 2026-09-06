// The original export hides [data-m="nav-links"] below 1024px and puts nothing in its place,
// so the section links are simply unreachable on phones/tablets. This adds a burger + dropdown
// using the same links, styled to match the nav pill. Desktop is untouched (both are display:none).
const fs = require('fs'), crypto = require('crypto');

const CSS = `
[data-m="nav-burger"]{display:none;flex:0 0 auto;width:38px;height:38px;padding:0;border:0;border-radius:100px;background:#edf1f4;cursor:pointer;align-items:center;justify-content:center;flex-direction:column;gap:4px;transition:background .2s}
[data-m="nav-burger"]:hover{background:#e3e9ef}
[data-m="nav-burger"] span{display:block;width:16px;height:2px;border-radius:2px;background:#1d1d1d;transition:transform .25s cubic-bezier(.2,.8,.2,1),opacity .2s}
[data-m="nav-burger"][aria-expanded="true"] span:nth-child(1){transform:translateY(6px) rotate(45deg)}
[data-m="nav-burger"][aria-expanded="true"] span:nth-child(2){opacity:0}
[data-m="nav-burger"][aria-expanded="true"] span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
[data-m="nav-menu"]{display:none}
[data-m="nav-menu"] a{display:block;padding:12px 18px;border-radius:100px;font-size:16px;font-weight:600;color:#4d585f;transition:background .2s,color .2s}
[data-m="nav-menu"] a:hover{background:#edf1f4;color:#1d1d1d}
@media (max-width:1024px){
  [data-nav]{position:relative}
  [data-m="nav-burger"]{display:flex}
  [data-m="nav-menu"]{display:flex;flex-direction:column;gap:2px;position:absolute;top:calc(100% + 10px);left:0;right:0;background:#fff;border-radius:24px;padding:8px;
    box-shadow:0 0 0 4px rgba(221,229,237,.7),0 12px 30px rgba(29,29,29,.10);
    visibility:hidden;opacity:0;transform:translateY(-6px);pointer-events:none;
    transition:opacity .2s,transform .2s cubic-bezier(.2,.8,.2,1),visibility .2s}
  [data-m="nav-menu"][data-open]{visibility:visible;opacity:1;transform:none;pointer-events:auto}
}
`.replace(/\n\s*/g, '');

const BURGER = '<button data-m="nav-burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu"><span></span><span></span><span></span></button>';
const MENU = '<div data-m="nav-menu" id="nav-menu">' +
  '<a href="#product">Product</a><a href="#how">Solutions</a>' +
  '<a href="#leaders">Customers</a><a href="#compare">Company</a></div>';

const JSSNIP = `
  // --- mobile menu: the original hid the nav links below 1024px with no replacement ---
  var burger = document.querySelector('[data-m="nav-burger"]');
  var navMenu = document.getElementById('nav-menu');
  if (burger && navMenu) {
    var setNavOpen = function (open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) navMenu.setAttribute('data-open', ''); else navMenu.removeAttribute('data-open');
    };
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      setNavOpen(burger.getAttribute('aria-expanded') !== 'true');
    });
    navMenu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setNavOpen(false); });
    document.addEventListener('click', function (e) { if (!navMenu.contains(e.target) && !burger.contains(e.target)) setNavOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNavOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1024) setNavOpen(false); });
  }
})();`;

let h = fs.readFileSync('dist/index.html', 'utf8');
if (h.includes('nav-burger')) { console.log('markup already present'); }
else {
  const navTag = /<nav style="pointer-events: auto;/;
  if (!navTag.test(h)) throw new Error('nav element not found');
  h = h.replace(navTag, '<nav data-nav style="pointer-events: auto;');
  const ctaIdx = h.indexOf('<a data-m="nav-cta"');
  if (ctaIdx < 0) throw new Error('nav CTA not found');
  h = h.slice(0, ctaIdx) + BURGER + h.slice(ctaIdx);
  const navEnd = h.indexOf('</nav>');
  h = h.slice(0, navEnd) + MENU + h.slice(navEnd);
  h = h.replace('</head>', '<style>' + CSS + '</style></head>');
  fs.writeFileSync('dist/index.html', h);
  console.log('markup + css injected');
}

let a = fs.readFileSync('dist/app.js', 'utf8');
if (a.includes('nav-burger')) { console.log('js already present'); }
else { a = a.replace(/\}\)\(\);\s*$/, JSSNIP + '\n'); fs.writeFileSync('dist/app.js', a); console.log('js injected'); }

// refresh cache-busting hash
const hash = crypto.createHash('sha256').update(fs.readFileSync('dist/app.js')).digest('hex').slice(0, 8);
h = fs.readFileSync('dist/index.html', 'utf8').replace(/src="app\.js(\?v=[a-f0-9]+)?"/, 'src="app.js?v=' + hash + '"');
fs.writeFileSync('dist/index.html', h);
console.log('app.js?v=' + hash);
