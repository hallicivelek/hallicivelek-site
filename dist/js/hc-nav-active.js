/* hc-nav-active for hallicivelek.com: built from src/hc-nav-active.html by build.py, do not edit here */
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
window.__hcBuild = "2026-11-06 23:41";
