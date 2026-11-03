# hallicivelek.com — blobs and the blob-pond

**To update the site:** run `python3 build.py`, check with `python3 tests/test_site.py`, then commit and push.
The add-ons load from GitHub Pages, so the live site picks up the change within about 10 minutes.

**Cargo's Custom HTML** holds `dist/custom-html-short.html` (your own parts plus four script lines). Only paste it again
when your own parts in `src/parts/` change. If GitHub is ever a problem, `dist/custom-html.html` is the old
everything-inline version, which still works on its own.

**To change the random sort:** edit `src/facts.txt` (the format is explained at the top), then build and push.
Preview one sort with `?hc-sort=hands` at the end of a page address.

**To try the pond on its own:** open `src/pond.html` in a browser.

Everything Claude Code needs to know is in `CLAUDE.md`.
