# cloudflare-worker-proxy

A Cloudflare Worker that powers a terminal-friendly personal API and hostname redirects for `nimendra.xyz`.

## What it does

- Redirects:
  - `nimendra.xyz` / `www.nimendra.xyz` → `BLOG_URL`
  - `hello.nimendra.xyz` → `BLOG_URL/about`
  - `WORKERS_DEV_URL` → `BLOG_URL`
- Serves terminal-oriented text responses on `api.nimendra.xyz` (best with `curl`)
- Shows a small browser page (with auto-redirect to blog) for non-CLI visitors
- Applies rate limiting per `IP + path`

## Routes (`api.nimendra.xyz`)

- `/` – intro
- `/about` – about page
- `/now` – current focus + reading
- `/links` – social/contact links
- any other path – 404 with available route hints

## Configuration

Configured via `wrangler.toml`:

- `main = "src/index.js"`
- `[vars]`:
  - `DISPLAY_NAME`
  - `BLOG_URL`
  - `GITHUB_URL`
  - `TWITTER_URL`
  - `LINKEDIN_URL`
  - `EMAIL`
  - `GOODREADS`
  - `LAST_UPDATED`
  - `WORKERS_DEV_URL`
- `[[ratelimits]]` binding:
  - `name = "RATE_LIMITER"`

## Local development

```bash
npm create cloudflare@latest
# or install Wrangler if you don't have it:
npm i -D wrangler
npx wrangler dev
```

## Deploy

```bash
npx wrangler deploy
```
