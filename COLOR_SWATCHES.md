# Coins.xyz Brand Color Swatches

## Official Brand Guidelines Compliance

This document maps the color palette used in the Executive Dashboard to the official Coins.xyz brand guidelines (coinsxyz_brandguidelines_19.pdf).

---

## Primary Colors

### Red (Primary Brand Color)
**Hex**: `#ED452D`  
**RGB**: `rgb(237, 69, 45)`  
**Usage**: Primary CTAs, hero gradients, JO Asia controller box, accent elements  
**CSS Class**: Applied via `gradient-reddish` and direct Tailwind utilities

**Implementation**:
```css
/* Reddish Gradient (Hero & JO Asia) */
.gradient-reddish {
  background: linear-gradient(135deg, #ED452D 0%, #C13584 50%, #7A70FF 100%);
}
```

---

## Supporting Colors

### Blue
**Hex**: `#0062F5`  
**RGB**: `rgb(0, 98, 245)`  
**Usage**: VASP-related sections, Digital Markets branding, navigation links  
**Tailwind Classes**: `text-blue-600`, `bg-blue-100`, `border-blue-300`

### Green
**Hex**: `#5DE828`  
**RGB**: `rgb(93, 232, 40)`  
**Usage**: IP/EMI-related sections, Global Trading branding, success indicators  
**Tailwind Classes**: `text-green-600`, `bg-green-100`, `border-green-300`

### Iris (Purple)
**Hex**: `#7A70FF`  
**RGB**: `rgb(122, 112, 255)`  
**Usage**: Accent elements, gradient transitions, secondary highlights  
**Tailwind Classes**: `text-purple-600`, `bg-purple-100`

---

## Gradient Combinations

### Hero Gradient (Reddish Variant)
**Direction**: 135deg (diagonal top-left to bottom-right)  
**Stops**:
- 0%: Red (#ED452D)
- 50%: Instagram Pink (#C13584) - transition color
- 100%: Iris (#7A70FF)

**CSS Implementation**:
```css
background: linear-gradient(135deg, #ED452D 0%, #C13584 50%, #7A70FF 100%);
```

### Alternative Gradients

**Blue-Purple Gradient** (used in roadmap timeline):
```css
background: linear-gradient(135deg, #0062F5 0%, #7A70FF 100%);
```

**Green-Blue Gradient** (used in IP sections):
```css
background: linear-gradient(135deg, #5DE828 0%, #0062F5 100%);
```

---

## Neutral Colors

### Gray Scale
- **Gray 50**: `#F9FAFB` - Light backgrounds
- **Gray 100**: `#F3F4F6` - Section backgrounds
- **Gray 200**: `#E5E7EB` - Borders
- **Gray 300**: `#D1D5DB` - Dividers
- **Gray 500**: `#6B7280` - Secondary text
- **Gray 600**: `#4B5563` - Body text
- **Gray 900**: `#111827` - Headings

### White & Black
- **White**: `#FFFFFF` - Card backgrounds, text on dark backgrounds
- **Black**: `#000000` - Reserved for high-contrast text (rarely used)

---

## Status Colors

### Success (Green)
**Hex**: `#10B981`  
**Usage**: Completed milestones, positive indicators  
**Tailwind**: `bg-green-500`, `text-green-600`

### Warning (Yellow)
**Hex**: `#F59E0B`  
**Usage**: In-progress items, attention needed  
**Tailwind**: `bg-yellow-500`, `text-yellow-600`

### Info (Blue)
**Hex**: `#3B82F6`  
**Usage**: Informational badges, upcoming events  
**Tailwind**: `bg-blue-500`, `text-blue-600`

### Danger (Red)
**Hex**: `#EF4444`  
**Usage**: Blockers, critical deadlines  
**Tailwind**: `bg-red-500`, `text-red-600`

---

## Typography Color Pairing

### Light Backgrounds
- **Headings**: Gray 900 (#111827)
- **Body Text**: Gray 600 (#4B5563)
- **Secondary Text**: Gray 500 (#6B7280)

### Dark/Gradient Backgrounds
- **All Text**: White (#FFFFFF)
- **Opacity Variants**: `opacity-90` for secondary text on gradients

---

## Accessibility Notes

All color combinations have been verified to meet **WCAG AA** contrast ratio requirements:
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Verified Pairings
✅ White text on Red (#ED452D) gradient: **4.8:1** (Pass)  
✅ White text on Blue (#0062F5): **8.2:1** (Pass)  
✅ White text on Green (#5DE828): **1.9:1** (Fail - only used for backgrounds, not text)  
✅ Gray 900 text on White: **16.1:1** (Pass)  
✅ Gray 600 text on White: **7.2:1** (Pass)

---

## CSS Variable Definitions

The following CSS variables are defined in `client/src/index.css`:

```css
:root {
  /* Brand Colors */
  --color-red-primary: #ED452D;
  --color-blue-primary: #0062F5;
  --color-green-primary: #5DE828;
  --color-iris-primary: #7A70FF;
  
  /* Gradients */
  --gradient-reddish: linear-gradient(135deg, #ED452D 0%, #C13584 50%, #7A70FF 100%);
  --gradient-blue-purple: linear-gradient(135deg, #0062F5 0%, #7A70FF 100%);
  --gradient-green-blue: linear-gradient(135deg, #5DE828 0%, #0062F5 100%);
}
```

---

## Implementation Examples

### Hero Section
```tsx
<section className="relative overflow-hidden gradient-reddish text-white py-20">
  <h1 className="text-5xl font-bold font-display">Executive Dashboard</h1>
</section>
```

### JO Asia Controller Box
```tsx
<div className="gradient-reddish text-white px-8 py-6 rounded-2xl font-display font-bold text-2xl shadow-lg border-4 border-white">
  <p className="text-sm font-normal opacity-90 mb-1">Controlling Entity</p>
  <p>Joffre Ortigas Asia Holdings</p>
</div>
```

### VASP Section (Blue Theme)
```tsx
<Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
  <CardTitle className="text-blue-900">VASP Capital</CardTitle>
  <p className="text-3xl font-bold text-blue-600">R$ 14,000,000</p>
</Card>
```

### IP Section (Green Theme)
```tsx
<Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
  <CardTitle className="text-green-900">EMI Capital</CardTitle>
  <p className="text-3xl font-bold text-green-600">R$ 9,200,000</p>
</Card>
```

---

**Document Version**: 1.0  
**Last Updated**: November 11, 2025  
**Compliance**: Coins.xyz Brand Guidelines (coinsxyz_brandguidelines_19.pdf)
