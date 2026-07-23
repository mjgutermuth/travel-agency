# Wanderling Design System — conventions

## 1. No wrapper required

These components need no root provider. They work standalone:

```jsx
import { Button } from 'travel-vision-board';

<Button variant="default" size="default">Book Now</Button>
```

Dark mode: add `class="dark"` to a parent element.

## 2. Styling idiom — Tailwind CSS 4 utility classes + CSS tokens

**No custom CSS classes.** Style via Tailwind utility classes using the design token vocabulary:

| Token family | Light value | Usage |
|---|---|---|
| `bg-primary` / `text-primary-foreground` | warm pink `#e934be` | primary CTAs |
| `bg-secondary` / `text-secondary-foreground` | warm off-white `#f5f1ea` | secondary surfaces |
| `bg-accent` / `text-accent-foreground` | golden amber `#ff8b25` | accents, highlights |
| `bg-muted` / `text-muted-foreground` | soft neutral | muted labels, placeholders |
| `bg-background` / `text-foreground` | warm white / near-black | page/body |
| `bg-card` / `text-card-foreground` | pure white | card surfaces |
| `bg-destructive` | vivid red | danger/error states |
| `border-border` | translucent neutral | dividers, card borders |
| `border-input` | input border | form field borders |
| `ring-ring` | primary-tinted ring | focus outlines |
| `rounded-*` | base `--radius: 9999px` (pill) | `rounded-sm/md/lg/xl` compute from it |

For the agent's own layout glue (wrappers, grids, spacers), use standard Tailwind utilities: `flex`, `grid`, `gap-*`, `p-*`, `space-y-*`, etc.

## 3. Component API patterns

**Variant props via CVA.** Components like `Button`, `Badge`, `Alert` use `variant` + `size` props — never construct class names manually:

```jsx
<Button variant="default" size="lg">Book Trip</Button>
<Button variant="outline" size="sm">View Details</Button>
<Badge variant="secondary">Trending</Badge>
<Alert variant="destructive">…</Alert>
```

**`className` is always supported** for one-off overrides via the `cn()` merge pattern.

**`asChild` prop** (Radix Slot pattern) on `Button` and `Badge` renders as the child element instead:
```jsx
<Button asChild><a href="/book">Reserve</a></Button>
```

**Compound components.** Many components are families — compose the named sub-parts:
- `Card` → `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`
- `Dialog` → `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`
- `Tabs` → `TabsList`, `TabsTrigger`, `TabsContent`
- `Table` → `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`
- `Select` → `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`
- `Form` → `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`
- `Accordion` → `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- `NavigationMenu` → `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`

## 4. Where the truth lives

Read per-component docs at `_ds/<project>/components/general/<Name>/<Name>.prompt.md`.  
All styles are reachable from `styles.css` (imports `_ds_bundle.css` which ships every utility and token used by these components).

## 5. Idiomatic build example

```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge } from 'travel-vision-board';

function DestinationCard({ name, region, description }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{name}</CardTitle>
          <Badge variant="secondary">{region}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Explore</Button>
      </CardFooter>
    </Card>
  );
}
```

> **Font note**: `font-sans` maps to Avenir Next (Adobe Fonts/Typekit, loaded at runtime). `font-display` maps to ITC Benguiat (warm editorial serif, used for headlines/titles). Both are loaded via an Adobe Fonts kit link, not bundled — in Claude Design they fall back to `Georgia, serif`.

## 6. Marketing-site background system — READ THIS for any document, page, or hero banner

**The tokens in section 2 are for the `dreamboard` app's components only** (buttons,
cards, form fields). They are a *different, narrower* palette from the main marketing
site's own background system. If you are generating a document, landing page, hero
banner, checklist, or anything meant to look like **wanderling.world itself** — not an
in-app widget — use the values below instead of (or layered under) the section 2 token
table. Do not substitute a plain two-stop pink→orange gradient; it is visibly wrong.

**Full reference:** see `guidelines/BrandBackground.html` (visual swatch card, group
"Brand" in this project) and `guidelines/brand-background.md` (exact CSS) for complete
detail. Key values inline here so they aren't missed:

```css
/* Page/hero background — a 3-stop diagonal, NOT a 2-stop pink-to-orange gradient */
--bg-gradient: linear-gradient(135deg, #fef6e4 0%, #fff1f8 50%, #e8f4f8 100%);

/* Faint violet grid overlay on top of the gradient, always present in the hero */
background-image:
  linear-gradient(rgba(167, 139, 250, 0.06) 1px, transparent 1px),
  linear-gradient(90deg, rgba(167, 139, 250, 0.06) 1px, transparent 1px);
background-size: 60px 60px;

/* Logotype / headline accent gradient — three colors, not two */
--magenta: #ff6b9d;
--purple:  #a78bfa;
--teal:    #4ecdc4;
background: linear-gradient(135deg, var(--magenta), var(--purple), var(--teal));

/* Body text colors on the marketing site (different from the app's near-black) */
--text: #1a1a2e;
--text-muted: #6c757d;
```

## 7. Locally-installed brand fonts — set these even though Claude Design can't render them

Claude Design's own preview has no access to Adobe Fonts/Typekit, so it will always
show the Georgia/sans-serif fallback no matter what — that's expected, not a bug to
fix here. But any generated document is a plain HTML file that gets **downloaded and
opened locally**, where the real fonts (synced via Adobe Creative Cloud) already
exist as system fonts. Write the exact family names into the CSS custom properties
so the downloaded file picks them up immediately with zero manual editing:

```css
--font-sans: 'Avenir Next', sans-serif;
--font-display: 'Benguiat Pro ITC', Georgia, serif;
```

Set these once (e.g. on the outermost wrapper element) rather than repeating the
literal names at every `var(--font-display, ...)` / `var(--font-sans, ...)` call
site — custom properties inherit, so one declaration covers the whole document.

Caveats:
- `'Avenir Next'` (no "LT Pro") is correct — that's Apple's bundled system font,
  which is the same family lineage as the site's licensed "Avenir Next LT Pro" and
  renders effectively identically. Do not write "Avenir Next LT Pro" — that exact
  name isn't installed and won't match.
- The full **Benguiat Pro ITC** range is now activated: Book, Medium, and Bold,
  each in upright + italic, in both regular and condensed widths (12 faces total).
  Adobe's desktop naming puts both widths under the *same* family name — condensed
  vs. regular is a `Style` distinction, not a separate family — so just write
  `'Benguiat Pro ITC'` and let normal `font-weight`/`font-style` selection resolve
  it; the browser defaults to `font-stretch: normal`, which correctly picks the
  regular (non-condensed) width unless you explicitly ask for condensed.
- When quoting these inside a JSON-embedded template (e.g. a bundler's
  `__bundler/template` script content), use plain apostrophes — `\'` is not a valid
  JSON escape sequence and will corrupt the file.
