/* Pretzel Labs — page behaviour. One deferred script, no dependencies.
   Every feature is opt-in by markup, so the same file serves every page:

     .pl-burger + #pl-navmenu        mobile menu
     [data-pl-stepper]               auto-rotating step card (see components.md → Stepper)
     [data-pl-parallax]              hero art drifts with the pointer
     video[data-src]                 fetched when near the viewport, slow ping-pong loop
     [data-pl-glass="assets/x.jpg"]  fluted-glass shader over a photo (lazy, optional)
     .pl-glass--live                 edge light runs only while on screen
*/
(function () {
  'use strict';

  function onSeen(el, cb, margin) {
    if (!('IntersectionObserver' in window)) { cb(el); return; }
    var o = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { o.unobserve(e.target); cb(e.target); } });
    }, { rootMargin: margin || '200px' });
    o.observe(el);
  }

  // --- mobile menu ---
  var burger = document.querySelector('.pl-burger');
  var navMenu = document.getElementById('pl-navmenu');
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

  // --- stepper: each pill carries its step in data-* attributes; the card shows the selected one.
  //     Fields: [data-pl-field="num|title|text|tag|big"], bar fill: [data-pl-progress].
  //     data-pl-stepper="4000" sets the autoplay interval in ms ("0" = no autoplay). A click stops autoplay.
  [].slice.call(document.querySelectorAll('[data-pl-stepper]')).forEach(function (root) {
    var pills = [].slice.call(root.querySelectorAll('[data-pl-step]'));
    var bar = root.querySelector('[data-pl-progress]');
    var fields = {};
    ['num', 'title', 'text', 'tag', 'big'].forEach(function (n) { fields[n] = root.querySelector('[data-pl-field="' + n + '"]'); });
    if (!pills.length) return;
    var cur = 0, timer = null, every = parseInt(root.getAttribute('data-pl-stepper'), 10);

    function set(i) {
      cur = i;
      pills.forEach(function (p, n) { p.setAttribute('aria-selected', n === i ? 'true' : 'false'); });
      var d = pills[i].dataset;
      Object.keys(fields).forEach(function (k) { if (fields[k] && d[k] != null) fields[k].textContent = d[k]; });
      if (bar && d.progress) bar.style.width = d.progress;
    }
    pills.forEach(function (p, i) {
      p.addEventListener('click', function () { clearInterval(timer); timer = null; set(i); });
    });
    set(0);
    if (every > 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(function () { set((cur + 1) % pills.length); }, every);
    }
  });

  // --- hero art follows the cursor ---
  var pz = document.querySelector('[data-pl-parallax]');
  if (pz && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('pointermove', function (e) {
      var dx = e.clientX / window.innerWidth - 0.5, dy = e.clientY / window.innerHeight - 0.5;
      pz.style.transform = 'translate(' + (dx * 40) + 'px, ' + (dy * 24) + 'px) rotate(' + (dx * 4) + 'deg)';
    }, { passive: true });
  }

  // --- background video: fetch only when near, then slow ping-pong playback ---
  [].slice.call(document.querySelectorAll('video[data-src]')).forEach(function (v) {
    onSeen(v, function () {
      v.muted = true;
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
  });

  // --- fluted-glass shader: the library (~122 KB from esm.sh) loads only when a host is near ---
  [].slice.call(document.querySelectorAll('[data-pl-glass]')).forEach(function (host) {
    onSeen(host, function () {
      import('./fluted-glass.js').then(function (m) {
        m.mountFlutedGlass(host, host.getAttribute('data-pl-glass'));
      }).catch(function () {});
    }, '300px');
  });

  // --- edge light on live glass: animate only while visible ---
  var live = [].slice.call(document.querySelectorAll('.pl-glass--live'));
  live.forEach(function (c) { c.classList.add('is-live'); });
  if (live.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('is-live', e.isIntersecting); });
    }, { rootMargin: '150px' });
    live.forEach(function (c) { io.observe(c); });
  }
})();
