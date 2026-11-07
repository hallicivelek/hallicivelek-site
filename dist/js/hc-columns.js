/* hc-columns for hallicivelek.com: built from dist/hc-columns.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  .hc-sort { margin: 0 0 28px; }\n  .hc-sort button { font: inherit; font-size: 18px; color: rgb(73, 46, 70); background: none; border: 0; padding: 4px 0; cursor: pointer; text-align: inherit; }\n  .hc-sort-again { color: rgb(14, 118, 128); font-weight: bold; text-decoration: underline; text-underline-offset: 4px;\n    text-decoration-thickness: 1.5px; margin-left: .6em; white-space: nowrap; }   /* dark teal: about 4:1 on the pink */\n  /* a tag page (/filter/music): a title instead of a filter to clear */\n  .hc-tag { text-align: left; margin: 0 0 22px; color: rgb(73, 46, 70); font-family: pacaembu, sans-serif; }\n  .hc-tag a { display: inline-block; font-size: 15px; font-weight: bold; color: rgb(14, 118, 128); text-decoration: none; margin: 0 0 22px; }\n  .hc-tag a:hover { background: none !important; color: rgb(14, 118, 128) !important; text-decoration: underline; }\n  .hc-tag a:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 3px; }\n  .hc-tag h1 { font-family: inherit; font-size: 44px; line-height: 1.1; margin: 0 0 6px; font-weight: bold; color: inherit; text-transform: none; }\n  .hc-tag p { font-size: 15px; opacity: .8; margin: 0; }\n  @media (max-width: 600px) { .hc-tag h1 { font-size: 32px; } }\n  /* the pinboard: prints instead of rounded white boxes */\n  .thumbnails .thumb_image { background: #fff !important; border-radius: 0 !important; padding: 10px; box-sizing: border-box; height: auto !important;\n    box-shadow: 0 1px 2px rgba(73, 46, 70, .12), 0 12px 26px -12px rgba(73, 46, 70, .38);\n    transform: rotate(var(--hc-tilt, 0deg)); transition: transform .3s cubic-bezier(.3, .7, .2, 1); }\n  .thumbnails .thumb_image img { width: 100% !important; height: auto !important; max-width: none !important; display: block; margin: 0 !important; }\n  .thumbnails .thumbnail:hover .thumb_image, .thumbnails .thumbnail:focus-within .thumb_image { transform: rotate(0deg) scale(1.02); }\n  html.hc-ns .thumbnails .thumb_image { transform: none !important; box-shadow: none !important; }\n  @media (prefers-reduced-motion: reduce) { .thumbnails .thumb_image { transition: none; } }\n  @media (min-width: 768px) {\n    .thumbnails.clear { gap: 44px !important; }\n    .thumbnails.clear .column { width: calc(50% - 22px) !important; }\n    html.hc-three .thumbnails.clear .column { width: calc((100% - 88px) / 3) !important; }\n    .thumbnails .thumbnail { margin-bottom: 0 !important; }\n    .thumbnails .padding_helper { margin-bottom: 64px; }\n  }\n  /* 33.6k modem: each picture loads top to bottom in steps once it is on screen */\n  @keyframes hc-dial { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }\n  .hc-dial .thumb_image { background-image: repeating-linear-gradient(0deg, rgba(73, 46, 70, .05) 0 2px, transparent 2px 4px); }\n  .hc-dial .thumb_image img { clip-path: inset(0 0 100% 0); }\n  .hc-dial.hc-go .thumb_image img { animation: hc-dial var(--hc-d, 4s) steps(var(--hc-st, 12)) var(--hc-dl, 0s) forwards; }\n  @media (prefers-reduced-motion: reduce) { .hc-dial .thumb_image img { clip-path: none; animation: none !important; } }\n  /* tiny JPG: a small copy of the picture blown up without smoothing */\n  .hc-px-box { position: relative; }\n  .hc-px { position: absolute; image-rendering: pixelated; image-rendering: crisp-edges; pointer-events: none; }\n  .hc-sort button:hover .hc-sort-again, .hc-sort button:focus-visible .hc-sort-again { text-decoration: underline; }\n  .thumbnails .thumb_title, .thumbnails .thumb_title span { font-size: 20px; line-height: 1.4; color: rgb(73, 46, 70); }   /* plum: 9.1:1 on the site pink */\n  /* long one-word titles (\"Pungstöppuslayer\") made the phone page wider than the screen, so Safari zoomed out */\n  .thumbnails .thumb_title { overflow-wrap: anywhere; }\n  @media (max-width: 600px) { .thumbnails .thumb_title, .thumbnails .thumb_title span { font-size: 16px; } }\n  .hc-sort-card .thumb_info { position: relative; }\n  .hc-sort-fact { position: absolute; top: 100%; left: 0; right: 0; margin-top: 2px; text-align: center;\n    font-size: 15px; line-height: 1.5; color: rgba(73, 46, 70, .78); pointer-events: none;   /* 5.1:1 on the site pink */\n    opacity: 0; transition: opacity .25s; }\n  .thumbnail:hover .hc-sort-fact, .thumbnail:focus-within .hc-sort-fact { opacity: 1; }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcCols) return;
  window.__hcCols = true;

  var MIN_WIDTH = 768;   // below this width Cargo's own columns are kept (only re-ordered)
  var THREE = 1000;      // from this width: three columns
  var SORTS = [{"name":"hands","label":"number of hands","badge":"{n} hands","badge1":"1 hand","low":false,"items":{"Cheerios":28,"Retro-Stefson-Kimbabwe":14,"Retro-Stefson-Montana":12,"Smite-The-World":2,"Automysophobia":2,"Uppskriftabok-skaldverk":1,"FM-Belfast-how-to-make-friends":1},"badges":{},"count":true},{"name":"stripes","label":"stripes","badge":"stripes","badge1":"","low":false,"items":{"FM-Belfast-how-to-make-friends":true,"Retro-Stefson-Kimbabwe":true},"badges":{},"count":false},{"name":"looking left","label":"looking left","badge":"looking left","badge1":"","low":false,"items":{"Icelandsmites":true,"Cheerios":true,"Sesar-A-Stormurinn-a-undan-logninu":true,"Retro-Stefson-Qween":true},"badges":{},"count":false},{"name":"black and white","label":"black and white","badge":"black and white","badge1":"","low":false,"items":{"Smite-The-World":true,"Uppskriftabok-skaldverk":true,"Retro-Stefson-Qween":true,"Icelandsmites":true,"Grapewaves":true,"Nothing-Ekkert":true,"Sesar-A-Gerdutadsjalfur-Doityourself":true,"Apparat-Organ-Quartet":true},"badges":{},"count":false},{"name":"lots of yellow","label":"lots of yellow","badge":"yellow","badge1":"","low":false,"items":{"Cheerios":true,"Apparat-Organ-Quartet-Romantika":true,"Unicef-Christmas-Card":true,"Pedro-Pilatus-album-artwork":true,"Retro-Stefson-Kimbabwe":true},"badges":{},"count":false},{"name":"halli-blue","label":"Halli-blue","badge":"Halli-blue","badge1":"","low":false,"items":{},"badges":{},"count":false},{"name":"speed","label":"speed, from sitting still to full tilt","badge":"{n}","badge1":"","low":true,"items":{"Sitjikall":1,"Krjupandi-blomakona":1,"Blue-walker":2,"Strollin-Into-The-Club-Like":3,"Skokkikona":4,"Fartrunner":5,"Swimbert-1":6,"Toasterman-On-The-Move":6},"badges":{"Sitjikall":"sitting","Krjupandi-blomakona":"kneeling","Blue-walker":"walking","Strollin-Into-The-Club-Like":"strolling","Skokkikona":"jogging","Fartrunner":"running","Swimbert-1":"swimming","Toasterman-On-The-Move":"on the move!"},"count":true},{"name":"gaze","label":"where they look: left, at you, right","badge":"{n}","badge1":"","low":true,"items":{"Icelandsmites":1,"Cheerios":1,"Sesar-A-Stormurinn-a-undan-logninu":1,"Retro-Stefson-Qween":1},"badges":{"Icelandsmites":"looking left","Cheerios":"looking left","Sesar-A-Stormurinn-a-undan-logninu":"looking left","Retro-Stefson-Qween":"looking left"},"count":true},{"name":"faces","label":"number of faces","badge":"{n} faces","badge1":"1 face","low":false,"items":{},"badges":{},"count":false},{"name":"colours","label":"number of colours","badge":"{n} colours","badge1":"1 colour","low":true,"items":{},"badges":{},"count":false},{"name":"hair","label":"hair","badge":"hair","badge1":"","low":false,"items":{"Firehair-1":true,"hairtower":true,"Fluffyhead":true,"Bluefluffy":true,"Beardgrumphead":true},"badges":{},"count":false},{"name":"food","label":"food","badge":"food","badge1":"","low":false,"items":{"Cheerios":true,"Pumpkinator":true,"Grapewaves":true,"Uppskriftabok-skaldverk":true,"Toasterman-On-The-Move":true,"Kronan":true},"badges":{},"count":false},{"name":"cats","label":"cats","badge":"cat","badge1":"","low":false,"items":{"Cat-family":true,"Adopt-this-cat":true},"badges":{},"count":false},{"name":"halli in it","label":"Halli in it","badge":"Halli","badge1":"","low":false,"items":{"Selfie-1":true,"The-Future-Selfie":true,"Halli-lettering":true},"badges":{},"count":false},{"name":"drops","label":"drops, squirts and crumbs","badge":"drops, squirts, crumbs","badge1":"","low":false,"items":{"Smite-The-World":true,"Uppskriftabok-skaldverk":true,"Millilending":true,"Retro-Stefson-Retro-Stefson":true,"FM-Belfast-how-to-make-friends":true,"Icelandsmites":true,"Grapewaves":true,"Automysophobia":true,"Pedro-Pilatus-album-artwork":true,"Unicef-Christmas-Card":true,"Halli-lettering":true,"Pungstoppuslayer":true,"Sitjikall":true,"Skokkikona":true,"Blue-sinker":true,"Beardgrumphead":true,"Swimbert-1":true,"Phuture-Joga":true},"badges":{},"count":false},{"name":"music","label":"music","badge":"music","badge1":"","low":false,"items":{"Italo-mix-2007":true,"Italo-Rider-mix":true,"Hotplay-from-Europe-Minimix":true,"A-Mix-of-Oddities-and-Rarities":true,"Italo-Disco-Opal":true,"Breakbeat":true,"Retro-Stefson-Retro-Stefson":true,"Retro-Stefson-Qween":true,"Retro-Stefson-Kimbabwe":true,"Retro-Stefson-Montana":true,"FM-Belfast-how-to-make-friends":true,"Pedro-Pilatus-album-artwork":true,"Apparat-Organ-Quartet":true,"Apparat-Organ-Quartet-Romantika":true,"Sesar-A-Gerdutadsjalfur-Doityourself":true,"Sesar-A-Stormurinn-a-undan-logninu":true},"badges":{},"count":false}];
  var FRAME = 'sorted by: ';
  var USUAL = { name: 'halli', label: 'Halli', badge: '', items: {} };
  var FIRST = '↻ try the random overlords', AGAIN = '↻ ask the overlords again';
  var INTRO = '';        // no intro line above the sort (Halli, 2026-11-04: better without)
  var INTRO_PAGE = /^\/(filter\/[^/]+\/?)?$/;   // the front page (and its filters)
  var TAG_PAGE = /^\/filter\/([^/]+)\/?$/;
  var TAG_NAMES = { artdirection: 'art direction', iillustration: 'illustration' };
  var GEO_CHANCE = 1 / 6;                     // how often the overlords choose GeoCities
  var clicked = false;

  // ---- the 90s sorts, worked out from the cards on the page ----
  function titleOf(g) { var t = g.els[0].querySelector('.thumb_title'); return t ? t.textContent.trim() : g.slug; }
  function imgOf(g) { return g.els[0].querySelector('.thumb_image img'); }
  function bytesOf(g) {                       // the thumbnail's file size, or a guess from its pixels
    var img = imgOf(g); if (!img) return 20000;
    var src = img.currentSrc || img.src, e = performance.getEntriesByName(src)[0];
    var n = e && (e.encodedBodySize || e.transferSize);
    return n || (img.naturalWidth ? img.naturalWidth * img.naturalHeight * 0.12 : 20000);
  }
  function fileName(title) {
    return title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ð/g, 'd').replace(/þ/g, 'th')
      .replace(/æ/g, 'ae').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 18) + '_SMALL.jpg';
  }
  function dialSeconds(bytes) { var sec = Math.max(1, Math.round(bytes / 3500)); return Math.min(3 + sec * 0.5, 12); }
  var MODEM = { name: 'modem', label: '33.6k modem', computed: true, low: true, effect: 'dial', badge: '', items: {}, badges: {},
    prepare: function (seq) { var s = this; s.items = {}; s.badges = {};
      seq.forEach(function (g) { var b = bytesOf(g); s.items[g.slug] = b; s.badges[g.slug] = '≈ ' + Math.round(dialSeconds(b)) + ' sec on 33.6k'; }); } };
  var YAHOO = { name: 'yahoo', label: 'Yahoo! directory, 1998', computed: true, low: true, badge: '', items: {}, badges: {},
    prepare: function (seq) { var s = this; s.items = {}; s.badges = {};
      seq.slice().sort(function (a, b) { return titleOf(a).localeCompare(titleOf(b), 'is'); })
        .forEach(function (g, i) { s.items[g.slug] = i; s.badges[g.slug] = 'Yahoo! › Halli › ' + titleOf(g).charAt(0).toUpperCase(); }); } };
  var TINY = { name: 'tiny', label: 'tiny JPG, 1997', computed: true, low: true, effect: 'pixel', badge: '', items: {}, badges: {},
    prepare: function (seq) { var s = this; s.items = {}; s.badges = {};
      seq.forEach(function (g) { var b = bytesOf(g); s.items[g.slug] = b;
        s.badges[g.slug] = fileName(titleOf(g)) + ' · ' + Math.max(2, Math.round(b / 8192)) + ' KB'; }); } };
  var GEO = { name: 'geocities', label: 'GeoCities, 1999', computed: true, badge: '', items: {}, badges: {},
    prepare: function () {}, chosen: function () { if (window.__hcRetro) window.__hcRetro.set('gc'); } };
  var COMPUTED = [MODEM, YAHOO, TINY];
  var current = null;    // the sort in use
  var gridIds = '';      // which projects the grid shows, to notice a filter change
  var dealt = '';        // the layout we last made, to tell our own changes from Cargo's
  var lastSeq = [];
  var glide = false;     // true after a click: cards glide to their new places
  var calm = matchMedia('(prefers-reduced-motion: reduce)');

  function models() {
    try { return Cargo.View.Thumbnail.collection.models; } catch (e) { return []; }
  }
  function projectOrder() { return models().map(function (m) { return String(m.id); }); }
  function addresses() {
    var a = {};
    models().forEach(function (m) { a[String(m.id)] = (m.attributes || {}).project_url; });
    return a;
  }

  function matching(sort, seq) {
    return seq.filter(function (g) { return sort.items[g.slug] !== undefined; }).length;
  }
  function wanted() {
    var m = /[?&]hc-sort=([^&]*)/.exec(location.search);
    if (!m) return null;
    var name = decodeURIComponent(m[1].replace(/\+/g, ' ')).toLowerCase();
    return SORTS.concat(COMPUTED, [GEO, USUAL]).filter(function (s) { return s.name.toLowerCase() === name; })[0] || null;
  }
  // the overlords: a fact with at least 2 projects on this page, a 90s sort, Halli's order, or now and then GeoCities
  function pick(seq, avoid) {
    var gc = window.__hcRetro && window.__hcRetro.mode() !== 'gc';
    if (gc && avoid !== GEO && Math.random() < GEO_CHANCE) return GEO;
    var ok = SORTS.filter(function (s) { return s !== avoid && matching(s, seq) >= 2; })
      .concat(COMPUTED.filter(function (s) { return s !== avoid; }));
    if (avoid !== USUAL) ok.push(USUAL);
    return ok.length ? ok[Math.floor(Math.random() * ok.length)] : USUAL;
  }
  function sorted(seq, sort) {
    return seq.map(function (g, i) {
      var v = sort.items[g.slug];
      return { g: g, k: [v === undefined ? 1 : 0, typeof v === 'number' ? (sort.low ? v : -v) : 0, i] };
    }).sort(function (a, b) { return a.k[0] - b.k[0] || a.k[1] - b.k[1] || a.k[2] - b.k[2]; })
      .map(function (x) { return x.g; });
  }
  function badgeText(sort, v, slug) {
    if (sort.badges && sort.badges[slug]) return sort.badges[slug];
    if (typeof v === 'number') return (v === 1 && sort.badge1) ? sort.badge1 : sort.badge.replace('{n}', v);
    return sort.badge;
  }

  function label(th) {
    var box = document.getElementById('hc-sort');
    if (!box) {
      box = document.createElement('div');
      box.id = 'hc-sort'; box.className = 'hc-sort'; box.setAttribute('aria-live', 'polite');
      box.innerHTML = '<button type="button"><span class="hc-sort-label"></span><span class="hc-sort-again"></span></button>';
      box.querySelector('.hc-sort-again').textContent = FIRST;
      box.firstChild.addEventListener('click', function () {
        current = pick(lastSeq, current); dealt = ''; glide = true;
        if (!clicked) { clicked = true; box.querySelector('.hc-sort-again').textContent = AGAIN; }
        if (current.chosen) current.chosen();
        fix();
      });
    }
    if (box.nextSibling !== th) th.parentNode.insertBefore(box, th);
    // on a tag page: ← things I've made, the tag as a title, and how many things have it
    var tag = document.getElementById('hc-tag'), m = TAG_PAGE.exec(location.pathname);
    if (m) {
      if (!tag) {
        tag = document.createElement('div'); tag.id = 'hc-tag'; tag.className = 'hc-tag';
        var back = document.createElement('a'); back.href = '/'; back.textContent = "← things I've made";
        tag.appendChild(back); tag.appendChild(document.createElement('h1')); tag.appendChild(document.createElement('p'));
      }
      var slug = decodeURIComponent(m[1]).toLowerCase(), name = TAG_NAMES[slug] || slug.replace(/-/g, ' ');
      if (tag.querySelector('h1').textContent !== name) tag.querySelector('h1').textContent = name;
      var n = lastSeq.length, count = n + (n === 1 ? ' thing' : ' things');
      if (tag.querySelector('p').textContent !== count) tag.querySelector('p').textContent = count;
      if (tag.nextSibling !== box) box.parentNode.insertBefore(tag, box);
    } else if (tag) tag.remove();
    var intro = document.getElementById('hc-intro');
    if (INTRO && INTRO_PAGE.test(location.pathname)) {
      if (!intro) { intro = document.createElement('p'); intro.id = 'hc-intro'; intro.className = 'hc-intro'; intro.textContent = INTRO; }
      if (intro.nextSibling !== box) box.parentNode.insertBefore(intro, box);
    } else if (intro) intro.remove();
    var text = box.querySelector('.hc-sort-label');
    if (text.textContent !== FRAME + current.label) text.textContent = FRAME + current.label;
  }

  function layoutOf(cols) {
    return current.name + ':' + cols.map(function (c) {
      return [].slice.call(c.querySelectorAll('.thumbnail[name]')).map(function (t) { return t.getAttribute('name'); }).join(',');
    }).join('|');
  }

  function fix() {
    var th = document.querySelector('.thumbnails[data-columnize]');
    if (!th) return;
    var cols = [].slice.call(th.children).filter(function (c) { return c.classList.contains('column'); });
    if (!cols.length) return;
    var three = innerWidth >= THREE && cols.length >= 3;
    var use = three ? cols.slice(0, 3) : innerWidth >= MIN_WIDTH ? cols.slice(0, 2) : cols;
    document.documentElement.classList.toggle('hc-three', three);
    cols.forEach(function (c) { if (use.indexOf(c) >= 0) c.style.removeProperty('display'); });
    var extra = cols.slice(use.length);
    var settled = !extra.some(function (c) { return c.children.length; });
    if (current && settled && dealt === layoutOf(use) && document.getElementById('hc-sort')) return;   // nothing to fix

    // Group the cards. A card without a project id (like a blob self-portrait)
    // travels with the project card just before it.
    var groups = [], byId = {}, loose = [], where = addresses();
    cols.forEach(function (col) {
      var current = null;
      [].slice.call(col.children).forEach(function (card) {
        var t = card.querySelector('.thumbnail[name]');
        if (t) {
          var id = t.getAttribute('name'), a = t.querySelector('a[href]');
          current = { id: id, els: [card], h: 0,
            slug: where[id] || (a ? a.getAttribute('href').replace(/[?#].*$/, '').replace(/\/+$/, '').split('/').pop() : '') };
          groups.push(current); byId[current.id] = current;
        } else if (current) current.els.push(card);
        else loose.push(card);
      });
    });
    groups.forEach(function (g) {
      g.els.forEach(function (el) { g.h += el.offsetHeight; });
      var box = g.els[0].querySelector('.thumb_image'), n = 0;   // each print's own small tilt, the same on every visit
      for (var k = 0; k < g.slug.length; k++) n = (n * 31 + g.slug.charCodeAt(k)) % 997;
      if (box) box.style.setProperty('--hc-tilt', ((n / 997) * 4.4 - 2.2).toFixed(2) + 'deg');
    });

    // Cargo's order first; anything it doesn't know about keeps its place at the end
    var seq = [];
    projectOrder().forEach(function (id) { if (byId[id]) { seq.push(byId[id]); byId[id] = null; } });
    groups.forEach(function (g) { if (byId[g.id]) seq.push(g); });
    lastSeq = seq;

    // A new grid (first visit or another filter): keep today's sort if it still fits, else pick again
    var ids = seq.map(function (g) { return g.id; }).sort().join();
    if (ids !== gridIds) {
      gridIds = ids;
      current = wanted() || (current && (current.computed || matching(current, seq) >= 2) ? current : USUAL);
    }
    if (current.prepare) current.prepare(seq);
    seq = sorted(seq, current);
    label(th);

    // Remember where each card was, so it can glide to its new place
    var before = {};
    if (glide && !calm.matches) seq.forEach(function (g) { before[g.id] = g.els[0].getBoundingClientRect(); });

    // Deal into the shorter column, like Cargo does
    var heights = use.map(function () { return 0; });
    loose.forEach(function (el) { use[0].appendChild(el); heights[0] += el.offsetHeight; });
    seq.forEach(function (g) {
      var c = heights.indexOf(Math.min.apply(null, heights));
      g.els.forEach(function (el) { use[c].appendChild(el); });
      heights[c] += g.h;
    });
    extra.forEach(function (c) { c.style.setProperty('display', 'none', 'important'); });

    // The fact under each matching card's hover title
    [].slice.call(th.querySelectorAll('.hc-sort-fact')).forEach(function (b) { b.remove(); });
    seq.forEach(function (g) {
      var v = current.items[g.slug], text = v === undefined ? '' : badgeText(current, v, g.slug);
      var info = g.els[0].querySelector('.thumb_info');
      if (!text || !info) return;
      var b = document.createElement('div');
      b.className = 'hc-sort-fact'; b.textContent = text;
      g.els[0].classList.add('hc-sort-card'); info.appendChild(b);
    });

    seq.forEach(function (g) {
      var was = before[g.id];
      if (!was) return;
      var now = g.els[0].getBoundingClientRect(), dx = was.left - now.left, dy = was.top - now.top;
      if (!dx && !dy) return;
      g.els.forEach(function (el) {
        el.style.transition = 'none';
        el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        seq.forEach(function (g) {
          if (!before[g.id]) return;
          g.els.forEach(function (el) {
            el.style.transition = 'transform .7s cubic-bezier(.3, .7, .2, 1)';
            el.style.transform = '';
          });
        });
      });
    });
    effects(seq);
    dealt = layoutOf(use);
    glide = false;
  }

  // ---- the 90s effects: dial-up loading and pixels ----
  var watcher = null;
  function clearEffects() {
    if (watcher) { watcher.disconnect(); watcher = null; }
    [].slice.call(document.querySelectorAll('.hc-dial')).forEach(function (c) { c.classList.remove('hc-dial', 'hc-go'); });
    [].slice.call(document.querySelectorAll('.hc-px')).forEach(function (c) { c.remove(); });
    [].slice.call(document.querySelectorAll('img[data-hc-px]')).forEach(function (i) { i.style.visibility = ''; i.removeAttribute('data-hc-px'); });
  }
  function pixelate(img) {
    var go = function () {
      var w = img.clientWidth, h = img.clientHeight;
      if (!w || !h || current.effect !== 'pixel') return;
      var cv = document.createElement('canvas'), blk = 14;
      cv.width = Math.max(4, Math.round(w / blk)); cv.height = Math.max(4, Math.round(h / blk));
      try { cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); } catch (e) { return; }
      cv.className = 'hc-px';
      cv.style.width = w + 'px'; cv.style.height = h + 'px'; cv.style.left = img.offsetLeft + 'px'; cv.style.top = img.offsetTop + 'px';
      img.parentElement.classList.add('hc-px-box'); img.parentElement.appendChild(cv);
      img.style.visibility = 'hidden'; img.setAttribute('data-hc-px', '');
    };
    if (img.complete && img.naturalWidth) go(); else img.addEventListener('load', go, { once: true });
  }
  function effects(seq) {
    clearEffects();
    if (current.effect === 'pixel') seq.forEach(function (g) { var img = imgOf(g); if (img) pixelate(img); });
    if (current.effect === 'dial' && !calm.matches && 'IntersectionObserver' in window) {
      var n = 0;
      watcher = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.style.setProperty('--hc-dl', (0.3 + (n++ % 2) * 0.9) + 's');
          e.target.classList.add('hc-go'); watcher.unobserve(e.target);
        });
      }, { threshold: 0.25 });
      seq.forEach(function (g) {
        var d = dialSeconds(current.items[g.slug] || 20000), card = g.els[0];
        card.style.setProperty('--hc-d', d + 's'); card.style.setProperty('--hc-st', Math.max(10, Math.round(d * 3)));
        card.classList.add('hc-dial'); watcher.observe(card);
      });
    }
  }

  // Cargo redraws the grid when you change filter, load more or resize: fix again each time
  var pending = null;
  new MutationObserver(function () {
    clearTimeout(pending);
    pending = setTimeout(fix, 120);
  }).observe(document.body, { childList: true, subtree: true });
  addEventListener('resize', function () { clearTimeout(pending); pending = setTimeout(fix, 200); });
  fix();
})();
window.__hcBuild = "2026-11-07 03:39";
