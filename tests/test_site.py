"""Checks the add-ons inside a stand-in for Cargo's page.   Run:  python3 tests/test_site.py
Needs:  python3 -m pip install --user playwright  &&  python3 -m playwright install chromium

The stand-in mimics what matters about hallicivelek.com on Cargo:
- a fixed header (z-index 1000) with nav links and Cargo's link_active styling
- deliberately clashing global styles (.caption, h1, p, button) to prove the pond is fenced
- NO viewport tag at first; a script near the end adds it, like Cargo does on phones
It cannot test real Cargo, real Safari, or Cargo's limit on Custom HTML size."""
import asyncio, functools, http.server, threading, tempfile, sys, re, zlib, struct
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
              r['h'] == ['Wanton Boys Club', 'Remixes', 'Mixes'] and r['mixes'] == ['Italo! 24', 'Italo Rider 20', 'Hotplay (from Europe) – Minimix #1 8', 'Electronic Oddities 1969–1986 22']
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

        # ---- playthings: four cards over Cargo's fallback, the pond card in preview mode ----
        page = await b.new_page(viewport={'width': 1300, 'height': 900}); errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        await page.goto(base + '/short/playthings/'); await page.wait_for_timeout(2500)
        r = await page.evaluate("""() => ({ cards: [...document.querySelectorAll('#hc-pt a.hc-pt-card h2')].map(h => h.firstChild.textContent),
          intro: (document.querySelector('#hc-pt .hc-pt-intro') || {}).textContent,
          fallbackHidden: [...document.querySelectorAll('[data-hc-pt-fallback]')].every(e => getComputedStyle(e).display === 'none'),
          pondSrc: (document.querySelector('#hc-pt iframe[src*="blob-pond"]') || {}).getAttribute ? document.querySelector('#hc-pt iframe[src*="blob-pond"]').getAttribute('src') : null,
          outsideNewTab: [...document.querySelectorAll('#hc-pt a.hc-pt-card')].filter(a => /^https?:/.test(a.getAttribute('href'))).every(a => a.target === '_blank') })""")
        hid = await page.evaluate("[...document.querySelectorAll('.thumbnails, #hc-sort')].every(e => getComputedStyle(e).display === 'none')")
        check("playthings: Cargo's project grid is hidden", hid)
        check('playthings: four cards in order, intro, Cargo fallback hidden', r['cards'] == ['Music Kontrapunkt Kontrol', 'Shakeskin', 'The Calculater', 'The blob-pond']
              and r['intro'] == "Things I've built and kept running (some since 2004)." and r['fallbackHidden'] and r['outsideNewTab'], str(r))
        await page.hover('#hc-pt a.hc-pt-card >> nth=2'); await page.wait_for_timeout(400)
        bg = await page.evaluate("getComputedStyle(document.querySelectorAll('#hc-pt a.hc-pt-card')[2]).backgroundColor")
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
    (site / 'Halli-Civelek-artist-portrait_300.jpg').write_bytes((ROOT / 'assets' / 'portrait' / 'face-no-irises.jpg').read_bytes())   # stand-in for Cargo's photo
    for d, html in [('short/blob-pond', PAGE.replace('ADDONS', tags)), ('the-blob-pond', PAGE.replace('ADDONS', tags)),
                    ('short/info-contact', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', '<div class="project_content"><img src="/Halli-Civelek-artist-portrait_300.jpg" width="300" height="359"></div>')),
                    ('short/filter/artdirection', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', GRID)),
                    ('short/filter/illustration', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', GRID_IMG)),
                    ('short/romantika', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', '<p>Inside spread</p><img src="/halli_apparat_fold_stort.jpg" width="450" height="944">')),
                    ('music-mixes', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', 'loose text from Cargo <br><p>I make music as Wanton Boys Club</p> + + +')
                        .replace('</div></div>\n<script>', '</div>' + GRID + '</div>\n<script>', 1)),
                    ('short/playthings', PAGE.replace('ADDONS', tags)
                        .replace('</style>', '  .project_content a:hover { background-color: rgb(255, 255, 0); color: rgb(0, 0, 0); }\n</style>', 1)
                        .replace('<p>PAGE CONTENT</p>', '<p>Music Kontrapunkt Kontrol, Shakeskin, The Calculater, the blob-pond</p>')
                        .replace('</div></div>\n<script>', '</div>' + GRID + '</div>\n<script>', 1))]:
        (site / d).mkdir(parents=True); (site / d / 'index.html').write_text(html)
    def png(w, h):   # a small striped test picture
        rows = b''.join(b'\x00' + b''.join(bytes((x * 7 % 256, y * 5 % 256, 160)) for x in range(w)) for y in range(h))
        chunk = lambda t, d: struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
        return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(rows)) + chunk(b'IEND', b'')
    (site / 'px.png').write_bytes(png(120, 90))
    (site / 'halli_apparat_fold_stort.jpg').write_bytes(png(45, 94))
    (site / 'assets' / 'apparat').mkdir(parents=True)
    for f in (ROOT / 'assets' / 'apparat').iterdir(): (site / 'assets' / 'apparat' / f.name).write_bytes(f.read_bytes())
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    handler = functools.partial(Quiet, directory=str(site))
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    asyncio.run(main(f'http://127.0.0.1:{srv.server_port}'))
    srv.shutdown()
    print(f'\n{sum(results)} of {len(results)} checks passed')
    sys.exit(0 if all(results) else 1)
