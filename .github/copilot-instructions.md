# KGiSL Mental Health Pledge - AI Coding Instructions

## Project Overview
A React + TypeScript web application enabling students from KGiSL institutions to pledge commitment to mental health and drug-free living. The app captures student information, generates downloadable e-certificates, and tracks aggregate pledge counts.

## Architecture & Key Components

### Three-View State Machine
The app operates as a single-page application (SPA) with three distinct views managed by `App.tsx`:
- **`landing`** - Hero section with initiative overview and pledge count (animated +1-2 every 8s)
- **`form`** - Multi-step form collecting student data via `PledgeForm` component
- **`certificate`** - Generated certificate display with download capability via `Certificate` component

State flow: `landing` → `form` → `certificate`. The `Header` component is persistent across all views.

### Data Model
All user input flows through the `PledgeFormData` interface (see [types.ts](../types.ts)):
```typescript
interface PledgeFormData {
  fullName: string;
  email: string;
  college: string;
  department: string;
  rollNumber: string;
  yearOfStudy: string;
  gender: string;
}
```

The `KG_INSTITUTIONS` object in [types.ts](../types.ts#L19) maps college names to their available departments (6 institutions, ~70+ programs total).

### Key Integration: html2canvas
The certificate is rendered to a DOM ref and converted to PNG via `html2canvas` at 3x scale before download. This requires:
- Scale: 3 (high quality for print)
- `useCORS: true` (for external images like Unsplash hero)
- `backgroundColor: '#ffffff'` (white background)

See [App.tsx#L43-L49](../App.tsx#L43-L49) for implementation.

## UI Patterns & Styling

### Tailwind + Custom Color Scheme
Two primary brand colors (CSS-level via Tailwind):
- `kgislPurple` - Primary (RGB: 51, 36, 112)
- `kgislRed` - Accent/secondary (for warnings, highlights)

These are custom Tailwind utilities—ensure they're defined in `tailwind.config.js` or inline Tailwind CSS if missing.

### Component Styling Conventions
- **Form inputs**: Use `inputClass` variable in [PledgeForm.tsx](../components/PledgeForm.tsx#L35) (replicated per component for consistency)
- **Labels**: Use `labelClass` for uppercase, tracked text
- **Buttons**: Always include `text-lg uppercase tracking-widest` for government/formal tone
- **Certificates**: Multi-layered border design (outer purple, inner red) via absolute positioned divs—do not use border utilities alone

### Form Validation
Minimal client-side checks in [PledgeForm.tsx#L32-L37](../components/PledgeForm.tsx#L32-L37). Required fields trigger browser alert if unfilled. No backend validation.

## Development Workflow

### Setup & Commands
```bash
npm install          # Install dependencies (React 19.2.3, html2canvas 1.4.1, TypeScript 5.8)
npm run dev          # Start Vite dev server (localhost:3000)
npm run build        # Production build to dist/
npm run preview      # Local preview of production build
```

### Environment Variables
- `GEMINI_API_KEY` - Required in `.env.local` (currently unused in frontend, may be for future AI features)
- Vite config exposes as `process.env.GEMINI_API_KEY` (see [vite.config.ts#L9-L11](../vite.config.ts#L9-L11))

### Build Considerations
- **Target**: ES2022 (modern browsers only)
- **JSX**: `react-jsx` (no React import needed in files)
- **Module resolution**: `bundler` (ESM-first)

## Common Patterns

### Dynamic Department Selection
When college is selected in form, `useEffect` fetches departments from `KG_INSTITUTIONS` and clears the selected department—see [PledgeForm.tsx#L21-L27](../components/PledgeForm.tsx#L21-L27).

### Loading State & Animation
The 1.5s generation delay before showing certificate is intentional (simulates processing). Uses `isGenerating` flag and `setTimeout`—see [App.tsx#L26-L34](../App.tsx#L26-L34).

### Scroll Behavior
View changes trigger `window.scrollTo({ top: 0, behavior: 'smooth' })` to move user to top of page. Always use on major state changes.

### Conditional Rendering with View State
Use `view === 'landing' && <section>...</section>` pattern rather than separate routes (no routing library needed).

## Extensibility Points

### Adding New Form Fields
1. Extend `PledgeFormData` interface in [types.ts](../types.ts)
2. Add to `formData` state initialization in [PledgeForm.tsx](../components/PledgeForm.tsx)
3. Add `handleChange` handler for new field
4. Reference in `Certificate` component if it should appear on certificate
5. Add corresponding input element with consistent styling classes

### Updating Certificate Design
Certificate is a styled `<div>` with absolute positioned borders and background watermark. Main content goes in the "Content Area" z-layer (z-10). Always test via `html2canvas` after changes—some CSS properties don't render correctly.

### Adding Institutions or Programs
Update `KG_INSTITUTIONS` object in [types.ts](../types.ts). Maintains 6 institutions for now; scale carefully if adding more.

## Testing Checklist
- [ ] Form validation works (try submitting empty fields)
- [ ] Department dropdown updates when college changes
- [ ] Certificate downloads as PNG (check Downloads folder)
- [ ] Pledge count increments on landing page (~every 8s)
- [ ] Responsive design works on mobile (check grid breakpoints)
- [ ] Student name appears correctly on certificate
- [ ] Certificate renders cleanly via `html2canvas` (no layout shifts)
