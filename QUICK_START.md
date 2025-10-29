# 🚀 Quick Start Guide - ZWA Organics Microsite

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 3. Explore the Site
- **Home**: Hero section, quick actions, featured resources
- **Map & Directory**: Browse 10+ organics facilities across Asia
- **Resources**: View resource library
- **Calculator**: Calculate organic waste diversion impact
- **Campaign**: Learn about the Methane Pledge
- **Help Desk**: Contact form (mock submission)

---

## 📁 What Was Built

### ✅ Complete Microsite with 7 Routes
1. Home (`/`)
2. Map & Directory (`/map`)
3. Resources (`/resources`)
4. Resource Detail (`/resources/:slug`)
5. Calculator (`/calculator`)
6. Campaign (`/campaign/methane-pledge`)
7. Help Desk (`/helpdesk`)

### ✅ Zero Waste Asia Design System
- Brand colors (ZWA Blue, Gold, Green)
- Typography (Inter font family)
- Spacing system (8px base unit)
- Component library (Button, Card, Input, etc.)
- Accessibility (WCAG AA compliant)
- Responsive design (mobile-first)

### ✅ Production Ready Features
- TypeScript strict mode
- Tailwind CSS
- React Router v6
- Zod validation
- Mock data with adapters
- CSV export
- Toast notifications
- Loading states
- Error handling
- Form validation

---

## 🎨 Design System Highlights

### Colors
```css
Primary (Blue): #2179B3
Secondary (Gold): #D4A73F
Green (Organics): #489E4A
```

### Components
All components follow shadcn/ui patterns:
- `Button` - 4 variants (primary, secondary, outline, ghost)
- `Card` - Flexible card container
- `Badge` - Topic/status indicators
- `Input/Select/Textarea` - Form controls
- `Accordion` - Collapsible sections
- `Toast` - Notifications

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: ≥ 768px (md:)
- Desktop: ≥ 1024px (lg:)

---

## 📝 Key Files to Know

### Configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Design system tokens
- `vite.config.ts` - Build configuration

### Source Code
- `src/main.tsx` - App entry point
- `src/router.tsx` - Route definitions
- `src/Layout.tsx` - Header/Footer wrapper
- `src/pages/` - All page components
- `src/components/ui/` - Reusable UI components
- `src/lib/` - Utilities, types, adapters

### Data
- `src/lib/data.ts` - Mock data (10 directory entries, 4 resources, 1 campaign)
- `src/lib/types.ts` - TypeScript types and Zod schemas
- `src/lib/adapters/` - Data fetching logic

### Documentation
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guide
- `PROJECT_STATUS.md` - Feature checklist
- `QUICK_START.md` - This file

---

## 🔧 Common Tasks

### Build for Production
```bash
npm run build
```
Output in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

### Type Check
```bash
npx tsc --noEmit
```

### Run Linter
```bash
npm run lint
```

### Run Tests (when added)
```bash
npm run test
```

---

## 🎯 Next Steps for Production

### 1. Replace Mock Data (Priority: High)
- Install Supabase client
- Update adapters in `src/lib/adapters/`
- Configure environment variables

### 2. Replace UI Shims (Priority: High)
- Install `@zwa/ui` package when available
- Update imports throughout codebase
- Remove shim components

### 3. Add MapLibre (Priority: Medium)
- Install `maplibre-gl` and `supercluster`
- Implement full map in `MapCanvas.tsx`
- Add clustering and interactivity

### 4. Deploy (Priority: High)
See `DEPLOYMENT.md` for detailed instructions.

Recommended platforms:
- Vercel (easiest)
- Netlify
- AWS S3 + CloudFront
- Cloudflare Pages

---

## 💡 Tips

### Development
- Hot reload is enabled (changes reflect immediately)
- Console errors will show in browser DevTools
- TypeScript errors show in terminal

### Customization
- Brand colors: Edit `tailwind.config.js`
- Mock data: Edit `src/lib/data.ts`
- Page content: Edit files in `src/pages/`
- Components: Modify files in `src/components/ui/`

### Accessibility
- All interactive elements are keyboard accessible
- Screen readers supported
- Color contrast WCAG AA compliant
- Focus indicators visible

---

## ❓ FAQ

**Q: Can I use this for other topics (Reuse, Reduction, etc.)?**  
A: Yes! The structure is reusable. Just update:
- Mock data in `src/lib/data.ts`
- Colors in `tailwind.config.js`
- Page content in `src/pages/`

**Q: How do I add more directory entries?**  
A: Edit `DIRECTORY_ENTRIES` array in `src/lib/data.ts`

**Q: Where are the styles defined?**  
A: Tailwind classes are used throughout. Global styles in `src/index.css`

**Q: How do I change the calculator logic?**  
A: Edit `src/lib/calc.ts` and update the emission factor

**Q: Can I use a different map provider?**  
A: Yes! Update `MapCanvas.tsx` to use any map library (Google Maps, Leaflet, etc.)

---

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Review `PROJECT_STATUS.md` for feature status
- Contact Zero Waste Asia development team

---

**Happy coding! 🌱**

