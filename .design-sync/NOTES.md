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
`tool/styles-compiled.css` is a copy of the Next.js production CSS output. Its chunk
filename changes after every `npm --prefix tool run build`. To refresh after a build:

```bash
cp tool/.next/static/chunks/$(ls tool/.next/static/chunks/*.css | head -1 | xargs basename) tool/styles-compiled.css
```

Then re-sync so the updated CSS reaches Claude Design.

### Google Fonts not available in Claude Design
`--font-dm-sans` and `--font-bebas` CSS variables are injected by `next/font/google`
at Next.js runtime. They are undefined in Claude Design previews, so:
- `font-sans` → falls back to `'DM Sans', sans-serif` → then `sans-serif`
- `font-display` → falls back to `'Bebas Neue', sans-serif` → then `sans-serif`

This is cosmetic only; component structure and token colors are correct.

### Tailwind CSS 4 `@import 'tailwindcss'` not esbuild-bundlable
`tool/app/globals.css` uses the Tailwind CSS 4 `@import 'tailwindcss'` directive which
requires the Tailwind compiler. The sync uses the pre-compiled output from the Next.js
build instead. See the CSS entry note above.

### 284 vs ~55 components
shadcn/ui exports all sub-components as named exports (e.g. `DialogTrigger`,
`CardHeader`, etc.). The converter picks up all 284 PascalCase exports. This is correct
behaviour — the design agent can use all of them.

## Re-sync command
```bash
node .ds-sync/package-build.mjs \
  --config .design-sync/config.json \
  --entry tool/dist/index.es.js \
  --node-modules tool/node_modules \
  --out ./ds-bundle
```

Then run the upload sequence (see `/design-sync` skill for incremental path).
