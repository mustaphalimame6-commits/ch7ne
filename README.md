# CH7N — شحن | Gaming Top-Up Platform

A modern Arabic RTL gaming top-up website for the Mauritanian market. Built with a neon dark-blue gaming aesthetic, the site allows users to recharge PUBG Mobile, Free Fire, TikTok Coins, eFootball, and Call of Duty Mobile via local payment methods (Bankily, Sedad, Masrifi) and place orders through WhatsApp.

## Key Technologies

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (React 19 + TanStack Router v1) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS (CSS variables, animations) |
| Language | TypeScript 5 (strict mode) |
| Deployment | Netlify |

## Features

- **Hero section** with animated mascot, floating particles, and brand message
- **Trust cards** highlighting speed, real support, respect, and security
- **5-game catalog** with dynamic package selection per game
- **Smart recharge flow**: TikTok Coins has optional player ID; all other games require it
- **Payment section** with one-tap copy buttons for transfer number and total amount
- **WhatsApp order generation** — auto-formats a clean Arabic order message
- **Community section** with testimonials and startup values
- **Fully RTL** Arabic layout, mobile-first responsive design

## Running Locally

```bash
npm install
npm run dev        # starts dev server on http://localhost:3000
```

For Netlify features (edge functions, forms, etc.) use the Netlify CLI:

```bash
netlify dev        # runs on http://localhost:8888
```
