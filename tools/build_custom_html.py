"""Assembles the complete Custom HTML for Cargo (dist/custom-html.html):
Halli's own parts (src/parts/before.html, after.html) around the four add-ons, in this order:
  before.html  (Cargo filter script, StatCounter, Typekit font link)
  hc-columns   (two-column fix and random sort, from dist/ — run build_facts.py first)
  hc-nav-active (current page in nav)
  hc-blobs     (background blobs; not on the blob-pond page)
  hc-pond      (the blob-pond, from dist/ — run build_pond_module.py first)
  after.html   (mobile menu fixes)
Also writes dist/hc-site.html: just the four add-ons, for reference."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ADDONS = [ROOT / 'dist' / 'hc-columns.html', ROOT / 'src' / 'hc-nav-active.html', ROOT / 'src' / 'hc-blobs.html', ROOT / 'dist' / 'hc-pond.html', ROOT / 'src' / 'hc-eyes.html']
MIDDLE_HEADER = """<!-- ================================================================
     hallicivelek.com — custom add-ons
     1. Two-column fix      projects across two columns, in a random order of the day (facts.txt)
     2. Current page in nav  blue + aria-current on every page
     3. Floating blobs      the background blobs, faces, pause button (not on the blob-pond page)
     4. The blob-pond       builds the pond on the page whose address contains "blob-pond"
     5. Eyes                Halli's portrait on the info + contact page looks at you
     Each is its own script block, so if one ever breaks the others keep working.
     ================================================================ -->
"""
TOP_NOTE = """<!-- Complete Custom HTML for hallicivelek.com.
     Replace everything in Custom HTML with this whole file. -->
"""


def build():
    addons = '\n'.join(p.read_text().rstrip() + '\n' for p in ADDONS)
    out = (TOP_NOTE + (ROOT / 'src' / 'parts' / 'before.html').read_text().rstrip() + '\n\n'
           + MIDDLE_HEADER + addons + '\n'
           + (ROOT / 'src' / 'parts' / 'after.html').read_text().rstrip() + '\n')
    (ROOT / 'dist' / 'custom-html.html').write_text(out)
    (ROOT / 'dist' / 'hc-site.html').write_text(MIDDLE_HEADER + addons)
    print(f'dist/custom-html.html: {len(out.encode())} bytes')


if __name__ == '__main__':
    build()
