/* hc-weather-free for hallicivelek.com: built from dist/hc-weather-free.html by build.py, do not edit here */
(function () {
  if (window.__hcWeatherFreeOn) return;
  window.__hcWeatherFreeOn = true;
  window.__hcWeatherOn = true;   // the retired strip (hc-weather) stays away if something still loads it: one weather only

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

  var html = document.documentElement;
  var report = window.__hcWeather = { variant: 'free', slug: null, source: null, kind: null, precip: null, frames: 0, canvases: 0 };
  var mq = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduce = !!(mq && mq.matches);
  function blobsPaused() {
    if (window.hcBlobs && window.hcBlobs.paused) return window.hcBlobs.paused();
    if (html.classList.contains('hc-blobs-paused')) return true;
    try { return localStorage.getItem('hc-blobs-paused') === '1'; } catch (e) { return false; }
  }
  function still() { return reduce || blobsPaused(); }
  var paused = still();

  /* ---------- seeded randomness: the same project always gets the same sky ---------- */
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function rnd(a, b) { return a + (b - a) * Math.random(); }

  /* ---------- colour ---------- */
  var PLUM = [73, 46, 70], WHITE = [255, 255, 255], PINK = [243, 220, 223];
  function pageColour() {
    try { var bg = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g); if (bg && (bg.length < 4 || +bg[3] > 0)) PINK = bg.slice(0, 3).map(Number); } catch (e) {}
  }
  function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function css(c, al) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + (al == null ? 1 : al) + ')'; }
  function luma(c) { return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255; }
  function sat(c) { var mx = Math.max(c[0], c[1], c[2]), mn = Math.min(c[0], c[1], c[2]); return mx ? (mx - mn) / mx : 0; }
  function lin(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
  function lum(c) { return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]); }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function punch(c, k) { var g = luma(c) * 255; return c.map(function (v) { return Math.max(0, Math.min(255, g + (v - g) * k)); }); }   // more (k>1) or less colour, same lightness
  function notDark(c, floor) { var t = 0; while (luma(mix(c, PINK, t)) < floor && t < 1) t += 0.05; return mix(c, PINK, t); }   // only the very dark ones are lifted, hue kept
  function quant(c) { return c.map(function (v) { var q = Math.round(v / 32) * 32; return q > 255 ? 255 : q; }); }

  /* ---------- the canvas: fixed, full screen, right behind the blobs ---------- */
  var cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.setAttribute('role', 'presentation');
  cv.className = 'hc-weather-free';
  var st = document.createElement('style');
  st.textContent = 'canvas.hc-weather-free{position:fixed!important;left:0!important;top:0!important;width:100%;height:100%;z-index:-1;' +
    'pointer-events:none!important;user-select:none;margin:0!important;padding:0!important;border:0!important;transform:none!important}';
  document.head.appendChild(st);
  function place() {
    var blobLayer = document.querySelector('.hc-blobs');
    if (blobLayer && blobLayer.parentNode) { if (cv.nextSibling !== blobLayer) blobLayer.parentNode.insertBefore(cv, blobLayer); }
    else if (cv.parentNode !== document.body) document.body.appendChild(cv);
  }
  var ctx = cv.getContext('2d');

  var slug = null, root = null, W = 0, H = 0, DPR = 1, kind, precip, pal, clouds = [], phone = false, U = 6;
  var SPEED = { calm: [9, 16], rain: [16, 28], snow: [7, 12], pixel: [10, 16] };   // px per second, far..near

  function setup(address) {
    slug = address;
    pageColour();
    var info = window.hcProjectColours.get(address);
    var old = !!(info && info.year && info.year < 2005), snowy = false, rainy = false;
    if (info) {
      var S = info.sky, S2 = info.sky2, pale = [S, S2].some(function (c) { return luma(c) > 0.78 && sat(c) < 0.2; });
      snowy = info.loud < 0.5 && luma(info.light) > 0.93 && pale && Math.min(luma(S), luma(S2)) > 0.45 && ((S[2] + S2[2]) - (S[0] + S2[0])) / 2 / 255 >= 0.05;
      rainy = info.loud > 1;
    }
    kind = old ? 'pixel' : snowy ? 'snow' : rainy ? 'rain' : 'calm';
    precip = kind === 'rain' || kind === 'snow' ? kind : kind === 'pixel' && rainy ? 'rain' : kind === 'pixel' && snowy ? 'snow' : null;
    var p = info ? { A: info.sky, B: info.sky2, accent: info.accent, light: info.light }
                 : { A: [150, 190, 210], B: [240, 220, 210], accent: [255, 200, 120], light: [255, 255, 255] };
    var GREY = [132, 128, 140], ICE = [214, 224, 238];
    // the colours of each cloud are mixed per cloud in makeClouds from the project's sky / sky2 / accent; here only what is shared
    var GREY = [132, 128, 140], ICE = [214, 224, 238];
    pal = { A: p.A, B: p.B, acc: p.accent, drop: kind === 'pixel' ? quant(mix(p.A, [86, 98, 122], 0.65)) : mix(mix(p.A, [86, 98, 122], 0.65), PLUM, 0.1),
            flake: WHITE, rim: kind === 'pixel' ? [128, 128, 160] : mix(p.A, [110, 120, 145], 0.6), grey: GREY, ice: ICE };
    clouds = []; W = H = 0; textAge = 99; textFade = 0.6; calm();
    report.slug = address; report.source = info ? 'table' : 'default'; report.kind = kind; report.precip = precip;
    report.year = info ? info.year : null; report.loud = info ? info.loud : null;
  }

  // Clouds are designed, not random: every cloud is perfect circles on one system. Base unit RU; puff radii only from
  // {1, 0.8, 0.62, 0.5}; the puffs stand on one line (bottoms aligned), so the radii profile is the skyline, rising to a
  // tallest puff near (not at) the middle; neighbours sit a fixed ratio apart (distance = K * (r1 + r2)), so the top is a clean
  // run of arcs. A tier puff sits on a parent puff at the same ratio. The underside is a flat-ish belly (a wide band between the
  // end puffs' circles, sagging a little in the middle). Variety = template, mirror, scale, stretch of the spacing, colour, opacity.
  var RU = 11, K = 0.72, SAG = 0.16;
  var TEMPLATES = [
    { name: 'wisp',     r: [0.62, 0.5] },                                                    // tiny, 2 puffs
    { name: 'duo',      r: [1, 0.8] },                                                       // two big round puffs
    { name: 'small3',   r: [0.8, 1, 0.62] },
    { name: 'classic4', r: [0.62, 1, 0.8, 0.5] },
    { name: 'leaning4', r: [1, 0.8, 0.62, 0.5] },                                            // lopsided: heavy on one side
    { name: 'long5low', r: [0.5, 0.62, 0.8, 0.8, 0.5] },                                     // long and low
    { name: 'tall3',    r: [0.8, 1, 0.8, 0.5], tier: [{ on: 1, a: -25, r: 0.8 }, { on: 2, a: 20, r: 0.62 }] },   // towering cumulus: a big puff on one shoulder, stepping down the other side
    { name: 'tower',    r: [0.8, 1, 0.8, 0.62], tier: [{ on: 1, a: 30, r: 1 }, { on: 0, a: -20, r: 0.8 }] },       // broad cumulus rising to one side, steps on the other
    { name: 'wide6',    r: [0.5, 0.8, 1, 0.8, 0.62, 0.5], tier: [{ on: 3, a: 24, r: 0.62 }] },       // wide with a second tier
    { name: 'bank7',    r: [0.5, 0.62, 0.8, 0.62, 0.8, 0.62, 0.5] }                          // a long low bank, 7 puffs
  ];
  function genShape(ti, mirror, stretch) {   // template index, mirrored?, spacing stretch (1.0-1.18); circles stay circles
    var t = TEMPLATES[ti], circles = [], x = 0, i, sg = mirror ? -1 : 1;
    for (i = 0; i < t.r.length; i++) {
      if (i) x += K * stretch * (t.r[i - 1] + t.r[i]);
      circles.push({ dx: x, dy: -t.r[i], r: t.r[i] });
    }
    var mid = x / 2;
    (t.tier || []).forEach(function (u) {
      var par = circles[u.on], d = K * (par.r + u.r), an = u.a * Math.PI / 180;
      circles.push({ dx: par.dx + Math.sin(an) * d, dy: par.dy - Math.cos(an) * d, r: u.r });
    });
    var xl = circles[0].dx, xr = circles[t.r.length - 1].dx, rmin = 9;
    t.r.forEach(function (r) { rmin = Math.min(rmin, r); });
    circles.forEach(function (c) { c.dx = (c.dx - mid) * sg * RU; c.dy *= RU; c.r *= RU; });
    var bx0 = (sg > 0 ? xl : xr) , bx1 = (sg > 0 ? xr : xl);
    bx0 = (bx0 - mid) * sg * RU; bx1 = (bx1 - mid) * sg * RU;
    if (bx0 > bx1) { var tm = bx0; bx0 = bx1; bx1 = tm; }
    return { circles: circles, bx0: bx0, bx1: bx1, by0: -rmin * 0.9 * RU, sag: SAG * RU, sig: t.name + (mirror ? '-m' : ''), ti: ti, mirror: mirror };
  }
  function cloudColour(Rl) {   // sky / sky2 / accent mixed by a different recipe for each cloud, so one page's clouds differ a little
    var m = Rl(), w = [Rl() * 0.3, Rl() * 0.3, Rl() * 0.2], tot;   // one of the three leads, the others only tint it (mixing all gives grey)
    w[m < 0.4 ? 0 : m < 0.75 ? 1 : 2] += 0.7 + Rl() * 0.3; tot = w[0] + w[1] + w[2];
    var c = [0, 1, 2].map(function (k) { return (pal.A[k] * w[0] + pal.B[k] * w[1] + pal.acc[k] * w[2]) / tot; });
    c = punch(c, 1.3 + Rl() * 0.3);
    if (kind === 'rain') c = mix(c, pal.grey, 0.28 + Rl() * 0.2);
    else if (kind === 'snow') c = mix(c, pal.ice, 0.3 + Rl() * 0.25);
    else c = mix(c, PINK, 0.06 + Rl() * 0.2);
    c = notDark(c, 0.5);
    return kind === 'pixel' ? quant(c) : c;
  }

  function makeClouds() {   // once the real screen size is known; the same layout for the same address
    var Rl = rng(hash(slug.toLowerCase() + '/clouds'));
    function r2(a, b) { return a + (b - a) * Rl(); }
    var n = phone ? (precip ? 5 : 4) : (precip ? 7 : 6), i, j;
    var bands = []; for (i = 0; i < n; i++) bands.push(i);
    for (i = n - 1; i > 0; i--) { j = Math.floor(Rl() * (i + 1)); var t = bands[i]; bands[i] = bands[j]; bands[j] = t; }
    clouds = [];
    var pool = [];   // a template is not used twice on a page until all ten are used (so never the same template+mirror twice)
    for (i = 0; i < TEMPLATES.length; i++) pool.push(i);
    for (i = pool.length - 1; i > 0; i--) { j = Math.floor(Rl() * (i + 1)); var tq = pool[i]; pool[i] = pool[j]; pool[j] = tq; }
    for (i = 0; i < n; i++) {
      var z = r2(0, 1), c = { z: z, depth: 0.04 + z * 0.12, xf: (i + r2(0.1, 0.9)) / n, yf: (bands[i] + r2(0.15, 0.75)) / n,
        s: (phone ? 1.45 : 2.1) * (0.6 + z * 0.8) * 0.8, parts: [], acc: 0, sprite: null };
      c.speed = (SPEED[kind][0] + (SPEED[kind][1] - SPEED[kind][0]) * z) * 0.6;   // drift slowed to 60%
      c.shape = genShape(pool[i % pool.length], Rl() < 0.5 ? 1 : 0, 1 + r2(0, 0.18));
      c.col = cloudColour(Rl); c.shade = mix(c.col, PLUM, 0.3);
      c.alpha = kind === 'pixel' ? r2(0.6, 1) : kind === 'calm' ? r2(0.45, 0.95) : r2(0.55, 0.95);
      c.fall = precip === 'snow' ? r2(200, 300) * (phone ? 0.8 : 1) : r2(170, 260) * (phone ? 0.75 : 1);
      clouds.push(c);
    }
    clouds.sort(function (a, b) { return a.z - b.z; });
    // text stays readable by fading the clouds out behind words (draw()), not by washing their colour out:
    // find the weakest fade that keeps plum text at 5:1 over the strongest cloud colour (two clouds overlapping) on the page
    var fade = 0.5, worst = 99;
    for (; fade <= 0.9; fade += 0.05) {
      worst = 99;
      clouds.forEach(function (c) { var a = (1 - Math.pow(1 - c.alpha, 2)) * (1 - fade); worst = Math.min(worst, contrast(mix(PINK, c.col, a), PLUM)); });
      if (worst >= 5) break;
    }
    textFade = Math.min(0.9, fade);
    report.contrast = { worst: +worst.toFixed(2), fade: +textFade.toFixed(2) };
    report.shapes = clouds.map(function (c) { return c.shape.sig; });
    report.alphas = clouds.map(function (c) { return +c.alpha.toFixed(2); });
    report.colours = clouds.map(function (c) { return css(c.col, 1); });
  }

  function belly(sh, x) { var u = (x - sh.bx0) / (sh.bx1 - sh.bx0); u = Math.max(0, Math.min(1, u)); return sh.sag * 4 * u * (1 - u); }   // how far the underside sags below the baseline
  function cloudBox(c) {
    var sc = c.s, sh = c.shape, x0 = sh.bx0, x1 = sh.bx1, y0 = sh.by0, y1 = sh.sag / 1;
    sh.circles.forEach(function (p) { x0 = Math.min(x0, p.dx - p.r); x1 = Math.max(x1, p.dx + p.r); y0 = Math.min(y0, p.dy - p.r); });
    return { w: (x1 - x0) * sc, x0: x0 * sc, top: -y0 * sc, bottom: y1 * sc + (kind === 'pixel' ? U : 3) };
  }
  function inside(sh, x, y) {   // is a point (cloud units) inside the cloud body?
    for (var i = 0; i < sh.circles.length; i++) { var p = sh.circles[i], dx = x - p.dx, dy = y - p.dy; if (dx * dx + dy * dy < p.r * p.r) return true; }
    return x >= sh.bx0 && x <= sh.bx1 && y >= sh.by0 && y <= belly(sh, x);
  }
  function buildSprite(c) {
    var b = cloudBox(c), pad = 6, w = Math.ceil(b.w + pad * 2), h = Math.ceil(b.top + b.bottom + pad * 2);
    var s = document.createElement('canvas'); s.width = Math.ceil(w * DPR); s.height = Math.ceil(h * DPR);
    var x = s.getContext('2d'); x.setTransform(DPR, 0, 0, DPR, 0, 0);
    var ox = pad + b.w / 2, oy = pad + b.top, sc = c.s, mx = ox - (b.x0 + b.w / 2), sh = c.shape;
    if (kind === 'pixel') {   // the same circles sampled on a coarse grid, then tidied: no stray pixels, no one-pixel dents
      var u = U, gx0 = Math.floor(-mx / u) - 1, gx1 = Math.ceil((w - mx) / u) + 1, gy0 = Math.floor(-oy / u) - 1, gy1 = Math.ceil((h - oy) / u);
      var nx = gx1 - gx0 + 1, ny = gy1 - gy0 + 1, G = [], gx, gy, pass;
      for (gy = 0; gy < ny; gy++) { G.push([]); for (gx = 0; gx < nx; gx++) G[gy].push(inside(sh, (gx + gx0 + 0.5) * u / sc, (gy + gy0 + 0.5) * u / sc) ? 1 : 0); }
      function nb(g, X, Y) { return (Y > 0 && g[Y - 1][X] ? 1 : 0) + (Y < ny - 1 && g[Y + 1][X] ? 1 : 0) + (X > 0 && g[Y][X - 1] ? 1 : 0) + (X < nx - 1 && g[Y][X + 1] ? 1 : 0); }
      for (pass = 0; pass < 2; pass++) {
        var G2 = G.map(function (r) { return r.slice(); });
        for (gy = 0; gy < ny; gy++) for (gx = 0; gx < nx; gx++) { var n4 = nb(G, gx, gy); if (G[gy][gx] && n4 < 2) G2[gy][gx] = 0; else if (!G[gy][gx] && n4 >= 3) G2[gy][gx] = 1; }
        G = G2;
      }
      for (gy = 0; gy < ny; gy++) for (gx = 0; gx < nx; gx++) {
        var body = G[gy][gx], bel = !body && gy > 0 && G[gy - 1][gx] && nb(G, gx, gy) >= 1;
        if (!body && !bel) continue;
        x.fillStyle = css(body ? c.col : quant(c.shade));
        x.fillRect(Math.round(mx + (gx + gx0) * u), Math.round(oy + (gy + gy0) * u), u, u);
      }
    } else {
      x.beginPath();
      sh.circles.forEach(function (p) { x.moveTo(mx + p.dx * sc + p.r * sc, oy + p.dy * sc); x.arc(mx + p.dx * sc, oy + p.dy * sc, p.r * sc, 0, 7); });
      var X0 = mx + sh.bx0 * sc, X1 = mx + sh.bx1 * sc, Y0 = oy + sh.by0 * sc;   // the belly: flat-ish, sagging a little in the middle
      x.moveTo(X0, Y0); x.lineTo(X1, Y0); x.lineTo(X1, oy); x.quadraticCurveTo((X0 + X1) / 2, oy + 2 * sh.sag * sc, X0, oy); x.closePath();
      x.fillStyle = css(c.col); x.fill('nonzero');
      // a very soft darkening towards the bottom (no hard edge, no shadow strip)
      var yTop = oy - (b.top * 0.0) - sh.circles[0].r * sc * 0.6, yBot = oy + sh.sag * sc;
      x.globalCompositeOperation = 'source-atop';
      var g = x.createLinearGradient(0, yTop, 0, yBot); g.addColorStop(0, css(c.shade, 0)); g.addColorStop(1, css(c.shade, 0.3));
      x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.globalCompositeOperation = 'source-over';
    }
    c.sprite = s; c.sw = w; c.sh = h; c.sox = ox; c.soy = oy; c.box = b;
  }

  function fit() {   // measured every frame (Cargo adds the phone viewport late; see CLAUDE.md)
    place();
    var blobLayer = document.querySelector('.hc-blobs');
    var want = blobLayer && blobLayer.style.height ? blobLayer.style.height : '';   // iOS: reach under the address bar, as hc-blobs does
    if (cv.style.height !== want) cv.style.height = want;
    var r = cv.getBoundingClientRect(), w = Math.round(r.width), h = Math.round(r.height), d = Math.min(2, window.devicePixelRatio || 1);
    if (!w || !h || (w === W && h === H && d === DPR)) return false;
    var wasPhone = phone, first = !W || !clouds.length;
    phone = w < 700; U = phone ? 5 : 7;
    if (first || wasPhone !== phone) {
      makeClouds();
      clouds.forEach(function (c) { c.x = c.xf * (w + 200) - 100; c.y = c.yf * h; });
      report.layout = clouds.map(function (c) { return Math.round(c.xf * 1000) + ',' + Math.round(c.yf * 1000); }).join(' ');   // same address, same sky
    } else {
      var fx = w / W, fy = h / H;
      clouds.forEach(function (c) { c.x *= fx; c.y *= fy; c.parts.forEach(function (p) { p.x *= fx; p.y *= fy; }); });
    }
    if (d !== DPR || first || wasPhone !== phone) { DPR = d; clouds.forEach(buildSprite); }
    W = w; H = h;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    report.size = [W, H, DPR];
    return true;
  }

  /* ---------- the blobs: where they are (hc-blobs), and where they should not be (the falling columns) ---------- */
  function blobSpots() {
    var s = window.hcBlobs && window.hcBlobs.spots ? window.hcBlobs.spots() : [];
    return s.map(function (o) { return { x: o[0], y: o[1], r: o[2] * 0.44 }; });
  }
  // the column a cloud's rain or snow fills right now (from its live drops, so the trail behind a moving cloud counts)
  function shafts() {
    var out = [];
    if (!precip) return out;
    clouds.forEach(function (c) {
      if (!c.parts.length) return;
      var x0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      c.parts.forEach(function (p) { if (p.x < x0) x0 = p.x; if (p.x > x1) x1 = p.x; if (p.y > y1) y1 = p.y; });
      out.push({ x0: x0 - 8, x1: x1 + 8, y0: c.y + 2, y1: y1 + 6 });
    });
    return out;
  }
  function publish() { var s = shafts(); report.shafts = s.length; if (window.hcBlobs && window.hcBlobs.keepOut) window.hcBlobs.keepOut(s); }

  /* ---------- simulation ---------- */
  var lastScroll = window.scrollY, topInset = 0;
  function falling(c) { var b = c.box; return c.x - b.w / 2 < W + 30 && c.x + b.w / 2 > -30 && c.y > topInset + 10 && c.y < H; }
  function step(dt, hit) {
    var hd = document.querySelector('.site_header'); topInset = hd ? Math.max(0, hd.getBoundingClientRect().bottom) : 0;
    var dS = window.scrollY - lastScroll; lastScroll = window.scrollY;
    clouds.forEach(function (c) {
      var b = c.box, M = c.fall + 120;
      c.x -= c.speed * dt;
      if (!paused) c.y -= dS * c.depth;   // a little parallax, like the blobs (none while paused, as the blobs do)
      var shift = 0;
      if (c.x + b.w / 2 + 40 < 0 && !c.parts.length) c.x = W + b.w / 2 + rnd(20, 240);
      if (c.y < -M) shift = H + 2 * M; else if (c.y > H + M) shift = -(H + 2 * M);
      if (shift) { c.y += shift; c.parts.forEach(function (p) { p.y += shift; }); }
      if (!precip) return;
      if (dS && !paused) c.parts.forEach(function (p) { p.y -= dS * c.depth; });
      // new drops only from under the cloud, while it is on the screen (no rain from a cloud you can't see)
      var onScreen = falling(c);
      var rate = (precip === 'rain' ? 0.5 : 0.075) * b.w;   // drops per second
      c.acc += onScreen ? rate * dt : 0;
      while (c.acc >= 1) {
        c.acc -= 1;
        var px = c.x + rnd(-0.38, 0.38) * b.w;
        if (kind === 'pixel') px = Math.round(px / U) * U;
        c.parts.push(precip === 'rain'
          ? { x: px, y: c.y + rnd(2, 6), vy: rnd(250, 330), vx: -c.speed / 0.6 * 0.4 - 18, l: rnd(9, 15), life: 0 }
          : { x: px, y: c.y + rnd(2, 8), vy: rnd(26, 40), vx: -c.speed / 0.6 * 0.3, r: rnd(1.7, 3.6), ph: rnd(0, 6.3), sw: rnd(0.8, 1.6), life: 0 });
      }
      for (var i = c.parts.length - 1; i >= 0; i--) {
        var p = c.parts[i];
        p.life += dt; p.y += p.vy * dt; p.x += (p.vx + (precip === 'snow' ? Math.sin(p.life * p.sw + p.ph) * 14 : 0)) * dt;
        var gone = p.y - c.y > c.fall;
        if (!gone && umbSpot) gone = underUmbrella(p);
        for (var k = 0; !gone && k < hit.length; k++) {   // a drop that does reach a blob just ends there
          var hb = hit[k], ddx = p.x - hb.x, ddy = p.y - hb.y; if (ddx * ddx + ddy * ddy < hb.r * hb.r * 0.8) gone = true;
        }
        if (gone) c.parts.splice(i, 1);
      }
    });
  }

  /* ---------- a blob umbrella and a wet cursor (see the note at the top) ---------- */
  var ptr = null, umbrella = 'none', shelterPt = null, outFor = 0, umbSpot = null,
      wet = [], cap = null, wetFor = 0, wetRest = 0, drips = [], splash = [], runs = [], lastRun = -1e9;
  function weatherAt(x, y) {   // the cloud whose rain or snow is falling at this screen point (from the cloud itself, so an umbrella doesn't dry it)
    if (!precip) return null;
    for (var i = 0; i < clouds.length; i++) {
      var c = clouds[i], half = 0.38 * c.box.w;
      if (x > c.x - half - 30 && x < c.x + half + 10 && y > c.y + 6 && y < c.y + c.fall - 20 && falling(c)) return c;
    }
    return null;
  }
  function inView(x, y) {   // the canvas is behind the page: over a picture the weather (and a wet cursor) can't be seen
    var e = document.elementFromPoint(x, y);
    return !(e && e.closest && e.closest('img, video, iframe, picture, .thumb_image'));
  }
  function underUmbrella(p) {   // a drop reaching the umbrella blob: splashes off its top (or simply ends, if it began inside)
    var ux = umbSpot[0], uy = umbSpot[1], R = umbSpot[2] * 0.5, dx = p.x - ux, dy = p.y - uy;
    if (dx * dx + dy * dy > R * R) return false;
    if (dy < R * 0.35 && splash.length < 160) {
      var top = uy - Math.sqrt(Math.max(0, R * R - dx * dx)), n = precip === 'rain' ? (Math.random() < 0.35 ? 2 : Math.random() < 0.75 ? 1 : 0) : 1 + (Math.random() < 0.3);
      for (var i = 0; i < n; i++) splash.push(precip === 'rain'
        ? { x: p.x, y: top, vx: dx / R * 110 + rnd(-40, 40), vy: -rnd(110, 190), g: 1000, life: 0, max: rnd(0.3, 0.45), r: rnd(0.9, 1.4) }
        : { x: p.x, y: top, vx: dx / R * 60 + rnd(-15, 15), vy: -rnd(30, 55), g: 140, life: 0, max: rnd(0.6, 1), r: p.r * 0.55 });
      report.splashes++;
    }
    return true;
  }
  function calm() {   // still, off, or a new page: no umbrella, a dry cursor
    umbrella = 'none'; shelterPt = null; umbSpot = null; wet = []; cap = null; wetFor = 0; drips = []; splash = []; runs = [];
    if (window.hcBlobs && window.hcBlobs.shelter) window.hcBlobs.shelter(null);
    report.umbrella = umbrella;
  }
  function mouseMove(e) {
    if (e.pointerType === 'touch' && !(ptr && ptr.down)) return;
    var x = e.clientX, y = e.clientY;
    if (!ptr || ptr.type !== e.pointerType) ptr = { x: x, y: y, ax: x, ay: y, rest: 0, moved: 0, type: e.pointerType, down: false };
    ptr.moved += Math.hypot(x - ptr.x, y - ptr.y); ptr.x = x; ptr.y = y;
    if (Math.hypot(x - ptr.ax, y - ptr.ay) > (ptr.type === 'touch' ? 10 : 4)) { ptr.ax = x; ptr.ay = y; ptr.rest = 0; }
  }
  function touchDown(e) {
    if (e.pointerType === 'mouse') return;
    ptr = { x: e.clientX, y: e.clientY, ax: e.clientX, ay: e.clientY, rest: 0, moved: 0, type: e.pointerType, down: true };
  }
  function touchUp(e) {
    if (e.pointerType === 'mouse' || !ptr || ptr.type === 'mouse') return;
    var x = ptr.x, y = ptr.y, sheltered = umbrella === 'on';
    ptr = null;
    if (sheltered) { umbrella = 'none'; shelterPt = null; return; }
    // the finger lifts in the rain: now and then one drop runs down from there
    if (e.type === 'pointerup' && on && !paused && precip === 'rain' && weatherAt(x, y) && inView(x, y) && performance.now() - lastRun > 5000) {
      lastRun = performance.now(); runs.push({ x: x, y: y, y0: y, base: rnd(16, 26), life: 0, max: rnd(1.8, 2.6), r: rnd(4, 5), ph: rnd(0, 6.3) });
    }
  }
  document.addEventListener('pointermove', mouseMove, { passive: true });
  document.addEventListener('pointerdown', touchDown, { passive: true });
  document.addEventListener('pointerup', touchUp, { passive: true });
  document.addEventListener('pointercancel', touchUp, { passive: true });
  document.addEventListener('pointerout', function (e) { if (!e.relatedTarget && ptr && ptr.type === 'mouse') ptr = null; }, { passive: true });

  function shelterStep(dt) {   // every moving frame, after the rain has moved
    var touch = !!ptr && ptr.type !== 'mouse', here = ptr && (!touch || ptr.down) && inView(ptr.x, ptr.y) ? weatherAt(ptr.x, ptr.y) : null;
    if (ptr) ptr.rest += dt;
    if (umbrella === 'on') {
      if (!ptr) umbrella = 'none';
      else if (here) { outFor = 0; shelterPt = { x: ptr.x, y: ptr.y }; }                 // it follows the pointer through the weather
      else if ((outFor += dt) > (ptr.rest >= outFor ? 1.5 : 0.4)) umbrella = 'none';    // still pointer: the weather drifted away
    } else if (here && ptr.rest >= (touch ? 0.6 : 0.8) && inView(ptr.x, ptr.y - 50)) { umbrella = 'on'; outFor = 0; shelterPt = { x: ptr.x, y: ptr.y }; }   // only where the blob would be seen
    if (umbrella !== 'on') shelterPt = null;
    var u = window.hcBlobs && window.hcBlobs.shelter ? window.hcBlobs.shelter(shelterPt) : null;
    umbSpot = umbrella === 'on' ? u : null;
    report.umbrella = umbrella === 'on' ? (u ? 'on' : 'asked') : 'none';
    var covered = !!(umbSpot && ptr && Math.abs(umbSpot[0] - ptr.x) < umbSpot[2] * 0.45 && umbSpot[1] < ptr.y);

    // the wet cursor (a mouse only)
    if (!wet.length && !cap) wetRest -= dt;
    if (ptr && ptr.type === 'mouse' && here && !covered && !wet.length && !cap && wetRest <= 0) {
      if ((wetFor += dt) >= 1) {
        wetFor = 0; wetRest = rnd(7, 14);
        if (precip === 'rain') {
          wet = [{ dx: 8, dy: 33, r: rnd(3.8, 4.7), grow: 0, at: ptr.moved + rnd(60, 140) }];   // under the arrow cursor, clear of it
          if (Math.random() < 0.45) wet.push({ dx: 20, dy: 36, r: rnd(3.2, 4.0), grow: 0, at: wet[0].at + rnd(70, 150) });
        } else cap = { age: 0, life: rnd(3, 5) };
        report.wetTimes++;
      }
    } else if (!here || covered) wetFor = 0;
    for (var i = wet.length - 1; i >= 0; i--) {
      var w = wet[i]; w.grow = Math.min(1, w.grow + dt * 2.5);
      if (!ptr || ptr.type !== 'mouse') { drips.push({ x: w.x || 0, y: w.y || 0, vy: 0, r: w.r, f: 0 }); wet.splice(i, 1); continue; }
      w.x = ptr.x + w.dx; w.y = ptr.y + w.dy;
      if (ptr.moved >= w.at && i === 0) { drips.push({ x: w.x, y: w.y, vy: 20, r: w.r, f: 0 }); wet.splice(i, 1); }   // one at a time
    }
    if (cap) {
      cap.age += dt;
      if (!ptr || ptr.type !== 'mouse') cap = null;
      else if (cap.age >= cap.life) { cap = null; wet = [{ dx: 8, dy: 33, r: 3.1, grow: 1, at: ptr.moved + rnd(40, 90), melt: true }]; }
    }
    var spots = drips.length && window.hcBlobs && window.hcBlobs.spots ? window.hcBlobs.spots() : [];
    for (i = drips.length - 1; i >= 0; i--) {
      var d = drips[i]; d.vy += 1500 * dt; d.y += d.vy * dt; d.f += d.vy * dt;
      var landed = false;
      for (var k = 0; k < spots.length && !landed; k++) if (Math.hypot(d.x - spots[k][0], d.y - spots[k][1]) < spots[k][2] * 0.4) landed = true;
      if (landed && window.hcBlobs.nudge && window.hcBlobs.nudge(d.x, d.y)) report.wobbles++;
      if (landed || d.f > 260 || d.y > H + 10) drips.splice(i, 1);
    }
    for (i = splash.length - 1; i >= 0; i--) {
      var s = splash[i]; s.life += dt; s.vy += s.g * dt; s.x += s.vx * dt; s.y += s.vy * dt;
      if (s.life >= s.max) splash.splice(i, 1);
    }
    for (i = runs.length - 1; i >= 0; i--) {   // runs down like a drop on a window: stops and starts, wanders a little
      var r = runs[i]; r.life += dt;
      r.y += r.base * (0.25 + 1.5 * Math.pow(Math.abs(Math.sin(r.life * 2.2 + r.ph)), 3)) * dt; r.x += Math.sin(r.life * 4 + r.ph) * 4 * dt;
      if (r.life >= r.max) runs.splice(i, 1);
    }
  }
  var WATER = [111, 183, 230], WATER_EDGE = [64, 142, 200], WATER_GLINT = [226, 244, 255];
  function drawWet() {
    var dropCol = pal.drop || pal.rim, i;
    splash.forEach(function (s) {
      var a = (1 - s.life / s.max) * (behindText(s.x, s.y) ? FADED : 1);
      ctx.fillStyle = css(precip === 'rain' ? dropCol : WHITE, (precip === 'rain' ? 0.6 : 0.95) * a);
      if (kind === 'pixel') { ctx.fillRect(Math.round(s.x / 2) * 2, Math.round(s.y / 2) * 2, 2, 2); return; }
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill();
    });
    function bead(x, y, r, a, stretch) {   // a small drop: round at the bottom, pointed on top, with a glint
      a *= behindText(x, y) ? FADED : 1; if (a <= 0.02 || r <= 0.2) return;
      var h = r * (1.6 + (stretch || 0));
      ctx.beginPath(); ctx.moveTo(x, y - h); ctx.quadraticCurveTo(x + r * 1.05, y - r * 0.4, x + r, y);
      ctx.arc(x, y, r, 0, Math.PI); ctx.quadraticCurveTo(x - r * 1.05, y - r * 0.4, x, y - h); ctx.closePath();
      ctx.fillStyle = css(WATER, 0.92 * a); ctx.fill();   // water, not cloud: clear light blue, a darker edge, a lighter glint
      ctx.lineWidth = Math.max(0.6, r * 0.16); ctx.strokeStyle = css(WATER_EDGE, 0.85 * a); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x - r * 0.38, y - r * 0.15, Math.max(0.5, r * 0.22), Math.max(0.6, r * 0.38), 0.4, 0, 7); ctx.fillStyle = css(WATER_GLINT, 0.9 * a); ctx.fill();
    }
    for (i = 0; i < wet.length; i++) if (wet[i].x != null) bead(wet[i].x, wet[i].y, wet[i].r * wet[i].grow, 1, 0);
    drips.forEach(function (d) { bead(d.x, d.y, d.r, 1 - d.f / 260, Math.min(2, d.vy / 400)); });
    runs.forEach(function (r) {
      var a = Math.min(1, (r.max - r.life) / 0.6, r.life * 4), rr = r.r * (1 - 0.3 * r.life / r.max);
      ctx.strokeStyle = css(dropCol, 0.22 * a * (behindText(r.x, r.y) ? FADED : 1)); ctx.lineWidth = rr * 0.8; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(r.x - 0.5, r.y0); ctx.lineTo(r.x, r.y - rr); ctx.stroke();
      bead(r.x, r.y, rr, a, 0.3);
    });
    if (cap && ptr) {   // a little snow on the cursor tip, melting
      var k = 1 - Math.pow(cap.age / cap.life, 1.6), cx = ptr.x + 2.2, cy = ptr.y - 1.2, a = behindText(cx, cy) ? FADED : 1;
      if (k > 0.05) {
        ctx.beginPath(); ctx.ellipse(cx + 0.5, cy + 0.8, 4.4 * k, 2.8 * k + 0.4, -0.5, 0, 7); ctx.fillStyle = css(pal.rim, 0.3 * a); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx, cy, 4.4 * k, 2.8 * k + 0.4, -0.5, 0, 7); ctx.fillStyle = css(WHITE, 0.97 * a); ctx.fill();
      }
    }
  }
  // for the tests: a point in falling weather that stays wet for a while (left of a cloud's middle: clouds drift left, over it)
  report.wetSpot = function () {
    var best = null;
    clouds.forEach(function (c) {
      var x = c.x - 0.2 * c.box.w, y = c.y + c.fall * 0.62, mid = Math.hypot(x - W / 2, y - H / 2);
      if (!precip || !falling(c) || x < 40 || x > W - 40 || y < topInset + 100 || y > H - 100 || !weatherAt(x, y) || !inView(x, y) || !inView(x, y - 50)) return;
      if (!best || mid < best.mid) best = { x: Math.round(x), y: Math.round(y), mid: mid };   // the one nearest the middle of the screen
    });
    return best;
  };
  report.isWet = function (x, y) { return !!weatherAt(x, y) && inView(x, y); };
  report.splashes = 0; report.wobbles = 0; report.wetTimes = 0;
  report.wetCursor = function () { return wet.length + (cap ? 1 : 0); };

  /* ---------- text stays first: rain and snow fade almost away behind words ---------- */
  var textBoxes = [], textAge = 99, FADED = 0.18, textFade = 0.6;   // FADED: how much of a drop or flake still shows behind text
  function readText() {   // page coordinates, refreshed every ~15 frames (cheap), shifted by scroll in between
    textAge = 0; textBoxes = [];
    if (!root) return;
    var els = root.querySelectorAll('h1, h2, h3, p, li, a, figcaption, .hc-pj-lede, .hc-pj-label');
    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect(); if (!r.width || !r.height || els[i].querySelector('img')) continue;
      textBoxes.push([r.left - 6, r.top - 6 + window.scrollY, r.right + 6, r.bottom + 6 + window.scrollY]);
    }
  }
  function behindText(x, y) {
    var py = y + window.scrollY;
    for (var i = 0; i < textBoxes.length; i++) { var b = textBoxes[i]; if (x > b[0] && x < b[2] && py > b[1] && py < b[3]) return true; }
    return false;
  }

  /* ---------- drawing ---------- */
  function draw() {
    if (++textAge > 15) readText();
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    clouds.forEach(function (c) {
      if (precip) drawFall(c);
      var x = c.x, y = c.y;
      if (kind === 'pixel') { x = Math.round(x / U) * U; y = Math.round(y / U) * U; }   // moves in steps, like an old GIF
      if (x + c.sw < 0 || x - c.sw > W || y + c.sh < 0 || y - c.sh > H) return;
      ctx.globalAlpha = c.alpha; ctx.drawImage(c.sprite, x - c.sox, y - c.soy, c.sw, c.sh); ctx.globalAlpha = 1;
    });
    fadeBehindText();
    drawWet();
  }
  // clouds thin out behind words (the colour stays, it just shows less there), softly: three stacked feathered rectangles
  function fadeBehindText() {
    if (!textBoxes.length) return;
    var a = 1 - Math.pow(1 - textFade, 1 / 3);
    ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,' + a + ')';
    textBoxes.forEach(function (b) {
      var y0 = b[1] - window.scrollY, y1 = b[3] - window.scrollY; if (y1 < -20 || y0 > H + 20 || b[2] < 0 || b[0] > W) return;
      [14, 7, 0].forEach(function (e) {
        var x = b[0] - e, y = y0 - e, w = b[2] - b[0] + 2 * e, h = y1 - y0 + 2 * e;
        if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, 8 + e); ctx.fill(); } else ctx.fillRect(x, y, w, h);
      });
    });
    ctx.restore();
  }
  function drawFall(c) {
    var ps = c.parts; if (!ps.length) return;
    if (precip === 'rain') {
      if (kind === 'pixel') {
        ps.forEach(function (p) { ctx.fillStyle = css(pal.drop, behindText(p.x, p.y) ? 0.6 * FADED : 0.6); ctx.fillRect(Math.round(p.x / U) * U, Math.round(p.y / U) * U, 2, U * 1.5); });
        return;
      }
      ctx.lineWidth = 1.15; ctx.lineCap = 'round';
      [false, true].forEach(function (faded) {
        ctx.strokeStyle = css(pal.drop, faded ? 0.5 * FADED : 0.5);
        ctx.beginPath();
        ps.forEach(function (p) {
          if (behindText(p.x, p.y) !== faded) return;
          var a = Math.min(1, (c.fall - (p.y - c.y)) / 50); if (a <= 0.05) return; var k = p.l * a; ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 0.22 * k, p.y - k);
        });
        ctx.stroke();
      });
    } else {
      ps.forEach(function (p) {
        var a = Math.min(1, (c.fall - (p.y - c.y)) / 60, p.life * 3) * (behindText(p.x, p.y) ? FADED : 1);
        if (kind === 'pixel') { ctx.fillStyle = css(WHITE, a); ctx.fillRect(Math.round(p.x / U) * U, Math.round(p.y / U) * U, U, U); return; }
        ctx.beginPath(); ctx.arc(p.x + 0.6, p.y + 0.9, p.r, 0, 7); ctx.fillStyle = css(pal.rim, 0.22 * a); ctx.fill();   // a faint shadow so white shows on pink
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = css(pal.flake, 0.97 * a); ctx.fill();
      });
    }
  }

  /* ---------- running ---------- */
  var raf = 0, last = 0, on = false;
  function frame(now) {
    raf = 0;
    if (!on) return;
    var dt = Math.min(0.05, last ? (now - last) / 1000 : 0); last = now;
    var was = paused; paused = still(); report.paused = paused;
    if (was && !paused) { last = 0; lastScroll = window.scrollY; }
    if (!was && paused) { calm(); draw(); }   // going still: no umbrella, a dry cursor, and a still picture without them
    var resized = fit();
    if (W && H) {
      report.frames++;
      if (!paused) {
        step(dt, blobSpots());
        shelterStep(dt);
        publish();
        draw();
      } else {
        lastScroll = window.scrollY;
        if (resized) draw();
      }
    }
    if (!document.hidden) raf = requestAnimationFrame(frame);   // paused or reduced: only measuring, redraw on resize
  }
  function warmUp() {   // the sky is already raining when the page appears (and the still picture has drops)
    if (!W) return;
    for (var i = 0; i < 240; i++) step(1 / 30, []);
    lastScroll = window.scrollY;
  }

  /* ---------- on project pages only (Cargo changes pages without reloading), off in 1999 mode ---------- */
  function slugHere() { try { return decodeURIComponent(location.pathname.replace(/\/+$/, '').split('/').pop() || ''); } catch (e) { return ''; } }
  function host() {
    if (!html.classList.contains('hc-pj-on')) return null;
    var all = document.querySelectorAll('[id="hc-pj"]');
    for (var i = 0; i < all.length; i++) if (all[i].offsetParent) return all[i];
    return null;
  }
  function sync() {
    var r = host(), s = slugHere(), want = !!(r && s) && !html.classList.contains('hc-ns') && !html.classList.contains('hc-gc');
    root = r;
    if (!want) {
      if (on) { on = false; if (raf) cancelAnimationFrame(raf); raf = 0; if (window.hcBlobs && window.hcBlobs.keepOut) window.hcBlobs.keepOut([]); calm(); }
      if (cv.parentNode) cv.parentNode.removeChild(cv);
    } else {
      if (s !== slug) setup(s);
      place();
      if (!on) { on = true; paused = still(); last = 0; lastScroll = window.scrollY; fit(); warmUp(); textAge = 99; draw(); }
      if (!raf && !document.hidden) raf = requestAnimationFrame(frame);
    }
    [].forEach.call(document.querySelectorAll('canvas.hc-weather-free'), function (c) { if (c !== cv) c.remove(); });   // never two
    [].forEach.call(document.querySelectorAll('canvas.hc-weather'), function (c) { c.remove(); });   // nor the retired strip
    report.on = on; report.canvases = document.querySelectorAll('canvas.hc-weather-free').length;
  }
  var queued = false;
  function soon() { if (queued) return; queued = true; setTimeout(function () { queued = false; sync(); }, 0); }
  new MutationObserver(function (ms) {
    for (var i = 0; i < ms.length; i++) if (ms[i].target !== cv && !(ms[i].addedNodes.length === 1 && ms[i].addedNodes[0] === cv) && !(ms[i].removedNodes.length === 1 && ms[i].removedNodes[0] === cv)) return soon();
  }).observe(html, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  addEventListener('popstate', function () { setTimeout(sync, 60); });
  document.addEventListener('visibilitychange', function () { last = 0; if (on && !raf && !document.hidden) raf = requestAnimationFrame(frame); });
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { reduce = mq.matches; });
  report.reduce = reduce;
  if (document.body) sync(); else document.addEventListener('DOMContentLoaded', sync);
})();
window.__hcBuild = "2026-11-17 23:22";
