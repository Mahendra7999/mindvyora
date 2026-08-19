# MINDVYORA

Learn. Engage. Evolve.

Next.js + Supabase foundation for a student/teacher/admin classroom activity platform.

## Setup
1. Copy `.env.example` to `.env.local`.
2. Add the Supabase URL and publishable key.
3. Run `npm install`.
4. Run `npm run dev`.

Supabase already contains the `profiles` table, RLS policies, and new-user profile trigger.

## Routes
- `/login`
- `/student`
- `/teacher`
- `/admin`

Protected routes use Supabase SSR session validation in `proxy.ts`.
