# cloudflare-worker-proxy
Cloudflare Worker for nimendra.xyz and api.nimendra.xyz.
Handles redirects for main, www, hello, and workers.dev hostnames.
Serves terminal-friendly API output (best with curl).
Routes: /, /about, /now, /links.
Unknown routes return 404.
Entry point: src/index.js.
Run locally: `npx wrangler dev`
Deploy: `npx wrangler deploy`
