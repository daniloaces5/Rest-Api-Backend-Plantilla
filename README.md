# Backend Template (Node + Express + Neon Postgres)

## Quick start
1. Copy `.env.example` to `.env` and fill in values.
2. Install deps: `npm i`
3. Run: `npm run dev`

## Structure
- `src/config` environment and app config
- `src/db` pg pool
- `src/middlewares` security, auth, validation, error handling
- `src/routes` express routers
- `src/controllers` request/response handlers
- `src/services` business logic
- `src/repositories` data access
- `src/utils` helpers

## Endpoints
- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `GET /me` (protected)

## Notes
- JWT auth with access tokens in `Authorization: Bearer <token>`
- Centralized error handling with `AppError`
- Neon Postgres via `pg` using `DATABASE_URL`
