# Focalyze

ADHD management, reimagined. A comprehensive platform with special emphasis on the critical 16–25 age transition period.

## Tech Stack

- **Vite** — lightning-fast build tool
- **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Router v6** — client-side routing
- **Redux Toolkit** + **React Query** — state & server-state management
- **Recharts** — data visualisation
- **AWS HealthLake** — clinical data backend

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & run locally

```sh
# 1. Clone
git clone <YOUR_GIT_URL>
cd adhd-transition-bridge-nexus

# 2. Install dependencies
npm install

# 3. Start development server (http://localhost:8080)
npm run dev
```

### Build for production

```sh
npm run build
# Preview the production build locally
npm run preview
```

## Deploying to Vercel

This project is pre-configured for Vercel deployment via [`vercel.json`](./vercel.json).

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_ORG/adhd-transition-bridge-nexus)

### CLI deploy

```sh
npx vercel          # preview deployment
npx vercel --prod   # production deployment
```

Vercel automatically runs `npm run build` and serves the `dist/` folder. All routes are rewritten to `index.html` so React Router works correctly.

## Project Structure

```
src/
├── components/   # Shared UI components
├── pages/        # Route-level page components
├── screens/      # Feature screens
├── layouts/      # Layout wrappers
├── store/        # Redux store & slices
├── services/     # API & service integrations
├── hooks/        # Custom React hooks
├── models/       # TypeScript data models
└── utils/        # Utility helpers
```

## Licence

MIT
