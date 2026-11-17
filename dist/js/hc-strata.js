/* hc-strata for hallicivelek.com: built from src/hc-strata.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  .hc-strata { position: fixed; top: 0; left: 0; right: 0; height: 100vh; height: 100lvh; z-index: -2; pointer-events: none; overflow: hidden; contain: strict; }\n  html:not(.hc-strata-on) .hc-strata { display: none; }\n  .hc-strata-col { position: absolute; left: 0; right: 0; top: 0; will-change: transform; }\n  .hc-strata-band { position: absolute; left: 0; right: 0;\n    -webkit-mask-image: linear-gradient(transparent, #000 var(--in, 12%), #000 var(--out, 88%), transparent);\n    mask-image: linear-gradient(transparent, #000 var(--in, 12%), #000 var(--out, 88%), transparent); }\n  .hc-s-seam { position: absolute; left: 0; right: 0; height: 40px; margin-top: -20px; background-size: 1200px 40px; background-repeat: repeat-x; background-position: 50% 0; }\n  /* the header follows the depth: a grey overlay under its logo and links, as strong as the layer below it */\n  html.hc-strata-on .site_header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: -1; pointer-events: none;\n    background: rgb(204, 200, 201); opacity: var(--hc-strata-head, 0); }\n  /* the award on the grey: darker teal (5.3:1 on the grey, 8.5:1 on the pink) and the sub line at full strength */\n  html.hc-strata-on .hc-award-pick button { color: rgb(6, 84, 92); }\n  html.hc-strata-on .hc-award-sub { opacity: 1; }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcStrata) return;
  var root = document.documentElement;
  var K = 0.8;                       // the layer's speed relative to the page while it moves
  var G = '204,200,201';             // Netscape grey, a touch warm; over the pink it ends near rgb(206, 201, 202)
  // how much grey covers the paper, by depth (fraction of the layer's height)
  var GREY = [[0, 0], [0.22, 0], [0.30, 0.12], [0.44, 0.38], [0.53, 0.8], [0.62, 0.92], [1, 0.95]];

  function svg(s) { return 'url("data:image/svg+xml,' + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' " + s + '</svg>') + '")'; }
  function rng(seed) { var r = seed; return function () { r = (r * 9301 + 49297) % 233280; return r / 233280; }; }

  // paper grain: very fine, warm, barely there
  var GRAIN = svg("width='180' height='180'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='.75 .55' numOctaves='3' stitchTiles='stitch'/>" +
    "<feColorMatrix values='0 0 0 0 .35  0 0 0 0 .2  0 0 0 0 .25  0 0 0 -1.4 1'/></filter><rect width='100%' height='100%' filter='url(#f)'/>");
  // the ghost of a 1998 layout table (<table width=820 border=1 cellspacing=2>): bevelled cells, light top-left, dark bottom-right
  function cells(y, h, xs) {
    var o = '';
    for (var i = 0; i < xs.length - 1; i++) {
      var x = xs[i] + 2, w = xs[i + 1] - xs[i] - 2, b = y + h;
      o += "<path d='M" + x + ' ' + (b - 0.5) + 'V' + (y + 2.5) + 'H' + (x + w) + "' stroke='#fff'/>" +
           "<path d='M" + (x + 0.5) + ' ' + (b - 0.5) + 'H' + (x + w - 0.5) + 'V' + (y + 2.5) + "' stroke='#7a6a6c'/>";
    }
    return o;
  }
  var TABLE = svg("width='824' height='720' fill='none' stroke-width='1'>" + cells(0, 90, [0, 822]) + cells(90, 360, [0, 170, 822]) +
    cells(90, 120, [170, 496, 822]) + cells(450, 270, [0, 170, 822]) + cells(450, 60, [170, 380, 600, 822]));
  // dial-up line noise: sparse, sharp-edged — dropped scanlines (some torn, slipped sideways) and little bursts of
  // square pixels, like a picture arriving over a bad line. No fine fibres (the mockup's read as brushed fabric).
  function lineNoise() {
    var r = rng(41), o = '', i, j;
    for (i = 0; i < 12; i++) {
      var x = Math.round(r() * 640), y = Math.round(r() * 440), w = Math.round(14 + r() * r() * 160), h = r() < 0.7 ? 1 : 2;
      var dark = r() < 0.55;
      for (var dx = -640; dx <= 0; dx += 640)   // drawn twice, so a bar running off the right edge comes back on the left
        o += "<rect x='" + (x + dx) + "' y='" + y + "' width='" + w + "' height='" + h + "' fill='" + (dark ? '#492e46' : '#fff') + "' fill-opacity='" + (dark ? 0.2 : 0.55) + "'/>" +
             (r() < 0.45 ? "<rect x='" + (x + dx + 5 + Math.round(r() * 9)) + "' y='" + (y + h + 1) + "' width='" + Math.round(w * 0.6) + "' height='1' fill='" + (dark ? '#fff' : '#492e46') + "' fill-opacity='" + (dark ? 0.5 : 0.16) + "'/>" : '');
    }
    for (i = 0; i < 8; i++) {
      var cx = 12 + Math.round(r() * 204) * 3, cy = 12 + Math.round(r() * 138) * 3, n = 3 + Math.floor(r() * 6), a = (0.1 + r() * 0.14).toFixed(2);
      for (j = 0; j < n; j++)
        o += "<rect x='" + (cx + Math.round((r() - 0.5) * 6) * 3) + "' y='" + (cy + Math.round((r() - 0.5) * 4) * 3) + "' width='3' height='3' fill='#492e46' fill-opacity='" + a + "'/>";
    }
    return svg("width='640' height='440' shape-rendering='crispEdges'>" + o);
  }
  var NOISE = lineNoise();
  // and now and then what the modem said, very faint, in the machine's own type
  var MODEM = svg("width='760' height='560' font-family='Courier New,Courier,monospace' font-size='11' letter-spacing='1' fill='#492e46' fill-opacity='.17'>" +
    "<text x='40' y='70'>ATDT 5551998</text><text x='430' y='190'>CONNECT 28800/ARQ</text>" +
    "<text x='120' y='330'>~{|}#^&amp;%$@!+</text><text x='520' y='450'>NO CARRIER</text><text x='300' y='530'>+++ATH0</text>");
  // a stratum line: a soft irregular sediment edge, tiled across
  function seam(seed, amp) {
    var d = 'M0 20', x = 0, r = rng(seed);
    while (x < 1200) {                                                  // ends where it began, so the tile joins up
      var nx = Math.min(x + 60 + r() * 80, 1200), ny = nx === 1200 ? 20 : 20 + (r() - 0.5) * amp;
      d += ' Q' + (x + (nx - x) / 2).toFixed(1) + ' ' + (20 + (r() - 0.5) * amp * 2).toFixed(1) + ' ' + nx.toFixed(1) + ' ' + ny.toFixed(1); x = nx;
    }
    return svg("width='1200' height='40' fill='none'><path d='" + d + "' stroke='#492e46' stroke-opacity='.22' stroke-width='1.2'/>" +
      "<path d='" + d + "' transform='translate(0 5)' stroke='#492e46' stroke-opacity='.07' stroke-width='1'/>");
  }

  var grad = GREY.map(function (s) { return 'rgba(' + G + ',' + s[1] + ') ' + (s[0] * 100) + '%'; }).join(',');
  var DEEP = 'rgba(' + G + ',' + GREY[GREY.length - 1][1] + ')';
  var css =
    '.hc-strata-col{background:linear-gradient(to bottom,' + grad + ')}' +
    // below the layer's end: more of the deepest layer, for when a switch to still leaves the column short at the bottom
    '.hc-strata-col::after{content:"";position:absolute;left:0;right:0;top:100%;height:60%;background:' + MODEM + ' 50% 0/760px 560px,' + NOISE + ' 0 0/640px 440px,' + DEEP + '}' +
    '.hc-s-paper{top:0;height:30%;--in:0%;background-image:' + GRAIN + ';opacity:.22;background-size:180px 180px}' +
    '.hc-s-table{top:22%;height:32%;--in:30%;--out:70%;background:' + TABLE + ' 50% 0/824px 720px repeat-y;opacity:.6}' +
    '.hc-s-grey{top:50%;height:28%;--in:25%;--out:75%;background:' + TABLE + ' 50% 0/824px 720px repeat-y;opacity:.22}' +
    '.hc-s-noise{top:72%;height:28%;--in:40%;--out:100%;background:' + MODEM + ' 50% 0/760px 560px,' + NOISE + ' 0 0/640px 440px}' +
    '.hc-s-seam1{top:24%;background-image:' + seam(3, 7) + '}' +
    '.hc-s-seam2{top:49%;background-image:' + seam(11, 10) + '}' +
    '.hc-s-seam3{top:76%;background-image:' + seam(29, 13) + '}';
  var style = document.createElement('style'); style.setAttribute('data-hc-strata', ''); style.textContent = css;
  document.head.appendChild(style);
  var anim = document.createElement('style'); anim.setAttribute('data-hc-strata-anim', '');   // scroll-driven keyframes, rewritten when the page changes size
  document.head.appendChild(anim);

  var el = document.createElement('div');
  el.className = 'hc-strata'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<div class="hc-strata-col">' +
    '<div class="hc-strata-band hc-s-paper"></div><div class="hc-strata-band hc-s-table"></div><div class="hc-strata-band hc-s-grey"></div>' +
    '<div class="hc-strata-band hc-s-noise"></div>' +
    '<div class="hc-s-seam hc-s-seam1"></div><div class="hc-s-seam hc-s-seam2"></div><div class="hc-s-seam hc-s-seam3"></div></div>';
  var col = el.firstChild;

  var SDA = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()')) && !/[?&]hc-strata=js/.test(location.search);
  var calm = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function stillNow() { return calm.matches || root.classList.contains('hc-blobs-paused'); }

  // The layer shows column position  d + r * scrollY  at the top of the screen. r is K, or 1 when still; switching
  // r moves d so that the spot under the screen stays put (no jump). The column is H tall, worked out from the page.
  var on = false, r = stillNow() ? 1 : K, d = 0, H = 0, vh = 0, maxY = 0, hh = 0, n = 0, geo = '';
  function greyAt(f) {
    for (var i = 1; i < GREY.length; i++) if (f <= GREY[i][0]) {
      var a = GREY[i - 1], b = GREY[i]; return a[1] + (b[1] - a[1]) * (f - a[0]) / (b[0] - a[0]);
    }
    return GREY[GREY.length - 1][1];
  }
  function headAt(y) { return H ? greyAt(Math.max(0, (hh + d + r * y) / H)) : 0; }
  function header() { return document.querySelector('.site_header'); }

  function keyframes() {
    if (!SDA) return;
    n++;
    var steps = [];
    for (var i = 0; i <= 24; i++) steps.push((i / 24 * 100).toFixed(2) + '%{opacity:' + headAt(maxY * i / 24).toFixed(3) + '}');
    anim.textContent =
      '@keyframes hc-strata-mv' + n + '{from{transform:translate3d(0,' + (-d).toFixed(1) + 'px,0)}to{transform:translate3d(0,' + (-(d + r * maxY)).toFixed(1) + 'px,0)}}' +
      '@keyframes hc-strata-hd' + n + '{' + steps.join('') + '}' +
      '.hc-strata-col{animation:hc-strata-mv' + n + ' 1ms linear both;animation-timeline:scroll(root block)}' +
      'html.hc-strata-on .site_header::before{animation:hc-strata-hd' + n + ' 1ms linear both;animation-timeline:scroll(root block)}';
  }

  // measured again whenever anything may have changed (Cargo adds the phone viewport tag late; the grid grows as
  // projects load), never only at start-up
  function measure() {
    if (!on) return;
    var se = document.scrollingElement || root, h = header();
    vh = el.clientHeight || innerHeight;
    maxY = Math.max(0, se.scrollHeight - innerHeight);
    hh = h ? h.offsetHeight : 0;
    var g = [vh, maxY, hh].join();
    if (g === geo) return;
    geo = g;
    H = Math.round(r * maxY + vh);
    col.style.height = H + 'px';
    keyframes(); frame();
  }
  function setStill(s) {
    var nr = s ? 1 : K;
    if (nr === r) return;
    d += (r - nr) * (window.scrollY || 0);   // same spot on screen before and after
    r = nr;
    keyframes(); frame();
  }

  var pending = false;
  function frame() {
    pending = false;
    if (!on || SDA) return;
    var y = window.scrollY || 0;
    col.style.transform = 'translate3d(0,' + (-(d + r * y)).toFixed(1) + 'px,0)';
    var h = header(); if (h) h.style.setProperty('--hc-strata-head', headAt(y).toFixed(3));
  }
  function queue() { if (!pending && on && !SDA) { pending = true; requestAnimationFrame(frame); } }

  // on the front page, not in 1999 mode
  function check() {
    var want = location.pathname.replace(/\/+$/, '') === '' && !root.classList.contains('hc-ns') && !root.classList.contains('hc-gc');
    if (want && !el.isConnected && document.body) document.body.appendChild(el);
    if (want !== on) {
      on = want;
      root.classList.toggle('hc-strata-on', on);
      if (on) { geo = ''; measure(); }
    }
    if (on) { setStill(stillNow()); measure(); }
  }

  function start() {
    check();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', function () { measure(); queue(); });
    addEventListener('popstate', function () { setTimeout(check, 150); });
    if (calm.addEventListener) calm.addEventListener('change', check);
    if (window.ResizeObserver) new ResizeObserver(measure).observe(document.body);
    new MutationObserver(check).observe(root, { attributes: true, attributeFilter: ['class'] });   // 1999 mode, pause
    var t = null;
    new MutationObserver(function () { clearTimeout(t); t = setTimeout(check, 150); }).observe(document.body, { childList: true, subtree: true });
    setInterval(measure, 1000);
  }
  window.__hcStrata = { el: el, info: function () { return { on: on, sda: SDA, r: r, d: d, H: H, maxY: maxY }; } };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
window.__hcBuild = "2026-11-17 02:56";
