/* hc-columns for hallicivelek.com: built from dist/hc-columns.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  .hc-sort { margin: 0 0 28px; }\n  .hc-sort button { font: inherit; font-size: 18px; color: rgb(73, 46, 70); background: none; border: 0; padding: 4px 0; cursor: pointer; text-align: inherit; }\n  .hc-sort-again { color: rgb(59, 191, 201); margin-left: .6em; white-space: nowrap; }\n  .hc-sort button:hover .hc-sort-again, .hc-sort button:focus-visible .hc-sort-again { text-decoration: underline; }\n  .hc-sort-card { position: relative; }\n  .hc-sort-badge { position: absolute; top: 12px; left: 12px; z-index: 2; padding: 1px 11px; border-radius: 999px;\n    background: rgb(243, 220, 223); color: rgb(73, 46, 70); font-size: 14px; line-height: 1.7; pointer-events: none; }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcCols) return;
  window.__hcCols = true;

  var MIN_WIDTH = 768;   // below this width Cargo's own columns are kept (only re-ordered)
  var SORTS = [{"name":"hands","label":"today's order: most hands first","badge":"{n} hands","badge1":"1 hand","low":false,"items":{"Cheerios":28,"Retro-Stefson-Kimbabwe":14,"Retro-Stefson-Montana":12,"Smite-The-World":2,"Automysophobia":2,"Uppskriftabok-skaldverk":1,"FM-Belfast-how-to-make-friends":1},"badges":{},"count":true},{"name":"stripes","label":"today's order: stripes first","badge":"stripes","badge1":"","low":false,"items":{"FM-Belfast-how-to-make-friends":true,"Retro-Stefson-Kimbabwe":true},"badges":{},"count":false},{"name":"looking left","label":"today's order: everyone looking left goes first","badge":"looking left","badge1":"","low":false,"items":{"Icelandsmites":true,"Cheerios":true,"Sesar-A-Stormurinn-a-undan-logninu":true,"Retro-Stefson-Qween":true},"badges":{},"count":false},{"name":"black and white","label":"today's order: black and white first","badge":"black and white","badge1":"","low":false,"items":{"Smite-The-World":true,"Uppskriftabok-skaldverk":true,"Retro-Stefson-Qween":true,"Icelandsmites":true,"Grapewaves":true,"Nothing-Ekkert":true,"Sesar-A-Gerdutadsjalfur-Doityourself":true,"Apparat-Organ-Quartet":true},"badges":{},"count":false},{"name":"lots of yellow","label":"today's order: lots of yellow first","badge":"yellow","badge1":"","low":false,"items":{"Cheerios":true,"Apparat-Organ-Quartet-Romantika":true,"Unicef-Christmas-Card":true,"Pedro-Pilatus-album-artwork":true,"Retro-Stefson-Kimbabwe":true},"badges":{},"count":false},{"name":"halli-blue","label":"today's order: Halli-blue first","badge":"Halli-blue","badge1":"","low":false,"items":{},"badges":{},"count":false},{"name":"speed","label":"today's order: from sitting still to full speed","badge":"{n}","badge1":"","low":true,"items":{"Sitjikall":1,"Krjupandi-blomakona":1,"Blue-walker":2,"Strollin-Into-The-Club-Like":3,"Skokkikona":4,"Fartrunner":5,"Swimbert-1":6,"Toasterman-On-The-Move":6},"badges":{"Sitjikall":"sitting","Krjupandi-blomakona":"kneeling","Blue-walker":"walking","Strollin-Into-The-Club-Like":"strolling","Skokkikona":"jogging","Fartrunner":"running","Swimbert-1":"swimming","Toasterman-On-The-Move":"on the move!"},"count":true},{"name":"gaze","label":"today's order: looking left, looking at you, looking right","badge":"{n}","badge1":"","low":true,"items":{"Icelandsmites":1,"Cheerios":1,"Sesar-A-Stormurinn-a-undan-logninu":1,"Retro-Stefson-Qween":1},"badges":{"Icelandsmites":"looking left","Cheerios":"looking left","Sesar-A-Stormurinn-a-undan-logninu":"looking left","Retro-Stefson-Qween":"looking left"},"count":true},{"name":"faces","label":"today's order: most faces first","badge":"{n} faces","badge1":"1 face","low":false,"items":{},"badges":{},"count":false},{"name":"colours","label":"today's order: from black and white to Cheerios","badge":"{n} colours","badge1":"1 colour","low":true,"items":{},"badges":{},"count":false},{"name":"hair","label":"today's order: hair is the main event","badge":"hair","badge1":"","low":false,"items":{"Firehair-1":true,"hairtower":true,"Fluffyhead":true,"Bluefluffy":true,"Beardgrumphead":true},"badges":{},"count":false},{"name":"food","label":"today's order: food involved","badge":"food","badge1":"","low":false,"items":{"Cheerios":true,"Pumpkinator":true,"Grapewaves":true,"Uppskriftabok-skaldverk":true,"Toasterman-On-The-Move":true,"Kronan":true},"badges":{},"count":false},{"name":"cats","label":"today's order: cats first","badge":"cat","badge1":"","low":false,"items":{"Cat-family":true,"Adopt-this-cat":true},"badges":{},"count":false},{"name":"halli in it","label":"today's order: Halli is in these","badge":"Halli","badge1":"","low":false,"items":{"Selfie-1":true,"The-Future-Selfie":true,"Halli-lettering":true},"badges":{},"count":false},{"name":"drops","label":"today's order: drops, squirts and crumbs first","badge":"drops, squirts, crumbs","badge1":"","low":false,"items":{"Smite-The-World":true,"Uppskriftabok-skaldverk":true,"Millilending":true,"Retro-Stefson-Retro-Stefson":true,"FM-Belfast-how-to-make-friends":true,"Icelandsmites":true,"Grapewaves":true,"Automysophobia":true,"Pedro-Pilatus-album-artwork":true,"Unicef-Christmas-Card":true,"Halli-lettering":true,"Pungstoppuslayer":true,"Sitjikall":true,"Skokkikona":true,"Blue-sinker":true,"Beardgrumphead":true,"Swimbert-1":true,"Phuture-Joga":true},"badges":{},"count":false}];
  var USUAL = { name: 'usual', label: "today's order: the usual", badge: '', items: {} };
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
    return SORTS.concat(USUAL).filter(function (s) { return s.name.toLowerCase() === name; })[0] || null;
  }
  // a random sort with at least 2 projects on this page; clicking the line also offers the usual order
  function pick(seq, avoid) {
    var ok = SORTS.filter(function (s) { return s !== avoid && matching(s, seq) >= 2; });
    if (avoid && avoid !== USUAL) ok.push(USUAL);
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
      box.innerHTML = '<button type="button"><span class="hc-sort-label"></span><span class="hc-sort-again">↻ shuffle</span></button>';
      box.firstChild.addEventListener('click', function () {
        current = pick(lastSeq, current); dealt = ''; glide = true; fix();
      });
    }
    if (box.nextSibling !== th) th.parentNode.insertBefore(box, th);
    var text = box.querySelector('.hc-sort-label');
    if (text.textContent !== current.label) text.textContent = current.label;
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
    var use = innerWidth >= MIN_WIDTH ? cols.slice(0, 2) : cols;
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
    groups.forEach(function (g) { g.els.forEach(function (el) { g.h += el.offsetHeight; }); });

    // Cargo's order first; anything it doesn't know about keeps its place at the end
    var seq = [];
    projectOrder().forEach(function (id) { if (byId[id]) { seq.push(byId[id]); byId[id] = null; } });
    groups.forEach(function (g) { if (byId[g.id]) seq.push(g); });
    lastSeq = seq;

    // A new grid (first visit or another filter): keep today's sort if it still fits, else pick again
    var ids = seq.map(function (g) { return g.id; }).sort().join();
    if (ids !== gridIds) {
      gridIds = ids;
      current = wanted() || (current && current !== USUAL && matching(current, seq) >= 2 ? current : pick(seq));
    }
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

    // Badges on the matching cards
    [].slice.call(th.querySelectorAll('.hc-sort-badge')).forEach(function (b) { b.remove(); });
    seq.forEach(function (g) {
      var v = current.items[g.slug], text = v === undefined ? '' : badgeText(current, v, g.slug);
      if (!text) return;
      var b = document.createElement('span');
      b.className = 'hc-sort-badge'; b.textContent = text;
      g.els[0].classList.add('hc-sort-card'); g.els[0].appendChild(b);
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
    dealt = layoutOf(use);
    glide = false;
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
