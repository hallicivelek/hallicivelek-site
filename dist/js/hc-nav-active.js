/* hc-nav-active for hallicivelek.com: built from src/hc-nav-active.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  .site_header .navigation li a, .site_header .navigation li.link_active a { color: rgb(73, 46, 70) !important; font-weight: 500 !important;\n    display: inline-block; transition: font-weight .15s ease; }\n  .site_header .navigation li a::after { content: attr(data-text); display: block; height: 0; overflow: hidden; visibility: hidden; pointer-events: none;\n    font-weight: 800 !important; }\n  .site_header .navigation li a:hover, .site_header .navigation li a:focus-visible, .site_header .navigation li.link_active a,\n  .site_header .navigation li a[aria-current=\"page\"] { color: rgb(73, 46, 70) !important; font-weight: 800 !important; }\n  @media (prefers-reduced-motion: reduce) { .site_header .navigation li a { transition: none; } }\n  /* The \"Halli Civelek\" logo (a 565x110 PNG set in Cargo's header): 36px tall on desktop by Cargo's default, now 44px, still sharp on\n     2x screens and clear of the header's 64px line. Phones already show it at about 47px and are left alone. */\n  @media (min-width: 769px) { .site_header .header_image, .site_header .header_image img { height: 44px !important; width: auto !important; max-height: none !important; max-width: none !important; } }\n  /* The back link on every page that has one (← things I've made on projects and tag pages, ← Paco Benovo, ← playthings): the\n     nav's language, plum, 700 at rest and 800 on hover / focus, no underline, no teal. Each carries data-text (its own words) so the\n     800 weight is reserved and nothing moves. 44px to tap; the negative top margin keeps the words where a 15px link used to sit. */\n  a.hc-bk, a.hc-bk:visited { display: inline-flex; flex-direction: column; align-items: flex-start; justify-content: center; min-height: 44px; margin: -8px 0 20px;\n    padding: 0 16px 0 0; font-size: 16px; font-weight: 700 !important; line-height: 1.3; color: rgb(73, 46, 70) !important; text-decoration: none !important;\n    background: none !important; border-radius: 6px; transition: font-weight .15s ease; }\n  a.hc-bk::after { content: attr(data-text); display: block; height: 0; overflow: hidden; visibility: hidden; pointer-events: none; font-weight: 800; }\n  a.hc-bk:hover, a.hc-bk:focus-visible { font-weight: 800 !important; color: rgb(73, 46, 70) !important; text-decoration: none !important; background: none !important; }\n  a.hc-bk:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 0; }\n  @media (prefers-reduced-motion: reduce) { a.hc-bk { transition: none; } }\n\n\n  html:not(.hc-pj-ready) .project_content { opacity: 0 !important; }\n  .project_content { transition: opacity .25s ease; }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcNav) return;
  window.__hcNav = true;

  function clean(path) { return path.replace(/\/+$/, '') || '/'; }

  // The playthings' own pages (the local ones on the cards in hc-playthings; the others live on other sites), lower case.
  // One list, used here for the nav and for the project-wait script below. A test checks it against hc-playthings.
  var PLAY = ['birth-a-blob', 'paco-benovo', 'palette-piano', 'the-blob-pond', 'blob-pond'];
  function isPlaything(path) { return PLAY.indexOf(clean(path).replace(/^\//, '').toLowerCase()) >= 0; }
  // A project page: hc-project has laid it out (#hc-pj, with its back link), or Cargo's own mark on <body> says so
  function isProject() {
    var b = document.body;
    return !!(document.getElementById('hc-pj') || document.querySelector('a.hc-pj-back') || (b && b.getAttribute('data-pagetype') === 'project'));
  }
  function linkPath(a) { try { return clean(new URL(a.href, location.href).pathname); } catch (e) { return null; } }

  function mark() {
    var links = [].slice.call(document.querySelectorAll('.site_header .navigation a'));
    if (!links.length) return;
    var here = clean(location.pathname);
    links.forEach(function (a) { a.setAttribute('data-text', a.textContent.replace(/\s+/g, ' ').trim()); });   // width reserve for the 800 weight

    // undo our own marking from the previous page
    links.forEach(function (a) {
      if (a.parentElement.hasAttribute('data-hc-active')) {
        a.parentElement.classList.remove('link_active');
        a.parentElement.removeAttribute('data-hc-active');
      }
      a.removeAttribute('aria-current');
    });

    function to(p) { return links.filter(function (a) { return linkPath(a) === p; })[0]; }
    var active = links.filter(function (a) { return a.parentElement.classList.contains('link_active'); })[0];
    if (!active) {
      // Cargo didn't mark anything: find the link for this page (or a page inside it)
      active = links.filter(function (a) {
        var p = linkPath(a);
        return p && p !== '/' && (here === p || here.indexOf(p + '/') === 0);
      })[0];
      // a plaything's page belongs to "playthings"; the front page and every project belong to "things I've made"
      if (!active && isPlaything(here)) active = to('/playthings');
      if (!active && (here === '/' || isProject())) active = to('/');
      if (active) {
        active.parentElement.classList.add('link_active');
        active.parentElement.setAttribute('data-hc-active', '');
      }
    }
    if (active) active.setAttribute('aria-current', 'page');
  }

  // Cargo changes pages without reloading, so check again whenever the page changes
  // (a project is only known once Cargo has marked <body> or hc-project has built #hc-pj, a moment after the address changes,
  // so the page's kind is part of what we compare, not just its address)
  var lastKey = null, pending = null;
  function check() {
    clearTimeout(pending);
    pending = setTimeout(function () {
      var key = location.pathname + '|' + isProject();
      if (key !== lastKey || !document.querySelector('.site_header [aria-current]')) {
        lastKey = key;
        mark();
      }
    }, 80);
  }
  new MutationObserver(check).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-pagetype'] });
  addEventListener('popstate', check);
  document.addEventListener('DOMContentLoaded', check);
  check();
})();
(function () {
  if (window.__hcPjWait) return;
  window.__hcPjWait = true;
  var PAGES = /^\/(playthings|paco-benovo|palette-piano|music(-?mixes)?(-\d+)?|about-me|info-contact|the-blob-pond|blob-?pond|filter\/[^/]+)?\/?$/i;   // never projects
  var timer = null, root = document.documentElement;
  function ready() { clearTimeout(timer); root.classList.add('hc-pj-ready'); }
  function wait(path) {
    if (PAGES.test(path)) { ready(); return; }
    root.classList.remove('hc-pj-ready');
    clearTimeout(timer); timer = setTimeout(ready, 2500);
  }
  window.__hcPjReady = ready;
  wait(location.pathname);
  // Cargo opens projects without reloading: hide as soon as a link to one is clicked
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var u; try { u = new URL(a.href, location.href); } catch (x) { return; }
    if (u.host === location.host && u.pathname !== location.pathname) wait(u.pathname);
  }, true);
  addEventListener('popstate', function () { wait(location.pathname); });
})();
window.__hcBuild = "2026-11-18 16:51";
