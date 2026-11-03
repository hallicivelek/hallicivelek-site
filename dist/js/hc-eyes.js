/* hc-eyes for hallicivelek.com: built from src/hc-eyes.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  .hc-eyes { position: absolute; pointer-events: none; }\n  .hc-eye { position: absolute; overflow: hidden; clip-path: ellipse(50% 50% at 50% 50%); pointer-events: none; }\n  .hc-eye img { position: absolute; display: block; height: auto; max-width: none; }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcEyes) return;
  window.__hcEyes = true;

  var PORTRAIT = /Halli-Civelek-artist-portrait/;
  var W = 300, H = 359;   // the portrait's size; all numbers below are in its pixels
  // eye openings (where the iris may show) and the iris centres when looking straight ahead
  var EYES = [
    { open: [104, 160.5, 24, 14.5], c: [115.6, 167.6], iris: 'iris-left.png', size: [14, 14] },
    { open: [165.5, 160.8, 24.5, 13], c: [178, 167], iris: 'iris-right.png', size: [15, 14] }
  ];
  var REACH = [4.2, 3];     // how far an iris can move from the centre
  var IDLE = 4000;          // ms without a pointer before the eyes go blob-watching

  // the layers live next to this script on GitHub Pages: dist/js/hc-eyes.js -> assets/portrait/
  var here = document.currentScript && document.currentScript.src;
  var BASE = here ? new URL('../../assets/portrait/', here).href
                  : 'https://hallicivelek.github.io/hallicivelek-site/assets/portrait/';
  var calm = matchMedia('(prefers-reduced-motion: reduce)');

  var target = null, lastMove = 0, live = [];
  addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') { target = [e.clientX, e.clientY]; lastMove = Date.now(); } }, { passive: true });
  addEventListener('pointerdown', function (e) { target = [e.clientX, e.clientY]; lastMove = Date.now(); }, { passive: true });

  function pct(v, of) { return (v / of * 100) + '%'; }

  function setup(img) {
    img.setAttribute('data-hc-eyes', '');
    var face = new Image();
    face.onload = function () {
      // an overlay next to the photo (not a wrapper: Cargo's layout around the photo stays untouched)
      var box = document.createElement('span');
      box.className = 'hc-eyes';
      var holder = img.parentNode;
      if (getComputedStyle(holder).position === 'static') holder.style.position = 'relative';
      holder.appendChild(box);
      img.removeAttribute('srcset');
      img.src = face.src;
      var eyes = EYES.map(function (e) {
        var el = document.createElement('span');
        el.className = 'hc-eye';
        el.style.left = pct(e.open[0], W); el.style.top = pct(e.open[1], H);
        el.style.width = pct(e.open[2], W); el.style.height = pct(e.open[3], H);
        var iris = document.createElement('img');
        iris.src = BASE + e.iris; iris.alt = '';
        iris.style.width = pct(e.size[0], e.open[2]);
        box.appendChild(el); el.appendChild(iris);
        return { e: e, el: el, iris: iris, x: 0, y: 0 };
      });
      var l = { img: img, box: box, eyes: eyes };
      live.push(l);
      fit(l); place(eyes[0]); place(eyes[1]);
      if (!calm.matches) requestAnimationFrame(tick);
    };
    face.src = BASE + 'face-no-irises.jpg';
  }

  function place(o) {
    var e = o.e;
    o.iris.style.left = pct(e.c[0] - e.open[0] - e.size[0] / 2 + o.x, e.open[2]);
    o.iris.style.top = pct(e.c[1] - e.open[1] - e.size[1] / 2 + o.y, e.open[3]);
  }

  // keep the overlay exactly on the photo (measured every frame, like the blobs, because Cargo moves things late)
  function fit(l) {
    var r = l.img.getBoundingClientRect(), h = l.box.parentNode.getBoundingClientRect(), st = l.box.style;
    var left = (r.left - h.left) + 'px', top = (r.top - h.top) + 'px';
    if (st.left !== left) st.left = left;
    if (st.top !== top) st.top = top;
    if (st.width !== r.width + 'px') { st.width = r.width + 'px'; st.height = r.height + 'px'; }
  }

  function nearestBlob(cx, cy) {
    var best = null, d = Infinity;
    [].slice.call(document.querySelectorAll('.hc-blob')).forEach(function (b) {
      var r = b.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, dd = Math.hypot(x - cx, y - cy);
      if (r.width && dd < d) { d = dd; best = [x, y]; }
    });
    return best;
  }

  var running = false;
  function tick() {
    live = live.filter(function (l) { return l.img.isConnected; });
    if (!live.length) { running = false; return; }
    running = true;
    live.forEach(function (l) {
      fit(l);
      var r = l.img.getBoundingClientRect(), s = r.width / W;
      var face = [r.left + W / 2 * s, r.top + 167 * s];
      var look = (target && Date.now() - lastMove < IDLE) ? target : (nearestBlob(face[0], face[1]) || target);
      l.eyes.forEach(function (o) {
        var gx = 0, gy = 0;
        if (look) {
          var cx = r.left + o.e.c[0] * s, cy = r.top + o.e.c[1] * s;
          var dx = look[0] - cx, dy = look[1] - cy, dist = Math.hypot(dx, dy) || 1, k = Math.min(1, dist / 260);
          gx = dx / dist * REACH[0] * k; gy = dy / dist * REACH[1] * k;
        }
        o.x += (gx - o.x) * 0.18; o.y += (gy - o.y) * 0.18;
        place(o);
      });
    });
    requestAnimationFrame(tick);
  }

  // Cargo changes pages without reloading: look for the portrait whenever the page changes
  function scan() {
    [].slice.call(document.querySelectorAll('img')).forEach(function (img) {
      if (!img.hasAttribute('data-hc-eyes') && PORTRAIT.test(img.getAttribute('src') || '')) setup(img);
    });
    if (live.length && !running && !calm.matches) requestAnimationFrame(tick);
  }
  var pending = null;
  new MutationObserver(function () { clearTimeout(pending); pending = setTimeout(scan, 100); })
    .observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('resize', function () { live.forEach(fit); });   // with reduced motion there is no frame loop
  document.addEventListener('DOMContentLoaded', scan);
  scan();
})();
