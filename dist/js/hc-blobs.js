/* hc-blobs for hallicivelek.com: built from src/hc-blobs.html by build.py, do not edit here */
(function () {
  if (window.__hcBlobs) return;
  if (/blob-?pond/i.test(location.pathname)) return;   // the blob-pond page has its own blobs
  window.__hcBlobs = true;

  /* ---------- settings to play with ---------- */
  var CFG = {
    countDesktop: 9,
    countMobile: 6,
    minSize: 36,          // px diameter
    maxSize: 130,
    minSpeed: 9,          // px per second
    maxSpeed: 22,
    depth: [0.15, 0.45],  // scroll speed vs the page: smallest blob → biggest blob (1 = moves with content, 0 = fixed)
    opacity: 0.9,
    look: 'soft',         // 'solid' or 'soft' (coloured core that fades towards the edge)
    wobble: 1,            // how much the shape shifts: 0 = frozen, 1 = default, 1.5 = restless
    colors: ['#2BA6CF', '#B4533C', '#E2B23A', '#EE9BB4', '#3B3563', '#7FC2A0'],
    background: '#F3DCDF', // the site's default background (the pink blob's tint); paint blobs change it, clicking the same one again comes back here
    tint: 0.24,           // how much of a blob's colour goes into the page background
    curiousAfter: 3,      // seconds the cursor must rest before blobs come to look (0 = never)
    swellStep: 1.15,      // growth per click
    swellMax: 1.7,
    vowels: 'aeiouyáéíóúýæö',          // babble alphabet (Icelandic on purpose)
    consonants: 'bcdfghjklmnprstvxzþð',
    portraitTitle: 'Self-portrait as a blob',
    faceInk: 'auto',      // 'auto': white, but dark ink on blobs lighter than the pink the faces were drawn on; 'white': always white
    pauseLabel: 'pause blobs',   // the pause button's words (WCAG 2.2.2)
    playLabel: 'wake blobs',
    // clicks on these never reach the blobs
    skip: 'a, button, input, textarea, select, label, img, video, iframe, p, h1, h2, h3, h4, li, .thumb_image, .site_header, .mobile_site_header'
  };

  /* ---------- Halli's blob faces (from blob-faces-02…07.svg) ----------
     ref = bounding box of the blob each face was drawn on; box = the face's own bounds.
     INK = the face colour, BODY = the blob's colour (used for the hollow smiles). */
  var FACES = [
    { ref: [38.4, 35.3, 261.6, 268.5], box: [145.1, 61.0, 195.3, 88.2],
      svg: '<path d="M164.06,83.46s2.02,3.41,5.54,3.41c4.09,0,6.84-3.41,6.84-3.41" fill="none" stroke="INK" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.66px"/><ellipse cx="187.34" cy="71.27" rx="6.12" ry="8.46" stroke-width="3.62px" fill="none" stroke="INK" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="153.06" cy="71.27" rx="6.12" ry="8.46" stroke-width="3.62px" fill="none" stroke="INK" stroke-linecap="round" stroke-linejoin="round"/>' },
    { ref: [38.4, 35.3, 261.6, 268.5], box: [92.3, 96.8, 158.9, 125.0],
      svg: '<path d="M112.49,114.16s3.12,9.4,13.06,9.4,16.75-10.33,16.75-10.33l-29.8.93Z" fill="INK" stroke-width="2.8px" stroke="INK" stroke-linecap="round" stroke-linejoin="round"/><path d="M93.48,106.78s1.66-7.03,6.44-7.58,9.2,3.49,9.2,3.49" stroke="INK" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="2.38px"/><path d="M142.29,101.08s5.72-4.58,10.08-2.61,5.33,7.1,5.33,7.1" stroke="INK" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="2.38px"/>' },
    { ref: [38.4, 33.4, 261.6, 266.6], box: [96.1, 114.7, 179.3, 132.9],
      svg: '<path d="M129.73,127.89s1.56,2.64,4.28,2.64c3.16,0,5.29-2.64,5.29-2.64" stroke-width="2.06px" fill="none" stroke="INK" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="173.15" cy="122.67" rx="4.73" ry="6.54" fill="none" stroke="INK" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8px"/><ellipse cx="102.22" cy="125.01" rx="4.73" ry="6.54" fill="none" stroke="INK" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8px"/>' },
    { ref: [38.4, 33.4, 261.6, 266.6], box: [93.9, 119.0, 151.4, 149.3],
      svg: '<circle cx="98.85" cy="123.95" r="4.99" fill="INK"/><circle cx="146.46" cy="124.96" r="4.99" fill="INK"/><path d="M108.9,137.4s4.37,5.64,12.7,5.93,14.39-4.8,14.39-4.8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="INK" stroke-width="12px"/><path d="M108.9,136.48s4.37,5.64,12.7,5.93c8.32.28,14.39-4.8,14.39-4.8" stroke="BODY" stroke-width="2px" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' },
    { ref: [38.4, 33.4, 261.6, 266.6], box: [124.5, 91.4, 195.6, 114.9],
      svg: '<circle cx="129.52" cy="96.43" r="4.99" fill="INK"/><circle cx="190.57" cy="96.43" r="4.99" fill="INK"/><rect x="144.31" y="104.28" width="31.28" height="9.52" rx="4.76" ry="4.76" stroke-width="2.19px" fill="none" stroke="INK" stroke-linecap="round" stroke-linejoin="round"/><line x1="159.95" y1="104.28" x2="159.95" y2="113.8" fill="none" stroke="INK" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.57px"/><line x1="167.51" y1="104.28" x2="167.51" y2="113.8" fill="none" stroke="INK" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.57px"/><line x1="152.4" y1="104.28" x2="152.4" y2="113.8" fill="none" stroke="INK" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.57px"/>' },
    { ref: [38.4, 33.4, 261.6, 266.6], box: [74.8, 159.3, 155.9, 190.7],
      svg: '<circle cx="79.8" cy="164.31" r="4.99" fill="INK"/><circle cx="150.94" cy="164.31" r="4.99" fill="INK"/><path d="M127.71,179.89s-6.07,5.08-14.39,4.8-12.7-5.93-12.7-5.93" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="INK" stroke-width="12px"/><path d="M100.63,177.54s4.37,5.64,12.7,5.93c8.32.28,14.39-4.8,14.39-4.8" stroke="BODY" stroke-width="2px" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' }
  ];

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var drift = reduce ? 0.2 : 1;
  // paused (WCAG 2.2.2): remembered across pages and visits; starts paused for people who ask for reduced motion
  var paused = reduce;
  try { var saved = localStorage.getItem('hc-blobs-paused'); if (saved !== null) paused = saved === '1'; } catch (e) {}

  /* ---------- styles ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.hc-blobs{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;overflow:hidden}' +
    '.hc-blob{position:absolute;left:0;top:0;will-change:transform}' +
    'body,.site_header,.link_active a{transition:background-color 1.4s ease}' +
    'html.hc-tinted body,html.hc-tinted .site_header,html.hc-tinted .link_active a{background-color:var(--hc-bg)!important}' +
    'html.hc-instant body,html.hc-instant .site_header,html.hc-instant .link_active a{transition:none!important}' +
    'html.hc-hover,html.hc-hover body{cursor:pointer}' +
    'html.hc-print .thumbnails img{filter:url(#hc-print)}' +
    '.hc-pause{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:1001;' +
      'display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 16px;border-radius:999px;' +
      'border:1px solid rgba(41,39,42,.18);background:rgba(255,255,255,.88);color:#29272A;font:inherit;font-size:15px;line-height:1;cursor:pointer}' +
    '.hc-pause:hover{background:#fff}' +
    '.hc-pause:focus-visible{outline:3px solid #2BA6CF;outline-offset:2px}' +
    '.hc-pause svg{width:14px;height:14px;flex:none}' +
    '.hc-new{transition:opacity .5s ease,transform .7s cubic-bezier(.3,1.6,.5,1)}' +
    '.hc-new.hc-hidden{opacity:0;transform:scale(.85)}' +
    '@keyframes hc-wobble{0%,100%{transform:rotate(0)}25%{transform:rotate(-2deg)}75%{transform:rotate(2deg)}}' +
    '.hc-new.hc-wobble{animation:hc-wobble .45s ease}';
  document.head.appendChild(css);

  var layer = document.createElement('div');
  layer.className = 'hc-blobs';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  /* ---------- helpers ---------- */
  var W = innerWidth, H = innerHeight;
  function rand(a, b) { return a + Math.random() * (b - a); }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  var base = (getComputedStyle(document.body).backgroundColor.match(/\d+/g) || [244, 241, 236]).map(Number);
  // start on the default background straight away (no fade from Cargo's cream on every page load)
  var root = document.documentElement;
  root.classList.add('hc-instant', 'hc-tinted');
  root.style.setProperty('--hc-bg', CFG.background);
  requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove('hc-instant'); }); });
  function tint(hex) {
    var n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255];
    return 'rgb(' + c.map(function (v, i) { return Math.round(base[i] + (v - base[i]) * CFG.tint); }).join(',') + ')';
  }
  function radius(b) { return b.d / 2 * (b.sx + b.sy) / 2; }
  // b.y is the blob's position in its own (deeper) space; this is where it shows on screen
  function viewY(b) { return b.y - scrollY * dep(b); }
  function dep(b) { return paused ? 0 : b.depth; }   // paused: no parallax either, the blobs stay put on screen

  var NS = 'http://www.w3.org/2000/svg';
  // The outline: 28 points round a circle, each pushed in or out by the blob's waves and
  // its lobe, then joined with a smooth closed curve (Catmull-Rom → cubic Bézier).
  function shape(b, time) { return pathFrom(outline(b, time)); }
  function outline(b, time) {
    var N = 28, pts = [], w = CFG.wobble, pod = b.pod;
    var podAng = pod.ang + time * pod.drift;
    var reach = 0.16 * Math.pow(Math.max(0, Math.sin(time * pod.sp + pod.ph)), 2);
    for (var j = 0; j < N; j++) {
      var th = j / N * Math.PI * 2, r = 1;
      for (var h = 0; h < b.waves.length; h++) {
        var o = b.waves[h];
        r += w * o.a * (0.6 + 0.4 * Math.sin(time * o.am + o.amPh)) * Math.sin(o.k * th + o.ph + time * o.sp);
      }
      var dd = Math.atan2(Math.sin(th - podAng), Math.cos(th - podAng));
      r += w * reach * Math.exp(-dd * dd / 0.25);
      pts.push([Math.cos(th) * r * 45, Math.sin(th) * r * 45]);
    }
    return pts;
  }
  function pathFrom(pts) {
    var N = pts.length;
    var f = function (v) { return v.toFixed(1); };
    var d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (var k = 0; k < N; k++) {
      var p0 = pts[(k - 1 + N) % N], p1 = pts[k], p2 = pts[(k + 1) % N], p3 = pts[(k + 2) % N];
      d += 'C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
                 f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) + ' ' +
                 f(p2[0]) + ' ' + f(p2[1]);
    }
    return d + 'Z';
  }

  /* ---------- make the blobs ---------- */
  var n = W < 700 ? CFG.countMobile : CFG.countDesktop;
  var ALL = ['shy', 'swell', 'drop', 'paint', 'babble', 'portrait', 'watcher', 'print', 'hungry'];
  var kinds = [];
  // shuffle before cutting, so phones (fewer blobs) get a random selection, not always the same few
  while (kinds.length < n) kinds = kinds.concat(shuffle(ALL.slice()));
  kinds = shuffle(kinds.slice(0, n));
  var colors = shuffle(CFG.colors.slice());
  var sizes = [];
  for (var s = 0; s < n; s++) sizes.push(CFG.minSize + (CFG.maxSize - CFG.minSize) * (s / Math.max(n - 1, 1)) * rand(0.85, 1));
  // the face-wearer gets the biggest body (room for a face), the hungry one the next (room for a belly)
  sizes.sort(function (a, b) { return b - a; });
  var pri = function (k) { return k === 'watcher' ? 2 : k === 'hungry' ? 1 : 0; };
  var order = shuffle(kinds.map(function (k, i) { return i; })).sort(function (a, b) { return pri(kinds[b]) - pri(kinds[a]); });
  var sized = [];
  order.forEach(function (idx, r) { sized[idx] = sizes[r]; });
  sizes = sized;

  function aim(b) {
    var ang = rand(0, Math.PI * 2), sp = rand(CFG.minSpeed, CFG.maxSpeed);
    b.vx = Math.cos(ang) * sp; b.vy = Math.sin(ang) * sp;
  }

  var blobs = [];
  for (var i = 0; i < n; i++) {
    // drawn in a -60..60 box with a base radius of 45, so reaching lobes have room
    var S = sizes[i] * 4 / 3, fill = colors[i % colors.length];
    var el = document.createElementNS(NS, 'svg');
    el.setAttribute('class', 'hc-blob');
    el.setAttribute('viewBox', '-60 -60 120 120');
    el.setAttribute('width', S); el.setAttribute('height', S);
    el.style.overflow = 'visible';
    el.style.opacity = CFG.opacity;
    if (CFG.look === 'soft') {
      el.innerHTML = '<defs><radialGradient id="hc-g' + i + '" cx="0" cy="0" r="60" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="' + fill + '" stop-opacity="1"/>' +
        '<stop offset="0.45" stop-color="' + fill + '" stop-opacity="0.75"/>' +
        '<stop offset="1" stop-color="' + fill + '" stop-opacity="0"/></radialGradient></defs>';
      fill = 'url(#hc-g' + i + ')';
    }
    var path = document.createElementNS(NS, 'path');
    path.setAttribute('fill', fill);
    el.appendChild(path);
    layer.appendChild(el);
    // bigger = closer = scrolls a bit faster; reduced motion: no parallax at all
    var depth = reduce ? 0 : CFG.depth[0] + (CFG.depth[1] - CFG.depth[0]) * (sizes[i] - CFG.minSize) / (CFG.maxSize - CFG.minSize);
    var b = {
      el: el, path: path, S: S, kind: kinds[i], color: colors[i % colors.length], d: sizes[i], depth: depth,
      x: rand(0, W), y: rand(0, H) + scrollY * (paused ? 0 : depth), vx: 0, vy: 0, ox: 0, oy: 0,
      sx: 1, sy: 1, svx: 0, svy: 0, tx: 1, ty: 1, grow: 1,
      rot: rand(0, 360), vr: rand(-6, 6), fall: 0, state: 'float', wait: 0,
      // overlapping slow waves around the outline: big gentle ones, smaller faint ones
      waves: [[2, 0.10], [3, 0.07], [4, 0.045], [5, 0.025]].map(function (w) {
        return { k: w[0], a: w[1] * rand(0.5, 1), ph: rand(0, 6.3), sp: rand(0.08, 0.25) * (Math.random() < 0.5 ? -1 : 1),
                 am: rand(0.1, 0.3), amPh: rand(0, 6.3) };
      }),
      // one lobe that slowly reaches out, pulls back, and wanders round the body
      pod: { ang: rand(0, 6.3), drift: rand(-0.15, 0.15), sp: rand(0.12, 0.25), ph: rand(0, 6.3) }
    };
    b.personal = rand(0, 90);          // how close it dares to come when curious
    b.circle = (Math.random() < 0.5 ? -1 : 1) * rand(0.5, 1);   // which way, and how keenly, it circles when curious
    if (b.kind === 'watcher') { b.rot = 0; b.vr = 0; wearFace(b); }   // a face shouldn't spin upside down
    aim(b);
    blobs.push(b);
  }

  function respawn(b) {
    var r = b.d / 2 + 10, edge = Math.floor(rand(0, 4));
    b.x = edge === 0 ? -r : edge === 1 ? W + r : rand(0, W);
    b.y = edge === 2 ? -r : edge === 3 ? H + r : rand(0, H);
    var tx = rand(W * 0.2, W * 0.8), ty = rand(H * 0.2, H * 0.8);
    var dx = tx - b.x, dy = ty - b.y, len = Math.sqrt(dx * dx + dy * dy) || 1, sp = rand(CFG.minSpeed, CFG.maxSpeed);
    b.vx = dx / len * sp; b.vy = dy / len * sp;
    b.y += scrollY * dep(b);
    b.ox = b.oy = b.svx = b.svy = 0;
    b.sx = b.sy = b.tx = b.ty = b.grow = 1;
    b.vr = rand(-6, 6); b.state = 'float';
    b.el.style.display = '';
  }

  /* ---------- behaviours ---------- */
  var tinted = null;
  function paint(b) {
    if (tinted === b.color) {
      root.style.setProperty('--hc-bg', CFG.background); tinted = null;
    } else {
      root.style.setProperty('--hc-bg', tint(b.color)); tinted = b.color;
    }
  }
  function flee(b, px, py, power) {
    var dx = b.x - px, dy = viewY(b) - py, len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1) { dx = rand(-1, 1); dy = rand(-1, 1); len = Math.sqrt(dx * dx + dy * dy) || 1; }
    b.ox += dx / len * power; b.oy += dy / len * power;
  }

  // babble: nav text turns to gibberish; the same blob turns it back
  var babbling = null, babbleTimer = null;
  function gibber(s) {
    return s.replace(/[a-záéíóúýæöþð]/gi, function (ch) {
      var low = ch.toLowerCase(), pool = CFG.vowels.indexOf(low) > -1 ? CFG.vowels : CFG.consonants;
      var r = pool.charAt(Math.floor(Math.random() * pool.length));
      return ch === low ? r : r.toUpperCase();
    });
  }
  function babble(b) {
    var on = babbling !== b;
    babbling = on ? b : null;
    var links = [].slice.call(document.querySelectorAll('.site_header a')).filter(function (a) { return !a.querySelector('img'); });
    var nodes = [];
    links.forEach(function (a) {
      var w = document.createTreeWalker(a, NodeFilter.SHOW_TEXT), t, label = '';
      while ((t = w.nextNode())) {
        if (!t.nodeValue.trim()) continue;
        if (t.__hcOrig === undefined) t.__hcOrig = t.nodeValue;
        label += t.__hcOrig;
        nodes.push(t);
      }
      // screen readers keep the real link names
      if (on) a.setAttribute('aria-label', label.trim()); else a.removeAttribute('aria-label');
    });
    var finals = nodes.map(function (t) { return on ? gibber(t.__hcOrig) : t.__hcOrig; });
    var ticks = 0;
    clearInterval(babbleTimer);
    babbleTimer = setInterval(function () {
      ticks++;
      nodes.forEach(function (t, i) { t.nodeValue = ticks < 8 ? gibber(t.__hcOrig) : finals[i]; });
      if (ticks >= 8) clearInterval(babbleTimer);
    }, 60);
  }

  // portrait: a new work appears in the grid nearest to where you are
  var portraits = 0;
  // distance from the blob's centre to its edge in a given direction
  function edgeAt(pts, ang) {
    var N = pts.length, u = (((ang / (Math.PI * 2)) % 1) + 1) % 1 * N;
    var j = Math.floor(u) % N, k = (j + 1) % N, f = u - Math.floor(u);
    var r1 = Math.hypot(pts[j][0], pts[j][1]), r2 = Math.hypot(pts[k][0], pts[k][1]);
    return r1 + (r2 - r1) * f;
  }
  function brightness(hex) {
    var n = parseInt(hex.slice(1), 16);
    return ((n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) / 255;
  }
  function portraitSrc(b) {
    // the blob sits for its portrait in whatever shape it's in right now
    var pts = outline(b, t), face = FACES[Math.floor(Math.random() * FACES.length)];
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    pts.forEach(function (p) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); });

    // map the face from the blob it was drawn on to this blob (bounding box to bounding box)
    var R = face.ref, B = face.box;
    var s = ((x1 - x0) / (R[2] - R[0]) + (y1 - y0) / (R[3] - R[1])) / 2;
    var rcx = (R[0] + R[2]) / 2, rcy = (R[1] + R[3]) / 2, ncx = (x0 + x1) / 2, ncy = (y0 + y1) / 2;
    var fcx = (B[0] + B[2]) / 2, fcy = (B[1] + B[3]) / 2;
    var corners = [[B[0], B[1]], [B[2], B[1]], [B[0], B[3]], [B[2], B[3]]];

    // keep the face where it was drawn, unless that would put part of it off the edge: then ease it inwards
    var pull = 1, mx, my;
    for (var tries = 0; tries < 15; tries++) {
      mx = ncx + (fcx - rcx) * s * pull; my = ncy + (fcy - rcy) * s * pull;
      var inside = corners.every(function (c) {
        var x = mx + (c[0] - fcx) * s, y = my + (c[1] - fcy) * s;
        return Math.hypot(x, y) < edgeAt(pts, Math.atan2(y, x)) * 0.9;
      });
      if (inside) break;
      pull *= 0.9;
    }

    var ink = CFG.faceInk === 'white' || brightness(b.color) <= 0.69 ? '#fff' : '#29272A';
    var faceSvg = face.svg.replace(/INK/g, ink).replace(/BODY/g, b.color);
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#fff"/>' +
      '<g transform="translate(200 205) scale(2.7)"><path d="' + pathFrom(pts) + '" fill="' + b.color + '"/>' +
      '<g transform="translate(' + mx.toFixed(2) + ' ' + my.toFixed(2) + ') scale(' + s.toFixed(4) + ') translate(' +
      (-fcx).toFixed(2) + ' ' + (-fcy).toFixed(2) + ')">' + faceSvg + '</g></g></svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }
  function addPortrait(b) {
    var cards = [].slice.call(document.querySelectorAll('.thumbnails .padding_helper'));
    var best = null, bestD = Infinity, mid = H / 2;
    cards.forEach(function (c) {
      var r = c.getBoundingClientRect();
      if (!r.height) return;
      var d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) { bestD = d; best = c; }
    });
    if (!best) return null;

    var srcImg = best.querySelector('img'), h = srcImg ? srcImg.offsetHeight : 300;
    var card = best.cloneNode(true);
    [].slice.call(card.querySelectorAll('[data-loading]')).forEach(function (el) { el.parentNode.removeChild(el); });
    // strip Cargo's ids/data so its scripts treat this as a stranger
    [card].concat([].slice.call(card.querySelectorAll('*'))).forEach(function (el) {
      [].slice.call(el.attributes).forEach(function (at) {
        if (/^(data-|rel$|id$|name$|srcset$|sizes$|width$|height$)/.test(at.name)) el.removeAttribute(at.name);
      });
    });
    [].slice.call(card.querySelectorAll('a')).forEach(function (a) { a.setAttribute('href', '#'); });
    portraits++;
    var title = CFG.portraitTitle + (portraits > 1 ? ' no. ' + portraits : '');
    var img = card.querySelector('img');
    if (img) {
      img.src = portraitSrc(b);
      img.alt = title;
      img.style.cssText = 'height:' + h + 'px;width:auto;max-width:100%';
    }
    var span = card.querySelector('.thumb_title span') || card.querySelector('.thumb_title');
    if (span) span.textContent = title;
    card.classList.add('hc-new', 'hc-hidden');
    card.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      card.classList.remove('hc-wobble'); void card.offsetWidth; card.classList.add('hc-wobble');
    }, true);

    var r = best.getBoundingClientRect();
    best.parentNode.insertBefore(card, r.top + r.height / 2 < mid ? best.nextSibling : best);
    return card;
  }

  // watcher: wears one of Halli's faces; its eyes follow the cursor and it blinks now and then
  function wearFace(b) {
    // faces whose eyes are dots or rings (the squinting face has no pupils to move)
    var withEyes = FACES.filter(function (f) { return /<(circle|ellipse)/.test(f.svg); });
    var face = withEyes[Math.floor(Math.random() * withEyes.length)];
    var R = face.ref, B = face.box;
    var s = 90 / (((R[2] - R[0]) + (R[3] - R[1])) / 2);          // drawn blob → this blob's 90-unit body
    var fcx = (B[0] + B[2]) / 2, fcy = (B[1] + B[3]) / 2;
    var ox = (fcx - (R[0] + R[2]) / 2) * s * 0.75, oy = (fcy - (R[1] + R[3]) / 2) * s * 0.75;   // a little inwards: the body morphs
    var ink = CFG.faceInk === 'white' || brightness(b.color) <= 0.69 ? '#fff' : '#29272A';
    var g = document.createElementNS(NS, 'g');
    g.innerHTML = face.svg.replace(/INK/g, ink).replace(/BODY/g, b.color);
    // place it on the body straight away: when the page starts paused, the gaze update never runs
    g.setAttribute('transform', 'translate(' + ox.toFixed(2) + ' ' + oy.toFixed(2) + ') scale(' + s.toFixed(4) + ') translate(' +
      (-fcx).toFixed(2) + ' ' + (-fcy).toFixed(2) + ')');
    b.el.appendChild(g);
    b.face = { g: g, s: s, fcx: fcx, fcy: fcy, ox: ox, oy: oy, lx: 0, ly: 0, blink: 0, nextBlink: rand(2, 6),
      eyes: [].slice.call(g.querySelectorAll('circle, ellipse')).map(function (e) {
        return { el: e, cx: +e.getAttribute('cx'), cy: +e.getAttribute('cy') };
      }) };
  }
  function lookAround(b, dt) {
    var f = b.face, tx = 0, ty = 0;
    if (ptr) {
      var dx = ptr.x - b.x, dy = ptr.y - viewY(b), d = Math.sqrt(dx * dx + dy * dy) || 1, k = Math.min(1, d / 250);
      tx = dx / d * k; ty = dy / d * k;
    } else {                                   // no cursor (touch screens): let the gaze wander
      tx = Math.sin(t * 0.37 + b.pod.ph) * 0.6; ty = Math.sin(t * 0.23 + b.pod.ang) * 0.4;
    }
    f.lx += (tx - f.lx) * Math.min(1, dt * 6); f.ly += (ty - f.ly) * Math.min(1, dt * 6);
    f.nextBlink -= dt;
    if (f.nextBlink <= 0) { f.blink = 0.16; f.nextBlink = rand(2.5, 7); }
    var squint = 1;
    if (f.blink > 0) { f.blink -= dt; squint = 0.12; }
    // whole face leans a little towards the cursor, eyes move further
    f.g.setAttribute('transform', 'translate(' + (f.ox + f.lx * 4).toFixed(2) + ' ' + (f.oy + f.ly * 4).toFixed(2) + ') scale(' +
      f.s.toFixed(4) + ') translate(' + (-f.fcx).toFixed(2) + ' ' + (-f.fcy).toFixed(2) + ')');
    var ex = f.lx * 3.2, ey = f.ly * 3.2;
    f.eyes.forEach(function (e) {
      e.el.setAttribute('transform', 'translate(' + (e.cx + ex).toFixed(2) + ' ' + (e.cy + ey).toFixed(2) + ') scale(1 ' + squint +
        ') translate(' + (-e.cx) + ' ' + (-e.cy) + ')');
    });
  }

  // print-shop: every thumbnail becomes a print in dark ink + this blob's colour on white paper
  var printing = null, printDefs = null;
  function hexRGB(hex) { var n = parseInt(hex.slice(1), 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
  function print(b) {
    if (!printDefs) {
      printDefs = document.createElementNS(NS, 'svg');
      printDefs.setAttribute('aria-hidden', 'true');
      printDefs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
      printDefs.innerHTML = '<filter id="hc-print" color-interpolation-filters="sRGB">' +
        '<feColorMatrix type="saturate" values="0"/>' +
        '<feComponentTransfer><feFuncR type="table"/><feFuncG type="table"/><feFuncB type="table"/></feComponentTransfer></filter>';
      document.body.appendChild(printDefs);
    }
    if (printing === b) { root.classList.remove('hc-print'); printing = null; return; }
    // shadows → dark ink, midtones → the blob's colour, highlights → paper
    var dark = hexRGB('#29272A'), ink = hexRGB(b.color);
    ['R', 'G', 'B'].forEach(function (ch, i) {
      printDefs.querySelector('feFunc' + ch).setAttribute('tableValues', dark[i].toFixed(3) + ' ' + ink[i].toFixed(3) + ' 1');
    });
    root.classList.add('hc-print'); printing = b;
  }

  // hungry: swallows the nearest blob, carries it around in its belly, spits it out when clicked again
  function eat(b) {
    if (b.prey) {                                              // full: spit it out
      var p = b.prey, a = rand(0, Math.PI * 2);
      p.state = 'float'; p.el.style.opacity = CFG.opacity; p.tx = p.ty = p.grow = 1;
      p.ox = Math.cos(a) * 320; p.oy = Math.sin(a) * 320;
      b.prey = null; b.tx = b.ty = b.grow; b.svx -= 2; b.svy += 2.4;
      return;
    }
    var best = null, bestD = Infinity, by = viewY(b);
    blobs.forEach(function (o) {
      if (o === b || o.state !== 'float') return;
      var dx = o.x - b.x, dy = viewY(o) - by, d = dx * dx + dy * dy;
      if (d < bestD) { bestD = d; best = o; }
    });
    if (!best) { b.svx += 2; b.svy += 2; return; }
    b.prey = best; best.state = 'swallowed'; best.host = b; best.gulp = 0; best.orbit = rand(0, 6.3);
    best.tx = best.ty = Math.min(0.55, (b.d * 0.42) / best.d);  // shrink to fit inside
    layer.appendChild(best.el);                                 // drawn over the host, so it shows through
    b.tx = b.ty = b.grow * 1.12; b.svx += 1.5; b.svy += 1.5;    // a satisfied swell
  }

  /* ---------- pause button (WCAG 2.2.2 Pause, Stop, Hide) ---------- */
  // The words change with the state, so no aria-pressed: the visible label is the accessible name.
  var ICON_PAUSE = '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><rect x="2" y="1.5" width="3.5" height="11" rx="1" fill="currentColor"/><rect x="8.5" y="1.5" width="3.5" height="11" rx="1" fill="currentColor"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M3 1.8v10.4c0 .6.6 1 1.1.7l8.4-5.2c.5-.3.5-1.1 0-1.4L4.1 1.1C3.6.8 3 1.2 3 1.8z" fill="currentColor"/></svg>';
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'hc-pause';
  btn.innerHTML = '<span class="hc-pause-icon"></span><span class="hc-pause-text"></span>';
  document.body.insertBefore(btn, document.body.firstChild);      // first stop for keyboard users
  function drawButton() {
    btn.querySelector('.hc-pause-icon').innerHTML = paused ? ICON_PLAY : ICON_PAUSE;
    btn.querySelector('.hc-pause-text').textContent = paused ? CFG.playLabel : CFG.pauseLabel;
  }
  function setPaused(p) {
    blobs.forEach(function (b) { b.y = viewY(b); });                // keep every blob where it is on screen…
    paused = p;
    blobs.forEach(function (b) { b.y += scrollY * dep(b); });       // …while parallax switches off or on
    if (paused && babbling) babble(babbling);                       // nav goes back to real words
    if (paused) blobs.forEach(function (b) {                        // don't freeze a face mid-blink
      if (b.face) { b.face.blink = 0; lookAround(b, 0); }
    });
    try { localStorage.setItem('hc-blobs-paused', paused ? '1' : '0'); } catch (e) {}
    drawButton();
  }
  btn.addEventListener('click', function () { setPaused(!paused); });
  drawButton();
  // use the nav's typeface once the header exists (this script runs before it does)
  function matchNavFont() {
    var a = document.querySelector('.site_header .navigation a');
    if (a) btn.style.fontFamily = getComputedStyle(a).fontFamily;
  }
  matchNavFont();
  document.addEventListener('DOMContentLoaded', matchNavFont);

  /* ---------- pointer ---------- */
  var ptr = null, held = null;
  function skipped(t) { return t && t.closest && t.closest(CFG.skip); }
  function hit(x, y) {
    for (var i = blobs.length - 1; i >= 0; i--) {
      var b = blobs[i];
      if (b.state !== 'float') continue;
      var dx = x - b.x, dy = y - viewY(b), r = radius(b) * 0.92;
      if (dx * dx + dy * dy < r * r) return b;
    }
    return null;
  }

  var lastMove = performance.now(), curious = false;
  document.addEventListener('pointermove', function (e) {
    ptr = { x: e.clientX, y: e.clientY };
    lastMove = performance.now();
    if (curious) {                         // caught looking: scatter
      curious = false;
      blobs.forEach(function (b) {
        if (b.state !== 'float') return;
        var dx = b.x - e.clientX, dy = viewY(b) - e.clientY, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 350) flee(b, e.clientX, e.clientY, 300 * (1 - d / 350));
      });
    }
    if (e.pointerType === 'mouse') {
      var b = !skipped(e.target) && hit(e.clientX, e.clientY);
      document.documentElement.classList.toggle('hc-hover', !!(b && b.kind !== 'shy'));
    }
  }, { passive: true });

  document.addEventListener('pointerout', function (e) { if (!e.relatedTarget) ptr = null; });

  document.addEventListener('pointerdown', function (e) {
    if (e.button) return;
    ptr = { x: e.clientX, y: e.clientY };
    if (skipped(e.target)) return;
    var b = hit(e.clientX, e.clientY);
    if (!b) return;
    if (b.kind === 'shy') { flee(b, e.clientX, e.clientY, 420); return; }
    e.preventDefault();
    if (b.kind === 'swell') {
      if (b.grow < CFG.swellMax) { b.vx *= 0.88; b.vy *= 0.88; }
      b.grow = Math.min(b.grow * CFG.swellStep, CFG.swellMax);
      b.tx = b.ty = b.grow; b.svx += 2; b.svy += 2.6;
    } else if (b.kind === 'drop') {
      b.state = 'held'; held = b;
      b.tx = b.grow * 0.92; b.ty = b.grow * 0.6;
    } else if (b.kind === 'paint') {
      paint(b); b.svx += 2.2; b.svy -= 1.4;
    } else if (b.kind === 'babble') {
      if (!paused) babble(b);                                       // paused: the nav stays readable
      b.svx -= 1.6; b.svy += 2.2;
    } else if (b.kind === 'portrait') {
      var card = addPortrait(b);
      if (card) { b.state = 'absorb'; b.target = card; b.absorbT = 0; b.tx = b.ty = 0.15; }
      else { b.svx += 2; b.svy += 2; }   // no grid on this page: just a wobble
    } else if (b.kind === 'watcher') {
      b.face.blink = 0.3; b.face.nextBlink = rand(2.5, 7); b.svx += 1.4; b.svy -= 1.8;   // startled blink
    } else if (b.kind === 'print') {
      print(b); b.svx += 2.4; b.svy -= 2;
    } else if (b.kind === 'hungry') {
      eat(b);
    }
  }, { passive: false });

  function release(e) {
    if (e.pointerType !== 'mouse') ptr = null;
    if (!held) return;
    held.state = 'falling'; held.fall = 0;
    held.vx *= 0.5; held.vr = rand(-80, 80);
    held = null;
  }
  document.addEventListener('pointerup', release);
  document.addEventListener('pointercancel', release);
  // Checked every frame: on phones Cargo switches to the real screen width only after this script has started,
  // and Safari doesn't always announce it. Measure the blob layer itself and rescale when it changes.
  // iOS 26 Safari draws the page under its address bar, but fixed layers stop where the bar begins, so the
  // blobs were cut off in a straight line there. On iOS the layer reaches down to the real bottom of the screen.
  var IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
            !!(window.CSS && CSS.supports && CSS.supports('-webkit-touch-callout', 'none'));
  window.__hcBlobsIOS = IOS;   // shown by ?hc-debug
  function fitToScreen() {
    if (IOS) {
      var vv = window.visualViewport, sc = vv ? vv.scale : 1;
      var full = (innerWidth > innerHeight ? Math.min(screen.width, screen.height) : Math.max(screen.width, screen.height)) / sc;
      var want = Math.max(innerHeight, Math.round(full)) + 'px';
      if (layer.style.height !== want) layer.style.height = want;
    }
    var r = layer.getBoundingClientRect(), nw = Math.round(r.width), nh = Math.round(r.height);
    if (!nw || !nh || (nw === W && nh === H)) return;
    var fx = nw / W, fy = nh / H, wasWide = W >= 700;
    blobs.forEach(function (b) { var sy = viewY(b) * fy; b.x *= fx; b.y = sy + scrollY * dep(b); });
    W = nw; H = nh;
    if (wasWide && W < 700) {        // started out thinking it was a desktop: trim to the phone count
      for (var i = blobs.length - 1; i >= 0 && blobs.length > CFG.countMobile; i--) {
        var b = blobs[i];
        if (b.state !== 'float' || b.prey || b === babbling || b === printing || b === held) continue;
        b.el.parentNode.removeChild(b.el); blobs.splice(i, 1);
      }
    }
  }
  addEventListener('resize', fitToScreen);

  /* ---------- animation loop ---------- */
  var last = performance.now(), t = 0;
  function frame(now) {
    var dt = Math.min((now - last) / 1000, 0.05);
    fitToScreen();
    last = now; t += paused ? 0 : dt * drift;                    // paused: shapes stop changing
    curious = !paused && CFG.curiousAfter > 0 && !!ptr && now - lastMove > CFG.curiousAfter * 1000;
    if (curious) {
      // gathered blobs nudge each other apart rather than piling on top of one another
      for (var a = 0; a < blobs.length; a++) for (var c = a + 1; c < blobs.length; c++) {
        var A = blobs[a], C = blobs[c];
        if (A.state !== 'float' || C.state !== 'float') continue;
        var sx = C.x - A.x, sy = viewY(C) - viewY(A), sd = Math.sqrt(sx * sx + sy * sy) || 1, room = (radius(A) + radius(C)) * 0.85;
        if (sd < room) {
          var nudge = (1 - sd / room) * 120 * dt;
          A.ox -= sx / sd * nudge; A.oy -= sy / sd * nudge; C.ox += sx / sd * nudge; C.oy += sy / sd * nudge;
        }
      }
    }

    for (var i = 0; i < blobs.length; i++) {
      var b = blobs[i];

      if (b.state === 'gone') {
        b.wait -= dt;
        if (b.wait <= 0) respawn(b);
        continue;
      }

      // springy scale
      b.svx += ((b.tx - b.sx) * 170 - b.svx * 9) * dt; b.sx += b.svx * dt;
      b.svy += ((b.ty - b.sy) * 170 - b.svy * 9) * dt; b.sy += b.svy * dt;

      if (b.state === 'float' && !paused) {                       // paused: no drifting, dodging or gathering
        if (b.kind === 'shy' && ptr) {
          var dx = b.x - ptr.x, dy = viewY(b) - ptr.y, dist = Math.sqrt(dx * dx + dy * dy) || 1, reach = radius(b) + 70;
          if (dist < reach) {
            var push = (1 - dist / reach) * 2600 * dt;
            b.ox += dx / dist * push; b.oy += dy / dist * push;
          }
        }
        if (curious) {
          // come and look, but each keeps its own distance (shy ones stay further back)
          var cx = ptr.x - b.x, cy = ptr.y - viewY(b), cd = Math.sqrt(cx * cx + cy * cy) || 1;
          var ring = radius(b) + (b.kind === 'shy' ? 110 : 45) + b.personal;
          var pull = cd > ring ? Math.min(1, (cd - ring) / 200) : -0.5;
          b.ox += cx / cd * pull * 140 * dt; b.oy += cy / cd * pull * 140 * dt;
          // and slowly circle round it, each in its own direction, so they spread out instead of clumping
          b.ox += -cy / cd * b.circle * 90 * dt; b.oy += cx / cd * b.circle * 90 * dt;
        }
        b.ox *= Math.exp(-3 * dt); b.oy *= Math.exp(-3 * dt);
        var pace = drift * (b.prey ? 0.5 : 1) * (curious ? 0.4 : 1);   // a full belly slows you down
        b.x += (b.vx * pace + b.ox) * dt;
        b.y += (b.vy * pace + b.oy) * dt;
        b.rot += b.vr * drift * dt;
        var m = radius(b) + 10;
        if (b.x < -m) b.x = W + m; else if (b.x > W + m) b.x = -m;
        var vy = viewY(b);
        if (vy < -m) b.y += H + 2 * m; else if (vy > H + m) b.y -= H + 2 * m;
      } else if (b.state === 'absorb') {
        var tr = b.target.getBoundingClientRect(), k = Math.min(1, dt * 6);
        b.x += (tr.left + tr.width / 2 - b.x) * k;
        b.y += (tr.top + Math.min(tr.height, 300) / 2 - viewY(b)) * k;
        b.absorbT += dt;
        if (b.absorbT > 0.7) {
          b.target.classList.remove('hc-hidden'); b.target = null;
          b.state = 'gone'; b.wait = rand(4, 8); b.el.style.display = 'none';
          continue;
        }
      } else if (b.state === 'swallowed') {
        // drawn into the belly, then drifts slowly round inside it
        var host = b.host, orb = radius(host) * 0.16;
        b.gulp = Math.min(1, b.gulp + dt * 2.5); b.orbit += paused ? 0 : dt * 0.5;
        var hx = host.x + Math.cos(b.orbit) * orb, hy = viewY(host) + Math.sin(b.orbit * 1.3) * orb;
        var follow = b.gulp < 1 ? Math.min(1, dt * 8) : 1;
        b.x += (hx - b.x) * follow;
        b.y += (hy + scrollY * dep(b) - b.y) * follow;
        b.rot += 8 * dt;
        b.el.style.opacity = (CFG.opacity * (1 - 0.65 * b.gulp)).toFixed(3);
      } else if (b.state === 'falling') {
        b.fall += 1500 * dt;
        b.y += b.fall * dt; b.x += b.vx * dt; b.rot += b.vr * dt;
        if (viewY(b) - radius(b) > H + 20) {
          b.state = 'gone'; b.wait = rand(3, 7); b.el.style.display = 'none';
          continue;
        }
      }

      if (b.face && !paused) lookAround(b, dt);                    // paused: the eyes rest too
      b.path.setAttribute('d', shape(b, t));
      b.el.style.transform = 'translate3d(' + (b.x - b.S / 2) + 'px,' + (viewY(b) - b.S / 2) + 'px,0) scale(' +
        b.sx + ',' + b.sy + ') rotate(' + b.rot + 'deg)';
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
window.__hcBuild = "2026-11-04 04:04";
