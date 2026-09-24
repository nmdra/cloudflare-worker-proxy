# Plan: links.nimendra.online improvements

**Status:** Ready to implement  
**Repo:** `cloudflare-worker-proxy`  
**Host:** `links.nimendra.online` (+ shared copy on API pages)

## Goals

1. Replace “DevOps” with **SRE + AI** in bio/copy (all pages)
2. Add **Bluesky** link everywhere links are listed
3. **CDN icons** on bio HTML (replacing `>`)
4. **Favicon** from NIME/NDRA logo; serve from Worker

---

## 1. Copy — DevOps → SRE + AI

**Tagline:** `SRE · AI · Linux · open source`

| File | From | To |
|------|------|-----|
| `src/bioHtml.js` | `DevOps · Linux · open source` | `SRE · AI · Linux · open source` |
| `src/routes/bioText.js` | same | same |
| `src/routes/home.js` | `I'm into DevOps, Linux, and Open Source — …` | `I'm into SRE, AI, Linux, and Open Source — …` |
| `src/routes/about.js` | `… Linux and DevOps.` | `… Linux, SRE, and AI.` |
| `src/routes/about.js` | `DevOps · Linux · Open Source · Philosophy` | `SRE · AI · Linux · Open Source · Philosophy` |

**Unchanged:** `now.js` learning list (optional later: add AI).

---

## 2. Bluesky

**URL:** `https://bsky.app/profile/nimendra.online`  
**Label:** `Bluesky` · **sub/display:** `@nimendra.online`  
**Position:** after Twitter, before LinkedIn

| File | Change |
|------|--------|
| `wrangler.toml` | `BSKY_URL = "https://bsky.app/profile/nimendra.online"` |
| `src/bioHtml.js` | links[] entry with `env.BSKY_URL`, icon slug `bluesky` |
| `src/routes/bioText.js` | `> Bluesky` row + OSC 8 link |
| `src/routes/links.js` | `Bluesky` row; optional intro “GitHub, Twitter, and Bluesky” |

Bio HTML link count: **6 → 7** (within 3–7 best practice).

---

## 3. CDN icons (bio HTML only)

**Hybrid libraries (pinned versions at implement time):**

- **Simple Icons:** GitHub, X/Twitter, LinkedIn, **Bluesky**, Goodreads — `https://cdn.simpleicons.org/{slug}/6e7681`
- **Lucide:** Blog → `pen-line`, Email → `mail` via jsDelivr `lucide-static`

**Implementation:**

- Add `icon` (CDN URL) to each `links[]` entry
- Replace `>` with icon element; grid: icon | label | sub
- **CSS mask** + `background: currentColor` (dim default, green primary/hover)
- `aria-hidden="true"` on icons; keep text labels
- **ANSI (`bioText.js`):** no CDN icons — keep `>`

---

## 4. Favicon (from provided logo)

**Source:** user-supplied image (black bg, white **NIME/NDRA**); regenerate during implement into `assets/` + `public/` (ImageMagick).

**Outputs → `public/`:**

| File | Sizes | Purpose |
|------|-------|---------|
| `favicon.ico` | 16, 32, 48 | tab |
| `apple-touch-icon.png` | 180 | iOS |
| `icon-192.png` | 192 | Android/PWA |
| `icon-512.png` | 512 | splash / og:image |
| `favicon.svg` | optional | modern browsers |

**Legibility default:** monogram **N** for 16/32; full wordmark for 180+.

**Serve — Workers Static Assets:**

```toml
[assets]
directory = "./public"
```

`index.js`: serve known icon paths via `env.ASSETS.fetch` **before** bio host catch-all (and for API host).

**HTML head** (bio HTML + `browser.js`):

- `<link rel="icon" href="/favicon.ico" sizes="48x48">`
- `<link rel="icon" href="/favicon.svg" …>` if present
- `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`
- `og:image` → absolute `https://links.nimendra.online/icon-512.png`

---

## 5. Files touched (summary)

| Path | Work |
|------|------|
| `wrangler.toml` | `BSKY_URL`, `[assets]` |
| `src/index.js` | asset path routing |
| `src/bioHtml.js` | tagline, Bluesky, icons, favicon/OG tags |
| `src/routes/bioText.js` | tagline, Bluesky |
| `src/routes/links.js` | Bluesky (+ optional intro) |
| `src/routes/home.js` | SRE/AI copy |
| `src/routes/about.js` | SRE/AI copy |
| `src/browser.js` | favicon links |
| `public/*` | generated icons |
| `assets/*` | source/logo derivation |

---

## 6. Verification

1. Generate icons; visual check 16px vs 180px  
2. `node --check` on changed JS  
3. Smoke: home/about/bio HTML+ANSI — taglines, Bluesky, icon CDN URLs, favicon tags  
4. `npx wrangler dev` — `/favicon.ico` 200, bio page OK  
5. Confirm no remaining `DevOps` (except intentional)

---

## 7. Ship

- Suggested commits:
  - `docs: update bio copy to SRE and AI`
  - `feat: add Bluesky, CDN icons, and favicon assets`
- Push  
- Deploy: set `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` for Actions, **or** `npx wrangler login && npx wrangler deploy`

---

## Out of scope

- GH Actions secrets setup (manual)
- Custom designed OG image beyond `icon-512`
- Rate limit on bio host
- `now.js` “AI” learning line (optional follow-up)

---

## Defaults

1. Small favicon = monogram **N**; large = full logo  
2. Bluesky between Twitter and LinkedIn  
3. Hybrid Simple Icons + Lucide; icons replace `>`  
4. Static assets under `public/`
