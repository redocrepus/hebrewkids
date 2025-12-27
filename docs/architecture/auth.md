# Auth Design

## Phase 1: Local credentials
- **Signup**: username + password only (no email verification).
- **Password hashing**: Argon2id preferred; bcrypt as fallback. Store per-user salt; enforce minimum length and entropy checks.
- **Sessions**: issue short-lived session JWT (15m) + refresh token (rotating, HttpOnly, Secure). Store refresh token hash in DB with user agent + IP metadata.
- **RLS**: user-owned tables (UserWord, Attempt, MediaAsset) restricted to `ownerUserId = auth.uid()`. Starter content readable by all.
- **Rate limits**: per-IP + per-user for login (e.g., 5/min, 20/hr) and TTS (see below).

## Phase 2: Google OIDC
- **Flow**: initiate Google OAuth, exchange code for ID token, verify audience/issuer, map `sub` to user record.
- **Linking**: allow existing local account to link Google; store provider identities table (`provider`, `providerUserId`, `userId`). Require password re-auth before linking.
- **Sessions**: same token model; issue refresh + session JWT after OIDC login.
- **RLS**: unchanged; `ownerUserId` derived from unified user id.

## Token structure
- JWT claims: `sub`, `iat`, `exp`, `role`, `sessionId`.
- Refresh tokens rotated on use; revoke on reuse detection.

## Storage & secrets
- Store password hash and refresh token hash only. Never store raw refresh.
- Keep `AUTH_JWT_SECRET` env var; rotate via key versioning.

## Session management
- HttpOnly Secure cookies for session and refresh. CSRF token on state-changing endpoints. Logout clears cookies and revokes refresh token.

## Error handling
- Uniform auth errors to prevent user enumeration. Backoff after repeated failures.
