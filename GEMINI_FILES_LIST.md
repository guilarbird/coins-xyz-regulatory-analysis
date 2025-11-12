# Files Required for Gemini Replication

## Core Files (Must Upload)

### 1. Prompt & Documentation
- **GEMINI_PROMPT.md** - Complete project specification and implementation guide

### 2. Configuration Files
- **package.json** - Dependencies (React 19, Tailwind 4, shadcn/ui, wouter, lucide-react)
- **tsconfig.json** - TypeScript configuration
- **client/src/index.css** - Global styles and Tailwind directives

### 3. Data & State Management
- **client/src/config/regulatoryConfig.ts** - Single source of truth for all regulatory data
  - capitalEvents[] (6 capital injection events)
  - milestones[] (regulatory deadlines)
  - capitalPlan (IP + VASP totals and details)
  - requirements and checklists
  
- **client/src/contexts/CurrencyContext.tsx** - Currency provider (BRL/USD)
  - localStorage persistence
  - URL param support (?ccy=usd|brl)
  - formatCurrency with compact notation

### 4. Layout Components
- **client/src/components/RegulatoryLayout.tsx** - Shared layout for /vasp and /ip
  - Sticky header (no logo)
  - 3-up KPI grid in hero
  - Tabs with underline indicator
  - Entity toggle (VASP ↔ IP)

### 5. Page Components
- **client/src/pages/Home.tsx** - Executive Dashboard homepage
  - Hero with 5 KPI cards
  - Detailed License Analysis (2 cards)
  - Key Milestones Timeline
  - Corporate Restructure
  - Capital Injection Timeline
  - Structural & Legal Tasks
  - Regulatory Timeline
  - Capital Map Table
  - Current Blockers

- **client/src/pages/VaspAnalysis.tsx** - VASP Analysis page
  - Uses RegulatoryLayout
  - VASP-specific KPIs (R$ 14.0M, Nov 1 2026, Jan 2028)
  - PRE Calculator section
  - Compliance Checklist

- **client/src/pages/IpAnalysis.tsx** - IP Analysis page
  - Uses RegulatoryLayout
  - IP-specific KPIs (R$ 9.2M, Q4 2026, Jan 2028)
  - Gradual Implementation section
  - Requirements checklist

### 6. Assets (Images)
- **client/public/CoinsXYZ_HorizontalLogo_BlackWordmark.png** - Logo for light backgrounds
- **client/public/CoinsXYZ_HorizontalLogo_WhiteWordmark.png** - Logo for dark backgrounds
- **client/public/logo-black.png** - Alternative logo
- **client/public/logo-symbol.png** - Symbol/icon logo

## Optional Files (For Reference)

### Screenshots
- Homepage desktop view
- Homepage mobile view
- VASP Analysis page
- IP Analysis page
- Currency toggle demonstration

### Documentation
- Brand guidelines PDF (colors, typography, gradients)
- Color swatches documentation
- QA checklist

## How to Use with Gemini

### Step 1: Upload Files
Upload all files from the **gemini-export.zip** to Gemini interface:
1. GEMINI_PROMPT.md (read this first)
2. All configuration files (package.json, tsconfig.json, index.css)
3. All source files (regulatoryConfig.ts, CurrencyContext.tsx, RegulatoryLayout.tsx)
4. All page files (Home.tsx, VaspAnalysis.tsx, IpAnalysis.tsx)
5. All logo images

### Step 2: Provide Prompt
Copy and paste the content from **GEMINI_PROMPT.md** into Gemini chat, or simply say:

```
"Build a Coins.xyz Regulatory Capital Analysis Dashboard based on the uploaded GEMINI_PROMPT.md specification. Use the provided source files as reference for data structure, components, and styling. Ensure mobile-first responsive design (360px+) and accessibility compliance (Lighthouse ≥90)."
```

### Step 3: Specify Output Format
Tell Gemini to generate:
1. Complete React app structure
2. All component files
3. Routing configuration (wouter)
4. Tailwind configuration
5. Package.json with all dependencies

### Step 4: Iterate
Ask Gemini to:
- "Apply the exact color scheme from regulatoryConfig.ts"
- "Implement the 3-up KPI grid from RegulatoryLayout.tsx"
- "Add currency toggle with localStorage persistence"
- "Ensure tabs use underline style, not filled pills"
- "Test mobile responsiveness at 360px width"

## Key Implementation Notes

### Must-Have Features
✅ Currency toggle (BRL/USD) with persistence
✅ 3-up responsive KPI grid in hero
✅ Tabs with underline indicator (not pills)
✅ Cross-route toggle (VASP ↔ IP) preserving section
✅ Mobile-first responsive (360px+)
✅ Touch targets ≥44px
✅ Lighthouse Accessibility ≥90

### Design Constraints
- Header: h-14 (56px), solid bg-white/95, no logo on inner pages
- Hero: gradient bg, py-6, KPI chips with clamp() typography
- Tabs: solid white surface, sticky top-14, scrollable mobile
- Container: max-w-6xl, px-3
- Cards: rounded-2xl, p-4 md:p-6

### Data Structure
All data centralized in **regulatoryConfig.ts**:
- capitalEvents[] for timeline
- milestones[] for deadlines
- capitalPlan.ip and capitalPlan.vasp for totals
- requirements and checklists for compliance

## Troubleshooting

### If Gemini asks for clarification:

**Q: "What UI library should I use?"**
A: shadcn/ui components (Button, Card, Badge, Accordion) with Tailwind CSS 4

**Q: "How should routing work?"**
A: Use wouter for client-side routing: / (homepage), /vasp, /ip

**Q: "What's the exchange rate for BRL/USD?"**
A: 5.80 (hardcoded in CurrencyContext.tsx, can be made dynamic later)

**Q: "How should the tabs work on mobile?"**
A: Horizontal scroll with overflow-x-auto, underline indicator, touch targets ≥44px

**Q: "What gradient colors should I use?"**
A: from-[#0A67FF] to-[#37C464] (blue to green)

## Export Package Contents

The **gemini-export.zip** contains:
- 1 prompt file (GEMINI_PROMPT.md)
- 3 config files (package.json, tsconfig.json, index.css)
- 3 core files (regulatoryConfig.ts, CurrencyContext.tsx, RegulatoryLayout.tsx)
- 3 page files (Home.tsx, VaspAnalysis.tsx, IpAnalysis.tsx)
- 4 logo images (PNG format)

**Total: 14 files** ready for upload to Gemini.
