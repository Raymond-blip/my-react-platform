<div align="center">

  <img src="public/placeholder-logo.svg" alt="React Learning Platform" height="80" />

  <h1>React Learning Platform</h1>

  <p>
    Learn React with interactive lessons, a live playground, and real-time progress tracking.
  </p>

  <p>
    <a href="https://vercel.com/raymond-blips-projects/v0-react-learning-platform"><img alt="Deployed on Vercel" src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel" /></a>
    <a href="https://v0.app/chat/projects/jizerE6uuFi"><img alt="Built with v0" src="https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge" /></a>
  </p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=fff&style=flat" />
    <img alt="React" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=flat" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat" />
    <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-38BDF8?logo=tailwindcss&logoColor=fff&style=flat" />
    <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-111?logo=radix-ui&logoColor=fff&style=flat" />
    <img alt="NextAuth" src="https://img.shields.io/badge/NextAuth-000?logo=auth0&logoColor=fff&style=flat" />
    <img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff&style=flat" />
  </p>

</div>

An interactive React learning platform built with Next.js 15, TypeScript, shadcn/ui, and NextAuth (GitHub-only). It includes a docs curriculum for beginners, a live playground, AI tools, templates, a community section, and per-user learning progress tracking (with optional PostgreSQL/Prisma backend).

Features
--------
- Beginner-friendly React docs with interactive demos (JSX, Props/State, Events, Conditional Rendering, Lists/Keys, Forms)
- GitHub-only authentication via NextAuth
- Real-time progress tracking with client fallback
- Dashboard with streaks, time spent, achievements
- Live code playground and AI Builder

Tech Stack
---------
- Next.js 15, React 19, TypeScript 5
- shadcn/ui + Radix, TailwindCSS 4
- NextAuth (GitHub provider)
- Prisma ORM (optional), PostgreSQL (e.g., Supabase)
- Vitest + Testing Library (included in repo)

App Overview
------------
- `app/`
  - `page.tsx` – Landing page with hero, feature grid, and live progress
  - `dashboard/page.tsx` – Personalized dashboard (progress, achievements)
  - `docs/` – Learning curriculum
    - `fundamentals/`
      - `intro`, `first-component`, `jsx`, `props-state`, `events`, `conditional`, `lists`, `forms`
    - `hooks/`, `advanced/`, `testing/` – section landing pages
  - `playground/page.tsx` – Live code runner/editor
  - `ai-builder/page.tsx` – AI component builder
  - `templates/*`, `community/*` – templates and forum
  - `api/`
    - `auth/[...nextauth]` – GitHub auth
    - `progress` – GET/POST progress
    - `progress/stats` – overall stats
    - `progress/section` – section progress
- `components/` – UI and app components (navigation, progress tracker, etc.)
- `lib/` – client APIs/hooks (`useProgress`, `progress-api`)
- `prisma/` – `schema.prisma`, optional seed

Docs Map (Beginner Track)
-------------------------
- Fundamentals
  - Introduction to React
  - Your First Component
  - Understanding JSX
  - Props and State
  - Event Handling
  - Conditional Rendering
  - Lists and Keys
  - Forms

API Endpoints
-------------
- `GET /api/progress?userId=...` → overall progress object
- `POST /api/progress` → { userId, sectionId, timeSpent }
- `GET /api/progress/stats?userId=...` → totals, percentage, streak
- `GET /api/progress/section?userId=...&sectionId=...` → section state

Environment Variables
---------------------
Required for auth (GitHub OAuth):
- `GITHUB_ID`
- `GITHUB_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (e.g., http://localhost:3000)

Optional for persistence (PostgreSQL):
- `DATABASE_URL` → must start with `postgresql://` or `postgres://` (add `?sslmode=require` for hosted DBs)

Quick Start
----------
1) Install dependencies

```bash
npm install --legacy-peer-deps
```

2) Create `.env.local` (do NOT commit). Example:

```bash
# GitHub OAuth
GITHUB_ID=your_github_client_id_here
GITHUB_SECRET=your_github_client_secret_here

# NextAuth
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# Optional database (required only if you want persistent progress)
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
```

3) Run the app

```bash
npm run dev
```

Open `http://localhost:3000`.

Authentication (GitHub only)
----------------------------
- Sign in via the navbar. The app uses only GitHub auth.
- Auth config: `app/api/auth/[...nextauth]/route.ts`.

Progress Tracking
-----------------
- Client calls are in `lib/hooks/useProgress.ts` and `lib/progress-api.ts`.
- API routes are under `app/api/progress/*`.
- Works without a database (falls back to local state); to persist:
  1. Set `DATABASE_URL` in `.env.local` (PostgreSQL/Supabase).
  2. Generate Prisma client: `npx prisma generate`.
  3. Apply migrations (if present) or create tables accordingly.

Deployment
----------
- Vercel (recommended):
  1. Import repo
  2. Add env vars (GitHub OAuth + optional DB)
  3. Deploy

Troubleshooting
---------------
- Prisma datasource error: `the URL must start with postgresql:// or postgres://` → fix `DATABASE_URL` prefix
- Windows lock on Prisma client: stop dev server / Node processes, then `npx prisma generate`
- Port 3000 in use: stop existing dev server or change port (package.json `dev` script)

Scripts
-------
```bash
npm run dev           # Start Next.js dev server
npm run build:app     # Next.js build
npm run build         # Build component library
npm run test          # Run unit tests (Vitest)
npm run db:generate   # prisma generate
npm run db:migrate    # prisma migrate dev
npm run db:studio     # prisma studio
npm run db:reset      # prisma migrate reset
```

Project Structure (high level)
------------------------------
- `app/` – Next.js App Router pages and API routes
  - `docs/` – Learning paths and lessons (interactive)
  - `dashboard/` – User dashboard with progress
  - `api/` – NextAuth and progress endpoints
- `components/` – UI components (shadcn/ui) and app components
- `lib/` – APIs, utilities, hooks (incl. progress hooks)
- `prisma/` – Prisma schema and seed (optional)

Screenshots (optional)
----------------------
<table>
  <tr>
    <td align="center">
      <img src="public/placeholder.jpg" alt="Landing" width="420" />
      <div><strong>Landing Page</strong></div>
    </td>
    <td align="center">
      <img src="public/placeholder-user.jpg" alt="Dashboard" width="420" />
      <div><strong>Dashboard</strong></div>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="public/placeholder.svg" alt="Docs" width="420" />
      <div><strong>Docs Lesson</strong></div>
    </td>
    <td align="center">
      <img src="public/placeholder-logo.png" alt="Playground" width="420" />
      <div><strong>Playground</strong></div>
    </td>
  </tr>
</table>

Development Notes
-----------------
- If you see Prisma errors about `DATABASE_URL`, ensure it starts with `postgresql://` or `postgres://`. The app still runs without DB; the progress API gracefully falls back.
- On Windows, if `prisma generate` fails while dev server is running, stop all Node processes, then re-run.

Contributing
------------
PRs are welcome! Please:
- Keep code readable and typed.
- Match existing formatting.
- Add tests where reasonable.

License
-------
MIT

# React learning platform

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/raymond-blips-projects/v0-react-learning-platform)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/jizerE6uuFi)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/raymond-blips-projects/v0-react-learning-platform](https://vercel.com/raymond-blips-projects/v0-react-learning-platform)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/jizerE6uuFi](https://v0.app/chat/projects/jizerE6uuFi)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository