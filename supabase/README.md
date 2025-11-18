## Supabase & Stripe Stubs

This folder contains **non-production stubs** for Supabase Edge Functions and Stripe integration.

- These files are _examples only_ and are **not wired into the app runtime**.
- Do **not** commit any real secret keys here. Use environment variables managed by Supabase / EAS.

### Required environment variables (examples)

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (client-side only, never service-role)
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only, e.g. in Edge functions)
- `STRIPE_SECRET_KEY` (server-side only)
- `STRIPE_WEBHOOK_SECRET` (server-side only)

Configure these in:

- **Supabase Edge Functions env** (for the functions in this folder)
- **EAS project secrets** (for build-time env in the mobile app)
