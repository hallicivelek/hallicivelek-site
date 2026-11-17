"""Checks the add-ons inside a stand-in for Cargo's page.   Run:  python3 tests/test_site.py
Needs:  python3 -m pip install --user playwright  &&  python3 -m playwright install chromium

The stand-in mimics what matters about hallicivelek.com on Cargo:
- a fixed header (z-index 1000) with nav links and Cargo's link_active styling
- deliberately clashing global styles (.caption, h1, p, button) to prove the pond is fenced
- NO viewport tag at first; a script near the end adds it, like Cargo does on phones
It cannot test real Cargo, real Safari, or Cargo's limit on Custom HTML size."""
import asyncio, functools, http.server, json, threading, tempfile, sys, re, zlib, struct, os
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
ADDONS = ['src/hc-nav-active.html', 'src/hc-blobs.html', 'dist/hc-pond.html']   # Cargo's own scripts need jQuery, so they're left out

PAGE = """<!doctype html><html lang="en"><head><meta charset="utf-8">
<style>
  body { margin: 0; background: rgb(244, 241, 236); font-family: Georgia, serif; font-size: 22px; line-height: 2; text-align: center; color: #492E46; }
  .site_header { position: fixed; top: 0; left: 0; right: 0; height: 64px; z-index: 1000; background: rgb(244, 241, 236); display: flex; justify-content: space-between; align-items: center; padding: 0 40px; box-sizing: border-box; }
  .navigation ul { list-style: none; display: flex; gap: 32px; margin: 0; padding: 0; }
  .navigation a { color: rgb(73, 46, 70); text-decoration: none; font-family: sans-serif; font-size: 16px; }
  .link_link.link_active a { color: rgb(59, 191, 201); font-weight: bold; background-color: rgb(244, 241, 236); }
  .container { padding: 88px 40px 0; }
  .caption { color: red !important; font-size: 40px; position: static; }      /* clashes on purpose */
  h1 { font-size: 60px; color: green; margin: 40px; }
  p { margin: 30px; color: orange; }
  button { background: yellow; border: 3px solid red; text-transform: uppercase; letter-spacing: 4px; }
</style></head><body>
<customhtml>ADDONS</customhtml>
<div class="site_header"><div class="header_text"><a href="/">HALLI CIVELEK</a></div>
  <div class="navigation"><ul class="list">
    <li class="link_link"><a href="/info-contact/">info + contact</a></li>
    <li class="link_link"><a href="/blob-pond/">the blob-pond</a></li></ul></div></div>
<div class="container"><div class="project_content"><p>PAGE CONTENT</p></div></div>
<script>document.head.insertAdjacentHTML("beforeend", '<meta name="viewport" content="width=device-width">');</script>
</body></html>"""

# The art direction grid as Cargo draws it: three columns, cards dealt in project order, and Cargo's project list
GRID_SLUGS = ['Herbergi-i-odrum-heimi', 'Smite-The-World', 'Millilending', 'Retro-Stefson-Retro-Stefson', 'Retro-Stefson-Qween',
              'Uppskriftabok-skaldverk', 'Retro-Stefson-Kimbabwe', 'FM-Belfast-how-to-make-friends', 'Cheerios', 'Icelandsmites',
              'Nothing-Ekkert', 'Grapewaves', 'Pedro-Pilatus-album-artwork', 'Automysophobia', 'Apparat-Organ-Quartet']
GRID = ('<div class="thumbnails clear" data-columnize=".thumbnail">' + ''.join(
    '<div class="column" style="float:left;width:30%">' + ''.join(
        f'<div class="padding_helper"><div class="thumbnail" name="{i + 1}"><a href="/filter/artdirection/{s}">'
        f'<div class="thumb_image" style="height:{120 + 37 * (i % 4)}px;background:#fff">{s}</div></a>'
        f'<div class="thumb_info"><a href="/filter/artdirection/{s}"><div class="thumb_title"><span>{s}</span></div></a></div></div></div>'
        for i, s in enumerate(GRID_SLUGS) if i % 3 == c) + '</div>' for c in range(3)) + '</div>'
        + '<script>window.Cargo = { View: { Thumbnail: { collection: { models: '
        + str([{'id': i + 1, 'attributes': {'project_url': s}} for i, s in enumerate(GRID_SLUGS)]).replace("'", '"')
        + ' } } } };</script>')
# the same grid with real pictures (one test image in different sizes), for the 90s effects
GRID_IMG = re.sub(r'(<div class="thumb_image" style="height:(\d+)px;background:#fff">)', lambda m: m.group(1) + f'<img src="/px.png?{m.group(2)}" width="200" height="{m.group(2)}" style="width:100%;height:{m.group(2)}px;display:block">', GRID)
GRID_DUMP = """() => ({ label: document.querySelector('#hc-sort .hc-sort-label') ? document.querySelector('#hc-sort .hc-sort-label').textContent : null,
  cols: [...document.querySelectorAll('.thumbnails .column')].filter(c => getComputedStyle(c).display !== 'none').map(c =>
    [...c.querySelectorAll('.thumbnail[name]')].map(t => { const b = t.closest('.padding_helper').querySelector('.hc-sort-fact');
      return t.querySelector('a').getAttribute('href').split('/').pop() + (b ? ' [' + b.textContent + ']' : ''); })) })"""
FIRST_BY_HANDS = ['Cheerios [28 hands]', 'Retro-Stefson-Kimbabwe [14 hands]', 'Smite-The-World [2 hands]', 'Automysophobia [2 hands]',
                  'Uppskriftabok-skaldverk [1 hand]', 'FM-Belfast-how-to-make-friends [1 hand]']


BLOCK_RESIZE = "(function(){ const add = window.addEventListener; window.addEventListener = function (t, f, o) { if (t === 'resize') return; return add.call(this, t, f, o); }; })();"

results = []
PASTE = []
PALETTES = json.loads((ROOT / 'src' / 'palettes.json').read_text())   # the palette piano's strips, in Halli's order
SHOTS = os.environ.get('HC_SHOTS')   # a folder: also save screenshots of birth-a-blob after a release there
SHOTS_PP = os.environ.get('PP_SHOTS')   # set to a folder to save the beat maker screenshots

def check(name, ok, detail=''):
    results.append(ok); print(('  PASS  ' if ok else '  FAIL  ') + name + (f'  ({detail})' if detail else ''))


async def main(base):
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])

        # ---- desktop: the pond page ----
        page = await b.new_page(viewport={'width': 1300, 'height': 760}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/blob-pond/#evening'); await page.wait_for_timeout(1200)
        for n in range(5):   # about one visit in thirty is the pond's secret "something strange" visit: try again
            if 'strange' not in await page.evaluate("document.getElementById('hcp-capWhere').textContent"): break
            await page.goto(base + f'/blob-pond/?again={n}#evening'); await page.wait_for_timeout(1200)
        r = await page.evaluate("""() => ({
          pond: !!document.getElementById('hc-pond'), bgBlobs: !!document.querySelector('.hc-blobs'),
          headerBg: getComputedStyle(document.querySelector('.site_header')).backgroundColor,
          headerOnTop: !!document.elementFromPoint(650, 30).closest('.site_header'),
          active: [...document.querySelectorAll('.navigation li.link_active')].map(l => l.textContent.trim()),
          capColor: getComputedStyle(document.getElementById('hcp-caption')).color,
          h1: getComputedStyle(document.querySelector('#hc-pond h1')).color,
          scrolls: getComputedStyle(document.body).overflow !== 'hidden' })""")
        check('pond builds on the blob-pond page', r['pond'])
        check('background blobs stay off on the pond page', not r['bgBlobs'])
        check('header stays on top, in the site pink', r['headerOnTop'] and r['headerBg'] == 'rgb(243, 220, 223)', r['headerBg'])
        check('nav marks "the blob-pond"', r['active'] == ['the blob-pond'], str(r['active']))
        check('clashing Cargo styles do not leak in', r['capColor'] != 'rgb(255, 0, 0)' and r['h1'] != 'rgb(0, 128, 0)', f"caption {r['capColor']}, h1 {r['h1']}")
        check('page does not scroll behind the pond', not r['scrolls'])
        await page.click('#hcp-wakeBtn'); await page.mouse.move(650, 500)
        check('evening plays hirajoshi', await page.inner_text('#hcp-capScaleName') == 'hirajoshi')
        await page.click('#hcp-capScale'); await page.wait_for_timeout(150)
        check('caption scale name opens the picker', await page.is_visible('#hcp-blobPanel') and await page.evaluate("document.activeElement.id") == 'hcp-scalePick')
        await page.click('#hcp-surprise'); await page.wait_for_timeout(100)
        check('surprise me changes caption and picker together',
              await page.inner_text('#hcp-capScaleName') == await page.evaluate("document.getElementById('hcp-scalePick').selectedOptions[0].textContent"))
        await page.click('#hcp-blobClose'); await page.wait_for_timeout(100)
        check('X closes the panel, focus back on the toggle', not await page.is_visible('#hcp-blobPanel') and await page.evaluate("document.activeElement.id") == 'hcp-blobsToggle')
        check('no script errors (pond page)', not errs, '; '.join(errs)[:200])
        await page.close()

        # ---- desktop: an ordinary page ----
        page = await b.new_page(viewport={'width': 1300, 'height': 760}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/info-contact/'); await page.wait_for_timeout(1200)
        n = await page.evaluate("document.querySelectorAll('.hc-blob').length")
        check('ordinary page: background blobs, no pond', n == 9 and not await page.evaluate("!!document.getElementById('hc-pond')"), f'{n} blobs')
        check('no script errors (ordinary page)', not errs, '; '.join(errs)[:200])
        await page.close()

        # ---- the project grid: two columns and the random sort ----
        page = await b.new_page(viewport={'width': 1300, 'height': 760}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/filter/artdirection/?hc-sort=hands'); await page.wait_for_timeout(800)
        r = await page.evaluate(GRID_DUMP)
        order = await page.evaluate("""() => [...document.querySelectorAll('.thumbnail[name]')].filter(t => t.offsetParent)
          .map(t => [t.getBoundingClientRect().top, t.getBoundingClientRect().left, t.querySelector('a').getAttribute('href').split('/').pop()])
          .sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(x => x[2])""")
        cards = sum(len(c) for c in r['cols'])
        check('grid: three columns on a wide screen, no card lost', len(r['cols']) == 3 and cards == len(GRID_SLUGS), f"{len(r['cols'])} columns, {cards} cards")
        check('grid: ?hc-sort=hands names the sort', r['label'] == "sorted by: number of hands", r['label'])
        firsts = [x.split(' [')[0] for x in FIRST_BY_HANDS]
        check('grid: most hands first, top to bottom', order[:6] == firsts, ', '.join(order[:6]))
        badges = sorted(x for c in r['cols'] for x in c if '[' in x)
        check('grid: facts on exactly the hands cards, "1 hand" singular', badges == sorted(FIRST_BY_HANDS), '; '.join(badges))
        await page.mouse.move(5, 300); await page.wait_for_timeout(400)
        hidden = await page.evaluate("getComputedStyle(document.querySelector('.hc-sort-fact')).opacity")
        await page.hover('.hc-sort-card .thumb_image'); await page.wait_for_timeout(400)
        shown = await page.evaluate("getComputedStyle(document.querySelector('.hc-sort-card .hc-sort-fact')).opacity")
        check('grid: a fact only shows on hover, like the title', hidden == '0' and shown == '1', f'{hidden} -> {shown}')
        await page.click('#hc-sort button'); await page.wait_for_timeout(1000)
        r2 = await page.evaluate(GRID_DUMP)
        check('grid: shuffle picks another sort and keeps every card', r2['label'] != r['label'] and sum(len(c) for c in r2['cols']) == len(GRID_SLUGS), r2['label'])
        await page.goto(base + '/filter/artdirection/?r=1'); await page.wait_for_timeout(800)
        r = await page.evaluate(GRID_DUMP)
        again = await page.evaluate("[document.querySelector('.hc-sort-again').textContent, (document.getElementById('hc-intro') || {}).textContent]")
        order = await page.evaluate("""() => [...document.querySelectorAll('.thumbnail[name]')].filter(t => t.offsetParent)
          .map(t => [t.getBoundingClientRect().top, t.getBoundingClientRect().left, t.querySelector('a').getAttribute('href').split('/').pop()])
          .sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(x => x[2])""")
        check("grid: every visit starts in Halli's order, with the overlords offered and no intro line", r['label'] == 'sorted by: Halli'
              and again == ['↻ try the random overlords', None]
              and order[:3] == GRID_SLUGS[:3], f"{r['label']} | {again} | {order[:3]}")
        tag = await page.evaluate("(() => { const t = document.getElementById('hc-tag'); return t && [t.querySelector('a').getAttribute('href'), t.querySelector('h1').textContent, t.querySelector('p').textContent, t.nextElementSibling.id]; })()")
        check("tag page: ← things I've made, the tag as a title and how many things, right above the sort line", tag == ['/', 'art direction', '15 things', 'hc-sort'], str(tag))
        await page.click('#hc-sort button'); await page.wait_for_timeout(900)
        again = await page.evaluate("[document.querySelector('.hc-sort-label').textContent, document.querySelector('.hc-sort-again').textContent]")
        check('grid: after the first click it says "ask the overlords again"', again[0] != 'sorted by: Halli' and again[1] == '↻ ask the overlords again', str(again))
        await page.goto(base + '/filter/artdirection/?hc-sort=yahoo'); await page.wait_for_timeout(900)
        r = await page.evaluate(GRID_DUMP)
        order = await page.evaluate("""() => [...document.querySelectorAll('.thumbnail[name]')].filter(t => t.offsetParent)
          .map(t => [t.getBoundingClientRect().top, t.getBoundingClientRect().left, t.querySelector('.thumb_title').textContent.trim()])
          .sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(x => x[2])""")
        az = await page.evaluate("(l) => l.slice().sort((a, b) => a.localeCompare(b, 'is'))", order)
        facts = sorted({x.split(' [')[1][:-1] for c in r['cols'] for x in c if '[' in x})
        check('grid: Yahoo! directory, 1998 is A to Z, with "Yahoo! › Halli › A" on hover', r['label'] == 'sorted by: Yahoo! directory, 1998'
              and order[:4] == az[:4] and len(facts) >= 3 and all(f.startswith('Yahoo! › Halli › ') for f in facts), f"{order[:4]} | {facts[:3]}")
        tilt = await page.evaluate("[...document.querySelectorAll('.thumb_image')].map(b => b.style.getPropertyValue('--hc-tilt'))")
        bg = await page.evaluate("[getComputedStyle(document.querySelector('.thumb_image')).borderRadius, getComputedStyle(document.querySelector('.thumb_image')).boxShadow !== 'none']")
        check('pinboard: every print has its own small tilt, square corners and a shadow', len(set(tilt)) > 5 and all(abs(float(x[:-3])) <= 2.2 for x in tilt) and bg == ['0px', True], f"{tilt[:4]} {bg}")
        await page.set_viewport_size({'width': 900, 'height': 760}); await page.wait_for_timeout(700)
        r = await page.evaluate(GRID_DUMP)
        check('grid: two columns on a narrower screen, no card lost', len(r['cols']) == 2 and sum(len(c) for c in r['cols']) == len(GRID_SLUGS), f"{len(r['cols'])} columns")
        check('no script errors (grid)', not errs, '; '.join(errs)[:200])
        await page.close()

        # ---- the short Custom HTML: its loader adds the same add-ons as script files (as served from GitHub Pages) ----
        page = await b.new_page(viewport={'width': 1300, 'height': 760}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/short/blob-pond/'); await page.wait_for_timeout(1200)
        pond = await page.evaluate("!!document.getElementById('hc-pond') && !document.querySelector('.hc-blobs')")
        await page.goto(base + '/short/filter/artdirection/?hc-sort=hands'); await page.wait_for_timeout(1200)
        r = await page.evaluate(GRID_DUMP)
        n = await page.evaluate("document.querySelectorAll('.hc-blob').length")
        check('script files: pond, background blobs and sorted grid all work', pond and n == 9 and r['label'] == "sorted by: number of hands"
              and len(r['cols']) == 3, f"pond {pond}, {n} blobs, {r['label']}")
        await page.goto(base + '/short/info-contact/'); await page.wait_for_timeout(1200)
        eyes = await page.evaluate("[document.querySelectorAll('.hc-eye').length, (document.querySelector('img[data-hc-eyes]') || {}).src || '']")
        async def iris_x():   # left edge of each iris, in % of the photo width
            return await page.evaluate("[...document.querySelectorAll('img.hc-eye')].map(i => parseFloat(i.style.left))")
        r = await page.evaluate("(() => { const r = document.querySelector('img[data-hc-eyes]').getBoundingClientRect(); return [r.left, r.top, r.width]; })()")
        straight = [(115.6 - 7) / 3, (178 - 7.5) / 3]
        await page.mouse.move(2, r[1] + 167 * r[2] / 300); await page.wait_for_timeout(700); left = await iris_x()
        await page.mouse.move(1298, r[1] + 167 * r[2] / 300); await page.wait_for_timeout(700); right = await iris_x()
        await page.mouse.move(r[0] + 147 * r[2] / 300, r[1] + 172 * r[2] / 300); await page.wait_for_timeout(700); nose = await iris_x()
        check('eyes: portrait swapped for the eyeless one, two irises under the eyelids', eyes[0] == 2 and await page.evaluate("!!document.querySelector('.hc-eyes .hc-lids')") and eyes[1].endswith('/assets/portrait/face-no-irises.jpg'), str(eyes))
        check('eyes: irises follow the cursor left and right', all(left[i] < straight[i] < right[i] for i in (0, 1)), f'left {left}, right {right}')
        pb = await page.evaluate("(() => { const b = document.querySelector('.hc-pencil').getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; })()")
        await page.mouse.click(pb[0], pb[1]); await page.wait_for_timeout(150)
        holding = await page.evaluate("document.querySelector('.hc-eyes').classList.contains('hc-drawing')")
        await page.mouse.move(r[0] + 100 * r[2] / 300, r[1] + 240 * r[2] / 300); await page.mouse.down()
        await page.mouse.move(r[0] + 200 * r[2] / 300, r[1] + 250 * r[2] / 300, steps=10); await page.mouse.up()
        inked = await page.evaluate("(() => { const c = document.querySelector('.hc-ink'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n; })()")
        await page.evaluate("document.addEventListener('keydown', e => { if (e.key === 'Escape') window.__cargoEsc = (window.__cargoEsc || 0) + 1; })")   # stands in for Cargo's leave-on-Esc
        await page.keyboard.press('Escape'); await page.wait_for_timeout(150)
        await page.keyboard.press('Escape'); await page.wait_for_timeout(150)   # a second Esc, pencil already down
        down = await page.evaluate("[!document.querySelector('.hc-eyes').classList.contains('hc-drawing'), !window.__cargoEsc ? location.pathname : 'Cargo got Esc']")
        check('pencil: pick it up, draw a line, Esc puts it back; Cargo never gets Esc while there is a drawing', holding and inked > 50 and down[0] and down[1] == '/short/info-contact/',
              f'holding {holding}, {inked} inked pixels, after Esc {down}')
        check('eyes: cross-eyed with the cursor on the nose', nose[0] > straight[0] + 1 and nose[1] < straight[1] - 1, f'{nose} vs straight {[round(v, 1) for v in straight]}')
        check('no script errors (script files)', not errs, '; '.join(errs)[:200])
        await page.close()

        # ---- the 90s sorts with real pictures, and 1999 mode ----
        page = await b.new_page(viewport={'width': 1300, 'height': 760}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/short/filter/illustration/?hc-sort=modem'); await page.wait_for_timeout(1800)
        r = await page.evaluate("""() => ({ label: document.querySelector('.hc-sort-label').textContent, dial: document.querySelectorAll('.hc-dial').length,
          going: document.querySelectorAll('.hc-dial.hc-go').length, imgs: document.querySelectorAll('.thumb_image img').length,
          fact: (document.querySelector('.hc-sort-fact') || {}).textContent })""")
        check('33.6k modem: every card dials up, only the ones on screen have started, "≈ N sec on 33.6k" on hover',
              r['label'] == 'sorted by: 33.6k modem' and r['dial'] == r['imgs'] > 0 and 0 < r['going'] < r['dial'] and 'sec on 33.6k' in (r['fact'] or ''), str(r))
        await page.goto(base + '/short/filter/illustration/?hc-sort=tiny'); await page.wait_for_timeout(1500)
        r = await page.evaluate("""() => ({ label: document.querySelector('.hc-sort-label').textContent, px: document.querySelectorAll('canvas.hc-px').length,
          imgs: document.querySelectorAll('.thumb_image img').length, hidden: [...document.querySelectorAll('img[data-hc-px]')].length,
          fact: (document.querySelector('.hc-sort-fact') || {}).textContent })""")
        check('tiny JPG, 1997: every picture pixelated, "…_SMALL.jpg · N KB" on hover', r['label'] == 'sorted by: tiny JPG, 1997'
              and r['px'] == r['imgs'] == r['hidden'] > 0 and '_SMALL.jpg · ' in (r['fact'] or ''), str(r))
        await page.evaluate("Math.random = () => 0.99")   # not the 1-in-6 GeoCities pick here
        await page.click('#hc-sort button'); await page.wait_for_timeout(900)
        px = await page.evaluate("[document.querySelector('.hc-sort-label').textContent, document.querySelectorAll('canvas.hc-px').length]")
        check('tiny JPG: the pixels go when the overlords pick something else', px[0] == 'sorted by: tiny JPG, 1997' or px[1] == 0, str(px))
        await page.goto(base + '/short/filter/artdirection/'); await page.wait_for_timeout(1200)
        st = await page.evaluate("[document.documentElement.className, !!document.querySelector('.hc-award'), getComputedStyle(document.querySelector('.hc-back')).display]")
        check('1999 mode is off by default; the award sits under the grid', 'hc-gc' not in st[0] and 'hc-ns' not in st[0] and st[1] and st[2] == 'none', str(st))
        await page.click('.hc-award-pick button >> text=Netscape'); await page.wait_for_timeout(500)
        st = await page.evaluate("[document.documentElement.classList.contains('hc-ns'), getComputedStyle(document.querySelector('.hc-ns-bar')).display, getComputedStyle(document.body).backgroundColor, getComputedStyle(document.querySelector('.hc-back')).display]")
        check('award: Netscape turns the site grey with a status bar and a way back', st == [True, 'flex', 'rgb(192, 192, 192)', 'block'], str(st))
        await page.click('.hc-award-pick button >> text=GeoCities'); await page.wait_for_timeout(500)
        await page.goto(base + '/short/info-contact/'); await page.wait_for_timeout(1200)
        st = await page.evaluate("[document.documentElement.classList.contains('hc-gc'), getComputedStyle(document.querySelector('.hc-gc-top')).display]")
        check('GeoCities stays on from page to page for the visit', st == [True, 'block'], str(st))
        await page.click('.hc-back'); await page.wait_for_timeout(300)
        await page.goto(base + '/short/info-contact/?again=1'); await page.wait_for_timeout(1000)
        st = await page.evaluate("document.documentElement.className")
        check('"back to 2026" turns it off for good', 'hc-gc' not in st and 'hc-ns' not in st, st)
        await page.goto(base + '/short/filter/artdirection/?r=2'); await page.wait_for_timeout(1200)
        await page.evaluate("Math.random = () => 0.01"); await page.click('#hc-sort button'); await page.wait_for_timeout(600)
        st = await page.evaluate("[document.querySelector('.hc-sort-label').textContent, document.documentElement.classList.contains('hc-gc')]")
        check('the overlords can choose GeoCities, 1999, which switches the site over', st == ['sorted by: GeoCities, 1999', True], str(st))
        check('no script errors (90s sorts and 1999 mode)', not errs, '; '.join(errs)[:300])
        await page.close()

        # ---- strata: the layered background behind the front page grid ----
        page = await b.new_page(viewport={'width': 1300, 'height': 760}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        LAYER = """(() => { const s = document.querySelector('.hc-strata'); if (!s) return null; const c = getComputedStyle(s);
          return [c.display, s.getAttribute('aria-hidden'), c.pointerEvents, c.zIndex, s.querySelectorAll('.hc-strata-band').length]; })()"""
        TY = "(() => { const m = getComputedStyle(document.querySelector('.hc-strata-col')).transform; return m === 'none' ? 0 : Math.round(+m.split(',')[5].slice(0, -1)); })()"
        await page.goto(base + '/?strata=1'); await page.wait_for_timeout(1500)
        st = await page.evaluate(LAYER)
        check('strata: layers behind the front page grid, aria-hidden, no pointer events, below the blobs', st == ['block', 'true', 'none', '-2', 4], str(st))
        await page.evaluate('scrollTo(0, 400)'); await page.wait_for_timeout(300)
        moving = [await page.evaluate(TY), await page.evaluate('__hcStrata.info().r')]
        await page.click('button.hc-pause'); await page.wait_for_timeout(300)
        still = [await page.evaluate(TY), await page.evaluate('__hcStrata.info().r'), await page.evaluate("document.documentElement.classList.contains('hc-blobs-paused')")]
        check('strata: moves slower than the page; "pause blobs" makes it still without a jump', moving[1] == 0.8 and moving[0] < 0 and still == [moving[0], 1, True], f'{moving} -> {still}')
        await page.evaluate("__hcRetro.set('ns')"); await page.wait_for_timeout(300)
        ns = await page.evaluate(LAYER)
        await page.evaluate("__hcRetro.set('off')"); await page.wait_for_timeout(300)
        off = await page.evaluate(LAYER)
        check('strata: gone in 1999 mode, back when it goes off', ns is not None and ns[0] == 'none' and off is not None and off[0] == 'block', f'{ns} / {off}')
        await page.goto(base + '/short/info-contact/'); await page.wait_for_timeout(1200)
        other = await page.evaluate(LAYER)
        await page.goto(base + '/short/filter/artdirection/'); await page.wait_for_timeout(1200)
        tag = await page.evaluate(LAYER)
        check('strata: not on another page, nor on a tag page', other is None and tag is None, f'{other} / {tag}')
        check('no script errors (strata)', not errs, '; '.join(errs)[:300])
        await page.close()

        # ---- music: everything on one page, mixes play in place ----
        page = await b.new_page(viewport={'width': 1300, 'height': 900}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/music-mixes/'); await page.wait_for_timeout(1500)
        r = await page.evaluate("""() => ({ h: [...document.querySelectorAll('#hc-mu h2')].map(h => h.textContent),
          mixes: [...document.querySelectorAll('#hc-mu .hc-mu-mix')].map(m => m.querySelector('h3').textContent + ' ' + m.querySelectorAll('li').length),
          stores: [...document.querySelectorAll('#hc-mu .hc-mu-stores a')].map(a => a.textContent),
          fallback: [...document.querySelectorAll('[data-hc-mu-fallback]')].every(e => getComputedStyle(e).display === 'none'),
          grid: [...document.querySelectorAll('.thumbnails')].every(e => getComputedStyle(e).display === 'none'),
          title: document.title, desc: (document.querySelector('meta[name="description"]') || {}).content,
          left: getComputedStyle(document.querySelector('#hc-mu p')).textAlign,
          loose: [...document.querySelector('.project_content').childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).length })""")
        check('music: Wanton Boys Club, remixes and four mixes on one page, left-aligned, grid and fallback hidden',
              r['h'] == ['Wanton Boys Club', 'Remixes as Halli Civelek', 'Mixes'] and r['mixes'] == ['Italo! 24', 'Italo Rider 20', 'Hotplay (from Europe) – Minimix #1 8', 'Electronic Oddities 1969–1986 22']
              and len(r['stores']) == 6 and 'Google Play' not in r['stores'] and r['fallback'] and r['grid'] and r['left'] == 'left' and r['loose'] == 0, str(r))
        check('music: page title and description for search engines', r['title'] == 'Music & mixes – Halli Civelek' and 'Italo disco mixes' in (r['desc'] or ''), r['title'])
        await page.click('#hc-mu .hc-mu-play >> nth=1'); await page.wait_for_timeout(300)
        f = await page.evaluate("[(document.querySelector('#hc-mu-player-1 iframe') || {}).src || '', document.querySelectorAll('#hc-mu iframe').length, document.querySelectorAll('#hc-mu .hc-mu-play')[1].getAttribute('aria-expanded')]")
        await page.click('#hc-mu .hc-mu-play >> nth=1'); await page.wait_for_timeout(200)
        n = await page.evaluate("document.querySelectorAll('#hc-mu iframe').length")
        check('music: Play opens that mix in a Mixcloud player in place, and closes it again', 'italo-rider-2007' in f[0] and f[1] == 1 and f[2] == 'true' and n == 0, str(f))
        check('no script errors (music)', not errs, '; '.join(errs)[:300])
        await page.close()

        # ---- the Romantika fold: video + "see the magic" ----
        page = await b.new_page(viewport={'width': 1300, 'height': 900}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/short/romantika/'); await page.wait_for_timeout(1500)
        r = await page.evaluate("""() => { const v = document.querySelector('.hc-fold video'); return { video: !!v, controls: v && v.controls, muted: v && v.muted,
          still: getComputedStyle(document.querySelector('img[data-hc-fold]')).display, button: (document.querySelector('.hc-fold button') || {}).textContent }; }""")
        check('fold: the still drawing becomes a silent video without controls and a "see the magic" button', r == {'video': True, 'controls': False, 'muted': True, 'still': 'none', 'button': 'see the magic'}, str(r))
        await page.click('.hc-fold button'); await page.wait_for_timeout(2200)
        r = await page.evaluate("[document.querySelector('.hc-fold video').paused, Math.round(document.querySelector('.hc-fold video').currentTime * 100) / 100, document.querySelector('.hc-fold button').textContent]")
        check('fold: one click folds it shut and stops there', r[0] and abs(r[1] - 1.44) < 0.1 and r[2] == 'and back again', str(r))
        await page.click('.hc-fold button'); await page.wait_for_timeout(2200)
        r = await page.evaluate("[document.querySelector('.hc-fold video').ended, document.querySelector('.hc-fold button').textContent]")
        await page.click('.hc-fold button'); await page.wait_for_timeout(500)
        again = await page.evaluate("[document.querySelector('.hc-fold video').paused, document.querySelector('.hc-fold video').currentTime]")
        check('fold: the next click opens it again, and a third starts over', r == [True, 'see the magic'] and not again[0] and again[1] < 1, f'{r} then {again}')
        check('no script errors (fold)', not errs, '; '.join(errs)[:300])
        await page.close()

        # ---- project pages ----
        page = await b.new_page(viewport={'width': 1300, 'height': 900}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.add_init_script("""window.__flash = 0; new MutationObserver(() => { const c = document.querySelector('.project_content');
          if (c && document.body && getComputedStyle(c).opacity !== '0' && !document.getElementById('hc-pj') && c.querySelector('img')) window.__flash++; })
          .observe(document, { childList: true, subtree: true, attributes: true });""")
        await page.goto(base + '/short/Cheerios/'); await page.wait_for_timeout(1800)
        fl = await page.evaluate("[window.__flash, document.documentElement.classList.contains('hc-pj-ready'), getComputedStyle(document.querySelector('.project_content')).opacity]")
        check('project page: the content stays hidden until it is laid out, then shows (no jump)', fl == [0, True, '1'], str(fl))
        r = await page.evaluate("""() => { const pj = document.getElementById('hc-pj'); if (!pj) return null; const kids = [...pj.children];
          return { title: pj.querySelector('h1').textContent, back: pj.querySelector('.hc-pj-back').getAttribute('href'),
            ledeBeforeImg: kids.findIndex(e => e.classList.contains('hc-pj-lede')) < kids.findIndex(e => e.querySelector && e.querySelector('img')),
            lede: pj.querySelector('.hc-pj-lede').textContent, story: [...pj.querySelectorAll('.hc-pj-text p')].map(p => p.textContent),
            label: (pj.querySelector('.hc-pj-label') || {}).textContent, pairs: pj.querySelectorAll('.hc-pj-pair .hc-pj-fig').length,
            tags: [...pj.querySelectorAll('.hc-pj-tags a')].map(a => a.textContent), pn: [...pj.querySelectorAll('.hc-pj-pn b')].map(b => b.textContent),
            stacked: pj.querySelector('.hc-pj-tags').getBoundingClientRect().top > pj.querySelector('.hc-pj-fig img').getBoundingClientRect().bottom,
            footer: getComputedStyle(document.querySelector('.project_footer')).display, left: getComputedStyle(pj.querySelector('.hc-pj-text p')).textAlign }; }""")
        check('project page: back link, title, opening line above the pictures, joined paragraphs, label, pair, tags, previous/next',
              bool(r) and r['title'] == 'Cheerios' and r['back'] == '/' and r['ledeBeforeImg'] and r['lede'] == 'Visual identity and design for Cheerios'
              and r['story'] == ['Some story line one line two', 'Credits here'] and r['label'] == 'Close up' and r['pairs'] == 2
              and r['tags'] == ['art direction'] and r['pn'] == ['FM-Belfast-how-to-make-friends', 'Icelandsmites'] and r['footer'] == 'none' and r['left'] == 'left' and r['stacked'], str(r))
        # Halli's own marks (the Þroskahjálp calendar, pasted as almanak-cargo-PASTE-THIS.txt)
        await page.goto(base + '/short/Icelandsmites/'); await page.wait_for_timeout(1800)
        r = await page.evaluate("""() => { const pj = document.getElementById('hc-pj'); if (!pj) return null;
          return { lede: pj.querySelector('.hc-pj-lede').textContent.slice(0, 20),
            labels: [...pj.querySelectorAll('.hc-pj-fig > .hc-pj-label')].map(l => l.textContent.slice(0, 12)),
            nums: [...pj.querySelectorAll('.hc-pj-text > .hc-num')].map(n => (n.dataset.n || '-') + ' ' + n.textContent.slice(0, 10)),
            circle: getComputedStyle(pj.querySelector('.hc-num[data-n]'), '::before').content,
            bigs: pj.querySelectorAll('.hc-pj-text > .hc-big').length, bigSize: getComputedStyle(pj.querySelector('.hc-big')).fontSize,
            figCaps: pj.querySelectorAll('.hc-pj-fig > .hc-cap').length, rowCap: !!pj.querySelector('.hc-pj-block > .hc-row + .hc-cap'),
            rowCols: getComputedStyle(pj.querySelector('.hc-row')).gridTemplateColumns.split(' ').length,
            pair: pj.querySelectorAll('.hc-pj-pair .hc-pj-fig > .hc-cap').length, loose: pj.querySelectorAll(':scope > .hc-pj-block > .hc-cap:only-child, :scope > .hc-pj-block > .hc-label').length,
            texts: pj.querySelectorAll('.hc-pj-text p').length }; }""")
        check("project page: Halli's marks (labels, captions, numbered headings, big lines, a row of covers, a captioned pair)",
              bool(r) and r['lede'].startswith('Redesign') and len(r['labels']) == 3 and r['nums'][:2] == ['1 The design', '2 The editor'] and len(r['nums']) == 4
              and r['circle'] == '"1"' and r['bigs'] == 3 and r['bigSize'] == '30px' and r['figCaps'] == 4 and r['rowCap'] and r['rowCols'] == 5
              and r['pair'] == 2 and r['loose'] == 0, str(r))
        v = await page.evaluate("(() => { const v = document.querySelector('#hc-pj .hc-pj-fig video'); return v && [v.muted, v.loop, v.closest('figure').querySelector('.hc-pj-label').textContent, v.closest('figure').style.maxWidth]; })()")
        check('project page: a video mark becomes a silent looping video with its label', v == [True, True, 'Logo', '700px'], str(v))
        # every paste file Halli will put into Cargo lays out cleanly: opening line first, every mark used up
        bad = []
        for i, f in enumerate(PASTE):
            await page.goto(base + f'/paste/{i}/Cheerios/'); await page.wait_for_timeout(900)
            r = await page.evaluate("""() => { const pj = document.getElementById('hc-pj'); if (!pj) return 'not built';
              const kids = [...pj.children], lede = kids.findIndex(e => e.classList.contains('hc-pj-lede'));
              const pic = kids.findIndex(e => e.querySelector && e.querySelector('img, video'));
              const loose = pj.querySelectorAll('.hc-pj-block > .hc-label, .hc-pj-block > .hc-big, .hc-pj-block > .hc-num, .hc-pj-block > .hc-cap').length;
              const raw = /<\\/?(div|img)/.test(pj.innerText);
              return lede < 0 ? 'no opening line' : lede > pic && pic >= 0 ? 'opening line below a picture' : loose ? loose + ' marks left loose' : raw ? 'raw html showing' : 'ok'; }""")
            if r != 'ok': bad.append(f.name + ': ' + r)
        check(f'paste files: all {len(PASTE)} lay out cleanly (opening line first, marks used up)', not bad, '; '.join(bad))
        await page.goto(base + '/short/info-contact/'); await page.wait_for_timeout(1000)
        check('project page: ordinary pages are left alone', await page.evaluate("!document.getElementById('hc-pj')"))
        check('no script errors (project pages)', not errs, '; '.join(errs)[:300])
        await page.close()

        # ---- project weather (hc-weather-free): clouds in a fixed background canvas, on project pages only ----
        ctx = await b.new_context(viewport={'width': 1300, 'height': 900}, reduced_motion='reduce')
        page = await ctx.new_page(); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        SKY = """() => { const c = document.querySelectorAll('canvas.hc-weather-free'), s = c[0], cs = s && getComputedStyle(s), w = window.__hcWeather || {};
          return { n: c.length, strips: document.querySelectorAll('canvas.hc-weather').length, hidden: !!s && s.getAttribute('aria-hidden') === 'true',
            pos: cs ? cs.position : null, pe: cs ? cs.pointerEvents : null, z: cs ? cs.zIndex : null, w: s ? s.width : 0, text: s ? s.textContent : '',
            kind: w.kind, source: w.source, layout: w.layout, contrast: w.contrast, shapes: w.shapes, alphas: w.alphas, colours: w.colours, pic: s ? s.toDataURL() : '' }; }"""
        await page.goto(base + '/short/Cheerios/?w=1'); await page.wait_for_timeout(1800)
        one = await page.evaluate(SKY)
        check('weather: a project page has one fixed sky canvas behind the blobs (aria-hidden, no pointer events, no text) and no old strip',
              one['n'] == 1 and one['strips'] == 0 and one['hidden'] and one['pos'] == 'fixed' and one['pe'] == 'none' and one['z'] == '-1' and one['w'] > 0 and not one['text'],
              str({k: v for k, v in one.items() if k != 'pic'}))
        check('weather: kind comes from the colour table (Cheerios is loud: rain), clouds fade behind text so plum text keeps 5:1 (colour kept), each cloud has its own template (no template+mirror twice) and opacity',
              one['kind'] == 'rain' and one['source'] == 'table' and one['contrast']['worst'] >= 5 and one['contrast']['fade'] <= 0.9 and len(set(one['shapes'])) == len(one['shapes']) > 3 and len(set(x.split('-')[0] for x in one['shapes'])) == len(one['shapes']) and min(one['alphas']) >= 0.45 and max(one['alphas']) <= 0.95 and max(one['alphas']) - min(one['alphas']) > 0.15 and len(set(one['colours'])) == len(one['colours']), f"{one['kind']} {one['source']} {one['contrast']} {one['shapes']} {one['alphas']}")
        await page.wait_for_timeout(900); later = await page.evaluate(SKY)
        check('weather: a still picture with reduced motion', later['pic'] == one['pic'])
        await page.goto(base + '/short/Cheerios/?w=2'); await page.wait_for_timeout(1800)
        two = await page.evaluate(SKY)
        check('weather: the same project gives the same sky twice', two['n'] == 1 and two['kind'] == one['kind'] and two['layout'] == one['layout'] and bool(one['layout']), f"{one['layout']} / {two['layout']}")
        await page.goto(base + '/short/info-contact/?w=3'); await page.wait_for_timeout(1200)
        check('weather: a page that is not a project has no sky', await page.evaluate("document.querySelectorAll('canvas.hc-weather-free, canvas.hc-weather').length") == 0)
        check('no script errors (weather, reduced motion)', not errs, '; '.join(errs)[:300])
        await ctx.close()
        ctx = await b.new_context(viewport={'width': 1300, 'height': 900})
        page = await ctx.new_page(); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/short/Cheerios/?w=4'); await page.wait_for_timeout(1500)
        a1 = await page.evaluate(SKY); await page.wait_for_timeout(400); a2 = await page.evaluate(SKY)
        dodge = 0
        for _ in range(20):   # the blobs drift in and out of the rain; wait until one has stepped aside
            dodge = await page.evaluate('window.hcBlobs.dodged()')
            if dodge > 5: break
            await page.wait_for_timeout(500)
        shafts = await page.evaluate('window.__hcWeather.shafts')
        check('weather: clouds drift and rain falls (moving picture), the blobs step aside from the falling rain',
              a1['pic'] != a2['pic'] and shafts > 0 and dodge > 5, f'{shafts} rain columns, furthest sidestep {dodge}px')
        await page.click('button.hc-pause'); await page.wait_for_timeout(300)
        p1 = await page.evaluate(SKY); await page.wait_for_timeout(600); p2 = await page.evaluate(SKY)
        await page.click('button.hc-pause'); await page.wait_for_timeout(500); p3 = await page.evaluate(SKY)
        check('weather: "pause blobs" freezes the sky, and it moves again after', p1['pic'] == p2['pic'] and p3['pic'] != p2['pic'])
        await page.evaluate("window.__hcRetro.set('ns')"); await page.wait_for_timeout(300)
        off = await page.evaluate("document.querySelectorAll('canvas.hc-weather-free').length")
        await page.evaluate("window.__hcRetro.set('off')"); await page.wait_for_timeout(300)
        back = await page.evaluate("document.querySelectorAll('canvas.hc-weather-free').length")
        check('weather: off in 1999 mode, back after', off == 0 and back == 1, f'{off} / {back}')
        check('no script errors (weather)', not errs, '; '.join(errs)[:300])
        await ctx.close()

        # ---- the blob umbrella and the wet cursor (hc-weather-free asks hc-blobs for shelter) ----
        async def wet_spot(page, tries=60):   # a point in falling rain, not behind a picture (the weather can't be seen there)
            for n in range(tries):
                if n and n % 8 == 0: await page.evaluate(f'window.scrollTo(0, {(n // 8 % 4) * 230})')
                s = await page.evaluate('window.__hcWeather.wetSpot && window.__hcWeather.wetSpot()')
                if s: return s
                await page.wait_for_timeout(300)
            return None
        async def umbrella_over(page, s, secs=7):   # positions of the umbrella blob while it comes; True once it hovers just above s
            path = []
            for _ in range(int(secs * 10)):
                u = await page.evaluate('window.hcBlobs.umbrella()'); path.append(u)
                if u and abs(u[0] - s['x']) < 14 and -6 < s['y'] - (u[1] + u[2] / 2) < 40: return True, path
                await page.wait_for_timeout(100)
            return False, path
        ctx = await b.new_context(viewport={'width': 1300, 'height': 900})
        page = await ctx.new_page(); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.on('console', lambda m: m.type == 'error' and errs.append('console: ' + m.text))
        await page.goto(base + '/short/Cheerios/?u=1'); await page.wait_for_timeout(1500)
        s = await wet_spot(page)
        # a wet cursor: moving about in the rain (never resting) for over a second
        wet = 0
        if s:
            x = s['x']
            for i in range(16):
                x += 7 if i % 2 else -7
                await page.mouse.move(x, s['y']); await page.wait_for_timeout(90)
            wet = await page.evaluate('window.__hcWeather.wetCursor()')
            for i in range(12):   # big moves shake the drops off, one at a time
                await page.mouse.move(s['x'] + (60 if i % 2 else -60), s['y']); await page.wait_for_timeout(60)
            await page.wait_for_timeout(300)
        dry = await page.evaluate('window.__hcWeather.wetCursor()')
        check('umbrella: a wet cursor in the rain (drops cling, then fall off as it moves)', bool(s) and wet >= 1 and dry == 0, f'spot {s}, {wet} drops, then {dry}')
        await page.mouse.move(5, 890); await page.wait_for_timeout(2000)
        s = await wet_spot(page)
        ok, path = False, []
        if s:
            await page.mouse.move(s['x'], s['y'], steps=4)
            ok, path = await umbrella_over(page, s)
        got = [u for u in path if u]
        jumps = max([abs(a[0] - c[0]) + abs(a[1] - c[1]) for a, c in zip(got, got[1:])] or [0])
        await page.wait_for_timeout(600)
        splashes = await page.evaluate('window.__hcWeather.splashes')
        check('umbrella: a blob comes to hover just above a cursor resting in the rain, gliding (no jumps), and the rain splashes off it',
              ok and got and got[-1][3] != 'made' and jumps < 90 and splashes > 0, f"spot {s}, umbrella {[round(v) if isinstance(v, float) else v for v in (got[-1] if got else [])]}, biggest step in 0.1 s {round(jumps)}px, {splashes} splashes")
        # a link right where the umbrella is still works (the canvas and blobs take no clicks, nothing is prevented)
        link = await page.evaluate("""([x, y]) => { const a = document.createElement('a'); a.href = '#umbrella-ok'; a.textContent = 'link';
            a.style.cssText = 'position:fixed;left:' + (x - 20) + 'px;top:' + (y - 10) + 'px;width:40px;height:20px;z-index:5;display:block';
            document.body.appendChild(a); window.__clicked = null; addEventListener('click', e => { window.__clicked = e.defaultPrevented; });
            return document.elementFromPoint(x, y) === a; }""", [s['x'], s['y']]) if s else False
        if s: await page.mouse.click(s['x'], s['y']); await page.wait_for_timeout(200)
        r = await page.evaluate("[location.hash, window.__clicked, !!window.hcBlobs.umbrella()]")
        check('umbrella: a link under the umbrella is on top and clicks through to its address', link and r[0] == '#umbrella-ok' and r[1] is False and r[2], str([link] + r))
        far = await page.evaluate("""([x, y]) => { for (let ty = 120; ty < innerHeight - 40; ty += 30) for (let tx = 30; tx < innerWidth - 30; tx += 30)
            if (Math.hypot(tx - x, ty - y) > 300 && !window.__hcWeather.isWet(tx, ty)) return [tx, ty]; return null; }""", [s['x'], s['y']]) if s else None
        gone = None
        if far:
            await page.mouse.move(far[0], far[1], steps=3)
            for _ in range(30):
                await page.wait_for_timeout(100)
                gone = await page.evaluate("[window.hcBlobs.umbrella(), window.__hcWeather.umbrella]")
                if gone[0] is None: break
        check('umbrella: moving the cursor out of the weather lets the blob go', bool(far) and gone and gone[0] is None and gone[1] == 'none', f'{far} {gone}')
        # phone: a long press in the rain, released when the finger lifts
        await page.click('button.hc-pause'); await page.wait_for_timeout(200)
        await page.mouse.move(s['x'] if s else 600, s['y'] if s else 400); await page.wait_for_timeout(2000)
        r = await page.evaluate("[window.hcBlobs.umbrella(), window.__hcWeather.umbrella, window.__hcWeather.wetCursor()]")
        await page.click('button.hc-pause')
        check('umbrella: none while "pause blobs" is on', s and r[0] is None and r[1] == 'none' and r[2] == 0, str(r))
        check('no script errors (umbrella, desktop)', not errs, '; '.join(errs)[:300])
        await ctx.close()

        ctx = await b.new_context(viewport={'width': 402, 'height': 874}, is_mobile=True, has_touch=True)
        page = await ctx.new_page(); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.on('console', lambda m: m.type == 'error' and errs.append('console: ' + m.text))
        await page.goto(base + '/short/Cheerios/?u=2'); await page.wait_for_timeout(1500)
        cdp = await ctx.new_cdp_session(page)
        s = await wet_spot(page); ok = held = False; after = 'x'
        if s:
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': s['x'], 'y': s['y']}]})
            ok, path = await umbrella_over(page, s)
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []})
            await page.wait_for_timeout(300)
            after = await page.evaluate('window.hcBlobs.umbrella()')
        check('umbrella (phone): a long press in the rain brings a blob above the finger, lifting the finger lets it go', ok and after is None, f'spot {s}, then {after}')
        check('no script errors (umbrella, phone)', not errs, '; '.join(errs)[:300])
        await ctx.close()

        ctx = await b.new_context(viewport={'width': 1300, 'height': 900}, reduced_motion='reduce')
        page = await ctx.new_page(); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/short/Cheerios/?u=3'); await page.wait_for_timeout(1500)
        s = await page.evaluate("""() => { for (let ty = 150; ty < innerHeight - 60; ty += 20) for (let tx = 40; tx < innerWidth - 40; tx += 20)
            if (window.__hcWeather.isWet(tx, ty)) return { x: tx, y: ty }; return null; }""")
        if s:
            await page.mouse.move(s['x'], s['y']); await page.wait_for_timeout(500)
            await page.mouse.move(s['x'] + 1, s['y']); await page.wait_for_timeout(2500)
        r = await page.evaluate("[window.hcBlobs.umbrella(), window.__hcWeather.umbrella || 'none', window.__hcWeather.wetCursor()]")
        check('umbrella: none with reduced motion (no umbrella, no wet cursor)', s and r[0] is None and r[1] == 'none' and r[2] == 0, f'{s} {r}')
        check('no script errors (umbrella, reduced motion)', not errs, '; '.join(errs)[:300])
        await ctx.close()

        # ---- playthings: six cards over Cargo's fallback, the pond card in preview mode ----
        page = await b.new_page(viewport={'width': 1300, 'height': 900}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/short/playthings/'); await page.wait_for_timeout(2500)
        r = await page.evaluate("""async () => ({ cards: [...document.querySelectorAll('#hc-pt a.hc-pt-card h2')].map(h => h.firstChild.textContent),
          pencil: await new Promise(ok => { const im = document.querySelector('#hc-pt .hc-pt-win image'); if (!im) return ok(0); const i = new Image(); i.onload = () => ok(i.naturalWidth); i.onerror = () => ok(0); i.src = im.getAttribute('href'); }), intro: (document.querySelector('#hc-pt .hc-pt-intro') || {}).textContent,
          fallbackHidden: [...document.querySelectorAll('[data-hc-pt-fallback]')].every(e => getComputedStyle(e).display === 'none'),
          pondSrc: (document.querySelector('#hc-pt iframe[src*="blob-pond"]') || {}).getAttribute ? document.querySelector('#hc-pt iframe[src*="blob-pond"]').getAttribute('src') : null,
          outsideNewTab: [...document.querySelectorAll('#hc-pt a.hc-pt-card')].filter(a => /^https?:/.test(a.getAttribute('href'))).every(a => a.target === '_blank') })""")
        if SHOTS: await page.screenshot(path=os.path.join(SHOTS, 'playthings.png'))
        if SHOTS:
            ph = await b.new_page(viewport={'width': 390, 'height': 844}); await ph.goto(base + '/short/playthings/'); await ph.wait_for_timeout(2500)
            await ph.screenshot(path=os.path.join(SHOTS, 'playthings-phone.png')); await ph.close()
        hid = await page.evaluate("[...document.querySelectorAll('.thumbnails, #hc-sort')].every(e => getComputedStyle(e).display === 'none')")
        check("playthings: Cargo's project grid is hidden", hid)
        check('playthings: six cards in order, intro, Cargo fallback hidden, the pencil loaded', r['cards'] == ['Birth-a-blob', 'Music Kontrapunkt Kontrol', 'Paco Benovo 2.0', 'Shakeskin', 'The Calculater', 'The blob-pond'] and (r['pencil'] or 0) > 0
              and r['intro'] == "Things I've built and kept running (some since 2004)." and r['fallbackHidden'] and r['outsideNewTab'], str(r))
        pp = await page.evaluate("""() => { const a = [...document.querySelectorAll('#hc-pt a.hc-pt-card')].find(a => a.querySelector('h2').firstChild.textContent === 'Paco Benovo 2.0');
          return a ? { href: a.getAttribute('href'), blank: a.target, keys: a.querySelectorAll('.hc-pt-win svg g[clip-path]').length, media: a.querySelectorAll('audio, iframe, img').length } : null; }""")
        check('playthings: the palette piano card links to /paco-benovo on this site, a silent picture of six keys', bool(pp) and pp['href'] == '/paco-benovo' and pp['blank'] == '' and pp['keys'] == 6 and pp['media'] == 0, str(pp))
        await page.hover('#hc-pt a.hc-pt-card >> nth=4'); await page.wait_for_timeout(400)
        bg = await page.evaluate("getComputedStyle(document.querySelectorAll('#hc-pt a.hc-pt-card')[4]).backgroundColor")
        check("playthings: hover is 20% white, not Cargo's yellow", bg == 'rgba(255, 255, 255, 0.2)', bg)
        f = next((fr for fr in page.frames if 'hc-preview' in fr.url), None)
        r = await f.evaluate("""() => ({ pond: !!document.getElementById('hc-pond'), preview: document.documentElement.classList.contains('hc-pond-preview'),
          header: getComputedStyle(document.querySelector('.site_header')).display,
          wake: getComputedStyle(document.getElementById('hcp-wake')).display, tray: getComputedStyle(document.querySelector('#hc-pond .hcp-tray')).display,
          blobs: document.querySelectorAll('#hcp-pond > g, #hcp-pond g').length })""") if f else None
        check('pond preview: no header, wake screen or controls (so no sound)', bool(r) and r['pond'] and r['preview'] and r['header'] == 'none'
              and r['wake'] == 'none' and r['tray'] == 'none', str(r))
        await page.goto(base + '/short/blob-pond/?hc-preview'); await page.wait_for_timeout(1200)
        r = await page.evaluate("[document.documentElement.classList.contains('hc-pond-preview'), getComputedStyle(document.getElementById('hcp-wake')).display]")
        check('pond preview only inside another page: opened directly, the wake screen stays', r == [False, 'flex'] or (r[0] is False and r[1] != 'none'), str(r))
        check('no script errors (playthings)', not errs, '; '.join(errs)[:300])
        await page.close()

        # ---- birth a blob: draw a face, let it go, it joins the background blobs ----
        page = await b.new_page(viewport={'width': 1300, 'height': 900}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/short/birth-a-blob/'); await page.wait_for_timeout(1500)
        r = await page.evaluate("""() => ({ title: (document.querySelector('#hc-bab h1') || {}).textContent,
          back: (document.querySelector('#hc-bab a.hc-bab-back') || { getAttribute: () => null }).getAttribute('href'),
          colours: document.querySelectorAll('#hc-bab .hc-bab-colours input').length,
          pencil: (document.querySelector('#hc-bab .hc-bab-pencil img') || {}).naturalWidth,
          h1Color: document.querySelector('#hc-bab h1') && getComputedStyle(document.querySelector('#hc-bab h1')).color,
          fallbackHidden: [...document.querySelectorAll('[data-hc-bab-fallback]')].length === 1 && [...document.querySelectorAll('[data-hc-bab-fallback]')].every(e => getComputedStyle(e).display === 'none'),
          gridHidden: [...document.querySelectorAll('.thumbnails, #hc-sort')].every(e => getComputedStyle(e).display === 'none') })""")
        check('birth a blob: the maker is built (title, back to playthings, five colours, the pencil loaded, Cargo styles kept out)',
              r['title'] == 'Birth-a-blob' and r['back'] == '/playthings' and r['colours'] == 5 and (r['pencil'] or 0) > 0 and r['h1Color'] == 'rgb(73, 46, 70)', str(r))
        check("birth a blob: Cargo's content kept as a hidden fallback, the grid hidden", r['fallbackHidden'] and r['gridHidden'], str(r))
        pr = await page.evaluate("(() => { const r = document.getElementById('hc-bab-paper').getBoundingClientRect(); return [r.left, r.top, r.width]; })()")
        await page.mouse.move(pr[0] + pr[2] * 0.38, pr[1] + pr[2] * 0.42); await page.mouse.down()
        await page.mouse.move(pr[0] + pr[2] * 0.62, pr[1] + pr[2] * 0.58, steps=12); await page.mouse.up()
        r = await page.evaluate("[document.querySelector('#hc-bab .hc-bab-stage').classList.contains('hc-bab-holding'), [...document.querySelectorAll('#hc-bab-ink path')].map(p => (p.getAttribute('d').match(/Q/g) || []).length)]")
        check('birth a blob: drawing with the mouse picks up the pencil and adds one stroke', r[0] and len(r[1]) == 1 and r[1][0] >= 5, str(r))
        await page.evaluate("document.addEventListener('keydown', e => { if (e.key === 'Escape') window.__cargoEsc = (window.__cargoEsc || 0) + 1; })")   # stands in for Cargo's leave-on-Esc
        await page.keyboard.press('Escape'); await page.wait_for_timeout(150)
        await page.keyboard.press('Escape'); await page.wait_for_timeout(150)   # a second Esc, pencil already down, face still there
        r = await page.evaluate("[!document.querySelector('#hc-bab .hc-bab-stage').classList.contains('hc-bab-holding'), window.__cargoEsc || 0, location.pathname]")
        check('birth a blob: Esc puts the pencil down; Cargo never gets Esc while there is a face', r == [True, 0, '/short/birth-a-blob/'], str(r))
        n0 = await page.evaluate("document.querySelectorAll('.hc-blobs .hc-blob').length")
        await page.click('#hc-bab-go'); await page.wait_for_timeout(2500)
        r = await page.evaluate("""() => { const all = document.querySelectorAll('.hc-blobs .hc-blob'), b = all[all.length - 1];
          const g = b && b.querySelector('g[clip-path]');
          return { n: all.length, ink: g ? g.querySelectorAll('path').length : 0, clip: !!(b && b.querySelector('clipPath path').getAttribute('d')),
            gone: !document.getElementById('hc-bab-gone').hidden, focus: document.activeElement.id }; }""")
        check('birth a blob: Let it go adds one blob to the background with the face inside it', r['n'] == n0 + 1 and r['ink'] == 1 and r['clip'], f'{n0} -> {r}')
        check('birth a blob: then "Make another blob" is offered and focused', r['gone'] and r['focus'] == 'hc-bab-again', str(r))
        if SHOTS: await page.screenshot(path=os.path.join(SHOTS, 'desktop.png'))
        check('no script errors (birth a blob)', not errs, '; '.join(errs)[:300])
        await page.close()

        # ---- palette piano: every project as a strip of its own colours; the way back from a project page ----
        PIANO = """() => { const pp = document.getElementById('hc-pp'), q = document.getElementById('hc-pp-quiet'), pz = document.querySelector('button.hc-pause');
          const qr = q && q.getBoundingClientRect(), zr = pz && pz.getBoundingClientRect();
          return { title: pp && pp.querySelector('h1').getAttribute('aria-label'), kicker: pp && pp.querySelector('.hc-pp-kicker').textContent,
            pairs: pp && [...pp.querySelectorAll('h1 .hc-pp-pr')].map(e => [e.querySelector('.hc-pp-lt').textContent, e.querySelector('.hc-pp-lb').textContent]),
            hiddenVis: pp && pp.querySelector('h1 > span').getAttribute('aria-hidden'), srLine: pp && pp.querySelector('h1').nextElementSibling.textContent, oldAcro: pp && !!pp.querySelector('.hc-pp-acro'),
            yr: pp && pp.querySelector('h1 .hc-pp-yr').textContent, yrBrackets: pp && pp.querySelector('h1 .hc-pp-yr').querySelectorAll('.hc-pp-br').length,
            intro: pp && [...pp.querySelectorAll('.hc-pp-hr p.hc-pp-intro')].map(p => p.textContent),
            introWeights: pp && [...pp.querySelectorAll('.hc-pp-hr p.hc-pp-intro')].map(p => getComputedStyle(p).fontWeight),
            cols: pp && getComputedStyle(pp.querySelector('header.hc-pp-hd')).gridTemplateColumns.split(' ').length,
            stripTop: pp && Math.round(pp.querySelector('ul.hc-pp-keys').getBoundingClientRect().top - pp.parentNode.getBoundingClientRect().top),
            back: pp && pp.querySelector('a.hc-pp-back').getAttribute('href'), backText: pp && pp.querySelector('a.hc-pp-back').textContent, keys: document.querySelectorAll('#hc-pp li.hc-pp-k').length,
            bands: document.querySelectorAll('#hc-pp button.hc-pp-key span').length, h1Color: pp && getComputedStyle(pp.querySelector('h1')).color,
            keyBg: pp && getComputedStyle(pp.querySelector('button.hc-pp-key')).backgroundColor,
            fallbackHidden: document.querySelectorAll('[data-hc-pp-fallback]').length === 1 && getComputedStyle(document.querySelector('[data-hc-pp-fallback]')).display === 'none',
            gridHidden: [...document.querySelectorAll('.thumbnails, #hc-sort')].every(e => getComputedStyle(e).display === 'none'),
            tabStops: document.querySelectorAll('#hc-pp [tabindex="0"]').length, titlesHidden: getComputedStyle(document.querySelector('#hc-pp a.hc-pp-tag')).opacity,
            quiet: q && [q.textContent, getComputedStyle(q).position, getComputedStyle(q).display],
            apart: !!(qr && zr && qr.width && zr.width && (qr.right <= zr.left || qr.bottom <= zr.top || qr.top >= zr.bottom)),
            wide: document.documentElement.scrollWidth <= innerWidth }; }"""
        ON = """(slug) => { const k = [...document.querySelectorAll('#hc-pp li.hc-pp-k')].find(l => l.querySelector('a.hc-pp-tag').getAttribute('href') === '/' + slug);
          if (!k) return null; const r = k.getBoundingClientRect(), t = k.querySelector('a.hc-pp-tag');
          return { on: k.classList.contains('on'), opened: getComputedStyle(t).opacity, inView: r.top >= 0 && r.bottom <= innerHeight,
            others: document.querySelectorAll('#hc-pp li.hc-pp-k.on').length, sound: window.__hcPalettePiano.sound(), returned: window.__hcPalettePiano.returned(),
            saved: sessionStorage.getItem('hc-from-piano'), scrollY: Math.round(scrollY) }; }"""
        n_pal = len(PALETTES)
        ctx = await b.new_context(viewport={'width': 1300, 'height': 900})
        page = await ctx.new_page(); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/paco-benovo/'); await page.wait_for_timeout(1500)
        r = await page.evaluate(PIANO)
        check('palette piano: built on its page (title, the line, back to playthings, one strip per project, Cargo styles kept out)',
              r['title'] == 'Paco Benovo 2.0' and r['kicker'] == 'Civelektronique presents:' and r['pairs'] == [['Pa', 'Palette'], ['co', 'Colors'], ['Be', 'Beats'], ['no', 'Noises'], ['vo', 'Voices']]
              and r['hiddenVis'] == 'true' and r['srLine'] == 'Palette, Colors, Beats, Noises, Voices' and not r['oldAcro'] and r['yr'] == '2.0' and r['yrBrackets'] == 0
              and r['intro'] == ['Who needs crappy AI music when you can produce your very own crappy grooves RIGHT HERE.',
                                 'I took the colours from all my projects and made them into Paco Benovo: a keyboard with my voice as an expansion pack. This includes the beat maker where you can make your own beats with fills and tomtoms and trigger samples.',
                                 'Please click’n play & plonk away.'] and r['introWeights'][0] == '700' and r['introWeights'][1] == '400' and r['cols'] == 2
              and r['back'] == '/playthings' and r['backText'] == '← playthings' and r['keys'] == n_pal and r['bands'] >= n_pal * 3 and r['h1Color'] == 'rgb(73, 46, 70)' and r['keyBg'] == 'rgb(255, 255, 255)', str(r))
        BRK = """() => { const R = e => e.getBoundingClientRect(), out = [];
          for (const pr of document.querySelectorAll('#hc-pp h1 .hc-pp-pr')) {
            const l = R(pr.querySelector('.hc-pp-lt')), br = R(pr.querySelector('.hc-pp-br')), lb = R(pr.querySelector('.hc-pp-lb'));
            out.push({ dl: Math.abs(br.left - l.left), dr: Math.abs(br.right - l.right), dc: Math.abs((lb.left + lb.right) / 2 - (br.left + br.right) / 2),
              lb: [lb.left, lb.right, lb.top, lb.bottom], below: br.top >= l.top && lb.top >= br.bottom - 1, ink: getComputedStyle(pr.querySelector('.hc-pp-br')).borderBottomColor == getComputedStyle(pr.querySelector('.hc-pp-lt')).color }); }
          const h = document.querySelector('#hc-pp h1'), ks = document.querySelector('#hc-pp ul.hc-pp-keys');
          const lowest = Math.max(...out.map(o => o.lb[3]));
          return { out, clear: ks.getBoundingClientRect().top >= lowest, wide: Math.max(...out.map(o => o.lb[1])) <= innerWidth && Math.max(...[...document.querySelectorAll('#hc-pp h1 .hc-pp-yr, #hc-pp h1 .hc-pp-w')].map(e => R(e).right)) <= innerWidth,
            wraps: [...document.querySelectorAll('#hc-pp h1 .hc-pp-w, #hc-pp h1 .hc-pp-yr')].map(e => Math.round(R(e).top)) }; }"""
        for vw, vh in ((1440, 900), (390, 844)):
            await page.set_viewport_size({'width': vw, 'height': vh}); await page.wait_for_timeout(400)
            g = await page.evaluate(BRK); o = g['out']
            overlap = any(o[i]['lb'][1] > o[j]['lb'][0] and o[j]['lb'][1] > o[i]['lb'][0] and o[i]['lb'][3] > o[j]['lb'][2] and o[j]['lb'][3] > o[i]['lb'][2] for i in range(5) for j in range(i + 1, 5))
            check(f'palette piano heading at {vw}: brackets match their letter pairs within 1px, labels centred on them, no label overlap, content clear below, heading inside the screen',
                  len(o) == 5 and all(x['dl'] <= 1 and x['dr'] <= 1 and x['dc'] <= 1 and x['below'] and x['ink'] for x in o) and not overlap and g['clear'] and g['wide'], str(g))
        await page.set_viewport_size({'width': 1300, 'height': 900})
        check("palette piano: Cargo's content kept as a hidden fallback, the grid hidden, one Tab stop (strip + its title), titles hidden until asked",
              r['fallbackHidden'] and r['gridHidden'] and r['tabStops'] == 2 and r['titlesHidden'] == '0', str(r))
        check('palette piano: the sound switch is fixed, shown, and clear of the blobs\' pause button', r['quiet'] == ['Turn the sound off', 'fixed', 'flex'] and r['apart'], str(r))
        tags = await page.evaluate("[...document.querySelectorAll('#hc-pp a.hc-pp-tag')].map(a => [a.getAttribute('href'), a.querySelector('b').textContent])")
        check('palette piano: every title links to its project on this site, in Halli\'s order', tags == [['/' + x['url'], x['title']] for x in PALETTES], str(tags[:2]))
        before = await page.evaluate('window.__hcPalettePiano.sound()')
        await page.click('#hc-pp button.hc-pp-key >> nth=1')
        just = await page.evaluate('window.__hcPalettePiano.sound()'); await page.wait_for_timeout(900)
        after = await page.evaluate(ON, PALETTES[1]['url'])
        check('palette piano: pressing a strip starts the sound (audio running, notes waiting, then played) and opens its title',
              not before['ctx'] and just['ctx'] and just['waiting'] > 0 and after['sound']['state'] == 'running' and after['sound']['lastNote'] > 0
              and after['on'] and after['opened'] == '1' and after['others'] == 1, f'{before} / {just} / {after}')
        await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight')
        kb = await page.evaluate("(() => { const ks = [...document.querySelectorAll('#hc-pp button.hc-pp-key')]; return [ks.indexOf(document.activeElement), document.querySelectorAll('#hc-pp [tabindex=\"0\"]').length]; })()")
        await page.keyboard.press('End')
        end = await page.evaluate("[...document.querySelectorAll('#hc-pp button.hc-pp-key')].indexOf(document.activeElement)")
        check('palette piano: the arrow keys and End move along the strips, still one Tab stop', kb == [3, 2] and end == n_pal - 1, f'{kb} {end}')
        await page.click('#hc-pp-quiet')
        q = await page.evaluate("[document.getElementById('hc-pp-quiet').getAttribute('aria-pressed'), document.getElementById('hc-pp-quiet').textContent, window.__hcPalettePiano.sound()]")
        check('palette piano: the sound switch turns the sound off', q[0] == 'true' and q[1] == 'Turn the sound on' and q[2]['muted'] and q[2]['waiting'] == 0, str(q))
        # the way back: follow a strip's title to the project page, then come back
        i = next(n for n, x in enumerate(PALETTES) if x['url'] == 'Cheerios')
        await page.goto(base + '/paco-benovo/?w=1'); await page.wait_for_timeout(1200)
        await page.click(f'#hc-pp button.hc-pp-key >> nth={i}'); await page.wait_for_timeout(200)
        await page.click(f'#hc-pp a.hc-pp-tag >> nth={i}'); await page.wait_for_url('**/Cheerios/'); await page.wait_for_timeout(1800)
        pj = await page.evaluate("(() => { const a = document.querySelector('#hc-pj a.hc-pj-back'); return a && [a.textContent, a.getAttribute('href'), document.querySelectorAll('#hc-pj a.hc-pj-back').length]; })()")
        check('project page from the piano: the back link becomes "← Paco Benovo", to /paco-benovo', pj == ['← Paco Benovo', '/paco-benovo', 1], str(pj))
        await page.click('#hc-pj a.hc-pj-back'); await page.wait_for_url('**/paco-benovo/'); await page.wait_for_timeout(1500)
        r = await page.evaluate(ON, 'Cheerios')
        check('back on the piano: the strip left from is in view with its title open, silently, and the way back is used up',
              bool(r) and r['on'] and r['opened'] == '1' and r['inView'] and r['others'] == 1 and not r['sound']['ctx'] and r['returned'] == 'Cheerios' and r['saved'] is None, str(r))
        await page.goto(base + '/short/Icelandsmites/?w=2'); await page.wait_for_timeout(1500)
        other = await page.evaluate("document.querySelector('#hc-pj a.hc-pj-back').textContent")
        await page.goto(base + '/paco-benovo/?w=3'); await page.wait_for_timeout(1200)
        await page.click(f'#hc-pp button.hc-pp-key >> nth={i}'); await page.wait_for_timeout(200)
        await page.click(f'#hc-pp a.hc-pp-tag >> nth={i}'); await page.wait_for_url('**/Cheerios/'); await page.wait_for_timeout(1500)
        await page.go_back(); await page.wait_for_timeout(1500)
        r = await page.evaluate(ON, 'Cheerios')
        check("back on the piano with the browser's back button: the strip in view, title open, the way back used up",
              bool(r) and r['on'] and r['opened'] == '1' and r['inView'] and r['saved'] is None, str(r))
        check('no script errors (palette piano)', not errs, '; '.join(errs)[:300])
        await ctx.close()
        ctx = await b.new_context(viewport={'width': 1300, 'height': 900})
        page = await ctx.new_page()
        await page.goto(base + '/Cheerios/?w=4'); await page.wait_for_timeout(1500)
        direct = await page.evaluate("document.querySelector('#hc-pj a.hc-pj-back').textContent")
        check("project page not from the piano (opened directly, or another project): \"← things I've made\" as before",
              direct == "← things I've made" and other == "← things I've made", f'{direct} / {other}')
        await ctx.close()
        # phone: a strip far down the piano, and reduced motion
        ctx = await b.new_context(viewport={'width': 390, 'height': 760}, device_scale_factor=2, is_mobile=True, has_touch=True, reduced_motion='reduce')
        page = await ctx.new_page(); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        deep = PALETTES[-3]['url']
        await page.goto(base + '/paco-benovo/'); await page.wait_for_timeout(1200)
        r = await page.evaluate(PIANO)
        await page.evaluate("s => sessionStorage.setItem('hc-from-piano', JSON.stringify({ slug: s, t: Date.now() }))", deep)
        await page.goto(base + '/paco-benovo/?w=5'); await page.wait_for_timeout(1500)
        on = await page.evaluate(ON, deep)
        check('phone: the piano fits the screen, the sound switch clear of the pause button, and coming back scrolls down to a strip far down',
              r['wide'] and r['apart'] and r['keys'] == n_pal and bool(on) and on['on'] and on['inView'] and on['scrollY'] > 500, f"{ {k: r[k] for k in ('wide', 'apart', 'keys')} } {on}")
        still = await page.evaluate("""() => { const b = document.querySelectorAll('#hc-pp button.hc-pp-key')[0]; b.click();
          return [b.classList.contains('down'), getComputedStyle(b).transform]; }""")
        check('reduced motion: a pressed strip does not move', still == [True, 'none'], str(still))
        check('no script errors (palette piano, phone)', not errs, '; '.join(errs)[:300])
        await ctx.close()

        # ---- the beat maker on the piano page, the owner's recordings, solos ----
        STARTS = """(() => { const log = window.__starts = [];   // every sound source started on the page's own audio clock
          for (const C of [OscillatorNode, AudioBufferSourceNode]) { const s = C.prototype.start;
            C.prototype.start = function (t, ...a) { if (this.context instanceof AudioContext) log.push(t || 0); return s.call(this, t, ...a); }; } })();"""
        SPY = """() => { window.__says = []; const V = window.PPVoices, say = V.say;
          V.say = function (n, w, g, o, l) { window.__says.push([n, l === undefined ? null : +l.toFixed(3)]); return say.apply(V, arguments); }; }"""
        PRESS = "i => { document.querySelectorAll('#hc-pp button.hc-pp-key')[i].click(); }"
        PLACE = """() => { const R = e => e && e.getBoundingClientRect(), q = R(document.getElementById('hc-pp-quiet')), bt = document.getElementById('hc-pp-pd-btn'), b = R(bt),
            z = R(document.querySelector('button.hc-pause')), k = R(document.querySelector('.hc-back')), bar = R(document.querySelector('.hc-ns-bar')),
            p = document.getElementById('hc-pp-pd-panel'), pr = R(p), shown = r => !!(r && r.width), hd = document.querySelector('#hc-pp header.hc-pp-hd'), bs = document.getElementById('hc-pp-beatslot');
          const apart = (a, c) => !shown(c) || a.right <= c.left || c.right <= a.left || a.bottom <= c.top || c.bottom <= a.top;
          return { pill: shown(b), inHeader: !!hd && !!bt && hd.contains(bt) && bt.parentNode === bs, apart: shown(q) && apart(q, z) && apart(q, k), onScreen: shown(b) && b.left >= 0 && b.right <= innerWidth,
            aboveBar: !shown(bar) || q.bottom <= bar.top + 0.5, fullWidth: shown(b) && shown(R(bs)) && Math.abs(b.width - R(bs).width) < 1,
            panel: shown(pr), panelAbove: !shown(pr) || pr.bottom <= q.top + 3, panelTop: pr && Math.round(pr.top), panelShare: pr && +(pr.height / innerHeight).toFixed(2),
            panelScrolls: !!p && p.scrollHeight > p.clientHeight + 2, stripTop: Math.round(R(document.querySelector('#hc-pp ul.hc-pp-keys')).top - R(document.querySelector('.project_content')).top),
            stripY: Math.round(R(document.querySelector('#hc-pp ul.hc-pp-keys')).top), wide: document.documentElement.scrollWidth <= innerWidth,
            rects: [q, z, k].map(r => r && [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)]) }; }"""
        ctx = await b.new_context(viewport={'width': 1440, 'height': 900})
        await ctx.add_init_script(STARTS)
        page = await ctx.new_page(); errs = []; asked = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.on('request', lambda q: asked.append(q.url) if '/assets/palette-piano/' in q.url else None)
        await page.goto(base + '/paco-benovo/'); await page.wait_for_timeout(1500)
        r = await page.evaluate("""() => { const b = document.getElementById('hc-pp-pd-btn'), p = document.getElementById('hc-pp-pd-panel'), s = b && getComputedStyle(b);
          return { pill: b && [b.textContent, s.position, s.display, s.textTransform, s.borderTopWidth, b.getAttribute('aria-expanded')], panelHidden: !!p && p.hidden && getComputedStyle(p).display === 'none',
            loaded: window.__hcPaletteDrums.loaded(), clock: window.PPClock.running }; }""")
        check('beat maker: "Make a beat" is on the piano page (in the header, Cargo\'s button style kept out), the panel closed, no recording fetched yet',
              r['pill'] == ['Make a beat', 'static', 'inline-flex', 'none', '0px', 'false'] and r['panelHidden'] and r['loaded'] == 0 and not asked and not r['clock'], f'{r} {asked[:2]}')
        pl = await page.evaluate(PLACE)
        check('beat maker (1440 wide): the pill is in the header (under the bold line), the sound switch stays bottom left clear of the pause button, the strips start high up',
              pl['pill'] and pl['inHeader'] and pl['apart'] and pl['onScreen'] and pl['wide'], str(pl))
        await page.set_viewport_size({'width': 1440, 'height': 760}); await page.wait_for_timeout(300)
        sp = await page.evaluate(PLACE)
        check(f'palette piano (1440x760): the strips start at y={sp["stripY"]} (content top + {sp["stripTop"]}), no lower than about 340', sp['stripTop'] <= 345, str(sp))
        await page.set_viewport_size({'width': 1440, 'height': 900}); await page.wait_for_timeout(300)
        pctx = await b.new_context(viewport={'width': 1440, 'height': 900}); po = await pctx.new_page()
        await po.goto(base + '/palette-piano/'); await po.wait_for_timeout(1500)
        r = await po.evaluate("[document.querySelector('#hc-pp h1') && document.querySelector('#hc-pp h1').getAttribute('aria-label'), document.querySelectorAll('#hc-pp li.hc-pp-k').length, !!document.querySelector('#hc-pp-beatslot #hc-pp-pd-btn')]")
        check('palette piano: the old address /palette-piano still builds the same page, pill in the header', r == ['Paco Benovo 2.0', n_pal, True], str(r))
        await pctx.close()
        # a solo: hold the mouse button and sweep sideways across six strips
        await page.evaluate("""() => { window.__lit = 0; new MutationObserver(ms => ms.forEach(m => { if (m.target.classList.contains('lit') && !(m.oldValue || '').includes('lit')) window.__lit++; }))
          .observe(document.getElementById('hc-pp'), { attributes: true, attributeFilter: ['class'], attributeOldValue: true, subtree: true }); }""")
        ks = await page.evaluate("[...document.querySelectorAll('#hc-pp button.hc-pp-key')].slice(0, 7).map(k => { const r = k.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height * 0.55]; })")
        await page.mouse.move(*ks[0]); await page.mouse.down()
        for x, y in ks[1:]: await page.mouse.move(x, y, steps=6)
        await page.mouse.up(); await page.wait_for_timeout(150)
        r = await page.evaluate("[window.__lit, document.querySelectorAll('#hc-pp li.hc-pp-k.on').length, window.__hcPalettePiano.sound()]")
        check('solo: sweeping across the strips with the button held lights their bands one by one, and starts no strip',
              r[0] >= 5 and r[1] == 0 and r[2]['ctx'] and r[2]['waiting'] == 0, str(r))
        await page.click('#hc-pp-pd-btn'); await page.wait_for_timeout(200)
        await page.wait_for_function('window.__hcPaletteDrums.loaded() === 20', timeout=8000)
        r = await page.evaluate("""() => { const p = document.getElementById('hc-pp-pd-panel'), go = p.querySelector('.hc-pp-pd-go'), st = p.querySelector('.hc-pp-pd-step'), sel = p.querySelector('select'), cs = e => getComputedStyle(e);
          return { open: !p.hidden, pill: document.getElementById('hc-pp-pd-btn').textContent, go: [cs(go).backgroundColor, cs(go).textTransform, cs(go).letterSpacing === '4px'],
            step: cs(st).borderTopWidth, select: [cs(sel).borderTopWidth, cs(sel).textTransform], pads: p.querySelectorAll('.hc-pp-pd-say[aria-disabled="false"]').length }; }""")
        check('beat maker: the pill opens the panel; Cargo\'s button and select styles stay out; the recordings arrive (20 pads ready)',
              r['open'] and r['pill'] == 'Hide the beat' and r['go'] == ['rgb(255, 255, 255)', 'none', False] and r['step'] == '0px' and r['select'] == ['0px', 'none'] and r['pads'] == 20
              and len(asked) == 20 and all(u.endswith('.mp3') and '/assets/palette-piano/' in u for u in asked), f'{r} {len(asked)}')
        pl = await page.evaluate(PLACE)
        check('beat maker (1440 wide): the panel sits above the buttons, under half the screen tall, nothing scrolling inside, below the header',
              pl['panel'] and pl['panelAbove'] and pl['panelShare'] <= 0.5 and not pl['panelScrolls'] and pl['panelTop'] >= 64, str(pl))
        before = await page.evaluate('window.PPDrums.pattern()[0][1]')
        await page.click('#hc-pp-pd-panel .hc-pp-pd-step >> nth=1')
        after = await page.evaluate("[window.PPDrums.pattern()[0][1], document.querySelectorAll('#hc-pp-pd-panel .hc-pp-pd-step')[1].getAttribute('aria-pressed')]")
        check('beat maker: clicking a step turns it on in the pattern', before == 0 and after == [1, 'true'], f'{before} -> {after}')
        await page.click('#hc-pp-pd-panel .hc-pp-pd-clear')
        await page.click('#hc-pp-pd-panel .hc-pp-pd-go'); await page.wait_for_timeout(400)
        r = await page.evaluate("[window.PPClock.running, document.querySelector('#hc-pp-pd-panel .hc-pp-pd-go').textContent, window.PPDrums._state().timer]")
        check('beat maker: Play starts the clock', r == [True, 'Stop', True], str(r))
        plans = await page.evaluate('window.PalettePiano.plans()')
        plain = next(n for n, x in enumerate(plans) if not x['chord'])
        grid = await page.evaluate("() => { window.__starts.length = 0; return [window.PPClock.sixteenth(), window.PPClock.nextGrid(), window.PalettePiano.audio().ctx.currentTime]; }")
        await page.evaluate(PRESS, plain); await page.wait_for_timeout(700)
        st = await page.evaluate('window.__starts.slice()')
        first = min(st) if st else None
        off = None if first is None else abs((first - grid[1]) / grid[0] - round((first - grid[1]) / grid[0]))
        check('beat maker: a strip pressed while the beat plays starts on its grid (a sixteenth)', first is not None and first >= grid[2] and off < 0.01, f'{len(st)} sources, first at {first}, {off} of a sixteenth off the grid')
        await page.click('#hc-pp-pd-panel .hc-pp-pd-go'); await page.wait_for_timeout(300)
        r = await page.evaluate("[window.PPClock.running, window.PPDrums._state().timer, document.querySelector('#hc-pp-pd-panel .hc-pp-pd-go').textContent]")
        check('beat maker: Stop ends the clock', r == [False, False, 'Play'], str(r))
        # ---- perc row (the fourth row, empty by default, its picker chooses the sound), shuffle
        r = await page.evaluate("""() => { const p = document.getElementById('hc-pp-pd-panel'), sel = p.querySelector('select'), pat = window.PPDrums.pattern();
          return { rows: pat.length, percEmpty: pat[3].every(x => x === 0), selects: p.querySelectorAll('select').length, opts: [...sel.options].map(o => o.value + '|' + o.textContent), val: sel.value,
            label: sel.getAttribute('aria-label'), names: [...p.querySelectorAll('.hc-pp-pd-row')].map(x => x.firstElementChild.textContent.replace(/rim shot.*$/, '').trim()),
            groups: [...p.querySelectorAll('.hc-pp-pd-steps')].map(x => x.getAttribute('aria-label')), voiceWords: /voice row|Recording for/.test(p.innerHTML) }; }""")
        check('perc row: four rows (kick, snare, hi-hat, perc), perc empty, one picker (rim shot, tom, cowbell, clave, clap; rim shot first), no voice row',
              r['rows'] == 4 and r['percEmpty'] and r['selects'] == 1 and r['val'] == 'rim' and r['label'] == 'Sound for the perc row'
              and r['opts'] == ['rim|rim shot', 'tom|tom', 'cowbell|cowbell', 'clave|clave', 'clap|clap'] and r['names'] == ['kick', 'snare', 'hi-hat', 'perc']
              and r['groups'] == ['kick steps', 'snare steps', 'hi-hat steps', 'perc steps'] and not r['voiceWords'], str(r))
        await page.click('#hc-pp-pd-panel .hc-pp-pd-row >> nth=3 >> .hc-pp-pd-step >> nth=4')
        r = await page.evaluate("""() => { const b = document.querySelectorAll('#hc-pp-pd-panel .hc-pp-pd-row')[3].querySelectorAll('.hc-pp-pd-step')[4];
          return [window.PPDrums.pattern()[3][4], b.getAttribute('aria-label'), b.getAttribute('aria-pressed')]; }""")
        check('perc row: a click turns a step on ("perc, step 5, on") and it is in pattern()', r == [1, 'perc, step 5, on', 'true'], str(r))
        await page.focus('#hc-pp-pd-panel .hc-pp-pd-row >> nth=2 >> .hc-pp-pd-step >> nth=9'); await page.keyboard.press('ArrowDown')
        r1 = await page.evaluate("document.activeElement.getAttribute('aria-label')")
        await page.keyboard.press('Space'); await page.keyboard.press('End')
        r2 = await page.evaluate("[window.PPDrums.pattern()[3][9], document.activeElement.getAttribute('aria-label')]")
        check('perc row: arrow down from hi-hat lands on perc in the same column, Space toggles, End moves along', r1 == 'perc, step 10, off' and r2 == [1, 'perc, step 16, off'], f'{r1} {r2}')
        sounds = {}
        for pick in ['rim', 'tom', 'cowbell', 'clave', 'clap']:
            await page.select_option('#hc-pp-pd-panel select', pick)
            sounds[pick] = await page.evaluate("[window.PPDrums.percRow(), window.PPDrums._stepEvents(4, true, null).filter(e => e.v === 0.9).map(e => e.name), window.PPDrums._stepEvents(5, true, null).length]")
        check("perc row: the picker changes the sound the row plays (the events on step 5 carry the picked sound, nothing on an empty step)",
              all(v == [k, [k], 0] for k, v in sounds.items()), str(sounds))
        await page.select_option('#hc-pp-pd-panel select', 'cowbell')
        await page.evaluate("() => { window.PPDrums.setBpm(150); window.__plog = []; window.PPDrums._log(window.__plog); window.PPDrums.play(); }"); await page.wait_for_timeout(1900)
        await page.evaluate("window.PPDrums.stop()")
        plog = await page.evaluate("() => { window.PPDrums._log(null); return window.__plog; }")
        names = {(e['name'], e['step']) for e in plog if e['fill'] is None}
        check('perc row: playing schedules the cowbell on its steps (5, 10) and no other sound for it', ('cowbell', 4) in names and ('cowbell', 9) in names and not any(n in ('rim', 'tom', 'clave') for n, _ in names), str(sorted(names)))
        r = await page.evaluate("""async () => { const sr = 44100, out = {};
          for (const n of ['rim', 'tom', 'cowbell', 'clave', 'clap', 'hat']) {
            const oc = new OfflineAudioContext(1, sr, sr), bus = window.PPDrums._bus(oc, oc.destination); window.PPDrums._voices[n](oc, bus, 0.02, 0.9);
            const d = (await oc.startRendering()).getChannelData(0); let pk = 0; for (const x of d) pk = Math.max(pk, Math.abs(x)); out[n] = +pk.toFixed(3); }
          return out; }""")
        check('perc row: every perc sound peaks in line with the hat and clap on the drum bus (0.08 to 0.4; a single hit)', all(0.08 <= r[k] <= 0.4 for k in ('rim', 'tom', 'cowbell', 'clave', 'clap')) and r['hat'] > 0.04, str(r))
        await page.click('#hc-pp-pd-panel .hc-pp-pd-clear')
        check('perc row: Clear empties it too', await page.evaluate("window.PPDrums.pattern().every(r => r.every(x => x === 0))"))

        # shuffle: a toggle near play and tempo, off by default, aria-pressed; the off sixteenths come late by 0.3 of a sixteenth
        r = await page.evaluate("""() => { const p = document.getElementById('hc-pp-pd-panel'), s = p.querySelector('.hc-pp-pd-shuf'), go = p.querySelector('.hc-pp-pd-go').getBoundingClientRect(), t = p.querySelector('#hc-pp-pd-tempo').getBoundingClientRect(), sb = s.getBoundingClientRect();
          return { text: s.textContent, label: s.getAttribute('aria-label'), pressed: s.getAttribute('aria-pressed'), api: window.PPDrums.shuffle(), swing: window.PPDrums._swing, near: Math.abs(sb.top - go.top) < 10 && sb.left >= go.right && sb.right <= t.left + 1 }; }""")
        check('shuffle: a button between play and speed, off by default (aria-pressed false), swing 0.3 of a sixteenth',
              r == {'text': 'Shuffle: off', 'label': 'Shuffle', 'pressed': 'false', 'api': False, 'swing': 0.3, 'near': True}, str(r))
        await page.evaluate("() => { for (let c = 0; c < 16; c++) window.PPDrums.set(2, c, true); window.PPDrums.setBpm(120); }")
        async def hats(shuffle, ms=2300):
            await page.evaluate("(on) => { window.PPDrums.shuffle(on); window.__slog = []; window.PPDrums._log(window.__slog); window.PPDrums.play(); }", shuffle); await page.wait_for_timeout(ms)
            await page.evaluate("() => { window.PPDrums.stop(); window.PPDrums._log(null); }")
            return await page.evaluate("window.__slog.filter(e => e.name === 'hat' && e.fill === null)")
        def lateness(log, s16):   # how late each odd step is against the straight grid laid from the first even step, in sixteenths
            t0 = log[0]['t'] - log[0]['n'] * s16
            return [round((e['t'] - (t0 + e['n'] * s16)) / s16, 4) for e in log]
        s16 = 60 / 120 / 4
        off_log = await hats(False)
        on_log = await hats(True)
        lo, ln = lateness(off_log, s16), lateness(on_log, s16)
        check('shuffle off: every sixteenth on the straight grid (%d hits)' % len(off_log), len(off_log) > 12 and all(abs(x) < 0.01 for x in lo), str(lo[:8]))
        check('shuffle on: steps 2, 4, 6 ... (every second sixteenth) are 0.3 of a sixteenth late, the others straight (%d hits)' % len(on_log),
              len(on_log) > 12 and all(abs(x - (0.3 if e['n'] % 2 == 1 else 0)) < 0.01 for x, e in zip(ln, on_log)) and all(e['step'] % 2 == 1 for e in on_log if abs(lateness([e], s16)[0]) > 5) is True, str(ln[:8]))
        # nextGrid() names the swung time the scheduler uses, shuffle on and off
        for sh in (True, False):
            await page.evaluate("(on) => { window.PPDrums.shuffle(on); window.__slog = []; window.PPDrums._log(window.__slog); window.PPDrums.play(); window.__gs = []; window.__gt = setInterval(() => window.__gs.push(window.PPClock.nextGrid()), 53); }", sh)
            await page.wait_for_timeout(2200)
            await page.evaluate("() => { clearInterval(window.__gt); window.PPDrums.stop(); window.PPDrums._log(null); }")
            r = await page.evaluate("""() => { const ts = window.__slog.map(e => e.t); const miss = window.__gs.filter(g => !ts.some(t => Math.abs(t - g) < 1e-6)).length; return [window.__gs.length, miss]; }""")
            check('shuffle %s: nextGrid() is always the time a step really sounds (%d samples)' % ('on' if sh else 'off', r[0]), r[0] > 20 and r[1] <= 1, str(r))
        r = await page.evaluate("[window.PPClock.sixteenth(), 60 / window.PPClock.bpm / 4]")
        check('shuffle on or off: sixteenth() stays the straight average', abs(r[0] - r[1]) < 1e-12 and abs(r[0] - 0.125) < 1e-9, str(r))
        # toggling while it plays: no step dropped or doubled
        await page.evaluate("() => { window.PPDrums.shuffle(false); window.__slog = []; window.PPDrums._log(window.__slog); window.PPDrums.play(); }")
        for i in range(8):
            await page.wait_for_timeout(260); await page.click('#hc-pp-pd-panel .hc-pp-pd-shuf')
        await page.wait_for_timeout(300)
        pressed = await page.get_attribute('#hc-pp-pd-panel .hc-pp-pd-shuf', 'aria-pressed')
        await page.evaluate("() => { window.PPDrums.stop(); window.PPDrums._log(null); }")
        ns = await page.evaluate("window.__slog.filter(e => e.name === 'hat').map(e => e.n)")
        ts = await page.evaluate("window.__slog.filter(e => e.name === 'hat').map(e => e.t)")
        check('shuffle: switching it on and off while the beat plays drops and doubles no step, and times keep rising (%d steps)' % len(ns),
              len(ns) > 14 and ns == list(range(ns[0], ns[0] + len(ns))) and all(b > a for a, b in zip(ts, ts[1:])) and pressed == 'false', f'{ns[:6]}.. {pressed}')
        await page.evaluate("() => { window.PPDrums.shuffle(false); for (let c = 0; c < 16; c++) window.PPDrums.set(2, c, false); }")
        await page.evaluate(SPY)
        two = next(n for n, x in enumerate(plans) if x['chord'] and x['chord']['kind'] == 'B')
        await page.evaluate(PRESS, two); await page.wait_for_timeout(3000)
        says2 = await page.evaluate('window.__says.slice()')
        one = next(n for n, x in enumerate(plans) if x['chord'] and x['chord']['kind'] == 'A')
        await page.evaluate('window.__says.length = 0'); await page.evaluate(PRESS, one); await page.wait_for_timeout(600)
        says1 = await page.evaluate('window.__says.slice()')
        check('recordings: a "HalliChord 2" strip plays 0.6 s of each of 2a-2d in its own order, a "HalliChord 1" strip plays chord-1',
              says2 == [[nm, 0.6] for nm in plans[two]['chord']['names']] and sorted(nm for nm, _ in says2) == ['chord-2a', 'chord-2b', 'chord-2c', 'chord-2d']
              and says1 == [['chord-1', None]], f'{says2} / {says1}')
        # leaving the page (Cargo changes pages without reloading) with the beat playing and the panel open, then coming back
        await page.click('#hc-pp-pd-panel .hc-pp-pd-go'); await page.wait_for_timeout(300)
        await page.evaluate("() => { history.pushState({}, '', '/Cheerios/'); document.querySelector('.project_content').innerHTML = '<p>a project</p>'; }")
        await page.wait_for_timeout(600)
        r = await page.evaluate("""() => [!!document.getElementById('hc-pp-pd-btn'), !!document.getElementById('hc-pp-pd-panel'), window.PPClock.running, window.PPDrums._state().timer,
          document.documentElement.classList.contains('hc-pp-on'), window.__hcPalettePiano.sound().waiting, window.__hcPalettePiano.sound().recordings]""")
        check('beat maker: leaving the piano page stops the beat, the strips and the recordings, and takes the pill and panel away', r == [False, False, False, False, False, 0, 0], str(r))
        await page.evaluate("() => { history.pushState({}, '', '/paco-benovo/?again'); document.querySelector('.project_content').innerHTML = '<p>palette piano</p>'; }")
        await page.wait_for_timeout(800)
        r = await page.evaluate("""() => { const b = document.getElementById('hc-pp-pd-btn'), p = document.getElementById('hc-pp-pd-panel');
          return [!!document.getElementById('hc-pp'), !!b && getComputedStyle(b).display, b && b.textContent, !!p && p.hidden, window.PPClock.running]; }""")
        check('beat maker: back on the piano page the pill is there again (panel closed, beat stopped)', r == [True, 'inline-flex', 'Make a beat', True, False], str(r))
        check('no script errors (beat maker)', not errs, '; '.join(errs)[:300])
        p2 = await ctx.new_page(); p2.on('pageerror', lambda e: errs.append(str(e))); asked.clear()
        p2.on('request', lambda q: asked.append(q.url) if '/assets/palette-piano/' in q.url else None)
        await p2.goto(base + '/short/info-contact/'); await p2.wait_for_timeout(1200)
        r = await p2.evaluate("[!!document.getElementById('hc-pp-pd-btn'), !!document.getElementById('hc-pp-pd-panel'), window.__hcPaletteDrums.loaded(), window.PPClock.running]")
        check('beat maker: nothing of it on another page (no pill, no panel, no recordings fetched)', r == [False, False, 0, False] and not asked and not errs, f'{r} {asked[:1]} {errs[:1]}')
        await ctx.close()
        # the recordings fail to load: the piano plays its synths instead, the pads stay greyed out
        ctx = await b.new_context(viewport={'width': 1440, 'height': 900})
        await ctx.add_init_script(STARTS)
        await ctx.route('**/assets/palette-piano/**', lambda route: route.abort())
        page = await ctx.new_page(); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/paco-benovo/'); await page.wait_for_timeout(1200)
        await page.click('#hc-pp-pd-btn'); await page.wait_for_timeout(1500)
        await page.evaluate(SPY); await page.evaluate('window.__starts.length = 0')
        await page.evaluate(PRESS, two); await page.wait_for_timeout(800)
        r = await page.evaluate("""() => [window.__hcPaletteDrums.loaded(), document.querySelectorAll('#hc-pp-pd-panel .hc-pp-pd-say[aria-disabled="true"]').length,
          window.__says.length, window.__starts.length, window.__hcPalettePiano.sound().lastNote > 0]""")
        check('recordings missing: the "HalliChord 2" strip plays its synth notes instead, the pads stay greyed out, no errors',
              r[0] == 0 and r[1] == 20 and r[2] == 0 and r[3] > 0 and r[4] and not errs, f'{r} {errs[:1]}')
        await ctx.close()
        # the open panel shows everything without a scrollbar at MacBook Air page sizes (and bigger), under about half the screen, clear of the two pills
        SCROLL = """() => { const p = document.getElementById('hc-pp-pd-panel'), all = [p, ...p.querySelectorAll('*')];
          return { panel: [p.scrollHeight, p.clientHeight], scrollers: all.filter(e => e.scrollHeight > e.clientHeight + 0 && getComputedStyle(e).overflowY !== 'visible').map(e => e.className || e.tagName),
            clipped: all.filter(e => e.scrollHeight > e.clientHeight + 1 && e.clientHeight > 0 && ['auto', 'scroll', 'hidden'].includes(getComputedStyle(e).overflowY)).length,
            fits: p.getBoundingClientRect().top >= 0 }; }"""
        for w, h in [(1440, 760), (1280, 680), (1280, 800), (1440, 900)]:
            ctx = await b.new_context(viewport={'width': w, 'height': h})
            page = await ctx.new_page(); errs = []
            page.on('pageerror', lambda e: errs.append(str(e)))
            await page.goto(base + '/paco-benovo/'); await page.wait_for_timeout(1500)
            await page.evaluate("document.getElementById('hc-pp-pd-btn').click()"); await page.wait_for_timeout(400)
            await page.evaluate("() => { window.PPDrums.set(3, 2, true); window.PPDrums.shuffle(true); }")
            pl = await page.evaluate(PLACE); sc = await page.evaluate(SCROLL)
            if SHOTS_PP: await page.screenshot(path=os.path.join(SHOTS_PP, f'beat-desk-{w}x{h}.png'))
            check(f'beat maker ({w}x{h}): the open panel has no scrollbar (scrollHeight = clientHeight, nothing scrollable inside), is under 50% of the height ({pl["panelShare"]}), above and clear of both pills',
                  sc['panel'][0] == sc['panel'][1] and not sc['scrollers'] and sc['clipped'] == 0 and sc['fits'] and pl['panelShare'] <= 0.5 and pl['panelAbove'] and pl['apart'] and not errs, f'{sc} {pl} {errs[:1]}')
            await ctx.close()
        # placement on a phone and in 1999 mode
        for w, h, mobile in [(390, 760, True), (1440, 900, False)]:
            ctx = await b.new_context(viewport={'width': w, 'height': h}, is_mobile=mobile, has_touch=mobile, device_scale_factor=2 if mobile else 1)
            page = await ctx.new_page(); errs = []
            page.on('pageerror', lambda e: errs.append(str(e)))
            await page.goto(base + '/paco-benovo/'); await page.wait_for_timeout(1500)
            normal = await page.evaluate(PLACE)
            await page.evaluate("document.getElementById('hc-pp-pd-btn').click()"); await page.wait_for_timeout(300)
            normal_open = await page.evaluate(PLACE)
            await page.evaluate("window.__hcRetro.set('ns')"); await page.wait_for_timeout(800)
            ns = await page.evaluate(PLACE)
            await page.evaluate("window.__hcRetro.set('gc')"); await page.wait_for_timeout(800)
            gc = await page.evaluate(PLACE)
            await page.evaluate("window.__hcRetro.set('off')")
            ok = all(x['pill'] and x['inHeader'] and x['apart'] and x['onScreen'] and x['aboveBar'] and x['wide'] for x in (normal, normal_open, ns, gc)) and all(x['panel'] and (x['panelAbove'] or mobile) for x in (normal_open, ns, gc))
            if mobile: ok = ok and normal_open['panelShare'] >= 0.99 and all(x['fullWidth'] for x in (normal, ns, gc))
            check(f'beat maker ({w} wide): the pill in the header (full width on phones, also in Netscape and GeoCities modes), the sound switch clear of the pause button and "back to 2026" and above the Netscape status bar, the panel above it'
                  + (' (the open panel fills the screen on phones)' if mobile else ''), ok, f'{normal} | {normal_open} | ns {ns} | gc {gc}')
            check(f'no script errors (beat maker, {w} wide)', not errs, '; '.join(errs)[:300])
            await ctx.close()

        # ---- the beat maker fills the screen below 1000 px wide; the kicker matches the "Who needs" line ----
        FULL = """() => { const p = document.getElementById('hc-pp-pd-panel'), R = e => e.getBoundingClientRect(), pr = R(p), de = document.documentElement,
            rows = [...p.querySelectorAll('.hc-pp-pd-steps')].map(x => [x.children.length, Math.round(R(x).top), Math.round(R(x.children[0]).width * 10) / 10]),
            vis = e => { if (!e) return false; const s = getComputedStyle(e), r = R(e); if (s.display === 'none' || s.visibility === 'hidden' || !r.width) return false;
              const t = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !t || !p.contains(t) ? !p.contains(t) && t === e || (!!t && e.contains(t)) : false; },
            scrollers = [p, ...p.querySelectorAll('*')].filter(e => e.scrollHeight > e.clientHeight + 1 && ['auto', 'scroll'].includes(getComputedStyle(e).overflowY)).length,
            bottom = document.elementFromPoint(innerWidth / 2, innerHeight - 3), sw = p.querySelector('.hc-pp-pd-snd'), x = p.querySelector('.hc-pp-pd-x');
          return { open: !p.hidden, rect: [Math.round(pr.left), Math.round(pr.top), Math.round(pr.width), Math.round(pr.height)], vp: [innerWidth, innerHeight], rows,
            panelScroll: [p.scrollHeight, p.clientHeight], scrollers, bodyPos: getComputedStyle(document.body).position, scrollY: Math.round(scrollY), htmlOverflow: de.style.overflow,
            hidden: { quiet: !vis(document.getElementById('hc-pp-quiet')), pause: !vis(document.querySelector('button.hc-pause')), back: !vis(document.querySelector('.hc-back')), bar: !vis(document.querySelector('.hc-ns-bar')),
              pill: !vis(document.getElementById('hc-pp-pd-btn')) }, bottomInPanel: !!bottom && p.contains(bottom),
            done: x.textContent, doneSize: [Math.round(R(x).width), Math.round(R(x).height)], doneRight: Math.round(innerWidth - R(x).right), sound: sw && [sw.textContent, sw.getAttribute('aria-pressed'), Math.round(R(sw).height)],
            fills: [...p.querySelectorAll('.hc-pp-pd-fill')].map(f => Math.round(R(f).top)), wide: de.scrollWidth <= innerWidth }; }"""
        for w, h in [(390, 844), (375, 667)]:
            ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=3, is_mobile=True, has_touch=True,
                                      user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1')
            page = await ctx.new_page(); errs = []
            page.on('pageerror', lambda e: errs.append(str(e)))
            await page.goto(base + '/paco-benovo/'); await page.wait_for_timeout(1500)
            await page.evaluate("window.scrollTo(0, 150)"); await page.wait_for_timeout(200)
            y0 = await page.evaluate("Math.round(scrollY)")
            await page.evaluate("document.getElementById('hc-pp-pd-btn').click()"); await page.wait_for_timeout(500)
            r = await page.evaluate(FULL)
            if SHOTS_PP: await page.screenshot(path=os.path.join(SHOTS_PP, 'beat-phone-full.png' if h == 844 else 'beat-se-full.png'))
            cover = r['rect'] == [0, 0, w, h]
            check(f'beat maker ({w}x{h}): the open panel covers the whole screen, one row of 16 steps for each of the four instruments, Done at the top right, fills in one row',
                  r['open'] and cover and [x[0] for x in r['rows']] == [16] * 4 and len({x[1] for x in r['rows']}) == 4 and all(x[2] >= 18 for x in r['rows'])
                  and r['done'] == 'Done' and r['doneSize'][0] >= 44 and r['doneSize'][1] >= 44 and r['doneRight'] <= 20 and len(set(r['fills'])) == 1 and r['wide'] and not errs, f'{r} {errs[:1]}')
            check(f'beat maker ({w}x{h}): everything fits without scrolling, pads included (nothing scrolls inside the panel)', r['panelScroll'][0] <= r['panelScroll'][1] + 1 and r['scrollers'] == 0, str(r['panelScroll']))
            check(f'beat maker ({w}x{h}): the page behind is locked while open (body fixed, no page scroll) and the bottom buttons are not visible, the sound switch is in the panel',
                  r['bodyPos'] == 'fixed' and r['scrollY'] == 0 and r['bottomInPanel'] and r['hidden']['quiet'] and r['hidden']['pause'] and r['hidden']['pill'] and r['sound'] and r['sound'][2] >= 44, str(r))
            # the panel's sound switch is the page's own: muting here flips the sound switch and the audio state, and back
            m1 = await page.evaluate("""() => { document.querySelector('#hc-pp-pd-panel .hc-pp-pd-snd').click(); const q = document.getElementById('hc-pp-quiet');
              return [window.__hcPalettePiano.sound().muted, q.getAttribute('aria-pressed'), q.textContent, document.querySelector('#hc-pp-pd-panel .hc-pp-pd-snd').textContent]; }""")
            m2 = await page.evaluate("""() => { document.querySelector('#hc-pp-pd-panel .hc-pp-pd-snd').click();
              return [window.__hcPalettePiano.sound().muted, document.getElementById('hc-pp-quiet').getAttribute('aria-pressed'), document.querySelector('#hc-pp-pd-panel .hc-pp-pd-snd').textContent]; }""")
            check(f'beat maker ({w}x{h}): the sound switch inside the panel uses the page\'s mute (muted, shown in both, and back)',
                  m1 == [True, 'true', 'Turn the sound on', 'Sound off'] and m2 == [False, 'false', 'Sound on'], f'{m1} {m2}')
            # one rule for the toggles: dark = on, light = off (Play, Shuffle, Sound); Clear and Done are plain text, never filled
            TOG = """() => { const p = document.getElementById('hc-pp-pd-panel'), q = s => p.querySelector(s), dark = e => getComputedStyle(e).backgroundColor === 'rgb(73, 46, 70)', f = s => ({ p: q(s).getAttribute('aria-pressed'), dark: dark(q(s)) });
              return { play: f('.hc-pp-pd-go'), shuf: f('.hc-pp-pd-shuf'), snd: f('.hc-pp-pd-snd'), clear: getComputedStyle(q('.hc-pp-pd-clear')).backgroundColor, done: getComputedStyle(q('.hc-pp-pd-x')).backgroundColor }; }"""
            if SHOTS_PP and h == 844: await page.screenshot(path=os.path.join(SHOTS_PP, 'btn-idle.png'))
            t0 = await page.evaluate(TOG)
            await page.click('#hc-pp-pd-panel .hc-pp-pd-go'); await page.click('#hc-pp-pd-panel .hc-pp-pd-shuf'); await page.click('#hc-pp-pd-panel .hc-pp-pd-snd'); await page.wait_for_timeout(200)
            t1 = await page.evaluate(TOG)
            if SHOTS_PP and h == 844: await page.screenshot(path=os.path.join(SHOTS_PP, 'btn-on.png'))
            await page.click('#hc-pp-pd-panel .hc-pp-pd-go'); await page.click('#hc-pp-pd-panel .hc-pp-pd-shuf'); await page.click('#hc-pp-pd-panel .hc-pp-pd-snd'); await page.wait_for_timeout(200)
            t2 = await page.evaluate(TOG)
            plain = 'rgba(0, 0, 0, 0)'
            check(f'beat maker ({w}x{h}): Play, Shuffle and Sound are filled and aria-pressed true only while on (Sound on at first), light when off; Clear and Done are never filled',
                  t0['play'] == {'p': 'false', 'dark': False} and t0['shuf'] == {'p': 'false', 'dark': False} and t0['snd'] == {'p': 'true', 'dark': True}
                  and t1['play'] == {'p': 'true', 'dark': True} and t1['shuf'] == {'p': 'true', 'dark': True} and t1['snd'] == {'p': 'false', 'dark': False}
                  and t2 == t0 and t0['clear'] == plain and t0['done'] == plain, f'{t0} {t1} {t2}')
            # a tap in the gap between two squares picks the square under the finger
            g = await page.evaluate("""() => { const st = document.querySelector('#hc-pp-pd-panel .hc-pp-pd-steps'), a = st.children[5].getBoundingClientRect(), c = st.children[6].getBoundingClientRect();
              return [(a.right + c.left) / 2, a.top + a.height / 2]; }""")
            before = await page.evaluate("window.PPDrums.pattern()[0]")
            await page.touchscreen.tap(g[0], g[1]); await page.wait_for_timeout(100)
            pat = await page.evaluate("window.PPDrums.pattern()[0]")
            diff = [i for i in range(16) if pat[i] != before[i]]
            check(f'beat maker ({w}x{h}): a tap between two squares still picks one of the two squares beside it (exactly one step changed)', len(diff) == 1 and diff[0] in (5, 6), f'{before} -> {pat}')
            for i in diff: await page.evaluate(f"window.PPDrums.set(0, {i}, {before[i]})")
            # Netscape and GeoCities modes: the status bar and buttons stay behind the panel
            modes = []
            for mode in ('ns', 'gc'):
                await page.evaluate(f"window.__hcRetro.set('{mode}')"); await page.wait_for_timeout(700)
                rr = await page.evaluate(FULL); modes.append(rr)
                if SHOTS_PP and h == 844: await page.screenshot(path=os.path.join(SHOTS_PP, f'beat-phone-{mode}.png'))
            await page.evaluate("window.__hcRetro.set('off')"); await page.wait_for_timeout(300)
            check(f'beat maker ({w}x{h}): in Netscape and GeoCities modes the panel still covers the screen with nothing on top (status bar and buttons hidden)',
                  all(x['rect'] == [0, 0, w, h] and x['bottomInPanel'] and x['hidden']['quiet'] and x['hidden']['pause'] and x['hidden']['back'] and x['hidden']['bar'] for x in modes), str(modes))
            # Esc closes it, the scroll position comes back exactly
            await page.keyboard.press('Escape'); await page.wait_for_timeout(300)
            r2 = await page.evaluate("""() => ({ open: !document.getElementById('hc-pp-pd-panel').hidden, scrollY: Math.round(scrollY), pos: getComputedStyle(document.body).position, bs: document.body.getAttribute('style'),
              path: location.pathname, quiet: getComputedStyle(document.getElementById('hc-pp-quiet')).visibility })""")
            check(f'beat maker ({w}x{h}): Esc closes the panel (and Cargo does not leave the page), the scroll is back at y={y0}, body unlocked', not r2['open'] and r2['scrollY'] == y0 and r2['pos'] != 'fixed' and not r2['bs'] and '/paco-benovo' in r2['path'] and r2['quiet'] == 'visible', f'{r2} y0={y0}')
            await page.evaluate("document.getElementById('hc-pp-pd-btn').click()"); await page.wait_for_timeout(300)
            await page.click('#hc-pp-pd-panel .hc-pp-pd-x'); await page.wait_for_timeout(300)
            r2 = await page.evaluate("[Math.round(scrollY), getComputedStyle(document.body).position, document.getElementById('hc-pp-pd-panel').hidden]")
            check(f'beat maker ({w}x{h}): Done closes it, back at the same scroll position', r2 == [y0, 'static', True], f'{r2} y0={y0}')
            # leaving the page with the panel open unlocks the page
            await page.evaluate("document.getElementById('hc-pp-pd-btn').click()"); await page.wait_for_timeout(300)
            await page.evaluate("() => { history.pushState({}, '', '/playthings/'); window.__hcPaletteDrums.check(); }"); await page.wait_for_timeout(300)
            r2 = await page.evaluate("[getComputedStyle(document.body).position, document.body.getAttribute('style'), document.documentElement.style.overflow, document.documentElement.classList.contains('hc-pp-pd-full'), !!document.getElementById('hc-pp-pd-panel')]")
            check(f'beat maker ({w}x{h}): leaving the page with the panel open tears it down and restores the page scroll', r2[0] != 'fixed' and not r2[1] and not r2[2] and not r2[3] and not r2[4], str(r2))
            if h == 844 and SHOTS_PP:
                await page.goto(base + '/paco-benovo/?hdr'); await page.wait_for_timeout(1500)
                await page.screenshot(path=os.path.join(SHOTS_PP, 'header-phone.png'))
            check(f'no script errors (full-screen beat maker, {w}x{h})', not errs, '; '.join(errs)[:300])
            await ctx.close()
        for w, h in [(800, 1000), (700, 900), (999, 700)]:   # medium widths use the full-screen panel too
            ctx = await b.new_context(viewport={'width': w, 'height': h}); page = await ctx.new_page()
            await page.goto(base + '/paco-benovo/'); await page.wait_for_timeout(1500)
            await page.evaluate("window.scrollTo(0, 120)")
            await page.evaluate("document.getElementById('hc-pp-pd-btn').click()"); await page.wait_for_timeout(400)
            r = await page.evaluate(FULL)
            await page.keyboard.press('Escape'); await page.wait_for_timeout(200)
            sy = await page.evaluate("Math.round(scrollY)")
            check(f'beat maker ({w}x{h}): medium widths get the full-screen panel (covers the screen, page locked, back to the same scroll after Esc)', r['rect'] == [0, 0, w, h] and r['bodyPos'] == 'fixed' and sy == 120, f'{r["rect"]} {r["bodyPos"]} {sy}')
            await ctx.close()
        KICK = """() => { const k = document.querySelector('#hc-pp .hc-pp-kicker'), l = document.querySelector('#hc-pp .hc-pp-lead'), f = e => { const s = getComputedStyle(e); return [s.fontSize, s.fontWeight, s.letterSpacing, s.color, s.fontFamily, s.fontStyle]; };
          return { kicker: f(k), lead: f(l), text: k.textContent }; }"""
        for w, h, mobile in [(1440, 900, False), (390, 844, True), (800, 900, False)]:
            ctx = await b.new_context(viewport={'width': w, 'height': h}, is_mobile=mobile, has_touch=mobile); page = await ctx.new_page()
            await page.goto(base + '/paco-benovo/'); await page.wait_for_timeout(1500)
            r = await page.evaluate(KICK)
            check(f'palette piano ({w} wide): "Civelektronique presents:" has the same size, weight, letter-spacing, colour and font as "Who needs..." ({r["kicker"][0]}, {r["kicker"][1]})',
                  r['kicker'] == r['lead'] and r['kicker'][1] in ('700', 'bold'), str(r))
            await ctx.close()

        # ---- Cargo's own stylesheet arriving empty (Cargo's outage 2026-11-09) ----
        page = await b.new_page(viewport={'width': 1300, 'height': 900}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/short/stylecheck-empty/'); await page.wait_for_timeout(2500)
        r = await page.evaluate("""() => [getComputedStyle(document.body).wordSpacing, window.__hcStyleCheck && window.__hcStyleCheck.fixed,
          document.querySelectorAll('style[data-hc-stylecheck]').length]""")
        check("stylesheet check: an empty Cargo stylesheet is fetched again and put in place", r == ['7px', True, 1], str(r))
        await page.goto(base + '/short/stylecheck-ok/'); await page.wait_for_timeout(1500)
        r = await page.evaluate("[getComputedStyle(document.body).wordSpacing, window.__hcStyleCheck.checked, window.__hcStyleCheck.broken, document.querySelectorAll('style[data-hc-stylecheck]').length]")
        check('stylesheet check: a good stylesheet is left alone', r == ['7px', True, False, 0], str(r))
        check('no script errors (stylesheet check)', not errs, '; '.join(errs)[:300])
        await page.close()

        # ---- phone, with Cargo's late viewport switch and the resize signal blocked (closest to Safari) ----
        ctx = await b.new_context(viewport={'width': 390, 'height': 760}, device_scale_factor=3, is_mobile=True, has_touch=True)
        await ctx.add_init_script(BLOCK_RESIZE)
        page = await ctx.new_page(); errs = []; page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/blob-pond/'); await page.wait_for_timeout(1500)
        await page.click('#hcp-wakeBtn'); await page.wait_for_timeout(3000)
        r = await page.evaluate("""() => {
          const lines = [...document.querySelectorAll('#hcp-pond > g:nth-of-type(1) path')].map(p => p.getAttribute('d'));
          const xmax = Math.max(...lines[0].match(/[ML]([\\d.]+) /g).map(s => +s.slice(1)));
          const blobs = [...document.querySelectorAll('#hcp-pond > g:nth-of-type(2) > g')].map(g => /translate\\(([-\\d.]+) ([-\\d.]+)\\)/.exec(g.getAttribute('transform')).slice(1).map(Number));
          return { xmax, onScreen: blobs.filter(([x, y]) => x > 0 && x < innerWidth && y > 0 && y < innerHeight).length, total: blobs.length }; }""")
        check('phone: lines fit the real screen width', r['xmax'] <= 392, f"lines reach {r['xmax']:.0f}px")
        check('phone: blobs are on screen', r['onScreen'] >= r['total'] - 1, f"{r['onScreen']} of {r['total']}")
        await page.tap('#hcp-blobsToggle'); await page.wait_for_timeout(200)
        r = await page.evaluate("""() => { const p = document.getElementById('hcp-blobPanel').getBoundingClientRect(), hdr = document.querySelector('.site_header').getBoundingClientRect().bottom;
          const sc = document.getElementById('hcp-scalePick').getBoundingClientRect();
          return { gap: p.top - hdr, picker: sc.top >= p.top && sc.bottom <= p.bottom }; }""")
        check('phone: open panel stays below the header', r['gap'] >= 0, f"{r['gap']:.0f}px below")
        check('phone: scale picker visible in the panel', r['picker'])
        p2 = await ctx.new_page(); await p2.goto(base + '/info-contact/'); await p2.wait_for_timeout(1500)
        n = await p2.evaluate("document.querySelectorAll('.hc-blob').length")
        check('phone: ordinary page gets the phone count of blobs', n == 6, f'{n} blobs')
        p3 = await ctx.new_page(); await p3.goto(base + '/filter/artdirection/?hc-sort=hands'); await p3.wait_for_timeout(1500)
        r = await p3.evaluate(GRID_DUMP)
        check('phone: grid keeps Cargo\'s columns and is sorted', len(r['cols']) == 3 and r['cols'][0][0] == FIRST_BY_HANDS[0], str([c[:1] for c in r['cols']]))
        p4 = await ctx.new_page(); p4.on('pageerror', lambda e: errs.append(str(e)))
        await p4.goto(base + '/short/birth-a-blob/'); await p4.wait_for_timeout(1500)
        pr = await p4.evaluate("(() => { const r = document.getElementById('hc-bab-paper').getBoundingClientRect(); return [r.left, r.top, r.width]; })()")
        await p4.mouse.move(pr[0] + pr[2] * 0.35, pr[1] + pr[2] * 0.4); await p4.mouse.down()
        await p4.mouse.move(pr[0] + pr[2] * 0.6, pr[1] + pr[2] * 0.6, steps=10); await p4.mouse.up()
        n0 = await p4.evaluate("document.querySelectorAll('.hc-blobs .hc-blob').length")
        await p4.tap('#hc-bab-go'); await p4.wait_for_timeout(2500)
        r = await p4.evaluate("[document.documentElement.scrollWidth, innerWidth, document.querySelectorAll('.hc-blobs .hc-blob').length]")
        check('phone: birth a blob fits the screen and lets its blob go', r[0] <= r[1] and r[2] == n0 + 1, f'page {r[0]}px wide on {r[1]}, blobs {n0} -> {r[2]}')
        if SHOTS: await p4.screenshot(path=os.path.join(SHOTS, 'phone.png'))
        check('no script errors (phone)', not errs, '; '.join(errs)[:200])
        await b.close()


if __name__ == '__main__':
    addons = ''.join((ROOT / a).read_text() for a in ADDONS)
    site = Path(tempfile.mkdtemp())
    for d in ['blob-pond', 'info-contact']:
        (site / d).mkdir(); (site / d / 'index.html').write_text(PAGE.replace('ADDONS', addons))
    grid = PAGE.replace('ADDONS', (ROOT / 'dist' / 'hc-columns.html').read_text() + addons).replace('<p>PAGE CONTENT</p>', GRID)
    (site / 'filter' / 'artdirection').mkdir(parents=True); (site / 'filter' / 'artdirection' / 'index.html').write_text(grid)
    sys.path.insert(0, str(ROOT / 'tools')); import build_scripts
    tags = build_scripts.loader('/js/')   # the same loader as dist/custom-html-short.html, pointed at the local copies
    (site / 'js').mkdir()
    for f in (ROOT / 'dist' / 'js').glob('*.js'): (site / 'js' / f.name).write_text(f.read_text())
    (site / 'assets' / 'portrait').mkdir(parents=True)
    for f in (ROOT / 'assets' / 'portrait').iterdir(): (site / 'assets' / 'portrait' / f.name).write_bytes(f.read_bytes())
    (site / 'assets' / 'palette-piano').mkdir(parents=True)   # the owner's recordings for the palette piano, where hc-palette-piano.js looks for them
    for f in (ROOT / 'assets' / 'palette-piano').glob('*.mp3'): (site / 'assets' / 'palette-piano' / f.name).write_bytes(f.read_bytes())
    (site / 'Halli-Civelek-artist-portrait_300.jpg').write_bytes((ROOT / 'assets' / 'portrait' / 'face-no-irises.jpg').read_bytes())   # stand-in for Cargo's photo
    for d, html in [('short/blob-pond', PAGE.replace('ADDONS', tags)), ('the-blob-pond', PAGE.replace('ADDONS', tags)),
                    ('short/info-contact', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', '<div class="project_content"><img src="/Halli-Civelek-artist-portrait_300.jpg" width="300" height="359"></div>')),
                    ('short/filter/artdirection', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', GRID)),
                    ('short/filter/illustration', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', GRID_IMG)),
                    ('short/romantika', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', '<p>Inside spread</p><img src="/halli_apparat_fold_stort.jpg" width="450" height="944">')),
                    ('short/Cheerios', PAGE.replace('ADDONS', tags).replace('</style>', (ROOT / 'custom-css' / 'no-jump.css').read_text() + '</style>', 1).replace('<p>PAGE CONTENT</p>',
                        '<img src="/px.png?a" width="1000" height="600" align="left"><br><br>Visual identity and design<br>for Cheerios<br><br>Some story line one<br>line two<br><br>'
                        'Close up<br><img src="/px.png?b" width="400" height="300"><img src="/px.png?c" width="400" height="300"><br>Credits here')
                        .replace('</div></div>\n<script>', '</div><div class="project_footer"><a href="/filter/artdirection">artdirection</a></div>' + GRID + '</div>\n<script>', 1)),
                    ('short/Icelandsmites', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>',
                        re.sub(r'src="[^"]+"', 'src="/px.png"', (ROOT.parent / 'almanak-cargo-PASTE-THIS.txt').read_text() + '<div class="hc-label">Logo</div>\n<div class="hc-video" data-src="/px.mp4" data-w="700"></div>').replace('\n', '<br>'))
                        .replace('</div></div>\n<script>', '</div><div class="project_footer"><a href="/filter/artdirection">artdirection</a></div>' + GRID + '</div>\n<script>', 1)),
                    ('music-mixes', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', 'loose text from Cargo <br><p>I make music as Wanton Boys Club</p> + + +')
                        .replace('</div></div>\n<script>', '</div>' + GRID + '</div>\n<script>', 1)),
                    ('short/stylecheck-empty', PAGE.replace('ADDONS', tags).replace('</head>', '<link rel="stylesheet" href="/stylesheet?empty-once"></head>', 1)),
                    ('short/stylecheck-ok', PAGE.replace('ADDONS', tags).replace('</head>', '<link rel="stylesheet" href="/stylesheet?ok"></head>', 1)),
                    ('short/birth-a-blob', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', '<p>Birth-a-blob: draw a face on a blob</p>')
                        .replace('</div></div>\n<script>', '</div>' + GRID + '</div>\n<script>', 1)),
                    ('paco-benovo', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', '<p>palette piano</p>')
                        .replace('</style>', '  select, input { background: yellow; border: 3px solid red; text-transform: uppercase; letter-spacing: 4px; }\n  section { padding: 60px; }\n</style>', 1)
                        .replace('</div></div>\n<script>', '</div>' + GRID + '</div>\n<script>', 1)),
                    ('palette-piano', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', '<p>palette piano</p>')),   # the old address keeps working
                    ('short/playthings', PAGE.replace('ADDONS', tags)
                        .replace('</style>', '  .project_content a:hover { background-color: rgb(255, 255, 0); color: rgb(0, 0, 0); }\n</style>', 1)
                        .replace('<p>PAGE CONTENT</p>', '<p>Music Kontrapunkt Kontrol, Shakeskin, The Calculater, the blob-pond</p>')
                        .replace('</div></div>\n<script>', '</div>' + GRID + '</div>\n<script>', 1))]:
        (site / d).mkdir(parents=True); (site / d / 'index.html').write_text(html)
    (site / 'Cheerios').mkdir(); (site / 'Cheerios' / 'index.html').write_text((site / 'short' / 'Cheerios' / 'index.html').read_text())   # where the piano's links lead
    def png(w, h):   # a small striped test picture
        rows = b''.join(b'\x00' + b''.join(bytes((x * 7 % 256, y * 5 % 256, 160)) for x in range(w)) for y in range(h))
        chunk = lambda t, d: struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
        return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(rows)) + chunk(b'IEND', b'')
    PASTE[:] = sorted((ROOT.parent / 'paste-files').glob('*.txt'))
    for i, f in enumerate(PASTE):
        html = PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', f.read_text().replace('\n', '<br>')).replace('</div></div>\n<script>', '</div>' + GRID + '</div>\n<script>', 1)
        (site / 'paste' / str(i) / 'Cheerios').mkdir(parents=True); (site / 'paste' / str(i) / 'Cheerios' / 'index.html').write_text(html)
    (site / 'index.html').write_text(PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', GRID))   # the front page (strata)
    (site / 'px.png').write_bytes(png(120, 90))
    (site / 'halli_apparat_fold_stort.jpg').write_bytes(png(45, 94))
    (site / 'assets' / 'apparat').mkdir(parents=True)
    for f in (ROOT / 'assets' / 'apparat').iterdir(): (site / 'assets' / 'apparat' / f.name).write_bytes(f.read_bytes())
    served = {'empty-once': 0}
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
        def do_GET(self):   # Cargo's /stylesheet: '?empty-once' is empty the first time (like Cargo's outage), then whole
            if self.path.startswith('/stylesheet'):
                q = self.path.partition('?')[2]
                body = b'' if q == 'empty-once' and served['empty-once'] == 0 else b'body { word-spacing: 7px; }'
                if q == 'empty-once': served['empty-once'] += 1
                self.send_response(200); self.send_header('Content-Type', 'text/css'); self.send_header('Cache-Control', 'public, max-age=3600')
                self.send_header('Content-Length', str(len(body))); self.end_headers(); self.wfile.write(body); return
            return super().do_GET()
    handler = functools.partial(Quiet, directory=str(site))
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    asyncio.run(main(f'http://127.0.0.1:{srv.server_port}'))
    srv.shutdown()
    print(f'\n{sum(results)} of {len(results)} checks passed')
    sys.exit(0 if all(results) else 1)
