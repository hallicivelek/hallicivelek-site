/* hc-debug for hallicivelek.com: built from src/hc-debug.html by build.py, do not edit here */
(function () {
  if (window.__hcDebug || !/[?&]hc-debug/.test(location.search)) return;
  window.__hcDebug = true;

  var box = document.createElement('pre');
  box.style.cssText = 'position:absolute;left:8px;right:8px;z-index:100000;margin:0;padding:8px 10px;border-radius:10px;' +
    'background:rgba(255,255,255,.94);color:#111;font:12px/1.45 ui-monospace,Menlo,monospace;white-space:pre-wrap;pointer-events:none';
  var probes = ['100vh', '100svh', '100lvh', '100dvh', '100%'].map(function (h) {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;top:0;left:-10px;width:1px;visibility:hidden;pointer-events:none;height:' + h;
    return [h, d];
  });

  function r(el) {
    if (!el) return '-';
    var b = el.getBoundingClientRect();
    return 'top ' + Math.round(b.top) + ', bottom ' + Math.round(b.bottom) + ', h ' + Math.round(b.height);
  }
  function css(el) {
    var c = getComputedStyle(el);
    return 'h ' + c.height + ', overflow ' + c.overflow + ', pos ' + c.position + ', transform ' + c.transform;
  }
  function show() {
    if (!box.isConnected) {
      document.body.appendChild(box);
      probes.forEach(function (p) { document.body.appendChild(p[1]); });
    }
    var vv = window.visualViewport, se = document.scrollingElement || document.documentElement;
    var layer = document.querySelector('.hc-blobs');
    if (layer) layer.style.outline = '3px solid red';
    box.textContent = [
      navigator.userAgent.replace(/^Mozilla\/5\.0 /, ''),
      'inner ' + innerWidth + ' x ' + innerHeight + '   client ' + document.documentElement.clientWidth + ' x ' + document.documentElement.clientHeight,
      'screen ' + screen.width + ' x ' + screen.height + ' @' + devicePixelRatio,
      vv ? 'visualViewport ' + Math.round(vv.width) + ' x ' + Math.round(vv.height) + ', offsetTop ' + Math.round(vv.offsetTop) +
           ', pageTop ' + Math.round(vv.pageTop) + ', scale ' + vv.scale.toFixed(3) : 'no visualViewport',
      'scrollY ' + Math.round(scrollY) + '   scroller ' + se.tagName + ' ' + Math.round(se.scrollTop) + '   body.scrollTop ' + Math.round(document.body.scrollTop),
      'fixed heights: ' + probes.map(function (p) { return p[0] + ' ' + Math.round(p[1].getBoundingClientRect().height); }).join(', '),
      'build ' + (window.__hcBuild || '?') + '   blobs think iOS: ' + window.__hcBlobsIOS + '   layer style.height ' + (layer ? layer.style.height || 'none' : '-'),
      'blob layer: ' + r(layer),
      'pause button: ' + r(document.querySelector('.hc-pause')),
      'viewport tag: ' + ((document.querySelector('meta[name=viewport]') || {}).content || 'none'),
      'html: ' + css(document.documentElement),
      'body: ' + css(document.body) + '   class "' + document.body.className + '"'
    ].join('\n');
    var top = (vv ? vv.pageTop : scrollY) + 70;
    box.style.top = top + 'px';
    requestAnimationFrame(show);
  }
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
})();
window.__hcBuild = "2026-11-07 03:19";
