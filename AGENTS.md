# AGENTS.md — CH7N Project Architecture

This document is for AI agents and developers working on the CH7N gaming top-up platform.

## Project Overview

A single-page Arabic RTL gaming recharge website. Users pick a game → pick a package → enter player ID → pick payment method → submit order via WhatsApp. The brand identity is dark-blue neon gaming with a Mauritanian mascot (man in daraa + white turban).

## Directory Structure

```
public/
  logo.png              # Brand logo
  mascot-welcome.png    # Hero section mascot (Mauritanian daraa + turban)
  mascot-point.png      # Community section mascot (pointing gesture)
  pubg.png              # PUBG Mobile game image
  freefire.png          # Free Fire game image
  tiktok.png            # TikTok Coins game image
  bankily.png           # Bankily payment logo
  sedad.png             # Sedad payment logo
  masrifi.png           # Masrifi payment logo
src/
  routes/
    __root.tsx          # Root layout: lang="ar" dir="rtl", Cairo font, SEO meta
    index.tsx           # All app logic: Hero, Trust, Games, Order Flow, Community, Footer
  styles.css            # All CSS: custom properties, animations, component styles
```

## Architecture Decisions

### Single-file component approach
All game data, payment data, and UI components live in `src/routes/index.tsx`. This is intentional — the site is a single page and splitting into many files adds complexity without benefit at this scale.

### CSS custom properties + plain CSS (no Tailwind utilities in JSX)
The design uses `styles.css` with BEM-like class names. Tailwind is imported for its reset/base but component styles use hand-written CSS. This was chosen because the neon gaming aesthetic requires fine-grained animation and glow control that utility classes make verbose.

### TikTok Coins optional player ID
The `Game` interface has a `requiresId: boolean` flag. The `canOrder` logic gates the WhatsApp button differently per game. Never remove this flag — TikTok recharges do not require a game ID.

### WhatsApp order flow
Orders are sent via `https://wa.me/33775202?text=...`. The number 33775202 is the business WhatsApp. The message is assembled in Arabic with emoji separators.

### Particle animation
Particles use deterministic pseudo-random values (based on index) not `Math.random()`. This avoids hydration mismatches in SSR.

## Conventions

- All UI text is in Arabic
- Direction: RTL (`dir="rtl"` on `<html>`)
- Font: Cairo (Google Fonts, loaded via CSS `@import`)
- Color palette: defined as CSS custom properties in `:root` (see `styles.css`)
- Game images: stored in `/public/`, referenced as `/gamename.png`
- Payment logos: stored in `/public/`, referenced as `/paymentname.png`

## Adding a New Game

1. Add a new entry to the `GAMES` array in `src/routes/index.tsx`
2. Add `requiresId: true` (or `false` for non-ID games like TikTok)
3. Place the game image in `/public/` and update the `image` field
4. The games grid auto-expands (5 columns on desktop, 3 on mobile)

## Adding a New Payment Method

Add to the `PAYMENT_METHODS` array with `id`, `name`, `image`, and `number` fields. Place the logo in `/public/`.
