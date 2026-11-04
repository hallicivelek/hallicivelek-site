/* hc-playthings for hallicivelek.com: built from src/hc-playthings.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  html.hc-pt-on .thumbnails, html.hc-pt-on #hc-sort { display: none !important; }\n  #hc-pt { width: min(1080px, 92vw); position: relative; left: 50%; transform: translateX(-50%); text-align: left;\n    font-family: pacaembu, sans-serif; color: #492E46; padding-bottom: 80px; }\n  #hc-pt .hc-pt-intro { font-size: 28px; line-height: 1.35; margin: 0 0 48px; max-width: 780px; }\n  #hc-pt .hc-pt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px 48px; }\n  @media (max-width: 760px) { #hc-pt .hc-pt-grid { grid-template-columns: 1fr; gap: 40px; } #hc-pt .hc-pt-intro { font-size: 22px; margin-bottom: 32px; } }\n  #hc-pt a.hc-pt-card { display: block; color: inherit; text-decoration: none; padding: 14px; margin: -14px; border-radius: 22px;\n    background-color: transparent; transition: background-color .2s ease; }\n  #hc-pt a.hc-pt-card:hover, #hc-pt a.hc-pt-card:focus-visible { background-color: rgba(255, 255, 255, .2) !important; color: inherit !important; }\n  #hc-pt a.hc-pt-card:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 2px; }\n  #hc-pt .hc-pt-win { position: relative; aspect-ratio: 4 / 3; border-radius: 16px; overflow: hidden; }\n  #hc-pt .hc-pt-win iframe { position: absolute; left: 0; top: 0; width: 250%; height: 250%; transform: scale(.4); transform-origin: 0 0;\n    border: 0; pointer-events: none; }\n  #hc-pt .hc-pt-win iframe.hc-pt-tall { height: 1000%; animation: hc-pt-glide 40s ease-in-out infinite alternate; }\n  @keyframes hc-pt-glide { 0%, 6% { top: 0; } 94%, 100% { top: -300%; } }\n  #hc-pt .hc-pt-faces img { position: absolute; left: 12%; top: 12%; width: 76%; height: 76%; object-fit: cover; opacity: 0;\n    animation: hc-pt-face 8.4s infinite; }\n  @keyframes hc-pt-face { 0% { opacity: 0; } 1%, 8% { opacity: 1; transform: none; } 2% { transform: translateX(-6px) rotate(-2deg); }\n    3% { transform: translateX(6px) rotate(2deg); } 4% { transform: translateX(-4px); } 5% { transform: translateX(3px); } 6% { transform: none; }\n    8.3% { opacity: 1; } 8.4%, 100% { opacity: 0; } }\n  #hc-pt h2 { font-family: inherit; font-size: 26px; font-weight: bold; line-height: 1.2; margin: 20px 0 6px; color: inherit; text-transform: none; }\n  #hc-pt h2 .hc-pt-go { color: rgb(14, 118, 128); font-size: 22px; margin-left: 8px; }\n  #hc-pt .hc-pt-line { font-size: 19px; line-height: 1.45; margin: 0; color: inherit; }\n  @media (prefers-reduced-motion: reduce) {\n    #hc-pt .hc-pt-win iframe.hc-pt-tall { animation: none; }\n    #hc-pt .hc-pt-faces img { animation: none; }\n    #hc-pt .hc-pt-faces img:first-child { opacity: 1; }\n  }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcPlaythings) return;
  window.__hcPlaythings = true;
  var PAGE = /playthings/i;
  var INTRO = "Things I've built and kept running (some since 2004).";
  var FACES = ['3ffabdafe66c630', '42623ba9596b356', '7662eaad81b67246', 'cb90e1f3d0106863', 'ee05d41940906d', 'c49534a2653b6d53',
               '9384b19a7957c4e', '629bbdd38af4a7cf', '74f81e1515bb5625', 'e7ffdcebd88ec424', '4e494fd3add96bba', '9f1025e773392387'];
  var THINGS = [
    { title: 'Music Kontrapunkt Kontrol', href: 'https://kontrapunkt.hallicivelek.com/', bg: '#f3efe6', show: 'tall',
      line: 'An Italo Disco blog, and a map of who produced what. Since 2004.' },
    { title: 'Shakeskin', href: 'https://www.shakeskin.com/', bg: '#e03a9e', show: 'faces',
      line: 'A gallery of shaken faces. Since 2004.' },
    { title: 'The Calculater', href: 'https://www.thecalculater.net/', bg: '#a77bf0', show: 'still',
      line: 'Input digits and get results. Later.' },
    { title: 'The blob-pond', href: '/the-blob-pond', frame: '/the-blob-pond?hc-preview', bg: '#241B28', show: 'still',
      line: 'Blobs drift across the lines and play notes. Made for sound.' }
  ];

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }

  function card(t) {
    var outside = /^https?:/.test(t.href);
    var a = el('a', 'hc-pt-card'); a.href = t.href;
    if (outside) { a.target = '_blank'; a.rel = 'noopener'; }
    var win = el('div', 'hc-pt-win'); win.style.backgroundColor = t.bg;
    if (t.show === 'faces') {
      win.classList.add('hc-pt-faces');
      FACES.forEach(function (f, i) {
        var img = el('img'); img.src = 'https://www.shakeskin.com/photos/' + f + '.jpg'; img.alt = ''; img.loading = 'lazy';
        img.style.animationDelay = (i * 0.7).toFixed(1) + 's'; win.appendChild(img);
      });
    } else {
      var f = el('iframe', t.show === 'tall' ? 'hc-pt-tall' : '');
      f.src = t.frame || t.href; f.loading = 'lazy'; f.tabIndex = -1; f.title = t.title + ' (preview)';
      f.setAttribute('aria-hidden', 'true');
      win.appendChild(f);
    }
    var h = el('h2', '', t.title); h.appendChild(el('span', 'hc-pt-go', outside ? '↗' : '→'));
    h.lastChild.setAttribute('aria-hidden', 'true');
    a.appendChild(win); a.appendChild(h); a.appendChild(el('p', 'hc-pt-line', t.line));
    return a;
  }

  function build(box) {
    // Cargo's own content (loose text included) moves into one hidden box: kept as the fallback
    var keep = document.createElement('div'); keep.setAttribute('data-hc-pt-fallback', ''); keep.style.display = 'none';
    while (box.firstChild) keep.appendChild(box.firstChild);
    box.appendChild(keep);
    var root = el('div'); root.id = 'hc-pt';
    root.appendChild(el('p', 'hc-pt-intro', INTRO));
    var grid = el('div', 'hc-pt-grid');
    THINGS.forEach(function (t) { grid.appendChild(card(t)); });
    root.appendChild(grid);
    box.appendChild(root);
  }

  function check() {
    var here = PAGE.test(location.pathname);
    document.documentElement.classList.toggle('hc-pt-on', here);   // Cargo changes pages without reloading
    if (!here) return;
    var box = document.querySelector('.project_content');
    if (box && !box.querySelector('#hc-pt')) build(box);
  }
  var pending = null;
  new MutationObserver(function () { clearTimeout(pending); pending = setTimeout(check, 120); })
    .observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('popstate', check);
  check();
})();
window.__hcBuild = "2026-11-04 03:36";
