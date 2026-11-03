"""Rebuild everything Cargo needs:  python3 build.py
Short version (add-ons on GitHub Pages): push to GitHub; Custom HTML is dist/custom-html-short.html.
Long version (everything inline): paste dist/custom-html.html over the whole of Cargo's Custom HTML."""
import re, shutil, subprocess, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent / 'tools'))
import build_facts, build_pond_module, build_custom_html, build_scripts

build_facts.build()
build_pond_module.build()
build_custom_html.build()
build_scripts.build()

# syntax-check every inline script if Node is available
out = (Path(__file__).resolve().parent / 'dist' / 'custom-html.html').read_text()
blocks = re.findall(r'<script(?:\s[^>]*)?>(.*?)</script>', out, re.S)
if shutil.which('node'):
    bad = 0
    for i, js in enumerate(blocks):
        r = subprocess.run(['node', '-e', 'new Function(require("fs").readFileSync(0, "utf8"))'], input=js, text=True, capture_output=True)
        if r.returncode:
            bad += 1; print(f'  script block {i}: SYNTAX ERROR\n{r.stderr[:400]}')
    for f in sorted((Path(__file__).resolve().parent / 'dist' / 'js').glob('*.js')):
        r = subprocess.run(['node', '--check', str(f)], text=True, capture_output=True)
        if r.returncode:
            bad += 1; print(f'  {f.name}: SYNTAX ERROR\n{r.stderr[:400]}')
    print(f'{len(blocks)} script blocks and the dist/js files, {"all OK" if not bad else str(bad) + " with errors"}')
else:
    print(f'{len(blocks)} script blocks (install Node to syntax-check them)')
