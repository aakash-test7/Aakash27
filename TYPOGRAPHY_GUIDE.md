# 🎨 Typography Design System

## Font Family Stack

### Primary Fonts
- **Inter** - Modern, clean, versatile (Body & Display)
- **Orbitron** - Futuristic, tech-focused (Headlines)
- **Fira Code** - Monospace (Code & Technical)

---

## Font Usage Guide

### 🎯 **Inter Font Weights & Usage**

#### **Thin (100) & Extra Light (200)**
```tsx
className="font-inter font-extralight"
```
**Use for:**
- Subtle metadata (timestamps, counts)
- Copyright text
- Delicate overlays
- Hindi/Punjabi translations in footer

**Examples:**
- Footer copyright: "© 2024 Aakash Kharb"
- Subtle captions and fine print
- Secondary language translations

---

#### **Light (300)**
```tsx
className="font-inter font-light"
```
**Use for:**
- Inspirational quotes (current usage)
- Long-form body text
- Elegant descriptions
- Card descriptions

**Examples:**
- Footer inspirational quotes
- Project descriptions
- About section paragraphs

---

#### **Regular (400)**
```tsx
className="font-inter font-normal"
```
**Use for:**
- Standard body text
- Navigation items
- Form labels
- Default paragraph text
- List items

**Examples:**
- Main content paragraphs
- Experience descriptions
- Skills descriptions

---

#### **Medium (500)**
```tsx
className="font-inter font-medium"
```
**Use for:**
- Emphasized text
- Card titles (non-primary)
- Important labels
- Navigation active states

**Examples:**
- "Location", "Email" labels in contact
- Stats labels
- Filter buttons

---

#### **Semi-Bold (600)**
```tsx
className="font-inter font-semibold"
```
**Use for:**
- Sub-headings
- Button text
- Important CTAs
- Name attribution

**Examples:**
- "Designed & Built by AK" (current usage)
- Button labels
- Section sub-titles

---

#### **Bold (700)**
```tsx
className="font-inter font-bold"
```
**Use for:**
- Card headings
- Strong emphasis
- Important stats
- Pull quotes

**Examples:**
- Project card titles
- Skill category names
- Important metrics

---

#### **Extra Bold (800) & Black (900)**
```tsx
className="font-inter font-black"
```
**Use for:**
- Large display text
- Hero secondary text
- Giant AAKASH footer text (current usage)
- Impact statements
- Numbers in stats

**Examples:**
- Footer "AAKASH" text
- Large numbers (years of experience, project count)
- Hero taglines

---

### 🚀 **Orbitron Font** (Futuristic Tech)

```tsx
className="font-orbitron font-bold"
```

**Use for:**
- Main section headings
- Hero title "AAKASH"
- Primary navigation (optional)
- Tech-focused headlines
- Page titles

**Examples:**
- "About Me", "Projects", "Experience"
- Hero main title
- Section headers

**Weight variations:**
- `font-normal` (400) - Subtle tech feel
- `font-bold` (700) - Strong tech identity

---

### 💻 **Fira Code** (Monospace)

```tsx
className="font-mono"
```

**Use for:**
- Code snippets
- Technical stack badges
- API endpoints
- Terminal-style text
- Version numbers

**Examples:**
- Technology tags (React, Node.js, Python)
- Code blocks
- File paths
- Git commands

---

## Design Principles

### ✅ Do's
1. **Hierarchy**: Use weight to create clear visual hierarchy
2. **Consistency**: Stick to 3-4 weights per page
3. **Contrast**: Mix Orbitron (geometric) with Inter (humanist) for visual interest
4. **Rhythm**: Maintain consistent line heights within weight classes
5. **Legibility**: Never go below font-light (300) for body text

### ❌ Don'ts
1. Don't mix more than 3 font families
2. Don't use too many weights on a single component
3. Don't use ultra-thin weights for small text
4. Don't use Orbitron for long paragraphs (readability)
5. Don't forget dark mode contrast

---

## Tailwind Classes Quick Reference

### Font Family
```css
font-inter     /* Inter */
font-orbitron  /* Orbitron */
font-mono      /* Fira Code */
font-sans      /* Inter (default) */
```

### Font Weight
```css
font-thin         /* 100 */
font-extralight   /* 200 */
font-light        /* 300 */
font-normal       /* 400 */
font-medium       /* 500 */
font-semibold     /* 600 */
font-bold         /* 700 */
font-extrabold    /* 800 */
font-black        /* 900 */
```

### Font Style
```css
italic            /* Italic style */
not-italic        /* Remove italic */
```

### Letter Spacing
```css
tracking-tighter  /* -0.05em - Used in AAKASH text */
tracking-tight    /* -0.025em */
tracking-normal   /* 0em */
tracking-wide     /* 0.025em */
tracking-wider    /* 0.05em */
tracking-widest   /* 0.1em */
```

---

## Current Implementation

### Footer
- **AAKASH Giant Text**: `font-inter font-black tracking-tighter`
- **English Quotes**: `font-inter font-light italic`
- **Translations**: `font-inter font-extralight`
- **Copyright**: `font-inter font-extralight`
- **Attribution**: `font-inter font-extralight` with `font-semibold` for name

### Recommended for Other Sections

#### Hero
- **Main Title**: `font-orbitron font-bold` (existing)
- **Subtitle/Typing**: `font-inter font-normal`
- **Description**: `font-inter font-light`

#### Section Headings
- **Primary**: `font-orbitron font-bold text-4xl md:text-5xl`
- **Secondary**: `font-inter font-bold text-2xl md:text-3xl`

#### Cards (Projects/Experience)
- **Title**: `font-inter font-bold text-xl md:text-2xl`
- **Description**: `font-inter font-normal`
- **Meta Info**: `font-inter font-light text-sm`

#### Buttons
- **Primary CTA**: `font-inter font-semibold`
- **Secondary**: `font-inter font-medium`

---

## Accessibility Notes

1. **Minimum sizes**:
   - Body text: 16px (1rem)
   - Small text: 14px (0.875rem)
   - Large headings: 32px+ (2rem+)

2. **Contrast ratios**:
   - Body text: 4.5:1 minimum
   - Large text: 3:1 minimum
   - Always test in dark mode

3. **Line height**:
   - Body: 1.5-1.75
   - Headings: 1.2-1.3
   - Quotes: 1.6-1.8

---

## Next Steps

Consider using Inter for:
- ✅ Navigation text (more readable than Orbitron)
- ✅ Skills section text with varied weights
- ✅ Project card descriptions
- ✅ Contact form labels
- ✅ Stats/numbers in bold/black weights

Keep Orbitron for:
- ✅ Main section headings
- ✅ Hero title
- ✅ Brand elements that need tech identity

---

**Remember**: The key to great typography is restraint. Use fewer weights well rather than all weights poorly.
