# Wanderling marketing-site background system

These tokens come from the marketing site's `style.css` (the root `index.html`
landing page) — a separate surface from the `dreamboard` vision-board app. Use
these when generating anything meant to feel like the main site (landing pages,
hero sections, one-off documents), not the app's pink/gold component tokens.

## Gradient background
```css
--bg-gradient: linear-gradient(135deg, #fef6e4 0%, #fff1f8 50%, #e8f4f8 100%);
```
Applied to `body`, with `background-attachment: fixed`.

## Grid overlay
```css
.hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(167, 139, 250, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(167, 139, 250, 0.06) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}
```
Layered directly over the gradient background, absolutely positioned, non-interactive.

## Corner glow blobs (optional, used in the hero specifically)
```css
background: radial-gradient(circle, rgba(255, 107, 157, 0.15) 0%, transparent 70%);
background: radial-gradient(circle, rgba(78, 205, 196, 0.12) 0%, transparent 70%);
```

## Accent colors — the site's gradient family (distinct from the app's pink/gold)
```css
--magenta: #ff6b9d;
--purple:  #a78bfa;
--teal:    #4ecdc4;
```
Used together as a 3-stop gradient for logotype/headline treatments:
```css
background: linear-gradient(135deg, var(--magenta), var(--purple), var(--teal));
```

## Text colors
```css
--text: #1a1a2e;        /* body copy, near-black navy */
--text-muted: #6c757d;  /* secondary/meta text */
```

## Borders & shadow
```css
--border: rgba(0, 0, 0, 0.07);
--shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
--shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.12);
```

## Fonts
```css
--font-display: 'itc-benguiat', Georgia, serif;
--font-body: 'avenir-next-lt-pro', sans-serif;
```
Same Typekit fonts as the app. Not loadable in Claude Design previews (external
stylesheet) — falls back to Georgia serif / generic sans-serif there. Swap in the
real fonts after downloading generated documents.
