/* hc-nav-active for hallicivelek.com: built from src/hc-nav-active.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  html:not(.hc-pj-ready) .project_content { opacity: 0 !important; }\n  .project_content { transition: opacity .25s ease; }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcNav) return;
  window.__hcNav = true;

  function clean(path) { return path.replace(/\/+$/, '') || '/'; }

  function mark() {
    var links = [].slice.call(document.querySelectorAll('.site_header .navigation a'));
    if (!links.length) return;
    var here = clean(location.pathname);

    // undo our own marking from the previous page
    links.forEach(function (a) {
      if (a.parentElement.hasAttribute('data-hc-active')) {
        a.parentElement.classList.remove('link_active');
        a.parentElement.removeAttribute('data-hc-active');
      }
      a.removeAttribute('aria-current');
    });

    var active = links.filter(function (a) { return a.parentElement.classList.contains('link_active'); })[0];
    if (!active) {
      // Cargo didn't mark anything: find the link for this page (or a page inside it)
      active = links.filter(function (a) {
        var p;
        try { p = clean(new URL(a.href, location.href).pathname); } catch (e) { return false; }
        return p !== '/' && (here === p || here.indexOf(p + '/') === 0);
      })[0];
      if (active) {
        active.parentElement.classList.add('link_active');
        active.parentElement.setAttribute('data-hc-active', '');
      }
    }
    if (active) active.setAttribute('aria-current', 'page');
  }

  // Cargo changes pages without reloading, so check again whenever the page changes
  var lastPath = null, pending = null;
  function check() {
    clearTimeout(pending);
    pending = setTimeout(function () {
      if (location.pathname !== lastPath || !document.querySelector('.site_header [aria-current]')) {
        lastPath = location.pathname;
        mark();
      }
    }, 80);
  }
  new MutationObserver(check).observe(document.body, { childList: true, subtree: true });
  addEventListener('popstate', check);
  document.addEventListener('DOMContentLoaded', check);
  check();
})();
(function () {
  if (window.__hcPjWait) return;
  window.__hcPjWait = true;
  var PAGES = /^\/(playthings|music(-?mixes)?(-\d+)?|about-me|info-contact|the-blob-pond|blob-?pond|filter\/[^/]+)?\/?$/i;   // never projects
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
window.__hcBuild = "2026-11-07 20:08";
