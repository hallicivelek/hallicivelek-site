/* hc-eyes for hallicivelek.com: built from src/hc-eyes.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  .hc-eyes { position: absolute; pointer-events: none; }\n  .hc-eyes img { position: absolute; display: block; max-width: none; margin: 0; padding: 0; border: 0; }\n  .hc-eyes .hc-lids { left: 0; top: 0; width: 100%; height: 100%; }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcEyes) return;
  window.__hcEyes = true;

  var PORTRAIT = /Halli-Civelek-artist-portrait/;
  var W = 300, H = 359;   // the portrait's size; all numbers below are in its pixels
  // the iris centres when looking straight ahead (where they are in the original photo);
  // the eyeholes in eyelids.png are 25 x 11 (left) and 23 x 11 (right)
  var EYES = [
    { c: [115.6, 167.6], iris: 'iris-left.png', size: [14, 14] },
    { c: [178, 167], iris: 'iris-right.png', size: [15, 14] }
  ];
  var REACH = [5, 3.5];     // how far an iris can move from the centre
  var IDLE = 4000;          // ms without a pointer before the eyes go blob-watching
  var NEAR = 80;            // within this distance of the nose bridge the eyes start to cross

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
    var face = new Image(), lids = new Image(), loaded = 0;
    face.onload = lids.onload = function () { if (++loaded === 2) build(); };
    face.src = BASE + 'face-no-irises.jpg';
    lids.src = BASE + 'eyelids.png';
    function build() {
      // an overlay next to the photo (not a wrapper: Cargo's layout around the photo stays untouched)
      var box = document.createElement('span');
      box.className = 'hc-eyes';
      var holder = img.parentNode;
      if (getComputedStyle(holder).position === 'static') holder.style.position = 'relative';
      holder.appendChild(box);
      img.removeAttribute('srcset');
      img.src = face.src;
      var eyes = EYES.map(function (e) {
        var iris = document.createElement('img');
        iris.className = 'hc-eye'; iris.src = BASE + e.iris; iris.alt = '';
        iris.style.width = pct(e.size[0], W); iris.style.height = pct(e.size[1], H);
        box.appendChild(iris);
        return { e: e, iris: iris, x: 0, y: 0 };
      });
      var top = document.createElement('img');
      top.className = 'hc-lids'; top.src = lids.src; top.alt = '';
      box.appendChild(top);
      var l = { img: img, box: box, eyes: eyes };
      live.push(l);
      fit(l); place(eyes[0]); place(eyes[1]);
      if (!calm.matches) requestAnimationFrame(tick);
    }
  }

  function place(o) {
    var e = o.e;
    o.iris.style.left = pct(e.c[0] - e.size[0] / 2 + o.x, W);
    o.iris.style.top = pct(e.c[1] - e.size[1] / 2 + o.y, H);
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
      // close to the nose each eye turns hard towards the point: cross-eyed
      var cross = look ? Math.max(0, 1 - Math.hypot(look[0] - face[0], look[1] - face[1]) / (NEAR * s)) : 0;
      l.eyes.forEach(function (o) {
        var gx = 0, gy = 0;
        if (look) {
          var cx = r.left + o.e.c[0] * s, cy = r.top + o.e.c[1] * s;
          var dx = look[0] - cx, dy = look[1] - cy, dist = Math.hypot(dx, dy) || 1;
          var k = Math.max(Math.min(1, dist / 260), Math.min(1, cross * 1.6));
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
