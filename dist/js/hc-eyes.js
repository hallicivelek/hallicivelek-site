/* hc-eyes for hallicivelek.com: built from src/hc-eyes.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  .hc-eyes { position: absolute; pointer-events: none; }\n  .hc-eyes img { position: absolute; display: block; max-width: none; margin: 0; padding: 0; border: 0; }\n  .hc-eyes .hc-lids, .hc-eyes .hc-ink { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }\n  .hc-eyes .hc-ink { pointer-events: none; }\n  .hc-eyes.hc-drawing .hc-ink { pointer-events: auto; touch-action: none; cursor: none; }\n  .hc-pencil { position: absolute; left: calc(100% + 18px); top: 30%; width: 30px; padding: 0; margin: 0; border: 0;\n    background: none; cursor: pointer; pointer-events: auto; transform: rotate(8deg); transition: transform .25s ease; }\n  .hc-pencil img { position: static !important; width: 100%; height: auto; }\n  .hc-pencil:hover, .hc-pencil:focus-visible { transform: rotate(16deg) translateY(-4px); }\n  .hc-pencil:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 4px; }\n  .hc-drawing .hc-pencil { visibility: hidden; }\n  @media (max-width: 600px) { .hc-pencil { left: calc(100% + 6px); width: 24px; } }\n  .hc-eyes .hc-pencil-held { position: absolute; z-index: 3; width: 30px; height: auto; pointer-events: none; display: none;\n    transform: rotate(14deg); }\n"; document.head.appendChild(s); })();
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
      addPencil(l);
      fit(l); place(eyes[0]); place(eyes[1]);
      if (!calm.matches) requestAnimationFrame(tick);
    }
  }

  /* ---------- the pencil: draw on the face (not saved) ---------- */
  var TIP = [15 / 59, 191 / 200];   // where the tip is in pencil.png, as a share of its width and height
  var INK = 2;                      // line width, in photo pixels
  var FINGER = [-14, -46];          // on touch screens the tip is held this far from the finger, so you can see it

  function addPencil(l) {
    var ink = document.createElement('canvas');
    ink.className = 'hc-ink';
    l.box.appendChild(ink);
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'hc-pencil';
    btn.setAttribute('aria-label', 'pencil: draw on Halli’s face');
    btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML = '<img alt="" src="' + BASE + 'pencil.png">';
    l.box.appendChild(btn);
    var held = document.createElement('img');
    held.className = 'hc-pencil-held'; held.alt = ''; held.src = BASE + 'pencil.png';
    // placed inside the overlay, measured from the photo like the strokes are: a position: fixed pencil drifted
    // away from the line on iPhone (by about the scroll distance), so tip and line now share one reference
    l.box.appendChild(held);
    l.ink = ink; l.held = held; l.strokes = []; l.size = '';
    var holding = false, stroke = null;

    // the pencil's tip is where it draws: under the mouse, or just above and left of a finger
    function tipOf(e) {
      var off = e.pointerType === 'touch' ? FINGER : [0, 0];
      return [e.clientX + off[0], e.clientY + off[1]];
    }
    function follow(x, y) {   // x, y on screen (clientX / clientY)
      var w = held.offsetWidth || 30, h = held.offsetHeight || w * 200 / 59, b = l.box.getBoundingClientRect();
      held.style.transformOrigin = (TIP[0] * w) + 'px ' + (TIP[1] * h) + 'px';
      held.style.left = (x - b.left - TIP[0] * w) + 'px';
      held.style.top = (y - b.top - TIP[1] * h) + 'px';
    }
    function pickUp(x, y) {
      holding = true;
      l.box.classList.add('hc-drawing'); btn.setAttribute('aria-pressed', 'true');
      held.style.display = 'block'; follow(x, y);
    }
    function putDown() {
      holding = false; stroke = null;
      l.box.classList.remove('hc-drawing'); btn.setAttribute('aria-pressed', 'false');
      held.style.display = 'none';
    }
    l.putDown = putDown;

    btn.addEventListener('click', function (e) {
      var r = btn.getBoundingClientRect(), t = e.clientX ? tipOf(e) : [r.left + r.width / 2, r.top + r.height / 2];
      pickUp(t[0], t[1]);
      e.stopPropagation();
    });
    function photoPoint(e) {
      var r = ink.getBoundingClientRect(), t = tipOf(e);
      return [(t[0] - r.left) / r.width * W, (t[1] - r.top) / r.height * H];
    }
    ink.addEventListener('pointerdown', function (e) {
      if (!holding) return;
      e.preventDefault();
      try { ink.setPointerCapture(e.pointerId); } catch (err) {}
      var t = tipOf(e); follow(t[0], t[1]);
      stroke = [photoPoint(e)];
      l.strokes.push(stroke);
      draw(l, stroke, 0);
    });
    ink.addEventListener('pointermove', function (e) {
      if (!holding) return;
      var t = tipOf(e); follow(t[0], t[1]);
      target = t; lastMove = Date.now();   // the eyes watch the pencil tip
      if (!stroke) return;
      stroke.push(photoPoint(e));
      draw(l, stroke, stroke.length - 2);
    });
    function endStroke() { stroke = null; }
    ink.addEventListener('pointerup', endStroke);
    ink.addEventListener('pointercancel', endStroke);
    // the held pencil follows the mouse anywhere; a click or tap outside the photo puts it back
    addEventListener('pointermove', function (e) { if (holding) { var t = tipOf(e); follow(t[0], t[1]); } }, { passive: true });
    addEventListener('pointerdown', function (e) { if (holding && e.target !== ink) putDown(); }, true);
    // Esc puts the pencil down. Cargo leaves the page on Esc (back to the front page), which would throw the
    // drawing away, so while the pencil is held or there is a drawing on the face, Cargo doesn't get it.
    addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !l.img.isConnected || !(holding || l.strokes.length)) return;
      e.stopImmediatePropagation(); e.preventDefault();
      if (holding) { putDown(); btn.focus(); }
    }, true);
  }

  // draw a stroke from point i onwards (all strokes are kept in photo pixels, so they survive a resize)
  function draw(l, s, i) {
    var c = l.ink.getContext('2d');
    c.lineWidth = INK; c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = '#111';
    c.beginPath();
    var a = s[Math.max(0, i)];
    c.moveTo(a[0], a[1]);
    if (s.length === 1) c.lineTo(a[0] + 0.01, a[1]);
    for (var k = Math.max(0, i) + 1; k < s.length; k++) c.lineTo(s[k][0], s[k][1]);
    c.stroke();
  }
  function sizeInk(l, r) {
    var dpr = window.devicePixelRatio || 1, size = Math.round(r.width * dpr) + 'x' + Math.round(r.height * dpr);
    if (size === l.size) return;
    l.size = size;
    l.ink.width = Math.round(r.width * dpr); l.ink.height = Math.round(r.height * dpr);
    l.ink.getContext('2d').setTransform(l.ink.width / W, 0, 0, l.ink.height / H, 0, 0);
    l.strokes.forEach(function (s) { draw(l, s, 0); });
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
    if (l.ink) sizeInk(l, r);
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
    live = live.filter(function (l) {
      return l.img.isConnected;   // Cargo changed page: the drawing went with it
    });
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
window.__hcBuild = "2026-11-06 23:31";
