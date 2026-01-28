# Instagram Redesign Theme: Dark Futuristic Glassmorphism

## 1. Background Theme
- **Base Color:** Deep Navy / Charcoal (`#0B1120`)
- **Gradient Glow:** 
  - Top-Left: Soft Purple (`rgba(168, 85, 247, 0.15)`)
  - Top-Right: Pink (`rgba(236, 72, 153, 0.15)`)
  - Center/Bottom: Blue (`rgba(59, 130, 246, 0.1)`)
- **Noise/Vignette:** Implemented via CSS radial masks and overlays (optional).

## 2. Surfaces (Glassmorphism)
- **Primary Glass (Cards/Sidebar):**
  - Color: `rgba(30, 41, 59, 0.65)` (Slate 800)
  - Blur: `20px` (Frosted)
  - Border: `1px solid rgba(255, 255, 255, 0.08)`
  - Shadow: Soft drop shadow + Inset glow `inset 0 0 20px rgba(255, 255, 255, 0.02)`
- **Secondary Glass (Inputs/Hover):**
  - Color: `rgba(51, 65, 85, 0.5)`
  - Blur: `12px`

## 3. Typography
- **Primary Text:** Soft Off-White (`#F1F5F9` / Slate 100)
- **Secondary Text:** Muted Cool Gray (`#94A3B8` / Slate 400)
- **Meta/Label Text:** Desaturated Slate Blue (`#64748B`)
- **Font Family:** `Inter`, `Outfit`, sans-serif.

## 4. Accent Colors
- **Action Blue:** `#38BDF8` (Sky 400 - Brighter for dark mode)
- **Like/Error:** `#F43F5E` (Rose 500)
- **Gradient Accents:** Preserved on logos/stories.

## 5. Implementation Details
- **CSS Variables:** All colors mapped to `:root` variables for easy twinkling.
- **Overrides:** Standard `bg-white` and `bg-black` classes intercepted to enforce glassmorphism on all existing components without changing JSX structure.
- **Accessibility:** High contrast ratios maintained (White text on Dark backgrounds).