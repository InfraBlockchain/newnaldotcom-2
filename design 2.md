# NEWNAL — Design Reference

## Overview

NEWNAL is an AI OS landing page built with React + Tailwind v4. All body copy is in English. The design is text-first, icon/emoji-free, dark-background, with a single blue accent color.

---

## Color Tokens

All hex values use 8-digit format for Tailwind v4 compatibility.

| Token | Value | Usage |
|---|---|---|
| `B` (accent blue) | `#4D9FFF` | Headings, accents, borders, badges |
| Background (default) | `#000000` | Page, sections (light) |
| Background (dark) | `#111111` | Alternate sections |
| Background (card) | `#0A0A0A` | Flow diagram cells |
| Border | `#222222` | Section dividers, grid gaps |
| Text primary | `#FFFFFF` | Headings, nav logo |
| Text body | `#FFFFFFBF` | Message paragraphs (75%) |
| Text body-light | `#FFFFFF80` | Body paragraphs (50%) |
| Text muted | `#FFFFFF66` | Hero desc, subdued copy (40%) |
| Text dim | `#666666` | Footer copyright, labels |
| Text faint | `#FFFFFF33` | Patent numbers, mono labels |
| Nav bg | `#000000D9` | Nav bar (85% opacity + blur) |

### Badge Colors (IP Section)

| Type | Text | Background | Border |
|---|---|---|---|
| US (USPTO) | `#4D9FFF` | `#4D9FFF12` | `#4D9FFF4D` |
| KR (KIPO) | `#AAAAAA` | `#FFFFFF0A` | `#FFFFFF26` |
| EP (EPO) | `#FFCC55` | `#FFCC5512` | `#FFCC554D` |
| WIPO | `#88CCFF` | `#88CCFF12` | `#88CCFF4D` |
| CN (CNIPA) | `#FF6432` | `#FF643226` | `#FF64324D` |
| Default | `#666666` | `#FFFFFF05` | `#FFFFFF14` |

---

## Typography

### Font Stack

```
Syne          — headings, logo, section titles, timeline
Google Sans   — all body copy, descriptions, cards
Geist Mono    — section numbers, patent IDs, mono labels
Noto Sans KR  — fallback for Korean text
```

Imported from Google Fonts in `/src/styles/fonts.css`.

### Type Scale

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| GNB Logo | Syne | 20px | 400 | `letter-spacing: 0.15em`, uppercase |
| Hero H1 | Syne | 82px → 64px → 52px → 42px → 38px → 32px | 500 | Responsive via breakpoints |
| Section Title (h2) | Syne | `clamp(32px, 4vw, 48px)` | 400 | `letter-spacing: -0.02em` |
| CTA Title | Syne | `clamp(44px, 6vw, 88px)` | 500 | `letter-spacing: -0.03em` |
| Timeline Label | Syne | 20px | 400 | — |
| Hero Sub | Google Sans | 20px → 18px → 16px → 15px → 14px | 400 | Responsive |
| Hero Desc | Google Sans | 14px → 13px | 400 | — |
| Message (p) | Google Sans | 18px | 400 | `line-height: 1.8`, max-width 700px |
| Body (div) | Google Sans | 16px | 300 | `line-height: 1.9`, max-width 760px |
| Card Title | Google Sans | 15px | 400 | `line-height: 1.6` |
| Card Desc | Google Sans | 13px | 400 | — |
| Flow Label | Google Sans | 13px | 400 | — |
| Section Number | Geist Mono | 13px | 400 | `letter-spacing: 0.2em`, uppercase |
| Card Index | Geist Mono | 9px | 400 | `letter-spacing: 0.18em` |
| Patent Number | Geist Mono | 10px | 400 | — |
| Badge Label | Geist Mono | 10px | 600 | uppercase |
| Roadmap Month | Geist Mono | 11px | 400 | `letter-spacing: 0.15em`, uppercase |

> **Rule:** Do NOT use Tailwind font-size / font-weight / line-height classes. All typography is set via inline `style` props or the global CSS file.

---

## Spacing & Layout

### Max Widths

| Context | Max Width |
|---|---|
| Hero grid | 1300px |
| Section content (`Inner`) | 1000px |
| IP Section content | 860px |
| Message paragraphs | 700px |
| Body text | 760px |
| Callout | 580px |

### Section Padding

| Breakpoint | Section padding | Inner padding |
|---|---|---|
| Default (1440px+) | `120px 0` | `0 60px` |
| ≤ 1024px | — | `0 40px` |
| ≤ 768px | `80px 0` | `0 24px` |
| ≤ 375px | `60px 0` | — |
| ≤ 320px | — | `0 16px` |

### Grid System

- **3-column grid** (`aios-grid3`): `grid-template-columns: repeat(3,1fr)`, `gap: 1px`, background `#222222` (creates 1px divider effect).  
  → Collapses to 1 column at ≤ 768px.
- **Flow diagram** (`aios-flow5`): `repeat(N, 1fr)`, same 1px gap treatment.  
  → Collapses to 1 column at ≤ 768px.

---

## Responsive Breakpoints

```
1440px+   Base (default styles)
≤ 1024px  Laptop / tablet landscape
≤ 768px   Tablet portrait / mobile (major layout switch)
≤ 425px   Large mobile (iPhone Pro Max)
≤ 375px   Standard mobile (iPhone X, 13, 14)
≤ 320px   Small mobile (iPhone SE)
```

> **Rule:** Media query rules must be added to **both** `/src/styles/global.css` and `App.tsx`'s inline `GLOBAL_CSS` string.

---

## Line Break Utilities

```html
<br className="br-pc" />   <!-- visible on desktop, hidden on mobile -->
<br className="br-mo" />   <!-- visible on mobile, hidden on desktop -->
```

```css
/* Default */
.br-pc { display: block; }
.br-mo { display: none; }

/* ≤ 768px */
.br-pc { display: none; }
.br-mo { display: block; }
```

Word-wrap: use `className="keep-all"` to prevent awkward Korean/English mid-word breaks.

---

## Animations

| Class | Keyframe | Duration | Notes |
|---|---|---|---|
| `aios-eyebrow` | `fadeUp` | 0.8s, delay 0.2s | Section eyebrow fade-in |
| `aios-hero-h1` | `fadeUp` | 0.8s, delay 0.4s | Hero H1 fade-in |
| `aios-hero-sub` | `fadeUp` | 0.8s, delay 0.6s | Hero subtitle fade-in |
| `aios-orbit-1` | `spin` | 20s linear ∞ | — |
| `aios-orbit-2` | `spin` | 30s linear ∞ reverse | — |
| `aios-pulse` | `pulse` | 2s ∞ | Blue glow pulse |
| `aios-cs-d1/d2/d3` | `dotBlink` | 1.4s, staggered | Blinking dots |

**Scroll reveal**: `SectionReveal` component uses `IntersectionObserver` (threshold 0.08) to trigger `opacity: 0→1` + `translateY(40px→0)` over 0.8s.

---

## Hero Section

### Layout
- Desktop: `grid-template-columns: 1.1fr 0.9fr` — text left, video right
- Mobile (≤ 768px): single column, video above text

### Video Strategy
Two `<video>` tags toggled via CSS `display`:

```tsx
// Desktop (> 768px)
<video className="aios-video-desktop" src="…/MyAI.mp4" autoPlay loop muted playsInline />

// Mobile (≤ 768px)
<video className="aios-video-mobile" src="…/hero_3.1.mp4" autoPlay loop muted playsInline />
```

S3 base: `https://newnal-com-asset.s3.ap-northeast-2.amazonaws.com/`

### Mobile Gradient Overlay
- `position: fixed`, bottom 0, `height: 40vh`
- `background: linear-gradient(to bottom, transparent 0%, #000000 100%)`
- `z-index: 5`, `pointer-events: none`
- Opacity fades from 1→0 as user scrolls past 160px (controlled via React state)
- Class: `aios-hero-mob-grad` — `display: none` by default, `display: block` at ≤ 768px

### Mobile Text Toggle
```html
<div className="aios-hero-text-desktop">…</div>  <!-- hidden on mobile -->
<div className="aios-hero-text-mobile">…</div>    <!-- shown on mobile -->
```

---

## Core Reusable Components

| Component | Description |
|---|---|
| `SectionReveal` | `<section>` with scroll-triggered fade-up. `dark` prop toggles bg `#111`/`#000` |
| `Inner` | Centers content, max-width 1000px, padding `0 60px` |
| `SecNum` | Blue label with flanking 24px lines — section eyebrow |
| `Title` | `<h2>` in Syne 400, `clamp(32px, 4vw, 48px)`, centered |
| `Message` | `<p>` in Google Sans 18px, `#FFFFFFBF`, max-width 700px |
| `Body` | `<div>` in Google Sans 16px 300, `#FFFFFF80`, max-width 760px |
| `Accent` | `<span>` with blue `#4D9FFF` text |
| `Divider` | 48px × 1px `#222` horizontal rule, centered |
| `Callout` | Bordered blue-tinted box: `border-top: 2px solid #4D9FFF`, bg `#4D9FFF0A` |
| `ThreeGrid` | 3-col grid of numbered cards (`dark` prop inverts bg) |
| `FlowDiagram` | N-col flow step grid with icons and step numbers |
| `IPRow` | Patent row with title, patent number, and colored country badge links |
| `ActiveBadge` | Country-identified colored button link (US/KR/EP/WIPO/CN) |
| `CategoryHeader` | Blue mono-font category label with leading line |
| `ItemList` | `flex-col`, `gap: 1px`, bg `#222` — creates 1px divider between rows |

---

## Section Structure

| Section | Title | Background |
|---|---|---|
| Nav | — | Fixed, `#000000D9`, blur 16px |
| Hero | "This is not a phone with AI." | `#000` |
| Section01 | Why Does AI Still Feel Inconvenient? | `#000` |
| Section02 | MY AI — AI Built From You | `#111` (dark) |
| Section03 | AI That Doesn't Require Constant Input | `#000` |
| Section04 | A World Where Services Connect Without Apps | `#111` (dark) |
| Section05 | Full Android Compatibility | `#000` |
| Section06 | Onboarding — It Just Takes 10 Minutes | `#111` (dark) |
| Section07 | We Are Not Competing in Hardware | `#000` |
| Section08 | And One More Thing | `#111` (dark) |
| CTASection | Newnal AIOS Phone / 2026 Roadmap | `#000` |
| IPSection | Intellectual Property Portfolio | `#111` |
| Footer | © 2026 Newnal | `#000` |

> Section alternation pattern: `#000` → `#111` → `#000` → `#111` …

---

## Section Title Convention

Format: `{번호} · {Title}` — applied via the `SecNum` component as an eyebrow above the main `Title`. Example:

```tsx
<SecNum>01 · Why AI Still Feels Inconvenient</SecNum>
<Title>Why Does AI Still Feel Inconvenient?</Title>
```

---

## Navigation (GNB)

- `position: fixed`, `z-index: 100`
- Padding: `24px 60px` (→ `20px 24px` on mobile)
- Logo: "Newnal" in Syne 400, `letter-spacing: 0.15em`, uppercase
- Background: `#000000D9` with `backdrop-filter: blur(16px)`
- No nav links, no CTA button currently

---

## Footer

- `border-top: 1px solid #222`
- Padding: `48px 60px`
- Left: "Newnal" logo (Syne 400, 16px)
- Right: `© 2026 Newnal. All rights reserved.` (Geist Mono 11px, `#666`)
- Mobile: stacks vertically, text-center

---

## IP Section Details

- Max content width: 860px
- Categories: **Technical Whitepapers** and **Utility Patents**
- Rows separated by 1px `#222` gaps via `ItemList`
- Each row has: title, optional description, patent number (mono), and badge links
- Row hover: `background: #1A1A1A`
- Badge widths: WIPO = 64px, others = 52px, height = 27px

---

## Routing

```ts
// In App.tsx — redirects /hackathon to external URL
if (window.location.pathname === "/hackathon") {
  window.location.replace("https://hackathon.newnal.com//");
}
```

No client-side router (no react-router). Single-page with anchor scroll.

---

## File Structure

```
src/
  app/
    App.tsx           — main component (all sections inline)
    components/
      figma/
        ImageWithFallback.tsx
  styles/
    fonts.css         — Google Fonts imports ONLY
    global.css        — all media queries and base styles
    theme.css         — Tailwind design tokens
```

> CSS rules (especially media queries) must exist in **both** `global.css` and `App.tsx`'s `GLOBAL_CSS` constant so they apply in all rendering contexts.

---

## Key Constraints

- No icons or emojis in content
- All text in English
- No Tailwind font-size / font-weight / line-height utility classes
- All color values in 8-digit hex for Tailwind v4
- `HackathonBanner` component has been removed entirely
- GitHub repo: `InfraBlockchain/Newnaldotcom` (private, read-only via MCP)
