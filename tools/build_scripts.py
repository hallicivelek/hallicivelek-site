"""The short version of Cargo's Custom HTML, with the add-ons served from GitHub Pages:
  dist/js/hc-*.js            each add-on as a plain script file (its <style>, if any, is added by the script)
  dist/custom-html-short.html  Halli's own parts around a small inline loader for those files
The loader is plain inline JavaScript (inline scripts are what Cargo is known to run) and has no backslashes,
so it survives being copied in and out of Cargo's editor, which has stripped backslashes before.
Run build_facts.py and build_pond_module.py first (build.py does all of it)."""
import json, re, sys, time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://hallicivelek.github.io/hallicivelek-site/dist/js/'
ADDONS = [ROOT / 'dist' / 'hc-columns.html', ROOT / 'src' / 'hc-nav-active.html', ROOT / 'src' / 'hc-blobs.html', ROOT / 'dist' / 'hc-pond.html',
          ROOT / 'src' / 'hc-eyes.html', ROOT / 'src' / 'hc-playthings.html', ROOT / 'src' / 'hc-retro.html', ROOT / 'src' / 'hc-music.html', ROOT / 'src' / 'hc-fold.html', ROOT / 'src' / 'hc-debug.html']
# The files the loader in Cargo's Custom HTML names (pasted 2026-11-03). Add-ons added later are loaded by the last
# of these, so a new add-on never needs a new paste. A newer loader may name them too: each add-on runs only once.
IN_CARGO = ['hc-columns', 'hc-nav-active', 'hc-blobs', 'hc-pond']
HEADER = """<!-- ================================================================
     hallicivelek.com — custom add-ons, loaded from GitHub (github.com/hallicivelek/hallicivelek-site)
     1. Two-column fix      projects across two columns, in a random order of the day
     2. Current page in nav  blue + aria-current on every page
     3. Floating blobs      the background blobs, faces, pause button (not on the blob-pond page)
     4. The blob-pond       builds the pond on the page whose address contains "blob-pond"
     5. Eyes                Halli's portrait on the info + contact page looks at you
     6. Playthings          the four project cards on the playthings page
     7. 1999 mode           Netscape or GeoCities, from the award under the grid or the overlords
     8. Music               the music page: Wanton Boys Club, remixes, mixes that play in place
     9. Fold                the Romantika cover fold as a video with a "see the magic" button
     Each is its own script file, so if one ever breaks (or GitHub is down) the others and the site keep working.
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


def loader(base):
    """Adds the four script files in order (async = false keeps the order, like plain script tags)."""
    names = ', '.join(f"'{p.stem}'" for p in ADDONS)
    js = f"""<script>
(function () {{
  var base = '{base}';
  [{names}].forEach(function (name) {{
    var s = document.createElement('script');
    s.src = base + name + '.js';
    s.async = false;
    document.head.appendChild(s);
  }});
}})();
</script>"""
    assert chr(92) not in js
    return js


def later_loader(names):
    """Appended to the last file Cargo's loader names: loads the add-ons added since, from the same folder."""
    return ('/* add-ons added after the Custom HTML was pasted, loaded from the same folder */\n'
            '(function () { var me = document.currentScript; if (!me || !me.src) return;\n'
            '  ' + json.dumps(names) + '.forEach(function (name) {\n'
            '    var s = document.createElement("script"); s.src = new URL(name + ".js", me.src).href; s.async = false;\n'
            '    document.head.appendChild(s); }); })();\n')


def build(base=BASE):
    out_dir = ROOT / 'dist' / 'js'
    out_dir.mkdir(exist_ok=True)
    later = [p.stem for p in ADDONS if p.stem not in IN_CARGO]
    stamp = time.strftime('%Y-%m-%d %H:%M')   # shown by ?hc-debug, to see whether a phone has the newest files
    for p in ADDONS:
        js = to_js(p) + f'window.__hcBuild = {json.dumps(stamp)};\n'
        if p.stem == IN_CARGO[-1] and later:
            js += later_loader(later)
        (out_dir / (p.stem + '.js')).write_text(js)
    out = (TOP_NOTE + (ROOT / 'src' / 'parts' / 'before.html').read_text().rstrip() + '\n\n'
           + HEADER + loader(base) + '\n\n'
           + (ROOT / 'src' / 'parts' / 'after.html').read_text().rstrip() + '\n')
    (ROOT / 'dist' / 'custom-html-short.html').write_text(out)
    print(f'dist/custom-html-short.html: {len(out.encode())} bytes, scripts in dist/js/')
    return out


if __name__ == '__main__':
    build()
