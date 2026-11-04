"""Turns the standalone pond (src/pond.html) into a Cargo-safe script (dist/hc-pond.html).

On hallicivelek.com the pond lives inside Cargo's page, so everything is fenced:
- every id gets the prefix hcp-, every class name too (Cargo has its own .caption etc.)
- every CSS rule is scoped under #hc-pond; page-wide rules become html.hc-pond-on rules
- @media blocks keep their conditions; CSS comments are stripped first
- the script only builds the pond on a page whose address contains "blob-pond"
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'src' / 'pond.html'
OUT = ROOT / 'dist' / 'hc-pond.html'

IDS = ['blobDots', 'blobPanel', 'blobSr', 'blobsToggle', 'caption', 'chips', 'fewer', 'howMany', 'more', 'pause', 'pond', 'volume', 'wake', 'wakeBtn',
       'scalePick', 'surprise', 'scaleSr', 'capWhere', 'capScaleWrap', 'capScale', 'capScaleName', 'capTime', 'blobClose']
CLASSES = ['caption', 'tray', 'chip', 'tool', 'dot', 'voice', 'volume', 'gap', 'panel', 'kinds', 'count', 'dots', 'howmany', 'sr', 'wake', 'card', 'nw',
           'scale', 'pick', 'scaleLink', 'close']


def build():
    s = SRC.read_text()
    css = re.search(r'<style>(.*?)</style>', s, re.S).group(1)
    markup = re.search(r'<body>(.*?)<script>', s, re.S).group(1).strip()
    js = re.search(r'<script>(.*?)</script>', s, re.S).group(1)

    # ---- markup: prefix ids, aria-controls and label targets ----
    for i in IDS:
        markup = markup.replace(f'id="{i}"', f'id="hcp-{i}"').replace(f'aria-controls="{i}"', f'aria-controls="hcp-{i}"').replace(f'for="{i}"', f'for="hcp-{i}"')

    # ---- js: prefix ids (lookups and ids written inside the script's own HTML) ----
    for i in IDS:
        js = js.replace(f"getElementById('{i}')", f"getElementById('hcp-{i}')")
        js = js.replace(f'id="{i}"', f'id="hcp-{i}"').replace(f'for="{i}"', f'for="hcp-{i}"')
    # the night class goes on the pond, not on Cargo's page
    old = "document.documentElement.classList.toggle('night', mood.night)"
    assert js.count(old) == 1, 'night toggle not found'
    js = js.replace(old, "document.getElementById('hc-pond').classList.toggle('night', mood.night)")
    # hooks so the loader can put the pond to sleep if Cargo ever navigates away without reloading
    old = "  requestAnimationFrame(frame);\n})();"
    assert js.count(old) == 1, 'end of pond script not found'
    js = js.replace(old,
        "  requestAnimationFrame(frame);\n"
        "  window.__hcPondSleep = function () { if (!paused) { paused = true; drawPause(); } if (ctx && ctx.suspend) ctx.suspend(); };\n"
        "  window.__hcPondWake = function () { if (ctx && ctx.resume) ctx.resume(); };\n"
        "})();")

    # ---- class names: markup, script and styles ----
    def prefix_class_attr(m):
        return 'class="' + ' '.join('hcp-' + c if c in CLASSES else c for c in m.group(1).split()) + '"'
    markup = re.sub(r'class="([^"]*)"', prefix_class_attr, markup)
    for old, new in [("bt.className = 'chip'", "bt.className = 'hcp-chip'"), ('<span class="dot"', '<span class="hcp-dot"'), ('<span class="voice">', '<span class="hcp-voice">')]:
        assert js.count(old) == 1, old
        js = js.replace(old, new)
    js = re.sub(r'class="([^"]*)"', prefix_class_attr, js)
    for c in CLASSES:
        css = re.sub(r'\.' + c + r'\b(?![-\w])', '.hcp-' + c, css)

    # ---- css: fence everything inside #hc-pond ----
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)                # comments out first: they only confuse the selector handling

    def fence_sel(sel):
        parts = []
        for p in sel.split(','):
            p = p.strip()
            for i in IDS:
                p = re.sub(r'#' + i + r'\b', '#hcp-' + i, p)
            parts.append('#hc-pond ' + p)
        return ', '.join(parts)

    media_out = []
    def take_media(m):                                        # @media blocks keep their condition (dark mode is handled below)
        cond, inner = m.group(1).strip(), m.group(2)
        if 'prefers-color-scheme' in cond:
            return m.group(0)
        rules = [fence_sel(' '.join(sel.split())) + ' {' + body + '}' for sel, body in re.findall(r'([^{}]+)\{([^{}]*)\}', inner)]
        media_out.append('@media ' + cond + ' { ' + ' '.join(rules) + ' }')
        return ''
    css = re.sub(r'@media([^{]+)\{((?:[^{}]*\{[^{}]*\})+)\s*\}', take_media, css)

    out = []
    for sel, body in re.findall(r'([^{}]+)\{([^{}]*)\}', css):
        sel = ' '.join(sel.split())
        if sel == ':root':
            out.append('#hc-pond {' + re.sub(r'padding-(top|bottom):[^;]+;\s*', '', body) + '}')
        elif sel == ':root:not([data-theme="light"])':
            out.append('@media (prefers-color-scheme: dark) { #hc-pond {' + body + '} }')
        elif sel == ':root[data-theme="dark"], :root.night':
            out.append('#hc-pond.night {' + body + '}')
        elif sel == 'html':
            continue                                          # scroll padding: not ours to set on Cargo's page
        elif sel == 'html, body':
            out.append('html.hc-pond-on, html.hc-pond-on body { overflow: hidden; }')
        elif sel == 'body':
            out.append('#hc-pond { position: fixed; top: 0; left: 0; right: 0; height: 100vh; height: 100lvh; z-index: 999; text-align: left; line-height: normal;' + body + '}')
        else:
            out.append(fence_sel(sel) + ' {' + body + '}')
    out.extend(media_out)                                     # media rules last, so they win where they apply
    fenced = '\n'.join(out)
    # the caption sits under Cargo's header; the header and its active link keep the site pink
    fenced = fenced.replace('top: calc(18px + env(safe-area-inset-top, 0px));', 'top: calc(var(--hdr, 0px) + 14px);')
    assert 'var(--hdr' in fenced, 'caption position rule not found'
    fenced += """
#hc-pond *, #hc-pond *::before, #hc-pond *::after { box-sizing: border-box; }
#hc-pond button { letter-spacing: normal; text-transform: none; }
#hc-pond h1, #hc-pond p, #hc-pond button, #hc-pond label, #hc-pond input, #hc-pond span, #hc-pond strong { font-family: inherit; }
#hc-pond h1 { color: var(--ink); text-transform: none; }
html.hc-pond-on .site_header, html.hc-pond-on .mobile_site_header, html.hc-pond-on .link_active a { background-color: #F3DCDF !important; }
html.hc-pond-on .hc-blobs, html.hc-pond-on .hc-pause { display: none !important; }
html.hc-pond-on.hc-pond-preview .site_header, html.hc-pond-on.hc-pond-preview .mobile_site_header { display: none !important; }
html.hc-pond-on.hc-pond-preview #hc-pond { z-index: 2147483000; }
html.hc-pond-on.hc-pond-preview #hc-pond #hcp-wake, html.hc-pond-on.hc-pond-preview #hc-pond .hcp-tray, html.hc-pond-on.hc-pond-preview #hc-pond #hcp-caption { display: none !important; }
"""
    for line in fenced.split('\n'):                           # anything not fenced would leak into Cargo's page
        if '{' in line and not line.lstrip().startswith(('#hc-pond', '@media', 'html.hc-pond-on')):
            raise SystemExit('UNFENCED CSS: ' + line[:80])

    module = (Path(__file__).resolve().parent / 'pond_loader_template.js.html').read_text()
    module = module.replace('<<CSS>>', repr(fenced)).replace('<<MARKUP>>', repr(markup)).replace('<<JS>>', js)
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(module)
    print(f'{OUT.relative_to(ROOT)}: {len(module.encode())} bytes | {len(out)} css rules fenced')


if __name__ == '__main__':
    build()
