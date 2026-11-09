/* hc-stylecheck for hallicivelek.com: built from src/hc-stylecheck.html by build.py, do not edit here */
(function () {
  if (window.__hcStyleCheck) return;
  var state = window.__hcStyleCheck = { checked: false, broken: false, fixed: false, tries: 0 };

  function cargoLink() {
    return [].filter.call(document.querySelectorAll('link[rel~="stylesheet"]'), function (l) {
      try { var p = new URL(l.href, location.href); return p.origin === location.origin && (p.pathname === '/stylesheet' || p.pathname === '/stylesheet/'); }
      catch (e) { return false; }
    })[0];
  }

  // 'ok', 'broken' or 'wait' (still loading: Firefox throws on cssRules until it is done)
  function status(link) {
    if (!link.sheet) return link.hcFailed ? 'broken' : 'wait';
    try { return link.sheet.cssRules.length ? 'ok' : 'broken'; } catch (e) { return 'wait'; }
  }

  function repair(link) {
    state.tries++;
    fetch(link.href, { cache: 'reload', credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .catch(function () { return ''; })
      .then(function (css) {
        if (css.trim()) {
          var s = document.createElement('style');
          s.setAttribute('data-hc-stylecheck', '');
          s.textContent = css;
          link.parentNode.insertBefore(s, link.nextSibling);   // same place in the cascade as Cargo's link
          state.fixed = true;
        } else if (state.tries < 3) {
          setTimeout(function () { repair(link); }, state.tries * 2500);
        }
      });
  }

  function check(link) {
    if (state.checked) return;
    var st = status(link);
    if (st === 'wait') return;
    state.checked = true;
    if (st === 'broken') { state.broken = true; repair(link); }
  }

  function start() {
    var link = cargoLink();
    if (!link) return;
    link.addEventListener('load', function () { check(link); });
    link.addEventListener('error', function () { link.hcFailed = true; check(link); });
    check(link);
    if (document.readyState === 'complete') { link.hcFailed = link.hcFailed || !link.sheet; check(link); }
    else window.addEventListener('load', function () { if (!link.sheet) link.hcFailed = true; check(link); });
  }

  start();
})();
window.__hcBuild = "2026-11-09 14:51";
