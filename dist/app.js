(function () {
  'use strict';
  var STEPS = [
    ['01', 'Capture signals', 'Emails, meetings, calendar patterns, and stakeholder behavior — captured automatically.', 'Captured', '128 signals', '20%'],
    ['02', 'Get a live pulse of each deal', 'Relationship maps, engagement, threading, and execution gaps — assembled in real time.', 'Live', 'Health 72 / 100', '40%'],
    ['03', 'Surface risk early', 'EB disengagement or a stalled deal — flagged to your team over Slack and email.', 'At risk', 'CFO silent 19 days', '60%'],
    ['04', 'Enable action', 'Tailored recommendations — run them yourself or let Pretzel handle it.', 'Next step', 'Book exec alignment', '80%'],
    ['05', 'Capitalize on every win', 'Each outcome feeds back into win patterns shared across the team.', 'Closed', 'Won · $180K', '100%']
  ];
  var BASE = 'border:0;cursor:pointer;font:inherit;padding:10px 20px;border-radius:100px;font-size:14px;font-weight:500;transition:background .2s,color .2s,transform .2s;';
  var ON = BASE + 'background:#1d1d1d;color:#fff';
  var OFF = BASE + 'background:rgba(255,255,255,.7);backdrop-filter:blur(8px);color:#1d1d1d';

  function onSeen(el, cb, margin) {
    if (!('IntersectionObserver' in window)) { cb(el); return; }
    var o = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { o.unobserve(e.target); cb(e.target); } });
    }, { rootMargin: margin || '200px' });
    o.observe(el);
  }

  // --- "How it works" step rotator (was React state) ---
  var pills = [].slice.call(document.querySelectorAll('[data-sp]'));
  var F = {};
  ['num', 'title', 'text', 'tag', 'big'].forEach(function (n) { F[n] = document.querySelector('[data-sf="' + n + '"]'); });
  var bar = document.querySelector('[data-sbar]');
  var timer = null, cur = 0;

  function set(i) {
    cur = i;
    var s = STEPS[i];
    pills.forEach(function (p, n) { p.setAttribute('style', n === i ? ON : OFF); });
    F.num.textContent = s[0]; F.title.textContent = s[1]; F.text.textContent = s[2];
    F.tag.textContent = s[3]; F.big.textContent = s[4];
    bar.setAttribute('style', 'width:' + s[5] + ';height:100%;border-radius:100px;background:#f64c26;transition:width .5s cubic-bezier(.2,.8,.2,1)');
  }
  if (pills.length === 5 && bar && F.num) {
    pills.forEach(function (p, i) {
      p.addEventListener('click', function () { clearInterval(timer); timer = null; set(i); });
    });
    set(0);
    timer = setInterval(function () { set((cur + 1) % 5); }, 4000);
  }

  // --- hero pretzel follows the cursor ---
  var pz = document.querySelector('[data-parallax]');
  if (pz) {
    window.addEventListener('pointermove', function (e) {
      var dx = e.clientX / window.innerWidth - 0.5, dy = e.clientY / window.innerHeight - 0.5;
      pz.style.transform = 'translate(' + (dx * 40) + 'px, ' + (dy * 24) + 'px) rotate(' + (dx * 4) + 'deg)';
    }, { passive: true });
  }

  // --- feature video: fetch only when near, then slow ping-pong playback ---
  var v = document.querySelector('video[data-src]');
  if (v) {
    onSeen(v, function () {
      v.src = v.getAttribute('data-src');
      v.playbackRate = 0.5;
      var play = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
      play();
      var dir = 1, last = 0;
      v.addEventListener('ended', function () { dir = -1; v.pause(); });
      var tick = function (now) {
        if (dir === -1 && v.duration) {
          var dt = Math.min(0.05, (now - last) / 1000) * 0.5;
          v.currentTime = Math.max(0, v.currentTime - dt);
          if (v.currentTime <= 0.05) { dir = 1; play(); }
        }
        last = now;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, '300px');
  }

  // --- fluted-glass shader: load the library only when a panel is near ---
  [].slice.call(document.querySelectorAll('[data-glass]')).forEach(function (host) {
    onSeen(host, function () {
      import('./fluted-glass.js').then(function (m) {
        m.mountFlutedGlass(host, 'assets/' + host.getAttribute('data-glass') + '.jpg');
      }).catch(function () {});
    }, '300px');
  });

  // --- barely-there light travelling along the glass cards' edge ---
  var glassCards = [].slice.call(document.querySelectorAll('[data-h-ui]'));
  glassCards.forEach(function (c) { c.classList.add('edge-live'); });
  if (glassCards.length && 'IntersectionObserver' in window) {
    var edgeIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('edge-live', e.isIntersecting); });
    }, { rootMargin: '150px' });
    glassCards.forEach(function (c) { edgeIO.observe(c); });
  }

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

})();
