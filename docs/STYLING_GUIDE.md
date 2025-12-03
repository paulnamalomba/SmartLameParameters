# Font Size & Component Size Reduction Guide

**Project:** Smart Lamé Parameters Calculator  
**Purpose:** Reduce font sizes and component spacing for a more compact UI  

---

## Overview

This guide shows you how to reduce font sizes and spacing throughout the application to make it more compact and space-efficient.

---

## Global Font Size Adjustments

### Option 1: Quick Global Scale (Recommended for Testing)

Add to `src/index.css`:

```css
:root {
  /* Reduce base font size from default 16px to 14px */
  font-size: 14px;
}

/* Or use a scaling factor */
html {
  font-size: 87.5%; /* 14px if base is 16px */
}
```

**Impact:** All `rem` and relative units scale down proportionally.

---

### Option 2: Tailwind Configuration (More Control)

Edit `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      fontSize: {
        // Override default sizes
        'xs': '0.65rem',     // was 0.75rem (12px → 10.4px)
        'sm': '0.8rem',      // was 0.875rem (14px → 12.8px)
        'base': '0.875rem',  // was 1rem (16px → 14px)
        'lg': '1rem',        // was 1.125rem (18px → 16px)
        'xl': '1.125rem',    // was 1.25rem (20px → 18px)
        '2xl': '1.375rem',   // was 1.5rem (24px → 22px)
        '3xl': '1.75rem',    // was 1.875rem (30px → 28px)
      },
      spacing: {
        // Reduce padding/margin scale by ~20%
        '1': '0.2rem',    // was 0.25rem
        '2': '0.4rem',    // was 0.5rem
        '3': '0.6rem',    // was 0.75rem
        '4': '0.8rem',    // was 1rem
        '6': '1.2rem',    // was 1.5rem
        '8': '1.6rem',    // was 2rem
      }
    }
  }
}
```

---

## Component-Specific Reductions

### 1. Header Component

**File:** `src/components/Header.tsx`

**Current:**
```tsx
<h1 className="text-3xl font-bold">Smart Lamé Parameters</h1>
<p className="text-lg">Cross-calculate isotropic elastic parameters</p>
```

**Reduced (20% smaller):**
```tsx
<h1 className="text-2xl font-bold">Smart Lamé Parameters</h1>
<p className="text-base">Cross-calculate isotropic elastic parameters</p>
```

**Reduced (30% smaller):**
```tsx
<h1 className="text-xl font-semibold">Smart Lamé Parameters</h1>
<p className="text-sm">Cross-calculate isotropic elastic parameters</p>
```

---

### 2. Input Field Component

**File:** `src/components/InputField.tsx`

**Current padding:** `px-3 py-2`  
**Reduced:** `px-2 py-1.5` or `px-2 py-1`

**Current font:** `font-medium`  
**Reduced:** `font-normal`

**Changes:**
```tsx
// Line 84 - Label
<label className="font-normal text-sm text-gray-700 flex items-center gap-2">

// Line 98 - Lock icon
<button className="text-base transition-colors">  {/* was text-lg */}

// Line 115 - Input field
className="flex-1 px-2 py-1.5 border rounded-md ..."  {/* was px-3 py-2 */}

// Line 130 - Unit selector
className="px-2 py-1.5 border ..."  {/* was px-3 py-2 */}

// Line 141, 146 - Unit labels
<span className="px-2 py-1.5 text-gray-500 text-xs ...">  {/* was text-sm */}
```

---

### 3. Results Panel

**File:** `src/components/ResultsPanel.tsx`

**Current:**
```tsx
<div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-800 mb-4">Computed Results</h2>
```

**Reduced:**
```tsx
<div className="bg-white p-4 rounded-lg shadow-md">
  <h2 className="text-lg font-semibold text-gray-800 mb-3">Computed Results</h2>
```

**Extra Compact:**
```tsx
<div className="bg-white p-3 rounded-md shadow-sm">
  <h2 className="text-base font-semibold text-gray-800 mb-2">Results</h2>
```

---

### 4. Main App Layout

**File:** `src/App.tsx`

**Current:**
```tsx
<main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

**Reduced:**
```tsx
<main className="flex-1 max-w-7xl w-full mx-auto px-3 py-6">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

**Extra Compact:**
```tsx
<main className="flex-1 max-w-6xl w-full mx-auto px-2 py-4">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
```

---

### 5. Section Headings

**Throughout App.tsx:**

**Current:**
```tsx
<h2 className="text-xl font-bold text-gray-800 mb-4">
```

**Reduced:**
```tsx
<h2 className="text-lg font-semibold text-gray-800 mb-3">
```

**Extra Compact:**
```tsx
<h2 className="text-base font-semibold text-gray-800 mb-2">
```

---

### 6. Buttons

**Current:**
```tsx
<button className="px-4 py-2 bg-primary-500 text-white rounded-md">
```

**Reduced:**
```tsx
<button className="px-3 py-1.5 text-sm bg-primary-500 text-white rounded-md">
```

**Extra Compact:**
```tsx
<button className="px-2 py-1 text-xs bg-primary-500 text-white rounded-sm">
```

---

### 7. Validation & Derivation Panels

**Files:** `src/components/ValidationPanel.tsx`, `src/components/DerivationTrace.tsx`

**Current:**
```tsx
<div className="bg-blue-50 p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-bold mb-4">
```

**Reduced:**
```tsx
<div className="bg-blue-50 p-4 rounded-md shadow-sm">
  <h2 className="text-base font-semibold mb-3">
```

---

## Preset Size Themes

### Theme 1: Subtle Reduction (10-15% smaller)

```css
/* Add to index.css */
:root {
  font-size: 15px; /* was 16px */
}
```

**Component changes:** None needed, everything scales automatically.

---

### Theme 2: Moderate Reduction (20-25% smaller)

**Global:**
```css
:root {
  font-size: 14px; /* was 16px */
}
```

**Component replacements:**
- `text-xl` → `text-lg`
- `text-lg` → `text-base`
- `text-base` → `text-sm`
- `p-6` → `p-4`
- `py-8` → `py-6`
- `gap-8` → `gap-6`

---

### Theme 3: Compact (30-35% smaller)

**Global:**
```css
:root {
  font-size: 13px; /* was 16px */
}
```

**Component replacements:**
- `text-2xl` → `text-lg`
- `text-xl` → `text-base`
- `text-lg` → `text-sm`
- `text-base` → `text-xs`
- `font-bold` → `font-semibold`
- `p-6` → `p-3`
- `py-8` → `py-4`
- `gap-8` → `gap-4`
- `shadow-md` → `shadow-sm`
- `rounded-lg` → `rounded-md`

---

## Quick Find & Replace

Use VS Code's multi-file search and replace:

### Font Sizes
```
Find:    text-xl
Replace: text-lg
Files:   src/**/*.tsx
```

```
Find:    text-lg
Replace: text-base
Files:   src/**/*.tsx
```

```
Find:    text-2xl
Replace: text-xl
Files:   src/**/*.tsx
```

### Padding/Spacing
```
Find:    p-6
Replace: p-4
Files:   src/**/*.tsx
```

```
Find:    py-8
Replace: py-6
Files:   src/**/*.tsx
```

```
Find:    px-4
Replace: px-3
Files:   src/**/*.tsx
```

```
Find:    gap-8
Replace: gap-6
Files:   src/**/*.tsx
```

### Shadows
```
Find:    shadow-md
Replace: shadow-sm
Files:   src/**/*.tsx
```

### Borders
```
Find:    rounded-lg
Replace: rounded-md
Files:   src/**/*.tsx
```

---

## Testing Your Changes

1. **Make backup:**
   ```powershell
   git add .
   git commit -m "Before size reduction"
   ```

2. **Apply changes** (start with global font-size in index.css)

3. **Preview locally:**
   ```powershell
   npm run dev
   ```

4. **Check responsive breakpoints:**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

5. **Verify readability:**
   - Text is still legible
   - Buttons are still clickable
   - Input fields are usable
   - Spacing doesn't feel cramped

6. **Build and deploy:**
   ```powershell
   npm run build
   netlify deploy --prod --dir=dist
   ```

---

## Recommended Approach

### Step 1: Global Scale (Quickest)
```css
/* src/index.css */
:root {
  font-size: 14px; /* 12.5% reduction */
}
```

Test this first. If it's enough, you're done!

---

### Step 2: Component Tweaks (If needed)
Only if global scale isn't sufficient:

1. Reduce section headings: `text-xl` → `text-lg`
2. Reduce input padding: `p-6` → `p-4`
3. Reduce button padding: `px-4 py-2` → `px-3 py-1.5`
4. Reduce main layout spacing: `gap-8` → `gap-6`

---

### Step 3: Fine-tuning
Adjust individual components that don't look right after global changes.

---

## Reverting Changes

If you went too small:

```powershell
git checkout -- src/
```

Or if you committed:

```powershell
git revert HEAD
```

---

## Size Comparison Table

| Element | Current | Moderate (-20%) | Compact (-30%) |
|---------|---------|-----------------|----------------|
| Base font | 16px | 14px | 13px |
| H1 (text-3xl) | 30px | 24px | 20px |
| H2 (text-2xl) | 24px | 20px | 18px |
| H2 (text-xl) | 20px | 18px | 16px |
| Body (text-base) | 16px | 14px | 13px |
| Small (text-sm) | 14px | 12.8px | 11px |
| Padding p-6 | 24px | 16px | 12px |
| Padding p-4 | 16px | 12.8px | 9.6px |
| Gap gap-8 | 32px | 24px | 16px |

---

## Bundle Size Impact

Changing class names has **zero impact** on bundle size since Tailwind uses the same CSS classes.

Changing actual CSS values in `tailwind.config.js` adds ~0-2KB to the final CSS bundle.

---

## Accessibility Considerations

**Minimum recommendations:**
- Body text: ≥13px (avoid going below)
- Buttons: ≥14px with adequate padding
- Touch targets: ≥44x44px on mobile
- Line height: ≥1.4 for readability

**Don't reduce:**
- Input field heights below 36px (mobile usability)
- Button heights below 40px (touch targets)
- Line height below 1.4 (readability)

---

## Quick Start Command

For a balanced 20% reduction, run:

```powershell
# 1. Update global font size
echo '@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  font-size: 14px; /* Reduced from 16px */
  
  color-scheme: light dark;
  color: rgba(0, 0, 0, 0.87);
  background-color: #f9fafb;
}' > src/index.css

# 2. Test
npm run dev

# 3. If satisfied, rebuild and deploy
npm run build
netlify deploy --prod --dir=dist
```

---

## Support

- **Documentation:** [README.md](README.md)
- **Issues:** [GitHub Issues](https://github.com/paulnamalomba/smart-lame-parameters/issues)

---

**Last Updated:** December 4, 2025
