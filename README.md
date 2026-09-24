# cloudflare-worker-proxy
Cloudflare Worker for nimendra.online and api.nimendra.online.
Handles redirects for main, www, and workers.dev hostnames.
Serves terminal-friendly API output (best with curl).
Routes: /, /about, /now, /links.
Bio link page: links.nimendra.online (HTML for browsers, ANSI for curl).
Unknown routes return 404.
Entry point: src/index.js.
Run locally: `npx wrangler dev`
Deploy: `npx wrangler deploy`
