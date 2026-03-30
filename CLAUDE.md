# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Russian-language furniture store website (physical store, no e-commerce) for **Мебельная Мозайка** at ocherednichenko.ru. Built with Next.js 15 + Payload CMS 3 embedded in the same process.

## Development Commands

```bash
npm run dev              # Start dev server (Next.js + Payload CMS together)
npm run build            # Production build
npx payload generate:types   # Regenerate src/payload-types.ts after changing collections
npx payload migrate:create --name <name>  # Generate a new DB migration locally (requires DATABASE_URL)
```

**Local dev requires a running PostgreSQL.** Use `docker-compose.dev.yml` or set `DATABASE_URL` manually.

## Architecture

### Next.js + Payload CMS integration
Payload CMS runs **inside** the Next.js process via `@payloadcms/next`. The admin panel is at `/admin`. There is no separate backend server — Payload's API is exposed via Next.js route handlers under `src/app/(payload)/`.

Route groups:
- `src/app/(frontend)/` — public site (layout with Header/Footer)
- `src/app/(payload)/` — Payload CMS admin and API routes

### CSS scoping
`globals.css` (Tailwind) is imported in `src/app/(frontend)/layout.tsx` **not** in the root `src/app/layout.tsx`. This prevents Tailwind Preflight from breaking the Payload admin UI.

### Database migrations
Migrations live in `src/migrations/` and are **committed to the repo**. The production Docker `migrate` service runs `payload migrate` only — it never auto-generates migrations.

**Workflow for schema changes:**
1. Change a collection in `src/collections/`
2. Run `npx payload migrate:create --name <description>` locally (needs local postgres)
3. Run `npx payload generate:types` to update `src/payload-types.ts`
4. Commit both the migration files and updated types
5. Deploy — `migrate` service applies the migration automatically

### Collections (src/collections/)
- `Users` — admin users only, auth enabled
- `Media` — file uploads, images auto-resized to `thumbnail` (400×300) and `card` (800×600)
- `Banners` — homepage announcements/promos, filtered by `isActive`
- `ContentBlocks` — homepage content sections with image + text, ordered by `order` field
- `Products` — catalog items with category enum, has supplier fields for future scraping
- `Suppliers` — furniture suppliers shown on `/suppliers` page

All collections require `npx payload generate:types` after changes.

### Key constants
`src/constants/store.ts` — single source of truth for store name, phones, address, working hours, and social links. Used across all pages and components.

### Image domains
`next.config.ts` — `remotePatterns` is restricted to `ocherednichenko.ru` and `localhost`. Add new domains explicitly when integrating external image sources.

## Production Deploy (VPS: /opt/mozaika)

```bash
# Full deploy
git pull && sudo docker compose up --build -d

# After nginx.conf changes — full restart required (bind mount inode issue with git pull)
sudo docker compose restart nginx

# Apply nginx config without restart (only when file was edited in-place, not via git)
sudo docker compose exec nginx nginx -s reload

# Run only a specific service (e.g. after adding Netdata)
sudo docker compose up -d netdata
```

**Important:** `git pull` replaces files (new inode), which breaks Docker bind mounts. Always use `docker compose restart <service>` after pulling config file changes, not just `nginx -s reload`.

### Docker stack
- `app` — Next.js production server
- `postgres` — PostgreSQL 16, data in `pgdata` volume
- `migrate` — runs `payload migrate` on startup, exits when done; `app` waits for it
- `nginx` — reverse proxy, SSL termination, serves `/media/` directly
- `netdata` — monitoring dashboard at `https://ocherednichenko.ru/netdata/` (IP-restricted)

### Environment variables required
`DATABASE_URL`, `PAYLOAD_SECRET`, `POSTGRES_PASSWORD`, `NEXT_PUBLIC_SERVER_URL` — app throws on startup if missing (no fallback defaults).

## Monitoring (Netdata)

- Dashboard: `https://ocherednichenko.ru/netdata/` — IP whitelisted only
- Nginx metrics via `stub_status` on port 80 at `/stub_status`
- Netdata go.d config: `/etc/netdata/go.d/nginx.conf` inside the container
- Metrics retention config: `/etc/netdata/netdata.conf` → `[db]` section
- Docker prune cron: runs weekly to prevent build cache accumulation
