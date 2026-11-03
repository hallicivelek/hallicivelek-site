"""Checks the add-ons inside a stand-in for Cargo's page.   Run:  python3 tests/test_site.py
Needs:  python3 -m pip install --user playwright  &&  python3 -m playwright install chromium

The stand-in mimics what matters about hallicivelek.com on Cargo:
- a fixed header (z-index 1000) with nav links and Cargo's link_active styling
- deliberately clashing global styles (.caption, h1, p, button) to prove the pond is fenced
- NO viewport tag at first; a script near the end adds it, like Cargo does on phones
It cannot test real Cargo, real Safari, or Cargo's limit on Custom HTML size."""
import asyncio, functools, http.server, threading, tempfile, sys
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
        f'<div style="height:{120 + 37 * (i % 4)}px;background:#fff">{s}</div></a></div></div>'
        for i, s in enumerate(GRID_SLUGS) if i % 3 == c) + '</div>' for c in range(3)) + '</div>'
        + '<script>window.Cargo = { View: { Thumbnail: { collection: { models: '
        + str([{'id': i + 1, 'attributes': {'project_url': s}} for i, s in enumerate(GRID_SLUGS)]).replace("'", '"')
        + ' } } } };</script>')
GRID_DUMP = """() => ({ label: document.querySelector('#hc-sort .hc-sort-label') ? document.querySelector('#hc-sort .hc-sort-label').textContent : null,
  cols: [...document.querySelectorAll('.thumbnails .column')].filter(c => getComputedStyle(c).display !== 'none').map(c =>
    [...c.querySelectorAll('.thumbnail[name]')].map(t => { const b = t.closest('.padding_helper').querySelector('.hc-sort-badge');
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
        check('grid: three columns become two, no card lost', len(r['cols']) == 2 and cards == len(GRID_SLUGS), f"{len(r['cols'])} columns, {cards} cards")
        check('grid: ?hc-sort=hands names the sort', r['label'] == "sorted by: number of hands", r['label'])
        firsts = [x.split(' [')[0] for x in FIRST_BY_HANDS]
        check('grid: most hands first, top to bottom', order[:6] == firsts, ', '.join(order[:6]))
        badges = sorted(x for c in r['cols'] for x in c if '[' in x)
        check('grid: badges on exactly the hands cards, "1 hand" singular', badges == sorted(FIRST_BY_HANDS), '; '.join(badges))
        await page.click('#hc-sort button'); await page.wait_for_timeout(1000)
        r2 = await page.evaluate(GRID_DUMP)
        check('grid: shuffle picks another sort and keeps every card', r2['label'] != r['label'] and sum(len(c) for c in r2['cols']) == len(GRID_SLUGS), r2['label'])
        await page.goto(base + '/filter/artdirection/?r=1'); await page.wait_for_timeout(800)
        r = await page.evaluate(GRID_DUMP)
        check('grid: a visit without ?hc-sort gets a random sort with 2+ badges', r['label'] not in (None, "sorted by: Halli's taste")
              and sum('[' in x for c in r['cols'] for x in c) >= 2, r['label'])
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
              and len(r['cols']) == 2, f"pond {pond}, {n} blobs, {r['label']}")
        check('no script errors (script files)', not errs, '; '.join(errs)[:200])
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
    for d, html in [('short/blob-pond', PAGE.replace('ADDONS', tags)),
                    ('short/filter/artdirection', PAGE.replace('ADDONS', tags).replace('<p>PAGE CONTENT</p>', GRID))]:
        (site / d).mkdir(parents=True); (site / d / 'index.html').write_text(html)
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    handler = functools.partial(Quiet, directory=str(site))
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    asyncio.run(main(f'http://127.0.0.1:{srv.server_port}'))
    srv.shutdown()
    print(f'\n{sum(results)} of {len(results)} checks passed')
    sys.exit(0 if all(results) else 1)
