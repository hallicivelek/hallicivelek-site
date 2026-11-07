/* hc-project for hallicivelek.com: built from src/hc-project.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  #hc-pj { width: min(940px, 92vw); position: relative; left: 50%; transform: translateX(-50%); padding-bottom: 40px;\n    font-family: pacaembu, sans-serif; color: rgb(73, 46, 70); text-align: left; }\n  #hc-pj * { text-align: left; }\n  #hc-pj a.hc-pj-back { display: inline-block; font-size: 15px; font-weight: bold; color: rgb(14, 118, 128); text-decoration: none; margin: 0 0 28px; }\n  #hc-pj a.hc-pj-back:hover { background: none !important; color: rgb(14, 118, 128) !important; text-decoration: underline; }\n  #hc-pj h1 { font-family: inherit; font-size: 44px; line-height: 1.1; margin: 0 0 14px; font-weight: bold; color: inherit; text-transform: none; }\n  #hc-pj .hc-pj-lede { font-size: 22px; line-height: 1.35; margin: 0 0 44px; max-width: 700px; }\n  #hc-pj .hc-pj-text { max-width: 700px; margin: 0 0 40px; }\n  #hc-pj .hc-pj-text p { font-size: 18px; line-height: 1.6; margin: 0 0 16px; color: inherit; }\n  #hc-pj .hc-pj-text a, #hc-pj .hc-pj-lede a { color: rgb(14, 118, 128); }\n  #hc-pj .hc-pj-text a:hover, #hc-pj .hc-pj-lede a:hover { background: none !important; color: rgb(14, 118, 128) !important; }\n  #hc-pj .hc-pj-fig { margin: 0 0 44px; }\n  #hc-pj .hc-pj-fig img { display: block; width: 100%; height: auto; margin: 0; }\n  #hc-pj .hc-pj-crop { position: relative; overflow: hidden; max-width: 100%; margin: 0;\n    box-shadow: 0 1px 2px rgba(73, 46, 70, .12), 0 14px 30px -14px rgba(73, 46, 70, .35); }\n  #hc-pj .hc-pj-crop img { position: absolute; max-width: none; height: auto; }\n  #hc-pj .hc-pj-label { font-size: 17px; line-height: 1.4; margin: 0 0 10px; font-weight: bold; }\n  #hc-pj .hc-pj-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin: 0 0 44px; align-items: end; }\n  #hc-pj .hc-pj-pair .hc-pj-fig { margin: 0; }\n  #hc-pj .hc-pj-block { margin: 0 0 44px; max-width: 100%; }\n  #hc-pj .hc-pj-block iframe { max-width: 100%; }\n  #hc-pj .hc-pj-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 56px; padding: 0; list-style: none; }\n  #hc-pj .hc-pj-tags a { display: inline-block; font-size: 14px; font-weight: bold; text-decoration: none; padding: 6px 13px; border-radius: 999px;\n    background: rgba(255, 255, 255, .55); color: rgb(73, 46, 70); }\n  #hc-pj .hc-pj-tags a:hover, #hc-pj .hc-pj-tags a:focus-visible { background: #fff !important; color: rgb(73, 46, 70) !important; }\n  #hc-pj .hc-pj-pn { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; border-top: 1px solid rgba(73, 46, 70, .18); padding-top: 24px; }\n  #hc-pj .hc-pj-pn a { display: flex; gap: 14px; align-items: center; text-decoration: none; color: rgb(73, 46, 70); }\n  #hc-pj .hc-pj-pn a:hover { background: none !important; color: rgb(73, 46, 70) !important; }\n  #hc-pj .hc-pj-pn a.hc-pj-next { justify-content: flex-end; }\n  #hc-pj .hc-pj-pn a.hc-pj-next * { text-align: right; }\n  #hc-pj .hc-pj-pn img { width: 72px; height: 72px; object-fit: cover; background: #fff; padding: 4px; box-shadow: 0 1px 2px rgba(73, 46, 70, .15); flex: none; }\n  #hc-pj .hc-pj-pn small { display: block; font-size: 13px; opacity: .75; margin-bottom: 2px; }\n  #hc-pj .hc-pj-pn b { font-size: 17px; line-height: 1.25; }\n  #hc-pj a:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 3px; }\n  html.hc-pj-on .project_footer, html.hc-pj-on .project_header { display: none !important; }\n  @media (max-width: 600px) {\n    #hc-pj h1 { font-size: 32px; } #hc-pj .hc-pj-lede { font-size: 19px; }\n    #hc-pj .hc-pj-pair, #hc-pj .hc-pj-pn { grid-template-columns: 1fr; }\n    #hc-pj .hc-pj-pn a.hc-pj-next { justify-content: flex-start; flex-direction: row-reverse; }\n    #hc-pj .hc-pj-pn a.hc-pj-next * { text-align: left; }\n  }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcProject) return;
  window.__hcProject = true;

  var SEQUENCE = ['Retro-Stefson-Retro-Stefson', 'FM-Belfast-how-to-make-friends'];
  var PROJECTS = {   // Halli's changes, by project address
    'FM-Belfast-how-to-make-friends': { lede: "Visual identity, art direction and design for FM Belfast's debut album, how to make friends" },
    // the seven band photos have a white card and a shadow drawn into the picture: crop to just outside the card
    // (pixels in the 702 × 657 originals) and let the page draw its own shadow
    'Retro-Stefson-Retro-Stefson': { crop: { match: /RetroStefson-(Gylfi|Unnsteinn|Thorbjorg|Haraldur|JonIngvi|Logi|Thordur)/, size: [702, 657], box: [56, 51, 662, 599] } }
  };
  var TAG_NAMES = { artdirection: 'art direction' };
  var SMALL = 560;   // pictures narrower than this sit side by side in pairs

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
  function models() { try { return Cargo.View.Thumbnail.collection.models; } catch (e) { return []; } }
  function slugHere() { return decodeURIComponent(location.pathname.replace(/\/+$/, '').split('/').pop() || ''); }
  function projectIndex(slug) {
    var ms = models(), s = slug.toLowerCase();
    for (var i = 0; i < ms.length; i++) if (String((ms[i].attributes || {}).project_url || '').toLowerCase() === s) return i;
    return -1;
  }
  function widthOf(img) { return parseInt(img.getAttribute('width'), 10) || img.naturalWidth || 0; }
  function visibleContent() {
    var all = [].slice.call(document.querySelectorAll('.project_content'));
    return all.filter(function (p) { return p.offsetParent; })[0] || all[0] || null;
  }

  // Cargo's content as tokens: lines of text (inline elements kept), pictures, and other blocks (videos, the fold, …)
  function tokens(box) {
    var out = [], line = [];
    function endLine() { out.push({ line: line }); line = []; }
    [].slice.call(box.childNodes).forEach(function (n) {
      if (n.nodeType === 3) { if (n.textContent.replace(/\s+/g, ' ').trim()) line.push(n); return; }
      if (n.nodeType !== 1) return;
      var tag = n.tagName;
      if (tag === 'BR') { endLine(); return; }
      if (tag === 'IMG') {
        if (line.length) endLine();
        out.push(n.hasAttribute('data-hc-fold') || n.style.display === 'none' ? { hidden: n } : { img: n }); return;
      }
      if (/^(A|SPAN|B|STRONG|I|EM|SMALL|U|SUP|SUB|FONT)$/.test(tag) && !n.querySelector('img, iframe, video')) { line.push(n); return; }
      if (line.length) endLine();
      if (tag === 'A' && n.querySelector('img') && n.children.length === 1) { out.push({ img: n.querySelector('img'), link: n }); return; }
      out.push({ block: n });
    });
    if (line.length) endLine();
    // lines -> paragraphs (an empty line ends a paragraph)
    var res = [], para = null;
    out.forEach(function (t) {
      if (t.line) {
        var has = t.line.some(function (n) { return n.textContent.trim(); });
        if (!has) { para = null; return; }
        if (!para) { para = { para: [] }; res.push(para); }
        para.para.push(t.line);
      } else { para = null; res.push(t); }
    });
    return res;
  }
  function paraText(p) { return p.para.map(function (l) { return l.map(function (n) { return n.textContent; }).join(''); }).join(' ').replace(/\s+/g, ' ').trim(); }
  function paraNode(p, tag, cls) {
    var e = el(tag, cls);
    p.para.forEach(function (l, i) {
      if (i) e.appendChild(document.createTextNode(' '));
      l.forEach(function (n, k) {
        if (n.nodeType === 3) {
          var t = n.textContent.replace(/\s+/g, ' ');
          if (k === 0) t = t.replace(/^\s+/, '');
          if (k === l.length - 1) t = t.replace(/\s+$/, '');
          e.appendChild(document.createTextNode(t));
        } else e.appendChild(n);
      });
    });
    return e;
  }

  function figure(t, seq, crop) {
    var f = el('figure', 'hc-pj-fig'), w = widthOf(t.img);
    var cap = seq ? (w >= 940 ? 940 : Math.min(w || 702, 702)) : Math.min(w || 940, 940);
    f.style.maxWidth = cap + 'px';
    if (t.label) f.appendChild(t.label);
    t.img.removeAttribute('style');
    if (crop && crop.match.test(t.img.getAttribute('src') || '')) {
      var b = crop.box, cw = b[2] - b[0], ch = b[3] - b[1], box = el('div', 'hc-pj-crop');
      box.style.width = cw + 'px'; box.style.aspectRatio = cw + ' / ' + ch;
      t.img.style.width = (crop.size[0] / cw * 100) + '%';
      t.img.style.left = (-b[0] / cw * 100) + '%'; t.img.style.top = (-b[1] / ch * 100) + '%';
      box.appendChild(t.link || t.img); f.appendChild(box);
      return f;
    }
    f.appendChild(t.link || t.img);
    return f;
  }

  function build(box, slug, idx) {
    var seq = SEQUENCE.indexOf(slug) >= 0, extra = PROJECTS[slug] || {}, ms = models(), m = ms[idx].attributes || {};
    var list = tokens(box);
    var root = el('div'); root.id = 'hc-pj';
    var back = el('a', 'hc-pj-back', "← things I've made"); back.href = '/'; root.appendChild(back);
    root.appendChild(el('h1', '', String(m.title || slug).replace(/ - /g, ' – ')));

    // the first paragraph (Halli's "what and for whom") becomes the opening line, above the first picture
    var first = list.findIndex ? list.findIndex(function (t) { return t.para; }) : -1;
    var imgsBefore = first > 0 ? list.slice(0, first).filter(function (t) { return t.img || t.block; }).length : 0;
    if (first >= 0 && imgsBefore <= 1) {
      var p = list.splice(first, 1)[0], lede = paraNode(p, 'p', 'hc-pj-lede');
      if (extra.lede) lede.textContent = extra.lede;
      root.appendChild(lede);
    } else if (extra.lede) root.appendChild(el('p', 'hc-pj-lede', extra.lede));

    // a short one-line paragraph right before a picture is that picture's label
    for (var i = 0; i < list.length - 1; i++) {
      var t = list[i], n = list[i + 1];
      if (t.para && t.para.length === 1 && n.img && paraText(t).length <= 60) {
        n.label = paraNode(t, 'p', 'hc-pj-label'); list.splice(i, 1); i--;
      }
    }

    var text = null;
    for (var k = 0; k < list.length; k++) {
      var tk = list[k];
      if (tk.para) {
        if (!text) { text = el('div', 'hc-pj-text'); root.appendChild(text); }
        text.appendChild(paraNode(tk, 'p')); continue;
      }
      text = null;
      if (tk.hidden) { root.appendChild(tk.hidden); continue; }
      if (tk.block) { var b = el('div', 'hc-pj-block'); if (tk.block.classList.contains('hc-fold')) root.appendChild(tk.block); else { b.appendChild(tk.block); root.appendChild(b); } continue; }
      // pairs of small pictures (not in sequence projects)
      var nx = list[k + 1];
      if (!seq && nx && nx.img && !nx.label && widthOf(tk.img) && widthOf(tk.img) < SMALL && widthOf(nx.img) < SMALL) {
        var pair = el('div', 'hc-pj-pair'); pair.appendChild(figure(tk, false)); pair.appendChild(figure(nx, false));
        [].forEach.call(pair.children, function (f) { f.style.maxWidth = ''; });
        root.appendChild(pair); k++; continue;
      }
      root.appendChild(figure(tk, seq, extra.crop));
    }

    // Cargo's tags as buttons
    var tags = [].slice.call(document.querySelectorAll('.project_footer a[href*="/filter/"]'));
    if (tags.length) {
      var ul = el('ul', 'hc-pj-tags');
      tags.forEach(function (a) {
        var li = el('li'), c = el('a', '', TAG_NAMES[a.textContent.trim()] || a.textContent.trim()); c.href = a.getAttribute('href');
        li.appendChild(c); ul.appendChild(li);
      });
      root.appendChild(ul);
    }
    // previous / next in Halli's order
    if (ms.length > 1) {
      var pn = el('nav', 'hc-pj-pn'); pn.setAttribute('aria-label', 'more projects');
      [[-1, '← previous', 'hc-pj-prev'], [1, 'next →', 'hc-pj-next']].forEach(function (d) {
        var mm = ms[(idx + d[0] + ms.length) % ms.length], at = mm.attributes || {};
        var a = el('a', d[2]); a.href = '/' + at.project_url;
        var th = document.querySelector('.thumbnail[name="' + mm.id + '"] img');
        var words = el('span'); words.appendChild(el('small', '', d[1])); words.appendChild(el('b', '', String(at.title || at.project_url).replace(/ - /g, ' – ')));
        if (th) { var im = el('img'); im.src = th.currentSrc || th.src; im.alt = ''; im.loading = 'lazy'; a.appendChild(im); }
        if (d[0] > 0) a.insertBefore(words, a.firstChild); else a.appendChild(words);
        pn.appendChild(a);
      });
      root.appendChild(pn);
    }
    var keep = el('div'); keep.setAttribute('data-hc-pj-rest', ''); keep.style.display = 'none';
    while (box.firstChild) keep.appendChild(box.firstChild);
    box.appendChild(root); box.appendChild(keep);
  }

  function check() {
    var slug = slugHere(), idx = slug ? projectIndex(slug) : -1;
    var box = idx >= 0 ? visibleContent() : null;
    document.documentElement.classList.toggle('hc-pj-on', !!box);
    if (box && !box.querySelector('#hc-pj')) build(box, String(models()[idx].attributes.project_url), idx);
  }
  var pending = null;
  new MutationObserver(function () { clearTimeout(pending); pending = setTimeout(check, 150); })
    .observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('popstate', function () { setTimeout(check, 150); });
  check();
})();
window.__hcBuild = "2026-11-07 00:52";
