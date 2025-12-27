# Developer Onboarding

## Prerequisites
- Node.js 20+
- npm 10+
- Optional: Docker (for Supabase local), Cypress binaries via `npx cypress install`

## Setup
```bash
npm install
```

## Helpful commands
- `npm run dev` – start Next.js in development at http://localhost:3000
- `npm run build` – production build
- `npm start` – run production server
- `npm test` – unit/component tests via Vitest
- `npm run test:e2e` – Cypress e2e (requires dev server running with `npm run dev`)
- `npm run lint` – Next/ESLint checks

## Environment variables
Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
SUPABASE_SERVICE_ROLE_KEY=service-role
SUPABASE_ANON_KEY=anon
TTS_PROVIDER=azure|openai
TTS_API_KEY=key
STORAGE_BUCKET=starter
AUTH_JWT_SECRET=supersecret
RATE_LIMIT_WINDOW=60
RATE_LIMIT_MAX=100
```

## Running tests locally
- Unit/component: `npm test`
- E2E: start dev server (`npm run dev`) in one terminal, then `npm run test:e2e` in another. First run may prompt Cypress to download binaries (`npx cypress install`).

## Data & content
- Starter words live in `content/starter/words.json` with placeholder media under `public/assets/starter/`.
- Keep placeholder assets license-safe; see `content/README.md`.

## Supabase (optional)
- Use Supabase CLI to start local stack if integrating persistence: `supabase start` and configure tables based on `docs/architecture/content-model.md` and RLS policies in `docs/architecture/auth.md`.
