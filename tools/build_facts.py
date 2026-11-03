"""Turns src/facts.txt into the HC_FACTS list inside the two-column script:
src/hc-columns.html -> dist/hc-columns.html. Refuses to build if facts.txt has a line it can't read."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PLACEHOLDER = '/*FACTS*/[]'


def parse(text):
    sorts, cur, errors = [], None, []
    for no, raw in enumerate(text.splitlines(), 1):
        line = raw.strip()
        if not line or line.startswith('#'):
            continue
        m = re.fullmatch(r'\[(.+)\]', line)
        if m:
            cur = {'name': m.group(1).strip(), 'label': '', 'badge': '', 'badge1': '', 'low': False, 'items': {}, 'badges': {}}
            sorts.append(cur); continue
        if cur is None:
            errors.append(f'line {no}: comes before the first [name]'); continue
        m = re.fullmatch(r'order:\s*(lowest|highest) first', line)
        if m:
            cur['low'] = m.group(1) == 'lowest'; continue
        m = re.fullmatch(r'(label|badge 1|badge):\s*(.*)', line)
        if m:
            cur[{'label': 'label', 'badge': 'badge', 'badge 1': 'badge1'}[m.group(1)]] = m.group(2); continue
        m = re.fullmatch(r'([A-Za-z0-9-]+)(?::\s*(\d+)(?:\s+(.+))?)?', line)
        if m:
            cur['items'][m.group(1)] = int(m.group(2)) if m.group(2) else True
            if m.group(3): cur['badges'][m.group(1)] = m.group(3)
            continue
        errors.append(f'line {no}: not a project address, label or badge: {line!r}')
    for s in sorts:
        if not s['label']: errors.append(f'[{s["name"]}] has no label')
        nums = {type(v) for v in s['items'].values()}
        if len(nums) > 1: errors.append(f'[{s["name"]}] mixes projects with and without numbers')
        s['count'] = int in nums
    return sorts, errors


def build():
    sorts, errors = parse((ROOT / 'src' / 'facts.txt').read_text())
    if errors:
        sys.exit('src/facts.txt:\n  ' + '\n  '.join(errors))
    src = (ROOT / 'src' / 'hc-columns.html').read_text()
    if PLACEHOLDER not in src:
        sys.exit('src/hc-columns.html: facts placeholder missing')
    out = src.replace(PLACEHOLDER, json.dumps(sorts, ensure_ascii=False, separators=(',', ':')))
    (ROOT / 'dist' / 'hc-columns.html').write_text(out)
    usable = [s['name'] for s in sorts if len(s['items']) >= 2]
    print(f'dist/hc-columns.html: {len(sorts)} sorts, {len(usable)} with 2+ projects ({", ".join(usable)})')


if __name__ == '__main__':
    build()
