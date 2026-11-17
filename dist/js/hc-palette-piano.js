/* hc-palette-piano for hallicivelek.com: built from dist/hc-palette-piano.html by build.py, do not edit here */
(function () { var s = document.createElement("style"); s.textContent = "\n  html.hc-pp-on .thumbnails, html.hc-pp-on #hc-sort { display: none !important; }\n  #hc-pp { box-sizing: border-box; width: min(1180px, 92vw); position: relative; left: 50%; transform: translateX(-50%);\n    text-align: left; font-family: pacaembu, sans-serif; color: #492E46; letter-spacing: .02em; line-height: 1.5;\n    padding: 44px 0 120px; }\n  #hc-pp *, #hc-pp *::before, #hc-pp *::after { box-sizing: border-box; }\n  #hc-pp a { color: inherit; }\n  #hc-pp .hc-pp-sr { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; margin: 0; padding: 0; }\n  #hc-pp a.hc-pp-back { display: inline-block; font-size: 18px; text-decoration: none; margin-bottom: 18px; background: none !important; color: inherit !important; }\n  #hc-pp a.hc-pp-back:hover { text-decoration: underline; }\n  #hc-pp h1 { font-family: inherit; font-size: 44px; line-height: 1.1; margin: 0 0 14px; font-weight: bold; letter-spacing: 0; color: inherit; text-transform: none; }\n  #hc-pp p.hc-pp-lede { font-size: 21px; line-height: 1.45; margin: 0 0 40px; max-width: 34em; color: inherit; }\n\n  /* the keys: each project a strip of its own colours, painted in bands on a white key, tilted a little like the prints on the pinboard */\n  #hc-pp ul.hc-pp-keys { display: grid; grid-template-columns: repeat(var(--cols), 1fr); --cols: 24; gap: 34px 8px; padding: 0; margin: 0; list-style: none; }\n  #hc-pp li.hc-pp-k { position: relative; margin: 0; padding: 0; list-style: none; line-height: 1.5; transform: translateY(var(--dy)) rotate(var(--tilt)); }\n  #hc-pp li.hc-pp-k::before, #hc-pp li.hc-pp-k::marker { content: none; }\n  #hc-pp button.hc-pp-key { display: flex; flex-direction: column; width: 100%; min-width: 0; height: 214px; padding: 4px 4px 5px; border: 0; margin: 0;\n    background: #fff; border-radius: 3px 3px 14px 14px; cursor: pointer; font: inherit; letter-spacing: 0; text-transform: none; color: inherit;\n    box-shadow: 0 1px 1px rgba(73, 46, 70, .12), 0 6px 14px -6px rgba(73, 46, 70, .35);\n    transition: transform .12s ease, box-shadow .12s ease; -webkit-tap-highlight-color: transparent;\n    /* soloing: a finger sweeping sideways (or held still a moment) plays the bands; an up-or-down swipe still scrolls the page */\n    touch-action: pan-y pinch-zoom; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; }\n  /* each band overlaps the one above with a slightly uneven top edge, like paint or cut paper */\n  #hc-pp .hc-pp-key span { display: block; flex: var(--share) 1 0; min-height: 9px; margin-top: -4px; clip-path: var(--edge);\n    transition: transform .6s ease, filter .6s ease; }\n  #hc-pp .hc-pp-key span:first-child { margin-top: 0; clip-path: none; border-radius: 1px 1px 0 0; }\n  #hc-pp .hc-pp-key span:last-child { border-radius: 0 0 11px 11px; }\n  #hc-pp .hc-pp-key span.lit { transform: scaleX(1.22); filter: brightness(1.08) saturate(1.25); transition: transform .08s ease-out, filter .08s; }\n  #hc-pp button.hc-pp-key:hover { background: #fff; box-shadow: 0 1px 1px rgba(73, 46, 70, .12), 0 10px 18px -6px rgba(73, 46, 70, .4); }\n  #hc-pp button.hc-pp-key.down { transform: translateY(5px); box-shadow: 0 1px 1px rgba(73, 46, 70, .15), 0 2px 5px -2px rgba(73, 46, 70, .35); }\n  #hc-pp button.hc-pp-key:focus { outline: none; }\n  #hc-pp button.hc-pp-key:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 3px; }\n\n  /* the title only shows on hover, focus, or after a press: the work stands on its own */\n  #hc-pp a.hc-pp-tag { position: absolute; left: 50%; top: calc(100% + 10px); z-index: 2; width: max-content; max-width: 210px;\n    transform: translateX(-50%) rotate(calc(var(--tilt) * -1.4)); padding: 7px 12px 8px; background: #fff !important; color: inherit !important;\n    border-radius: 3px; font-size: 14px; line-height: 1.3; text-decoration: none; text-align: center;\n    box-shadow: 0 6px 14px -6px rgba(73, 46, 70, .4); opacity: 0; pointer-events: none; transition: opacity .15s; }\n  #hc-pp li.hc-pp-k[data-edge=\"l\"] a.hc-pp-tag { left: 0; transform: rotate(calc(var(--tilt) * -1.4)); text-align: left; }\n  #hc-pp li.hc-pp-k[data-edge=\"r\"] a.hc-pp-tag { left: auto; right: 0; transform: rotate(calc(var(--tilt) * -1.4)); text-align: right; }\n  #hc-pp .hc-pp-tag b { display: block; font-weight: bold; }\n  #hc-pp .hc-pp-tag i { font-style: normal; color: rgba(73, 46, 70, .66); text-decoration: underline; text-underline-offset: 3px; }\n  #hc-pp .hc-pp-tag:hover i { color: #492E46; }\n  #hc-pp a.hc-pp-tag:focus { outline: none; }\n  #hc-pp a.hc-pp-tag:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 2px; }\n  #hc-pp li.hc-pp-k:hover a.hc-pp-tag, #hc-pp li.hc-pp-k:focus-within a.hc-pp-tag, #hc-pp li.hc-pp-k.on a.hc-pp-tag { opacity: 1; pointer-events: auto; }\n  #hc-pp li.hc-pp-k:hover, #hc-pp li.hc-pp-k:focus-within, #hc-pp li.hc-pp-k.on { z-index: 3; }\n  #hc-pp ul.hc-pp-keys:has(li.hc-pp-k:hover) li.hc-pp-k.on:not(:hover):not(:focus-within) a.hc-pp-tag { opacity: 0; pointer-events: none; }\n  #hc-pp li.hc-pp-k { scroll-margin: 96px 0 140px; }   /* clear of Cargo's fixed header and the buttons at the bottom */\n  @media (max-width: 1000px) { #hc-pp ul.hc-pp-keys { --cols: 14; } }\n\n  /* sound on/off: bottom left, the blobs' pause button (and 1999 mode's way back) keep the bottom right */\n  button.hc-pp-quiet { display: none; position: fixed; left: 16px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); z-index: 1001;\n    min-height: 44px; margin: 0; padding: 0 18px; border: 0; border-radius: 999px; background: #492E46; color: #F3DCDF;\n    font-family: pacaembu, sans-serif; font-size: 15px; font-weight: normal; line-height: 1; letter-spacing: .02em; text-transform: none; cursor: pointer;\n    box-shadow: 0 6px 16px -6px rgba(73, 46, 70, .5); }\n  html.hc-pp-on button.hc-pp-quiet { display: inline-flex; align-items: center; }\n  button.hc-pp-quiet[aria-pressed=\"true\"] { background: #fff; color: #492E46; }\n  button.hc-pp-quiet:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 3px; }\n  html.hc-ns button.hc-pp-quiet { bottom: 40px; background: #c0c0c0 !important; color: #000 !important; border: 2px solid !important;\n    border-color: #fff #404040 #404040 #fff !important; border-radius: 0; box-shadow: none !important; font-family: Arial, Helvetica, sans-serif !important; }\n  html.hc-gc button.hc-pp-quiet { background: #ff00ff !important; color: #ffff00 !important; border: 3px outset #ff99ff !important; box-shadow: none !important; }\n\n  @media (max-width: 760px) {\n    #hc-pp { padding: 22px 0 110px; }\n    #hc-pp a.hc-pp-back { margin-bottom: 10px; font-size: 17px; }\n    #hc-pp h1 { font-size: 34px; margin-bottom: 8px; }\n    #hc-pp p.hc-pp-lede { font-size: 18px; margin-bottom: 30px; }\n  }\n  @media (max-width: 600px) {\n    #hc-pp ul.hc-pp-keys { --cols: 7; gap: 28px 7px; }\n    #hc-pp button.hc-pp-key { height: 150px; padding: 3px 3px 4px; }\n    #hc-pp a.hc-pp-tag { max-width: 170px; }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    #hc-pp button.hc-pp-key, #hc-pp .hc-pp-key span, #hc-pp a.hc-pp-tag { transition: none !important; }\n    #hc-pp button.hc-pp-key.down, #hc-pp .hc-pp-key span.lit { transform: none; }\n  }\n\n  /* the beat maker (from the mockup's drums.js): \"Make a beat\" right of the sound switch (placed by measuring, see place()), the\n     panel above them; both on <body>, only on this page. Everything under its own ids, so Cargo's button, select and input\n     styles stay out (#hc-pp-pd-panel button etc. reset them; the class rules after them win over the reset) */\n  #hc-pp-pd-btn { display: none; position: fixed; left: 200px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); z-index: 1001;\n    min-height: 44px; margin: 0; padding: 0 18px; border: 0; border-radius: 999px; background: #fff; color: #492E46;\n    font-family: pacaembu, sans-serif; font-size: 15px; font-weight: normal; line-height: 1; letter-spacing: .02em; text-transform: none; cursor: pointer;\n    box-shadow: 0 6px 16px -6px rgba(73, 46, 70, .5); -webkit-tap-highlight-color: transparent; }\n  html.hc-pp-on #hc-pp-pd-btn { display: inline-flex; align-items: center; }\n  #hc-pp-pd-btn[aria-expanded=\"true\"] { background: #492E46; color: #F3DCDF; }\n  #hc-pp-pd-btn:focus { outline: none; }\n  #hc-pp-pd-btn:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 3px; }\n  html.hc-ns #hc-pp-pd-btn { background: #c0c0c0 !important; color: #000 !important; border: 2px solid !important;\n    border-color: #fff #404040 #404040 #fff !important; border-radius: 0; box-shadow: none !important; font-family: Arial, Helvetica, sans-serif !important; }\n  html.hc-ns #hc-pp-pd-btn[aria-expanded=\"true\"] { border-color: #404040 #fff #fff #404040 !important; }\n  html.hc-gc #hc-pp-pd-btn { background: #ff00ff !important; color: #ffff00 !important; border: 3px outset #ff99ff !important; box-shadow: none !important; }\n  html.hc-gc #hc-pp-pd-btn[aria-expanded=\"true\"] { border-style: inset !important; }\n\n  #hc-pp-pd-panel { position: fixed; left: 16px; right: 16px; bottom: 72px; z-index: 1001; box-sizing: border-box; max-width: 780px; margin: 0 auto;\n    padding: 12px 14px 14px; border: 0; background: #fff; color: #492E46; border-radius: 6px 6px 16px 16px;\n    font: 15px/1.3 pacaembu, sans-serif; letter-spacing: .04em; text-align: left; text-transform: none;\n    box-shadow: 0 1px 1px rgba(73, 46, 70, .12), 0 14px 30px -10px rgba(73, 46, 70, .45); transform: rotate(-.3deg); transform-origin: 50% 100%;\n    max-height: 45vh; overflow-y: auto; overscroll-behavior: contain; }   /* desktop: at most 45% of the screen, so strips stay in view */\n  #hc-pp-pd-panel[hidden], html:not(.hc-pp-on) #hc-pp-pd-panel { display: none !important; }\n  #hc-pp-pd-panel * { box-sizing: border-box; }\n  #hc-pp-pd-panel div, #hc-pp-pd-panel span, #hc-pp-pd-panel label { margin: 0; padding: 0; border: 0; background: none; color: inherit; font: inherit; letter-spacing: inherit; text-transform: none; }\n  #hc-pp-pd-panel button, #hc-pp-pd-panel select, #hc-pp-pd-panel input { margin: 0; padding: 1px 6px; border: 0; background: none; box-shadow: none; text-transform: none;\n    font: inherit; letter-spacing: .04em; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }\n  #hc-pp-pd-panel button:focus, #hc-pp-pd-panel select:focus { outline: none; }\n  #hc-pp-pd-panel button:focus-visible, #hc-pp-pd-panel input:focus-visible, #hc-pp-pd-panel select:focus-visible { outline: 3px solid #3BBFC9; outline-offset: 2px; }\n  #hc-pp-pd-panel .hc-pp-pd-top { position: sticky; top: -12px; z-index: 1; display: flex; align-items: center; gap: 10px; margin: -12px -14px 10px; padding: 12px 14px 0; background: #fff; }\n  #hc-pp-pd-panel .hc-pp-pd-go, #hc-pp-pd-panel .hc-pp-pd-clear, #hc-pp-pd-panel .hc-pp-pd-x { min-height: 40px; border: 0; border-radius: 999px; padding: 0 16px; }\n  #hc-pp-pd-panel .hc-pp-pd-go { background: #492E46; color: #F3DCDF; min-width: 84px; }\n  #hc-pp-pd-panel .hc-pp-pd-clear { background: rgba(73, 46, 70, .09); }\n  #hc-pp-pd-panel .hc-pp-pd-x { margin-left: auto; background: none; min-width: 40px; padding: 0 10px; color: rgba(73, 46, 70, .66); }\n  #hc-pp-pd-panel .hc-pp-pd-speed { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; max-width: 300px; }\n  #hc-pp-pd-panel .hc-pp-pd-speed label { color: rgba(73, 46, 70, .66); font-size: 14px; }\n  #hc-pp-pd-panel .hc-pp-pd-num { min-width: 2.2em; text-align: right; font-weight: 800; font-variant-numeric: tabular-nums; }\n  #hc-pp-pd-panel .hc-pp-pd-speed input { flex: 1; min-width: 0; width: auto; height: 28px; padding: 0; accent-color: #492E46; margin: 0; }\n  #hc-pp-pd-panel .hc-pp-pd-rows { display: grid; gap: 5px; }\n  #hc-pp-pd-panel .hc-pp-pd-row { display: grid; grid-template-columns: 132px 1fr; align-items: center; gap: 6px; }\n  #hc-pp-pd-panel .hc-pp-pd-name { font-size: 14px; color: rgba(73, 46, 70, .66); }\n  #hc-pp-pd-panel .hc-pp-pd-vname { display: flex; align-items: center; gap: 4px; min-width: 0; }\n  #hc-pp-pd-panel .hc-pp-pd-pick { flex: 1; min-width: 0; height: 30px; padding: 0 4px; border: 0; border-radius: 5px; background: rgba(73, 46, 70, .09); color: #492E46; font: inherit; font-size: 13px; letter-spacing: .02em; cursor: pointer; text-overflow: ellipsis; }\n  #hc-pp-pd-panel .hc-pp-pd-steps { display: grid; grid-template-columns: repeat(16, 1fr); gap: 4px; }\n  #hc-pp-pd-panel .hc-pp-pd-step { height: 30px; min-width: 0; padding: 0; border: 0; border-radius: 5px; background: rgba(73, 46, 70, .09); }\n  #hc-pp-pd-panel .hc-pp-pd-step.hc-pp-pd-b { background: rgba(73, 46, 70, .17); }\n  #hc-pp-pd-panel .hc-pp-pd-step[aria-pressed=\"true\"] { background: #492E46; }\n  #hc-pp-pd-panel .hc-pp-pd-step.hc-pp-pd-now { transform: translateY(-2px); background: rgba(73, 46, 70, .4); }\n  #hc-pp-pd-panel .hc-pp-pd-step.hc-pp-pd-now[aria-pressed=\"true\"] { background: #8d6a89; }\n  #hc-pp-pd-panel .hc-pp-pd-pads { display: grid; gap: 8px; margin-top: 12px; }\n  #hc-pp-pd-panel .hc-pp-pd-grp { min-width: 0; }\n  #hc-pp-pd-panel .hc-pp-pd-cap { display: block; margin: 0 0 4px; font-size: 13px; color: rgba(73, 46, 70, .66); }\n  #hc-pp-pd-panel .hc-pp-pd-fills { display: flex; gap: 8px; }\n  #hc-pp-pd-panel .hc-pp-pd-fill { flex: 1; min-width: 72px; height: 50px; border: 0; border-radius: 10px; background: #F3DCDF; font-weight: 700; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; touch-action: none; box-shadow: 0 2px 0 rgba(73, 46, 70, .25); }\n  #hc-pp-pd-panel .hc-pp-pd-fill.hc-pp-pd-on { transform: translateY(2px); box-shadow: none; background: #492E46; color: #F3DCDF; }\n  #hc-pp-pd-panel .hc-pp-pd-says { display: flex; flex-wrap: wrap; gap: 6px 5px; }\n  #hc-pp-pd-panel .hc-pp-pd-say { min-width: 0; min-height: 44px; padding: 0 10px; border: 0; border-radius: 10px; background: #F3DCDF; font-size: 14px; user-select: none; -webkit-user-select: none; box-shadow: 0 2px 0 rgba(73, 46, 70, .25); }\n  #hc-pp-pd-panel .hc-pp-pd-say:active, #hc-pp-pd-panel .hc-pp-pd-say.hc-pp-pd-on { transform: translateY(2px); box-shadow: none; }\n  #hc-pp-pd-panel .hc-pp-pd-say.hc-pp-pd-on { background: #492E46; color: #F3DCDF; }\n  #hc-pp-pd-panel .hc-pp-pd-say[aria-disabled=\"true\"] { opacity: .42; cursor: default; box-shadow: none; background: rgba(73, 46, 70, .07); }\n  #hc-pp-pd-panel .hc-pp-pd-say[aria-disabled=\"true\"]:active { transform: none; }\n  @media (max-width: 640px) {\n    #hc-pp-pd-panel { left: 10px; right: 10px; bottom: 68px; padding: 10px 10px 12px; max-height: 36vh; overflow-y: auto; overscroll-behavior: contain; }\n    #hc-pp-pd-panel .hc-pp-pd-top { position: sticky; top: -10px; z-index: 1; background: #fff; margin: -10px -10px 8px; padding: 10px 10px 6px; gap: 8px; }\n    #hc-pp-pd-panel .hc-pp-pd-go, #hc-pp-pd-panel .hc-pp-pd-clear { padding: 0 12px; min-width: 0; }\n    #hc-pp-pd-panel .hc-pp-pd-speed label { display: none; }\n    #hc-pp-pd-panel .hc-pp-pd-row { grid-template-columns: 1fr; gap: 2px; }\n    #hc-pp-pd-panel .hc-pp-pd-vname { gap: 8px; } #hc-pp-pd-panel .hc-pp-pd-pick { flex: none; max-width: 60%; height: 34px; padding: 0 8px; font-size: 14px; }\n    #hc-pp-pd-panel .hc-pp-pd-name { font-size: 13px; line-height: 1; }\n    #hc-pp-pd-panel .hc-pp-pd-steps { grid-template-columns: repeat(8, 1fr); gap: 4px; }\n    #hc-pp-pd-panel .hc-pp-pd-step { height: 30px; }\n    #hc-pp-pd-panel .hc-pp-pd-fill { height: 44px; }\n    #hc-pp-pd-panel .hc-pp-pd-say { padding: 0 12px; }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    #hc-pp-pd-panel *, #hc-pp-pd-btn { transition: none !important; animation: none !important; }\n    #hc-pp-pd-panel .hc-pp-pd-step.hc-pp-pd-now, #hc-pp-pd-panel .hc-pp-pd-fill.hc-pp-pd-on, #hc-pp-pd-panel .hc-pp-pd-say:active, #hc-pp-pd-panel .hc-pp-pd-say.hc-pp-pd-on { transform: none; }\n  }\n"; document.head.appendChild(s); })();
(function () {
  if (window.__hcPalettePiano) return;
  window.__hcPalettePiano = true;
  var PAGE = /palette-piano/i;
  var PALETTES = [{"title":"Þroskahjálp - the art calendar","url":"Troskahjalp-the-art-calendar","colours":[["#fefdfd",0.659],["#d1b171",0.087],["#ce8d58",0.136],["#e1d9cd",0.062],["#99795b",0.056]]},{"title":"Retro Stefson - Retro Stefson","url":"Retro-Stefson-Retro-Stefson","colours":[["#8b2e21",0.301],["#3d4e54",0.209],["#537279",0.17],["#f0f4f3",0.168],["#89c0bd",0.152]]},{"title":"Cheerios","url":"Cheerios","colours":[["#fad612",0.356],["#fffffe",0.354],["#f2e292",0.14],["#d2bd43",0.09],["#ccc3ac",0.06]]},{"title":"FM Belfast - how to make friends","url":"FM-Belfast-how-to-make-friends","colours":[["#eae7d4",0.462],["#6c72a8",0.22],["#f5a76d",0.132],["#5554a6",0.104],["#b66d95",0.082]]},{"title":"The Mouse Wrestler","url":"The-Mouse-Wrestler","colours":[["#1b272c",0.669],["#fdfdfd",0.209],["#d9e0e4",0.043],["#5c8099",0.04],["#33444d",0.039]]},{"title":"Retro Stefson - Kimbabwe","url":"Retro-Stefson-Kimbabwe","colours":[["#4192af",0.348],["#f9f9f8",0.212],["#1d596d",0.173],["#44737d",0.148],["#9bb8c3",0.119]]},{"title":"Sesar A - Gerðuþaðsjálfur (Doityourself)","url":"Sesar-A-Gerdutadsjalfur-Doityourself","colours":[["#fefefd",0.899],["#bfb7b8",0.062],["#e3e1df",0.026],["#a29a99",0.013]]},{"title":"Rímnamín","url":"Rimnamin","colours":[["#daedf6",0.492],["#82c5e4",0.378],["#f7d34f",0.07],["#e29947",0.035],["#af2c20",0.025]]},{"title":"Apparat Organ Quartet - Romantika","url":"Apparat-Organ-Quartet-Romantika","colours":[["#fefefe",0.632],["#b5d4db",0.176],["#89aab0",0.082],["#f6dc31",0.059],["#6e7673",0.051]]},{"title":"Millilending","url":"Millilending","colours":[["#fefefe",0.555],["#d5d4e0",0.286],["#b7b9c4",0.091],["#6c7172",0.051],["#7277ba",0.017]]},{"title":"Herbergi í öðrum heimi","url":"Herbergi-i-odrum-heimi","colours":[["#f4f3f1",0.354],["#a9503e",0.319],["#d9d8d5",0.118],["#b5aba8",0.108],["#222330",0.101]]},{"title":"Blue walker","url":"Blue-walker","colours":[["#ffffff",0.819],["#21c7e6",0.101],["#c2eef6",0.043],["#70d9ed",0.036]]},{"title":"Retro Stefson visual identity","url":"Retro-Stefson-visual-identity","colours":[["#000000",1]]},{"title":"Sesar A - Stormurinn á eftir logninu","url":"Sesar-A-Stormurinn-a-eftir-logninu","colours":[["#d64c1d",0.373],["#fbfafa",0.243],["#c3b8b3",0.136],["#b48f88",0.126],["#505a59",0.123]]},{"title":"Fastland soccer uniform","url":"Fastland-soccer-uniform","colours":[["#fdfdfc",0.714],["#f8ed12",0.142],["#09adec",0.062],["#e42093",0.051],["#d2c7d6",0.03]]},{"title":"Smite The World","url":"Smite-The-World","colours":[["#fdfdfd",0.736],["#dcdcdc",0.106],["#b9b9b9",0.071],["#949494",0.05],["#6d6d6d",0.037]]},{"title":"Liggikrútt","url":"Liggikrutt","colours":[["#ffffff",0.901],["#dce0e7",0.061],["#bcc4d1",0.031],["#93a0b6",0.006]]},{"title":"Fluffyhead","url":"Fluffyhead","colours":[["#91d8f7",0.597],["#fcfeff",0.227],["#2aaae1",0.093],["#cdedfa",0.056],["#62c2eb",0.026]]},{"title":"Retro Stefson - Montaña","url":"Retro-Stefson-Montana","colours":[["#080f12",0.382],["#7099b4",0.185],["#4e7799",0.18],["#282d31",0.156],["#b15649",0.097]]},{"title":"Halli lettering","url":"Halli-lettering","colours":[["#f4cb48",0.853],["#dcd3a1",0.063],["#dda452",0.052],["#e3ebd5",0.017],["#e3b7c2",0.015]]},{"title":"Pungstöppuslayer","url":"Pungstoppuslayer","colours":[["#ffffff",0.809],["#d4d8dc",0.171],["#b1b9c2",0.02]]},{"title":"Retro Stefson - Qween","url":"Retro-Stefson-Qween","colours":[["#fefefe",0.32],["#252322",0.383],["#4a4745",0.117],["#635f5d",0.1],["#7b7675",0.079]]},{"title":"Uppskriftabók - skáldverk","url":"Uppskriftabok-skaldverk","colours":[["#f4f0ee",0.831],["#15100d",0.107],["#d0cbc6",0.028],["#b0a9a2",0.02],["#5b5550",0.013]]},{"title":"Fran Lebowitz","url":"Fran-Lebowitz","colours":[["#dca21e",0.614],["#144463",0.204],["#249bdf",0.065],["#fdfdfc",0.059],["#9c873d",0.058]]},{"title":"Blómakona","url":"Blomakona","colours":[["#f6b3f5",0.674],["#9ec3c1",0.134],["#beb2e6",0.124],["#f3def7",0.052],["#6298e5",0.017]]},{"title":"Magse - Maximum Weights vol. 1","url":"Magse-Maximum-Weights-vol-1","colours":[["#f5f2ef",0.312],["#088990",0.222],["#d9b9a2",0.211],["#4641a4",0.151],["#9e80a5",0.104]]},{"title":"Adventure Girl","url":"Adventure-Girl","colours":[["#fefefe",0.821],["#ced4d2",0.077],["#a3a99b",0.048],["#41a1d9",0.029],["#d4ac43",0.025]]},{"title":"Joker Classique","url":"Joker-Classique","colours":[["#f4da71",0.785],["#33a831",0.075],["#b9b76b",0.056],["#9d4eab",0.053],["#dfe0d0",0.031]]},{"title":"Cat family","url":"Cat-family","colours":[["#f2f1ee",0.922],["#c7ced6",0.061],["#8b9fc0",0.011],["#7289b2",0.007]]},{"title":"hairtower","url":"hairtower","colours":[["#ffffff",0.805],["#4d95e5",0.07],["#d4e2ec",0.064],["#a7c8e5",0.041],["#75abe2",0.02]]},{"title":"Sitjikall","url":"Sitjikall","colours":[["#ffffff",0.865],["#e2e5ea",0.068],["#c6cdd8",0.059],["#9faabd",0.008]]},{"title":"Bluefluffy","url":"Bluefluffy","colours":[["#2aaee7",0.51],["#010101",0.372],["#111523",0.044],["#2a7fab",0.04],["#1a475e",0.033]]},{"title":"Skokkikona","url":"Skokkikona","colours":[["#fefefe",0.762],["#c4d66c",0.136],["#c6d2d0",0.039],["#adbcbb",0.037],["#b2c186",0.026]]},{"title":"Krjúpandi blómakona","url":"Krjupandi-blomakona","colours":[["#fefefe",0.749],["#cbd5de",0.16],["#aab2c7",0.067],["#8395b6",0.024]]},{"title":"Tyrole and the crew","url":"Tyrole-and-the-crew","colours":[["#f5f7f8",0.368],["#bdd6df",0.209],["#43acdd",0.16],["#aaaea3",0.132],["#051118",0.132]]},{"title":"Boyband","url":"Boyband","colours":[["#f7ffff",0.89],["#d4e9f4",0.038],["#b3d4ea",0.042],["#67b3df",0.024],["#267abf",0.007]]},{"title":"Main Girl","url":"Main-Girl-1","colours":[["#ffffff",0.738],["#469cc0",0.122],["#529d19",0.051],["#65b51e",0.048],["#3c778b",0.041]]},{"title":"Adopt this cat","url":"Adopt-this-cat","colours":[["#fefefe",0.63],["#ede1c6",0.14],["#e9c690",0.13],["#eba05c",0.063],["#bad3b5",0.037]]},{"title":"Blue sinker","url":"Blue-sinker","colours":[["#ecf4f5",0.287],["#050708",0.273],["#b5d8de",0.179],["#182326",0.176],["#3dc7e0",0.085]]},{"title":"Icelandsmites","url":"Icelandsmites","colours":[["#fdfdfd",0.662],["#dddddd",0.108],["#b9b9b9",0.094],["#979797",0.081],["#757575",0.054]]},{"title":"Nothing/Ekkert","url":"Nothing-Ekkert","colours":[["#fefefe",0.767],["#dfdfdf",0.138],["#bfbfbf",0.071],["#9e9e9e",0.015],["#868686",0.008]]},{"title":"Grapewaves","url":"Grapewaves","colours":[["#fdfdfd",0.615],["#e1e1e1",0.125],["#c3c3c3",0.102],["#a6a6a6",0.087],["#888888",0.071]]},{"title":"The Future Selfie","url":"The-Future-Selfie","colours":[["#fdfdfd",0.684],["#dedede",0.203],["#c0c0c0",0.063],["#989898",0.028],["#505050",0.021]]},{"title":"Pumpkinator","url":"Pumpkinator","colours":[["#fffefb",0.52],["#fc9f06",0.253],["#f98001",0.145],["#ef4e01",0.042],["#fdcd71",0.039]]},{"title":"Beardgrumphead","url":"Beardgrumphead","colours":[["#fefffe",0.532],["#fac7b6",0.38],["#fa9a7a",0.032],["#ace3f5",0.023],["#7ad3f0",0.033]]},{"title":"Things","url":"Things","colours":[["#2daae4",0.958],["#64c0ea",0.042]]},{"title":"Blue lady 1","url":"Blue-lady-1","colours":[["#ffffff",0.774],["#27c8e7",0.155],["#8fe2f1",0.071]]},{"title":"Selfie","url":"Selfie-1","colours":[["#e8d4a6",0.661],["#69ab9b",0.271],["#668697",0.024],["#3d0f75",0.023],["#5f5f8d",0.021]]},{"title":"Fartrunner","url":"Fartrunner","colours":[["#fefefe",0.717],["#eadce4",0.116],["#30517a",0.074],["#ebb4c5",0.061],["#e18aa4",0.031]]},{"title":"Presidential Election","url":"Presidential-Election","colours":[["#fefefe",0.717],["#d6d6d6",0.196],["#b6b6b6",0.078],["#939393",0.01]]},{"title":"Pedro Pilatus album artwork","url":"Pedro-Pilatus-album-artwork","colours":[["#46abc6",0.62],["#fdfdfd",0.235],["#f9dc16",0.074],["#866140",0.048],["#b5d5dd",0.023]]},{"title":"Beardmen","url":"Beardmen","colours":[["#ffffff",0.524],["#1a75bb",0.255],["#26a8df",0.183],["#bfe1f1",0.02],["#97cce7",0.019]]},{"title":"Toasterman On The Move!","url":"Toasterman-On-The-Move","colours":[["#ffffff",0.882],["#ecddea",0.11],["#d9b9d6",0.008]]},{"title":"Swimbert","url":"Swimbert-1","colours":[["#ffffff",0.758],["#4da6be",0.108],["#478ba2",0.077],["#dee0e0",0.031],["#b9c2c5",0.026]]},{"title":"Strollin' Into The Club Like","url":"Strollin-Into-The-Club-Like","colours":[["#ffffff",0.884],["#dce4f7",0.057],["#b8c8f1",0.035],["#6488e5",0.014],["#8da8eb",0.009]]},{"title":"Charles","url":"Charles-1","colours":[["#d0dea7",0.735],["#d3b28e",0.137],["#3f6b8c",0.051],["#b5916b",0.042],["#976331",0.034]]},{"title":"Greek","url":"Greek","colours":[["#ffffff",0.788],["#1475a9",0.082],["#69bdd5",0.046],["#bbb4dc",0.045],["#79a0c8",0.039]]},{"title":"Halli with a helmet on","url":"Halli-with-a-helmet-on","colours":[["#dbe7ee",0.661],["#6099ab",0.243],["#8bdbfe",0.079],["#7ac1de",0.018]]},{"title":"some finger drawings","url":"some-finger-drawings","colours":[["#d1342d",0.728],["#fefdfc",0.216],["#f5dddb",0.027],["#e59490",0.015],["#e8b3af",0.014]]},{"title":"Healthy Problems","url":"Healthy-Problems-1","colours":[["#fefefe",0.583],["#2861a0",0.315],["#c8d5e2",0.028],["#789abf",0.049],["#abbfd5",0.026]]},{"title":"Firehair","url":"Firehair-1","colours":[["#f0ab9f",0.787],["#cb9a9a",0.079],["#9de0ee",0.064],["#a48692",0.04],["#92c1d4",0.031]]},{"title":"Apparat Organ Quartet","url":"Apparat-Organ-Quartet","colours":[["#ffffff",0.912],["#121212",0.05],["#dddddd",0.018],["#353535",0.012],["#777777",0.008]]},{"title":"I LOuVrE U","url":"I-LOuVrE-U","colours":[["#853103",0.353],["#fefefe",0.246],["#924161",0.324],["#b57392",0.044],["#d2a3b7",0.033]]},{"title":"Man With Horns aka Horny Hombre","url":"Man-With-Horns-aka-Horny-Hombre","colours":[["#abd8fd",0.747],["#3b679c",0.161],["#7ab2d7",0.047],["#d6f0f9",0.024],["#5895c1",0.021]]},{"title":"The Lyrebird","url":"The-Lyrebird","colours":[["#97ac18",0.713],["#c1d23c",0.16],["#e8abe7",0.057],["#cc9e9f",0.041],["#000000",0.03]]},{"title":"Purrrtay","url":"Purrrtay","colours":[["#ffffff",0.699],["#f59a35",0.147],["#b76a4b",0.093],["#cfa392",0.031],["#dfc4bb",0.03]]},{"title":"sharkknife","url":"sharkknife","colours":[["#50dcff",0.665],["#ffffff",0.277],["#49b7d2",0.021],["#2c6e7d",0.02],["#468fa0",0.017]]},{"title":"Automysophobia","url":"Automysophobia","colours":[["#fcfdfd",0.454],["#60c4f1",0.222],["#576687",0.223],["#cae3ef",0.068],["#a3b3c1",0.033]]},{"title":"Phuture Joga","url":"Phuture-Joga","colours":[["#ffffff",0.618],["#ecb4f8",0.224],["#a194cf",0.086],["#bea8dd",0.044],["#d3d7e6",0.029]]},{"title":"DesignMarch","url":"DesignMarch","colours":[["#fefefe",0.737],["#d3e9f3",0.145],["#c5c7c9",0.08],["#9fa0a1",0.038]]},{"title":"Krónan","url":"Kronan","colours":[["#fefefe",0.648],["#d22b31",0.168],["#b01925",0.072],["#cccccd",0.059],["#b2917d",0.053]]},{"title":"Unicef Christmas Card","url":"Unicef-Christmas-Card","colours":[["#22779c",0.29],["#fefefd",0.281],["#6199b5",0.199],["#03587b",0.196],["#ce942a",0.034]]},{"title":"Í barnastærðum","url":"I-barnastardum","colours":[["#cfcdcd",0.681],["#4090a9",0.128],["#a3a6a5",0.179],["#e9d625",0.011]]},{"title":"Breakbeat","url":"Breakbeat","colours":[["#90a580",0.459],["#f9faf8",0.235],["#abcbd0",0.181],["#a1483b",0.07],["#7a7b60",0.055]]},{"title":"Snake shelf","url":"Snake-shelf","colours":[["#fefefe",0.672],["#4e982b",0.133],["#93c9d5",0.076],["#70ab50",0.06],["#c4dfdc",0.06]]},{"title":"Santa & Ogre","url":"Santa-Ogre","colours":[["#58bee6",0.325],["#dfeff5",0.303],["#a0d6eb",0.204],["#e4b5ad",0.117],["#b63739",0.051]]},{"title":"6 train head","url":"6-train-head","colours":[["#825232",0.255],["#449cbd",0.271],["#67b207",0.215],["#956947",0.211],["#5e9318",0.048]]},{"title":"Ornament Boy","url":"Ornament-Boy","colours":[["#fefefd",0.292],["#c3955e",0.258],["#ac754b",0.225],["#88d2df",0.123],["#eccf7c",0.102]]},{"title":"Rejected Tortilla Lord","url":"Rejected-Tortilla-Lord","colours":[["#ffffff",0.607],["#e9d977",0.148],["#9cbe18",0.104],["#62411c",0.097],["#7e6635",0.044]]},{"title":"The Flash Game","url":"The-Flash-Game","colours":[["#faf0c3",0.288],["#e59e91",0.243],["#265f7b",0.219],["#609a04",0.206],["#7584a6",0.044]]},{"title":"Morkinskinka","url":"Morkinskinka","colours":[["#42a0d2",0.52],["#916536",0.17],["#dba246",0.115],["#34799c",0.102],["#b57f33",0.093]]},{"title":"Idea for a fireworks company: Fuse","url":"Idea-for-a-fireworks-company-Fuse","colours":[["#ffffff",0.925],["#dcdcdc",0.022],["#8d8d8d",0.021],["#b9b9b9",0.017],["#333333",0.015]]},{"title":"Italo Disco - Opal","url":"Italo-Disco-Opal","colours":[["#f8fafb",0.385],["#4ab3f2",0.338],["#f5461e",0.113],["#a88974",0.091],["#a3d7f6",0.073]]},{"title":"A Mix of Oddities and Rarities","url":"A-Mix-of-Oddities-and-Rarities","colours":[["#fdfdfb",0.428],["#f6c53e",0.297],["#f97849",0.182],["#f6a25e",0.055],["#f7d5b7",0.038]]},{"title":"Hotplay from Europe - Minimix","url":"Hotplay-from-Europe-Minimix","colours":[["#090808",0.882],["#222830",0.044],["#2b3b4d",0.034],["#484a4c",0.027],["#315b89",0.013]]},{"title":"Italo mix 2007","url":"Italo-mix-2007","colours":[["#684d31",0.37],["#58a9bc",0.184],["#886542",0.172],["#6fc3c5",0.138],["#463726",0.136]]},{"title":"Italo Rider mix","url":"Italo-Rider-mix","colours":[["#cb8041",0.3],["#e39a57",0.265],["#b7662d",0.217],["#bd2811",0.124],["#523b2c",0.094]]},{"title":"Hey","url":"Hey","colours":[["#ccd4c4",0.802],["#b7b5a8",0.101],["#9e9a95",0.071],["#7b7173",0.02],["#564850",0.007]]},{"title":"Idea: Shoelaces","url":"Idea-Shoelaces","colours":[["#ffffff",0.925],["#dcdcdc",0.022],["#8d8d8d",0.021],["#b9b9b9",0.017],["#333333",0.015]]},{"title":"Idea: Remembering Measure Tape","url":"Idea-Remembering-Measure-Tape","colours":[["#ffffff",0.925],["#dcdcdc",0.022],["#8d8d8d",0.021],["#b9b9b9",0.017],["#333333",0.015]]},{"title":"Best GIF I've ever made (2006)","url":"Best-GIF-I-ve-ever-made-2006","colours":[["#fdfefe",0.694],["#dfe1df",0.12],["#bacdd6",0.068],["#cfc09c",0.068],["#b5a170",0.049]]},{"title":"The Office Chair","url":"The-Office-Chair","colours":[["#98918b",0.66],["#010202",0.118],["#0e0e0f",0.087],["#6f6863",0.082],["#2a2829",0.053]]},{"title":"Fletcher","url":"Fletcher","colours":[["#fefefe",0.598],["#bce2eb",0.337],["#f5cfcc",0.042],["#7cc1cb",0.012],["#63abb3",0.011]]},{"title":"Duckrador","url":"Duckrador","colours":[["#121212",0.864],["#fce6b9",0.09],["#eeb132",0.017],["#2c2927",0.015],["#c69535",0.014]]}];   // src/palettes.json, put in by tools/build_palettes.py
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- colour to music ---------- */
  // Every note comes from one set, D hirajoshi (D E F A Bb), so any strips sound fine together, in any order, overlapping.
  // Each strip takes its own character from its colours and its name: instrument, register, which notes, their order, the pace
  // and rhythm, whether a soft held note sits underneath, and now and then a trill. The same every visit.
  function hash(s) { var h = 7; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
  function hsl(hex) {
    var r = parseInt(hex.substr(1, 2), 16) / 255, g = parseInt(hex.substr(3, 2), 16) / 255, b = parseInt(hex.substr(5, 2), 16) / 255;
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), c = mx - mn, h = 0;
    if (c) h = mx === r ? ((g - b) / c + 6) % 6 : mx === g ? (b - r) / c + 2 : (r - g) / c + 4;
    return { h: h * 60, c: c, l: (mx + mn) / 2 };
  }
  function rgbDist(a, b) { var d = 0; for (var i = 1; i < 7; i += 2) { var x = parseInt(a.substr(i, 2), 16) - parseInt(b.substr(i, 2), 16); d += x * x; } return Math.sqrt(d) / 441.7; }
  function rng(seed) { return function () { seed = (seed + 0x6D2B79F5) >>> 0; var t = seed; t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function pick(r, a) { return a[Math.floor(r() * a.length)]; }

  // notes are counted in "degrees" of the scale, five to an octave; degree 0 is a low D
  var PENT = [0, 2, 3, 7, 8];   // hirajoshi on D: D E F A Bb
  function degMidi(d) { return 26 + 12 * Math.floor(d / 5) + PENT[((d % 5) + 5) % 5]; }
  var SETS = { full: [0, 1, 2, 3, 4], open: [0, 1, 3, 4], ring: [0, 2, 3] };     // all five; no F; only D F A
  function allowed(d, set) { return set.indexOf(((d % 5) + 5) % 5) >= 0; }
  function snap(d, set) { for (var k = 0; k < 5; k++) { if (allowed(d - k, set)) return d - k; if (allowed(d + k, set)) return d + k; } return d; }
  function stepFrom(d, dir, set) { do { d += dir; } while (!allowed(d, set)); return d; }
  function degRange(lo, hi) { var a = 0; while (degMidi(a) < lo) a++; var b = a; while (degMidi(b + 1) <= hi) b++; return [a, b]; }
  // each synth's comfortable range (midi notes) and its natural pace (ms added to the gap between notes)
  // (boc is now the rubber-band "boing" voice and hopkins the silly "yoy" voice: the names stay, the dreamy sounds went, 2026-11-16)
  var INSTR = { kraft: [50, 81, -25], numan: [43, 74, 15], boc: [45, 76, -20], acid: [38, 62, -40], hopkins: [50, 74, -5], italo: [50, 81, -30] };
  // the machines play in strict time on a grid of half the strip's pace; the others keep a loose, human timing
  var STRICT = { kraft: 1, acid: 1, italo: 1 };
  // the bouncy thing underneath, in each synth's own manner (none under Kraftwerk; Italo has its running octave bass instead)
  var HELD = { numan: 'strings', boc: 'wobble', acid: 'wobble', hopkins: 'oompah' };
  // Italo strips lean in: about a quarter of the piano
  var ITALO_LEAN = 0.25;

  // which synth suits a strip: each one scores the colours, a little of the name's hash breaks near-ties
  function voiceFor(cols, url) {
    var tot = 0, grey = 0, C = 0, L = 0, M = 0, dark = 0, light = 0, warm = 0, ws = 0, x = 0, y = 0, nsat = 0;
    cols.forEach(function (c) { tot += c.share; });
    cols.forEach(function (c) {
      var s = c.share / tot; C += c.c * s; L += c.l * s; M = Math.max(M, c.c);
      if (c.grey) grey += s; if (c.l < 0.3) dark += s; if (c.l > 0.75) light += s;
      if (!c.grey) { nsat++; warm += Math.cos((c.h - 35) * Math.PI / 180) * s; ws += s; x += Math.cos(c.h * Math.PI / 180) * s; y += Math.sin(c.h * Math.PI / 180) * s; }
    });
    warm = ws ? warm / ws : 0; var spread = ws ? 1 - Math.sqrt(x * x + y * y) / ws : 0;
    var sc = {
      kraft: grey * grey * (1 - Math.min(1, M / 0.6)) + 0.25 * grey,                                               // greys, black and white
      numan: 1.2 * dark + Math.max(0, 0.6 - L) * 2.2,                                                              // dark and heavy
      boc: (1 - grey) * 0.3 + Math.max(0, 0.22 - Math.abs(C - 0.17)) * 2 + (warm > 0.2 ? 0.2 : 0) + (L > 0.6 && L < 0.88 ? 0.15 : 0) - 0.6 * dark,   // faded, pastel
      hopkins: light * (1 - Math.min(1, C * 3)) * 0.8 + (grey > 0.5 ? 0.3 * Math.min(1, M / 0.5) : 0),           // pale, airy, a touch of colour
      acid: C * M * 2.2 - 0.7 * spread + 0.12,                                                                     // bright, loud, one strong hue
      italo: C * 1.2 + spread * 0.9 * Math.min(1, C * 3) + 0.07 * nsat - 0.3 + ITALO_LEAN                          // saturated, many hues
    };
    var h = hash(url), best = null;
    ['kraft', 'numan', 'boc', 'hopkins', 'acid', 'italo'].forEach(function (k, i) {
      sc[k] += ((h >>> (3 * i)) % 97) / 97 * 0.18;
      if (best === null || sc[k] > sc[best]) best = k;
    });
    return best;
  }

  function arrange(cols, order) {
    var s = cols.slice(), n = s.length, o = [], a, b;
    function ends() { o = []; for (a = 0, b = n - 1; a <= b; a++, b--) { o.push(s[a]); if (a !== b) o.push(s[b]); } return o; }
    if (order === 'up') s.reverse();
    else if (order === 'outside-in') s = ends();
    else if (order === 'by hue') s.sort(function (x, y) { return (x.grey - y.grey) || (x.grey ? y.l - x.l : x.h - y.h); });
    else if (order === 'rising') s.sort(function (x, y) { return x.deg - y.deg || x.l - y.l; });
    else if (order === 'falling') s.sort(function (x, y) { return y.deg - x.deg || y.l - x.l; });
    else if (order === 'biggest first') s.sort(function (x, y) { return y.share - x.share; });
    else if (order === 'zigzag') { s.sort(function (x, y) { return x.deg - y.deg; }); s = ends(); }
    return s;
  }

  function planFor(p) {
    var r = rng(hash(p.url) ^ 0x5bd1e995);
    var cols = p.colours.map(function (c, i) { var k = hsl(c[0]); return { i: i, hex: c[0], share: c[1], h: k.h, c: k.c, l: k.l, grey: k.c < 0.12 }; });
    var n = cols.length, tot = 0, grey = 0, avgC = 0, avgL = 0, warm = 0, wsum = 0;
    cols.forEach(function (c) { tot += c.share; if (c.grey) grey += c.share; avgC += c.c * c.share; avgL += c.l * c.share;
      if (!c.grey) { warm += Math.cos((c.h - 35) * Math.PI / 180) * c.share; wsum += c.share; } });
    grey /= tot; avgC /= tot; avgL /= tot; warm = wsum ? warm / wsum : 0;

    // synth: chosen from the colours (see voiceFor); r() is still drawn once so every later choice comes out as before
    r(); var voice = voiceFor(cols, p.url), info = INSTR[voice], rg = degRange(info[0], info[1]), strict = !!STRICT[voice];
    var setName = pick(r, ['full', 'full', 'full', 'open', 'open', 'ring']), set = SETS[setName];

    // notes: lightness sets the height finely (so greys and whites land on different notes), hue and colourfulness nudge it
    var spread = pick(r, [0.55, 0.8, 1, 1.3]), mean = 0;
    cols.forEach(function (c) { var hw = c.grey ? 0 : Math.min(1, c.c * 2.2); c.pos = c.l * 11 + hw * c.h / 72 + c.c * 1.5; mean += c.pos * c.share / tot; });
    var centre = (rg[0] + rg[1]) / 2 + (avgL - 0.55) * 5 + (r() * 4 - 2);
    cols.forEach(function (c) {
      var d = snap(Math.round(centre + (c.pos - mean) * spread), set);
      while (d < rg[0]) d += 5; while (d > rg[1]) d -= 5;
      c.deg = d;
    });

    var order = pick(r, ['down', 'down', 'up', 'outside-in', 'by hue', 'rising', 'falling', 'biggest first', 'zigzag']);
    var seq = arrange(cols, order);

    // a trill, for a minority: two very close colours side by side trill together at the end, or a small bright accent trills in place
    var trill = null, pair = null, tr = r();
    for (var i = 1; i < n && !pair; i++) if (rgbDist(cols[i - 1].hex, cols[i].hex) < 0.1 && cols[i].l < 0.9 && cols[i - 1].l < 0.9) pair = [cols[i - 1], cols[i]];
    var acc = cols.filter(function (c) { return c.share < 0.08 && c.c > 0.3; }).sort(function (x, y) { return y.c - x.c; })[0];
    if (pair && tr < 0.55) trill = 'pair'; else if (acc && tr < 0.3) trill = 'accent';

    var gap = 205 + 110 * grey - 120 * avgC + (avgL < 0.35 ? 45 : 0) + info[2] + (r() * 100 - 50);
    gap = Math.round(Math.max(130, Math.min(420, gap)));
    var rhythms = ['even', 'hop', 'swing', 'speeding up', 'hop', 'by size', 'held last', 'pairs'];   // 'hop' (short, short, long) took over from the dreamier 'slowing down'
    if (voice !== 'numan') rhythms.push('strum');
    var rhythm = pick(r, rhythms);
    var tStep = Math.round(60 + r() * 28), tN = 9 + 2 * Math.floor(r() * 4), up = r() < 0.65 ? 1 : -1;   // 11 to 16 notes a second, ending on the main note
    // strict time: every note lands on a grid of half the pace, and a trill (a ratchet, for the acid line) on a quarter or an eighth of it
    var unit = gap / 2;
    if (strict) tStep = [unit, unit / 2, unit / 4].reduce(function (b, s) { return Math.abs(s - 72) < Math.abs(b - 72) ? s : b; });

    var items = seq.map(function (c) { return { c: c }; });
    if (trill === 'accent') items.forEach(function (it) { if (it.c === acc) it.trill = { b: stepFrom(acc.deg, up, SETS.full), band2: acc.i }; });
    if (trill === 'pair') {
      items = items.filter(function (it) { return it.c !== pair[0] && it.c !== pair[1]; });
      var a = pair[0], b = pair[1], bd = Math.abs(b.deg - a.deg) === 1 ? b.deg : stepFrom(a.deg, b.deg === a.deg ? up : b.deg > a.deg ? 1 : -1, SETS.full);
      items.push({ c: a, trill: { b: bd, band2: b.i } });
    }
    for (var j = 1; j < items.length; j++) {           // two different colours in a row get two different notes
      var x0 = items[j - 1].c, x1 = items[j].c;
      if (items[j].trill || x1.deg !== x0.deg || x1.hex === x0.hex) continue;
      var dir = x1.l >= x0.l ? 1 : -1, d = stepFrom(x1.deg, dir, set);
      x1.deg = d < rg[0] || d > rg[1] ? stepFrom(x1.deg, -dir, set) : d;
    }

    var m2 = items.length, at = 0, events = [];
    items.forEach(function (it, j) {
      var x = m2 > 1 ? j / (m2 - 1) : 0, m = 1, last = j === m2 - 1;
      if (rhythm === 'swing') m = j % 2 ? 0.62 : 1.38;
      else if (rhythm === 'speeding up') m = 1.5 - 0.9 * x;
      else if (rhythm === 'hop') m = [0.6, 0.6, 1.6][j % 3];
      else if (rhythm === 'by size') m = 0.55 + 1.6 * Math.sqrt(it.c.share);
      else if (rhythm === 'pairs') m = j % 2 ? 1.45 : 0.55;
      else if (rhythm === 'strum') m = 0.38;
      else if (rhythm === 'held last' && j === m2 - 2) m = 1.7;
      var vel = 0.5 + 0.45 * Math.sqrt(it.c.share) + 0.15 * it.c.c;
      if (rhythm === 'speeding up') vel *= 0.85 + 0.25 * x;
      if (rhythm === 'hop') vel *= j % 3 === 2 ? 1.08 : 0.9;
      var step = strict ? Math.max(1, Math.round(m * 2)) * unit : gap * m;
      var e = { at: Math.round(at), midi: degMidi(it.c.deg), vel: +Math.min(1, vel).toFixed(3), band: it.c.i,
                len: last ? (rhythm === 'held last' || rhythm === 'strum' ? 2.2 : 1) : +(step * 1.15 / 1000).toFixed(2) };
      if (it.trill) { e.trill = { midi2: degMidi(it.trill.b), step: tStep, n: tN, band2: it.trill.band2 };
        at += strict ? Math.ceil((tStep * tN + gap * 0.6) / unit - 0.01) * unit : tStep * tN + gap * 0.6; }
      else at += step;
      events.push(e);
    });

    // something bouncy underneath, more often for grey and dark strips: D, or A when the strip starts on A or E; low or middle as before
    var drone = null;
    if (r() < 0.2 + 0.3 * grey + (avgL < 0.4 ? 0.2 : 0) && HELD[voice]) {   // no held note under the Kraftwerk strips: Halli found the vocoder drone thin (2026-11-16)
      var low = (events[0].midi - 2) % 12, onA = low === 7 || low === 2;     // A or E
      drone = { voice: HELD[voice], midi: warm > 0.1 || avgL < 0.4 ? (onA ? 45 : 38) : (onA ? 57 : 50) };
    }

    // the comic touch: a fair share of strips get one goofy gesture, chosen from the main colour and the name, the same every visit
    var h2 = hash(p.url + '~'), dom = cols.slice().sort(function (x, y) { return y.share - x.share; })[0], goofy = voice === 'boc' || voice === 'hopkins';
    var chance = goofy ? 70 : 38 + Math.round(40 * avgC), hueStep = dom.grey ? Math.round(dom.l * 9) : Math.floor(dom.h / 36);
    var menu = GESTURES.filter(function (g) { return !(strict && g === 'hiccup') && !(voice === 'boc' && g === 'boing') && !(voice === 'hopkins' && g === 'yoy'); });
    var gesture = voice === 'italo' ? 'syndrum' : (h2 >>> 4) % 100 < chance ? menu[(hueStep * 7 + (h2 >>> 12)) % menu.length] : null;
    var extras = [], end = Math.round(at), le = events[events.length - 1], ld = midiDeg(le.midi);
    function q(ms) { return strict ? Math.max(1, Math.round(ms / unit)) * unit : Math.round(ms); }
    function add(t, v, d, vel, x) { var e = { at: Math.round(t * 10) / 10, voice: v, midi: degMidi(d), vel: vel, band: le.band }; for (var k in x) e[k] = x[k]; extras.push(e); }
    if (gesture === 'boing') add(end, 'boing', inOct(ld, 38, 52), 0.85);
    else if (gesture === 'whistle') { var dw = inOct(ld, 67, 79); add(end, 'whistle', dw, 0.8, { to: degMidi(dw + 5) }); }
    else if (gesture === 'trombone') { var dt = inOct(ld, 53, 65), st = q(Math.max(230, gap * 1.1));     // wah, wah, wah, waaah
      for (var w = 0; w < 4; w++) add(end + w * st, 'trombone', dt - w, 0.8, w < 3 ? { len: st * 0.75 / 1000 } : { len: 1, fall: true, to: degMidi(dt - 4) }); }
    else if (gesture === 'tada') { var da = inOct(ld, 62, 74); add(end, 'tada', da, 0.7, { len: 0.07 }); add(end + q(Math.max(110, gap * 0.55)), 'tada', da + 5, 0.9, { stab: true, len: 0.55 }); }
    else if (gesture === 'quack') { var dq = inOct(ld, 55, 66); add(end, 'quack', dq, 0.85); add(end + q(170), 'quack', dq, 0.7); }
    else if (gesture === 'yoy') add(end, 'hopkins', inOct(ld, 55, 67), 0.9, { len: 0.45 });
    else if (gesture === 'pew') events.forEach(function (e, j) { if (j === 0 || j === Math.floor(events.length / 2) && j > 1) add(e.at, 'pew', inOct(midiDeg(e.midi), 62, 74), 0.7, { band: e.band }); });
    else if (gesture === 'clonk') events.forEach(function (e, j) { if (j % 2 === 0 && j < 8) add(e.at, 'clonk', inOct(midiDeg(e.midi), 74, 86), 0.75, { band: e.band }); });
    else if (gesture === 'cowbell') events.forEach(function (e, j) { if (j % 3 === 0) add(e.at, 'cowbell', midiDeg(h2 & 1 ? 74 : 69), 0.7, { band: e.band }); });
    else if (gesture === 'hiccup') events.forEach(function (e, j) { if ((j === 1 || j === events.length - 1) && j > 0)      // a quick grace note a step above, in the strip's own voice
      add(Math.max(events[j - 1].at + 20, e.at - 55), 'self', stepFrom(midiDeg(e.midi), 1, SETS.full), e.vel * 0.7, { short: true, len: 0.05, band: e.band }); });
    else if (gesture === 'syndrum') { var ds = inOct(ld, 45, 57); add(end, 'syndrum', ds, 0.8); add(end + q(gap * 0.5), 'syndrum', ds - 2, 0.7); }   // pew, pew

    // Italo: the running octave bass, low and high, in sixteenths or eighths, under the whole strip; handclaps on the backbeat for most
    var bass = voice !== 'italo' ? null : { eighths: (h2 >>> 9) % 5 < 2, k16: unit >= 90 ? 1 : 2, pat: ['LH', 'LH', 'LHLHLHHL'][(h2 >>> 14) % 3], clap: (h2 >>> 17) % 3 !== 0 };

    // The owner's own recordings (drums.js loads them as window.PPVoices), chosen from the name and the main colour.
    // About 1 strip in 11 is backed by "HalliChord 1"; about 1 in 8 plays 0.6 s of each "HalliChord 2a" to "2d", in its own order;
    // about a quarter of the rest say something. The chords are 20 to 45 cents sharp of A440 and in other keys
    // (1: B maj7 over F#; 2a-2d: F#, E, D and B add9), off D hirajoshi, so a chord strip plays the recording alone. Everything else stays as planned,
    // and is played as before whenever a recording is missing at press time.
    var hv = mix(hash(p.url + '|' + dom.hex + VSALT)), u = hv % 1000, chord = null, say = null;
    if (u < 85) chord = { kind: 'A', names: ['chord-1'], offset: 0.12 };          // the recording's sound starts 0.12 s in: on the first band
    else if (u < 213) chord = { kind: 'B', names: perm(CHORD2, (hv >>> 10) % 24), offset: 0, slice: 0.6 };   // 2a-2d sound from their first 10 ms
    else if ((hv >>> 10) % 4 === 0) {
      var vn = SAYS[(hv >>> 13) % SAYS.length], moment = ['start', 'gap', 'end'][(hv >>> 17) % 3], gj = -1, gl = 0;
      for (var g2 = 1; g2 < events.length; g2++) if (events[g2].at - events[g2 - 1].at > gl) { gl = events[g2].at - events[g2 - 1].at; gj = g2 - 1; }
      if (moment === 'gap' && gl < 260) moment = 'end';
      if (moment === 'end' && gesture && ENDINGS[gesture]) moment = 'start';      // the joke keeps the last word
      say = { name: vn, moment: moment, at: moment === 'start' ? 0 : moment === 'gap' ? events[gj].at + 60 : end + 40, len: null };
    }
    var plan = { voice: voice, strict: strict, unit: unit, notes: setName, order: order, rhythm: rhythm, gap: gap, spread: spread, trill: trill, drone: drone,
             saw: (hash(p.url) >>> 7) % 3 !== 0, eighth: (gap < 170 ? 2 : 1) * gap / 1000, beat: Math.max(0.55, Math.min(0.95, gap * 3 / 1000)),
             events: events, total: end, gesture: gesture, extras: extras, say: say, chord: chord, bass: bass,
             bandMidi: cols.map(function (c) { return degMidi(c.deg); }), bandVel: cols.map(function (c) { return Math.min(1, 0.55 + 0.4 * Math.sqrt(c.share) + 0.15 * c.c); }) };
    plan.bassNotes = bassLine(plan, 1, ownS16(plan));
    return plan;
  }
  var GESTURES = ['boing', 'whistle', 'trombone', 'tada', 'quack', 'pew', 'clonk', 'cowbell', 'hiccup', 'yoy'];
  var ENDINGS = { boing: 1, whistle: 1, trombone: 1, tada: 1, quack: 1, yoy: 1 };
  // the recordings, by the names drums.js gives them; the salt was picked so today's 94 strips come out 9 / 12 / 22, every voice on 2 or 3
  var CHORD2 = ['chord-2a', 'chord-2b', 'chord-2c', 'chord-2d'], VSALT = '~v18721';
  var SAYS = ['blodclot', 'bring-the-beat-back', 'comon-man', 'diou', 'drssh', 'dunng', 'oh-yea', 'rastafari', 'wiggedy-wah'];
  function mix(x) { x ^= x >>> 16; x = Math.imul(x, 0x85ebca6b); x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); x ^= x >>> 16; return x >>> 0; }
  function perm(a, k) { var s = a.slice(), o = []; for (var n = s.length; n; n--) { o.push(s.splice(k % n, 1)[0]); k = Math.floor(k / n); } return o; }   // the k-th of the n! orders
  function midiDeg(m) { var o = Math.floor((m - 26) / 12), k = PENT.indexOf(((m - 26) % 12 + 12) % 12); return o * 5 + Math.max(0, k); }
  function inOct(d, lo, hi) { while (degMidi(d) < lo) d += 5; while (degMidi(d) > hi) d -= 5; return d; }
  // the octave bass, note by note: sc stretches the strip's own timing (to lock it to the drums), s16 is the length of a sixteenth (ms)
  var BASSROOT = { 2: 38, 4: 40, 5: 41, 9: 33, 10: 34 };      // D2 E2 F2 A1 Bb1
  function ownS16(pl) { return pl.unit * (pl.bass ? pl.bass.k16 : 1); }
  function bassLine(pl, sc, s16) {
    var b = pl.bass; if (!b) return [];
    var step = s16 * (b.eighths ? 2 : 1), beat = b.eighths ? 2 : 4, ev = pl.events, bar = step * beat * 4, out = [], j = 0, root = 38;
    var end = Math.max(1, Math.ceil(pl.total * sc / bar - 0.05)) * bar;      // the line runs to the end of the bar, so even a short strip grooves
    for (var k = 0; k * step <= end + 0.5; k++) {
      var t = k * step, last = t + step > end + 0.5;
      if (k % (beat * 2) === 0 || last) { while (j + 1 < ev.length && ev[j + 1].at * sc <= t + 0.5) j++; root = BASSROOT[ev[j].midi % 12]; }   // follows the strip's notes, every two beats
      var hi = !last && b.pat.charAt(k % b.pat.length) === 'H';
      out.push({ at: Math.round(t * 10) / 10, midi: root + (hi ? 12 : 0), vel: k % beat === 0 ? 0.9 : 0.7, len: (last ? step * 2.5 : step * 0.62) / 1000,
                 clap: b.clap && !last && k % (beat * 2) === beat });
    }
    return out;
  }

  /* ---------- the page ---------- */
  var HTML =
    '<a class="hc-pp-back" href="/playthings">← playthings</a>' +
    '<h1>Proper palette piano player</h1>' +
    '<p class="hc-pp-lede">Every project as a strip of its own colors, for you to click\'n play.</p>' +
    '<p class="hc-pp-sr" id="hc-pp-keyhelp">Use the arrow keys to move between projects. Enter or Space plays the colours, and Tab goes to the link for that project.</p>' +
    '<ul class="hc-pp-keys" id="hc-pp-keys" aria-label="Palette piano, one key for each project" aria-describedby="hc-pp-keyhelp"></ul>';
  var PLANS = {};   // every strip's plan, worked out once (the same every visit)
  var root = null, list = null, keys = [], cur = 0;
  function live() { return !!root && root.isConnected; }

  // the sound switch lives on <body> (a fixed element inside the page's moved box would move with it); shown only here
  var quiet = document.createElement('button');
  quiet.type = 'button'; quiet.className = 'hc-pp-quiet'; quiet.id = 'hc-pp-quiet'; quiet.setAttribute('aria-pressed', 'false');
  quiet.textContent = 'Turn the sound off';

  /* ---------- sound: analog-style synths built from scratch, no samples ---------- */
  // Saw and pulse oscillators, two or three a hair apart and drifting a little differently on every note, through resonant filters
  // whose cutoff moves with each note; a soft saturation over everything. Every source stops (and lets go of its wiring) when its note ends.
  var ctx = null, master, verbSend, delaySend, hallSend, NOISE, PW = {}, CURVES = {}, volume = 0.7, muted = false, timers = [], holding = [], lastNote = 0, SRC = null;
  function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  // a reverb's impulse: noise fading out; dark = the tail loses its highs as it goes, like a big soft room
  function impulse(secs, shape, dark) {
    var len = Math.floor(ctx.sampleRate * secs), buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var c = 0; c < 2; c++) { var d = buf.getChannelData(c), lp = 0;
      for (var i = 0; i < len; i++) { var x = i / len, a = dark ? 0.85 - 0.75 * x : 1; lp += a * (Math.random() * 2 - 1 - lp); d[i] = lp * Math.pow(1 - x, shape); } }
    return buf;
  }
  function setup(ac) {
    ctx = ac; PW = {}; CURVES = {};
    master = ctx.createGain(); master.gain.value = muted ? 0 : volume;
    var warmth = ctx.createWaveShaper(); warmth.curve = soft(1.3); warmth.oversample = '2x';     // gentle tape-ish saturation over everything
    var comp = ctx.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 3;
    master.connect(warmth); warmth.connect(comp); comp.connect(ctx.destination);
    // smaller, drier rooms than before (was a 3.2 s room, a 6 s hall and a 0.46 s echo): bouncy, not dreamy
    var verb = ctx.createConvolver(); verb.buffer = impulse(1.2, 3, false);
    verbSend = ctx.createGain(); verbSend.gain.value = 0.4; verbSend.connect(verb); verb.connect(master);
    var hall = ctx.createConvolver(); hall.buffer = impulse(1.8, 2.4, true);
    hallSend = ctx.createGain(); hallSend.gain.value = 0.35; hallSend.connect(hall); hall.connect(master);
    var delay = ctx.createDelay(1.5), fb = ctx.createGain(), tone = ctx.createBiquadFilter();
    delay.delayTime.value = 0.3; fb.gain.value = 0.2; tone.type = 'lowpass'; tone.frequency.value = 2200;
    delaySend = ctx.createGain(); delaySend.gain.value = 0.28;
    delaySend.connect(delay); delay.connect(tone); tone.connect(fb); fb.connect(delay); tone.connect(master);
    NOISE = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    var nd = NOISE.getChannelData(0); for (var k = 0; k < nd.length; k++) nd[k] = Math.random() * 2 - 1;
  }
  function initAudio() { var AC = window.AudioContext || window.webkitAudioContext; if (AC) setup(new AC()); }

  // soft saturation: slope 1 for quiet signals, rounding off towards 1/k
  function soft(k) { if (CURVES[k]) return CURVES[k]; var n = 2048, c = new Float32Array(n);
    for (var i = 0; i < n; i++) { var x = i / (n - 1) * 2 - 1; c[i] = Math.tanh(k * x) / k; } return (CURVES[k] = c); }
  function shaper(k, dest) { var w = ctx.createWaveShaper(); w.curve = soft(k); if (dest) w.connect(dest); return w; }
  // a band-limited pulse wave of width w (0.5 = square)
  function pulse(w) {
    if (PW[w]) return PW[w];
    var n = 128, re = new Float32Array(n), im = new Float32Array(n);
    for (var k = 1; k < n; k++) { re[k] = Math.sin(2 * Math.PI * k * w) / (Math.PI * k); im[k] = (1 - Math.cos(2 * Math.PI * k * w)) / (Math.PI * k); }
    return (PW[w] = ctx.createPeriodicWave(re, im));
  }
  function track(s, t1) { s._end = t1; s.onended = function () { try { s.disconnect(); } catch (e) {} }; if (SRC) SRC.push(s); return s; }
  function osc(type, f, t0, t1, dest, cents) { var o = ctx.createOscillator();
    if (typeof type === 'string') o.type = type; else o.setPeriodicWave(type);
    o.frequency.value = f; if (cents) o.detune.value = cents; if (dest) o.connect(dest); o.start(t0); o.stop(t1); return track(o, t1); }
  function env(t, peak, atk, dec) {
    var g = ctx.createGain(); g.gain.value = 0.0001; g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + atk); g.gain.exponentialRampToValueAtTime(0.0001, t + atk + dec);
    return g;
  }
  function filt(type, f, q, dest) { var b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q != null) b.Q.value = q; if (dest) b.connect(dest); return b; }
  function amp(v, dest) { var g = ctx.createGain(); g.gain.value = v; g.connect(dest); return g; }
  function noise(t, dur, dest) { var s = ctx.createBufferSource(); s.buffer = NOISE; s.loop = true; s.connect(dest); s.start(t, Math.random() * 1.5); s.stop(t + dur); return track(s, t + dur); }
  function drift(c, a) { return (c || 0) + (Math.random() * 2 - 1) * a; }        // analog oscillators never sit exactly where they were set
  // a gate: up in atk, settling to sus × peak, held until off, then let go
  function vca(t, peak, atk, sus, decTau, off, relTau, dest) {
    var g = ctx.createGain(); g.gain.value = 0; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + atk);
    g.gain.setTargetAtTime(peak * sus, t + atk, decTau); g.gain.setTargetAtTime(0, Math.max(t + atk, off), relTau);
    if (dest) g.connect(dest); return g;
  }
  function sweep(p, t, from, to, tau) { p.setValueAtTime(from, t); p.setTargetAtTime(to, t + 0.002, tau); }
  // pitch wobble in cents (vibrato, tape wow and flutter), optionally fading in after `wait`
  function wobble(rate, cents, t, t1, oscs, wait, fade) {
    var l = osc('sine', rate, t, t1), g = ctx.createGain(); l.connect(g);
    if (wait) { g.gain.setValueAtTime(0, t); g.gain.setValueAtTime(0, t + wait); g.gain.linearRampToValueAtTime(cents, t + wait + fade); } else g.gain.value = cents;
    oscs.forEach(function (o) { g.connect(o.detune); });
  }
  function glide(oscs, ratios, t, from, f, tau) { oscs.forEach(function (o, i) { o.frequency.setValueAtTime(from * ratios[i], t); o.frequency.setTargetAtTime(f * ratios[i], t, tau); }); }
  // pulse-width modulation, the string machine way: a saw minus a slightly later copy of itself is a pulse; moving the delay moves the width
  function pwm(f, t, t1, dest, rate, cents) {
    var s = osc('sawtooth', f, t, t1, dest, cents), d = ctx.createDelay(0.05); d.delayTime.value = 0.5 / f;
    s.connect(d); d.connect(amp(-1, dest));
    var l = osc('sine', rate, t, t1); l.connect(amp(0.3 / f, d.delayTime));
    return s;
  }
  // a held note's level: a slow rise, held for len, a long let-go
  function swell(t, peak, rise, len, relTau, dest) {
    var g = ctx.createGain(); g.gain.value = 0; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + rise);
    g.gain.setValueAtTime(peak, Math.max(t + rise, t + len)); g.gain.setTargetAtTime(0, Math.max(t + rise, t + len), relTau);
    if (dest) g.connect(dest); return g;
  }

  // Each voice: (start time, frequency, output, options) → [reverb send, echo send, room send].
  // Options: vel (brightness as well as loudness), len, short (a quick trill note), solo (a note swept by hand), from (the previous note,
  // for glides), accent, slide, stab, trill (a legato trill), saw, to (where a glide lands, midi), fall, eighth / beat (the grid, in seconds).
  var VOICES = {
    // Kraftwerk: dry, exact pulse-wave blips with a snappy filter, a square an octave down for weight
    kraft: function (t, f, out, o) {
      var v = o.vel, on = o.short ? o.len * 0.5 : Math.min(0.3, Math.max(0.07, (o.len || 0.3) * 0.5)), end = t + on + 0.08;
      var g = vca(t, 0.065, 0.002, 0.7, 0.05, t + on, 0.008, out);
      var lp = filt('lowpass', 1000, 4 + 4 * v, g);
      sweep(lp.frequency, t, Math.min(14000, f * 4 + 4000 * v), f * 1.8 + 350, 0.04);
      osc(pulse(0.25), f, t, end, lp, drift(0, 1.5));
      osc(pulse(0.5), f / 2, t, end, amp(0.45, lp), drift(0, 1.5));
      return [0.04, 0.03, 0];
    },
    // Gary Numan: a fat lead of detuned saws and a sub-octave saw, saturated, through a two-stage low-pass; vibrato fades in; glides between notes
    numan: function (t, f, out, o) {
      var v = o.vel, tr = o.trill, len = tr ? tr.n * tr.step / 1000 + 0.06 : Math.max(0.16, o.len || 0.4), rel = (o.short || o.solo) && !tr ? 0.05 : 0.18, end = t + len + rel * 5;
      var g = vca(t, 0.12, 0.012, 0.8, 0.3, t + len, rel / 2, out);
      var lp2 = filt('lowpass', 1000, 0.6, g), lp1 = filt('lowpass', 1000, 1.6, lp2), mix = amp(0.4, shaper(1.8, lp1));
      var top = Math.min(9000, f * 6 + 2400 * v), sus = Math.min(6000, f * 3 + 600 * v);
      [lp1, lp2].forEach(function (b) { b.frequency.setValueAtTime(f * 1.5 + 200, t); b.frequency.linearRampToValueAtTime(top, t + 0.06);
        b.frequency.setTargetAtTime(sus, t + 0.06, 0.3); b.frequency.setTargetAtTime(f + 250, t + len, rel); });
      var os = [osc('sawtooth', f, t, end, mix, drift(-8, 3)), osc('sawtooth', f, t, end, mix, drift(7, 3)), osc('sawtooth', f / 2, t, end, amp(0.6, mix), drift(0, 3))], rs = [1, 1, 0.5];
      if (o.from && !o.short) glide(os, rs, t, o.from, f, 0.03);
      if (!o.short || tr) wobble(5.2, 11, t, end, os, 0.35, 0.8);
      if (tr) for (var q = 1; q < tr.n; q++) { var fq = q % 2 ? tr.f2 : f, tq = t + q * tr.step / 1000;
        os.forEach(function (x, i) { x.frequency.setTargetAtTime(fq * rs[i], tq, 0.012); }); }
      return [0.2, 0.14, 0];
    },
    // Numan's held note: a string machine, pulse-width-modulated saws and an octave, through an ensemble chorus (quicker in and out than before)
    strings: function (t, f, out, o) {
      var len = o.len || 2, end = t + len + 1.6; if (f < 100) f *= 2;
      var g = swell(t, 0.045, 0.4, len, 0.3, out), lp = filt('lowpass', 2200, 0.5);
      pwm(f, t, end, lp, 0.7, drift(-5, 2)); pwm(f * 2, t, end, amp(0.6, lp), 0.53, drift(6, 2)); osc('sawtooth', f * 2, t, end, amp(0.3, lp), drift(9, 3));
      lp.connect(amp(0.6, g));
      [[0.011, 0.53], [0.017, 0.81]].forEach(function (c) { var dl = ctx.createDelay(0.05); dl.delayTime.value = c[0]; lp.connect(dl); dl.connect(amp(0.5, g));
        osc('sine', c[1], t, end).connect(amp(0.004, dl.delayTime)); });
      return [0.22, 0.08, 0];
    },
    // "boc", now the boing: a rubber band plucked, triangle and a little square that spring into the note (up from below after a lower
    // note, down from above otherwise) and wobble like rubber as they settle; short and dry
    boc: function (t, f, out, o) {
      var v = o.vel, d = o.short ? Math.max(0.05, o.len * 0.8) : Math.min(0.4, Math.max(0.13, (o.len || 0.3) * 0.75)), end = t + d + 0.2;
      var up = o.from && o.from < f * 0.98, r0 = o.short ? (up ? 0.92 : 1.08) : up ? 0.6 : 1.65;
      var g = vca(t, 0.1, 0.003, 0.45, 0.1, t + d, 0.035, out), lp = filt('lowpass', Math.min(6000, f * 4 + 1500 * v), 2.5, g);
      var os = [osc('triangle', f, t, end, lp, drift(0, 3)), osc('square', f, t, end, amp(0.16, lp), drift(4, 3))];
      os.forEach(function (x) { x.frequency.setValueAtTime(f * r0, t); x.frequency.setTargetAtTime(f, t + 0.004, o.short ? 0.01 : 0.022); });
      if (!o.short) { var l = osc('sine', 9 + 3 * v, t, end), lg = ctx.createGain(); lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(55, t + 0.04);
        lg.gain.setTargetAtTime(0, t + 0.05, 0.08); l.connect(lg); os.forEach(function (x) { lg.connect(x.detune); }); }
      return [0.05, 0.05, 0];
    },
    // boing's bouncy thing underneath: a rubbery wobble bass, "wub" on every quarter, the filter and the pitch both bending
    wobble: function (t, f, out, o) {
      var len = o.len || 2, e = o.eighth || 0.25, end = t + len + 0.4, per = Math.max(0.24, Math.min(0.6, 2 * e)); while (f > 115) f /= 2;
      var g = swell(t, 0.06, 0.03, len, 0.06, out), lp = filt('lowpass', 200, 7, shaper(1.6, g));
      var os = [osc('sawtooth', f, t, end, amp(0.45, lp), drift(-6, 2)), osc(pulse(0.5), f, t, end, amp(0.35, lp), drift(6, 2))];
      osc('sine', f, t, end, amp(0.5, g));
      for (var k = 0, tk = t; tk < t + len; k++, tk = t + k * per) {
        lp.frequency.setValueAtTime(f * 1.5 + 60, tk); lp.frequency.linearRampToValueAtTime(Math.min(1800, f * 14 + 300), tk + per * 0.35); lp.frequency.linearRampToValueAtTime(f * 1.5 + 60, tk + per * 0.95);
        os.forEach(function (x) { x.detune.setValueAtTime(-60, tk); x.detune.linearRampToValueAtTime(0, tk + per * 0.3); });
      }
      return [0.03, 0, 0];
    },
    // Aphex Twin: a 303-style acid line, one saw or square into a very resonant low-pass whose envelope snaps shut; accents bite harder,
    // soft notes slide in from the last one; a trill becomes a quick ratchet with the filter opening and closing across it
    acid: function (t, f, out, o) {
      var v = o.vel, acc = o.accent && !o.short, sl = o.slide && o.from && !o.short,
        on = o.short ? o.len * 0.45 : Math.min(0.3, Math.max(0.07, (o.len || 0.25) * 0.55)) + (sl ? 0.03 : 0), end = t + on + 0.12;
      var g = vca(t, acc ? 0.12 : 0.1, 0.003, 0.85, 0.15, t + on, 0.012, out);
      var lp2 = filt('lowpass', 5000, 0.5, shaper(1.6, g)), lp = filt('lowpass', 1000, acc ? 15 : 11, lp2);
      var base = Math.min(1100, f * 1.4 + 170), peak = sl ? base * 1.6 : Math.min(7000, base + (o.short ? 400 + 1600 * (o.sweep || 0) : acc ? 2600 : 1500) * (0.6 + 0.4 * v));
      sweep(lp.frequency, t, peak, base, acc ? 0.06 : 0.11);
      var s = osc(o.saw ? 'sawtooth' : pulse(0.5), f, t, end, amp(0.6, lp), drift(0, 2));
      if (sl) glide([s], [1], t, o.from, f, 0.022);
      return [0.08, 0.14, 0];
    },
    // "hopkins", now the yoy: a cartoon voice, buzzy saw and pulse through two vowel formants that say "y-o-y" (ee, oh, ee),
    // scooping up into the note with a wobbly vibrato
    hopkins: function (t, f, out, o) {
      var v = o.vel, d = o.short ? Math.max(0.06, o.len * 0.8) : Math.min(0.5, Math.max(0.18, (o.len || 0.3) * 0.9)), end = t + d + 0.15;
      var g = vca(t, 0.14, 0.012, 0.8, 0.2, t + d, 0.04, out), src = ctx.createGain();
      var os = [osc('sawtooth', f, t, end, src, drift(-6, 2)), osc(pulse(0.3), f, t, end, amp(0.6, src), drift(6, 2))];
      glide(os, [1, 1], t, f * (o.short ? 0.97 : 0.89), f, 0.03);
      var lo = Math.max(300, f * 1.15), f1 = filt('bandpass', lo, 4, amp(1.5, g)), f2 = filt('bandpass', 2000, 5, amp(2.2, g)), m = t + d * 0.45;
      src.connect(f1); src.connect(f2); src.connect(filt('lowpass', f * 1.5, 0.7, amp(0.2, g)));
      f1.frequency.setValueAtTime(lo, t); f1.frequency.linearRampToValueAtTime(Math.max(lo * 1.1, 650 + 0.2 * v * 200), m); f1.frequency.linearRampToValueAtTime(lo * 1.05, t + d);
      f2.frequency.setValueAtTime(2100, t); f2.frequency.exponentialRampToValueAtTime(850, m); f2.frequency.exponentialRampToValueAtTime(o.short ? 1200 : 1900, t + d);
      if (!o.short) wobble(7, 28, t, end, os, 0.06, 0.08);
      return [0.06, 0.05, 0];
    },
    // yoy's bouncy thing underneath: a tuba's oom-pah, root and fifth on the beats, a little staccato chord between
    oompah: function (t, f, out, o) {
      var len = o.len || 2, beat = Math.max(0.36, Math.min(0.7, (o.beat || 0.6) * 0.75)); while (f > 115) f /= 2;
      var pc = Math.round(12 * Math.log2(f / 440) + 69 + 1200) % 12, fifth = Math.pow(2, (pc === 4 || pc === 5 ? 5 : 7) / 12);
      for (var k = 0, tk = t; tk < t + len; k++, tk = t + k * beat) {
        var fo = k % 2 ? f * fifth / (fifth > 1.4 ? 2 : 1) : f, g = vca(tk, 0.08, 0.015, 0.6, 0.08, tk + beat * 0.32, 0.03, out), lp = filt('lowpass', Math.min(900, fo * 5), 1, g);
        osc('sawtooth', fo, tk, tk + beat * 0.5, amp(0.5, lp), drift(0, 4)); osc('triangle', fo, tk, tk + beat * 0.5, lp);
        var tp = tk + beat / 2, gp = vca(tp, 0.022, 0.004, 0.5, 0.04, tp + 0.07, 0.02, out), lpp = filt('lowpass', 2400, 0.8, gp);
        [2, 2 * fifth, 4].forEach(function (r) { osc('sawtooth', f * r, tp, tp + 0.16, lpp, drift(0, 6)); });
      }
      return [0.04, 0, 0];
    },
    // Italo disco: a plucky arpeggio note with a dotted-eighth echo; first and strong notes add a bright, brassy poly stab
    italo: function (t, f, out, o) {
      var v = o.vel, e = o.eighth || 0.25, sh = o.short || o.solo;
      function pluck(t0, lvl, br) {
        var g = vca(t0, lvl, 0.002, 0.3, 0.08, t0 + 0.14, 0.04, out), lp = filt('lowpass', 1000, 4.5, g);
        sweep(lp.frequency, t0, Math.min(12000, (f * 6 + 3500 * v) * br), f * 1.4 + 250, 0.05);
        osc(pulse(0.3), f, t0, t0 + 0.4, lp, drift(-5, 2)); osc('sawtooth', f, t0, t0 + 0.4, amp(0.7, lp), drift(6, 2));
      }
      pluck(t, 0.09, 1);
      if (!sh) { pluck(t + 1.5 * e, 0.03, 0.6); pluck(t + 3 * e, 0.011, 0.4); }
      if (o.stab && !sh) {
        var pc = o.midi % 12, st = pc === 4 || pc === 5 ? 5 : 7;   // a fifth above, or a fourth above E and F, so the chord stays in the scale
        var sg = vca(t, 0.034, 0.008, 0.65, 0.09, t + 0.16, 0.05, out), sl = filt('lowpass', 500, 2.2, sg);
        sl.frequency.setValueAtTime(600, t); sl.frequency.linearRampToValueAtTime(Math.min(9000, 3200 + 2600 * v), t + 0.025); sl.frequency.setTargetAtTime(1500, t + 0.025, 0.09);
        [1, Math.pow(2, st / 12), 2].forEach(function (k) { [-8, 8].forEach(function (c) { osc('sawtooth', f * k, t, t + 0.55, amp(0.33, sl), drift(c, 3)); }); });
      }
      return [0.1, 0.06, 0];
    },
    // Italo's octave bass, one note of it: saw and square, plucked through a resonant low-pass and a little grit
    octbass: function (t, f, out, o) {
      var len = Math.max(0.05, o.len || 0.1), end = t + len + 0.08, v = o.vel;
      var g = vca(t, 0.14, 0.003, 0.55, 0.05, t + len, 0.012, out), lp = filt('lowpass', 400, 6, g), mix = amp(0.5, shaper(1.5, lp));
      sweep(lp.frequency, t, Math.min(3000, f * 8 + 500 + 500 * v), f * 2 + 120, 0.05);
      osc('sawtooth', f, t, end, mix, drift(-4, 2)); osc(pulse(0.5), f, t, end, amp(0.6, mix), drift(5, 2));
      return [0.02, 0, 0];
    },

    /* ---- the jokes: one-off goofy gestures, synthesis only ---- */
    // a spring: up into the note from far below, then a rubbery wobble that dies away
    boing: function (t, f, out, o) {
      var end = t + 0.7, g = vca(t, 0.13, 0.003, 0.55, 0.2, t + 0.35, 0.1, out), lp = filt('lowpass', Math.min(5000, f * 10), 1.2, g);
      var os = [osc('triangle', f, t, end, lp), osc('sine', f * 2, t, end, amp(0.22, lp))];
      glide(os, [1, 2], t, f * 0.5, f, 0.035);
      var l = osc('sine', 12.5, t, end), lg = ctx.createGain(); lg.gain.setValueAtTime(150, t); lg.gain.setTargetAtTime(0, t + 0.06, 0.15); l.connect(lg); os.forEach(function (x) { lg.connect(x.detune); });
      return [0.04, 0.06, 0];
    },
    // a slide whistle: a breathy sine that dips, then slides up to land on the note above
    whistle: function (t, f, out, o) {
      var f2 = o.to ? mtof(o.to) : f * 2, d = 0.6, end = t + d + 0.1, g = vca(t, 0.075, 0.03, 0.9, 0.2, t + d, 0.05, out);
      var os = [osc('sine', f, t, end, g), osc('sine', f * 2, t, end, amp(0.05, g))];
      os.forEach(function (x, i) { var k = i + 1; x.frequency.setValueAtTime(f * k, t); x.frequency.exponentialRampToValueAtTime(f * 0.93 * k, t + 0.09);
        x.frequency.exponentialRampToValueAtTime(f2 * k, t + 0.42); });
      wobble(6, 18, t, end, os, 0.42, 0.08);
      noise(t, d + 0.05, filt('bandpass', f2, 6, vca(t, 0.012, 0.03, 0.8, 0.2, t + d, 0.05, out)));
      return [0.05, 0.04, 0];
    },
    // the sad trombone: brassy saws that "wah" open on each note; the last one wilts down to the note below with a wobble
    trombone: function (t, f, out, o) {
      var d = o.fall ? 1 : Math.max(0.16, o.len || 0.25), end = t + d + 0.15;
      var g = vca(t, 0.085, 0.03, 0.85, 0.2, t + d, 0.06, out), lp = filt('lowpass', 400, 3, g);
      lp.frequency.setValueAtTime(320, t); lp.frequency.linearRampToValueAtTime(Math.min(3200, f * 5), t + 0.09); lp.frequency.setTargetAtTime(f * 2.2, t + 0.1, 0.12);
      var os = [osc('sawtooth', f, t, end, lp, drift(-5, 2)), osc('sawtooth', f, t, end, lp, drift(5, 2))];
      if (o.fall) { var fz = o.to ? mtof(o.to) : f * 0.84;
        os.forEach(function (x) { x.frequency.setValueAtTime(f, t + 0.2); x.frequency.exponentialRampToValueAtTime(fz, t + d * 0.9); });
        wobble(5, 40, t, end, os, 0.2, 0.3); lp.frequency.setTargetAtTime(fz * 1.4, t + 0.35, 0.3); }
      return [0.06, 0.04, 0];
    },
    // ta-da: a quick grace note, then a bright brassy chord with a little vibrato
    tada: function (t, f, out, o) {
      var d = o.stab ? Math.max(0.3, o.len || 0.55) : Math.max(0.05, o.len || 0.07), end = t + d + 0.25, pc = o.midi % 12, st = pc === 4 || pc === 5 ? 5 : 7;
      var g = vca(t, o.stab ? 0.06 : 0.1, 0.006, 0.7, 0.2, t + d, 0.07, out), lp = filt('lowpass', 1000, 1.2, g);
      sweep(lp.frequency, t, Math.min(9000, f * 8 + 2000), Math.min(5000, f * 4 + 600), 0.15);
      var os = [];
      (o.stab ? [1, Math.pow(2, st / 12), 2] : [1]).forEach(function (k) { [-7, 7].forEach(function (c) { os.push(osc('sawtooth', f * k, t, end, amp(0.3, lp), drift(c, 3))); }); os.push(osc(pulse(0.3), f * k, t, end, amp(0.2, lp))); });
      if (o.stab) wobble(6, 14, t, end, os, 0.12, 0.1);
      return [0.08, 0.06, 0];
    },
    // a duck: a nasal buzz through a formant that snaps shut, the pitch dropping into the note
    quack: function (t, f, out, o) {
      var d = 0.12, end = t + d + 0.08, g = vca(t, 0.3, 0.006, 0.8, 0.1, t + d, 0.025, out), src = shaper(2.2);
      var s = osc('sawtooth', f, t, end, amp(0.7, src)); s.frequency.setValueAtTime(f * 1.25, t); s.frequency.setTargetAtTime(f, t + 0.01, 0.04);
      var b1 = filt('bandpass', 1300, 3, amp(1.4, g)), b2 = filt('bandpass', 2700, 7, amp(0.6, g)); src.connect(b1); src.connect(b2);
      b1.frequency.setValueAtTime(1400, t); b1.frequency.setTargetAtTime(650, t + 0.02, 0.04);
      return [0.03, 0.04, 0];
    },
    // a zap: a narrow pulse diving from two octaves up onto the note
    pew: function (t, f, out, o) {
      var d = 0.15, g = vca(t, 0.08, 0.002, 0.6, 0.06, t + d, 0.02, out), lp = filt('lowpass', 5000, 1, g);
      var s = osc(pulse(0.25), f, t, t + d + 0.08, lp); s.frequency.setValueAtTime(f * 4, t); s.frequency.exponentialRampToValueAtTime(f, t + d);
      return [0.04, 0.08, 0];
    },
    // the syndrum: Italo's "pew" tom, a sine dropping from an octave up, with a tick of noise
    syndrum: function (t, f, out, o) {
      var d = 0.3, g = env(t, 0.2, 0.002, d); g.connect(out);
      var s = osc('sine', f, t, t + d + 0.05, g); s.frequency.setValueAtTime(f * 2, t); s.frequency.exponentialRampToValueAtTime(f, t + d * 0.8);
      var n = env(t, 0.03, 0.001, 0.02); n.connect(out); noise(t, 0.04, filt('highpass', 3000, 0.7, n));
      return [0.06, 0.1, 0];
    },
    // a handclap: three quick bursts of band-passed noise and a short tail
    clap: function (t, f, out, o) {
      var g = ctx.createGain(); g.gain.value = 0; g.gain.setValueAtTime(0, t); g.connect(out);
      [0, 0.011, 0.022].forEach(function (k) { g.gain.setValueAtTime(0.4, t + k); g.gain.setTargetAtTime(0, t + k + 0.001, 0.004); });
      g.gain.setValueAtTime(0.3, t + 0.033); g.gain.setTargetAtTime(0, t + 0.034, 0.045);
      noise(t, 0.3, filt('bandpass', 1150, 1.3, g));
      return [0.08, 0, 0];
    },
    // a woodblock: a high sine knock that drops a hair, with a click
    clonk: function (t, f, out, o) {
      var g = env(t, 0.15, 0.001, 0.07); g.connect(out);
      var s = osc('sine', f, t, t + 0.15, g); s.frequency.setValueAtTime(f * 1.06, t); s.frequency.setTargetAtTime(f, t + 0.002, 0.008);
      osc('sine', f * 2.7, t, t + 0.05, amp(0.3, g));
      var n = env(t, 0.06, 0.0005, 0.01); n.connect(out); noise(t, 0.03, filt('bandpass', 2500, 2, n));
      return [0.03, 0, 0];
    },
    // a cowbell: two square waves a fifth apart through a band-pass, a sharp knock and a short ring
    cowbell: function (t, f, out, o) {
      var g = env(t, 0.2, 0.001, 0.22); var bp = filt('bandpass', f * 1.3, 2.5, g); g.connect(out);
      osc('square', f, t, t + 0.3, amp(0.6, bp)); osc('square', f * 1.5, t, t + 0.3, amp(0.6, bp));
      return [0.04, 0.02, 0];
    }
  };
  // returns the note's own gain (carrying its sources), so a held note can be faded and stopped early
  function play(voice, midi, pan, vel, o) {
    if (!ctx || muted) return null;
    o = o || {}; o.vel = vel; o.midi = midi; if (o.fromMidi != null) o.from = mtof(o.fromMidi);
    // start on a whole sample, and every envelope's gain sits at zero before its note (a gain left at its default of 1 lets a
    // source starting a hair early through at full level: an audible click)
    var t = Math.ceil((o.t != null ? o.t : ctx.currentTime + 0.01) * ctx.sampleRate) / ctx.sampleRate, out = ctx.createGain(), node = out;
    out.gain.value = 0.35 + 0.65 * vel;
    if (ctx.createStereoPanner) { var pn = ctx.createStereoPanner(); pn.pan.value = pan; out.connect(pn); node = pn; }
    SRC = []; var sends = VOICES[voice](t, mtof(midi), out, o); out._srcs = SRC; SRC = null;
    node.connect(master);
    if (sends[0]) node.connect(amp(sends[0], verbSend));
    if (sends[1]) node.connect(amp(sends[1], delaySend));
    if (sends[2]) node.connect(amp(sends[2], hallSend));
    return out;
  }

  /* ---------- pressing a key ---------- */
  // A strip's plan, spelled out note by note; a trill becomes its quick notes. still = reduced motion (a trill lights its band once, steadily).
  function expand(pl, still) {
    var out = [], prev = null;
    pl.events.forEach(function (e, j) {
      var strong = e.vel > 0.82;
      if (!e.trill) {
        out.push({ at: e.at, midi: e.midi, vel: e.vel, len: e.len, band: e.band, lit: 420, from: prev, accent: strong,
          slide: pl.voice === 'acid' && j > 0 && e.vel < 0.66, stab: pl.voice === 'italo' && (j === 0 || strong) });
        prev = e.midi; return;
      }
      var T = e.trill, legato = pl.voice === 'numan', same = T.band2 === e.band;
      for (var q = 0; q < T.n; q++) {
        var hi = q % 2 === 1, last = q === T.n - 1, sw = Math.sin(Math.PI * (q + 0.5) / T.n);
        out.push({ at: e.at + q * T.step, midi: hi ? T.midi2 : e.midi, vel: e.vel * (legato ? 0.8 : last ? 0.8 : 0.5 + 0.3 * sw),
          len: last ? 0.9 : T.step / 1000, short: !last, band: hi ? T.band2 : e.band, quick: true, sweep: sw, from: prev,
          lit: still ? (q === 0 ? T.n * T.step + 300 : 0) : last ? 420 : same ? (hi ? 0 : T.step * 1.6) : T.step * 0.95,
          silent: legato && q > 0, legato: legato && q === 0 ? { f2: mtof(T.midi2), step: T.step, n: T.n } : null });
        prev = hi ? T.midi2 : e.midi;
      }
    });
    return out;
  }
  function noteOpts(pl, it, sc) {
    return { len: it.len * sc, short: it.short, trill: it.legato, fromMidi: it.from, accent: it.accent, slide: it.slide, stab: it.stab,
             sweep: it.sweep, saw: pl.saw, eighth: pl.eighth * sc };
  }
  // everything a press plays, in order of the strip's own time (ms): its notes, the Italo bass line and claps, the joke.
  // sc stretches the time of the strict voices to the drums' grid (1 without drums); s16 is the bass line's sixteenth (ms)
  function parts(pl, still, sc, s16) {
    var out = [];
    function st(ms) { return pl.strict ? Math.round(ms * 4 / pl.unit) * pl.unit / 4 * sc : ms * sc; }   // the plan's times are rounded to whole ms: snap back onto the grid
    expand(pl, still).forEach(function (it) {
      out.push({ note: true, ms: st(it.at), voice: pl.voice, midi: it.midi, vel: it.vel, band: it.band, lit: it.lit, silent: it.silent,
                 hold: !!it.legato, quick: it.quick, o: noteOpts(pl, it, sc) });
    });
    bassLine(pl, sc, s16).forEach(function (b) {
      out.push({ ms: b.at, voice: 'octbass', midi: b.midi, vel: b.vel, o: { len: b.len } });
      if (b.clap) out.push({ ms: b.at, voice: 'clap', midi: 62, vel: 0.8, o: {} });
    });
    pl.extras.forEach(function (x) {
      var self = x.voice === 'self';
      out.push({ ms: st(x.at), voice: self ? pl.voice : x.voice, midi: x.midi, vel: x.vel, band: x.band, lit: 300,
                 o: { len: (x.len || 0.3) * (self ? 1 : sc), short: x.short, to: x.to, stab: x.stab, fall: x.fall, saw: pl.saw, eighth: pl.eighth * sc } });
    });
    return out;
  }
  function heldOpts(pl, sc, clk16) { return { len: pl.total * sc / 1000 + 0.6, eighth: clk16 ? clk16 * 2 / 1000 : pl.eighth, beat: clk16 ? clk16 * 4 / 1000 : pl.beat }; }
  function light(s, ms) {
    if (!s || !ms) return;
    var until = Date.now() + ms; s._until = until; s.classList.add('lit');
    setTimeout(function () { if (s._until === until) s.classList.remove('lit'); }, ms);
  }
  // A new press replaces the notes still waiting from the last one (trills too), fades out and stops any held note,
  // and never starts sooner than a moment after the last note that sounded, so quick presses can't pile up.
  function stopWaiting() {
    timers.forEach(clearTimeout); timers = [];
    if (ctx) holding.forEach(function (g) {
      var t = ctx.currentTime; g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.setTargetAtTime(0, t, 0.15);
      (g._srcs || []).forEach(function (s) { if (s._end > t + 1.2) { try { s.stop(t + 1.2); s._end = t + 1.2; } catch (e) {} } });
    });
    holding = [];
    sounding.forEach(function (h) { try { h.stop(ctx ? ctx.currentTime : 0); } catch (e) {} });      // the owner's recordings too
    sounding = [];
  }
  // a recording from drums.js (window.PPVoices), if it has it by now; kept so the next press can stop it
  var sounding = [];
  function voices() { var V = window.PPVoices; return V && typeof V.has === 'function' && typeof V.say === 'function' ? V : null; }
  function hasAll(names) { var V = voices(); try { return !!V && names.every(function (n) { return V.has(n); }); } catch (e) { return false; } }
  function sample(name, t, gain, offset, length) {
    var V = voices(); if (!ctx || muted || !V) return;
    try { if (!V.has(name)) return; var h = V.say(name, t, gain, offset, length); if (h && typeof h.stop === 'function') sounding.push(h); } catch (e) {}
  }
  // the drums' clock, when drums.js is there and playing (see drums.js): strips then start on its next sixteenth
  function clock() {
    var c = window.PPClock;
    try { return c && c.running && ctx && ctx.state === 'running' && c.sixteenth() > 0 ? c : null; } catch (e) { return null; }
  }
  // Notes are handed to the audio clock a moment ahead of time, so the machines (Kraftwerk, acid, Italo) keep exact time;
  // the others get a touch of human unevenness on purpose. The bands light when each note sounds.
  var AHEAD = 60, LAG = 50;
  function press(k) {
    if (!ctx) initAudio();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    stopWaiting();
    keys.forEach(function (o) { o.li.classList.toggle('on', o === k); });
    var r = k.b.getBoundingClientRect(), pan = Math.max(-0.6, Math.min(0.6, ((r.left + r.width / 2) / innerWidth) * 1.2 - 0.6));
    k.b.classList.add('down'); setTimeout(function () { k.b.classList.remove('down'); }, 160);
    var pl = k.plan, spans = k.b.children, throttle = Math.max(0, lastNote + 120 - Date.now()), t0 = null, pressed = performance.now(), lead;
    var clk = clock(), s16 = clk ? clk.sixteenth() * 1000 : ownS16(pl), sc = clk && pl.strict ? s16 / pl.unit : 1;
    if (clk) {              // on the drums' grid: the first sixteenth far enough ahead to schedule (and past the quick-press pause)
      var g = Math.max(+clk.nextGrid() || 0, ctx.currentTime);
      while (g < ctx.currentTime + Math.max(0.03, throttle / 1000)) g += s16 / 1000;
      t0 = g; lead = (g - ctx.currentTime) * 1000;
    } else lead = throttle + LAG;
    function when(ms) {     // the audio clock's time for a moment `ms` into the strip (fixed once the clock is running)
      if (t0 === null && ctx && ctx.state === 'running') t0 = ctx.currentTime - (performance.now() - pressed) / 1000 + (throttle + LAG) / 1000;
      return t0 === null ? ctx.currentTime + 0.01 : Math.max(ctx.currentTime + 0.005, t0 + ms / 1000);
    }
    function later(ms, fn) { timers.push(setTimeout(fn, Math.max(0, lead + ms))); }
    var ch = pl.chord && hasAll(pl.chord.names) ? pl.chord : null;
    if (ch && ch.kind === 'A') {        // "HalliChord 1" under the whole strip; the bands light in the strip's own rhythm, silently
      later(-AHEAD - LAG, function () { sample(ch.names[0], when(0), 0.7, ch.offset); });
      parts(pl, reduce, sc, s16).forEach(function (x) { if (x.note) later(x.ms, function () { lastNote = Date.now(); light(spans[x.band], x.lit); }); });
      return;
    }
    if (ch) {                           // 0.6 s of each "HalliChord 2", in the strip's own order; on the drums, a whole number of sixteenths
      var len = clk ? Math.max(1, Math.round(ch.slice * 1000 / s16)) * s16 : ch.slice * 1000;
      ch.names.forEach(function (nm, i) {
        var band = pl.events[i % pl.events.length].band;
        later(i * len - AHEAD - LAG, function () { sample(nm, when(i * len), 0.75, ch.offset, len / 1000); });
        later(i * len, function () { lastNote = Date.now(); light(spans[band], len - 20); });
      });
      return;
    }
    if (pl.drone) later(-AHEAD - LAG, function () {
      if (!ctx) return; var o = heldOpts(pl, sc, clk ? s16 : 0); o.t = when(0); var h = play(pl.drone.voice, pl.drone.midi, pan, 0.8, o); if (h) holding.push(h); });
    parts(pl, reduce, sc, s16).forEach(function (x) {
      var ms = x.ms + (x.note && !pl.strict && x.ms > 0 ? (Math.random() - 0.5) * (x.quick ? 6 : 18) : 0);   // the first note lands exactly (on the drums' grid, when they play)
      if (!x.silent) later(ms - AHEAD - LAG, function () {
        if (!ctx) return; x.o.t = when(ms);
        var h = play(x.voice, x.midi, pan, Math.min(1, x.vel * (x.note ? (pl.strict ? 0.97 + Math.random() * 0.06 : 0.92 + Math.random() * 0.16) : 1)), x.o);
        if (h && x.hold) holding.push(h);
      });
      if (x.note || x.band != null) later(ms, function () { if (x.note) lastNote = Date.now(); light(spans[x.band], x.lit); });
    });
    if (pl.say) { var sm = pl.say.at * sc;   // the owner's voice, gently, at the start, in the longest gap or after the end, the whole recording
      later(sm - AHEAD - LAG, function () { sample(pl.say.name, when(sm), 0.45, 0, pl.say.len || undefined); }); }
  }

  /* ---------- soloing: hold the mouse button (or a finger) and sweep across the bands; each band plays as you enter it ---------- */
  // Mouse: a press plays the strip on release as before, unless the pointer moves more than 8 px first, which starts a solo instead.
  // Touch: a sideways move (more than 10 px, more across than down) or holding still for a quarter second starts a solo;
  // an up-or-down swipe is left to the browser, so the page still scrolls.
  var SOLO = null, soloUntil = 0, HOLD = 250;
  function bandAt(x, y) { var el = document.elementFromPoint(x, y); return el && el.closest ? el.closest('.hc-pp-key > span') : null; }
  function soloNote(s, nth) {
    if (!ctx) initAudio(); if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    var b = s.parentNode, k = b._k, i = Array.prototype.indexOf.call(b.children, s), r = b.getBoundingClientRect();
    var pan = Math.max(-0.6, Math.min(0.6, ((r.left + r.width / 2) / innerWidth) * 1.2 - 0.6));
    play(k.plan.voice, k.plan.bandMidi[i], pan, k.plan.bandVel[i], { len: 0.18, solo: true, t: ctx.currentTime + 0.005 + 0.012 * (nth || 0) });
    light(s, 260);
  }
  function soloTo(x, y) {   // every band along the way since the last point, in order (a quick sweep skips none)
    var S = SOLO, dx = x - S.x, dy = y - S.y, n = Math.min(16, Math.ceil(Math.hypot(dx, dy) / 4)), played = 0;
    for (var j = 1; j <= n; j++) { var s = bandAt(S.x + dx * j / n, S.y + dy * j / n);
      if (s !== S.band) { S.band = s; if (s && played < 4) soloNote(s, played++); } }
    S.x = x; S.y = y;
  }
  function soloStart() {
    var S = SOLO; clearTimeout(S.timer); S.on = true; S.band = bandAt(S.x0, S.y0); S.x = S.x0; S.y = S.y0;
    if (S.band) soloNote(S.band, 0);
  }
  function soloEnd(e) { if (!SOLO || e.pointerId !== SOLO.id) return; clearTimeout(SOLO.timer); if (SOLO.on) soloUntil = performance.now() + 450; SOLO = null; }
  function soloKeys(list) {   // (the piano's list is built anew on every visit to the page: build() calls this)
  list.addEventListener('pointerdown', function (e) {
    if (e.button || !e.isPrimary || !e.target.closest('.hc-pp-key')) return;
    if (!ctx) initAudio();     // ready for the first band (on touch it may wait, suspended, for the first tap)
    SOLO = { id: e.pointerId, touch: e.pointerType !== 'mouse', x0: e.clientX, y0: e.clientY, on: false, timer: null };
    if (SOLO.touch) SOLO.timer = setTimeout(function () { if (SOLO && !SOLO.on) soloStart(); }, HOLD);
  });
  list.addEventListener('touchmove', function (e) { if (SOLO && SOLO.on) e.preventDefault(); }, { passive: false });   // a solo, not a scroll
  list.addEventListener('contextmenu', function (e) { if (SOLO && SOLO.touch) e.preventDefault(); });
  }
  addEventListener('pointermove', function (e) {
    var S = SOLO; if (!S || e.pointerId !== S.id) return;
    if (!S.on) {
      var dx = e.clientX - S.x0, dy = e.clientY - S.y0;
      if (S.touch ? Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2 : Math.hypot(dx, dy) > 8) soloStart();
      else { if (S.touch && Math.abs(dy) > 10) { clearTimeout(S.timer); SOLO = null; } return; }   // a scroll: leave it be
    }
    soloTo(e.clientX, e.clientY);
  });
  addEventListener('pointerup', soloEnd); addEventListener('pointercancel', soloEnd);

  // for checking: every strip's plan, and a strip (or several, pressed in quick succession and never cut short) rendered silently
  function offline(secs, fn) {
    var keep = [ctx, master, verbSend, delaySend, hallSend, NOISE, PW, CURVES, muted];
    muted = false; setup(new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(2, Math.ceil(44100 * secs), 44100)); var oc = ctx;
    try { fn(); } finally { ctx = keep[0]; master = keep[1]; verbSend = keep[2]; delaySend = keep[3]; hallSend = keep[4]; NOISE = keep[5]; PW = keep[6]; CURVES = keep[7]; muted = keep[8]; }
    return oc.startRendering();
  }
  function stats(buf, upto) {
    var pk = 0, ss = 0, n = 0;
    for (var c = 0; c < buf.numberOfChannels; c++) { var d = buf.getChannelData(c), m = Math.min(d.length, upto || d.length);
      for (var i = 0; i < m; i++) { var x = Math.abs(d[i]); if (x > pk) pk = x; ss += x * x; n++; } }
    return { peak: pk, rms: Math.sqrt(ss / n) };
  }
  window.PalettePiano = {
    // for drums.js: the audio context and where to plug in (the master input, so the mute button and the compressor apply)
    audio: function () {
      if (!ctx) initAudio();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      return ctx ? { ctx: ctx, out: master } : null;
    },
    plans: function () { return keys.map(function (k) { return k.plan; }); },
    expand: function (i) { return expand(keys[i].plan, false); },
    parts: function (i) { var pl = keys[i].plan; return parts(pl, false, 1, ownS16(pl)); },
    render: function (list, every, secs) {
      return offline(secs, function () {
        list.forEach(function (idx, m) {
          var pl = keys[idx].plan, t0 = 0.05 + m * every, pan = (m % 3 - 1) * 0.4;
          if (pl.drone) { var ho = heldOpts(pl, 1, 0); ho.t = t0; play(pl.drone.voice, pl.drone.midi, pan, 0.8, ho); }
          parts(pl, false, 1, ownS16(pl)).forEach(function (x) { if (!x.silent) { x.o.t = t0 + x.ms / 1000; play(x.voice, x.midi, pan, x.vel, x.o); } });
        });
      }).then(function (buf) { return stats(buf); });
    },
    note: function (voice, midi, vel) {   // one note alone, to compare loudness between voices
      return offline(3, function () { play(voice, midi, 0, vel, { t: 0.02, len: 1 }); }).then(function (buf) { return stats(buf, 44100); });
    },
    // one note (or held note) rendered with options; dry = without the reverbs and echo. Resolves to the AudioBuffer, for analysis.
    buffer: function (voice, midi, vel, opts, secs, dry) {
      return offline(secs || 3, function () {
        if (dry) { verbSend.gain.value = 0; delaySend.gain.value = 0; hallSend.gain.value = 0; }
        var o = Object.assign({ t: 0.02, len: 1 }, opts || {}); play(voice, midi, 0, vel, o);
      });
    }
  };

  quiet.addEventListener('click', function () {
    muted = !muted;
    quiet.setAttribute('aria-pressed', String(muted));
    quiet.textContent = muted ? 'Turn the sound on' : 'Turn the sound off';
    if (muted) stopWaiting();
    if (ctx) { var t = ctx.currentTime; master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(muted ? 0 : volume, t + 0.3); }
  });

  /* ---------- the way back (shared with hc-project through sessionStorage) ---------- */
  var KEY = 'hc-from-piano', MAXAGE = 2 * 60 * 60 * 1000, returned = null;
  function remember(p) { try { sessionStorage.setItem(KEY, JSON.stringify({ slug: p.url, t: Date.now() })); } catch (e) {} }
  function take() { try { var v = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); return v; } catch (e) { return null; } }
  // back from a project: that strip comes into view with its title open; no sound is started
  function comeBack() {
    var o = null; try { o = JSON.parse(take()); } catch (e) {}
    if (!o || !o.slug || !(Date.now() - o.t < MAXAGE)) return;
    var s = String(o.slug).toLowerCase(), k = keys.filter(function (x) { return x.p.url.toLowerCase() === s; })[0];
    if (!k) return;
    keys.forEach(function (x) { x.li.classList.toggle('on', x === k); });
    rove(keys.indexOf(k));
    returned = k.p.url;
    function show() {
      if (!live()) return;
      var r = k.li.getBoundingClientRect();
      if (r.top < 64 || r.bottom > innerHeight - 70) k.li.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'auto' });
    }
    // and again a few times: on the live site Cargo scrolls to the top well after showing the page (seen 2026-11-16).
    // The visitor's own scrolling, touch or keys end it, so the page never fights them.
    var timers = [350, 800, 1500, 2500].map(function (ms) { return setTimeout(show, ms); });
    function mine() { timers.forEach(clearTimeout); ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (n) { removeEventListener(n, mine, true); }); }
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (n) { addEventListener(n, mine, { capture: true, passive: true }); });
    requestAnimationFrame(show);
  }

  /* ---------- building ---------- */
  function rove(i) {   // the one key (and its title link) that Tab reaches
    if (keys[cur]) { keys[cur].b.tabIndex = -1; keys[cur].a.tabIndex = -1; }
    cur = i; keys[cur].b.tabIndex = 0; keys[cur].a.tabIndex = 0;
  }
  function build(box) {
    // Cargo's own content (loose text included) moves into one hidden box: kept as the fallback
    var keep = document.createElement('div'); keep.setAttribute('data-hc-pp-fallback', ''); keep.style.display = 'none';
    while (box.firstChild) keep.appendChild(box.firstChild);
    box.appendChild(keep);
    root = document.createElement('div'); root.id = 'hc-pp'; root.innerHTML = HTML;
    box.appendChild(root);
    list = root.querySelector('#hc-pp-keys'); keys = []; cur = 0;

    PALETTES.forEach(function (p, i) {
      var h = hash(p.url), li = document.createElement('li');
      li.className = 'hc-pp-k';
      li.style.setProperty('--tilt', ((h % 41) / 10 - 2).toFixed(1) + 'deg');          // -2° to +2°, the same every visit
      li.style.setProperty('--dy', ((h >> 8) % 11) + 'px');
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'hc-pp-key'; b.tabIndex = i ? -1 : 0; b.setAttribute('aria-label', p.title);
      p.colours.forEach(function (c) {
        var s = document.createElement('span'), j = function (n) { return ((h >> n) % 5) + 'px'; };
        s.style.background = c[0];
        s.style.setProperty('--share', Math.sqrt(c[1]).toFixed(3));                         // small accents get a fairer share of the key
        s.style.setProperty('--edge', 'polygon(0 ' + j(c[0].charCodeAt(2) % 7) + ', 30% ' + j(3 + c[0].charCodeAt(4) % 5) + ', 62% ' + j(7) + ', 100% ' + j(c[0].charCodeAt(6) % 9) + ', 100% 100%, 0 100%)');
        b.appendChild(s);
      });
      var a = document.createElement('a');
      a.className = 'hc-pp-tag'; a.href = '/' + p.url; a.tabIndex = i ? -1 : 0;
      a.innerHTML = '<b></b><i>see it</i>'; a.firstChild.textContent = p.title;
      a.setAttribute('aria-label', 'See ' + p.title);
      a.addEventListener('click', function () { remember(p); });
      a.addEventListener('auxclick', function () { remember(p); });
      li.appendChild(b); li.appendChild(a); list.appendChild(li);
      keys.push({ li: li, b: b, a: a, p: p, plan: PLANS[p.url] || (PLANS[p.url] = planFor(p)) });
    });

    /* keyboard: one stop for the whole piano, arrows move along it */
    keys.forEach(function (k, i) {
      k.b._k = k;
      k.b.addEventListener('click', function () { if (performance.now() < soloUntil) return; press(k); });   // the end of a solo is not a press
      k.b.addEventListener('focus', function () { keys.forEach(function (o) { if (o !== k) o.li.classList.remove('on'); }); if (cur !== i) rove(i); });
      k.b.addEventListener('keydown', function (e) {
        var to = { ArrowRight: i + 1, ArrowLeft: i - 1, ArrowDown: i + perRow(), ArrowUp: i - perRow(), Home: 0, End: keys.length - 1 }[e.key];
        if (to !== undefined) { e.preventDefault(); focusKey(to); }
      });
    });
    soloKeys(list);
    edges();
    if (window.ResizeObserver) new ResizeObserver(function () { if (live()) edges(); }).observe(list);   // also Cargo's late phone viewport
    comeBack();
  }
  function focusKey(i) { i = Math.max(0, Math.min(keys.length - 1, i)); rove(i); keys[cur].b.focus(); }
  function perRow() { var top = keys[0].li.offsetTop, n = 0; while (n < keys.length && keys[n].li.offsetTop === top) n++; return n || 1; }
  // titles near the ends of a row open inwards, so they never leave the screen
  function edges() {
    keys.forEach(function (k, i) {
      var t = k.li.offsetTop, prev = keys[i - 1], next = keys[i + 1];
      k.li.dataset.edge = !prev || prev.li.offsetTop !== t ? 'l' : !next || next.li.offsetTop !== t ? 'r' : '';
    });
  }
  addEventListener('resize', function () { if (live()) edges(); });

  function check() {
    var here = PAGE.test(location.pathname);
    document.documentElement.classList.toggle('hc-pp-on', here);   // Cargo changes pages without reloading
    if (!quiet.isConnected && document.body) document.body.appendChild(quiet);
    if (window.__hcPaletteDrums) window.__hcPaletteDrums.check();   // the beat maker (the second script below): there only on this page
    if (!here) { if (root && !live()) { stopWaiting(); root = null; } return; }   // left the page: nothing more plays
    var box = document.querySelector('.project_content');
    if (box && !box.querySelector('#hc-pp')) build(box);
  }
  var pending = null;
  new MutationObserver(function () { clearTimeout(pending); pending = setTimeout(check, 120); })
    .observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('popstate', check);
  // the back button can bring the page back whole from the back/forward cache: then only the way back is redone
  addEventListener('pageshow', function (e) { if (e.persisted && live()) comeBack(); });
  check();
  window.__hcPalettePiano = {
    keys: function () { return keys.length; },
    sound: function () { return { ctx: !!ctx, state: ctx ? ctx.state : null, waiting: timers.length, muted: muted, lastNote: lastNote, recordings: sounding.length }; },
    returned: function () { return returned; }
  };
})();
/* The beat maker: a small drum machine, fill pads and voice pads, for the palette piano page only.
   Ported from mockups/palette-piano/drums.js (approved by Halli 2026-11-17); the logic is the mockup's, unchanged, except for
   the fencing for the live site: every id and class is prefixed hc-pp-pd-, the CSS is in the <style> above under
   #hc-pp-pd-btn / #hc-pp-pd-panel, the pill and panel live on <body> only while the page address contains "palette-piano"
   (taken away again when the visitor leaves: the beat stops, fills and recordings are let go, the panel closes), the pill sits
   right of "Turn the sound off" (measured, see place()), and the owner's recordings come from assets/palette-piano/ on
   GitHub Pages, fetched only once the visitor reaches for the piano or the beat maker. Missing recordings: the pads stay
   greyed out, the voice row is silent and the piano plays its synths instead.
   Uses window.PalettePiano.audio() ({ ctx, out }). Provides window.PPClock, window.PPVoices and window.PPDrums. */
(function () {
  'use strict';
  if (window.__hcPaletteDrums) return;
  var PAGE = /palette-piano/i;
  // the recordings live next to this script on GitHub Pages: dist/js/hc-palette-piano.js -> assets/palette-piano/ (as hc-eyes)
  var here = document.currentScript && document.currentScript.src;
  var VBASE = here ? new URL('../../assets/palette-piano/', here).href
                   : 'https://hallicivelek.github.io/hallicivelek-site/assets/palette-piano/';

  /* ---------------------------------------------------------------- state */
  var ROWS = ['kick', 'snare', 'hi-hat', 'voice'];
  var VROW = 3;
  var DEFAULT = [
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],   // four on the floor
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],   // snare on 2 and 4
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],   // offbeat hats
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]    // voice: empty until the owner fills it
  ];
  var pat = DEFAULT.map(function (r) { return r.map(function (x) { return !!x; }); });
  var bpm = 118, BPM_MIN = 80, BPM_MAX = 150;

  var audio = null;         // { ctx, out } once a gesture has made it
  var bus = null, busKey = null;
  var T = { n: 0, next: 0, timer: null, queue: [], patOn: false, paused: false };
  var held = [], fillName = null, fillStart = -1, fillMin = 0;
  var LOOK = 0.12, TICK = 25;
  var logTimes = null;      // test hook: an array to record every scheduled hit

  /* ---------------------------------------------------------------- audio access */
  function getAudio() {
    loadVoices();             // the first sound is also the moment to fetch the recordings (once)
    if (audio && audio.ctx) { if (audio.ctx.state === 'suspended') audio.ctx.resume(); return audio; }
    var a = null;
    try { if (window.PalettePiano && typeof window.PalettePiano.audio === 'function') a = window.PalettePiano.audio(); } catch (e) { a = null; }
    if (!a || !a.ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      var c = new AC();
      a = { ctx: c, out: c.destination };
    }
    audio = { ctx: a.ctx, out: a.out || a.ctx.destination };
    if (audio.ctx.state === 'suspended') audio.ctx.resume();
    return audio;
  }

  var BUS_GAIN = 0.32;
  function makeBus(ctx, out) {
    var comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.knee.value = 8; comp.ratio.value = 10; comp.attack.value = 0.002; comp.release.value = 0.12;
    var g = ctx.createGain(); g.gain.value = BUS_GAIN;
    comp.connect(g); g.connect(out);
    return comp;
  }
  function liveBus() {
    var a = getAudio();
    if (!bus || busKey !== a.out) { bus = makeBus(a.ctx, a.out); busKey = a.out; }
    return bus;
  }

  var noiseCache = typeof WeakMap === 'function' ? new WeakMap() : null;
  function noise(ctx) {
    var b = noiseCache && noiseCache.get(ctx);
    if (b) return b;
    b = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    var d = b.getChannelData(0), s = 22222;
    for (var i = 0; i < d.length; i++) { s = (s * 1664525 + 1013904223) >>> 0; d[i] = s / 2147483648 - 1; }
    if (noiseCache) noiseCache.set(ctx, b);
    return b;
  }
  function env(g, t, peak, attack, decay) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }
  function tone(c, d, type, t, f0, f1, fd, peak, decay) {
    var o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + fd);
    env(g, t, peak, 0.002, decay);
    o.connect(g); g.connect(d); o.start(t); o.stop(t + decay + 0.05);
  }
  function hiss(c, d, t, type, freq, q, peak, decay, off) {
    var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = noise(c); f.type = type; f.frequency.value = freq; f.Q.value = q;
    env(g, t, peak, 0.001, decay);
    s.connect(f); f.connect(g); g.connect(d); s.start(t, off || 0, decay + 0.05);
  }

  /* 808/909 flavoured, all synthesised */
  var V = {
    kick: function (c, d, t, v) {
      tone(c, d, 'sine', t, 165, 46, 0.1, 1.0 * v, 0.4);
      tone(c, d, 'triangle', t, 1800, 120, 0.012, 0.28 * v, 0.014);
    },
    snare: function (c, d, t, v) {
      tone(c, d, 'triangle', t, 220, 170, 0.05, 0.5 * v, 0.11);
      tone(c, d, 'sine', t, 340, 250, 0.05, 0.22 * v, 0.08);
      hiss(c, d, t, 'highpass', 1800, 0.7, 0.7 * v, 0.17, 0.1);
    },
    hat: function (c, d, t, v) {
      var hp = c.createBiquadFilter(), bp = c.createBiquadFilter(), g = c.createGain();
      hp.type = 'highpass'; hp.frequency.value = 7000; bp.type = 'bandpass'; bp.frequency.value = 10000; bp.Q.value = 0.8;
      env(g, t, 0.34 * v, 0.001, 0.045);
      hp.connect(bp); bp.connect(g); g.connect(d);
      [205.3, 304.4, 369.6, 522.7, 540, 800].forEach(function (f) {
        var o = c.createOscillator(); o.type = 'square'; o.frequency.value = f;
        o.connect(hp); o.start(t); o.stop(t + 0.1);
      });
    },
    tom: function (c, d, t, v, f) {
      f = f || 150;
      tone(c, d, 'sine', t, f * 1.5, f, 0.06, 0.95 * v, 0.3);
      tone(c, d, 'triangle', t, 900, 200, 0.01, 0.12 * v, 0.012);
    },
    clap: function (c, d, t, v) {
      [0, 0.011, 0.022].forEach(function (o) { hiss(c, d, t + o, 'bandpass', 1300, 1.4, 0.55 * v, 0.02, o * 7); });
      hiss(c, d, t + 0.033, 'bandpass', 1300, 1.2, 0.5 * v, 0.16, 0.3);
    }
  };
  var TOM = [210, 165, 128, 98];

  /* ---------------------------------------------------------------- what plays on a step (pure) */
  /* returns [{ name, at (in sixteenths, 0 or 0.5), v, f }] ; fill = { name, j } or null */
  function stepEvents(n, patOn, fill) {
    var ev = [], s = ((n % 16) + 16) % 16;
    if (fill) {
      var j = fill.j, ramp = Math.min(1, 0.45 + j * 0.08), beat = (n % 4 === 0);
      if (fill.name === 'fill') {
        if (beat) ev.push({ name: 'kick', at: 0, v: 0.85 });
        ev.push({ name: 'snare', at: 0, v: ramp * 0.9 });
      } else if (fill.name === 'roll') {
        ev.push({ name: 'snare', at: 0, v: ramp * 0.85 });
        ev.push({ name: 'snare', at: 0.5, v: ramp * 0.6 });
        if (beat) ev.push({ name: 'kick', at: 0, v: 0.7 });
      } else if (fill.name === 'toms') {
        var i = [0, 0, 1, 1, 2, 2, 3, 3][((n % 8) + 8) % 8];
        ev.push({ name: 'tom', at: 0, v: 0.8, f: TOM[i] });
        if (beat) ev.push({ name: 'kick', at: 0, v: 0.7 });
        if (n % 8 === 7) ev.push({ name: 'clap', at: 0, v: 0.6 });
      }
      return ev;
    }
    if (!patOn) return ev;
    if (pat[0][s]) ev.push({ name: 'kick', at: 0, v: 0.95 });
    if (pat[1][s]) ev.push({ name: 'snare', at: 0, v: 0.85 });
    if (pat[2][s]) ev.push({ name: 'hat', at: 0, v: s % 4 === 2 ? 0.8 : 0.55 });
    if (pat[VROW][s]) ev.push({ name: 'voice', at: 0, v: 1 });
    return ev;
  }
  function playEvent(c, d, e, t, sx) {
    var tt = t + e.at * sx;
    if (e.name === 'voice') { voiceRowHit(tt); return; }
    if (e.name === 'tom') V.tom(c, d, tt, e.v, e.f); else V[e.name](c, d, tt, e.v);
  }

  /* ---------------------------------------------------------------- clock and scheduler */
  function sixteenth() { return 60 / bpm / 4; }
  function fillActive(n) {
    if (!fillName) return false;
    if (fillStart < 0) { fillStart = n; fillMin = Math.ceil((n + 2) / 4) * 4; }
    return held.length > 0 || n < fillMin || n % 4 !== 0;   // after release, carry on to the next beat line
  }
  function endFillIfDone(n) {
    if (fillName && !held.length && n >= fillMin && n % 4 === 0 && fillStart >= 0) { fillName = null; fillStart = -1; }
  }
  function scheduleStep(n, t) {
    var a = audio, d = liveBus(), c = a.ctx, sx = sixteenth(), fill = null;
    if (fillName) {
      var active = fillActive(n);
      if (active) fill = { name: fillName, j: n - fillStart }; else endFillIfDone(n);
    }
    stepEvents(n, T.patOn, fill).forEach(function (e) {
      playEvent(c, d, e, t, sx);
      if (logTimes) logTimes.push({ name: e.name, t: t + e.at * sx, n: n, step: n % 16, fill: fill ? fill.name : null });
    });
  }
  function tick() {
    if (!audio) return;
    var c = audio.ctx, now = c.currentTime;
    while (T.next < now + LOOK) {
      scheduleStep(T.n, T.next);
      T.queue.push({ t: T.next, s: T.n % 16 });
      T.n++; T.next += sixteenth();
    }
    while (T.queue.length && T.queue[0].t < now - 1) T.queue.shift();
    if (!T.patOn && !fillName) stopTimer();
  }
  function startTimer() {
    if (T.timer) return;
    T.timer = setInterval(tick, TICK);
    tick();
  }
  function stopTimer() {
    if (T.timer) { clearInterval(T.timer); T.timer = null; }
    T.queue = [];
    paintStep(-1);
  }
  function transportStart() {   // makes sure the timer runs, from the top if it was idle
    var a = getAudio();
    if (!T.timer) { T.n = 0; T.next = a.ctx.currentTime + 0.06; T.queue = []; }
    T.paused = false;
    if (!document.hidden) startTimer();
  }

  function play() {
    if (T.patOn) return;
    T.patOn = true;
    transportStart();
    syncUI();
    raf();
  }
  function stop() {
    T.patOn = false;
    if (!fillName) stopTimer();
    syncUI();
  }
  function fill(name, on) {
    var i = held.indexOf(name);
    if (on) {
      if (i < 0) held.push(name);
      var fresh = !fillName;
      fillName = name;
      if (fresh) fillStart = -1;
      transportStart();
      raf();
    } else if (i >= 0) {
      held.splice(i, 1);
      if (held.length) fillName = held[held.length - 1];
    }
    syncPads();
  }

  window.PPClock = {
    get running() { return !!(T.patOn && T.timer); },
    get bpm() { return bpm; },
    set bpm(v) { setBpm(v); },
    sixteenth: sixteenth,
    nextGrid: function () {
      if (!audio) return 0;
      var now = audio.ctx.currentTime;
      if (!T.timer || T.paused) return now;
      for (var i = 0; i < T.queue.length; i++) if (T.queue[i].t >= now) return T.queue[i].t;
      return T.next > now ? T.next : now;
    }
  };

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (T.timer) { clearInterval(T.timer); T.timer = null; T.paused = true; }
    } else if (T.paused && audio) {
      T.paused = false;
      T.next = Math.max(T.next, audio.ctx.currentTime + 0.05);
      T.queue = [];
      if (T.patOn || fillName) startTimer();
    }
  });

  /* ---------------------------------------------------------------- voices */
  /* the owner's recordings (blob-site/assets/palette-piano/): name, file, pad label, group */
  var MANIFEST = [
    { name: 'blodclot', file: 'blodclot.mp3', label: 'blodclot', group: 'voice' },
    { name: 'bring-the-beat-back', file: 'bring-the-beat-back.mp3', label: 'bring the beat back', group: 'voice' },
    { name: 'comon-man', file: 'comon-man.mp3', label: "c'mon man", group: 'voice' },
    { name: 'diou', file: 'diou.mp3', label: 'diou', group: 'voice' },
    { name: 'drssh', file: 'drssh.mp3', label: 'drssh', group: 'voice' },
    { name: 'dunng', file: 'dunng.mp3', label: 'dunng', group: 'voice' },
    { name: 'oh-yea', file: 'oh-yea.mp3', label: 'oh yea', group: 'voice' },
    { name: 'rastafari', file: 'rastafari.mp3', label: 'rastafari', group: 'voice' },
    { name: 'wiggedy-wah', file: 'wiggedy-wah.mp3', label: 'wiggedy wah', group: 'voice' },
    { name: 'chord-1', file: 'chord-1.mp3', label: 'chord 1', group: 'chord' },
    { name: 'chord-2a', file: 'chord-2a.mp3', label: 'chord 2a', group: 'chord' },
    { name: 'chord-2b', file: 'chord-2b.mp3', label: 'chord 2b', group: 'chord' },
    { name: 'chord-2c', file: 'chord-2c.mp3', label: 'chord 2c', group: 'chord' },
    { name: 'chord-2d', file: 'chord-2d.mp3', label: 'chord 2d', group: 'chord' }
  ];
  var voices = {};   // key -> { buf, base (seconds of leading silence skipped), dur (playable), lvl (level-matching gain), peak, trimmed }
  var VOICE_DEFAULT = 'diou';
  var TARGET_PEAK = 0.35, SAY_GAIN = 0.8, SILENCE_MIN = 0.03, EDGE = 0.008;
  function vkey(n) { return String(n).toLowerCase().replace(/['’]/g, '').replace(/\s+/g, '-'); }

  /* measure a decoded buffer: peak, first audible sample (only counted when the silence before it is over 30 ms), gain */
  function analyse(buf) {
    var n = buf.length, sr = buf.sampleRate, ch = [], k, i, peak = 0;
    for (k = 0; k < buf.numberOfChannels; k++) ch.push(buf.getChannelData(k));
    for (k = 0; k < ch.length; k++) for (i = 0; i < n; i++) { var a = ch[k][i] < 0 ? -ch[k][i] : ch[k][i]; if (a > peak) peak = a; }
    var thr = Math.max(0.004, peak * 0.03), first = 0;
    scan: for (i = 0; i < n; i++) for (k = 0; k < ch.length; k++) if (Math.abs(ch[k][i]) > thr) { first = i; break scan; }
    var lead = first / sr, base = 0;
    if (lead > SILENCE_MIN) base = Math.max(0, lead - 0.003);   // keep a hair of lead-in so the attack is not shaved
    var lvl = peak > 0.0005 ? TARGET_PEAK / (SAY_GAIN * peak) : 1;
    return { base: base, dur: Math.max(0.02, buf.duration - base), lvl: Math.max(0.1, Math.min(8, lvl)), peak: peak, lead: lead };
  }
  function decode(ab) {
    var AC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    var oc = new AC(1, 1, 44100);
    return new Promise(function (ok, no) { var p = oc.decodeAudioData(ab, ok, no); if (p && p.then) p.then(ok, no); });
  }
  // from GitHub Pages, another origin than hallicivelek.com: a CORS fetch (GitHub Pages answers with access-control-allow-origin: *)
  var asked = {};    // name -> true while it is on its way or loaded; a failed one may be asked for again later
  function loadVoice(m) {
    if (asked[m.name] || !window.fetch || !window.Promise) return;
    asked[m.name] = true;
    return fetch(VBASE + m.file, { mode: 'cors', credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw 0;
      return r.arrayBuffer();
    }).then(decode).then(function (buf) {
      var a = analyse(buf);
      voices[m.name] = { buf: buf, base: a.base, dur: a.dur, lvl: a.lvl, peak: a.peak, lead: a.lead };
      syncPads();
    }, function () { asked[m.name] = false; });
  }
  // not on page load: when the visitor first reaches for the piano or the beat maker, or the panel opens
  function loadVoices() { if (PAGE.test(location.pathname)) MANIFEST.forEach(loadVoice); }

  var PPVoices = {
    names: function () { return MANIFEST.map(function (m) { return m.name; }); },
    has: function (name) { var v = voices[vkey(name)]; return !!(v && v.buf); },
    duration: function (name) { var v = voices[vkey(name)]; return v && v.buf ? v.dur : 0; },
    /* play name at AudioContext time `when`; offset/length are seconds into the trimmed recording; returns { stop(when), end } */
    say: function (name, when, gain, offset, length) {
      var v = voices[vkey(name)];
      if (!v || !v.buf) return { stop: function () {}, end: 0, ok: false };
      var a = getAudio(), c = a.ctx, now = c.currentTime;
      var t = when == null || when < now ? now : when;
      var off = Math.max(0, Number(offset) || 0), left = Math.max(0, v.dur - off);
      var len = length == null || !isFinite(length) ? left : Math.max(0.01, Math.min(length, left));
      var cutIn = off > 0 || v.base > 0, cutOut = len < left - 1e-6;
      var fin = Math.min(cutIn ? EDGE : 0.002, len / 2), fout = Math.min(cutOut ? EDGE : 0.02, len / 2);
      var g0 = (gain == null ? SAY_GAIN : gain) * v.lvl;
      var s = c.createBufferSource(), g = c.createGain();
      s.buffer = v.buf;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(g0, t + fin);
      g.gain.setValueAtTime(g0, t + len - fout);
      g.gain.linearRampToValueAtTime(0, t + len);
      s.connect(g); g.connect(a.out);
      s.start(t, v.base + off, len + 0.02);
      s.stop(t + len + 0.03);
      var h = { end: t + len, ok: true, stopped: false };
      h.stop = function (w) {
        if (h.stopped) return; h.stopped = true;
        var at = w == null || w < c.currentTime ? c.currentTime : w;
        if (at >= t + len) return;
        try {
          g.gain.cancelScheduledValues(at);
          g.gain.setTargetAtTime(0, at, 0.004);
          s.stop(at + 0.04);
        } catch (e) {}
        h.end = Math.min(h.end, at + 0.03);
      };
      return h;
    }
  };
  window.PPVoices = PPVoices;

  /* the voice row: one recording, each trigger cuts the previous one off */
  var voiceRow = VOICE_DEFAULT, rowHit = null;
  function voiceRowHit(t) {
    if (!PPVoices.has(voiceRow)) return;
    if (rowHit) rowHit.stop(t);
    rowHit = PPVoices.say(voiceRow, t);
  }

  /* pads: a hit restarts the recording if it still sounds */
  var padHit = {};
  function padPress(m) {
    var a = getAudio(), now = a.ctx.currentTime, h = padHit[m.name];
    var live = h && !h.stopped && h.end > now + 0.01;
    var when = window.PPClock.running ? window.PPClock.nextGrid() : undefined;
    if (live) h.stop(when);
    h = padHit[m.name] = PPVoices.say(m.name, when);
    lightPad(m, Math.max(0, (h.end - now) * 1000));
  }
  function lightPad(m, ms) {
    var u = ui.says && ui.says[m.name];
    if (!u) return;
    clearTimeout(u.timer);
    u.b.classList.toggle('hc-pp-pd-on', ms > 0);
    if (ms > 0) u.timer = setTimeout(function () { lightPad(m, 0); }, ms);
  }

  /* ---------------------------------------------------------------- tempo */
  function setBpm(v) {
    v = Math.round(Number(v));
    if (!isFinite(v)) return;
    bpm = Math.max(BPM_MIN, Math.min(BPM_MAX, v));
    if (ui.tempo) { ui.tempo.value = bpm; ui.num.textContent = bpm; ui.tempo.setAttribute('aria-valuetext', bpm + ' beats a minute'); }
  }

  /* ---------------------------------------------------------------- UI (its CSS is in the add-on's <style>) */
  var ui = {};

  function el(tag, cls, text, attrs) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  var stepBtns = [[], [], [], []], focusR = 0, focusC = 0;
  function stepLabel(r, c) { return ROWS[r] + ', step ' + (c + 1) + ', ' + (pat[r][c] ? 'on' : 'off'); }
  function paintStepBtn(r, c) {
    var b = stepBtns[r][c];
    b.setAttribute('aria-pressed', String(!!pat[r][c]));
    b.setAttribute('aria-label', stepLabel(r, c));
  }
  function setStep(r, c, on) { pat[r][c] = !!on; if (stepBtns[r][c]) paintStepBtn(r, c); }
  function rove(r, c) {
    stepBtns[focusR][focusC].tabIndex = -1;
    focusR = r; focusC = c; stepBtns[r][c].tabIndex = 0;
  }

  function build() {
    ui.btn = el('button', 'hc-pp-pd-btn', 'Make a beat', { type: 'button', id: 'hc-pp-pd-btn', 'aria-expanded': 'false', 'aria-controls': 'hc-pp-pd-panel' });
    var p = ui.panel = el('section', 'hc-pp-pd-panel', null, { id: 'hc-pp-pd-panel', 'aria-label': 'Beat maker', hidden: '' });

    var top = el('div', 'hc-pp-pd-top');
    ui.go = el('button', 'hc-pp-pd-go', 'Play', { type: 'button' });
    ui.clear = el('button', 'hc-pp-pd-clear', 'Clear', { type: 'button' });
    var sp = el('div', 'hc-pp-pd-speed');
    var lab = el('label', null, 'Speed', { for: 'hc-pp-pd-tempo' });
    ui.tempo = el('input', null, null, { id: 'hc-pp-pd-tempo', type: 'range', min: BPM_MIN, max: BPM_MAX, step: 1, value: bpm, 'aria-label': 'Speed, beats a minute', 'aria-valuetext': bpm + ' beats a minute' });
    ui.num = el('span', 'hc-pp-pd-num', String(bpm), { 'aria-hidden': 'true' });
    sp.appendChild(lab); sp.appendChild(ui.tempo); sp.appendChild(ui.num);
    ui.x = el('button', 'hc-pp-pd-x', 'Close', { type: 'button' });
    top.appendChild(ui.go); top.appendChild(sp); top.appendChild(ui.clear); top.appendChild(ui.x);
    p.appendChild(top);

    var rows = el('div', 'hc-pp-pd-rows');
    ROWS.forEach(function (name, r) {
      var row = el('div', 'hc-pp-pd-row');
      if (r === VROW) {
        var vn = el('div', 'hc-pp-pd-name hc-pp-pd-vname');
        vn.appendChild(el('span', null, name, { 'aria-hidden': 'true' }));
        var sel = ui.pick = el('select', 'hc-pp-pd-pick', null, { 'aria-label': 'Recording for the voice row' });
        MANIFEST.forEach(function (m) { sel.appendChild(el('option', null, m.label, { value: m.name })); });
        sel.value = voiceRow;
        sel.addEventListener('change', function () { voiceRow = sel.value; });
        vn.appendChild(sel); row.appendChild(vn);
      } else row.appendChild(el('span', 'hc-pp-pd-name', name));
      var steps = el('div', 'hc-pp-pd-steps', null, { role: 'group', 'aria-label': name + ' steps' });
      for (var c = 0; c < 16; c++) {
        var b = el('button', 'hc-pp-pd-step' + (c % 4 === 0 ? ' hc-pp-pd-b' : ''), null, { type: 'button', tabindex: r === 0 && c === 0 ? '0' : '-1' });
        stepBtns[r][c] = b; paintStepBtn(r, c);
        (function (r, c, b) {
          b.addEventListener('click', function () { setStep(r, c, !pat[r][c]); rove(r, c); });
          b.addEventListener('focus', function () { rove(r, c); });
          b.addEventListener('keydown', function (e) {
            var nr = r, nc = c;
            if (e.key === 'ArrowRight') nc = Math.min(15, c + 1);
            else if (e.key === 'ArrowLeft') nc = Math.max(0, c - 1);
            else if (e.key === 'ArrowDown') nr = Math.min(ROWS.length - 1, r + 1);
            else if (e.key === 'ArrowUp') nr = Math.max(0, r - 1);
            else if (e.key === 'Home') nc = 0;
            else if (e.key === 'End') nc = 15;
            else return;
            e.preventDefault(); stepBtns[nr][nc].focus();
          });
        })(r, c, b);
        steps.appendChild(b);
      }
      row.appendChild(steps); rows.appendChild(row);
    });
    p.appendChild(rows);

    var pads = el('div', 'hc-pp-pd-pads');
    var g1 = el('div', 'hc-pp-pd-grp'); g1.appendChild(el('span', 'hc-pp-pd-cap', 'Fills: hold one'));
    var fills = el('div', 'hc-pp-pd-fills');
    ui.fills = {};
    ui.fillOff = [];
    ['fill', 'roll', 'toms'].forEach(function (name) {
      var b = el('button', 'hc-pp-pd-fill', name, { type: 'button', 'aria-label': name + ', hold to play' });
      ui.fills[name] = b;
      var down = false;
      function on() { if (down) return; down = true; b.classList.add('hc-pp-pd-on'); fill(name, true); }
      function off() { if (!down) return; down = false; b.classList.remove('hc-pp-pd-on'); fill(name, false); }
      ui.fillOff.push(off);
      b.addEventListener('pointerdown', function (e) { if (e.button) return; e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (x) {} on(); });
      b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('lostpointercapture', off);
      b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
      b.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) on(); } });
      b.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); off(); } });
      b.addEventListener('blur', off);
      fills.appendChild(b);
    });
    g1.appendChild(fills);
    ui.says = {};
    function padGroup(title, group) {
      var g = el('div', 'hc-pp-pd-grp', null, { role: 'group', 'aria-label': title });
      g.appendChild(el('span', 'hc-pp-pd-cap', title, { 'aria-hidden': 'true' }));
      var box = el('div', 'hc-pp-pd-says');
      MANIFEST.filter(function (m) { return m.group === group; }).forEach(function (m) {
        var b = el('button', 'hc-pp-pd-say', m.label, { type: 'button', 'aria-disabled': 'true', 'aria-label': m.label + ', loading', tabindex: '-1' });
        ui.says[m.name] = { b: b, m: m };
        b.addEventListener('click', function () {
          if (b.getAttribute('aria-disabled') === 'true') return;
          padPress(m);
        });
        box.appendChild(b);
      });
      g.appendChild(box);
      return g;
    }
    var g2 = padGroup('Voices', 'voice'), g3 = padGroup('Chords', 'chord');
    pads.appendChild(g1); pads.appendChild(g2); pads.appendChild(g3); p.appendChild(pads);

    ui.btn.addEventListener('click', function () { openPanel(p.hidden); });
    ui.x.addEventListener('click', function () { openPanel(false); ui.btn.focus(); });
    // Esc closes the panel and goes no further: Cargo leaves the page on Esc (a document keydown listener)
    p.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.stopPropagation(); openPanel(false); ui.btn.focus(); } });
    ui.go.addEventListener('click', function () { if (T.patOn) stop(); else play(); });
    ui.clear.addEventListener('click', function () {
      for (var r = 0; r < ROWS.length; r++) for (var c = 0; c < 16; c++) setStep(r, c, false);
    });
    ui.tempo.addEventListener('input', function () { setBpm(ui.tempo.value); });
    syncUI(); syncPads();
  }

  function openPanel(open) {
    if (!ui.panel) return;
    ui.panel.hidden = !open;
    ui.btn.setAttribute('aria-expanded', String(open));
    ui.btn.textContent = open ? 'Hide the beat' : 'Make a beat';
    if (open) { loadVoices(); place(); raf(); }
  }
  function syncUI() {
    if (!ui.go) return;
    ui.go.textContent = T.patOn ? 'Stop' : 'Play';
    ui.go.setAttribute('aria-label', T.patOn ? 'Stop the beat' : 'Play the beat');
  }
  function syncPads() {
    MANIFEST.forEach(function (m) {
      var u = ui.says && ui.says[m.name];
      if (!u) return;
      var has = PPVoices.has(m.name);
      u.b.setAttribute('aria-disabled', has ? 'false' : 'true');
      u.b.setAttribute('aria-label', has ? m.label : m.label + ', loading');
      u.b.tabIndex = has ? 0 : -1;
    });
  }

  var shown = -1, rafOn = false;
  function paintStep(s) {
    if (s === shown || !stepBtns[0][0]) return;
    for (var r = 0; r < ROWS.length; r++) {
      if (shown >= 0) stepBtns[r][shown].classList.remove('hc-pp-pd-now');
      if (s >= 0) stepBtns[r][s].classList.add('hc-pp-pd-now');
    }
    shown = s;
  }
  function frame() {
    rafOn = false;
    if (!audio || !T.timer || ui.panel.hidden) { if (!T.timer) paintStep(-1); return; }
    var now = audio.ctx.currentTime, cur = -1;
    for (var i = 0; i < T.queue.length; i++) { if (T.queue[i].t <= now) cur = T.queue[i].s; else break; }
    paintStep(T.patOn ? cur : -1);
    raf();
  }
  function raf() { if (!rafOn && ui.panel && !ui.panel.hidden) { rafOn = true; requestAnimationFrame(frame); } }

  /* ---------------------------------------------------------------- on the live page: where it sits, and only on this page */
  // The pill sits right of "Turn the sound off" (hc-palette-piano, fixed bottom left), on the same line; if that would run
  // into the blobs' pause button or 1999 mode's "back to 2026" (bottom right), it goes up above the sound switch instead.
  // The panel sits above them both. Measured, as hc-retro places "back to 2026".
  function place() {
    if (!ui.btn || !ui.btn.isConnected) return;
    var q = document.getElementById('hc-pp-quiet'), qr = q && q.getBoundingClientRect(), b = ui.btn, w = b.offsetWidth, top;
    if (!qr || !qr.width) { b.style.left = ''; b.style.bottom = ''; top = b.getBoundingClientRect().top; }
    else {
      var right = innerWidth;
      [].forEach.call(document.querySelectorAll('button.hc-pause, .hc-back'), function (x) {
        var r = x.getBoundingClientRect(); if (r.width && r.bottom > qr.top - 4 && r.top < qr.bottom + 4) right = Math.min(right, r.left); });
      if (qr.right + 10 + w <= right - 8) { b.style.left = (qr.right + 10) + 'px'; b.style.bottom = (innerHeight - qr.bottom) + 'px'; top = qr.top; }
      else { b.style.left = qr.left + 'px'; b.style.bottom = (innerHeight - qr.top + 10) + 'px'; top = qr.top - 10 - b.offsetHeight; }
    }
    if (ui.panel) ui.panel.style.bottom = Math.round(innerHeight - top + (innerWidth <= 640 ? 8 : 12)) + 'px';
  }
  // leaving the page: the beat stops, fills and recordings are let go, the panel closes, the pill and panel are taken away
  function leave() {
    if (!ui.btn || (!ui.btn.isConnected && !ui.panel.isConnected && !T.timer)) return;
    T.patOn = false; held = []; fillName = null; fillStart = -1;
    (ui.fillOff || []).forEach(function (off) { off(); });
    stopTimer(); syncUI();
    if (rowHit) rowHit.stop(); rowHit = null;
    for (var k in padHit) { if (padHit[k]) padHit[k].stop(); lightPad(ui.says[k].m, 0); }
    padHit = {};
    openPanel(false);
    if (ui.panel.parentNode) ui.panel.parentNode.removeChild(ui.panel);
    if (ui.btn.parentNode) ui.btn.parentNode.removeChild(ui.btn);
  }
  function check() {
    if (!PAGE.test(location.pathname)) { leave(); return; }
    if (!document.body) return;
    if (!ui.btn) build();
    if (!ui.panel.isConnected) document.body.appendChild(ui.panel);
    if (!ui.btn.isConnected) document.body.appendChild(ui.btn);
    var q = document.getElementById('hc-pp-quiet');
    if (sizes && q) { sizes.observe(q); sizes.observe(ui.btn); }
    place();
  }
  addEventListener('resize', place);
  var sizes = window.ResizeObserver ? new ResizeObserver(function () { place(); }) : null;   // the sound switch's label changes its width
  // reaching for the piano (a pointer over it, a touch, a key) is when the recordings are fetched, so a page view stays light
  ['pointerover', 'pointerdown', 'focusin'].forEach(function (n) {
    document.addEventListener(n, function (e) {
      if (e.target && e.target.closest && e.target.closest('#hc-pp, #hc-pp-pd-btn, #hc-pp-quiet')) loadVoices();
    }, { capture: true, passive: true });
  });
  window.__hcPaletteDrums = { check: check, place: place, loaded: function () { return MANIFEST.filter(function (m) { return PPVoices.has(m.name); }).length; } };

  /* ---------------------------------------------------------------- test hooks */
  window.PPDrums = {
    pattern: function () { return pat.map(function (r) { return r.map(function (x) { return x ? 1 : 0; }); }); },
    set: function (row, step, on) { setStep(row, step, on); },
    play: play, stop: stop, fill: fill,
    voiceRow: function (n) { if (n != null) { voiceRow = vkey(n); if (ui.pick) ui.pick.value = voiceRow; } return voiceRow; },
    _voiceInfo: function (n) { var v = voices[vkey(n)]; return v ? { base: v.base, dur: v.dur, lvl: v.lvl, peak: v.peak, lead: v.lead } : null; },
    open: openPanel,
    setBpm: setBpm,
    _voices: V,
    _bus: makeBus,
    _stepEvents: stepEvents,
    _log: function (a) { logTimes = a || null; },
    _state: function () { return { n: T.n, next: T.next, timer: !!T.timer, queue: T.queue.slice(), fillName: fillName, patOn: T.patOn }; },
    _busGain: BUS_GAIN
  };

  /* ---------------------------------------------------------------- go: built the first time the piano page is shown; hc-palette-piano's check() calls check() on every change */
  check();
})();
window.__hcBuild = "2026-11-17 00:41";
