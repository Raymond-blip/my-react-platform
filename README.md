React Learning Platform
=======================

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