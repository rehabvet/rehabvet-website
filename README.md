# RehabVet Website

Veterinary rehabilitation clinic website built with Next.js 15 and Payload CMS 3.x.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Payload CMS 3.x (embedded)
- **Database:** PostgreSQL (Neon)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Getting Started

1. Copy `.env.example` to `.env` and configure your database URL
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Access the site at `http://localhost:3000`
5. Access the admin panel at `http://localhost:3000/admin`

## Project Structure

- `src/app/` — Next.js App Router pages
- `src/collections/` — Payload CMS collection definitions
- `src/globals/` — Payload CMS global definitions
- `src/components/` — React components
- `src/payload.config.ts` — Payload CMS configuration
