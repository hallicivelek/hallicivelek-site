"""Palette piano: the colour table (src/palettes.json) and the add-on built from it.

    python3 tools/build_palettes.py --refresh   # bake every project's colours again from its Cargo thumbnail -> src/palettes.json
    python3 tools/build_palettes.py             # src/hc-palette-piano.html + src/palettes.json -> dist/hc-palette-piano.html

src/palettes.json holds one project per line, in Halli's order (Cargo's project list): its title, its address and five
or so colours with their share of the picture. Cargo's image host sends no CORS header, so a page can't read a picture's
colours; they are baked here instead (the same way as src/weather.txt). build.py runs build() and refuses to build on an
entry it can't read. Run --refresh when projects are added, renamed or get a new thumbnail; every strip's sound is
worked out from its colours and address, so a re-bake can change how a strip sounds.
--refresh needs the network and Playwright (the same Chromium the tests use decodes the pictures). It was moved here
from mockups/palette-piano/bake_palettes.py (approved 2026-11-16); the colour reading is unchanged."""
import base64, json, re, sys, tempfile, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TABLE = ROOT / 'src' / 'palettes.json'
SRC, OUT = ROOT / 'src' / 'hc-palette-piano.html', ROOT / 'dist' / 'hc-palette-piano.html'
PLACEHOLDER = '/*PALETTES*/[]'
CACHE = Path(tempfile.gettempdir()) / 'palette-piano-thumbs'   # downloaded pictures stay out of the repo
API = 'https://hallicivelek.com/_api/v0/site/hallicivelek/projects?type=project&offset={}&limit=70'
UA = {'User-Agent': 'Mozilla/5.0 (compatible; site-build)'}
SLUG = re.compile(r'[A-Za-z0-9_.-]+')
HEX = re.compile(r'#[0-9a-f]{6}')


def check(rows):
    errors, seen = [], set()
    if not isinstance(rows, list):
        return ['not a list of projects']
    for i, p in enumerate(rows, 1):
        where = f'project {i}'
        if not isinstance(p, dict) or set(p) != {'title', 'url', 'colours'}:
            errors.append(f'{where}: needs exactly "title", "url" and "colours"'); continue
        if not isinstance(p['title'], str) or not p['title'].strip():
            errors.append(f'{where}: empty title')
        if not isinstance(p['url'], str) or not SLUG.fullmatch(p['url']):
            errors.append(f'{where}: address {p["url"]!r} is not a Cargo project address'); continue
        if p['url'].lower() in seen:
            errors.append(f'{where}: {p["url"]} is listed twice')
        seen.add(p['url'].lower())
        cols = p['colours']
        if not isinstance(cols, list) or not cols or not all(
                isinstance(c, list) and len(c) == 2 and isinstance(c[0], str) and HEX.fullmatch(c[0])
                and isinstance(c[1], (int, float)) and 0 < c[1] <= 1 for c in cols):
            errors.append(f'{where} ({p["url"]}): colours must be ["#rrggbb", share] pairs, share between 0 and 1')
    return errors


def build():
    try:
        rows = json.loads(TABLE.read_text())
    except (OSError, ValueError) as e:
        sys.exit(f'src/palettes.json: {e}')
    errors = check(rows)
    if errors:
        sys.exit('src/palettes.json:\n  ' + '\n  '.join(errors))
    src = SRC.read_text()
    if PLACEHOLDER not in src:
        sys.exit(f'src/{SRC.name}: palette placeholder missing')
    OUT.write_text(src.replace(PLACEHOLDER, json.dumps(rows, ensure_ascii=False, separators=(',', ':'))))
    print(f'dist/{OUT.name}: {len(rows)} projects in the palette table')


# ---------------------------------------------------------------- refresh (needs the network and Playwright)

def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        return r.read()


def projects():
    out, off = [], 0
    while True:
        batch = json.loads(get(API.format(off)))
        out += batch
        if len(batch) < 70 or off > 700:
            return out
        off += 70


# Runs in the page: OKLab k-means on a 72px copy, near-duplicates merged, the biggest five kept,
# with one vivid accent let in if the picture has one (so a red dot on white still gets heard).
JS = r"""
async (src) => {
  const img = new Image(); img.src = src; await img.decode();
  const s = 72 / Math.max(img.naturalWidth, img.naturalHeight), w = Math.max(1, Math.round(img.naturalWidth * s)), h = Math.max(1, Math.round(img.naturalHeight * s));
  const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
  g.drawImage(img, 0, 0, w, h); const d = g.getImageData(0, 0, w, h).data;
  const lin = v => (v /= 255) <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  const lab = (r, gg, b) => { r = lin(r); gg = lin(gg); b = lin(b);
    const l = Math.cbrt(0.4122 * r + 0.5363 * gg + 0.0514 * b), m = Math.cbrt(0.2119 * r + 0.6807 * gg + 0.1074 * b), q = Math.cbrt(0.0883 * r + 0.2817 * gg + 0.6300 * b);
    return [0.2105 * l + 0.7936 * m - 0.0041 * q, 1.978 * l - 2.4286 * m + 0.4506 * q, 0.0259 * l + 0.7828 * m - 0.8087 * q]; };
  const px = [];
  for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 128) px.push({ p: lab(d[i], d[i + 1], d[i + 2]), rgb: [d[i], d[i + 1], d[i + 2]] });
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  // seeds: farthest-point, starting from the first pixel (deterministic)
  const K = 9, cent = [px[0].p.slice()];
  while (cent.length < K) { let best = null, bd = -1;
    for (let i = 0; i < px.length; i += 3) { const dd = Math.min(...cent.map(cc => dist(cc, px[i].p))); if (dd > bd) { bd = dd; best = px[i].p; } }
    cent.push(best.slice()); }
  let groups;
  for (let it = 0; it < 12; it++) {
    groups = cent.map(() => ({ n: 0, p: [0, 0, 0], rgb: [0, 0, 0] }));
    for (const x of px) { let k = 0, bd = 9; cent.forEach((cc, j) => { const dd = dist(cc, x.p); if (dd < bd) { bd = dd; k = j; } });
      const G = groups[k]; G.n++; for (let a = 0; a < 3; a++) { G.p[a] += x.p[a]; G.rgb[a] += x.rgb[a]; } }
    groups.forEach((G, j) => { if (G.n) cent[j] = G.p.map(v => v / G.n); });
  }
  let cl = groups.filter(G => G.n).map(G => ({ n: G.n, p: G.p.map(v => v / G.n), rgb: G.rgb.map(v => Math.round(v / G.n)) }));
  cl.sort((a, b) => b.n - a.n);
  const merged = [];
  for (const x of cl) { const m = merged.find(y => dist(y.p, x.p) < 0.07); if (m) m.n += x.n; else merged.push(x); }
  const chroma = x => Math.hypot(x.p[1], x.p[2]);
  let pick = merged.slice(0, 5);
  const accent = merged.slice(5).find(x => chroma(x) > 0.1 && x.n / px.length > 0.015);
  if (accent && !pick.some(x => chroma(x) > 0.1)) pick[pick.length - 1] = accent;
  pick = pick.filter(x => x.n / px.length > 0.006);
  const tot = pick.reduce((a, x) => a + x.n, 0);
  return pick.map(x => ['#' + x.rgb.map(v => v.toString(16).padStart(2, '0')).join(''), Math.round(x.n / tot * 1000) / 1000]);
}
"""


def refresh():
    from playwright.sync_api import sync_playwright
    CACHE.mkdir(exist_ok=True)
    items = [it for it in projects() if it.get('project_url') and it.get('thumb_url') not in (None, 'None')]
    out = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page()
        page.set_content('<!doctype html><title>bake</title>')
        for it in items:
            url = it['thumb_url']
            f = CACHE / (str(it['id']) + '_' + url.rsplit('/', 1)[-1])
            if not f.exists():
                f.write_bytes(get(url))
            ext = f.suffix.lower().lstrip('.')
            mime = {'jpg': 'jpeg', 'jpeg': 'jpeg', 'png': 'png', 'gif': 'gif', 'webp': 'webp'}.get(ext, 'jpeg')
            src = 'data:image/%s;base64,%s' % (mime, base64.b64encode(f.read_bytes()).decode())
            pal = page.evaluate(JS, src)
            out.append({'title': it['title_no_html'], 'url': it['project_url'], 'colours': pal})
            print(len(out), it['project_url'], ' '.join(c for c, _ in pal))
        b.close()
    TABLE.write_text('[\n' + ',\n'.join(json.dumps(p, ensure_ascii=False, separators=(',', ':')) for p in out) + '\n]\n')
    print(f'src/palettes.json: {len(out)} projects')


if __name__ == '__main__':
    if '--refresh' in sys.argv:
        refresh()
    build()
