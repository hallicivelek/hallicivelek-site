"""Renders the palette piano's new basses and the strips that were changed 2026-11-18 to WAV files (OfflineAudioContext, in the stand-in page),
so they can be listened to:   python3 tools/render_palette_sounds.py [folder]
Default folder: ../mockups/palette-piano/sounds/ (jazz-bass.wav, house-bass.wav, strip-<slug>.wav, strip-<slug>-recording-only.wav for chord strips).
Prints peak and rms of each, next to the loudest unchanged strip."""
import base64, json, struct, sys, wave
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / 'tests')); sys.path.insert(0, str(ROOT / 'tools'))
import test_site, build_scripts, tempfile, threading, http.server, functools
from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / 'mockups' / 'palette-piano' / 'sounds'
OUT.mkdir(parents=True, exist_ok=True)


def serve():
    site = Path(tempfile.mkdtemp())
    (site / 'js').mkdir()
    for f in (ROOT / 'dist' / 'js').glob('*.js'): (site / 'js' / f.name).write_text(f.read_text())
    (site / 'assets' / 'palette-piano').mkdir(parents=True)
    for f in (ROOT / 'assets' / 'palette-piano').glob('*.mp3'): (site / 'assets' / 'palette-piano' / f.name).write_bytes(f.read_bytes())
    (site / 'paco-benovo').mkdir()
    (site / 'paco-benovo' / 'index.html').write_text(test_site.PAGE.replace('ADDONS', build_scripts.loader('/js/')).replace('<p>PAGE CONTENT</p>', '<p>palette piano</p>'))
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Q, directory=str(site)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return 'http://127.0.0.1:%d' % srv.server_port


def wav(path, d):
    ch = [base64.b64decode(c) for c in d['ch']]
    n = len(ch[0]) // 2
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(len(ch)); w.setsampwidth(2); w.setframerate(d['sr'])
        w.writeframes(b''.join(b''.join(c[2 * i:2 * i + 2] for c in ch) for i in range(n)))


JS = """async (job) => {
  const P = window.PalettePiano, plans = P.plans();
  async function dec(name) { const r = await fetch('/assets/palette-piano/' + name + '.mp3'); return new OfflineAudioContext(1, 1, 44100).decodeAudioData(await r.arrayBuffer()); }
  const cache = {};
  async function need(pl) { for (const n of [].concat(pl.chord ? pl.chord.names : [], pl.say ? [pl.say.name] : [])) if (!cache[n]) cache[n] = await dec(n); }
  function put(ctx, master, name, at, gain, off, len, fade) { const info = PPDrums._voiceInfo(name), s = ctx.createBufferSource(), g = ctx.createGain(), g0 = gain * info.lvl;
    const left = info.dur - off, L = len ? Math.min(len, left) : left, fo = Math.min(fade || 0.02, L / 2);
    g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(g0, at + 0.008); g.gain.setValueAtTime(g0, at + L - fo); g.gain.linearRampToValueAtTime(0, at + L);
    s.buffer = cache[name]; s.connect(g); g.connect(master); s.start(at, info.base + off, L + 0.02); }
  const add = (ctx, master, t0, pl) => { if (pl.layers) { const s16 = pl.unit * (pl.unit >= 90 ? 1 : 2); pl.layers.base.forEach(b => put(ctx, master, pl.chord.names[0], t0 + b.s * s16 / 1000, b.gain, pl.chord.offset, b.len, b.fade)); }
    if (pl.say) put(ctx, master, pl.say.name, t0 + pl.say.at / 1000, pl.layers ? pl.layers.hit : 0.45, 0, null, null); };
  function pack(buf) { const ch = []; let pk = 0, ss = 0, n = 0;
    for (let c = 0; c < buf.numberOfChannels; c++) { const d = buf.getChannelData(c), i16 = new Int16Array(d.length);
      for (let i = 0; i < d.length; i++) { const x = Math.max(-1, Math.min(1, d[i])); i16[i] = x * 32767; const a = Math.abs(d[i]); if (a > pk) pk = a; ss += a * a; n++; }
      let bin = ''; const u = new Uint8Array(i16.buffer); for (let i = 0; i < u.length; i += 8192) bin += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); ch.push(btoa(bin)); }
    return { ch, sr: buf.sampleRate, peak: pk, rms: Math.sqrt(ss / n) }; }
  if (job.kind === 'notes') return pack(await P.renderNotes(job.list, job.secs));
  if (job.kind === 'strip') { const pl = plans[job.i]; await need(pl); return pack(await P.renderStrip(job.i, job.secs, add)); }
  if (job.kind === 'only') { const pl = plans[job.i]; await need(pl); const oc = new OfflineAudioContext(2, 44100 * job.secs, 44100), m = oc.createGain(); m.gain.value = 0.7; m.connect(oc.destination);
    add(oc, m, 0.05, Object.assign({}, pl, { say: null })); return pack(await oc.startRendering()); }
  if (job.kind === 'info') return plans.map((p, i) => ({ i, slug: document.querySelectorAll('#hc-pp a.hc-pp-tag')[i].getAttribute('href').slice(1), layers: !!p.layers, bass2: !!p.bass2, chord: !!p.chord, total: p.total, recipe: p.layers && p.layers.recipe }));
}"""

base = serve()
with sync_playwright() as pw:
    b = pw.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
    pg = b.new_page(viewport={'width': 1300, 'height': 900})
    pg.goto(base + '/paco-benovo/'); pg.wait_for_timeout(1500)
    pg.hover('#hc-pp li.hc-pp-k'); pg.wait_for_function('() => window.__hcPaletteDrums.loaded() === 20', timeout=15000)
    info = pg.evaluate(JS, {'kind': 'info'})
    jobs = []
    # the basses: a walking line (D hirajoshi, 100 bpm, quarters) and a house pattern (118 bpm, sixteenths)
    q = 0.6; walk = [38, 41, 45, 40, 40, 45, 46, 41, 41, 38, 45, 46, 45, 50, 46, 38]
    pg_ = [{'voice': 'jazzbass', 'midi': m, 'vel': 0.85 if k % 4 == 0 else 0.68, 'len': q * 0.85, 't': 0.1 + k * q, 'fromMidi': walk[k - 1] if k else None} for k, m in enumerate(walk)]
    r = pg.evaluate(JS, {'kind': 'notes', 'list': pg_, 'secs': 0.1 + 16 * q + 1.2}); wav(OUT / 'jazz-bass.wav', r); print('jazz-bass', round(r['peak'], 3), round(r['rms'], 4))
    s16 = 60 / 118 / 4; pats = ['l.hl..h.l.hl..hh', '..h...h...h...h.', 'l.h.l.hl..h.l.h.', 'l..hl..hl..hl.h.']; roots = [38, 38, 41, 40]
    hb = []
    for bar in range(4):
        for k, c in enumerate(pats[bar]):
            if c != '.': hb.append({'voice': 'housebass', 'midi': roots[bar] + (12 if c == 'h' else 0), 'vel': 0.88 if c == 'l' else 0.74, 'len': s16 * (0.85 if c == 'h' else 1.05), 't': 0.1 + (bar * 16 + k) * s16})
    r = pg.evaluate(JS, {'kind': 'notes', 'list': hb, 'secs': 0.1 + 64 * s16 + 1}); wav(OUT / 'house-bass.wav', r); print('house-bass', round(r['peak'], 3), round(r['rms'], 4))
    # loudness of everything that was not changed (the loudest of them is the ceiling) and of the changed ones
    ceil = {'peak': 0, 'rms': 0}
    for x in info:
        if x['layers'] or x['bass2'] or (x['chord']): continue
        r = pg.evaluate(JS, {'kind': 'strip', 'i': x['i'], 'secs': x['total'] / 1000 + 2.5})
        ceil['peak'] = max(ceil['peak'], r['peak']); ceil['rms'] = max(ceil['rms'], r['rms'])
    print('loudest unchanged strip: peak %.3f, rms %.4f' % (ceil['peak'], ceil['rms']))
    for x in info:
        if not (x['layers'] or x['bass2']): continue
        secs = 6.0 if x['layers'] else x['total'] / 1000 + 2.5
        r = pg.evaluate(JS, {'kind': 'strip', 'i': x['i'], 'secs': secs}); wav(OUT / ('strip-%s.wav' % x['slug']), r)
        line = '%-26s %-12s peak %.3f rms %.4f' % (x['slug'], x['recipe'] or 'bass', r['peak'], r['rms'])
        if x['layers']:
            o = pg.evaluate(JS, {'kind': 'only', 'i': x['i'], 'secs': secs}); wav(OUT / ('strip-%s-recording-only.wav' % x['slug']), o)
            line += '   (recording alone: peak %.3f rms %.4f)' % (o['peak'], o['rms'])
        print(line)
    b.close()
