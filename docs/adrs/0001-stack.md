# ADR 0001: Web Stack

- **Decision**: Use Next.js (app router) with TypeScript and TailwindCSS.
- **Context**: Need fast iteration on interactive UI, serverless-friendly APIs, and SSR for performance.
- **Consequences**:
  - Component-driven UX with built-in routing for `/play` and `/add-word`.
  - Tailwind for rapid styling and consistent touch targets.
  - Node runtimes enable integrating Supabase/S3 SDKs easily.
