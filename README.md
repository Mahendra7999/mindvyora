# MINDVYORA

Learn. Engage. Evolve.

Public-first Next.js + Supabase learning portal.

## Current mode

MINDVYORA is currently open to everyone. Visitors can view announcements and open uploaded learning resources without creating an account or signing in.

Authentication code remains in the repository for possible future re-enablement, but there is no public login/signup flow.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Add the Supabase URL and publishable key.
3. Run `npm install`.
4. Run `npm run dev`.

## Public experience

- `/` — public learning portal
- `/login` — redirects to the public portal
- Announcements and resources are displayed publicly

Admin/authenticated routes remain available internally for future use.
