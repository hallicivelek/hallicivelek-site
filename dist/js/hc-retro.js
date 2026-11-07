/* hc-retro for hallicivelek.com: built from src/hc-retro.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  /* ---------- Netscape ---------- */\n  html.hc-ns, html.hc-ns body { background: #c0c0c0 !important; background-image: none !important; transition: none !important; }\n  html.hc-ns body, html.hc-ns body * { font-family: \"Times New Roman\", Times, serif !important; border-radius: 0 !important; text-shadow: none !important; }\n  html.hc-ns body { color: #000 !important; }\n  html.hc-ns .site_header, html.hc-ns .mobile_site_header { background: #c0c0c0 !important; border-bottom: 2px solid #808080 !important; box-shadow: 0 2px 0 #fff !important; }\n  html.hc-ns .site_header .navigation a, html.hc-ns .mobile_site_header a { color: #0000ee !important; text-decoration: underline !important; background: none !important; }\n  html.hc-ns .link_active a { color: #551a8b !important; }\n  html.hc-ns .project_content, html.hc-ns .project_content *, html.hc-ns .hc-intro, html.hc-ns .hc-sort-label { color: #000 !important; }\n  html.hc-ns .project_content a, html.hc-ns .hc-sort-again { color: #551a8b !important; }\n  html.hc-ns .thumb_image { background: #fff !important; border: 2px solid; border-color: #808080 #fff #fff #808080 !important; }\n  html.hc-ns .thumbnails .thumb_title, html.hc-ns .thumbnails .thumb_title * { color: #0000ee !important; text-decoration: underline; }\n  html.hc-ns .hc-sort-fact { color: #000 !important; opacity: 1; }\n  html.hc-ns .hc-blob { opacity: .25 !important; filter: grayscale(1) !important; }\n  html.hc-ns button.hc-pause, html.hc-ns .hc-back { background: #c0c0c0 !important; color: #000 !important; border: 2px solid !important;\n    border-color: #fff #404040 #404040 #fff !important; box-shadow: none !important; font-family: Arial, Helvetica, sans-serif !important; }\n  .hc-ns-bar { display: none; }\n  html.hc-ns .hc-ns-bar { display: flex; position: fixed; left: 0; right: 0; bottom: 0; z-index: 1002; gap: 8px; align-items: center; padding: 3px 8px;\n    background: #c0c0c0; border-top: 2px solid #fff; box-shadow: 0 -1px 0 #808080; }\n  html.hc-ns .hc-ns-bar span { font: 12px Arial, Helvetica, sans-serif !important; color: #000; padding: 1px 8px; border: 1px solid; border-color: #808080 #fff #fff #808080; white-space: nowrap; overflow: hidden; }\n  html.hc-ns .hc-ns-bar span:nth-child(2) { flex: 1; }\n  html.hc-ns body { padding-bottom: 26px; }\n\n  /* ---------- GeoCities ---------- */\n  html.hc-gc, html.hc-gc body { background-color: #000033 !important; background-size: 110px 110px !important; transition: none !important;\n    background-image: radial-gradient(1.5px 1.5px at 12px 18px, #fff 50%, transparent 51%), radial-gradient(1px 1px at 47px 61px, #ffff99 50%, transparent 51%),\n      radial-gradient(2px 2px at 80px 30px, #fff 50%, transparent 51%), radial-gradient(1px 1px at 25px 85px, #99ccff 50%, transparent 51%),\n      radial-gradient(1.5px 1.5px at 70px 95px, #fff 50%, transparent 51%) !important; }\n  html.hc-gc body, html.hc-gc body * { font-family: \"Comic Sans MS\", \"Comic Sans\", \"Chalkboard SE\", cursive !important; border-radius: 0 !important; }\n  html.hc-gc body, html.hc-gc .project_content, html.hc-gc .project_content * { color: #fff !important; }\n  html.hc-gc .project_content a { color: #00ff00 !important; }\n  html.hc-gc .site_header, html.hc-gc .mobile_site_header { background: #000066 !important; border-bottom: 4px ridge #ff00ff !important; }\n  html.hc-gc .site_header .navigation a, html.hc-gc .mobile_site_header a { color: #00ff00 !important; text-decoration: underline !important; background: none !important; }\n  html.hc-gc .site_header img { filter: hue-rotate(160deg) saturate(3); }\n  html.hc-gc .hc-intro { color: #ffff00 !important; }\n  html.hc-gc .hc-sort-label { color: #fff !important; }\n  html.hc-gc .hc-sort-again { color: #ff66ff !important; }\n  html.hc-gc .thumb_image { border: 6px ridge #ffcc00 !important; background: #fff !important; }\n  html.hc-gc .thumbnails .thumb_title, html.hc-gc .thumbnails .thumb_title * { color: #00ffff !important; text-shadow: 2px 2px 0 #000 !important; }\n  html.hc-gc .hc-sort-fact { color: #ffff66 !important; }\n  html.hc-gc .hc-blob { opacity: .5 !important; }\n  html.hc-gc button.hc-pause, html.hc-gc .hc-back { background: #ff00ff !important; color: #ffff00 !important; border: 3px outset #ff99ff !important; box-shadow: none !important; }\n  .hc-gc-top, .hc-new { display: none; }\n  html.hc-gc .hc-gc-top { display: block; text-align: center; margin: 0 0 22px; color: #fff; }\n  .hc-gc-top .hc-gc-scroll { overflow: hidden; white-space: nowrap; font-size: 20px; font-weight: bold; color: #00ff00 !important; }\n  .hc-gc-top .hc-gc-scroll span { display: inline-block; padding-left: 100%; animation: hc-gc-scroll 16s linear infinite; color: #00ff00 !important; }\n  @keyframes hc-gc-scroll { to { transform: translateX(-100%); } }\n  .hc-gc-top .hc-gc-uc { display: inline-block; margin: 12px 0; padding: 6px 14px; background: repeating-linear-gradient(45deg, #ffcc00 0 14px, #000 14px 28px); }\n  .hc-gc-top .hc-gc-uc b { background: #ffcc00; padding: 2px 8px; color: #000 !important; }\n  .hc-gc-top .hc-gc-ctr { font-family: \"Courier New\", monospace !important; background: #000; color: #ff0000 !important; border: 2px inset #888; padding: 1px 6px; letter-spacing: 3px; }\n  .hc-gc-top hr { height: 6px; border: 0; margin: 14px 0 0; background: linear-gradient(90deg, red, orange, yellow, lime, cyan, blue, magenta); }\n  @keyframes hc-blink { 50% { visibility: hidden; } }\n  html.hc-gc .hc-new { display: inline; margin-left: 6px; color: #ff0000 !important; font-weight: bold; animation: hc-blink 1s steps(1) infinite; }\n  .hc-spark { position: fixed; z-index: 2000; pointer-events: none; font: 14px Arial, sans-serif; transition: transform .8s ease-out, opacity .8s ease-out; }\n\n  /* ---------- the way out ---------- */\n  .hc-back { position: fixed; z-index: 1001; display: none; height: 44px; padding: 0 18px; border: 0; border-radius: 22px; background: #fff;\n    font-family: pacaembu, sans-serif; font-size: 16px; color: rgb(73, 46, 70); cursor: pointer; box-shadow: 0 1px 4px rgba(0, 0, 0, .15); }\n  html.hc-ns .hc-back, html.hc-gc .hc-back { display: block; }\n  .hc-back:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 3px; }\n\n  /* ---------- the bottom of the page award ---------- */\n  .hc-award { clear: both; text-align: center; padding: 80px 16px 140px; font-family: pacaembu, sans-serif; color: rgb(73, 46, 70); }\n  .hc-award-badge { width: 84px; height: 84px; margin: 0 auto 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; gap: 10px;\n    background: radial-gradient(circle at 35% 30%, #ffe27a, #e0a400 70%); box-shadow: 0 0 0 6px #f3dcdf, 0 0 0 9px #e0a400; perspective: 200px; }\n  .hc-award-star { font-size: 40px; color: #fff; display: inline-block; line-height: 1; }\n  /* on the regular site the medal is one of Halli's blobs, smiling (blob-faces-03), in gold */\n  html:not(.hc-ns):not(.hc-gc) .hc-award-badge { width: 120px; height: 120px; background: none; box-shadow: none; }\n  html:not(.hc-ns):not(.hc-gc) .hc-award-star { display: none; }\n  .hc-award-blob { display: none; width: 120px; height: 120px; overflow: visible; }\n  html:not(.hc-ns):not(.hc-gc) .hc-award-blob { display: block; animation: hc-award-bob 4s ease-in-out infinite; }\n  .hc-award-shine { animation: hc-award-shine 3.6s ease-in-out infinite; }\n  @keyframes hc-award-shine { 0% { transform: translateX(0); } 55%, 100% { transform: translateX(520px); } }\n  @keyframes hc-award-bob { 0%, 100% { transform: rotate(-3deg) translateY(0); } 50% { transform: rotate(3deg) translateY(-4px); } }\n  .hc-award-text { display: none; }\n  .hc-award-title { font-size: 30px; font-weight: bold; margin: 0 0 6px; }\n  .hc-award-sub { font-size: 17px; opacity: .8; margin: 0 0 22px; }\n  .hc-award-pick { display: flex; gap: 16px; justify-content: center; align-items: center; font-size: 20px; }\n  .hc-award-pick button { font: inherit; font-weight: bold; color: rgb(14, 118, 128); background: none; border: 0; border-bottom: 2px solid currentColor; cursor: pointer; padding: 2px 0; }\n  .hc-award-pick button:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 3px; }\n  @keyframes hc-spin { to { transform: rotateY(360deg); } }\n  html.hc-ns .hc-award-badge { width: 150px; height: 70px; border-radius: 0 !important; background: linear-gradient(#000080, #1084d0); border: 3px solid;\n    border-color: #fff #404040 #404040 #fff; box-shadow: 2px 2px 0 #000; }\n  html.hc-ns .hc-award-star { font-size: 34px; color: #ffd700 !important; text-shadow: 2px 2px 0 #806000 !important; animation: hc-spin 1.6s linear infinite; }\n  html.hc-ns .hc-award-text { display: block; text-align: left; font: bold 11px/1.15 Arial, Helvetica, sans-serif !important; color: #fff !important; letter-spacing: .5px; }\n  html.hc-ns .hc-award-pick button { color: #0000ee !important; text-decoration: underline; }\n  html.hc-gc .hc-award, html.hc-gc .hc-award * { color: #ffff00 !important; }\n  html.hc-gc .hc-award-pick button { color: #00ff00 !important; }\n  @media (prefers-reduced-motion: reduce) {\n    .hc-gc-top .hc-gc-scroll span { animation: none; padding-left: 0; }\n    html.hc-gc .hc-new, html.hc-ns .hc-award-star, .hc-award-blob, .hc-award-shine { animation: none !important; }\n  }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcRetroOn) return;
  window.__hcRetroOn = true;
  var KEY = 'hc-1999', MODES = { ns: 'hc-ns', gc: 'hc-gc' };
  var calm = matchMedia('(prefers-reduced-motion: reduce)');
  var mode = 'off';
  try { mode = sessionStorage.getItem(KEY) || 'off'; } catch (e) {}
  if (!MODES[mode]) mode = 'off';

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }

  // the visitor counter: counts up by one a day, so it looks alive
  function counter() { var n = 417 + Math.max(0, Math.floor((Date.now() - Date.UTC(2026, 10, 4)) / 864e5)); return ('000000' + n).slice(-6); }

  function set(m) {
    mode = MODES[m] ? m : 'off';
    var h = document.documentElement;
    h.classList.remove('hc-ns', 'hc-gc');
    if (mode !== 'off') h.classList.add(MODES[mode]);
    try { if (mode === 'off') sessionStorage.removeItem(KEY); else sessionStorage.setItem(KEY, mode); } catch (e) {}
    place();
  }
  window.__hcRetro = { set: set, mode: function () { return mode; } };

  // ---- the way out, next to the blobs' pause button ----
  var back = el('button', 'hc-back', '⏻ back to 2026'); back.type = 'button';
  back.addEventListener('click', function () { set('off'); });
  function placeBack() {
    var p = document.querySelector('button.hc-pause'), r = p && p.getBoundingClientRect();
    if (r && r.width) { back.style.right = (innerWidth - r.left + 10) + 'px'; back.style.bottom = Math.max(0, innerHeight - r.bottom) + 'px'; }
    else { back.style.right = '16px'; back.style.bottom = (mode === 'ns' ? 40 : 16) + 'px'; }
  }

  // ---- Netscape's status bar ----
  var bar = el('div', 'hc-ns-bar'); bar.setAttribute('aria-hidden', 'true');
  ['Document: Done', 'Best viewed in Netscape Navigator 4.0 at 800 × 600', '🔒'].forEach(function (t) { bar.appendChild(el('span', '', t)); });

  // ---- GeoCities' welcome ----
  var top = el('div', 'hc-gc-top'); top.setAttribute('aria-hidden', 'true');
  var sc = el('div', 'hc-gc-scroll'); sc.appendChild(el('span', '', "★ Welcome to Halli's HoMePaGe!!! ★ Sign my guestbook ★ Thanx 4 visiting ★"));
  var uc = el('div', 'hc-gc-uc'); uc.appendChild(el('b', '', '🚧 UNDER CONSTRUCTION 🚧'));
  var vis = el('div', '', 'You are visitor # '); var ctr = el('span', 'hc-gc-ctr', counter()); vis.appendChild(ctr);
  top.appendChild(sc); top.appendChild(uc); top.appendChild(vis); top.appendChild(el('hr'));

  // ---- the award under the grid ----
  var award = el('div', 'hc-award');
  var badge = el('div', 'hc-award-badge'); badge.setAttribute('aria-hidden', 'true');
  badge.appendChild(el('span', 'hc-award-star', '★'));
  badge.insertAdjacentHTML('beforeend', '<svg class="hc-award-blob" viewBox="20 20 260 260" aria-hidden="true">' +
    '<defs><radialGradient id="hc-award-gold" cx="35%" cy="28%" r="80%"><stop offset="0" stop-color="#fff3b0"/><stop offset=".35" stop-color="#f6cf4a"/><stop offset=".75" stop-color="#d99a00"/><stop offset="1" stop-color="#b07800"/></radialGradient>' +
    '<linearGradient id="hc-award-sheen" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
    '<clipPath id="hc-award-clip"><path d="M187.7,43.48c9.43,4.99,17.52,12.2,25.21,21.4,11.63,13.93,24.1,27.87,34.46,42.76,12.86,18.49,18.36,41.16,10.85,62.87-7.09,20.5-26.04,34.65-41.56,48.61-24.28,21.85-51.41,58.22-88.47,47.43-19.67-5.73-37.52-17.42-50.81-33-10.88-12.76-23.97-25.1-30.69-40.71C14.09,117.09,82.25,26.04,163.46,36.06c9.13,1.13,17.07,3.63,24.24,7.42Z"/></clipPath></defs>' +
    '<path fill="url(#hc-award-gold)" stroke="#c98d00" stroke-width="5" d="M187.7,43.48c9.43,4.99,17.52,12.2,25.21,21.4,11.63,13.93,24.1,27.87,34.46,42.76,12.86,18.49,18.36,41.16,10.85,62.87-7.09,20.5-26.04,34.65-41.56,48.61-24.28,21.85-51.41,58.22-88.47,47.43-19.67-5.73-37.52-17.42-50.81-33-10.88-12.76-23.97-25.1-30.69-40.71C14.09,117.09,82.25,26.04,163.46,36.06c9.13,1.13,17.07,3.63,24.24,7.42Z"/>' +
    '<g clip-path="url(#hc-award-clip)"><g transform="skewX(-22)"><rect class="hc-award-shine" x="-120" y="0" width="70" height="320" fill="url(#hc-award-sheen)"/></g></g>' +
    '<g transform="translate(150 150) scale(1.5) translate(-125.5 -110.5)" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">' +
    '<path fill="#fff" stroke-width="2.8" d="M112.49,114.16s3.12,9.4,13.06,9.4,16.75-10.33,16.75-10.33l-29.8.93Z"/>' +
    '<path fill="none" stroke-width="2.38" d="M93.48,106.78s1.66-7.03,6.44-7.58,9.2,3.49,9.2,3.49"/>' +
    '<path fill="none" stroke-width="2.38" d="M142.29,101.08s5.72-4.58,10.08-2.61,5.33,7.1,5.33,7.1"/></g></svg>');
  var bt = el('span', 'hc-award-text'); bt.innerHTML = 'AWARD<br>WINNING<br>SITE'; badge.appendChild(bt);
  award.appendChild(badge);
  award.appendChild(el('p', 'hc-award-title', 'Bottom of the page award'));
  award.appendChild(el('p', 'hc-award-sub', 'Pick your prize:'));
  var pick = el('div', 'hc-award-pick');
  [['ns', 'Netscape'], ['gc', 'GeoCities']].forEach(function (x, i) {
    if (i) pick.appendChild(el('span', '', '–'));
    var b = el('button', '', x[1]); b.type = 'button';
    b.addEventListener('click', function () { set(x[0]); scrollTo({ top: 0, behavior: calm.matches ? 'auto' : 'smooth' }); });
    pick.appendChild(b);
  });
  award.appendChild(pick);

  function place() {
    if (!back.isConnected) document.body.appendChild(back);
    if (!bar.isConnected) document.body.appendChild(bar);
    placeBack();
    var th = document.querySelector('.thumbnails[data-columnize]');
    var onGrid = th && getComputedStyle(th).display !== 'none' && !/blob-?pond|playthings/i.test(location.pathname);
    if (onGrid) { if (award.previousSibling !== th) th.parentNode.insertBefore(award, th.nextSibling); }
    else if (award.isConnected) award.remove();
    var first = document.getElementById('hc-tag') || document.getElementById('hc-intro') || document.getElementById('hc-sort');
    if (first) { if (top.nextSibling !== first) first.parentNode.insertBefore(top, first); }
    else { var pc = document.querySelector('.project_content'); if (pc && top.parentNode !== pc) pc.insertBefore(top, pc.firstChild); }
    // NEW! on the first three projects in Halli's order
    var ids = [];
    try { ids = Cargo.View.Thumbnail.collection.models.slice(0, 3).map(function (m) { return String(m.id); }); } catch (e) {}
    [].slice.call(document.querySelectorAll('.thumbnail[name]')).forEach(function (t) {
      var title = t.querySelector('.thumb_title'), has = title && title.querySelector('.hc-new'), want = ids.indexOf(t.getAttribute('name')) >= 0;
      if (want && title && !has) title.appendChild(el('span', 'hc-new', 'NEW!'));
      if (!want && has) has.remove();
    });
  }

  // ---- sparkles after the cursor ----
  var last = 0;
  addEventListener('pointermove', function (e) {
    if (mode !== 'gc' || e.pointerType !== 'mouse' || calm.matches) return;
    var now = performance.now(); if (now - last < 35) return; last = now;
    var s = el('span', 'hc-spark', ['✦', '✧', '★', '·'][Math.random() * 4 | 0]);
    s.style.color = ['#ff0', '#f0f', '#0ff', '#fff'][Math.random() * 4 | 0];
    s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
    document.body.appendChild(s);
    requestAnimationFrame(function () { s.style.transform = 'translate(' + (Math.random() * 30 - 15) + 'px,' + (20 + Math.random() * 25) + 'px)'; s.style.opacity = '0'; });
    setTimeout(function () { s.remove(); }, 850);
  }, { passive: true });

  var pending = null;
  new MutationObserver(function () { clearTimeout(pending); pending = setTimeout(place, 150); })
    .observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('resize', placeBack);
  addEventListener('popstate', function () { setTimeout(place, 150); });
  if (document.body) set(mode); else document.addEventListener('DOMContentLoaded', function () { set(mode); });
})();
window.__hcBuild = "2026-11-07 20:32";
