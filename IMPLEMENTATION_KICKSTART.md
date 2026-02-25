# SMART ELEKTRIK - Implementation Kickstart Guide

## Project Overview
- **Project Name**: SMART ELEKTRIK
- **Type**: Professional Electrical Services Landing Page
- **Language**: Ukrainian (uk)
- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animations**: Framer Motion
- **Client**: Поліщук Дмитро (0636311132)

---

## Design System

### Color Palette
| Role | Light Theme | Dark Theme | Usage |
|------|-------------|-----------|-------|
| **Primary** | #ff7a00 (Orange) | #ff8c1a (Bright Orange) | Buttons, CTAs, Accents |
| **Secondary** | #ffd000 (Yellow) | #ffd700 (Gold) | Highlights, Badges |
| **Background** | #ffffff (White) | #0f0f0f (Deep Black) | Page Background |
| **Foreground** | #1a1a1a (Dark Gray) | #f5f5f5 (Light Gray) | Text |
| **Card** | #f8f8f8 (Light Gray) | #1a1a1a (Dark Gray) | Component Containers |
| **Border** | #e0e0e0 (Light Gray) | #2a2a2a (Medium Gray) | Dividers, Borders |
| **Muted** | #e5e5e5 | #333333 | Secondary Text |

### Typography
- **Font Family**: Geist (sans-serif) - already configured
- **Body Text**: Leading 1.6 (leading-relaxed)
- **Headings**: text-balance for optimal line breaks

### Special Effects
- **Glassmorphism**: 
  - Background: `rgba(255, 255, 255, 0.1)` (light) / `rgba(15, 15, 15, 0.1)` (dark)
  - Backdrop Blur: 12px
  - Border: `rgba(255, 255, 255, 0.15)` (light) / `rgba(255, 255, 255, 0.1)` (dark)

---

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider
│   ├── page.tsx                # Main landing page
│   └── globals.css             # Theme tokens & glassmorphism
├── components/
│   ├── header.tsx              # Navigation + Theme Toggle
│   ├── hero.tsx                # Hero section with CTA
│   ├── calculator.tsx          # Service Calculator (glassmorphism)
│   ├── contact-footer.tsx      # Contact info + Social Links
│   ├── theme-toggle.tsx        # Light/Dark mode switcher
│   └── ui/                     # shadcn/ui components
├── lib/
│   └── calculator-data.ts      # Services and pricing data
└── public/
    └── images/                 # Hero image, expert portrait
```

---

## Component Details

### 1. Header Component (`components/header.tsx`)
- **Features**:
  - Navigation links (smooth scroll to sections)
  - Theme toggle button (Light/Dark)
  - Sticky header on scroll
  - Mobile-responsive navigation
  - Logo/Brand name
- **Actions**:
  - Theme toggle calls `setTheme()` from next-themes
  - Navigation links scroll to corresponding sections (hero, calculator, contact)

### 2. Hero Section (`components/hero.tsx`)
- **Content**:
  - Headline: "SMART ELEKTRIK - Професійні електромонтажні послуги"
  - Subheading: Company tagline
  - Hero image (electrical panel/workspace)
  - CTA Button: "Безкоштовна консультація"
- **Animations**:
  - Fade-in on page load (Framer Motion)
  - Slight parallax on scroll
  - Button hover scale effect
- **Responsive**:
  - Hero image full-width on mobile
  - 2-column layout on desktop (image right, text left)

### 3. Calculator Component (`components/calculator.tsx`)
- **Structure**:
  - Title: "Розрахувати вартість послуг"
  - Service selection (dropdown/command)
  - Unit of measurement (auto-filled based on service)
  - Quantity input (number)
  - Total price display
  - "Розрахувати вартість" button
  - Clear button to reset
- **Logic**:
  1. User selects service from list
  2. Unit of measurement auto-fills
  3. User enters quantity
  4. Formula: `price = service.price * quantity`
  5. Display total in UAH
  6. "Розрахувати вартість" button triggers calculation display
- **Styling**:
  - Glass effect container with orange/yellow accents
  - Orange border on selection
  - Yellow highlight on price total
- **Data Structure**:
  ```typescript
  interface Service {
    id: string;
    name: string;
    unit: string;
    price: number; // in UAH
  }
  ```

### 4. Contact Footer (`components/contact-footer.tsx`)
- **Sections**:
  - Contact Information:
    - Name: Поліщук Дмитро
    - Phone: 0636311132 (clickable tel: link)
  - Social Media Icons:
    - Instagram → https://www.instagram.com/smart_elektrik.ua/
    - Facebook → https://www.facebook.com/dmytro.vadimovych/
    - Phone icon (same number)
  - All icons open in new tabs
- **Styling**:
  - Centered layout on mobile
  - Horizontal icon group on desktop
  - Hover effects (scale + color change to orange)

### 5. Main Page (`app/page.tsx`)
- **Sections** (in order):
  1. Header (sticky)
  2. Hero Section
  3. About/Services Info (optional: can be brief)
  4. Calculator Section
  5. Contact Footer

---

## State Management

### Calculator State
```typescript
const [selectedService, setSelectedService] = useState<Service | null>(null);
const [quantity, setQuantity] = useState<number>(1);
const [totalPrice, setTotalPrice] = useState<number | null>(null);

const calculatePrice = () => {
  if (selectedService && quantity > 0) {
    setTotalPrice(selectedService.price * quantity);
  }
};

const reset = () => {
  setSelectedService(null);
  setQuantity(1);
  setTotalPrice(null);
};
```

---

## Responsive Breakpoints

| Breakpoint | Size | Usage |
|-----------|------|-------|
| Mobile | < 768px | Single column, full-width elements, stacked navigation |
| Tablet | 768px - 1024px | 2-column layouts, adjusted spacing |
| Desktop | ≥ 1024px | Full multi-column layouts, side-by-side sections |

**Mobile-First Approach**:
- Start with mobile styling
- Use `md:` prefix for tablet/desktop enhancements
- Use `lg:` prefix for large desktop adjustments

---

## Animations (Framer Motion)

### Hero Section
- **On Mount**: Fade-in + slight translate-up
- **Duration**: 0.6s with staggered children
- **Easing**: `easeOut`

### Calculator Section
- **On Scroll Into View**: Fade-in + scale (0.8 → 1)
- **Service Selection**: Scale animation on dropdown open

### Buttons
- **Hover**: Scale 1.05, shadow increase
- **Tap**: Scale 0.98

### Contact Icons
- **Hover**: Scale 1.2, color change to primary orange

---

## Assets Required

### Images
1. **Hero Image** (`public/images/hero.jpg`):
   - Size: 1200x600px (16:9 aspect ratio)
   - Content: Professional electrical panel, workspace, tools
   - Format: JPG, optimized
   - Alt text (UK): "Професійне електромонтажне обладнання"

2. **Expert Portrait** (`public/images/expert.jpg`):
   - Size: 400x400px (1:1 aspect ratio)
   - Content: Professional headshot of Дмитро
   - Format: JPG, optimized
   - Alt text (UK): "Поліщук Дмитро, спеціаліст електромонтажних робіт"

### Status: **AWAITING USER IMAGE UPLOADS**
- When ready, user will provide images
- I will save them to `public/images/` folder
- Components will reference with `/images/filename.jpg`

---

## Services & Pricing Data

### Data File: `lib/calculator-data.ts`
**STATUS**: Awaiting user input with service list, units, and prices

**Expected Format**:
```typescript
export const services: Service[] = [
  { id: 1, name: "Монтаж розетки", unit: "шт", price: 150 },
  { id: 2, name: "Прокладка кабелю", unit: "м", price: 50 },
  // ... more services
];
```

---

## Implementation Checklist

### Phase 1: Foundation ✅
- [x] Theme system with orange/yellow/white colors
- [x] Layout.tsx with ThemeProvider
- [x] globals.css with design tokens

### Phase 2: Components (IN PROGRESS)
- [ ] Header with theme toggle
- [ ] Hero section
- [ ] Calculator component
- [ ] Contact footer
- [ ] Main page.tsx

### Phase 3: Features
- [ ] Calculator logic (service selection → quantity → price)
- [ ] Framer Motion animations
- [ ] Responsive design testing
- [ ] Accessibility (ARIA labels, alt text)

### Phase 4: Polish
- [ ] Image optimization
- [ ] Performance tuning
- [ ] Cross-browser testing
- [ ] Mobile responsiveness verification

### Phase 5: Deployment
- [ ] Final review
- [ ] Deploy to Vercel
- [ ] Domain/DNS setup (if needed)

---

## Dependencies

Already installed or to be installed:
```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "framer-motion": "^11.0.0",
    "next-themes": "^0.2.1"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Key Notes

1. **Theme Toggle**: Uses `next-themes` library for persistent theme preference
2. **Glassmorphism**: Applied via `.glass` class in globals.css
3. **Ukrainian Language**: All UI text in Ukrainian (uk locale)
4. **Mobile-First**: All components designed mobile-first with responsive enhancements
5. **Calculator**: Simple client-side logic, no backend needed
6. **Contact Links**: All external links open in new tabs (`target="_blank"`)

---

## Next Steps

1. **Provide Services & Pricing**: Send list of services with units and prices
2. **Provide Images**: Send hero image and expert portrait
3. **Implementation**: Build remaining components
4. **Testing**: Test on mobile, tablet, desktop
5. **Deploy**: Push to Vercel

---

**Last Updated**: 2/25/2026
**Status**: Ready for Implementation Phase 2
