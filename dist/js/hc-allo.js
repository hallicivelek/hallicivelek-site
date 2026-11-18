/* hc-allo for hallicivelek.com: built from src/hc-allo.html by build.py, do not edit here */
(function () {
  if (window.__hcAllo) return;
  window.__hcAllo = true;
  var FALLBACK = 'https://hallicivelek.github.io/hallicivelek-site/assets/fonts/allo-variable.woff2';
  var url = FALLBACK;
  try { var me = document.currentScript; if (me && me.src) url = new URL('../../assets/fonts/allo-variable.woff2', me.src).href; } catch (e) {}

  var pre = document.createElement('link');
  pre.rel = 'preload'; pre.as = 'font'; pre.type = 'font/woff2'; pre.href = url; pre.crossOrigin = 'anonymous';
  document.head.appendChild(pre);

  var TEXT = 'html, body, body *:not(svg):not(svg *):not(code):not(pre):not(kbd):not(samp):not(.hc-keep-font), body *::before, body *::after, ::placeholder';
  var css = '@font-face { font-family: Allo; src: url(' + url + ') format("woff2"); font-weight: 100 900; font-stretch: 100%; font-style: normal; font-display: swap; } '
    + TEXT + ' { font-family: Allo, ui-rounded, system-ui, sans-serif !important; font-variation-settings: "ROND" 65 !important; font-optical-sizing: auto !important; } ';
  /* Phones: body text two pixels larger. On the about page Halli's paragraphs are plain (16px, inherited from Cargo) or carry an inline
     font-size of 15px; both go up by 2px. Desktop and the add-ons' own containers (#hc-pj, #hc-mu, #hc-pt, #hc-pp: ID rules) are unchanged. */
  css += '@media (max-width: 600px) { '
    + '  body .project_content p { font-size: 18px; } '
    + '  body .project_content [style*="font-size:15px"], body .project_content [style*="font-size: 15px"] { font-size: 17px !important; } '
    + '  body .project_content [style*="font-size:16px"], body .project_content [style*="font-size: 16px"] { font-size: 18px !important; }} ';
  /* About (Cargo page id 4440666, the .entry's data-id, so no other page is touched): the name 900 (its inline weight is "bold", hence !important),
     the "More, if you're curious" rows 800, and plain paragraphs 18px on every width (paragraphs with their own inline font-size keep it). */
  var AB = '#project .entry[data-id="4440666"]';
  css += AB + ' h1 { font-weight: 900 !important; } ' + AB + ' details > summary { font-weight: 800; } ' + AB + ' .project_content p { font-size: 18px; } ' + AB + ' h3 { font-weight: 900 !important; } ';
  /* Links in Cargo page text were Cargo's pure black; give them the site's plum ink like the rest of the text (a link with its own inline colour keeps it). */
  css += 'body .project_content a:not([style*="color"]) { color: rgb(73, 46, 70); } ';
  var st = document.createElement('style');
  st.id = 'hc-allo-style';
  st.textContent = css;
  document.head.appendChild(st);
  if (document.fonts && document.fonts.load) { try { document.fonts.load('400 16px Allo'); document.fonts.load('700 16px Allo'); } catch (e) {} }
})();
window.__hcBuild = "2026-11-17 23:56";
