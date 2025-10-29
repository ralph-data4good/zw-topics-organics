
# Cursor Prompt — Organics Topic Microsite (Zero Waste Asia, Reuse-First)

You are Cursor. Build a **modern, minimal, responsive Organics topic microsite** that **reuses Zero Waste Asia’s existing design system and components**. Do **not** introduce new colors, spacing, or bespoke UI. Use **mock data** now; keep clean seams to swap in Supabase later.

---

## A) Reuse What Already Exists (Source of Truth)
Assume the workspace exposes these packages. **Import from them directly**; if missing, create a 1:1 **shim** with the same props so we only change the import later.

- **Design tokens**
  - `@zwa/tokens/tokens.css` (colors, spacing, radii, shadows)
  - `@zwa/tokens/typography.css` (Schibsted Grotesk headings; body scale)
  - `@zwa/tokens/motion.css` (durations/easings; respect `prefers-reduced-motion`)

- **UI components (shadcn-based)**
  - From `@zwa/ui`: `Header`, `Footer`, `Container`, `Section`, `PageTitle`, `Breadcrumbs`, `Button`, `Card`, `Badge`, `Input`, `Select`, `Textarea`, `Tabs`, `Dialog`, `Sheet`, `Accordion`, `Tooltip`, `Toast`, `Skeleton`, `Spinner`, `Pagination`.
  - Icons from `@zwa/icons` (Lucide-wrapped).

- **Utilities**
  - Tailwind preset already mapped to tokens
  - `@zwa/seo` for title/meta helpers
  - `@zwa/a11y` (`SkipLinks`, focus helpers)

> If an import path fails, implement a local wrapper with the **same API** and add a `// TODO: replace with @zwa/*` comment.

---

## B) Product Recap (Mirror Existing ZWA Screens)
**Replicate established patterns** from the main site and library/directory UIs:

- **Header**: mega-nav with dropdowns — Explore, Infobank/Directory, Resource Library, Engage, Tools, Account, Contribute.
- **Hero slab**: dark banner with big headline and world-dot visual (image/placeholder).
- **Action accordion**: 4 items (Search Info, Library, Festival Calendar, Tools).
- **KPI stat card**: metric + short copy + CTA (style like “69 Directory Entries”).
- **Directory search block**: “I am searching for… (type)” + “near… (geocoder)” + Find button.
- **Featured events**: card layout with “In person/Online” pill.
- **Resource Library quick search**: type + topic + Find.
- **Academy CTA** + **Tracks grid**.
- **Support/Campaigns band** (two-up cards).
- **Footer (mega)**: Subscribe/Join, link columns, socials, legal.
- **Directory & Library listing**: top search, left filters (Topics/Types/Countries), result count “Showing X of Y”, Grid/Table toggle, Sort dropdown, share/bookmark on cards, verification pills, pagination.

**Design rules to honor**
- **Typography**: Schibsted Grotesk scale; heading sizes from tokens.
- **Radii/shadows**: **rounded-2xl** cards; gentle elevation only.
- **Buttons**: use brand variants (gold for primary, navy for secondary).
- **Badges**: pill style for status/topics (“In person”, “Verified (Org)”, etc.).
- **Spacing**: tokenized Tailwind scales only (e.g., `gap-6`, `px-6`, no magic numbers).
- **Colors**: tokens only — no new hex codes.

---

## C) Scope — Organics Topic Microsite
Build the **Organics** topic template with **mock data** and these routes:

- `/` → **Home (Organics)** — hero, topic intro, CTAs, featured resources, calculator teaser.
- `/map` → **Map + Directory** (pre-filtered to Organics).
- `/campaign/methane-pledge` → **Campaign CTA**.
- `/resources` → **Featured Resources** (filtered to Organics).
- `/resources/back-to-earth` → **Resource Detail**.
- `/helpdesk` → **Organics Help Desk** form.
- `/calculator` → **Organics Calculator** (diversion & CH₄-avoidance).

**CTAs (reuse variants)**: “Map & Directory”, “Take the Methane Pledge”, “Open Calculator”.

---

## D) Tech & Project Skeleton
- React + TypeScript + Vite (or use existing workspace config)
- Tailwind (preconfigured with tokens)
- shadcn via `@zwa/ui`
- MapLibre GL JS + `@mapbox/supercluster`
- React Router
- Zod (schemas/validation)
- Zustand or React Query (async mocks)
- Framer Motion for micro-interactions **only if aligned with motion tokens**

**Install (fallback only):**
```bash
npm i react-router-dom zod maplibre-gl @mapbox/supercluster @tanstack/react-query zustand framer-motion
```

**Folders (app-only)**
```
src/
  main.tsx
  app.tsx
  router.tsx
  lib/
    types.ts
    data.ts
    adapters/
      directory.ts
      resources.ts
      helpdesk.ts
    calc.ts
  components/
    MapCanvas.tsx
    DirectoryFilters.tsx
    DirectoryList.tsx
    ResourceCard.tsx
    EmptyState.tsx
  pages/
    Home.tsx
    MapDirectory.tsx
    CampaignMethanePledge.tsx
    Resources.tsx
    ResourceDetail.tsx
    HelpDesk.tsx
    Calculator.tsx
```

---

## E) Data Models (Zod + TS)
```ts
import { z } from "zod";

export const Tag = z.enum(["organics","reuse","reduction","policy","false-solutions"]);
export type Tag = z.infer<typeof Tag>;

export const DirectoryEntry = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["facility","initiative","organization"]),
  tags: z.array(Tag),
  location: z.object({ lat: z.number(), lng: z.number(), city: z.string().optional(), country: z.string() }),
  summary: z.string().optional(),
  website: z.string().url().optional(),
});
export type DirectoryEntry = z.infer<typeof DirectoryEntry>;

export const Resource = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  topics: z.array(Tag),
  publishDate: z.string(),
  cover: z.string().optional(),
  url: z.string().url().optional(),
});
export type Resource = z.infer<typeof Resource>;

export const Campaign = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  ctaLabel: z.string(),
  ctaHref: z.string(),
  stats: z.array(z.object({ label: z.string(), value: z.number() })),
});
export type Campaign = z.infer<typeof Campaign>;
```

Populate `lib/data.ts` (and validate):
- 8–12 Organics **DirectoryEntry** across AP region.
- 4–6 **Resources** (must include `title:"Back to Earth"`, `slug:"back-to-earth"`).
- 1 **Campaign** “Methane Pledge” with CTA placeholder and sample stats.

---

## F) Pages & Components (Reuse-first)

### Layout & Navigation
- Use `Header`, `Footer`, `Breadcrumbs`, `Container`, `Section`, `PageTitle`, `SkipLinks` from `@zwa/ui` & `@zwa/a11y`.
- Breadcrumb: “Topics › Organics”.

### Home (Organics)
- **Hero slab** (reuse dark banner pattern) with concise Organics blurb.
- **Action accordion** (reuse): Search Info / Library / Festival Calendar / Tools.
- **KPI card** (reuse style) for Organics metric (mock number) + CTA.
- **Featured Resources**: 3 cards using existing `Card` + `Badge` styles; include “Back to Earth”.
- **Calculator teaser**: small card with summary + CTA → `/calculator`.
- **Campaign band**: reuse Support/Campaigns two-up pattern with “Methane Pledge” CTA.

### Map + Directory
- **MapLibre** with clustering; fit bounds to Organics entries.
- **Filters** in sidebar (desktop) and `Sheet` (mobile): Type, Country, Search.
- **Result controls**: Grid/Table toggle, Sort, “Showing X of Y results”.
- **Cards** reuse Directory card pattern: location line, topic badge, verification pill, share/bookmark, mini-metrics, “How it works” link.
- **Pagination** reuse.

### Campaign — Methane Pledge
- **Hero** + short copy; **primary CTA** button (brand primary).
- **Stats** cards (reuse Card).
- **FAQ** using `Accordion`.
- **Share** actions: copy link + social links.

### Resources
- **Search bar** + filters (Topics, Types, Countries) following Library pattern.
- **Cards** reuse Resource card style.
- `/resources/back-to-earth`: hero + body (mock) + external URL if present.

### Help Desk
- Form fields: name, email, organization (optional), country, topic preset to **Organics**, message.
- Zod validation + `@zwa/ui` form primitives.
- Submit to `lib/adapters/helpdesk.ts` mock; show `Toast` on success.

### Calculator
- Inputs: households (int), avg organics/hh/day (kg), % captured (0–100 slider).
- Outputs: annual diverted (t/yr), estimated CH₄ avoided (tCO₂e) using a **placeholder factor** (document TODO).
- Present results in cards; add **Download CSV** (Blob) for inputs+outputs.
- Pure math lives in `lib/calc.ts` with a vitest.

---

## G) Map Theming & A11y
- Map UI overlays follow token colors; markers minimal; clusters tuned for legibility.
- Keyboard-accessible filters & drawers; announce results count to SR users.
- Motion uses token durations/easings; guard with `prefers-reduced-motion`.

---

## H) SEO & i18n
- Titles/meta via `@zwa/seo`.
- Strings in a simple `en.json` for future i18n (optional scaffold).

---

## I) Acceptance Criteria (Brand Compliance)
- **Zero new colors, spacings, or typographic scales**.
- All buttons/cards/forms are `@zwa/ui` (or temporary shims with identical props).
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95.
- Map-directory filters synced; counts accurate.
- “Back to Earth” detail route works.
- Help Desk submits to mock and toasts success.
- Calculator computes + CSV export; math in `lib/calc.ts`.
- `npm run build` passes type/lint checks.

---

## J) Deliverables
- Working microsite package with imports from `@zwa/*` (or shims).
- `README.md` with:
  - Run/build steps
  - How to replace mocks with Supabase (adapters)
  - Where to flip imports from shims → real packages

---

## K) Task List (for you, Cursor)
1. Wire `@zwa/*` imports; create shims if missing.
2. Create `lib/types.ts`, `lib/data.ts` (mock + Zod), `lib/adapters/*`, `lib/calc.ts` (with tests).
3. Implement routes/pages and reuse components/patterns listed above.
4. Implement MapCanvas with clustering + synced filters/list.
5. Ensure mobile polish, a11y, reduced-motion, and dark-mode tokens.
6. Add `README.md`. Build and fix any type/lint issues.
