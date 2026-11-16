# hallicivelek.com — blobs and the blob-pond

Interactive add-ons for Halli Civelek's portfolio site, hallicivelek.com, which runs on **Cargo Collective** (Cargo 2).
Everything reaches the live site through Cargo's **Custom HTML** setting. Two ways (both built every time):
- **Short (live):** `dist/custom-html-short.html` = Halli's own parts + an inline loader for `dist/js/*.js` on
  GitHub Pages (repo `github.com/hallicivelek/hallicivelek-site`, public, served from `main` at
  `https://hallicivelek.github.io/hallicivelek-site/`). Changes to the add-ons go live by **building, committing and
  pushing**; GitHub Pages caches for up to ~10 minutes. Halli only re-pastes when `src/parts/` or the script list changes.
- **Long (fallback):** `dist/custom-html.html` with everything inline (~119 KB), pasted whole.
- **Live since 2026-11-03: the short version.** Plain `<script src>` tags in Custom HTML did *not* work on Cargo
  (the blobs disappeared; cause not pinned down — local and swapped-in tests passed). The short file therefore uses a
  small **inline loader** that adds the four scripts with `async = false`. Verified on the live site after Halli pasted it.
  **New add-ons need no paste:** `IN_CARGO` in `tools/build_scripts.py` lists the four files Cargo's loader names; the
  last of them (`hc-pond.js`) loads any later add-on (e.g. `hc-eyes.js`) from the same folder. Each add-on guards
  against running twice, so a future re-paste with a newer loader is harmless.
- **Text copied out of Cargo's editor loses its backslashes** (confirmed again 2026-11-03: `\n` → `n`). Never use it as
  source or paste it back; the loader and Halli's parts contain no backslashes, so the short file survives it.

## Working with Halli
- When Halli does need to paste, **always hand over a complete file** (`dist/custom-html-short.html`, or the long one),
  never fragments. He pastes it over the whole of Cargo's Custom HTML. It contains his own parts too (see `src/parts/`).
- Commits and pushes to the repo publish to the live site: commit/push only when Halli asks or has agreed to the
  change. Commits use his GitHub noreply address (set in the repo's git config), not his work email.
- If Halli has changed anything in Cargo's Custom HTML himself (e.g. the mobile menu), get the new version from him
  and update `src/parts/` **before** building, or the build will overwrite his change.
- **Never rebuild from code he pastes back into chat.** Pasting has stripped backslashes before (`/\/+$/` arrived as
  `//+$/`, which breaks the script). The files in `src/` are the source of truth.
- Review existing code before changing it; prefer small targeted edits over rewrites.
- Be calibrated: say what was tested and how, and what wasn't. Don't present guesses as facts.
- Custom CSS (separate Cargo setting) is targeted snippets only; see `custom-css/`.

## Build and test
```
python3 build.py              # src/ → dist/hc-columns.html, dist/hc-pond.html, dist/custom-html.html; syntax-checks every script
python3 tests/test_site.py    # 121 checks in a stand-in for Cargo's page (desktop, ordinary page, project grid, script files, eyes, weather, umbrella, phone)
```
Tests need `python3 -m pip install --user playwright` (this Mac has no bare `pip`) and `python3 -m playwright install chromium`.
The build was verified to reproduce the installed files byte-for-byte when this project was set up.

## Files
- `src/pond.html` — **the blob-pond**, a standalone page (open it in a browser to try it). Source of truth for the pond.
- `src/hc-blobs.html` — background blobs on every page except the pond page (behaviours, faces, pause button).
- `src/hc-columns.html` — re-deals Cargo's thumbnail columns (three into two on desktop) and applies the **random sort**.
- `src/facts.txt` — **Halli's facts** for the random sort (hands, stripes, food, …), keyed by project address. The format
  is explained at the top of the file. `tools/build_facts.py` puts them into `dist/hc-columns.html` and refuses to build
  on a line it can't read.
- `src/hc-nav-active.html` — marks the current page in the nav (`link_active` + `aria-current`).
- `src/hc-eyes.html` — **eyes that follow you** on Halli's portrait (info + contact): swaps Cargo's photo for
  `assets/portrait/face-no-irises.jpg` and stacks `iris-left.png` / `iris-right.png` and `eyelids.png` (the portrait
  with transparent eyeholes, 25×11 and 23×11) on top — all Halli's layers, all 300 × 359 — in an overlay that is
  measured onto the photo every frame (wrapping the img broke Cargo's layout). Reach ±5 × ±3.5 px; within
  `NEAR` (80 px) of the nose bridge each eye turns fully towards the point, so they go cross-eyed. Cursor or last tap;
  after 4 s idle the eyes watch the nearest blob; reduced motion = looking straight ahead. Numbers are in the
  photo's 300 × 359 pixels.
  **Pencil** (Halli's `pencil.png`, tip at 15,191 of 59×200): lies right of the photo; click/tap picks it up, the
  pencil's tip draws black lines on a canvas over the face (strokes kept in photo pixels, redrawn on resize, not
  saved). On touch the tip is held 14 px left / 46 px above the finger so you can see it. Esc or a click/tap outside
  the photo puts it back. Cargo leaves the page on Esc (to `/`, a document keydown listener); our window-capture
  listener keeps Esc from Cargo while the pencil is held **or a drawing exists** (Halli lost a drawing to a second Esc).
- `src/hc-playthings.html` — **playthings**: on the page whose address contains `playthings`, hides whatever Halli
  put on the Cargo page (kept as fallback) and draws six cards (alphabetical, plain ASCII order), mostly live previews: Kontrapunkt (the blog in a
  scaled-down iframe, gliding), Proper palette piano player (a silent drawn picture, no iframe: six tilted white keys painted
  with real palettes from `palettes.json`, copied into `KEYS` in the file; links to `/palette-piano`), Shakeskin (12 of Halli's friends' faces from shakeskin.com, one at a time with a shake;
  shakeskin.com won't be framed), The Calculater (still iframe), the blob-pond (`/the-blob-pond?hc-preview`). Hover is
  20% white (overrides Cargo's yellow `.project_content a:hover`); Halli ruled out tilting. Reduced motion: no glide/shake.
- `src/hc-birth-a-blob.html` — **Birth-a-blob** (page address contains `birth-a-blob`; ported from
  `mockups/blob-maker`): a big blank blob and Halli's pencil (mouse, finger with the hc-eyes offset, or arrow keys /
  Space / Esc after picking it up from the keyboard), five colours, "Let it go" hands it to the background blobs via
  `window.hcBlobs.adopt(...)` (end of hc-blobs: also `paused()` and `spots()`), where it drifts as kind `made` for the
  rest of the visit (a tap gives it a wobble). Hides Cargo's content (fallback), grid and sort line; ids/classes `hc-bab-`,
  CSS under `#hc-bab`. Esc is kept from Cargo while the pencil is held or a face is drawn. Not saved anywhere.
  Loaded by hc-pond.js (no paste).
- `src/hc-palette-piano.html` — **Proper palette piano player** (page address contains `palette-piano`, a Cargo page
  Halli made 2026-11-16; ported from `mockups/palette-piano`, sound approved by Halli): every project as a white key
  painted with its own colours, in Halli's order, tilted like the pinboard prints. Pressing a strip plays its colours
  (instrument, notes, order, pace, trill, held note all from the colours and address; always D hirajoshi (D E F A Bb); all
  sounds made in the browser). Sound: six analog-synth voices (Kraftwerk, Numan, Boards of Canada, acid, Hopkins,
  Italo; Kraftwerk, acid and Italo in strict time). Since 2026-11-16 the sound code and colour-to-music mapping are
  `mockups/palette-piano/synth.html`'s, **unchanged** (copied line for line; the earlier piano/pluck sound was the
  mockup's `index.html`; `window.PalettePiano` is the checking hook, as used by `check_synth.py`). Title tag only on
  hover / focus / after a press, linking to `/<project>`. Keyboard: one Tab stop, arrows / Home / End move, Enter or
  Space plays, Tab reaches the title link. Reduced motion: strips don't move or grow. "Turn the sound off" is fixed
  **bottom left** (the pause button and "back to 2026" have the bottom right; lifted above the Netscape bar, styled in
  1999 mode). Hides Cargo's content (fallback), grid and sort line; ids/classes `hc-pp-` under `#hc-pp` (the sound code's
  own `on` / `down` / `lit` classes are scoped there). **The way back:** following a title saves
  `{slug, t}` in sessionStorage `hc-from-piano` (2 h); hc-project then shows "← palette piano" (to `/palette-piano`,
  quiet ink, 44px tall) instead of "← things I've made" on that project only; coming back (link, back button, or the
  back/forward cache via `pageshow`) scrolls to the strip and opens its title, silently, and uses the entry up.
  **Colours:** `src/palettes.json` (one project per line: title, address, colours with their share), put into
  `dist/hc-palette-piano.html` by `tools/build_palettes.py` (run by build.py; refuses an entry it can't read).
  Re-bake with `python3 tools/build_palettes.py --refresh` (Playwright; Cargo thumbnails, the mockup's
  `bake_palettes.py` colour reading moved there unchanged) when projects are added, renamed or re-thumbnailed — a
  re-bake can change how a strip sounds. `window.__hcPalettePiano` (`keys()`, `sound()`, `returned()`) for tests.
  Loaded by hc-pond.js (no paste).
- **Pond preview mode:** `?hc-preview` *inside an iframe* (pond_loader_template) adds `html.hc-pond-preview`: no Cargo
  header, no wake screen, no tray or caption, so audio never starts. Opened directly, `?hc-preview` does nothing.
- `src/hc-retro.html` — **1999 mode** (see below).
- `src/hc-music.html` — **music** (page address contains `music-mixes`; nav label "music"): about-me style page with
  Wanton Boys Club (cover, unattributed press quote, store buttons; Google Play dropped, it closed in 2020), remixes,
  and the four mixes with in-place Mixcloud players and tracklists (the four /filter/mix/ pages stay for old links).
  Hides Cargo's content (fallback) and grid; sets the title "Music & mixes – Halli Civelek" and a meta description
  (Cargo's Title field is also the nav label, so it stays "music").
- `custom-css/no-jump.css` — hides `.project_content` on first paint until `html.hc-pj-ready` (set by hc-nav-active
  for non-project pages, by hc-project once laid out; 2.5 s fallback in CSS and JS). Must be in Cargo's Custom CSS.
- `custom-css/header.css` — the bigger logo (~300px), for Cargo's Custom CSS on launch day.
- `src/hc-fold.html` — on the Romantika project page, swaps Halli's four-step fold drawing
  (`halli_apparat_fold_stort.jpg`) for `assets/apparat/fold.mp4` (rendered from the drawing's top panel: 72 frames,
  25 fps, 940×500; open→closed by 1.44 s, closed→open to the end) with a "see the magic" / "and back again" button and
  no video controls. Plays straight through without seeking (the test server can't seek). Video error → drawing stays.
- `src/hc-project.html` — **project pages** (any address ending in a Cargo project_url): Cargo's content is moved,
  not retyped, into an about-me-style layout: ← things I've made, title, first paragraph as the opening line (moved
  above the first picture), lines joined into paragraphs, a one-line paragraph right before a picture becomes its
  label, small pictures (<560px) in pairs, Cargo's tags as buttons, previous/next in Halli's order. `SEQUENCE`
  (Retro Stefson, FM Belfast) keeps one-after-another at ≤702px. `PROJECTS` holds per-project changes (FM Belfast
  opening line without "illustration"; Retro Stefson band photos cropped to their drawn white card).
- `src/hc-stylecheck.html` — **safety net for Cargo's own stylesheet**: once `/stylesheet` has arrived, if it is empty or
  failed, fetches it again with `cache: 'reload'` (which also replaces the browser's bad saved copy) and inserts it as
  `<style data-hc-stylecheck>` right after Cargo's link; up to 3 tries. `window.__hcStyleCheck` shows what it did.
  Loaded by hc-pond.js (no paste). Tested on the real site in Firefox, Chromium and WebKit with the first
  /stylesheet answer emptied (2026-11-09).
- `src/hc-strata.html` — **strata**: behind the front page grid (address `/` only; not on /filter/ tag pages, which
  are too short) the background changes with depth: pink paper with grain, the ghost of a 1998 layout table, Netscape
  grey, dial-up line noise (dropped scanlines, pixel bursts, faint `ATDT` / `NO CARRIER`) around the award. One fixed
  aria-hidden layer at z-index -2 (under the blobs), moving at 0.8 of the page via a CSS scroll-driven animation
  (keyframes rewritten when the page changes size; `?hc-strata=js` forces the scroll-handler fallback). Still (moves
  with the page) with reduced motion or `html.hc-blobs-paused` (set by hc-blobs); switching keeps it in place. Cargo's
  fixed header gets a grey `::before` overlay matching the depth; the award's teal links go darker (5.3:1 on the grey).
  Off in 1999 mode. Loaded by hc-pond.js (no paste). Screenshots against the live site: `mockups/strata/build/shot.py`.
- `src/hc-weather-free.html` — **project weather (free clouds)**, the one loaded since 2026-11-15 (ported from
  `~/Documents/hallicivelek.com/mockups/weather-free/`): on project pages only, clouds drift right to left in one fixed
  full-page canvas right behind the blob layer (z-index -1, aria-hidden, no pointer events). Kind from the colour table
  below: year before 2005 = pixel clouds, pale + cold colours = snow, loudness > 1 = rain, else calm; missing = gentle
  calm default; seeded by address. Rain/snow falls only from clouds and fades behind text; cloud colours mix the table's sky/sky2/accent (not `light`, which is
  near-white for most projects); clouds fade behind text boxes just enough that plum text keeps 5:1 (`fadeBehindText`,
  `__hcWeather.contrast`). Shapes: 10 hand-designed circles-only templates (wisp, duo, small3, classic4, leaning4,
  long5low, tall3, tower, wide6, bank7), varied by mirror, scale, stretch, colour and per-cloud opacity 0.45–0.95; no
  template repeats on a page until all are used. Pixel clouds rasterise the same templates. Sheet: `shots/cloud_sheet.py`
  in the blob-site-umbrella copy (not in the repo). Every frame it sends the falling columns to `window.hcBlobs.keepOut(...)` and hc-blobs makes
  its blobs step aside (`hcBlobs.dodged()` for tests). Still with reduced motion, freezes with "pause blobs", stops while
  the tab is hidden, off in 1999 mode; measures its area every frame. `window.__hcWeather` shows what it decided
  (`variant: 'free'`). Sets `__hcWeatherOn` and removes any `canvas.hc-weather`, so there is only ever one weather.
  `tools/build_weather.py` puts the table into `dist/hc-weather-free.html`. Loaded by hc-pond.js (no paste).
  **Blob umbrella and wet cursor (built 2026-11-15 in the `blob-site-umbrella` copy, approved by Halli; not live):**
  rest the cursor still ~0.8 s in falling rain or snow (phone: long press ~0.6 s) and the nearest blob (not a `made`
  one; small ones under 56px only if much nearer) glides over on a damped, speed-limited spring and hovers just above
  it, slightly flattened; rain/snow splashes off its top. Moving out lets it go after 0.4 s (1.5 s when the weather
  drifts away from a still cursor; at once when the finger lifts); it keeps its momentum and drifts on. Not over
  pictures (the canvas is behind them), nor when the blob's spot above would be hidden. Wet cursor (mouse): after ~1 s
  in rain without an umbrella, one or two drops hang under the arrow and fall off one at a time as it moves (landing on
  a blob = tiny wobble); snow = a small white cap that melts into a drop. Phone: a drop runs down from where the finger
  lifted in the rain. Rest of 7–14 s before the cursor gets wet again. All on the weather canvas, passive listeners,
  nothing prevented; none while still (reduced motion / paused). hc-blobs hooks: `hcBlobs.shelter({x,y}|null)` (sent
  every frame; stale after 0.3 s), `umbrella()`, `nudge(x, y)`. Test helpers: `__hcWeather.wetSpot()`, `isWet(x, y)`,
  `wetCursor()`, `splashes`. Wet-cursor drops are water blue (#6fb7e6, darker edge, light glint), ~1.8x the first size; clouds drift at 60% of the first speed (rain/snow fall unchanged). hc-blobs fades a blob's face while it would sit over text (`textBoxes`/`faceOverText`), so faces never overlap words. Screenshots: `shots/shot.py` (draws a stand-in cursor/fingertip; phone 402px).
- `src/hc-weather.html` — **retired from loading 2026-11-15** (replaced by hc-weather-free; still built to
  `dist/hc-weather.html`, no longer in `ADDONS`; the old `dist/js/hc-weather.js` is left in place). **Project weather (strip)**: on every project page one small canvas of sky right under the opening
  line (after the `h1` if there is none), drawn from the project's first picture: calm colours = slow clouds and a low
  sun, loudness > 1 = a light storm with rain and the odd bolt, year before 2005 = dithered low-res sky with pixel clouds
  (no year = never pixel). Seeded from the address, so the same project always gets the same sky. Blobs drifting
  through: clouds lean away, a blob keeps rain off, pixel clouds hop. Still with reduced motion, follows "pause blobs"
  (localStorage `hc-blobs-paused`), stops off screen. Forced `position: static` (Cargo makes project-page canvases
  absolute); a MutationObserver puts it back when Cargo rebuilds the layout (Pedro Pilatus) or changes page.
  `window.__hcWeather` shows what it decided; `window.hcProjectColours.get(address)` is the shared table lookup.
  Loaded by hc-pond.js (no paste). **Colour table** `src/weather.txt` (one line per project: address, year, loudness,
  four colours, a note on where the year came from): Cargo's image host has no CORS, so colours are read at build time.
  Refresh with `python3 tools/build_weather.py --refresh` (Playwright; new projects, new pictures). A refresh keeps the
  years already in the file, so **correct a year by hand there**; `--refresh --years` works them all out again.
  Years: Cargo's `date`, a year in the title, or a dated year in the text ("…, 1999."). `tools/build_weather.py`
  puts the table into `dist/hc-weather.html` (run by build.py; refuses a line it can't read). A project missing from
  the table gets a gentle default sky. Screenshots: `~/Documents/hallicivelek.com/mockups/weather/build/` (its `shot.py`).
- `src/hc-debug.html` — screen measurements overlay, **only with `?hc-debug`** in the address (for diagnosing phones).
- `src/parts/before.html`, `src/parts/after.html` — **Halli's own** Custom HTML (Cargo filter script, StatCounter,
  Typekit link that loads the site font Pacaembu; mobile menu fixes). Keep as he gives them.
- `tools/build_pond_module.py` — converts `src/pond.html` into the Cargo-safe `dist/hc-pond.html` (see Fencing).
- `tools/pond_loader_template.js.html` — the loader wrapped around the pond on Cargo.
- `tools/build_custom_html.py` — assembles `dist/custom-html.html` (long version).
- `tools/build_scripts.py` — makes `dist/js/*.js` and `dist/custom-html-short.html` (short version).
- `assets/blob-faces/` — Halli's six face drawings (originals; already embedded in the code as `FACES` / `FACE`).
- `custom-css/spacing.css` — the card-spacing snippet that lives in Cargo's Custom CSS.

## Fencing (why the pond is converted)
On the site the pond shares the page with Cargo, so the converter:
- prefixes **every id and class** with `hcp-` (Cargo has its own `.caption` etc.), scopes every CSS rule under `#hc-pond`,
  and turns page-wide rules into `html.hc-pond-on …` rules. It refuses to build if any CSS rule is left unscoped.
- keeps `@media` conditions (and strips CSS comments first).
- only builds the pond on a page whose address matches `/blob-?pond/i`.
**When you add an id or class to `src/pond.html`, add it to `IDS` / `CLASSES` in `tools/build_pond_module.py`**, or it
won't be prefixed and the Cargo version will look for an element that doesn't exist.

## The sort line and the random overlords
Every visit starts in **Halli's order** (Cargo's project order, which Halli sets by hand): "sorted by: Halli
↻ try the random overlords" (after the first click: "↻ ask the overlords again", dark teal rgb(14,118,128), bold,
underlined). No intro line above it (tried, Halli: better without). Clicking picks one of: a sort from `facts.txt` that matches at least 2 projects
on the grid (numbers: most first, or `order: lowest first`), Halli's order, or a **90s sort worked out on the spot**:
- `modem` "33.6k modem": smallest thumbnail file first (Resource Timing size, else a guess from the pixels); each
  picture loads top to bottom in steps, 3–12 s, only once 25% of the card is on screen; hover fact "≈ N sec on 33.6k"
  (N = the real on-screen time). No dial-up with reduced motion.
- `yahoo` "Yahoo! directory, 1998": A to Z by title (Icelandic collation); hover "Yahoo! › Halli › K".
- `tiny` "tiny JPG, 1997": smallest first; each picture drawn onto a canvas at 1/14 size and blown up pixelated;
  hover "kronan_SMALL.jpg · 2 KB".
- `geocities` "GeoCities, 1999": about 1 in 6 clicks (when hc-retro is loaded and GeoCities isn't on): keeps the
  order and switches the site to GeoCities mode.
**Design rule from Halli:** the work stands on its own, titles only on hover. A card's fact is therefore only shown
on hover, under Cargo's hover title (`.thumb_title`), never as a permanent tag. Cards glide to their new places
(skipped with reduced motion). A filter change keeps the sort if it still matches 2+, else goes back to Halli's order.
`?hc-sort=<name>` previews one (fact names, or modem, yahoo, tiny, geocities, halli). On phones Cargo's own columns
are kept, only re-ordered. Project addresses come from Cargo's models (`project_url`); all addresses in facts.txt
were checked against the 70 live projects on 2026-11-03 — a renamed project in Cargo can change its address.

## Tag pages (hc-columns)
On /filter/<tag> (where Cargo's tags lead): "← things I've made", the tag as a 44px title (TAG_NAMES fixes
"artdirection" and the "iillustration" typo) and "N things", right above the sort line. No "clear filter" control.

## The pinboard (hc-columns CSS)
Halli's choice 2026-11-04 over rounded white boxes: three columns from 1000px (two from 768px, Cargo's own below),
44px between columns, 64px between prints; each picture a white-bordered print (10px), square corners, soft
shadow, tilted by up to ±2.2° (worked out from its address, so the same every visit), straight again on hover.
Overrides `custom-css/spacing.css` (120px gaps), which can be removed from Cargo's Custom CSS.

## 1999 mode (src/hc-retro.html)
On the regular site the award medal is a golden, shimmering, smiling blob (Halli's blob-faces-03 face; a sheen sweeps across it, it bobs gently; still with reduced motion).
Netscape (grey, Times, link blue, sunken frames, bevelled buttons, status bar) or GeoCities (starry tiles, Comic
Sans, scrolling welcome, UNDER CONSTRUCTION, visitor counter 000417 + 1 a day, rainbow line, gold frames, blinking
NEW! on the first three projects in Halli's order, cursor sparkles). Never on by default. Ways in: the "Bottom of the
page award" under the grid ("Pick your prize: Netscape – GeoCities"; in Netscape mode the medal is a bevelled badge
with a spinning star) and the overlords' GeoCities pick. "⏻ back to 2026" sits left of the blobs' pause button while
a mode is on. The mode lasts for the visit (sessionStorage `hc-1999`). `window.__hcRetro.set('ns'|'gc'|'off')`.

## Things learned the hard way
- **Never put `@keyframes` (and test anything new) in Cargo's Custom CSS without trying it**: on 2026-11-07 a pasted
  `@keyframes` line made Cargo serve /stylesheet empty and the whole site lost its styles until it was removed.
- **Cargo outage 2026-11-09 (not our code):** Cargo's server gave 504s and once served `/stylesheet` empty (200, 0 bytes)
  with `max-age=3600`; browsers that caught it showed a pink page with three huge white bars (Cargo's ☰ menu icon,
  unstyled) for up to an hour. Check: `document.styleSheets[0].cssRules.length` is 0. `src/hc-stylecheck.html` now
  repairs this by itself (see Files).
- **Cargo adds the phone viewport tag late**, with a script, after our scripts have started. Anything that reads
  `innerWidth`/`innerHeight` at start-up sees a 980px desktop page on phones. Safari also doesn't reliably fire
  `resize` for it. Both the pond and the background blobs therefore **measure their own drawing area every frame**
  (`fitToScreen`) and rescale. Don't reintroduce start-up-only measuring.
- iOS Safari's floating toolbar: the pond uses `100lvh` so it covers the strip behind it.
- Cargo's own CSS to know about: `.link_link.link_active a` has a cream background (we override it), `.column` has
  `width: calc(50% - 20px) !important`, `.thumbnails.clear` sets the 40px gap.
- The site font (Pacaembu, via Typekit) is licensed to the domain: the standalone `src/pond.html` falls back to Nunito.
- In headless tests, navigating to the same URL with only a different `#hash` does not reload the page; add a
  `?query` to force real reloads. Background browser tabs pause `requestAnimationFrame`.
- Koto (Karplus–Strong): the loop is **N − 0.5 samples** long; getting this wrong made high notes up to 41 cents sharp.
- Sound design rules that keep it doze-able: at most ~5 notes a second (`play` limiter), scales instead of free pitch,
  the singer at most one "lah" per 1.6 s, the electric piano every 50–110 s.

## The blob-pond in brief
Blobs drift across 7 lines; crossing a line plays its note in the current scale. Kinds and voices: shy (bells),
watcher (kalimba, wears a face, eyes follow the cursor), swell (soft pad), drop (marimba, falls through all lines),
hungry (bass, swallows another blob), chatter (trills), singer (formant-synthesised "lah" with a long hall),
strummer (soft koto: plucks, occasional pressed-note bends, a sweep across all strings on click).
Scales: time of day by default (morning/day major pentatonic, evening **hirajoshi**, night minor pentatonic), a
picker and "surprise me" (weighted towards unfamiliar scales: slendro, pelog, harmonic series, …). Bohlen–Pierce
(no octaves) only via "surprise me" or as a ~1-in-30 secret visit ("something strange in reykjavík").
Accessibility: pause button (WCAG 2.2.2), reduced-motion respected, screen-reader labels, keyboard-reachable controls.

## Redesign in progress (2026-11-04)
Plan and every decision so far: `~/Documents/hallicivelek.com/site-redesign-notes.md` (outside the repo). New nav:
things I've made · playthings · about me. The about me page is live (pasted by Halli). Playthings is built
and live. Front page built 2026-11-04 (intro, sorted by: Halli, overlords, 90s sorts, 1999 mode, award): pushing it
makes it live straight away, so push only when Halli says. Launch day in Cargo: nav labels, hand-picked order,
header.css, remove "Other projects" from about me.

## Checked by Halli (2026-11-07)
The redesign looks fine on his iPhone and speed is fine. Wanton Boys Club GIF stays out for now.

## Where we left off (2026-11-04)
- **2026-11-16:** the palette piano (`src/hc-palette-piano.html`, `src/palettes.json`, `tools/build_palettes.py`), its
  way back in hc-project and its playthings card (sixth, between Music Kontrapunkt Kontrol and Shakeskin) are
  **committed, pushed and live** (build `2026-11-16 03:52`; 121/121 tests). Checked on the live site in the desktop
  browser pane: page builds with 94 strips, a title link leads to the project, "← palette piano" shows there, and
  coming back scrolls to the strip (Cargo scrolls to the top late on the live site, so the scroll is repeated for
  2.5 s until the visitor scrolls, taps or types; the stand-in test did not catch this). Halli approved the sound in
  the mockup. Not checked: a real iPhone, the sound on the live site by ear, the back/forward-cache return (headless
  Chromium reloaded instead).
- **2026-11-15:** hc-weather-free (free clouds behind the blobs) replaces the hc-weather strip in the later-add-on list;
  95/95 tests pass. Built, **not committed or pushed**; not yet checked on the live site or a real iPhone.
- **Waiting on Halli:** a new `?hc-debug` screenshot from his iPhone (hallicivelek.com/info-contact?hc-debug, scrolled
  to the bottom) after build `2026-11-03 22:09` reached his phone. His last screenshot still showed the blob layer
  at 714px tall, i.e. the iOS stretch had not applied: either his phone still had the old script cached (GitHub Pages
  allows 10 min) or the iOS check missed. The check now also uses the user agent, and the readout prints
  `build … blobs think iOS: … layer style.height …`. If the build line is 22:09 and the layer is still 714, the
  stretch itself doesn't work on real iOS 26 (look at `fitToScreen` in hc-blobs) — not reproducible in Playwright WebKit,
  which only exercised the branch when forced on.
- Then decide with Halli whether the pause button stays where iOS 26 puts it or moves to a top corner.
- Remove `hc-debug` from `ADDONS` once the iPhone work is done (it is invisible without `?hc-debug`, so no rush).
- Not by Claude, outside the repo, in `~/Documents/hallicivelek.com/`: `custom-html-short.txt` and
  `info and about gamalt.txt` (Halli's own copies, 2026-11-04) and `gamla html af cargo.txt` (copied out of Cargo,
  backslashes stripped — never build from it).

## Open items and ideas
- **iOS 26 Safari (measured on Halli's iPhone with `?hc-debug`, 2026-11-03):** the page is drawn under the address
  bar, but fixed layers stop where the bar begins (`innerHeight` 714 with the bar out, 767 shrunk, screen 874). The
  blob layer was cut off in a straight line there; `fitToScreen` in hc-blobs now stretches the layer to the screen
  height on iOS (user agent, or `CSS.supports('-webkit-touch-callout', 'none')`) — **not yet confirmed on his phone**. Also: one-word hover titles at 20px made the info page
  414px wide on a 402px phone and Safari zoomed out (scale 0.983); titles now wrap and are 16px on phones.
  The pause button sits where iOS 26 puts fixed bottom elements: just above the address bar's spot.
- Pond test "evening plays hirajoshi" retries when it hits the pond's secret 1-in-30 "something strange" visit.
- Not tested anywhere but Halli's own devices: real Safari on iPhone, and whether Cargo limits Custom HTML size
  (the file is ~119 KB since the random sort; ~98 KB is the largest size Halli has confirmed working).
- Titles are 20px (16px on phones) and plum #492E46 (9.1:1 on the pink), set in hc-columns' CSS. White was ruled out (1.3:1), and
  Cargo's own title blue was 1.7:1.
- Random sort: still waiting for Halli's lists for gaze (looking at you / right), faces, colours, Halli-blue and
  visual tags. Speed values are Claude's guesses from the titles, to be checked. Once gaze is complete, the
  separate [looking left] sort is redundant.
- Undecided: whether the background blobs' pause button (in `hc-blobs.html`) should lose its fine stroke, like the pond controls did.
- Small mismatch: on Cargo, pond buttons get `letter-spacing: normal` from the converter's extra rules, while the
  standalone pond uses the site's `.04em`.
- Paused mid-way: left-aligning the bio on the info + contact page (needs a wrapper `<div class="bio">` in Cargo's
  editor plus one CSS rule).
- Saved ideas: splitting blob (cell division); a discovered-blobs tally ("3 of 8 found"); a hungry blob that swallows a
  project image; **visitors leaving a blob in a shared pond** — needs a small server with HTTPS. Note: hallicivelek.com
  uses Cargo's certificate, and both free certificates in Halli's Ionos package are already in use.

## Voice for project texts
Non-grandiose, inviting, friendly, clear. Halli tells you about the project in his own words; he is not selling it. No slogans, no punchy setup-and-reveal lines, no advertising tone. Edit his words for flow and grammar only.
