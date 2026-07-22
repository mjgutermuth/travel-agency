# Wanderling Design System — sync notes

## Project
- Claude Design project ID: `c3979871-1895-42bc-b149-95e8a0b1160c`
- URL: https://claude.ai/design/p/c3979871-1895-42bc-b149-95e8a0b1160c
- First synced: 2026-06-23

## Component count
284 components (all PascalCase exports including sub-components of compound families).
No authored previews — all are floor cards ("preview not yet authored" placeholder).

## Known caveats

### CSS entry must be manually refreshed after `next build`
`dreamboard/styles-compiled.css` is a copy of the Next.js production CSS output. Its chunk
filename changes after every `npm --prefix dreamboard run build`. Next.js can emit more
than one CSS chunk (e.g. a tiny font-loader chunk alongside the real Tailwind
bundle) — **pick the largest one, not the alphabetically-first one**. Sorting by
name silently grabbed the ~2KB font chunk instead of the ~130KB main bundle for
several rebuilds in a row (caught 2026-07-22, before any bad upload went out —
this file only feeds the design sync, not the live site, so nothing user-facing
broke). To refresh after a build:

```bash
cp dreamboard/.next/static/chunks/$(ls -S dreamboard/.next/static/chunks/*.css | head -1 | xargs basename) dreamboard/styles-compiled.css
```

Sanity-check afterward that it's actually the big one, e.g.
`wc -c dreamboard/styles-compiled.css` should read ~130KB+, not ~2KB. Then re-sync so
the updated CSS reaches Claude Design.

### Adobe Fonts (Typekit) not available in Claude Design
As of the Benguiat/Avenir Next rebrand, `font-sans` and `font-display` are set
directly to `'avenir-next-lt-pro'` and `'itc-benguiat'` — both loaded via an
Adobe Fonts kit `<link>` in `app/layout.tsx` (`use.typekit.net/vif2iuw.css`),
not `next/font/google`. Claude Design previews don't fetch that external
stylesheet, so:
- `font-sans` → falls back to `Georgia, serif` (the family's own CSS fallback)
- `font-display` → falls back to `Georgia, serif`

This is cosmetic only; component structure and token colors are correct.
`runtimeFontPrefixes` in config.json (`avenir-next`, `itc-benguiat`) tells
package-validate.mjs's FONT_MISSING check to treat these as expected-missing
rather than warning.

### Tailwind CSS 4 `@import 'tailwindcss'` not esbuild-bundlable
`dreamboard/app/globals.css` uses the Tailwind CSS 4 `@import 'tailwindcss'` directive which
requires the Tailwind compiler. The sync uses the pre-compiled output from the Next.js
build instead. See the CSS entry note above.

### 284 vs ~55 components
shadcn/ui exports all sub-components as named exports (e.g. `DialogTrigger`,
`CardHeader`, etc.). The converter picks up all 284 PascalCase exports. This is correct
behaviour — the design agent can use all of them.

## Re-sync command
`shape: "package"` with `srcDir: "components/ui"` reads component source
directly — no pre-built dist entry needed, so `--entry` is omitted.

```bash
node .ds-sync/resync.mjs \
  --config .design-sync/config.json \
  --node-modules dreamboard/node_modules \
  --out ./ds-bundle \
  --remote <path to a locally-saved copy of the remote _ds_sync.json>
```

The `--remote` sidecar has to be fetched first via `DesignSync get_file` (only
that tool has auth) and saved to a local file — `resync.mjs` does the
deterministic diff/build/validate/capture chain from there. Omitting `--remote`
treats the project as never-synced and re-uploads everything.
