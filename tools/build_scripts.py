"""The short version of Cargo's Custom HTML, with the add-ons served from GitHub Pages:
  dist/js/hc-*.js            each add-on as a plain script file (its <style>, if any, is added by the script)
  dist/custom-html-short.html  Halli's own parts around four <script src> lines
Run build_facts.py and build_pond_module.py first (build.py does all of it)."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://hallicivelek.github.io/hallicivelek-site/dist/js/'
ADDONS = [ROOT / 'dist' / 'hc-columns.html', ROOT / 'src' / 'hc-nav-active.html', ROOT / 'src' / 'hc-blobs.html', ROOT / 'dist' / 'hc-pond.html']
HEADER = """<!-- ================================================================
     hallicivelek.com — custom add-ons, loaded from GitHub (github.com/hallicivelek/hallicivelek-site)
     1. Two-column fix      projects across two columns, in a random order of the day
     2. Current page in nav  blue + aria-current on every page
     3. Floating blobs      the background blobs, faces, pause button (not on the blob-pond page)
     4. The blob-pond       builds the pond on the page whose address contains "blob-pond"
     Each is its own script, so if one ever breaks (or GitHub is down) the others and the site keep working.
     ================================================================ -->
"""
TOP_NOTE = """<!-- Complete Custom HTML for hallicivelek.com (short version: the add-ons load from GitHub Pages).
     Replace everything in Custom HTML with this whole file. -->
"""


def to_js(path):
    html = re.sub(r'<!--.*?-->', '', path.read_text(), flags=re.S)
    styles = re.findall(r'<style>(.*?)</style>', html, re.S)
    scripts = re.findall(r'<script>(.*?)</script>', html, re.S)
    rest = re.sub(r'<(style|script)>.*?</\1>', '', html, flags=re.S).strip()
    if rest or not scripts:
        sys.exit(f'{path.name}: only <style> and <script> blocks can become a script file')
    js = f'/* {path.stem} for hallicivelek.com: built from {path.relative_to(ROOT)} by build.py, do not edit here */\n'
    if styles:
        js += ('(function () { var s = document.createElement("style"); s.textContent = '
               + json.dumps('\n'.join(styles), ensure_ascii=False) + '; document.head.appendChild(s); })();\n')
    return js + '\n'.join(s.strip('\n') for s in scripts) + '\n'


def build(base=BASE):
    out_dir = ROOT / 'dist' / 'js'
    out_dir.mkdir(exist_ok=True)
    tags = []
    for p in ADDONS:
        (out_dir / (p.stem + '.js')).write_text(to_js(p))
        tags.append(f'<script src="{base}{p.stem}.js"></script>')
    out = (TOP_NOTE + (ROOT / 'src' / 'parts' / 'before.html').read_text().rstrip() + '\n\n'
           + HEADER + '\n'.join(tags) + '\n\n'
           + (ROOT / 'src' / 'parts' / 'after.html').read_text().rstrip() + '\n')
    (ROOT / 'dist' / 'custom-html-short.html').write_text(out)
    print(f'dist/custom-html-short.html: {len(out.encode())} bytes, scripts in dist/js/')
    return out


if __name__ == '__main__':
    build()
