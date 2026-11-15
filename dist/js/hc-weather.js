/* hc-weather for hallicivelek.com: built from dist/hc-weather.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  #hc-pj canvas.hc-weather { position: static !important; top: auto !important; left: auto !important; transform: none !important;\n    display: block !important; width: 100% !important; max-width: 640px !important; height: 56px !important; margin: -48px 0 80px !important;\n    padding: 0 !important; border: 0 !important; pointer-events: none !important; user-select: none; }\n  #hc-pj canvas.hc-weather.hc-w-h1 { margin: 10px 0 72px !important; }\n  #hc-pj canvas.hc-weather.hc-px { image-rendering: pixelated; image-rendering: crisp-edges; }\n  @media (max-width: 600px) {\n    #hc-pj canvas.hc-weather { height: 46px !important; margin: -30px 0 52px !important; }\n    #hc-pj canvas.hc-weather.hc-w-h1 { margin: 8px 0 48px !important; }\n  }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcWeatherOn) return;
  window.__hcWeatherOn = true;

  /* ---------- the shared colour table: hcProjectColours.get('Magse-Maximum-Weights-vol-1') ---------- */
  if (!window.hcProjectColours) {
    var TABLE = {"troskahjalp-the-art-calendar":[2022,0.4,"d0ad70","b0704e","d3ac53","fefefe"],"retro-stefson-retro-stefson":[2012,0.76,"7753a6","074d51","0cb0b1","fefefe"],"cheerios":[0,1.62,"fcef03","f7ec93","fcef03","fcef03"],"fm-belfast-how-to-make-friends":[2008,0.88,"6a72ab","d6e9b1","f52a19","fbe6b8"],"the-mouse-wrestler":[0,0.26,"487391","1b272c","5d99c4","fcfcfc"],"retro-stefson-kimbabwe":[2010,0.87,"4b97b4","0e7190","0e7190","fafafa"],"sesar-a-gerdutadsjalfur-doityourself":[0,0.06,"cfcfcf","8e8e8e","fefefe","fefefe"],"rimnamin":[2002,0.68,"cee8f7","90cce9","fbcb04","fdeeb4"],"apparat-organ-quartet-romantika":[2004,0.7,"d7c8b3","e9cd11","e9cd11","fcf4e3"],"millilending":[2019,0.29,"ccccd8","6b706c","4fb3e7","fdfdfd"],"herbergi-i-odrum-heimi":[0,0.16,"b7655a","d4d3d1","b45b4f","fcfcfc"],"blue-walker":[0,0.27,"1ec6e5","d0f1f7","1ec6e5","feffff"],"retro-stefson-visual-identity":[2005,0.0,"000000","000000","000000","000000"],"sesar-a-stormurinn-a-eftir-logninu":[2001,0.96,"d44815","b0948c","e74816","fbfafa"],"fastland-soccer-uniform":[2004,0.78,"fdf002","01adef","fdf002","fefefe"],"smite-the-world":[2018,0.09,"d1d1d1","909090","fcfcfc","fcfcfc"],"liggikrutt":[0,0.07,"acb6c7","d6dbe3","687a98","fefefe"],"fluffyhead":[0,0.73,"90d8f7","27aae0","27aae0","fafcfe"],"retro-stefson-montana":[2008,0.58,"6eadcf","5077b8","5077b8","f0f6f9"],"halli-lettering":[0,1.84,"f5cb45","ebd08c","2cb7eb","f6f6f0"],"pungstoppuslayer":[0,0.04,"ccd0d5","9ba5b3","8e98a8","fdfdfd"],"retro-stefson-qween":[0,0.15,"2e2b2a","524e4c","e8e2df","fdfdfd"],"uppskriftabok-skaldverk":[0,0.14,"d3cecb","231b15","6d645d","f7f4f2"],"fran-lebowitz":[0,1.9,"dda31d","124464","1fa2ed","fdfdfd"],"blomakona":[0,0.46,"f6b4f5","b2b0e8","5294e5","f8caf7"],"magse-maximum-weights-vol-1":[1999,1.13,"018990","2a0706","016cb2","f8f7f8"],"adventure-girl":[0,0.34,"ced2d0","f1b731","1da1f8","fefefe"],"joker-classique":[0,0.98,"f5da71","2aab2c","e9b651","f5da71"],"cat-family":[0,0.12,"d1d2d2","94aac9","2d56ad","f2f2ee"],"hairtower":[0,0.29,"4f96e5","b0cee7","4f96e5","fefefe"],"sitjikall":[0,0.04,"c9cfd9","8c9ab0","7888a3","fefefe"],"bluefluffy":[0,1.36,"2aafe8","1a526e","2aafe8","f8f9f9"],"skokkikona":[0,0.17,"c5d76c","ced3d4","c5d76c","fdfdfd"],"krjupandi-blomakona":[0,0.16,"eecbd8","96afc6","4c7caa","fdfdfd"],"tyrole-and-the-crew":[0,0.68,"34ace3","16526f","f4b538","fafbfb"],"boyband":[0,0.13,"d6e6f2","8bb7db","12abea","feffff"],"main-girl-1":[0,0.6,"46a6ca","58aa1a","76c121","ffffff"],"adopt-this-cat":[0,0.34,"ebcfaf","ecb270","f68b39","fffefe"],"blue-sinker":[0,0.45,"b3e8f2","1ec7e6","1ec7e6","f6f9fa"],"icelandsmites":[2016,0.11,"d1d1d1","919191","fdfdfd","fdfdfd"],"nothing-ekkert":[2011,0.04,"d0d0d0","979797","fcfcfc","fcfcfc"],"grapewaves":[2016,0.12,"d1d1d1","2d2d2d","fcfcfc","fcfcfc"],"the-future-selfie":[0,0.08,"d2d2d2","929292","fbfbfb","fbfbfb"],"pumpkinator":[2008,0.94,"fd8d02","fee9d3","fd7301","fffefd"],"beardgrumphead":[0,0.29,"fad6ca","f9ad93","37bdea","fefefe"],"things":[0,2.1,"2daae4","71c5ec","2daae4","cbeaf8"],"blue-lady-1":[0,0.58,"27c8e7","cff2f9","1fc7e6","feffff"],"selfie-1":[0,0.52,"e8d4a6","70ad9a","380670","e8d4a6"],"fartrunner":[0,0.27,"2e4f78","f0cbd7","da7796","fdfcfd"],"presidential-election":[0,0.05,"d0d0d0","929292","fbfbfb","fbfbfb"],"pedro-pilatus-album-artwork":[2012,1.38,"47abc7","fcdc14","fcdc14","fdfdfd"],"beardmen":[0,1.02,"89c53f","d3dd25","d3dd25","fffffe"],"toasterman-on-the-move":[0,0.04,"e1c9dd","c897c5","c897c5","fdfcfd"],"swimbert-1":[0,0.39,"49a4bc","32758e","4fabc2","fefefe"],"strollin-into-the-club-like":[0,0.11,"cdd8f6","6c8ee7","5e84e5","fefeff"],"charles-1":[0,0.56,"d0dea7","35668f","a46e30","93d2ef"],"greek":[0,0.38,"0976a9","6db4d0","0976a9","fffeff"],"halli-with-a-helmet-on":[0,0.27,"6099ab","89dafe","89dafe","9ce0fe"],"some-finger-drawings":[0,1.6,"d1342d","e5908b","d1342d","fefcfc"],"healthy-problems-1":[0,0.75,"28609f","91acc9","275fa0","fefefe"],"firehair-1":[0,0.46,"f0ab9f","b08b93","f0ab9f","f9f8f9"],"apparat-organ-quartet":[2000,0.0,"121212","121212","121212","121212"],"i-louvre-u":[0,1.02,"853101","94496c","853101","fefefe"],"man-with-horns-aka-horny-hombre":[0,0.75,"abd9fe","3c669c","3c83b5","abd9fe"],"the-lyrebird":[2005,1.8,"8bb300","f89cf0","a3d505","f89cf0"],"purrrtay":[0,0.58,"f39835","b3694c","f39835","fffefe"],"sharkknife":[0,1.53,"50dcff","2b798d","50dcff","ffffff"],"automysophobia":[2012,0.52,"5bc4f2","566789","5bc4f2","fdfefe"],"phuture-joga":[0,0.26,"ecb4f8","6e74b3","315091","feffff"],"designmarch":[2013,0.14,"cfe9f6","92d0ee","7ac5eb","fdfdfe"],"kronan":[2003,2.44,"ffe300","f09798","ffe300","ffe300"],"unicef-christmas-card":[0,1.51,"096a91","4f92b5","e8cf05","ece7e6"],"i-barnastardum":[0,0.4,"8a268f","3b8fa9","d7c503","eaeaea"],"breakbeat":[2006,0.39,"94b085","9dd0e3","ad2f27","fefefe"],"snake-shelf":[0,0.53,"05a330","89ced9","05a330","fdfefd"],"santa-ogre":[0,1.14,"2db0e2","cfebf6","1ba9df","eff7fb"],"6-train-head":[0,1.9,"8f542e","34bb01","00a2ca","f88181"],"ornament-boy":[0,1.73,"c49051","66d6e6","ff9a01","ff9a01"],"rejected-tortilla-lord":[0,1.4,"f3e879","91cc01","91cc01","f3e879"],"the-flash-game":[2006,0.62,"99ccf1","6e8913","41cc03","99ccf1"],"morkinskinka":[2011,1.81,"019dd3","026c90","04a1d8","f2f8f8"],"idea-for-a-fireworks-company-fuse":[0,0.04,"d1d1d1","919091","c0bebf","fefefe"],"italo-disco-opal":[0,0.95,"48afe2","b19587","eb3d1f","f9fafa"],"a-mix-of-oddities-and-rarities":[0,1.22,"f6c53a","f87648","f6c53a","fcfcfb"],"hotplay-from-europe-minimix":[2008,0.14,"2d2d2f","264a73","2e588a","a7a6a8"],"italo-mix-2007":[2007,0.85,"6d4e2e","56b0c6","2fcfe7","2fcfe7"],"italo-rider-mix":[2007,1.66,"d68a4a","2d4f0f","cb2a13","f0ab68"],"hey":[0,0.15,"ced7c7","938e8b","442f3e","ced7c7"],"idea-shoelaces":[2012,0.07,"2e2e2e","535353","fefefe","fefefe"],"idea-remembering-measure-tape":[2009,0.07,"2e2e2e","535353","fefefe","fefefe"],"best-gif-i-ve-ever-made-2006":[2006,0.2,"d7cdb1","d6e6ee","896911","fdfefe"],"the-office-chair":[0,0.21,"95908b","2e2d2e","a28d7b","e7e7e6"],"fletcher":[0,0.2,"bce2ed","f6cfcc","7bc6d2","fefefe"],"duckrador":[0,0.23,"fbe1b1","231f20","efcd94","fcfcfc"]};   // address (lower case): [year or 0, loudness, sky, sky2, accent, light]
    window.hcProjectColours = {
      table: TABLE,
      get: function (address) {
        var r = TABLE[String(address || '').toLowerCase()];
        if (!r) return null;
        function rgb(h) { return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
        return { year: r[0] || null, loud: r[1], sky: rgb(r[2]), sky2: rgb(r[3]), accent: rgb(r[4]), light: rgb(r[5]) };
      }
    };
  }

  var report = window.__hcWeather = { slug: null, kind: null, source: null, strips: 0, reanchored: 0 };
  var mq = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduce = !!(mq && mq.matches);
  function blobsPaused() { try { return localStorage.getItem('hc-blobs-paused') === '1'; } catch (e) { return false; } }
  var paused = blobsPaused();

  /* ---------- seeded randomness: the same project always gets the same sky ---------- */
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var R = Math.random;
  function rr(a, b) { return a + (b - a) * R(); }

  /* ---------- colour ---------- */
  var PLUM = [73, 46, 70], WHITE = [255, 255, 255], PINK = [243, 220, 223];
  function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function css(c, al) { return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + (al == null ? 1 : al) + ')'; }
  function lum(c) { return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
  function lift(c, min) {   // too dark for a sky: brighten, keeping the hue (a maroon stays red); a black logo still gives a sky
    var l = lum(c); if (l >= min) return c;
    if (l > 12) { var s = min / l; c = c.map(function (v) { return Math.min(255, v * s); }); l = lum(c); }
    return l >= min ? c : mix(c, WHITE, (min - l) / (255 - l));
  }
  function quant(c) { return c.map(function (v) { return Math.min(255, Math.round(v / 32) * 32); }); }
  function pageColour() {
    try { var bg = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g); if (bg && (bg.length < 4 || +bg[3] > 0)) PINK = bg.slice(0, 3).map(Number); } catch (e) {}
  }

  /* ---------- the strip ---------- */
  var cv = document.createElement('canvas');
  cv.className = 'hc-weather';
  cv.setAttribute('aria-hidden', 'true');
  cv.setAttribute('role', 'presentation');
  var ctx = cv.getContext('2d');
  var SPEED = { calm: 3.5, storm: 13, pixel: 4 };   // px per second
  var W = 0, H = 0, DPR = 1, PX = 1, kind = null, pal, clouds, drops, wobble, sun, bolt, nextBolt, flash, t = 0, last = 0;

  function setup(slug) {
    R = rng(hash(slug.toLowerCase()));
    pageColour();
    var info = window.hcProjectColours.get(slug);
    var p = info ? { A: lift(info.sky, 70), B: lift(info.sky2, 70), accent: lift(info.accent, 110), light: lift(info.light, 150) }
                 : { A: [150, 190, 210], B: [240, 220, 210], accent: [255, 200, 120], light: [255, 255, 255] };
    kind = info && info.year && info.year < 2005 ? 'pixel' : info && info.loud > 1 ? 'storm' : 'calm';
    if (kind === 'calm') pal = {
      top: mix(p.A, WHITE, 0.42), bottom: mix(mix(p.B, WHITE, 0.6), PINK, 0.2), cloud: mix(p.light, WHITE, 0.75),
      shade: mix(p.A, PLUM, 0.12), sun: mix(p.accent, WHITE, 0.2)
    };
    else if (kind === 'storm') pal = {   // lighter than the mockup: still a storm, but it doesn't shout next to the opening line
      top: mix(mix(p.A, PLUM, 0.25), WHITE, 0.3), bottom: mix(mix(p.B, WHITE, 0.55), PINK, 0.15),
      cloud: mix(mix(p.A, PLUM, 0.42), WHITE, 0.22), shade: mix(p.A, PLUM, 0.6),
      rain: mix(p.A, PLUM, 0.55), bolt: mix(p.accent, WHITE, 0.7)
    };
    else pal = {   // a few flat colours, like an old GIF
      top: quant(mix(p.A, WHITE, 0.35)), bottom: quant(mix(p.B, WHITE, 0.45)), cloud: quant(mix(p.light, WHITE, 0.75)),
      shade: quant(mix(mix(p.light, WHITE, 0.5), p.A, 0.35)), sun: quant(mix(p.accent, WHITE, 0.2))
    };
    clouds = []; drops = []; wobble = []; sun = null; bolt = null; flash = 0;
    var nC = kind === 'storm' ? 8 : kind === 'pixel' ? 4 : Math.round(rr(3, 5)), i, j;
    for (i = 0; i < nC; i++) {
      var c = { x: (i + rr(0.1, 0.8)) / nC, y: kind === 'pixel' ? rr(0.5, 0.62) : kind === 'storm' ? rr(0.36, 0.5) : rr(0.42, 0.68),
        s: kind === 'storm' ? rr(1.0, 1.4) : rr(0.95, 1.4), z: R(), ox: 0, oy: 0, puffs: [] };
      var np = kind === 'pixel' ? 3 : Math.round(rr(5, 8));
      for (j = 0; j < np; j++) c.puffs.push({ dx: (j - (np - 1) / 2) * rr(9, 13) + rr(-3, 3), dy: -Math.sin(j / (np - 1 || 1) * Math.PI) * rr(4, 9) + rr(-1, 1), r: rr(7, 12) * (1 - Math.abs(j - (np - 1) / 2) / np * 0.6) });
      clouds.push(c);
    }
    clouds.sort(function (a, b) { return a.z - b.z; });
    if (kind === 'storm') for (i = 0; i < 60; i++) drops.push({ x: R(), y: R(), v: rr(0.8, 1.2), l: rr(5, 9) });
    if (kind !== 'storm') sun = { x: rr(0.12, 0.88), y: kind === 'pixel' ? 0.3 : rr(0.3, 0.45), r: kind === 'pixel' ? 4 : rr(7, 10) };
    for (i = 0; i < 64; i++) wobble.push(rr(-1, 1));
    nextBolt = rr(3, 7); t = rr(0, 400); last = 0;
    cv.classList.toggle('hc-px', kind === 'pixel');
    W = H = 0;
    report.slug = slug; report.kind = kind; report.source = info ? 'table' : 'default';
    report.year = info ? info.year : null; report.loud = info ? info.loud : null;
    report.sig = hash(JSON.stringify([kind, pal, clouds, sun, drops, t])).toString(36);
  }

  function fit() {   // measured every frame (Cargo adds the phone viewport late; see CLAUDE.md)
    var w = cv.clientWidth, h = cv.clientHeight, d = window.devicePixelRatio || 1;
    if (w === W && h === H && d === DPR) return;
    W = w; H = h; DPR = d; PX = kind === 'pixel' ? 4 : 1;
    if (kind === 'pixel') { cv.width = Math.max(1, Math.round(W / PX)); cv.height = Math.max(1, Math.round(H / PX)); }
    else { cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); }
  }

  function outline() {   // a long, hand-wobbled pill, a bit like the blobs themselves
    var r = H / 2, n = 28, i, path = new Path2D();
    function wob(i) { return wobble[i % wobble.length] * 1.6; }
    path.moveTo(r, wob(0) + 1.5);
    for (i = 1; i <= n; i++) path.lineTo(r + (W - 2 * r) * i / n, 1.5 + wob(i));
    for (i = 0; i <= 10; i++) { var a = -Math.PI / 2 + Math.PI * i / 10; path.lineTo(W - r + Math.cos(a) * (r - 1.5 + wob(i + 30)), r + Math.sin(a) * (r - 1.5)); }
    for (i = n; i >= 0; i--) path.lineTo(r + (W - 2 * r) * i / n, H - 1.5 + wob(i + 40));
    for (i = 0; i <= 10; i++) { var b = Math.PI / 2 + Math.PI * i / 10; path.lineTo(r + Math.cos(b) * (r - 1.5 + wob(i + 52)), r + Math.sin(b) * (r - 1.5)); }
    path.closePath();
    return path;
  }

  function blobsInStrip() {   // background blobs drifting through, in strip coordinates
    var out = [], box = cv.getBoundingClientRect(), bs = document.querySelectorAll('.hc-blobs .hc-blob');
    for (var i = 0; i < bs.length; i++) {
      var b = bs[i].getBoundingClientRect(), r = Math.min(b.width, b.height) * 0.36, cx = b.left + b.width / 2 - box.left, cy = b.top + b.height / 2 - box.top;
      if (cx > -r && cx < W + r && cy > -r && cy < H + r) out.push({ x: cx, y: cy, r: r });
    }
    return out;
  }

  function draw(dt) {
    fit();
    if (!W || !H) return;
    var blobs = reduce || paused ? [] : blobsInStrip();
    if (kind === 'pixel') return drawPixel(blobs);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.clip(outline());
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, css(pal.top)); g.addColorStop(1, css(pal.bottom));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    if (flash > 0) { ctx.fillStyle = css(WHITE, flash * 0.25); ctx.fillRect(0, 0, W, H); }
    if (sun) {   // a soft sun, low and half behind the clouds
      var sg = ctx.createRadialGradient(sun.x * W, sun.y * H, 0, sun.x * W, sun.y * H, sun.r * 2.6);
      sg.addColorStop(0, css(pal.sun, 0.95)); sg.addColorStop(0.38, css(pal.sun, 0.9)); sg.addColorStop(0.42, css(pal.sun, 0.25)); sg.addColorStop(1, css(pal.sun, 0));
      ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
    }
    var span = W + 140, sp = SPEED[kind];
    clouds.forEach(function (c) {
      var x = ((c.x * span + t * sp * (0.6 + c.z * 0.6)) % span) - 70, y = c.y * H * (H < 60 ? 0.9 : 1);
      react(c, x, y, blobs, dt);
      x += c.ox; y += c.oy;
      var sc = c.s * (H / 64);
      ctx.fillStyle = css(pal.shade, kind === 'storm' ? 0.45 : 0.18);   // shade underneath, then the body of puffs
      ctx.save(); ctx.beginPath(); ctx.rect(x - 80 * sc, y - 60 * sc, 160 * sc, 66.5 * sc); ctx.clip();
      ctx.beginPath(); c.puffs.forEach(function (p) { ctx.moveTo(x + p.dx * sc + p.r * sc, y + p.dy * sc + 2.5 * sc); ctx.arc(x + p.dx * sc, y + p.dy * sc + 2.5 * sc, p.r * sc, 0, 7); }); ctx.fill(); ctx.restore();
      ctx.fillStyle = css(pal.cloud, kind === 'storm' ? 0.95 : 0.9);
      ctx.save(); ctx.beginPath(); ctx.rect(x - 80 * sc, y - 60 * sc, 160 * sc, 64 * sc); ctx.clip();
      ctx.beginPath(); c.puffs.forEach(function (p) { ctx.moveTo(x + p.dx * sc + p.r * sc, y + p.dy * sc); ctx.arc(x + p.dx * sc, y + p.dy * sc, p.r * sc, 0, 7); }); ctx.fill(); ctx.restore();
      c.bx = x; c.by = y;
    });
    if (kind === 'storm') drawRain(dt, blobs);
    ctx.restore();
  }

  function react(c, x, y, blobs, dt) {   // clouds lean away from a blob drifting through, then settle back
    var tx = 0, ty = 0;
    blobs.forEach(function (b) {
      var dx = x - b.x, dy = y - b.y, d = Math.hypot(dx, dy) || 1, reach = b.r + 30;
      if (d < reach) { var f = (reach - d) / reach; tx += dx / d * f * 18; ty += dy / d * f * 8; }
    });
    var k = Math.min(1, dt * 2.5);
    c.ox += (tx - c.ox) * k; c.oy += (Math.max(-8, Math.min(8, ty)) - c.oy) * k;
  }

  function drawRain(dt, blobs) {
    ctx.strokeStyle = css(pal.rain, 0.5); ctx.lineWidth = 1; ctx.lineCap = 'round';
    ctx.beginPath();
    drops.forEach(function (d) {
      d.y += dt * d.v * 1.6;
      if (d.y > 1) { d.y -= 1; d.x = (d.x + 0.37) % 1; }
      var x = d.x * W - d.y * H * 0.25, y = d.y * H;
      if (y < H * 0.5) return;                                   // rain starts under the clouds
      for (var i = 0; i < blobs.length; i++) {                    // a blob is an umbrella
        var b = blobs[i]; if (Math.abs(x - b.x) < b.r && y > b.y - b.r * 0.6) return;
      }
      ctx.moveTo(x, y); ctx.lineTo(x - d.l * 0.3, y + d.l);
    });
    ctx.stroke();
    if (bolt) {
      ctx.strokeStyle = css(pal.bolt, Math.min(1, bolt.life * 6)); ctx.lineWidth = 1.5; ctx.lineJoin = 'round';
      ctx.beginPath(); bolt.pts.forEach(function (p, i) { if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }); ctx.stroke();
    }
  }

  function strike(blobs) {   // a small bolt from one cloud, towards a blob if one is in the strip
    var c = clouds[Math.floor(Math.random() * clouds.length)], x = c.bx || W / 2, y = (c.by || 10) + 6;
    var tx = blobs[0] ? blobs[0].x : x + (Math.random() - 0.5) * 40, pts = [[x, y]];
    for (var i = 1; i <= 5; i++) pts.push([x + (tx - x) * i / 5 + (Math.random() - 0.5) * 10, y + (H - y) * i / 5]);
    bolt = { pts: pts, life: 0.18 }; flash = 1;
  }

  function drawPixel(blobs) {   // the oldest projects: a low-res sky, dithered, with blocky low clouds
    var w = cv.width, h = cv.height, x, y;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], r = h / 2, top = css(pal.top), bottom = css(pal.bottom);
    for (y = 0; y < h; y++) {
      var dyc = Math.abs(y + 0.5 - r), inset = Math.round(r - Math.sqrt(Math.max(0, r * r - dyc * dyc)));   // stepped round ends
      var f = Math.max(0, Math.min(1, (y / (h - 1) - 0.3) / 0.4));
      for (x = inset; x < w - inset; x++) {
        ctx.fillStyle = f > BAYER[(y % 4) * 4 + (x % 4)] / 16 ? bottom : top; ctx.fillRect(x, y, 1, 1);
      }
    }
    if (sun) { ctx.fillStyle = css(pal.sun); var sx = Math.round(sun.x * w), sy = Math.round(sun.y * h); ctx.fillRect(sx - 1, sy - 2, 3, 5); ctx.fillRect(sx - 2, sy - 1, 5, 3); }
    var span = w + 30;
    clouds.forEach(function (c) {
      var cx = Math.floor(((c.x * span + Math.floor(t * SPEED.pixel / PX * 2) / 2 * (0.6 + c.z * 0.5)) % span) - 15), cy = Math.round(c.y * h);
      var cw = Math.round(9 * c.s) + 4;
      blobs.forEach(function (b) { if (b.x / PX > cx - 4 && b.x / PX < cx + cw + 4) cy = Math.round(c.y * h) - 1; });   // a blob below: the cloud hops
      ctx.fillStyle = css(pal.shade); ctx.fillRect(cx, cy + 2, cw, 1);
      ctx.fillStyle = css(pal.cloud);
      ctx.fillRect(cx, cy, cw, 2); ctx.fillRect(cx + 2, cy - 1, cw - 4, 1); ctx.fillRect(cx + 3, cy - 2, Math.max(3, Math.round(cw * 0.45)), 1); ctx.fillRect(cx + 4, cy - 3, Math.max(2, Math.round(cw * 0.25)), 1);
    });
  }

  /* ---------- running: only on screen, not while paused, still with reduced motion ---------- */
  var visible = true, raf = 0;
  function frame(now) {
    raf = 0;
    if (!cv.isConnected || !kind) return;
    var dt = Math.min(0.05, last ? (now - last) / 1000 : 0); last = now;
    t += dt;
    if (kind === 'storm') {
      nextBolt -= dt;
      if (bolt) { bolt.life -= dt; if (bolt.life <= 0) bolt = null; }
      flash = Math.max(0, flash - dt * 5);
      if (nextBolt <= 0) { strike(blobsInStrip()); nextBolt = 6 + Math.random() * 7; }
    }
    draw(dt);
    loop();
  }
  function loop() { if (!raf && kind && cv.isConnected && visible && !paused && !reduce && !document.hidden) raf = requestAnimationFrame(frame); }
  function still() { if (kind && cv.isConnected) { last = 0; draw(0); } }

  /* ---------- one strip per project page, put back if Cargo rebuilds the page, gone elsewhere ---------- */
  function slugHere() { try { return decodeURIComponent(location.pathname.replace(/\/+$/, '').split('/').pop() || ''); } catch (e) { return ''; } }
  function host() {
    if (!document.documentElement.classList.contains('hc-pj-on')) return null;
    var all = document.querySelectorAll('[id="hc-pj"]');
    for (var i = 0; i < all.length; i++) if (all[i].offsetParent) return all[i];
    return null;
  }
  function sync() {
    var root = host(), slug = slugHere();
    if (!root || !slug) { if (cv.parentNode) cv.parentNode.removeChild(cv); report.strips = 0; return; }
    var anchor = root.querySelector('.hc-pj-lede') || root.querySelector('h1');
    if (!anchor) return;
    if (slug !== report.slug) setup(slug);
    cv.classList.toggle('hc-w-h1', anchor.tagName === 'H1');
    if (anchor.nextSibling !== cv) {
      if (cv.parentNode && report.strips) report.reanchored++;
      anchor.parentNode.insertBefore(cv, anchor.nextSibling);
    }
    [].forEach.call(document.querySelectorAll('canvas.hc-weather'), function (c) { if (c !== cv) c.remove(); });   // never two
    report.strips = document.querySelectorAll('canvas.hc-weather').length;
    if (!raf) still();
    loop();
  }
  var queued = false;
  function soon() { if (queued) return; queued = true; setTimeout(function () { queued = false; sync(); }, 0); }
  new MutationObserver(function (ms) {
    for (var i = 0; i < ms.length; i++) if (ms[i].target !== cv && !(ms[i].addedNodes.length === 1 && ms[i].addedNodes[0] === cv)) return soon();
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  addEventListener('popstate', function () { setTimeout(sync, 60); });

  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[es.length - 1].isIntersecting; report.visible = visible; loop(); }).observe(cv);
  document.addEventListener('visibilitychange', loop);
  addEventListener('resize', function () { if (!raf) still(); });
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { reduce = mq.matches; still(); loop(); });
  // follow the blobs' pause button (hc-blobs keeps its state in localStorage)
  function follow() { paused = blobsPaused(); report.paused = paused; last = 0; still(); loop(); }
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.hc-pause')) setTimeout(follow, 0); }, true);
  addEventListener('storage', function (e) { if (e.key === 'hc-blobs-paused') follow(); });
  report.paused = paused; report.reduce = reduce;
  sync();
})();
window.__hcBuild = "2026-11-15 21:21";
