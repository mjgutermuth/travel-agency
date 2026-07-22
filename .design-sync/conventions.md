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
