# Coins.xyz Official Brand Gradients Analysis

Based on `coinsxyz_brandguidelines_24.pdf`

## Official Gradient Patterns

### Gradient 1: Multi-color Radial (Purple-Blue-Green)
**Visual**: Radial gradient with soft transitions
**Colors**: Purple (top-left) → Blue (center) → Green (bottom-right)
**Application**: Hero backgrounds, large header sections
**CSS Implementation**:
```css
background: radial-gradient(circle at 30% 30%, #A78BFA 0%, #60A5FA 40%, #5DE828 100%);
```

### Gradient 2: Angular Diagonal (Pink-Red-Purple)
**Visual**: Sharp angular diagonal gradient
**Colors**: Pink (#FF69B4) → Red (#ED452D) → Purple (#7A70FF)
**Application**: Accent elements, geometric shapes
**CSS Implementation**:
```css
background: linear-gradient(135deg, #FF69B4 0%, #ED452D 50%, #7A70FF 100%);
```

### Gradient 3: Soft Multi-spectrum (Green-Blue-Purple-Pink-Red)
**Visual**: Smooth flowing gradient with multiple color stops
**Colors**: Green (#5DE828) → Cyan → Blue (#0062F5) → Purple (#7A70FF) → Pink → Red (#ED452D)
**Application**: Large backgrounds, "One Platform" style sections
**CSS Implementation**:
```css
background: linear-gradient(135deg, 
  #5DE828 0%, 
  #00D9FF 20%, 
  #0062F5 40%, 
  #7A70FF 60%, 
  #FF69B4 80%, 
  #ED452D 100%
);
```

### Gradient 4: Dark with Accent (Black-Pink-Purple-Green)
**Visual**: Dark background with vibrant accent gradient
**Colors**: Black (#000000) with Pink-Purple-Green accent overlay
**Application**: Dark mode sections, "Endless Possibilities" style
**CSS Implementation**:
```css
background: #000000;
/* With accent overlay */
background: linear-gradient(135deg, 
  rgba(255, 105, 180, 0.3) 0%, 
  rgba(122, 112, 255, 0.3) 50%, 
  rgba(93, 232, 40, 0.3) 100%
), #000000;
```

## Recommended Applications for Dashboard

### Hero Section
Use **Gradient 3** (Soft Multi-spectrum) for the main hero gradient to match the "One Platform" aesthetic.

### Current Blockers Cards
- **Business Plan**: Use soft pink-to-red gradient (subset of Gradient 2)
- **External Audit**: Use soft orange-to-yellow gradient (warm tones)

### Status Update Cards
- **In Progress**: Use yellow-orange soft gradient
- **Upcoming**: Use blue-purple soft gradient

### Key Principle
All gradients should be **soft and flowing**, not harsh. Use radial or multi-stop linear gradients with smooth transitions between colors from the official palette:
- Red: #ED452D
- Blue: #0062F5
- Green: #5DE828
- Iris/Purple: #7A70FF
- Pink: #FF69B4

Avoid single-color solid backgrounds. Always use gradients with at least 2-3 color stops for visual richness.
