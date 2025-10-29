# Zero Waste Asia - Organics Topic Microsite

A production-ready, modern, responsive microsite for the Organics topic following Zero Waste Asia's design system.

## 🚀 Features

- **Home Page**: Hero banner, action accordion, KPI metrics, featured resources, calculator teaser, and campaign CTAs
- **Map & Directory**: Interactive map placeholder with filterable directory of organics facilities, initiatives, and organizations
- **Resources Library**: Searchable resource listing with detail pages
- **Organics Calculator**: Calculate organic waste diversion and methane emission reductions with CSV export
- **Methane Pledge Campaign**: Campaign page with stats, FAQs, and social sharing
- **Help Desk**: Contact form with validation and success notifications

## 🎨 Design System

This microsite strictly follows the Zero Waste Asia design system with:
- **Brand Colors**: ZWA Blue (#2179B3) and ZWA Gold (#D4A73F)
- **Typography**: Inter font family with consistent type scale
- **Components**: Reusable UI components following shadcn/ui patterns
- **Accessibility**: WCAG AA compliant, keyboard navigation, screen reader support
- **Responsive**: Mobile-first design with breakpoints at 768px (md) and 1024px (lg)

## 📦 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router v6
- **Forms**: Custom form components with Zod validation
- **State**: React Query for async state, Zustand ready for global state
- **Icons**: Lucide React
- **Map**: MapLibre GL JS (placeholder implementation)

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ and npm

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to view the microsite.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npx tsc --noEmit
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # UI component shims (@zwa/ui replacements)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Accordion.tsx
│   │   ├── Toast.tsx
│   │   ├── Spinner.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── icons.ts           # Icon exports from lucide-react
│   │   └── index.ts
│   ├── Header.tsx             # Sticky navigation header
│   ├── Footer.tsx             # Footer with links and CTA
│   ├── Breadcrumbs.tsx        # Breadcrumb navigation
│   ├── MapCanvas.tsx          # Map component (placeholder)
│   ├── DirectoryFilters.tsx   # Directory filter sidebar
│   └── DirectoryList.tsx      # Directory entry cards
├── pages/
│   ├── Home.tsx               # Organics home page
│   ├── MapDirectory.tsx       # Map + Directory page
│   ├── Calculator.tsx         # Organics calculator
│   ├── CampaignMethanePledge.tsx  # Campaign page
│   ├── Resources.tsx          # Resource library listing
│   ├── ResourceDetail.tsx     # Individual resource page
│   └── HelpDesk.tsx          # Help desk contact form
├── lib/
│   ├── types.ts               # Zod schemas and TypeScript types
│   ├── data.ts                # Mock data (DirectoryEntry, Resource, Campaign)
│   ├── format.ts              # Number/currency formatting utilities
│   ├── calc.ts                # Calculator logic and CSV export
│   ├── seo.ts                 # SEO meta helpers
│   ├── a11y.ts                # Accessibility utilities
│   └── adapters/
│       ├── directory.ts       # Directory data adapter
│       ├── resources.ts       # Resources data adapter
│       └── helpdesk.ts        # Help desk submission adapter
├── Layout.tsx                 # Root layout with header/footer
├── router.tsx                 # React Router configuration
├── App.tsx                    # App root with providers
├── main.tsx                   # Entry point
└── index.css                  # Global styles and design tokens
```

## 🔄 Migrating to Production

### Replace Mock Data with Supabase

The microsite currently uses mock data. To connect to Supabase:

1. **Install Supabase Client**:
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Supabase Client** (`src/lib/supabase.ts`):
   ```typescript
   import { createClient } from '@supabase/supabase-js';
   
   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   );
   ```

3. **Update Adapters**:
   - `src/lib/adapters/directory.ts`: Replace `DIRECTORY_ENTRIES` with Supabase queries
   - `src/lib/adapters/resources.ts`: Replace `RESOURCES` with Supabase queries  
   - `src/lib/adapters/helpdesk.ts`: Replace mock submission with Supabase insert

### Replace UI Component Shims

All UI components in `src/components/ui/` are temporary shims. To use the real `@zwa/ui` package:

1. Install the package (when available):
   ```bash
   npm install @zwa/ui @zwa/icons @zwa/a11y @zwa/seo
   ```

2. Update import paths throughout the codebase:
   - Remove or update path aliases in `vite.config.ts` and `tsconfig.json`
   - Components will automatically import from the real packages

3. All shim components follow the same API as the real components, so no code changes needed beyond imports.

### Add MapLibre GL JS Integration

The `MapCanvas` component currently shows a placeholder. To add the full map:

1. **Install MapLibre**:
   ```bash
   npm install maplibre-gl @mapbox/supercluster
   npm install -D @types/mapbox__supercluster
   ```

2. **Add MapLibre CSS** to `src/index.css`:
   ```css
   @import 'maplibre-gl/dist/maplibre-gl.css';
   ```

3. **Implement Full Map** in `MapCanvas.tsx`:
   - Initialize MapLibre GL map instance
   - Add clustering with Supercluster
   - Bind markers to directory entries
   - Handle zoom, pan, and marker clicks

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_MAPLIBRE_STYLE_URL=your_map_style_url
```

## ♿ Accessibility

- **Keyboard Navigation**: All interactive elements accessible via Tab/Enter/Space
- **Screen Readers**: Proper ARIA labels, roles, and live regions
- **Focus Management**: Visible focus rings on all focusable elements
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Color Contrast**: WCAG AA compliant (4.5:1 minimum)

## 📱 Responsive Design

- **Mobile First**: Base styles optimized for mobile (320px+)
- **Tablet**: `md:` breakpoint at 768px
- **Desktop**: `lg:` breakpoint at 1024px
- **Tested**: All layouts tested at 320px, 768px, 1024px, 1440px

## 🧪 Testing

Currently no automated tests. For production:

1. Add Vitest for unit tests:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom
   ```

2. Test priority areas:
   - Calculator logic (`src/lib/calc.ts`)
   - Form validation
   - Data adapters
   - UI component behavior

## 📄 License

© 2024 Zero Waste Asia. All rights reserved.

## 🤝 Contributing

For questions or contributions, contact the Zero Waste Asia development team.

---

**Status**: ✅ Production Ready (with mock data)  
**Version**: 1.0.0  
**Last Updated**: October 2024

