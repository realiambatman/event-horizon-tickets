# Event Horizon Tickets

Event Horizon is a front-end demo of an event-ticketing platform. Visitors can browse and filter a small catalogue of events, open an event page, pick a ticket tier and quantity, and walk through a simulated checkout. Signed-in users also get a ticket wallet, a profile page and an organizer dashboard. Everything runs in the browser on mock data: there is no backend, no real authentication and no real payment processing.

## Features

- **Event browsing** – landing page with a featured event, text search and category filters over the mock catalogue.
- **Event details and checkout** – three ticket tiers priced as multipliers of the base price, quantity selector (1–10), running total in INR, and a simulated payment step with a confirmation card.
- **Generated event copy (optional)** – when a Gemini API key is configured, the event page asks Gemini for a short promotional paragraph. Without a key, or if the request fails, the built-in description is shown.
- **My Tickets** – wallet-style ticket cards with a modal showing a placeholder QR graphic and ticket details.
- **Moments** – a masonry-style photo gallery.
- **Organizer dashboard** – summary stat cards, a weekly sales bar chart (Recharts), per-event capacity bars and a recent transactions table, all from static data.
- **Profile** – general info, security and billing tabs (forms are presentational).
- **Mock sign-in** – a sign-in / sign-up modal with a one-click demo login. My Tickets, Admin and Profile require sign-in; opening them while signed out shows a sign-in prompt, and after signing in you land on the page you asked for.
- Responsive layout with a slide-in mobile menu and Framer Motion animations.

## Tech stack

- React 19 and TypeScript
- Vite 6
- React Router 7
- Tailwind CSS 3 (PostCSS build)
- Framer Motion, Lucide icons, Recharts
- `@google/genai` (Gemini), optional

## Prerequisites

- Node.js 20 or newer
- npm

## Setup

```bash
npm install
cp .env.example .env   # optional, only needed for Gemini-generated copy
npm run dev
```

The dev server runs at http://localhost:3000.

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Environment variables

| Variable         | Required | Description                                                                                             |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `GEMINI_API_KEY` | No       | Google Gemini API key used to generate event descriptions. If unset, the static description is shown.    |

The key is read at build time by `vite.config.ts` and inlined into the JavaScript bundle. Anyone who can load the built site can extract it, so only set it for local or private demo use and never deploy a public build that contains a real key.

## Scripts

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the Vite dev server on port 3000        |
| `npm run build`     | Build for production into `dist/`             |
| `npm run preview`   | Serve the production build locally            |
| `npm run typecheck` | Type-check the project with `tsc --noEmit`    |

## Project structure

```
.
├── index.html              # HTML entry, fonts and meta tags
├── index.tsx               # React entry point
├── index.css               # Tailwind directives and global styles
├── App.tsx                 # Router, navigation, footer, sign-in gating
├── constants.ts            # Mock events and ticket tiers
├── types.ts                # Shared TypeScript types
├── components/
│   ├── AuthModal.tsx       # Mock sign-in / sign-up modal
│   ├── ScrollToTop.tsx     # Scrolls to top on route change
│   └── UI.tsx              # Card, Button and Badge primitives
├── pages/
│   ├── Home.tsx            # Landing page, search and filters
│   ├── EventDetails.tsx    # Event page and simulated checkout
│   ├── MyTickets.tsx       # Ticket wallet
│   ├── Moments.tsx         # Photo gallery
│   ├── Admin.tsx           # Organizer dashboard
│   └── Profile.tsx         # Account settings
├── services/
│   └── geminiService.ts    # Optional Gemini call with static fallback
├── public/favicon.svg
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## Routes

| Path         | Page                | Sign-in required |
| ------------ | ------------------- | ---------------- |
| `/`          | Home                | No               |
| `/event/:id` | Event details       | No               |
| `/moments`   | Moments gallery     | No               |
| `/tickets`   | My Tickets          | Yes              |
| `/admin`     | Organizer dashboard | Yes              |
| `/profile`   | Profile             | Yes              |

Unknown paths and unknown event ids redirect to the home page.

## Known limitations

- All data is hard-coded in `constants.ts` and in the page components. Nothing is persisted.
- Sign-in is a mock: any email and password is accepted, the "Google" button uses the demo account, and the session is lost on page reload.
- Checkout is simulated with a timer. Purchased tickets are not added to the wallet; My Tickets always shows the same sample tickets.
- Dashboard figures, profile forms, the footer's social and legal links, and buttons such as "Create Event", "Share" and "Save to Photos" are placeholders with no behaviour behind them.
- Images are loaded from picsum.photos and fonts from Google Fonts, so the app needs network access to look right.
- The app uses `BrowserRouter`, so a static host must rewrite all paths to `index.html` for deep links to work.
- There are no automated tests.
