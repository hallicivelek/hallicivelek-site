/* hc-pond for hallicivelek.com: built from dist/hc-pond.html by build.py, do not edit here */
(function () {
  if (window.__hcPondLoader) return;
  window.__hcPondLoader = true;
  var POND_PAGE = /blob-?pond/i;
  var mounted = false, hidden = false;
  // ?hc-preview inside another page (the playthings card): no header, no wake screen, no controls, so no sound
  var PREVIEW = /[?&]hc-preview(&|$)/.test(location.search) && window.self !== window.top;

  function headerHeight() {
    var h = document.querySelector('.site_header');
    var m = document.querySelector('.mobile_site_header');
    var hh = h ? h.getBoundingClientRect().height : 0, mh = m ? m.getBoundingClientRect().height : 0;
    return Math.max(hh, mh);
  }
  function mount() {
    mounted = true;
    // no font to load: the pond uses the site's own typeface (pacaembu), already on the page
    var style = document.createElement('style');
    style.textContent = POND_CSS;
    document.head.appendChild(style);
    var root = document.createElement('div');
    root.id = 'hc-pond';
    root.innerHTML = POND_MARKUP;
    document.body.appendChild(root);
    document.documentElement.classList.add('hc-pond-on');
    if (PREVIEW) document.documentElement.classList.add('hc-pond-preview');
    var setTop = function () { root.style.setProperty('--hdr', (PREVIEW ? 0 : headerHeight()) + 'px'); };
    setTop(); addEventListener('resize', setTop); document.addEventListener('DOMContentLoaded', setTop);
    POND_JS();
  }
  function check() {
    var here = POND_PAGE.test(location.pathname) || window.__hcPondForce;
    if (here && !mounted) mount();
    else if (mounted && !here && !hidden) {          // left without a reload: put it to sleep and hide it
      hidden = true; document.getElementById('hc-pond').style.display = 'none';
      document.documentElement.classList.remove('hc-pond-on');
      if (window.__hcPondSleep) window.__hcPondSleep();
    } else if (mounted && here && hidden) {          // came back
      hidden = false; document.getElementById('hc-pond').style.display = '';
      document.documentElement.classList.add('hc-pond-on');
      if (window.__hcPondWake) window.__hcPondWake();
    }
  }
  var POND_CSS = '#hc-pond {\n    --bg: #F3DCDF; --ink: #492E46; --soft: rgba(73, 46, 70, .62); --line: rgba(73, 46, 70, .24);\n    --card: #fff; --edge: rgba(73, 46, 70, .16); --focus: #3BBFC9;\n    box-sizing: border-box;\n    }\n@media (prefers-color-scheme: dark) { #hc-pond {\n      --bg: #241B28; --ink: #F1E6EE; --soft: rgba(241, 230, 238, .62); --line: rgba(241, 230, 238, .2);\n      --card: rgba(46, 35, 52, .92); --edge: rgba(241, 230, 238, .18);\n    } }\n#hc-pond.night {\n    --bg: #241B28; --ink: #F1E6EE; --soft: rgba(241, 230, 238, .62); --line: rgba(241, 230, 238, .2);\n    --card: rgba(46, 35, 52, .92); --edge: rgba(241, 230, 238, .18);\n  }\nhtml.hc-pond-on, html.hc-pond-on body { overflow: hidden; }\n#hc-pond { position: fixed; top: 0; left: 0; right: 0; height: 100vh; height: 100lvh; z-index: 999; text-align: left; line-height: normal;\n    background: var(--bg); color: var(--ink); overflow: hidden;\n    font-family: pacaembu, "Nunito", ui-rounded, system-ui, sans-serif; font-size: 15px; letter-spacing: .04em;   \n    transition: background-color 2s ease;\n  }\n#hc-pond #hcp-pond { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; height: 100lvh; display: block; touch-action: none; }\n#hc-pond .hcp-caption {\n    position: fixed; left: 20px; top: calc(var(--hdr, 0px) + 14px); margin: 0;\n    font-size: 14px; color: var(--soft); pointer-events: none; max-width: calc(100% - 40px);\n  }\n#hc-pond .hcp-caption strong { color: var(--ink); font-weight: 700; }\n#hc-pond .hcp-caption .hcp-scaleLink {          \n    pointer-events: auto; font: inherit; letter-spacing: inherit; color: inherit; background: none; border: 0; padding: 0; margin: 0;\n    cursor: pointer; text-decoration: underline dotted; text-underline-offset: 3px; }\n#hc-pond .hcp-caption .hcp-scaleLink:hover { color: var(--ink); }\n#hc-pond .hcp-tray {\n    position: fixed; left: 50%; bottom: calc(14px + env(safe-area-inset-bottom, 0px)); transform: translateX(-50%);\n    display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 8px; width: max-content; max-width: calc(100% - 24px);\n  }\n#hc-pond .hcp-chip, #hc-pond .hcp-tool {\n    display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 999px;\n    border: 0; background: var(--card); color: var(--ink); font: inherit; font-size: 14px; cursor: pointer;\n  }\n#hc-pond .hcp-chip .hcp-dot { width: 12px; height: 12px; border-radius: 50%; flex: none; }\n#hc-pond .hcp-chip[aria-pressed="false"] { color: var(--soft); }\n#hc-pond .hcp-chip[aria-pressed="false"] .hcp-dot { background: transparent !important; box-shadow: inset 0 0 0 2px currentColor; }\n#hc-pond .hcp-chip .hcp-voice { color: var(--soft); }\n#hc-pond .hcp-tool svg { width: 14px; height: 14px; flex: none; }\n#hc-pond .hcp-volume { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 999px;\n    border: 0; background: var(--card); font-size: 14px; }\n#hc-pond .hcp-volume input { width: 96px; accent-color: var(--ink); }\n#hc-pond .hcp-gap { width: 10px; }\n#hc-pond .hcp-panel {\n    position: absolute; left: 50%; bottom: calc(100% + 10px); transform: translateX(-50%);\n    overflow-y: auto; overscroll-behavior: contain;   \n    width: min(560px, calc(100vw - 24px)); box-sizing: border-box; padding: 14px; border-radius: 16px;\n    border: 0; background: var(--card); display: flex; flex-direction: column; gap: 12px;\n  }\n#hc-pond .hcp-panel[hidden] { display: none; }\n#hc-pond .hcp-panel .hcp-kinds, #hc-pond .hcp-panel .hcp-count { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }\n#hc-pond .hcp-panel .hcp-kinds { padding: 0 44px; }\n#hc-pond .hcp-panel .hcp-close {\n    position: absolute; top: 8px; right: 8px; width: 44px; height: 44px; border: 0; border-radius: 50%;\n    background: var(--bg); color: var(--ink); display: grid; place-items: center; cursor: pointer; padding: 0; }\n#hc-pond .hcp-panel .hcp-close svg { width: 14px; height: 14px; }\n#hc-pond .hcp-panel .hcp-scale { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 8px; }\n#hc-pond .hcp-pick { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 8px 0 16px; border-radius: 999px; font-size: 14px; }\n#hc-pond .hcp-pick select { font: inherit; letter-spacing: inherit; color: var(--ink); background: transparent; border: 0; padding: 8px 4px; cursor: pointer; }\n#hc-pond .hcp-panel .hcp-chip, #hc-pond .hcp-panel .hcp-tool, #hc-pond .hcp-panel .hcp-pick { background: var(--bg); }\n#hc-pond #hcp-blobsToggle svg { transition: transform .2s ease; }\n#hc-pond #hcp-blobsToggle[aria-expanded="true"] svg { transform: rotate(180deg); }\n#hc-pond .hcp-dots { display: inline-flex; align-items: center; gap: 3px; }\n#hc-pond .hcp-dots:empty { display: none; }\n#hc-pond .hcp-dots i { display: block; width: 9px; height: 9px; border-radius: 50%; }\n#hc-pond .hcp-dots em { font-style: normal; font-size: 12px; color: var(--soft); margin-left: 2px; }\n#hc-pond .hcp-panel .hcp-count { align-items: center; }\n#hc-pond .hcp-howmany { font-size: 13px; color: var(--soft); padding: 0 6px; }\n#hc-pond .hcp-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }\n#hc-pond .hcp-tool[disabled] { opacity: .4; cursor: default; }\n#hc-pond button:focus-visible, #hc-pond input:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }\n#hc-pond .hcp-wake {\n    position: fixed; inset: 0; display: grid; place-items: center; padding: 20px;\n    background: color-mix(in srgb, var(--bg) 55%, transparent); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);\n  }\n#hc-pond .hcp-wake[hidden] { display: none; }\n#hc-pond .hcp-wake .hcp-card { max-width: 440px; background: var(--card); border-radius: 16px; padding: 32px 32px 30px; text-align: center; }\n#hc-pond .hcp-wake h1 { margin: 0 0 12px; font-size: 36px; line-height: 1.3; font-weight: 700; letter-spacing: normal; }\n#hc-pond .hcp-wake p { margin: 0 0 24px; font-size: 16px; line-height: 1.8; color: var(--ink); }\n#hc-pond .hcp-wake .hcp-nw { white-space: nowrap; }\n#hc-pond .hcp-wake button {\n    min-height: 48px; padding: 0 22px; border-radius: 999px; border: 0; background: var(--ink); color: var(--bg);\n    font: inherit; font-size: 16px; font-weight: 700; cursor: pointer;\n  }\n@media (max-width: 600px) { #hc-pond .hcp-panel { padding-top: 58px; } #hc-pond .hcp-panel .hcp-kinds { padding: 0; } }\n#hc-pond *, #hc-pond *::before, #hc-pond *::after { box-sizing: border-box; }\n#hc-pond button { letter-spacing: normal; text-transform: none; }\n#hc-pond h1, #hc-pond p, #hc-pond button, #hc-pond label, #hc-pond input, #hc-pond span, #hc-pond strong { font-family: inherit; }\n#hc-pond h1 { color: var(--ink); text-transform: none; }\nhtml.hc-pond-on .site_header, html.hc-pond-on .mobile_site_header, html.hc-pond-on .link_active a { background-color: #F3DCDF !important; }\nhtml.hc-pond-on .hc-blobs, html.hc-pond-on .hc-pause { display: none !important; }\nhtml.hc-pond-on.hc-pond-preview .site_header, html.hc-pond-on.hc-pond-preview .mobile_site_header { display: none !important; }\nhtml.hc-pond-on.hc-pond-preview #hc-pond { z-index: 2147483000; }\nhtml.hc-pond-on.hc-pond-preview #hc-pond #hcp-wake, html.hc-pond-on.hc-pond-preview #hc-pond .hcp-tray, html.hc-pond-on.hc-pond-preview #hc-pond #hcp-caption { display: none !important; }\n';
  var POND_MARKUP = '<svg id="hcp-pond" aria-hidden="true"></svg>\n\n<p class="hcp-caption" id="hcp-caption"></p>\n\n<div class="hcp-tray" role="group" aria-label="pond controls">\n  <div class="hcp-panel" id="hcp-blobPanel" hidden>\n    <button class="hcp-close" id="hcp-blobClose" type="button" aria-label="close blobs &amp; sounds"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>\n    <div class="hcp-kinds" id="hcp-chips"></div>\n    <div class="hcp-count">\n      <button class="hcp-tool" id="hcp-fewer" type="button"><svg viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="6" width="10" height="2" rx="1" fill="currentColor"/></svg>fewer blobs</button>\n      <span class="hcp-howmany" id="hcp-howMany"></span>\n      <button class="hcp-tool" id="hcp-more" type="button"><svg viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="6" width="10" height="2" rx="1" fill="currentColor"/><rect x="6" y="2" width="2" height="10" rx="1" fill="currentColor"/></svg>more blobs</button>\n    </div>\n    <div class="hcp-scale">\n      <label class="hcp-pick" for="hcp-scalePick">scale <select id="hcp-scalePick"></select></label>\n      <button class="hcp-tool" id="hcp-surprise" type="button"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1l1.4 4.6L13 7l-4.6 1.4L7 13l-1.4-4.6L1 7l4.6-1.4z" fill="currentColor"/></svg>surprise me</button>\n      <span class="hcp-sr" id="hcp-scaleSr" aria-live="polite"></span>\n    </div>\n  </div>\n  <button class="hcp-tool" id="hcp-blobsToggle" type="button" aria-expanded="false" aria-controls="hcp-blobPanel"><span class="hcp-dots" id="hcp-blobDots" aria-hidden="true"></span>blobs &amp; sounds<span class="hcp-sr" id="hcp-blobSr"></span><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 9l4-4 4 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>\n  <label class="hcp-volume">volume <input id="hcp-volume" type="range" min="0" max="1" step="0.01" value="0.7"></label>\n  <button class="hcp-tool" id="hcp-pause" type="button"></button>\n</div>\n\n<div class="hcp-wake" id="hcp-wake">\n  <div class="hcp-card">\n    <h1>the blob-pond</h1>\n    <p>blob blob! The blobs float across lines and play them, each with its own sound and movement. Are you a <span class="hcp-nw">blob-poker</span> or a <span class="hcp-nw">blob-watcher</span>? Choose who lives in the <span class="hcp-nw">blob-pond</span> under “blobs &amp; sounds” at the bottom. Sound on!</p>\n    <button type="button" id="hcp-wakeBtn">enter the blob-pond</button>\n  </div>\n</div>';
  function POND_JS() {
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.getElementById('hcp-pond');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function rand(a, b) { return a + Math.random() * (b - a); }

  /* ---------- time of day in Reykjavík sets the key and pace ---------- */
  function reykjavikNow() {
    var d = new Date();          // Iceland is on UTC all year
    return { h: d.getUTCHours(), m: d.getUTCMinutes() };
  }
  var MOODS = {          // the time of day picks the key, the pace and the default scale
    morning: { root: 62, scale: 'majpent', pace: 1.0,  night: false },
    day:     { root: 65, scale: 'majpent', pace: 1.0,  night: false },
    evening: { root: 57, scale: 'hirajoshi', pace: 0.85, night: false },
    night:   { root: 52, scale: 'minpent', pace: 0.7,  night: true }
  };
  // Scales: steps in semitones from the key note. Fractions are fine, because the pond tunes every note itself,
  // so it can play tunings no piano can. 'period' is where the scale repeats (12 = an octave).
  var SCALES = {
    majpent:   { name: 'major pentatonic', steps: [0, 2, 4, 7, 9] },
    minpent:   { name: 'minor pentatonic', steps: [0, 3, 5, 7, 10] },
    lydian:    { name: 'lydian',           steps: [0, 2, 4, 6, 7, 9, 11] },
    dorian:    { name: 'dorian',           steps: [0, 2, 3, 5, 7, 9, 10] },
    whole:     { name: 'whole-tone',       steps: [0, 2, 4, 6, 8, 10] },
    hirajoshi: { name: 'hirajoshi',        steps: [0, 2, 3, 7, 8] },
    slendro:   { name: 'slendro',          steps: [0, 2.4, 4.8, 7.2, 9.6] },              // five near-equal steps, gamelan-style
    pelog:     { name: 'pelog',            steps: [0, 1.2, 2.7, 6.7, 7.85] },             // an approximation: every gamelan has its own tuning
    harmonic:  { name: 'harmonic series',  steps: [8, 9, 10, 11, 12, 13, 14].map(function (h) { return 12 * Math.log2(h / 8); }) },
    bp:        { name: 'bohlen–pierce',    steps: [0, 2, 3, 4, 6, 7, 9, 10, 12].map(function (s) { return s * 19.0196 / 13; }),
                 period: 19.0196, secret: true }                                            // no octaves: repeats at three times the frequency
  };
  function moodName(h) { return h >= 5 && h < 11 ? 'morning' : h >= 11 && h < 17 ? 'day' : h >= 17 && h < 22 ? 'evening' : 'night'; }
  var forced = (location.hash || '').slice(1);          // #morning, #day, #evening or #night to try a mood
  var moodKey = MOODS[forced] ? forced : moodName(reykjavikNow().h);
  var mood = MOODS[moodKey];
  document.getElementById('hc-pond').classList.toggle('night', mood.night);
  // which scale: 'time' follows the time of day; on about one visit in thirty, something strange happens
  var chosen = SCALES[forced] ? forced : (Math.random() < 1 / 30 ? 'bp' : 'time');
  var strange = chosen === 'bp' && !SCALES[forced];
  function scaleId() { return chosen === 'time' ? mood.scale : chosen; }
  var NOTE = ['c', 'c♯', 'd', 'e♭', 'e', 'f', 'f♯', 'g', 'a♭', 'a', 'b♭', 'b'];
  function scaleLabel() { return SCALES[scaleId()].name; }
  // the caption is built once and then only its words change, so a keyboard user's focus on the scale button survives
  document.getElementById('hcp-caption').innerHTML = '<strong id="hcp-capWhere"></strong><span id="hcp-capScaleWrap">, <button type="button" class="hcp-scaleLink" id="hcp-capScale">' +
    '<span aria-hidden="true">♪ </span><span class="hcp-sr">scale: </span><span id="hcp-capScaleName"></span></button></span>, <span id="hcp-capTime"></span>';
  function drawCaption() {
    var n = reykjavikNow();
    document.getElementById('hcp-capWhere').textContent = strange ? 'something strange in reykjavík' : moodKey + ' in reykjavík';
    document.getElementById('hcp-capScaleWrap').hidden = strange;          // the secret stays a secret
    document.getElementById('hcp-capScaleName').textContent = scaleLabel();
    document.getElementById('hcp-capTime').textContent = String(n.h).padStart(2, '0') + ':' + String(n.m).padStart(2, '0');
  }
  drawCaption(); setInterval(drawCaption, 30000);

  /* ---------- the lines (strings) ---------- */
  // the pond measures its own drawing area rather than trusting the window size: on phones, Cargo switches
  // to the real screen width only after this script has started, and Safari doesn't always say so
  var r0 = svg.getBoundingClientRect(), W = Math.round(r0.width) || innerWidth, H = Math.round(r0.height) || innerHeight, NL = 7, lines = [];
  function zoom() { return W < 600 ? 0.75 : 1; }   // narrow screens: blobs drawn a bit smaller, a zoomed-out feel
  var gLines = document.createElementNS(NS, 'g'), gBlobs = document.createElementNS(NS, 'g'), defs = document.createElementNS(NS, 'defs');
  svg.appendChild(defs); svg.appendChild(gLines); svg.appendChild(gBlobs);
  function buildLines() {
    gLines.innerHTML = ''; lines = [];
    for (var k = 0; k < NL; k++) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('fill', 'none'); p.setAttribute('stroke', 'var(--line)'); p.setAttribute('stroke-width', '1.5'); p.setAttribute('stroke-linecap', 'round');
      gLines.appendChild(p);
      lines.push({ el: p, y: H * (0.15 + 0.66 * k / (NL - 1)), slope: rand(-0.05, 0.05) * H, bendA: rand(5, 14), bendPh: rand(0, 6.3), plucks: [] });
    }
  }
  function lineY(L, x) { return L.y + L.slope * (x / W - 0.5) + L.bendA * Math.sin(x / W * Math.PI * 1.6 + L.bendPh); }
  function noteAt(deg) {             // a scale degree as a pitch (fractional pitches allowed)
    var sc = SCALES[scaleId()], n = sc.steps.length, p = sc.period || 12;
    return mood.root + p * Math.floor(deg / n) + sc.steps[((deg % n) + n) % n];
  }
  function lineMidi(k) { return noteAt(NL - 1 - k); }   // top line = highest
  function samePitch(a, b) {         // the same note in a different octave (or period)
    var p = SCALES[scaleId()].period || 12, r = (((a - b) % p) + p) % p;
    return r < 0.01 || p - r < 0.01;
  }
  function pluck(L, x, amp) { L.plucks.push({ x: x, t: 0, a: reduce ? amp * 0.3 : amp }); if (L.plucks.length > 6) L.plucks.shift(); }
  function drawLine(L, dt) {
    L.plucks.forEach(function (p) { p.t += dt; });
    L.plucks = L.plucks.filter(function (p) { return p.t < 2.5; });
    var d = '';
    for (var i = 0; i <= 48; i++) {
      var x = W * i / 48, y = lineY(L, x);
      L.plucks.forEach(function (p) {
        var dx = x - p.x; y += p.a * Math.exp(-dx * dx / (2 * 140 * 140)) * Math.sin(p.t * 22) * Math.exp(-p.t * 2.4);
      });
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    L.el.setAttribute('d', d);
  }

  /* ---------- sound ---------- */
  var ctx = null, master, verbSend, delaySend, hallSend, noiseBuf = null, volume = 0.7, recent = [];
  var LAH_PEAK = 0.26;   // the singer's level (matched to the kalimba, then a touch softer)
  var EP_PEAK = 0.10;    // the electric piano's level: a gentle, occasional visitor
  var KOTO_PEAK = 0.25;  // the koto's level (matched to the kalimba, then a touch softer)
  function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  function initAudio() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = volume;
    var comp = ctx.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 3;
    master.connect(comp); comp.connect(ctx.destination);
    // a soft room: generated reverb
    var verb = ctx.createConvolver(), len = Math.floor(ctx.sampleRate * 3.8), buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var c = 0; c < 2; c++) { var data = buf.getChannelData(c); for (var i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    verb.buffer = buf; verbSend = ctx.createGain(); verbSend.gain.value = 0.55; verbSend.connect(verb); verb.connect(master);
    // a slow echo
    var delay = ctx.createDelay(1.5), fb = ctx.createGain(), tone = ctx.createBiquadFilter();
    delay.delayTime.value = 0.46; fb.gain.value = 0.3; tone.type = 'lowpass'; tone.frequency.value = 1800;
    delaySend = ctx.createGain(); delaySend.gain.value = 0.3;
    delaySend.connect(delay); delay.connect(tone); tone.connect(fb); fb.connect(delay); tone.connect(master);
    // a long, soft hall just for the singer: 6.5 s, slightly darkened, with a short pre-delay
    var hall = ctx.createConvolver(), hl = Math.floor(ctx.sampleRate * 6.5), hb = ctx.createBuffer(2, hl, ctx.sampleRate);
    for (var hc = 0; hc < 2; hc++) { var hd = hb.getChannelData(hc); for (var j = 0; j < hl; j++) hd[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / hl, 3.2); }
    hall.buffer = hb;
    var pre = ctx.createDelay(0.2), hallTone = ctx.createBiquadFilter(), hallLevel = ctx.createGain();
    pre.delayTime.value = 0.05; hallTone.type = 'lowpass'; hallTone.frequency.value = 4200; hallLevel.gain.value = 0.55;
    hallSend = ctx.createGain(); hallSend.connect(pre); pre.connect(hall); hall.connect(hallTone); hallTone.connect(hallLevel); hallLevel.connect(master);
  }
  function breath() {   // a little air for the singer
    if (!noiseBuf) { noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); var d = noiseBuf.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    return noiseBuf;
  }
  function osc(type, f, t0, t1, dest, detune) {
    var o = ctx.createOscillator(); o.type = type; o.frequency.value = f; if (detune) o.detune.value = detune;
    o.connect(dest); o.start(t0); o.stop(t1);
  }
  function env(t, peak, atk, dec) {
    var g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + atk); g.gain.exponentialRampToValueAtTime(0.0001, t + atk + dec);
    return g;
  }
  // A plucked string (Karplus–Strong), computed once per pitch and reused. The string's length has to be a whole
  // number of samples, which would leave high notes off-pitch, so 'rate' retunes each one exactly on playback.
  var kotoCache = {};
  function kotoBuffer(f) {
    var key = f.toFixed(2); if (kotoCache[key]) return kotoCache[key];
    var sr = ctx.sampleRate, N = Math.max(2, Math.round(sr / f + 0.5)), len = Math.floor(sr * 3.4);
    var buf = ctx.createBuffer(1, len, sr), d = buf.getChannelData(0), line = new Float32Array(N), prev = 0, mean = 0, i;
    for (i = 0; i < N; i++) { prev += 0.45 * ((Math.random() * 2 - 1) - prev); line[i] = prev; mean += prev / N; }   // softened noise: a finger, not a pick
    for (i = 0; i < N; i++) line[i] -= mean;
    var g = Math.pow(10, -3 / (4.0 * sr / (N - 0.5))), idx = 0;                     // fades by 60 dB over about 4 seconds
    for (var j = 0; j < len; j++) {
      var cur = line[idx], nxt = line[(idx + 1) % N];
      d[j] = cur; line[idx] = g * 0.5 * (cur + nxt); idx = (idx + 1) % N;
    }
    return (kotoCache[key] = { buf: buf, rate: f / (sr / (N - 0.5)) });   // the loop is N - 0.5 samples long
  }
  var VOICES = {
    // bells: the higher the note, the gentler the strike, the fainter the bright overtone, and a soft filter on top
    bells:   function (t, f, out) { var hi = Math.min(1, 700 / f), soft = ctx.createBiquadFilter();
               soft.type = 'lowpass'; soft.frequency.value = 2500; soft.connect(out);
               var g = env(t, 0.13 * Math.sqrt(hi), 0.004 + 0.02 * (1 - hi), 2.8); g.connect(soft); osc('sine', f, t, t + 3, g);
               var g2 = env(t, 0.05 * hi * hi * hi, 0.006, 1.2); g2.connect(soft); osc('sine', f * 2.76, t, t + 1.4, g2); return [0.6, 0.35]; },
    // soft koto: a plucked string (see kotoBuffer), a little wooden body, and now and then a pressed note (oshide)
    koto:    function (t, f, out, len, vel, bendTo) { vel = vel || 1;
               var kb = kotoBuffer(f), src = ctx.createBufferSource(); src.buffer = kb.buf; src.playbackRate.value = kb.rate;
               if (bendTo) { src.playbackRate.setValueAtTime(kb.rate, t + 0.22); src.playbackRate.linearRampToValueAtTime(kb.rate * bendTo / f, t + 0.45); }
               var body = ctx.createBiquadFilter(); body.type = 'peaking'; body.frequency.value = 900; body.Q.value = 1; body.gain.value = 4;
               var soft = ctx.createBiquadFilter(); soft.type = 'lowpass'; soft.frequency.value = 3400;
               var g = ctx.createGain(); g.gain.value = KOTO_PEAK * vel;
               src.connect(body); body.connect(soft); soft.connect(g); g.connect(out); src.start(t); src.stop(t + kb.buf.duration);
               return [0.5, 0.22, 0.3]; },
    kalimba: function (t, f, out) { var g = env(t, 0.15, 0.006, 1.5); g.connect(out); osc('triangle', f, t, t + 1.7, g);
               var g2 = env(t, 0.05, 0.002, 0.25); g2.connect(out); osc('sine', f * 3, t, t + 0.35, g2); return [0.45, 0.3]; },
    marimba: function (t, f, out) { var g = env(t, 0.17, 0.003, 0.8); g.connect(out); osc('sine', f, t, t + 0.9, g);
               var g2 = env(t, 0.04, 0.002, 0.12); g2.connect(out); osc('sine', f * 4, t, t + 0.2, g2); return [0.4, 0.25]; },
    bass:    function (t, f, out) { var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.connect(out);
               var g = env(t, 0.24, 0.03, 2.4); g.connect(lp); osc('triangle', f, t, t + 2.6, g); osc('sine', f, t, t + 2.6, g); return [0.25, 0.05]; },
    trills:  function (t, f, out) { var g = env(t, 0.1, 0.004, 0.5); g.connect(out); osc('triangle', f, t, t + 0.6, g); return [0.4, 0.4]; },
    // a soft sung "lah": a breathy tone shaped by the resonances of a voice, gliding from "l" into an open "ah"
    lah:     function (t, f, out) {
               var end = t + 1.4, src = ctx.createOscillator(); src.type = 'sawtooth';
               src.frequency.setValueAtTime(f * 0.96, t); src.frequency.linearRampToValueAtTime(f, t + 0.09);     // a small scoop up into the note
               var vib = ctx.createOscillator(), vg = ctx.createGain(); vib.frequency.value = 5.3;
               vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(f * 0.011, t + 0.35); vib.connect(vg); vg.connect(src.frequency);
               var tone = ctx.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 3400; src.connect(tone);
               var air = ctx.createBufferSource(); air.buffer = breath(); var ag = ctx.createGain(); ag.gain.value = 0.18; air.connect(ag); ag.connect(tone);
               var body = ctx.createGain();
               // [l, ah, level, sharpness] for the first three resonances of a woman's voice
               [[360, 850, 1, 7], [1300, 1220, 0.55, 11], [2700, 2810, 0.28, 18]].forEach(function (F) {
                 var bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = F[3];
                 bp.frequency.setValueAtTime(F[0], t); bp.frequency.linearRampToValueAtTime(F[1], t + 0.075);
                 var g = ctx.createGain(); g.gain.value = F[2]; tone.connect(bp); bp.connect(g); g.connect(body);
               });
               var e = ctx.createGain(); e.gain.setValueAtTime(0.0001, t); e.gain.linearRampToValueAtTime(LAH_PEAK * 0.55, t + 0.035);   // the soft "l"
               e.gain.linearRampToValueAtTime(LAH_PEAK, t + 0.1); e.gain.setTargetAtTime(0.0001, t + 0.28, 0.13);                         // "ah", short
               body.connect(e); e.connect(out);
               src.start(t); vib.start(t); air.start(t); src.stop(end); vib.stop(end); air.stop(end);
               return [0.25, 0.12, 1]; },
    // soft electric piano (Rhodes-style FM): starts with a little bell-like brightness, mellows as it rings
    ep:      function (t, f, out, len, vel) { vel = vel || 1; var end = t + 4;
               var car = ctx.createOscillator(); car.type = 'sine'; car.frequency.value = f;
               var mod = ctx.createOscillator(); mod.type = 'sine'; mod.frequency.value = f;
               var mg = ctx.createGain(); mg.gain.setValueAtTime(f * 1.6 * vel, t); mg.gain.exponentialRampToValueAtTime(f * 0.04, t + 1.4);
               mod.connect(mg); mg.connect(car.frequency);
               var soft = ctx.createBiquadFilter(); soft.type = 'lowpass'; soft.frequency.value = 2600; soft.connect(out);
               var g = env(t, EP_PEAK * vel, 0.006, 3.6); g.connect(soft); car.connect(g);
               var tg = env(t, EP_PEAK * 0.12 * vel, 0.002, 0.18); tg.connect(soft); osc('sine', f * 7, t, t + 0.25, tg);   // the tine's tick
               car.start(t); mod.start(t); car.stop(end); mod.stop(end);
               return [0.7, 0.22, 0.35]; },
    // soft pad: round tones (no buzzy saws), a slight chorus, a filter that blooms open and closes again, slow breathing, lots of room
    pad:     function (t, f, out, len) { var end = t + len + 4.2;
               var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 0.3;
               lp.frequency.setValueAtTime(350, t); lp.frequency.linearRampToValueAtTime(1400, t + 1.6); lp.frequency.linearRampToValueAtTime(500, t + len + 4);
               lp.connect(out);
               var g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.08, t + 1.6);
               g.gain.setValueAtTime(0.08, t + len); g.gain.exponentialRampToValueAtTime(0.0001, t + len + 4); g.connect(lp);
               var lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.25; lg.gain.value = 0.016;
               lfo.connect(lg); lg.connect(g.gain); lfo.start(t); lfo.stop(end);
               [[f, 1, 'sine'], [f * 2, 0.25, 'sine'], [f * 1.5, 0.35, 'triangle']].forEach(function (p) {
                 [-5, 5].forEach(function (cents) { var pg = ctx.createGain(); pg.gain.value = p[1] * 0.5; pg.connect(g); osc(p[2], p[0], t, end, pg, cents); });
               });
               return [0.9, 0.12]; }
  };
  function play(voice, midi, x, opts) {
    opts = opts || {};
    if (!ctx || ctx.state !== 'running') return false;
    var now = ctx.currentTime;
    recent = recent.filter(function (r) { return r > now - 1; });
    if (recent.length >= 5 && !opts.force) return false;      // keep it calm: at most a handful of notes a second
    recent.push(now);
    var t = now + 0.01, out = ctx.createGain(), node = out;
    if (opts.muffled) { var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 380; out.gain.value = 0.7; out.connect(lp); node = lp; }
    var pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (pan) { pan.pan.value = Math.max(-0.8, Math.min(0.8, x / W * 1.6 - 0.8)); node.connect(pan); node = pan; }
    var sends = VOICES[voice](t, mtof(midi), out, opts.len || 2, opts.vel, opts.bend ? mtof(opts.bend) : 0);
    node.connect(master);
    var v = ctx.createGain(); v.gain.value = sends[0]; node.connect(v); v.connect(verbSend);
    var e = ctx.createGain(); e.gain.value = sends[1]; node.connect(e); e.connect(delaySend);
    if (sends[2]) { var hs = ctx.createGain(); hs.gain.value = sends[2]; node.connect(hs); hs.connect(hallSend); }
    return true;
  }

  /* ---------- blob shapes (same organic outline as the site) ---------- */
  function outline(b, time) {
    var N = 28, pts = [], pod = b.pod, podAng = pod.ang + time * pod.drift;
    var reach = 0.16 * Math.pow(Math.max(0, Math.sin(time * pod.sp + pod.ph)), 2);
    for (var j = 0; j < N; j++) {
      var th = j / N * Math.PI * 2, r = 1;
      for (var h = 0; h < b.waves.length; h++) { var o = b.waves[h];
        r += o.a * (0.6 + 0.4 * Math.sin(time * o.am + o.amPh)) * Math.sin(o.k * th + o.ph + time * o.sp); }
      var dd = Math.atan2(Math.sin(th - podAng), Math.cos(th - podAng));
      r += reach * Math.exp(-dd * dd / 0.25);
      pts.push([Math.cos(th) * r * 45, Math.sin(th) * r * 45]);
    }
    var f = function (v) { return v.toFixed(1); }, d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (var k = 0; k < N; k++) {
      var p0 = pts[(k - 1 + N) % N], p1 = pts[k], p2 = pts[(k + 1) % N], p3 = pts[(k + 2) % N];
      d += 'C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
                 f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    return d + 'Z';
  }

  /* ---------- the characters ---------- */
  var KINDS = {
    shy:     { voice: 'bells',   color: '#2BA6CF', size: 46,  oct: 12,  on: true },
    watcher: { voice: 'kalimba', color: '#B4533C', size: 112, oct: 0,   on: true },
    swell:   { voice: 'pad',     color: '#EE9BB4', size: 86,  oct: -12, on: true },
    drop:    { voice: 'marimba', color: '#E2B23A', size: 64,  oct: 0,   on: false },
    hungry:  { voice: 'bass',    color: '#7FC2A0', size: 122, oct: -24, on: true },
    chatter: { voice: 'trills',  color: '#6B5FA8', size: 52,  oct: 12,  on: false },
    singer:  { voice: 'lah',     color: '#B98BD0', size: 58,  oct: 0,   on: true },
    strummer:{ voice: 'koto',    color: '#C9925A', size: 70,  oct: 0,   on: true }
  };
  // one of Halli's faces for the watcher (dots for eyes, hollow smile)
  var FACE = { ref: [38.4, 33.4, 261.6, 266.6], box: [93.9, 119.0, 151.4, 149.3],
    svg: '<circle cx="98.85" cy="123.95" r="4.99" fill="#fff"/><circle cx="146.46" cy="124.96" r="4.99" fill="#fff"/>' +
         '<path d="M108.9,137.4s4.37,5.64,12.7,5.93,14.39-4.8,14.39-4.8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="#fff" stroke-width="12px"/>' +
         '<path d="M108.9,136.48s4.37,5.64,12.7,5.93c8.32.28,14.39-4.8,14.39-4.8" stroke="BODY" stroke-width="2px" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' };

  Object.keys(KINDS).forEach(function (k) {
    var c = KINDS[k].color, g = document.createElementNS(NS, 'radialGradient');
    g.id = 'g-' + k;
    g.innerHTML = '<stop offset="0" stop-color="' + c + '" stop-opacity="1"/><stop offset="0.6" stop-color="' + c + '" stop-opacity="0.75"/>' +
                  '<stop offset="1" stop-color="' + c + '" stop-opacity="0.25"/>';
    defs.appendChild(g);
  });

  var blobs = [];
  function makeBlob(kind) {
    var K = KINDS[kind], g = document.createElementNS(NS, 'g'), path = document.createElementNS(NS, 'path');
    path.setAttribute('fill', 'url(#g-' + kind + ')'); g.appendChild(path); gBlobs.appendChild(g);
    var ang = rand(0, 6.3), sp = rand(9, 18);
    var twin = blobs.some(function (o) { return o.kind === kind; });   // extra copies of a kind vary a little in size
    var b = { kind: kind, K: K, g: g, path: path, d: K.size * (twin ? rand(0.8, 1.15) : 1), x: rand(0.1, 0.9) * W, y: rand(0.1, 0.9) * H,
      vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, ox: 0, oy: 0, sx: 1, sy: 1, svx: 0, svy: 0, tx: 1, ty: 1, grow: 1,
      rot: kind === 'watcher' ? 0 : rand(0, 360), vr: kind === 'watcher' ? 0 : rand(-6, 6), state: 'float', side: [], cool: [],
      personal: rand(0, 80), circle: (Math.random() < 0.5 ? -1 : 1) * rand(0.5, 1),
      waves: [[2, 0.10], [3, 0.07], [4, 0.045], [5, 0.025]].map(function (w) {
        return { k: w[0], a: w[1] * rand(0.5, 1), ph: rand(0, 6.3), sp: rand(0.08, 0.25) * (Math.random() < 0.5 ? -1 : 1), am: rand(0.1, 0.3), amPh: rand(0, 6.3) }; }),
      pod: { ang: rand(0, 6.3), drift: rand(-0.15, 0.15), sp: rand(0.12, 0.25), ph: rand(0, 6.3) } };
    if (kind === 'watcher') {
      var fg = document.createElementNS(NS, 'g'), R = FACE.ref, B = FACE.box, s = 90 / ((R[2] - R[0] + R[3] - R[1]) / 2);
      fg.innerHTML = FACE.svg.replace(/BODY/g, K.color); g.appendChild(fg);
      var fcx = (B[0] + B[2]) / 2, fcy = (B[1] + B[3]) / 2;
      b.face = { g: fg, s: s, fcx: fcx, fcy: fcy, ox: (fcx - (R[0] + R[2]) / 2) * s * 0.75, oy: (fcy - (R[1] + R[3]) / 2) * s * 0.75,
        lx: 0, ly: 0, blink: 0, next: rand(2, 6), eyes: [].slice.call(fg.querySelectorAll('circle')).map(function (e) {
          return { el: e, cx: +e.getAttribute('cx'), cy: +e.getAttribute('cy') }; }) };
      placeFace(b);
    }
    blobs.push(b);
    return b;
  }
  function enter(b) {               // a new blob drifts in from an edge, so you can watch it arrive
    var e = Math.floor(rand(0, 4)), r = b.d / 2 + 10;
    b.x = e === 0 ? -r : e === 1 ? W + r : rand(0.1, 0.9) * W;
    b.y = e === 2 ? -r : e === 3 ? H + r : rand(0.15, 0.85) * H;
    var dx = rand(0.3, 0.7) * W - b.x, dy = rand(0.3, 0.7) * H - b.y, l = Math.sqrt(dx * dx + dy * dy) || 1, sp = rand(12, 18);
    b.vx = dx / l * sp; b.vy = dy / l * sp; b.side = [];
  }
  function leave(b) {               // send a blob away gently: it shrinks and fades over about a second
    if (!b || b.state === 'leaving') return;
    if (b.prey) release(b);
    if (b.state === 'swallowed') release(b.host);
    if (held === b) held = null;
    b.state = 'leaving'; b.leaveT = 0;
  }
  function removeBlob(b) { gBlobs.removeChild(b.g); blobs.splice(blobs.indexOf(b), 1); syncTray(); }
  function present() { return blobs.filter(function (b) { return b.state !== 'leaving'; }); }
  function radius(b) { return b.d / 2 * zoom() * (b.sx + b.sy) / 2; }
  function placeFace(b) {
    var f = b.face, sq = f.blink > 0 ? 0.12 : 1;
    f.g.setAttribute('transform', 'translate(' + (f.ox + f.lx * 4).toFixed(2) + ' ' + (f.oy + f.ly * 4).toFixed(2) + ') scale(' + f.s.toFixed(4) +
      ') translate(' + (-f.fcx).toFixed(2) + ' ' + (-f.fcy).toFixed(2) + ')');
    f.eyes.forEach(function (e) {
      e.el.setAttribute('transform', 'translate(' + (e.cx + f.lx * 3.2).toFixed(2) + ' ' + (e.cy + f.ly * 3.2).toFixed(2) + ') scale(1 ' + sq + ') translate(' + (-e.cx) + ' ' + (-e.cy) + ')');
    });
  }

  /* ---------- what each one does when it crosses a line ---------- */
  function sing(b, k, force) {
    var midi = lineMidi(k) + b.K.oct, muffled = b.state === 'swallowed';
    if (b.kind === 'shy') while (midi > 86) midi -= 12;                    // the highest bells drop an octave: gentler on the ear
    var bend = b.kind === 'strummer' && Math.random() < 0.15 ? noteAt(NL - k) + b.K.oct : 0;   // oshide: now and then pressed up to the next note
    if (b.kind === 'singer') {
      while (midi < 62) midi += 12; while (midi > 79) midi -= 12;          // keep her in a woman's singing range, whatever the key
      var nowS = performance.now() / 1000;
      if (b.lastLah && nowS - b.lastLah < 1.6) return;                       // an occasional "lah!", never a stream of them
      b.lastLah = nowS;
    }
    var ok = play(b.K.voice, midi, b.x, { muffled: muffled, force: force, len: 1.5 + b.grow * 2, bend: bend });
    if (!ok) return;
    pluck(lines[k], b.x, muffled ? 3 : 4 + b.d / 14);
    if (!muffled) { b.svx += 0.5; b.svy += 0.7; }
  }
  function nearestLine(b) {
    var best = 0, bd = Infinity;
    lines.forEach(function (L, k) { var d = Math.abs(lineY(L, b.x) - b.y); if (d < bd) { bd = d; best = k; } });
    return best;
  }

  /* ---------- clicks ---------- */
  var ptr = null, lastMove = performance.now(), curious = false, held = null, paused = false;
  function hit(x, y) {
    for (var i = blobs.length - 1; i >= 0; i--) { var b = blobs[i];
      if (b.state !== 'float') continue;
      var dx = x - b.x, dy = y - b.y, r = radius(b) * 0.9; if (dx * dx + dy * dy < r * r) return b; }
    return null;
  }
  function flee(b, px, py, power) {
    var dx = b.x - px, dy = b.y - py, len = Math.sqrt(dx * dx + dy * dy) || 1;
    b.ox += dx / len * power; b.oy += dy / len * power;
  }
  function release(host) {
    var p = host.prey; if (!p) return;
    var a = rand(0, 6.3);
    p.state = 'float'; p.side = []; p.ox = Math.cos(a) * 300; p.oy = Math.sin(a) * 300; p.tx = p.ty = p.grow;
    p.g.style.opacity = ''; host.prey = null; host.tx = host.ty = host.grow; host.svx -= 2; host.svy += 2.4;
  }
  function act(b) {
    var k = nearestLine(b), base = lineMidi(k);
    if (b.kind === 'swell') {
      b.grow = Math.min(b.grow * 1.2, 1.8); b.tx = b.ty = b.grow; b.svx += 2; b.svy += 2.6;
      play('pad', base + b.K.oct, b.x, { force: true, len: 2 + b.grow * 2 });
    } else if (b.kind === 'drop') {
      b.state = 'held'; held = b; b.tx = 0.92; b.ty = 0.6;
    } else if (b.kind === 'hungry') {
      if (b.prey) { release(b); play('bass', base - 5 + b.K.oct, b.x, { force: true }); return; }
      var best = null, bd = Infinity;
      blobs.forEach(function (o) { if (o === b || o.state !== 'float') return;
        var d = Math.hypot(o.x - b.x, o.y - b.y); if (d < bd) { bd = d; best = o; } });
      if (!best) { b.svx += 2; return; }
      b.prey = best; best.state = 'swallowed'; best.host = b; best.gulp = 0; best.orbit = rand(0, 6.3); best.side = [];
      best.tx = best.ty = Math.min(0.55, b.d * 0.42 / best.d); gBlobs.appendChild(best.g);
      b.tx = b.ty = b.grow * 1.12; b.svx += 1.5; b.svy += 1.5;
      play('bass', base + b.K.oct, b.x, { force: true });
    } else if (b.kind === 'watcher') {
      b.face.blink = 0.3; b.svx += 1.4; b.svy -= 1.8;
      play('kalimba', base, b.x, { force: true });
      setTimeout(function () { play('kalimba', base + 7, b.x, { force: true }); }, 220);
    } else if (b.kind === 'singer') {
      var m = base + 7; while (m < 62) m += 12; while (m > 79) m -= 12;      // clicked: one "lah!" a fifth up
      b.svx -= 1.2; b.svy += 2.4; b.lastLah = performance.now() / 1000;
      play('lah', m, b.x, { force: true });
    } else if (b.kind === 'strummer') {
      b.svx += 1.6; b.svy -= 1.8;
      for (var s = 0; s < NL; s++) (function (s) {                       // sararin: a hand sweeping across all the strings
        setTimeout(function () { if (play('koto', lineMidi(s), b.x, { force: true, vel: 0.9 - s * 0.06 })) pluck(lines[s], b.x, 6); }, s * 70);
      })(s);
    } else if (b.kind === 'chatter') {
      b.svx += 2; b.svy -= 2;
      [0, 2, 1, 3, 2].forEach(function (step, i) {
        setTimeout(function () { var kk = Math.max(0, Math.min(NL - 1, k - step)); play('trills', lineMidi(kk) + 12, b.x, { force: true }); }, i * 95);
      });
    }
  }
  svg.addEventListener('pointerdown', function (e) {
    ptr = { x: e.clientX, y: e.clientY };
    var b = hit(e.clientX, e.clientY); if (!b) return;
    if (b.kind === 'shy') { flee(b, e.clientX, e.clientY, 420); return; }
    e.preventDefault(); act(b);
  });
  addEventListener('pointermove', function (e) {
    ptr = { x: e.clientX, y: e.clientY }; lastMove = performance.now();
    if (curious) { curious = false;
      blobs.forEach(function (b) { if (b.state !== 'float') return;
        var d = Math.hypot(b.x - e.clientX, b.y - e.clientY); if (d < 350) flee(b, e.clientX, e.clientY, 300 * (1 - d / 350)); }); }
    var over = hit(e.clientX, e.clientY);
    svg.style.cursor = over && over.kind !== 'shy' ? 'pointer' : '';
  }, { passive: true });
  function up(e) {
    if (e.pointerType !== 'mouse') ptr = null;
    if (!held) return;
    held.state = 'falling'; held.fall = 0; held.vr = rand(-80, 80); held = null;   // falls through every line: a cascade
  }
  addEventListener('pointerup', up); addEventListener('pointercancel', up);
  document.addEventListener('pointerout', function (e) { if (!e.relatedTarget) ptr = null; });   // cursor left the window

  /* ---------- controls ---------- */
  var chips = document.getElementById('hcp-chips'), chipFor = {}, MAX_BLOBS = 16, picked = false;   // picked: the visitor has chosen kinds themselves
  var moreBtn = document.getElementById('hcp-more'), fewerBtn = document.getElementById('hcp-fewer');
  function syncTray() {             // blob buttons show which kinds are in; more/fewer grey out at their limits
    var here = present();
    Object.keys(chipFor).forEach(function (k) {
      chipFor[k].setAttribute('aria-pressed', String(here.some(function (b) { return b.kind === k; })));
    });
    moreBtn.disabled = here.length >= MAX_BLOBS; fewerBtn.disabled = here.length === 0;
    // the toggle shows the pond's blobs as coloured dots (up to 8, then +n); screen readers hear the count instead
    var dots = document.getElementById('hcp-blobDots');
    dots.innerHTML = here.slice(0, 8).map(function (b) { return '<i style="background:' + b.K.color + '"></i>'; }).join('') +
      (here.length > 8 ? '<em>+' + (here.length - 8) + '</em>' : '');
    document.getElementById('hcp-blobSr').textContent = ', ' + here.length + ' in the pond';
    document.getElementById('hcp-howMany').textContent = here.length + ' in the pond, room for ' + MAX_BLOBS;
  }
  Object.keys(KINDS).forEach(function (kind) {
    var K = KINDS[kind], bt = document.createElement('button');
    bt.type = 'button'; bt.className = 'hcp-chip'; bt.setAttribute('aria-pressed', String(K.on));
    bt.innerHTML = '<span class="hcp-dot" style="background:' + K.color + '"></span>' + kind + ' <span class="hcp-voice">' + K.voice + '</span>';
    bt.addEventListener('click', function () {
      picked = true;
      if (bt.getAttribute('aria-pressed') === 'true') present().filter(function (b) { return b.kind === kind; }).forEach(leave);   // all of this kind go
      else if (present().length < MAX_BLOBS) enter(makeBlob(kind));
      syncTray();
    });
    chips.appendChild(bt); chipFor[kind] = bt;
    if (K.on) makeBlob(kind);
  });
  moreBtn.addEventListener('click', function () {
    if (present().length >= MAX_BLOBS) return;
    var kinds = Object.keys(KINDS), inNow = kinds.filter(function (k) { return present().some(function (b) { return b.kind === k; }); });
    var pool = inNow.length && (picked || Math.random() < 0.75) ? inNow : kinds;   // after you've chosen kinds: only those; otherwise mostly more of the same, sometimes someone new
    enter(makeBlob(pool[Math.floor(Math.random() * pool.length)])); syncTray();
  });
  fewerBtn.addEventListener('click', function () { var here = present(); leave(here[here.length - 1]); syncTray(); });   // the newest one goes
  syncTray();
  // scale picker and "surprise me"
  var pick = document.getElementById('hcp-scalePick');
  function fillPicker() {
    var opts = [['time', 'follows the time of day']].concat(Object.keys(SCALES).filter(function (k) { return !SCALES[k].secret || chosen === k; })
      .map(function (k) { return [k, k === 'bp' && strange ? 'something strange' : SCALES[k].name]; }));
    pick.innerHTML = opts.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === chosen ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('');
  }
  function setScale(id, how) {
    chosen = id; strange = false; fillPicker(); drawCaption();
    document.getElementById('hcp-scaleSr').textContent = 'now playing the ' + scaleLabel() + ' scale';
    arpeggio();                       // hear the new scale straight away
  }
  pick.addEventListener('change', function () { setScale(pick.value, 'picked'); });
  document.getElementById('hcp-surprise').addEventListener('click', function () {
    // weighted towards what people rarely hear; never the scale that's playing now
    var w = { slendro: 3, pelog: 3, harmonic: 3, hirajoshi: 2.5, whole: 2, bp: 1.5, lydian: 1.5, dorian: 1, majpent: 0.4, minpent: 0.4 };
    var now = scaleId(), keys = Object.keys(w).filter(function (k) { return k !== now; });
    var r = Math.random() * keys.reduce(function (s, k) { return s + w[k]; }, 0), i = 0;
    for (; i < keys.length - 1; i++) { r -= w[keys[i]]; if (r <= 0) break; }
    setScale(keys[i], 'surprise');
  });
  fillPicker();
  // the blobs panel: opens above the toggle; the toggle or Escape closes it
  var panel = document.getElementById('hcp-blobPanel'), toggle = document.getElementById('hcp-blobsToggle');
  function fitPanel() {             // never taller than the space between the caption and the tray
    if (panel.hidden) return;
    var top = document.getElementById('hcp-caption').getBoundingClientRect().top - 6;
    var trayTop = panel.parentElement.getBoundingClientRect().top;
    panel.style.maxHeight = Math.max(160, trayTop - 10 - top) + 'px';
  }
  function setPanel(open) { panel.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); fitPanel(); }
  addEventListener('resize', fitPanel);
  toggle.addEventListener('click', function () { setPanel(panel.hidden); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { setPanel(false); toggle.focus(); } });
  document.getElementById('hcp-capScale').addEventListener('click', function () { setPanel(true); pick.focus(); });   // the caption's scale name opens the picker
  document.getElementById('hcp-blobClose').addEventListener('click', function () { setPanel(false); toggle.focus(); });   // the X: same as the arrow or Escape
  document.getElementById('hcp-volume').addEventListener('input', function (e) {
    volume = +e.target.value; if (master) master.gain.setTargetAtTime(volume, ctx.currentTime, 0.05);
  });
  var pauseBtn = document.getElementById('hcp-pause');
  var ICON_PAUSE = '<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1.5" width="3.5" height="11" rx="1" fill="currentColor"/><rect x="8.5" y="1.5" width="3.5" height="11" rx="1" fill="currentColor"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.8v10.4c0 .6.6 1 1.1.7l8.4-5.2c.5-.3.5-1.1 0-1.4L4.1 1.1C3.6.8 3 1.2 3 1.8z" fill="currentColor"/></svg>';
  function drawPause() { pauseBtn.innerHTML = (paused ? ICON_PLAY + 'wake blobs' : ICON_PAUSE + 'pause blobs'); }
  pauseBtn.addEventListener('click', function () { paused = !paused; drawPause(); });
  drawPause();
  document.getElementById('hcp-wakeBtn').addEventListener('click', function () {
    initAudio(); if (ctx && ctx.resume) ctx.resume();
    document.getElementById('hcp-wake').hidden = true;
    blobs.forEach(function (b) { b.side = []; });
    pauseBtn.focus({ preventScroll: true });
  });
  function fitToScreen() {          // checked every frame: if the drawing area changed size, rescale the pond to it
    var r = svg.getBoundingClientRect(), nw = Math.round(r.width), nh = Math.round(r.height);
    if (!nw || !nh || (nw === W && nh === H)) return;
    var fx = nw / W, fy = nh / H;
    blobs.forEach(function (b) { b.x *= fx; b.y *= fy; b.side = []; });
    W = nw; H = nh; buildLines();
  }
  addEventListener('resize', fitToScreen);
  buildLines();

  /* ---------- the loop ---------- */
  var last = performance.now(), t = 0;
  var nextArp = performance.now() + rand(25, 40) * 1000;   // the electric piano's first visit
  function arpeggio() {             // a broken chord from the current scale, rolled by a slightly uneven hand
    var len = SCALES[scaleId()].steps.length, deg = Math.floor(rand(0, len)), steps = Math.random() < 0.5 ? [0, 2, 4] : [0, 2, 4, len], at = 0;
    if (Math.random() < 0.25) steps = steps.slice().reverse();      // now and then it rolls downwards
    steps.forEach(function (s, i) {
      var d = deg + s, midi = noteAt(d) - 12, vel = 0.85 - i * 0.08 + rand(-0.05, 0.05);
      setTimeout(function () {
        if (paused) return;
        if (play('ep', midi, W * rand(0.3, 0.7), { force: true, vel: vel }))
          lines.forEach(function (L, k) { if (samePitch(lineMidi(k), midi)) pluck(L, W * rand(0.3, 0.7), 5); });   // its lines shimmer
      }, at);
      at += rand(190, 290);
    });
  }
  function frame(now) {
    var dt = Math.min((now - last) / 1000, 0.05); last = now;
    fitToScreen();
    var pace = mood.pace * (reduce ? 0.3 : 1);
    if (!paused) t += dt * pace;
    var gone = [];
    if (paused || !ctx || ctx.state !== 'running') nextArp += dt * 1000;   // the piano waits while the pond sleeps
    else if (now > nextArp) { arpeggio(); nextArp = now + rand(50, 110) * 1000; }
    var rest = now - lastMove;
    curious = !paused && !!ptr && rest > 3000 && rest < 15000;   // they come to look, then lose interest and drift off again
    if (curious) {
      for (var a = 0; a < blobs.length; a++) for (var c = a + 1; c < blobs.length; c++) {
        var A = blobs[a], C = blobs[c]; if (A.state !== 'float' || C.state !== 'float') continue;
        var sx = C.x - A.x, sy = C.y - A.y, sd = Math.sqrt(sx * sx + sy * sy) || 1, room = (radius(A) + radius(C)) * 0.85;
        if (sd < room) { var nudge = (1 - sd / room) * 120 * dt; A.ox -= sx / sd * nudge; A.oy -= sy / sd * nudge; C.ox += sx / sd * nudge; C.oy += sy / sd * nudge; }
      }
    }
    lines.forEach(function (L) { drawLine(L, paused ? 0 : dt); });

    blobs.forEach(function (b) {
      b.svx += ((b.tx - b.sx) * 170 - b.svx * 9) * dt; b.sx += b.svx * dt;
      b.svy += ((b.ty - b.sy) * 170 - b.svy * 9) * dt; b.sy += b.svy * dt;
      var px = b.x, py = b.y;
      if (b.state === 'leaving') {
        b.leaveT += dt; b.g.style.opacity = Math.max(0, 1 - b.leaveT / 1.2).toFixed(3); b.tx = b.ty = 0.6;
        if (b.leaveT > 1.2) gone.push(b);
      }

      if (b.state === 'float' && !paused) {
        if (b.kind === 'shy' && ptr) { var dx = b.x - ptr.x, dy = b.y - ptr.y, dist = Math.sqrt(dx * dx + dy * dy) || 1, reach = radius(b) + 70;
          if (dist < reach) { var push = (1 - dist / reach) * 2600 * dt; b.ox += dx / dist * push; b.oy += dy / dist * push; } }
        if (curious) { var cx = ptr.x - b.x, cy = ptr.y - b.y, cd = Math.sqrt(cx * cx + cy * cy) || 1;
          var ring = radius(b) + (b.kind === 'shy' ? 110 : 45) + b.personal, pull = cd > ring ? Math.min(1, (cd - ring) / 200) : -0.5;
          b.ox += cx / cd * pull * 140 * dt; b.oy += cy / cd * pull * 140 * dt;
          b.ox += -cy / cd * b.circle * 90 * dt; b.oy += cx / cd * b.circle * 90 * dt; }
        b.ox *= Math.exp(-3 * dt); b.oy *= Math.exp(-3 * dt);
        var slow = pace * (b.prey ? 0.5 : 1) * (curious ? 0.4 : 1);
        b.x += (b.vx * slow + b.ox) * dt; b.y += (b.vy * slow + b.oy) * dt; b.rot += b.vr * pace * dt;
        if (b.kind === 'swell' && b.grow > 1) { b.grow += (1 - b.grow) * dt * 0.04; b.tx = b.ty = b.grow; }   // slowly lets the air out
        var m = radius(b) + 10, wrapped = false;
        if (b.x < -m) { b.x = W + m; wrapped = true; } else if (b.x > W + m) { b.x = -m; wrapped = true; }
        if (b.y < -m) { b.y = H + m; wrapped = true; } else if (b.y > H + m) { b.y = -m; wrapped = true; }
        if (wrapped) b.side = [];                                   // a jump across the screen is not a crossing
      } else if (b.state === 'swallowed') {
        var host = b.host, orb = radius(host) * 0.16;
        b.gulp = Math.min(1, b.gulp + dt * 2.5); if (!paused) b.orbit += dt * 0.5;
        var hx = host.x + Math.cos(b.orbit) * orb, hy = host.y + Math.sin(b.orbit * 1.3) * orb, follow = b.gulp < 1 ? Math.min(1, dt * 8) : 1;
        b.x += (hx - b.x) * follow; b.y += (hy - b.y) * follow;
        b.g.style.opacity = (1 - 0.62 * b.gulp).toFixed(3);
      } else if (b.state === 'falling') {
        b.fall += 1100 * dt; b.y += b.fall * dt; b.rot += b.vr * dt;
        if (b.y - radius(b) > H + 20) {                             // drifts back in from the top
          b.state = 'float'; b.y = -radius(b) - 10; b.x = rand(0.15, 0.85) * W; b.tx = b.ty = 1; b.side = [];
          b.vx = rand(-10, 10); b.vy = rand(8, 14);
        }
      }

      // crossing a line plays it
      if ((!paused || b.state === 'falling') && b.state !== 'leaving') {
        lines.forEach(function (L, k) {
          var side = b.y < lineY(L, b.x) ? -1 : 1;
          if (b.side[k] !== undefined && side !== b.side[k] && b.state !== 'held') {
            var cool = b.state === 'falling' ? 0.05 : 0.6;
            if (!b.cool[k] || now / 1000 - b.cool[k] > cool) { b.cool[k] = now / 1000; sing(b, k, b.state === 'falling'); }
          }
          b.side[k] = side;
        });
      }

      if (b.face && !paused) {
        var f = b.face, tx = 0, ty = 0;
        if (ptr) { var ex = ptr.x - b.x, ey = ptr.y - b.y, ed = Math.sqrt(ex * ex + ey * ey) || 1, kk = Math.min(1, ed / 250); tx = ex / ed * kk; ty = ey / ed * kk; }
        else { tx = Math.sin(t * 0.37) * 0.6; ty = Math.sin(t * 0.23 + 1) * 0.4; }
        f.lx += (tx - f.lx) * Math.min(1, dt * 6); f.ly += (ty - f.ly) * Math.min(1, dt * 6);
        f.next -= dt; if (f.next <= 0) { f.blink = 0.16; f.next = rand(2.5, 7); }
        if (f.blink > 0) f.blink -= dt;
        placeFace(b);
      }
      b.path.setAttribute('d', outline(b, t));
      var s = b.d / 90 * zoom();
      b.g.setAttribute('transform', 'translate(' + b.x.toFixed(1) + ' ' + b.y.toFixed(1) + ') rotate(' + b.rot.toFixed(1) + ') scale(' +
        (s * b.sx).toFixed(4) + ' ' + (s * b.sy).toFixed(4) + ')');
    });
    gone.forEach(removeBlob);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  window.__hcPondSleep = function () { if (!paused) { paused = true; drawPause(); } if (ctx && ctx.suspend) ctx.suspend(); };
  window.__hcPondWake = function () { if (ctx && ctx.resume) ctx.resume(); };
})();
}
  var pending = null;
  new MutationObserver(function () { clearTimeout(pending); pending = setTimeout(check, 120); }).observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('popstate', check);
  check();
})();
window.__hcBuild = "2026-11-04 04:04";
/* add-ons added after the Custom HTML was pasted, loaded from the same folder */
(function () { var me = document.currentScript; if (!me || !me.src) return;
  ["hc-eyes", "hc-playthings", "hc-retro", "hc-music", "hc-fold", "hc-debug"].forEach(function (name) {
    var s = document.createElement("script"); s.src = new URL(name + ".js", me.src).href; s.async = false;
    document.head.appendChild(s); }); })();
