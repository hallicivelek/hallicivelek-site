# hallicivelek.com — blobs and the blob-pond

Interactive add-ons for Halli Civelek's portfolio site, hallicivelek.com, which runs on **Cargo Collective** (Cargo 2).
Everything reaches the live site through Cargo's **Custom HTML** setting. Two ways (both built every time):
- **Short (current plan):** `dist/custom-html-short.html` = Halli's own parts + four `<script src>` lines that load
  `dist/js/*.js` from GitHub Pages (repo `github.com/hallicivelek/hallicivelek-site`, public, served from `main` at
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
python3 tests/test_site.py    # 34 checks in a stand-in for Cargo's page (desktop, ordinary page, project grid, script files, eyes, phone)
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

## The random sort
Each page load picks one sort from `facts.txt` that matches at least 2 projects on the current grid, deals the
matching projects first (numbers: most first, or `order: lowest first`) and names the sort in a line above the grid
("sorted by: number of hands"). **Design rule from Halli:** the work stands on its own, titles only on hover. A card's
fact ("28 hands") is therefore only shown on hover, under Cargo's hover title (`.thumb_title`), never as a permanent tag. Clicking that line picks another (the usual order is one of the options); cards glide to their
new places (skipped with reduced motion). A filter change keeps the sort if it still matches 2+, else picks again.
`?hc-sort=<name>` previews one sort. On phones Cargo's own columns are kept, only re-ordered.
Project addresses come from Cargo's models (`project_url`); all addresses in facts.txt were checked against the 70
live projects on 2026-11-03 — a renamed project in Cargo can change its address.

## Things learned the hard way
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

## Open items and ideas
- Not tested anywhere but Halli's own devices: real Safari on iPhone, and whether Cargo limits Custom HTML size
  (the file is ~119 KB since the random sort; ~98 KB is the largest size Halli has confirmed working).
- Titles are 20px and plum #492E46 (9.1:1 on the pink), set in hc-columns' CSS. White was ruled out (1.3:1), and
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
