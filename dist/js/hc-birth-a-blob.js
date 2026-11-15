/* hc-birth-a-blob for hallicivelek.com: built from src/hc-birth-a-blob.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  html.hc-bab-on .thumbnails, html.hc-bab-on #hc-sort { display: none !important; }\n  #hc-bab { box-sizing: border-box; width: min(1080px, 92vw); position: relative; left: 50%; transform: translateX(-50%);\n    text-align: left; font-family: pacaembu, sans-serif; color: #492E46; letter-spacing: .02em; line-height: normal;\n    padding: 44px 0 96px; display: grid; grid-template-columns: minmax(0, 400px) minmax(0, 1fr); gap: 0 56px; align-items: center; }\n  #hc-bab *, #hc-bab *::before, #hc-bab *::after { box-sizing: border-box; }\n  #hc-bab [hidden] { display: none !important; }\n  #hc-bab .hc-bab-sr { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; margin: 0; padding: 0; }\n  #hc-bab a { color: inherit; }\n  #hc-bab :focus-visible { outline: 3px solid #3BBFC9; outline-offset: 3px; }\n\n  #hc-bab .hc-bab-words { grid-column: 1; grid-row: 1; }\n  #hc-bab #hc-bab-controls { grid-row: 2; }\n  #hc-bab a.hc-bab-back { display: inline-block; font-size: 18px; text-decoration: none; margin-bottom: 18px; background: none !important; color: inherit !important; }\n  #hc-bab a.hc-bab-back:hover { text-decoration: underline; }\n  #hc-bab h1 { font-family: inherit; font-size: 44px; line-height: 1.1; margin: 0 0 14px; font-weight: bold; letter-spacing: 0; color: inherit; text-transform: none; }\n  #hc-bab p { color: inherit; }\n  #hc-bab .hc-bab-lede { font-size: 21px; line-height: 1.45; margin: 0 0 30px; }\n  #hc-bab .hc-bab-note { font-size: 16px; line-height: 1.45; margin: 26px 0 0; opacity: .8; }\n\n  /* the blob on its table */\n  #hc-bab .hc-bab-stage { grid-column: 2; grid-row: 1 / span 2; position: relative; width: min(100%, 560px); justify-self: center; padding-right: 54px; }\n  #hc-bab .hc-bab-paper { position: relative; aspect-ratio: 1; touch-action: none; border-radius: 50%; }\n  #hc-bab .hc-bab-paper:focus-visible { outline-offset: -8px; }\n  #hc-bab .hc-bab-paper svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; display: block; }\n  #hc-bab .hc-bab-shadow { position: absolute; left: 22%; right: 22%; bottom: 4%; height: 7%; border-radius: 50%;\n    background: radial-gradient(closest-side, rgba(73, 46, 70, .16), rgba(73, 46, 70, 0)); transition: opacity .6s ease; }\n  #hc-bab .hc-bab-holding .hc-bab-paper { cursor: none; }\n  #hc-bab .hc-bab-empty .hc-bab-paper svg, #hc-bab .hc-bab-empty .hc-bab-pencil { opacity: 0; visibility: hidden; }\n  #hc-bab .hc-bab-empty .hc-bab-shadow { opacity: .35; }\n  #hc-bab button.hc-bab-pencil { position: absolute; right: 6px; top: 34%; width: 34px; padding: 0; margin: 0; border: 0; background: none;\n    cursor: pointer; min-height: 0; letter-spacing: 0; transform: rotate(8deg); transition: transform .25s ease; }\n  #hc-bab .hc-bab-pencil img { display: block; width: 100%; height: auto; max-width: none; margin: 0; padding: 0; border: 0; }\n  #hc-bab .hc-bab-pencil:hover, #hc-bab .hc-bab-pencil:focus-visible { transform: rotate(16deg) translateY(-4px); }\n  #hc-bab .hc-bab-holding .hc-bab-pencil { visibility: hidden; }\n  #hc-bab img.hc-bab-held { position: absolute; z-index: 3; width: 34px; height: auto; max-width: none; margin: 0; padding: 0; border: 0;\n    pointer-events: none; display: none; transform: rotate(14deg); }\n  #hc-bab .hc-bab-holding .hc-bab-held { display: block; }\n  #hc-bab .hc-bab-hint { position: absolute; left: 0; right: 54px; bottom: -34px; text-align: center; font-size: 16px; margin: 0; }\n  #hc-bab .hc-bab-gone { position: absolute; inset: 0 54px 0 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end;\n    text-align: center; gap: 18px; padding: 0 10% 15%; }\n  #hc-bab.hc-bab-released .hc-bab-colours, #hc-bab.hc-bab-released .hc-bab-buttons { display: none; }\n  #hc-bab .hc-bab-gone p { font-size: 22px; line-height: 1.4; margin: 0; text-wrap: balance; }\n  #hc-bab.hc-bab-released #hc-bab-controls { align-self: start; }\n\n  /* colours and buttons */\n  #hc-bab .hc-bab-colours { border: 0; margin: 0 0 22px; padding: 0; min-width: 0; display: flex; gap: 12px; flex-wrap: wrap; }\n  #hc-bab .hc-bab-colours label { position: relative; display: block; width: 40px; height: 40px; margin: 0; cursor: pointer; }\n  #hc-bab .hc-bab-colours input { position: absolute; left: 0; top: 0; opacity: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }\n  #hc-bab .hc-bab-dot { display: block; width: 100%; height: 100%; border-radius: 47% 53% 51% 49% / 53% 46% 54% 47%;\n    box-shadow: inset 0 0 0 1px rgba(73, 46, 70, .12); transition: transform .2s ease; }\n  #hc-bab .hc-bab-colours label:nth-child(2n) .hc-bab-dot { border-radius: 53% 47% 45% 55% / 48% 55% 45% 52%; }\n  #hc-bab .hc-bab-colours input:checked + .hc-bab-dot { box-shadow: 0 0 0 3px #F3DCDF, 0 0 0 5.5px #492E46; }\n  #hc-bab .hc-bab-colours input:hover + .hc-bab-dot { transform: scale(1.08); }\n  #hc-bab .hc-bab-colours input:focus-visible + .hc-bab-dot { outline: 3px solid #3BBFC9; outline-offset: 6px; }\n  #hc-bab .hc-bab-buttons { display: flex; gap: 12px; flex-wrap: wrap; }\n  #hc-bab button.hc-bab-btn { display: inline-flex; align-items: center; min-height: 46px; margin: 0; padding: 0 22px; border-radius: 999px;\n    font-family: inherit; font-size: 18px; font-weight: normal; line-height: 1; letter-spacing: .02em; text-transform: none; cursor: pointer;\n    border: 1px solid rgba(41, 39, 42, .18); background: rgba(255, 255, 255, .88); color: #29272A; }\n  #hc-bab button.hc-bab-btn:hover { background: #fff; }\n  #hc-bab button.hc-bab-btn.hc-bab-go { background: #492E46; border-color: #492E46; color: #fff; font-weight: bold; }\n  #hc-bab button.hc-bab-btn.hc-bab-go:hover { background: #5c3b58; }\n\n  @media (max-width: 760px) {\n    #hc-bab { padding: 22px 0 90px; grid-template-columns: 1fr; }\n    #hc-bab .hc-bab-words, #hc-bab #hc-bab-controls { grid-row: auto; }\n    #hc-bab .hc-bab-stage { grid-column: 1; grid-row: auto; width: min(100%, 400px); padding-right: 40px; margin: 4px 0 22px; }\n    #hc-bab button.hc-bab-pencil, #hc-bab img.hc-bab-held { width: 26px; }\n    #hc-bab button.hc-bab-pencil { right: 4px; }\n    #hc-bab .hc-bab-hint { right: 40px; font-size: 15px; }\n    #hc-bab .hc-bab-gone { inset: 0 40px 0 0; padding: 0 6%; }\n    #hc-bab a.hc-bab-back { margin-bottom: 10px; font-size: 17px; }\n    #hc-bab h1 { font-size: 34px; margin-bottom: 8px; }\n    #hc-bab .hc-bab-lede { font-size: 18px; margin-bottom: 0; }\n    #hc-bab .hc-bab-note { font-size: 15px; margin-top: 20px; }\n  }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcBirthABlob) return;
  window.__hcBirthABlob = true;
  var PAGE = /birth-a-blob/i;
  // pencil.png lives next to this script on GitHub Pages: dist/js/hc-birth-a-blob.js -> assets/portrait/
  var here = document.currentScript && document.currentScript.src;
  var PENCIL = (here ? new URL('../../assets/portrait/', here).href
                     : 'https://hallicivelek.github.io/hallicivelek-site/assets/portrait/') + 'pencil.png';
  // black ink needs a light enough blob, so the site's dark #3B3563 isn't offered
  var COLORS = [['blue', '#2BA6CF'], ['yellow', '#E2B23A'], ['green', '#7FC2A0'], ['pink', '#EE9BB4'], ['red', '#B4533C']];
  var NS = 'http://www.w3.org/2000/svg';
  var TIP = [15 / 59, 191 / 200], FINGER = [-14, -46], LINE = 1.1, MAKER_WOBBLE = 0.6;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, drift = reduce ? 0.2 : 1;
  function paused() { return window.hcBlobs && window.hcBlobs.paused ? window.hcBlobs.paused() : reduce; }
  function rand(a, b) { return a + Math.random() * (b - a); }

  /* ---------- the maker's own shape (as hc-blobs draws its blobs) ---------- */
  function shapeParams() {
    return {
      waves: [[2, 0.10], [3, 0.07], [4, 0.045], [5, 0.025]].map(function (w) {
        return { k: w[0], a: w[1] * rand(0.5, 1), ph: rand(0, 6.3), sp: rand(0.08, 0.25) * (Math.random() < 0.5 ? -1 : 1),
                 am: rand(0.1, 0.3), amPh: rand(0, 6.3) };
      }),
      pod: { ang: rand(0, 6.3), drift: rand(-0.15, 0.15), sp: rand(0.12, 0.25), ph: rand(0, 6.3) }
    };
  }
  function outline(b, time, w) {
    var N = 28, pts = [], pod = b.pod, podAng = pod.ang + time * pod.drift;
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
    var N = pts.length, f = function (v) { return v.toFixed(1); }, d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (var k = 0; k < N; k++) {
      var p0 = pts[(k - 1 + N) % N], p1 = pts[k], p2 = pts[(k + 1) % N], p3 = pts[(k + 2) % N];
      d += 'C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
                 f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    return d + 'Z';
  }

  /* ---------- the page ---------- */
  var HTML =
    '<div class="hc-bab-words">' +
      '<a class="hc-bab-back" href="/playthings">← playthings</a>' +
      '<h1>Birth-a-blob</h1>' +
      '<p class="hc-bab-lede">Draw your blob-face and release it to the blobosphere. It will float around the site with the other blobs forev- … well no, for the rest of your visit.</p>' +
    '</div>' +
    '<div class="hc-bab-stage" id="hc-bab-stage">' +
      '<div class="hc-bab-shadow"></div>' +
      '<div class="hc-bab-paper" id="hc-bab-paper" tabindex="-1" role="application" aria-roledescription="drawing"' +
        ' aria-label="The blob. Arrow keys draw, Space lifts or lowers the pencil, Esc puts the pencil down.">' +
        '<svg id="hc-bab-maker" viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">' +
          '<defs><radialGradient id="hc-bab-g" cx="0" cy="0" r="60" gradientUnits="userSpaceOnUse">' +
            '<stop offset="0" stop-opacity="1"/><stop offset=".45" stop-opacity=".75"/><stop offset="1" stop-opacity="0"/>' +
          '</radialGradient><clipPath id="hc-bab-clip"><path id="hc-bab-clip-path"/></clipPath></defs>' +
          '<path id="hc-bab-body" fill="url(#hc-bab-g)"/>' +
          '<g id="hc-bab-ink" clip-path="url(#hc-bab-clip)" fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="' + LINE + '"></g>' +
        '</svg>' +
      '</div>' +
      '<button type="button" class="hc-bab-pencil" id="hc-bab-pencil" aria-pressed="false" aria-label="Pencil" aria-describedby="hc-bab-hint">' +
        '<img src="' + PENCIL + '" alt=""></button>' +
      '<img class="hc-bab-held" id="hc-bab-held" src="' + PENCIL + '" alt="">' +
      '<p class="hc-bab-hint" id="hc-bab-hint" hidden>Arrow keys draw. Space lifts the pencil. Esc puts it down.</p>' +
      '<div class="hc-bab-gone" id="hc-bab-gone" hidden>' +
        '<p id="hc-bab-gone-text">And there it goes. It’s out with the others now. Godspeed.</p>' +
        '<button type="button" class="hc-bab-btn" id="hc-bab-again">Draw another blob-face</button>' +
      '</div>' +
    '</div>' +
    '<div class="hc-bab-words" id="hc-bab-controls">' +
      '<fieldset class="hc-bab-colours" id="hc-bab-colours"><legend class="hc-bab-sr">Blob-colour</legend></fieldset>' +
      '<div class="hc-bab-buttons">' +
        '<button type="button" class="hc-bab-btn" id="hc-bab-clear">Start over</button>' +
        '<button type="button" class="hc-bab-btn hc-bab-go" id="hc-bab-go">Set it free</button>' +
      '</div>' +
      '<p class="hc-bab-note">Nothing is forever and nothing is saved nor uploaded. When you close the tab, your lil’ blob is gone.</p>' +
    '</div>' +
    '<p class="hc-bab-sr" id="hc-bab-say" aria-live="polite"></p>';

  // the maker in the page now (rebuilt when Cargo brings the page back); global listeners check it is still there
  var root = null, stage, paper, svg, bodyPath, clipPath, inkG, pencilBtn, held, hint, say;
  var maker, color, strokes = [], stroke = null, holding = false, kb = null, running = false, t = 0, last = 0;
  function $(id) { return document.getElementById(id); }
  function live() { return !!root && root.isConnected; }

  function setColor(c) {
    color = c;
    [].forEach.call(svg.querySelectorAll('stop'), function (s) { s.setAttribute('stop-color', c); });
  }
  function colourInputs() { return root.querySelectorAll('.hc-bab-colours input'); }

  // screen <-> blob units (the -60..60 box)
  function toUnits(x, y) {
    var p = svg.createSVGPoint(); p.x = x; p.y = y;
    p = p.matrixTransform(svg.getScreenCTM().inverse());
    return [Math.round(p.x * 10) / 10, Math.round(p.y * 10) / 10];
  }
  function toScreen(u) {
    var p = svg.createSVGPoint(); p.x = u[0]; p.y = u[1];
    p = p.matrixTransform(svg.getScreenCTM());
    return [p.x, p.y];
  }
  function strokeD(s) {
    var f = function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); };
    if (s.length === 1) return 'M' + f(s[0]) + 'l0.01 0';
    var d = 'M' + f(s[0]);
    for (var i = 1; i < s.length - 1; i++) d += 'Q' + f(s[i]) + ' ' + f([(s[i][0] + s[i + 1][0]) / 2, (s[i][1] + s[i + 1][1]) / 2]);
    return d + 'L' + f(s[s.length - 1]);
  }
  function redraw(s) { s.el.setAttribute('d', strokeD(s.pts)); }
  function startStroke(u) {
    stroke = { pts: [u], el: document.createElementNS(NS, 'path') };
    inkG.appendChild(stroke.el); strokes.push(stroke); redraw(stroke);
  }
  function extend(u) {
    var p = stroke.pts[stroke.pts.length - 1];
    if (Math.hypot(u[0] - p[0], u[1] - p[1]) < 0.4) return;
    stroke.pts.push(u); redraw(stroke);
  }

  // the held pencil: its tip sits on the drawing point (placed inside the stage, as hc-eyes does on iPhone)
  function follow(x, y) {
    var w = held.offsetWidth || 34, h = held.offsetHeight || w * 200 / 59, r = stage.getBoundingClientRect();
    held.style.transformOrigin = (TIP[0] * w) + 'px ' + (TIP[1] * h) + 'px';
    held.style.left = (x - r.left - TIP[0] * w) + 'px';
    held.style.top = (y - r.top - TIP[1] * h) + 'px';
  }
  function tipOf(e) { var o = e.pointerType === 'touch' ? FINGER : [0, 0]; return [e.clientX + o[0], e.clientY + o[1]]; }
  function pickUp(x, y) {
    holding = true; stage.classList.add('hc-bab-holding'); pencilBtn.setAttribute('aria-pressed', 'true'); follow(x, y);
  }
  function putDown() {
    holding = false; stroke = null; kb = null; stage.classList.remove('hc-bab-holding');
    pencilBtn.setAttribute('aria-pressed', 'false'); hint.hidden = true;
  }
  function tell(s) { var to = say; to.textContent = ''; setTimeout(function () { to.textContent = s; }, 50); }

  /* ---------- letting it go ---------- */
  // a spot away from the other blobs, and not under the words or the empty stage, so it can be seen
  function freeSpot(d) {
    var W = innerWidth, H = innerHeight, m = d * 0.6, best = null, bestScore = -Infinity;
    var spots = window.hcBlobs && window.hcBlobs.spots ? window.hcBlobs.spots() : [];
    var avoid = [stage].concat([].slice.call(root.querySelectorAll('.hc-bab-words'))).map(function (e) { return e.getBoundingClientRect(); });
    for (var i = 0; i < 60; i++) {
      var x = rand(m, W - m), y = rand(m + 60, H - m - 60), score = 1000;
      spots.forEach(function (o) { score = Math.min(score, Math.hypot(o[0] - x, o[1] - y) - o[2] / 2); });
      if (avoid.some(function (r) { return x > r.left - m && x < r.right + m && y > r.top - m && y < r.bottom + m; })) score -= 400;
      if (score > bestScore) { bestScore = score; best = [x, y]; }
    }
    return best;
  }
  function letGo() {
    putDown();
    var r = svg.getBoundingClientRect(), d = innerWidth < 700 ? 110 : 140;
    if (window.hcBlobs && window.hcBlobs.adopt) {
      window.hcBlobs.adopt({ color: color, d: d, waves: maker.waves, pod: maker.pod, wob: MAKER_WOBBLE, ink: inkG.innerHTML,
        at: [r.left + r.width / 2, r.top + r.height / 2, r.width / (d * 4 / 3)], goTo: freeSpot(d) });
    }
    stage.classList.add('hc-bab-empty'); root.classList.add('hc-bab-released');
    $('hc-bab-go').disabled = $('hc-bab-clear').disabled = true;
    [].forEach.call(colourInputs(), function (i) { i.disabled = true; });
    var gone = $('hc-bab-gone-text');
    gone.textContent = strokes.length ? 'There it goes. It’s out with the others now.' : 'There it goes, with no face at all. It’s out with the others now.';
    $('hc-bab-gone').hidden = false;
    tell(gone.textContent);
    $('hc-bab-again').focus();
  }
  function again() {
    strokes = []; stroke = null; inkG.innerHTML = ''; maker = shapeParams();
    var i = (COLORS.findIndex(function (c) { return c[1] === color; }) + 1) % COLORS.length, inputs = colourInputs();
    [].forEach.call(inputs, function (x) { x.disabled = false; });
    inputs[i].checked = true; setColor(COLORS[i][1]);
    $('hc-bab-go').disabled = $('hc-bab-clear').disabled = false;
    stage.classList.remove('hc-bab-empty'); root.classList.remove('hc-bab-released'); $('hc-bab-gone').hidden = true;
    pencilBtn.focus();
    tell('A new blank blob is ready.');
  }

  /* ---------- building ---------- */
  function build(box) {
    // Cargo's own content (loose text included) moves into one hidden box: kept as the fallback
    var keep = document.createElement('div'); keep.setAttribute('data-hc-bab-fallback', ''); keep.style.display = 'none';
    while (box.firstChild) keep.appendChild(box.firstChild);
    box.appendChild(keep);
    root = document.createElement('div'); root.id = 'hc-bab'; root.innerHTML = HTML;
    box.appendChild(root);

    stage = $('hc-bab-stage'); paper = $('hc-bab-paper'); svg = $('hc-bab-maker'); bodyPath = $('hc-bab-body');
    clipPath = $('hc-bab-clip-path'); inkG = $('hc-bab-ink'); pencilBtn = $('hc-bab-pencil'); held = $('hc-bab-held');
    hint = $('hc-bab-hint'); say = $('hc-bab-say');
    maker = shapeParams(); strokes = []; stroke = null; holding = false; kb = null;

    COLORS.forEach(function (c, i) {
      var lab = document.createElement('label');
      lab.innerHTML = '<input type="radio" name="hc-bab-colour" value="' + c[1] + '"' + (i ? '' : ' checked') + '>' +
        '<span class="hc-bab-dot" style="background:' + c[1] + '"></span><span class="hc-bab-sr">' + c[0] + '</span>';
      lab.firstChild.addEventListener('change', function () { setColor(c[1]); });
      $('hc-bab-colours').appendChild(lab);
    });
    setColor(COLORS[0][1]);

    pencilBtn.addEventListener('click', function (e) {
      if (e.detail === 0) {                         // from the keyboard: draw with the arrow keys
        kb = { at: [0, -8], down: true };
        var p = toScreen(kb.at); pickUp(p[0], p[1]); hint.hidden = false; paper.focus();
        tell('You’re holding the pencil. Arrow keys draw, Space lifts the pencil, Esc puts it down.');
      } else { var q = tipOf(e); pickUp(q[0], q[1]); }
      e.stopPropagation();
    });
    paper.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      e.preventDefault(); e.stopPropagation();       // not a click on a background blob behind it
      var q = tipOf(e);
      if (!holding) pickUp(q[0], q[1]);             // touching the blob picks the pencil up too
      kb = null; hint.hidden = true;
      try { paper.setPointerCapture(e.pointerId); } catch (err) {}
      follow(q[0], q[1]); startStroke(toUnits(q[0], q[1]));
    });
    paper.addEventListener('pointermove', function (e) {
      if (!holding || !stroke) return;
      var q = tipOf(e); follow(q[0], q[1]); extend(toUnits(q[0], q[1]));
    });
    function endStroke() { if (!kb) stroke = null; }
    paper.addEventListener('pointerup', endStroke);
    paper.addEventListener('pointercancel', endStroke);
    paper.addEventListener('keydown', function (e) {
      if (!kb) return;
      var step = e.shiftKey ? 6 : 2, d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      if (d) {
        e.preventDefault();
        var nx = Math.max(-52, Math.min(52, kb.at[0] + d[0] * step)), ny = Math.max(-52, Math.min(52, kb.at[1] + d[1] * step));
        if (kb.down) { if (!stroke) startStroke(kb.at.slice()); kb.at = [nx, ny]; stroke.pts.push(kb.at.slice()); redraw(stroke); }
        else kb.at = [nx, ny];
        var p = toScreen(kb.at); follow(p[0], p[1]);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); kb.down = !kb.down; stroke = null;
        tell(kb.down ? 'The pencil is on the blob.' : 'The pencil is lifted.');
      }
    });
    $('hc-bab-clear').addEventListener('click', function () {
      strokes = []; stroke = null; inkG.innerHTML = '';
      if (kb) kb.at = [0, -8];
      tell('The blob is blank again.');
    });
    $('hc-bab-go').addEventListener('click', letGo);
    $('hc-bab-again').addEventListener('click', again);

    if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
  }

  // the maker's blob keeps shifting gently, like the others (still while the blobs are paused)
  function frame(now) {
    if (!live()) { running = false; return; }
    var dt = Math.min((now - last) / 1000, 0.05); last = now;
    t += paused() ? 0 : dt * drift;
    var p = pathFrom(outline(maker, t, MAKER_WOBBLE));
    bodyPath.setAttribute('d', p); clipPath.setAttribute('d', p);
    requestAnimationFrame(frame);
  }

  /* ---------- page-wide listeners (only while the maker is in the page) ---------- */
  addEventListener('pointermove', function (e) {
    if (live() && holding && !kb) { var q = tipOf(e); follow(q[0], q[1]); }
  }, { passive: true });
  addEventListener('pointerdown', function (e) {
    if (live() && holding && !paper.contains(e.target) && !pencilBtn.contains(e.target)) putDown();
  }, true);
  // Esc: Cargo leaves the page on Esc. While the pencil is held or a face is drawn, Cargo doesn't get it.
  addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !live() || !(holding || (strokes.length && !stage.classList.contains('hc-bab-empty')))) return;
    e.stopImmediatePropagation(); e.preventDefault();
    if (holding) { putDown(); pencilBtn.focus(); }
  }, true);

  function check() {
    var here = PAGE.test(location.pathname);
    document.documentElement.classList.toggle('hc-bab-on', here);   // Cargo changes pages without reloading
    if (!here) return;
    var box = document.querySelector('.project_content');
    if (box && !box.querySelector('#hc-bab')) build(box);
  }
  var pending = null;
  new MutationObserver(function () { clearTimeout(pending); pending = setTimeout(check, 120); })
    .observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('popstate', check);
  check();
  window.__hcBirthABlob = { strokes: function () { return strokes.length; } };
})();
window.__hcBuild = "2026-11-15 21:21";
