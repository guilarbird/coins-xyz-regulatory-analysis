# Gemini Prompt - Coins.xyz Regulatory Capital Analysis Dashboard

## Project Overview

Build a **Coins.xyz Regulatory Capital Analysis Dashboard** - a professional executive dashboard for tracking dual-license regulatory compliance (VASP + Payment Institution) in Brazil. The app displays capital injection timelines, corporate restructure information, regulatory milestones, and compliance checklists.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Routing**: Wouter
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Button, Card, Badge, Accordion, etc.)
- **Icons**: lucide-react
- **State Management**: React Context (CurrencyProvider)

## Core Features

### 1. Homepage (Executive Dashboard)

**Layout Structure:**
- Sticky header with logo + currency toggle (BRL/USD)
- Hero section with gradient background (blue-to-green)
- Executive KPI cards (5 cards in grid)
- Detailed License Analysis section (2 cards: VASP + IP)
- Key Milestones Timeline (horizontal dual-thread)
- Corporate Restructure section (compact)
- Capital Injection Timeline (compact with filters)
- Structural & Legal Tasks (3 cards)
- Regulatory Timeline (dual-thread with dates)
- Capital Map Table (auto-calculated)
- Current Blockers section
- Footer (minimal, discrete)

**Hero KPIs (5 cards):**
1. Total Capital Required: R$ 23.200.000 (VASP + IP)
2. Dual Licenses: VASP + IP
3. Target IP Filing: 15 Mar 2026
4. VASP Authorization Deadline: 01 Nov 2026
5. Full Compliance: Jan 2028

**Detailed License Analysis (2 cards):**
- **VASP Analysis**: Coins.xyz Digital Markets Ltda. — BCB Resolutions 519, 520 & 521
  - Links: Capital Requirements, PRE Calculator, Compliance Checklist
- **IP Analysis**: Coins.xyz Global Trading Ltda. — BCB Resolution 517 & Joint Resolution 14/2025
  - Links: Capital Structure, Gradual Implementation, IP Requirements

### 2. VASP Analysis Page (/vasp)

**Layout:**
- Use RegulatoryLayout component
- Sticky header (no logo): "← Back to Dashboard" + BRL/USD toggle
- Hero with 3-up KPI grid:
  - Minimum Capital: R$ 14.000.000 (R$ 14.0M mobile)
  - Authorization Deadline: Nov 1, 2026
  - Full Compliance: Jan 2028
- Tabs (underline style): Overview, Capital, PRE Calculator, Compliance, Timeline, Regulatory Framework
- Entity toggle: VASP | IP (preserves section via alias map)

**Content Sections:**
- Capital Requirements breakdown
- PRE (Patrimônio de Referência Exigido) Calculator
- Compliance Checklist
- Timeline with milestones
- Regulatory Framework links

### 3. IP Analysis Page (/ip)

**Layout:**
- Same RegulatoryLayout structure as VASP
- Hero with 3-up KPI grid:
  - Minimum Capital: R$ 9.200.000 (R$ 9.2M mobile)
  - Target Filing: Q4 2026
  - Full Compliance: Jan 2028
- Tabs: Overview, Capital, Gradual Implementation, Requirements, Timeline, Regulatory Framework

**Content Sections:**
- Capital Structure
- Gradual Implementation roadmap
- IP Requirements checklist
- Timeline with milestones
- Regulatory Framework links

### 4. Currency Provider (Global State)

**Features:**
- BRL/USD toggle with localStorage persistence
- URL param support (?ccy=usd|brl)
- Exchange rate: 5.80 (USD to BRL)
- formatCurrency function with compact notation (2.5M for millions)
- Updates all values within 150ms

### 5. Regulatory Config (Single Source of Truth)

**Data Structure:**
```typescript
capitalEvents: [
  { id, date, entity: 'IP'|'VASP'|'Both', amount_brl, split?, label, purpose, link }
]

milestones: [
  { id, date, entity, type: 'event'|'deadline'|'window', title, description, status }
]

capitalPlan: {
  ip: { total: 9200000, entity, license, resolutions, events },
  vasp: { total: 14000000, entity, license, resolutions, events }
}

requirements: { ip: [...], vasp: [...] }
checklists: { ip: [...], vasp: [...] }
```

## Design System

### Colors
- **Primary**: Blue (#0A67FF) to Green (#37C464) gradient
- **VASP**: Blue (#0A67FF)
- **IP**: Green (#37C464)
- **Neutral**: Gray scale (50-900)
- **Status**: Orange (In Progress), Blue (Upcoming), Gray (Planned), Red (Deadline)

### Typography
- **Font**: Inter (sans-serif)
- **Headings**: clamp(28px, 4vw, 44px) for H1, clamp(18px, 2.6vw, 24px) for H2
- **Body**: text-sm (14px) to text-base (16px)
- **KPI Numbers**: clamp(18px, 3.2vw, 28px)

### Spacing
- **Container**: max-w-6xl mx-auto px-3
- **Sections**: py-6 md:py-8
- **Cards**: p-4 md:p-6, rounded-2xl
- **Gaps**: gap-3 md:gap-4

### Components

**Header (Sticky):**
- Height: h-14 (56px)
- Background: bg-white/95 backdrop-blur
- Border: border-b
- z-index: z-50

**Hero (Gradient):**
- Background: bg-gradient-to-br from-[#0A67FF] to-[#37C464]
- Padding: py-6
- Text: white with opacity-80 for subtitles

**Tabs (Underline Style):**
- Background: bg-white
- Sticky: top-14, z-40
- Active: text-neutral-900 font-medium with h-0.5 underline
- Inactive: text-neutral-700
- Scrollable: overflow-x-auto

**KPI Chips (Hero):**
- Background: bg-white/10 ring-1 ring-white/25
- Padding: px-4 py-3
- Border radius: rounded-2xl
- Min width: min-w-[220px]
- Grid: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3

**Cards:**
- Background: bg-white
- Border: border shadow-sm
- Radius: rounded-2xl
- Padding: p-4 md:p-6

**Badges:**
- Entity: bg-green-100 text-green-800 (IP), bg-blue-100 text-blue-800 (VASP)
- Status: bg-orange-100 text-orange-800 (In Progress), bg-blue-100 text-blue-800 (Upcoming)

## Mobile-First Responsive Design

### Breakpoints
- Mobile: 360-430px (base)
- Tablet: 768px (md:)
- Desktop: 1024px+ (lg:)

### Key Requirements
- Above the fold (390×844): title + currency + tabs visible
- No truncation at 360-400px width
- Currency switch updates all values in <150ms
- Touch targets ≥44×44px
- Tabs scroll smoothly on mobile
- KPI chips wrap to 2/1 columns gracefully

## Accessibility (A11y)

- role="tablist" on tab containers
- aria-selected, aria-controls on tabs
- aria-label on interactive elements
- Keyboard navigation support
- WCAG AA contrast ratios
- Touch targets ≥44×44px
- Lighthouse Accessibility score ≥90

## Data & Content

### Capital Injection Timeline
- Jan-Feb 2026: Partial Injection (IP: R$ 2.0M, VASP: R$ 3.0M)
- 01 May 2026: Pre-Audit Capital (IP: R$ 3.0M, VASP: R$ 5.0M)
- Jun-Sep 2026: External Audit Window (VASP only)
- 15 Mar 2026: IP Filing (Target)
- 01 Nov 2026: VASP Authorization Deadline
- Jan 2028: Final Compliance (IP: R$ 1.7M, VASP: R$ 2.5M)

### Corporate Structure
- **Parent**: Joffre Ortigas Asia Holdings (Controller)
- **Children**: 
  - Coins.xyz Digital Markets Ltda. (VASP)
  - Coins.xyz Global Trading Ltda. (IP)

### Regulatory Framework
- BCB Resolution 519 (VASP - Capital)
- BCB Resolution 520 (VASP - Operations)
- BCB Resolution 521 (VASP - Compliance)
- BCB Resolution 517 (IP - Payment Institution)
- Joint Resolution 14/2025 (IP - Additional Requirements)

## Implementation Notes

1. **Start with RegulatoryLayout component** - this is the shared layout for /vasp and /ip
2. **Create CurrencyProvider context** - wrap App.tsx with this provider
3. **Create regulatoryConfig.ts** - centralize all data here
4. **Build homepage first** - establish design system and components
5. **Apply RegulatoryLayout to /vasp and /ip** - reuse components
6. **Test mobile responsiveness** - ensure all breakpoints work
7. **Validate accessibility** - run Lighthouse audits

## Files to Upload

**Required:**
1. `regulatoryConfig.ts` - Data configuration
2. `CurrencyContext.tsx` - Currency provider
3. `RegulatoryLayout.tsx` - Shared layout component
4. Logo images (CoinsXYZ_HorizontalLogo_BlackWordmark.png, etc.)
5. `package.json` - Dependencies
6. `tailwind.config.ts` - Tailwind configuration
7. `tsconfig.json` - TypeScript configuration

**Optional (for reference):**
- Screenshots of homepage, VASP page, IP page
- Color swatches documentation
- Brand guidelines PDF

## Expected Deliverables

1. Fully functional React app with routing
2. Homepage with all sections implemented
3. /vasp and /ip pages using RegulatoryLayout
4. Currency toggle working with persistence
5. Mobile-first responsive design (360px+)
6. A11y compliant (Lighthouse ≥90)
7. Clean, maintainable code with TypeScript

## Testing Checklist

- [ ] Homepage loads with all sections visible
- [ ] Currency toggle switches BRL ↔ USD and persists
- [ ] VASP/IP pages load with correct KPIs
- [ ] Tabs scroll smoothly on mobile
- [ ] Cross-route toggle (VASP ↔ IP) preserves section
- [ ] No truncation at 360-400px width
- [ ] Touch targets ≥44px
- [ ] Lighthouse Accessibility ≥90
- [ ] No console errors or warnings
