# Deployment & Environment

- **Targets**: Vercel for frontend/API routes; Supabase (or S3 + Postgres) for storage/auth.
- **Build scripts**: `npm run build` for production; `npm start` to run the built server.
- **CI**: run `npm test` and `npm run test:e2e` headless on PRs. Cache `node_modules` and Playwright/Cypress binaries if available.
- **Env vars**:
  - `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  - `AUTH_JWT_SECRET`
  - `STORAGE_BUCKET`, `STORAGE_SIGNING_KEY`
  - `TTS_PROVIDER`, `TTS_API_KEY`
  - `RATE_LIMIT_WINDOW`, `RATE_LIMIT_MAX`
- **CDN**: Serve `public/assets/starter` via Vercel static hosting with immutable cache headers; user uploads via Supabase Storage + CDN.
- **Security**: store secrets in Vercel project env; never expose service role keys client-side.
