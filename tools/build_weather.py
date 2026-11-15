"""Project weather: the colour table (src/weather.txt) and the add-on built from it.

    python3 tools/build_weather.py --refresh          # fetch every project's first picture and write src/weather.txt
    python3 tools/build_weather.py --refresh --years  # the same, but also work out every year again (drops hand edits)
    python3 tools/build_weather.py                    # src/hc-weather.html + src/weather.txt -> dist/hc-weather.html

Cargo's image host sends no CORS header, so a page can't read a picture's colours. This tool reads them instead,
once, and keeps a small palette per project address in src/weather.txt (in the spirit of src/facts.txt).
The year column can be corrected by hand: a refresh keeps the years already in the file (unless --years) and only
works out years for projects that are new. build.py runs build() and refuses to build on a line it can't read.
--refresh needs Playwright (the same Chromium the tests use decodes the pictures; nothing else to install)."""
import base64, html, json, re, sys, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TABLE = ROOT / 'src' / 'weather.txt'
PLACEHOLDER = '/*WEATHER*/{}'
API = 'https://hallicivelek.com/_api/v0/site/hallicivelek/projects?type=project&offset={}&limit=70'
UA = {'User-Agent': 'Mozilla/5.0 (compatible; site-build)'}
HEAD = """# Project weather: one line per project, by project address (made by tools/build_weather.py --refresh).
#   address  year  loudness  sky  sky2  accent  light   # where the year came from
# year: 4 digits, or - for unknown. Correct it by hand if it is wrong; a refresh keeps it. Before 2005 = pixel sky.
# loudness: how loud the first picture's colours are (above 1.00 = storm). Colours are #rrggbb from that picture.
# A project missing here gets a gentle default sky.
"""
LINE = re.compile(r'([A-Za-z0-9_.-]+)\s+(\d{4}|-)\s+(\d+\.\d+)\s+(#[0-9a-f]{6})\s+(#[0-9a-f]{6})\s+(#[0-9a-f]{6})\s+(#[0-9a-f]{6})(?:\s+#\s.*)?')


def parse(text):
    rows, errors = {}, []
    for no, raw in enumerate(text.splitlines(), 1):
        line = raw.strip()
        if not line or line.startswith('#'):
            continue
        m = LINE.fullmatch(line)
        if not m:
            errors.append(f'line {no}: not "address year loudness #sky #sky2 #accent #light": {line!r}'); continue
        slug, year, loud, *cols = m.groups()
        if slug.lower() in rows:
            errors.append(f'line {no}: {slug} is listed twice'); continue
        rows[slug.lower()] = [int(year) if year != '-' else 0, float(loud)] + [c[1:] for c in cols]
    return rows, errors


def build():
    rows, errors = parse(TABLE.read_text()) if TABLE.exists() else ({}, [])
    if errors:
        sys.exit('src/weather.txt:\n  ' + '\n  '.join(errors))
    src = (ROOT / 'src' / 'hc-weather.html').read_text()
    if PLACEHOLDER not in src:
        sys.exit('src/hc-weather.html: weather placeholder missing')
    (ROOT / 'dist' / 'hc-weather.html').write_text(src.replace(PLACEHOLDER, json.dumps(rows, separators=(',', ':'))))
    old = sum(1 for r in rows.values() if r[0] and r[0] < 2005)
    print(f'dist/hc-weather.html: {len(rows)} projects in the colour table, {old} before 2005, {sum(1 for r in rows.values() if not r[0])} without a year')


# ---------------------------------------------------------------- refresh (needs the network and Playwright)

def get(url):
    url = urllib.parse.quote(url, safe=':/?&=%#~+,;@')   # Cargo has file names with spaces
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return r.read(), r.headers.get('Content-Type', '')


def projects():
    out, off = [], 0
    while True:
        page = json.loads(get(API.format(off))[0])
        out += page
        if len(page) < 70 or off > 700: return out
        off += 70


YEAR = r'(?<!\d)(19[89]\d|20[0-2]\d)(?!\d)'


def find_year(p):
    """(year, where it came from): Cargo's date field, a year in the title, or a dated year in the text
    ("…, 1999." / "(2007)" / "in 2004" / "for 2008"), else the only year the text mentions. Never a range."""
    d = re.search(YEAR, str(p.get('date') or ''))
    if d and str(p.get('date')) != 'False':
        return int(d.group(1)), f'Cargo date "{str(p["date"]).strip()}"'
    t = re.search(YEAR, p.get('title_no_html') or '')
    if t:
        return int(t.group(1)), 'title'
    text = html.unescape(p.get('content_no_html') or '').replace('\r', ' ').replace('\n', ' ')
    for m in re.finditer(YEAR, text):
        before, after = text[max(0, m.start() - 5):m.start()], text[m.end():m.end() + 4]
        if re.search(r'[–-]\s*\d', after) or re.search(r'[–-]\s*$', before):
            continue
        if re.search(r'(,\s|\(|\bin\s|\bfor\s)$', before):
            return int(m.group(1)), 'text "…' + text[max(0, m.start() - 24):m.end() + 1].strip() + '"'
    every = set(re.findall(YEAR, text))
    if len(every) == 1:
        m = re.search(YEAR, text)
        return int(m.group(1)), 'text "…' + text[max(0, m.start() - 24):m.end() + 1].strip() + '" (only year)'
    return 0, 'no year found'


def first_picture(p):
    m = re.search(r'<img\b[^>]*?\ssrc="([^"]+)"', p.get('content') or '')
    return html.unescape(m.group(1)) if m else (p.get('thumb_url') if p.get('thumb_url') not in (None, 'None') else None)


# the same colour reading the approved mockup did in the page (mockups/weather/mock.js: analyse + pickPalette)
ANALYSE = r"""async (src) => {
  const im = new Image(); im.src = src; await im.decode();
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d'); x.drawImage(im, 0, 0, 64, 64); const px = x.getImageData(0, 0, 64, 64).data;
  function hsv(r, g, b) { const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [(h * 60 + 360) % 360, mx ? d / mx : 0, mx / 255, d / 255]; }
  const buckets = {}, hues = new Array(12).fill(0), lum = []; let n = 0, chroma = 0, loudN = 0, colourN = 0;
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] < 128) continue;
    const r = px[i], g = px[i + 1], b = px[i + 2], v = hsv(r, g, b); n++; chroma += v[3];
    if (v[1] > 0.55 && v[2] > 0.45) loudN++;
    if (v[1] > 0.3 && v[2] > 0.25) { colourN++; hues[Math.floor(v[0] / 30) % 12]++; }
    lum.push(0.2126 * r + 0.7152 * g + 0.0722 * b);
    const k = (r >> 5) + ',' + (g >> 5) + ',' + (b >> 5), q = buckets[k] || (buckets[k] = { n: 0, r: 0, g: 0, b: 0 });
    q.n++; q.r += r; q.g += g; q.b += b;
  }
  const mean = lum.reduce((a, b) => a + b, 0) / (lum.length || 1);
  const sd = Math.sqrt(lum.reduce((a, b) => a + (b - mean) * (b - mean), 0) / (lum.length || 1)) / 128;
  const spread = colourN ? hues.filter(h => h / colourN > 0.06).length / 12 : 0;
  const cols = Object.keys(buckets).map(k => { const q = buckets[k]; return { n: q.n / n, c: [q.r / q.n, q.g / q.n, q.b / q.n] }; }).sort((a, b) => b.n - a.n);
  cols.forEach(o => { o.h = hsv(o.c[0], o.c[1], o.c[2]); });
  const loud = 0.45 * (chroma / (n || 1)) / 0.35 + 0.3 * (loudN / (n || 1)) / 0.25 + 0.15 * spread / 0.4 + 0.1 * sd / 0.5;
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  let mid = cols.filter(o => !(o.h[2] > 0.9 && o.h[1] < 0.1) && o.h[2] > 0.12);
  if (!mid.length) mid = cols;
  const tinted = mid.filter(o => o.h[3] > 0.14 && o.n > 0.015);
  if (tinted.length) mid = tinted.concat(mid.filter(o => tinted.indexOf(o) < 0));
  const A = mid[0].c, B = (mid.find(o => dist(o.c, A) > 60) || mid[1] || mid[0]).c;
  const bright = cols.slice(0, 24).sort((x, y) => (y.h[1] * y.h[2]) - (x.h[1] * x.h[2]))[0].c;
  const light = cols.slice(0, 24).sort((x, y) => y.h[2] - x.h[2])[0].c;
  const hex = c => '#' + c.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  return { loud, cols: [hex(A), hex(B), hex(bright), hex(light)] };
}"""


def refresh(redo_years=False):
    from playwright.sync_api import sync_playwright
    kept = {}
    if TABLE.exists() and not redo_years:
        for line in TABLE.read_text().splitlines():
            m = LINE.fullmatch(line.strip())
            if m: kept[m.group(1).lower()] = (m.group(2), line.split('   # ', 1)[1].strip() if '   # ' in line else '')
    ps = [p for p in projects() if p.get('project_url')]
    lines, missing = [], []
    with sync_playwright() as pw:
        b = pw.chromium.launch(); page = b.new_page()
        for p in ps:
            slug, src = p['project_url'], first_picture(p)
            try:
                data, ctype = get(src)
                url = 'data:' + (ctype.split(';')[0] or 'image/jpeg') + ';base64,' + base64.b64encode(data).decode()
                r = page.evaluate(ANALYSE, url)
            except Exception as e:
                missing.append(f'{slug}: {e}'); continue
            year, why = find_year(p)
            ystr = str(year) if year else '-'
            if slug.lower() in kept:   # the file's year (maybe Halli's correction) and its note stay
                ystr, why = kept[slug.lower()][0], kept[slug.lower()][1] or why
            lines.append(f'{slug}  {ystr}  {r["loud"]:.2f}  ' + '  '.join(r['cols']) + f'   # {why}')
        b.close()
    TABLE.write_text(HEAD + '\n'.join(lines) + '\n')
    print(f'src/weather.txt: {len(lines)} of {len(ps)} projects' + (' — no picture for: ' + '; '.join(missing) if missing else ''))


if __name__ == '__main__':
    if '--refresh' in sys.argv:
        refresh('--years' in sys.argv)
    build()
