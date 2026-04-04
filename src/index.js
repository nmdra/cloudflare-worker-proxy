// src/index.js

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";
    const isCurl = userAgent.toLowerCase().includes("curl");
    const blogHostname = new URL(env.BLOG_URL).hostname;

    // ── Redirects ──────────────────────────────────────────
    if (url.hostname === "nimendra.xyz" || url.hostname === "www.nimendra.xyz") {
      url.hostname = blogHostname;
      return Response.redirect(url.toString(), 301);
    }

    if (url.hostname === "hello.nimendra.xyz") {
      url.hostname = blogHostname;
      url.pathname = "/about";
      return Response.redirect(url.toString(), 301);
    }

    if (url.hostname === env.WORKERS_DEV_URL) {
      url.hostname = blogHostname;
      return Response.redirect(url.toString(), 301);
    }

    // ── Terminal Portfolio API (api.nimendra.xyz) ──────────
    if (url.hostname === "api.nimendra.xyz") {

      if (!isCurl) {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="5;url=${env.BLOG_URL}">
<title>Nimendra API</title>
<style>
body {
background: #0d1117;
color: #c9d1d9;
font-family: monospace;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
margin: 0;
}
.box {
text-align: center;
border: 1px solid #30363d;
padding: 2rem 3rem;
border-radius: 8px;
}
.green  { color: #3fb950; }
.dim    { color: #6e7681; }
.cyan   { color: #58a6ff; }
code {
background: #161b22;
padding: 0.4rem 0.8rem;
border-radius: 4px;
display: inline-block;
margin-top: 1rem;
color: #3fb950;
}
.redirect { margin-top: 1.5rem; font-size: 0.85rem; }
</style>
</head>
<body>
<div class="box">
<p class="green">👋 Hi, I'm Nimendra</p>
<p class="dim">this API is meant to be accessed via terminal</p>
<code>curl api.nimendra.xyz</code>
<p class="redirect dim">
redirecting to <span class="cyan">${env.BLOG_URL}</span> in 5 seconds...
</p>
</div>
</body>
</html>`;

        return new Response(html, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }


      // ── Rate Limiting ──────────────────────────────────
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const { success } = await env.RATE_LIMITER.limit({ key: `${ip}:${url.pathname}` });

      if (!success) {
        return new Response(
          "\x1b[31m\x1b[1m  429 — slow down!\x1b[0m\n  you're making too many requests. try again in a minute.\n\n",
          {
            status: 429,
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Retry-After": "60",
            },
          }
        );
      }

      // ── Colors ─────────────────────────────────────────
      const RESET = "\x1b[0m";
      const BOLD = "\x1b[1m";
      const CYAN = "\x1b[36m";
      const GREEN = "\x1b[32m";
      const YELLOW = "\x1b[33m";
      const RED = "\x1b[31m";
      const DIM = "\x1b[2m";
      const WHITE = "\x1b[37m";

      const link = (text, href) =>
        `\x1b]8;;${href}\x1b\\${CYAN}${text}${RESET}\x1b]8;;\x1b\\`;

      const divider = `${DIM}${"─".repeat(40)}${RESET}`;

      // ── Dynamic Footer ─────────────────────────────────
      const now = new Date();
      const year = now.getFullYear();
      const month = now.toLocaleString("en", { month: "long" });
      const day = now.getDate();

      const footer = `
${divider}
${DIM}Made with ❤️  by NIMENDRA | ${day} ${month} ${year}${RESET}
${DIM}Powered by Cloudflare Workers ⚡${RESET}
${divider}
`;

      const headers = () => ({
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      });

      const path = url.pathname;

      // GET /
      if (path === "/" || path === "") {
        const body = `
${divider}
${GREEN}${BOLD}  Hi, I'm NIMENDRA 👋${RESET}
${WHITE}A Software Engineering student at SLIIT, Sri Lanka${RESET}
${DIM}who loves to build things, break things, and learn from both.${RESET}
${divider}

${WHITE}I'm into DevOps, Linux, and Open Source — basically anything
that lets me dig deeper into how systems actually work.
Right now I'm exploring AWS, K8s, Go & Distributed Systems.${RESET}

${divider}

${YELLOW}Here's what you can explore:${RESET}
${WHITE}  curl api.nimendra.xyz${CYAN}/about${RESET}   ${DIM}— a bit more about me${RESET}
${WHITE}  curl api.nimendra.xyz${CYAN}/now${RESET}     ${DIM}— what i'm up to lately${RESET}
${WHITE}  curl api.nimendra.xyz${CYAN}/links${RESET}   ${DIM}— where to find me${RESET}

${footer}
`;
        return new Response(body, { headers: headers() });
      }

      // GET /about
      if (path === "/about") {
        const body = `
${divider}
${GREEN}${BOLD}  About me${RESET}
${divider}

${WHITE}I'm ${env.DISPLAY_NAME}, a Software Engineering student at SLIIT,
Sri Lanka. I spend most of my time tinkering with systems,
automating things I probably shouldn't, and going down
rabbit holes on Linux and DevOps.${RESET}

${WHITE}Outside of tech, I enjoy reading — mostly sci-fi, self-help,
and the occasional manga when I need a break.${RESET}

${YELLOW}Things I care about:${RESET}
${WHITE}  DevOps · Linux · Open Source · Philosophy${RESET}

${footer}
`;
        return new Response(body, { headers: headers() });
      }

      // GET /now
      if (path === "/now") {
        const body = `
${divider}
${GREEN}${BOLD}  What I'm up to right now${RESET}
${divider}

${WHITE}Lately I've been going deep on cloud and distributed systems.
It's a lot to take in, but honestly I'm enjoying every bit of it.${RESET}

${YELLOW}Currently learning:${RESET}
${WHITE}  AWS · Kubernetes · Go (Golang)${RESET}
${WHITE}  Distributed Systems · System Design${RESET}
${WHITE}  dabbling in ML on the side too${RESET}

${YELLOW}Currently reading:${RESET}  ${DIM}${link("goodreads.com/nimendra", env.GOODREADS)}${RESET}
${WHITE}  The Strength of few · Sapiens${RESET}

${DIM}Last updated: ${env.LAST_UPDATED}${RESET}

${footer}
`;
        return new Response(body, { headers: headers() });
      }

      // GET /links
      if (path === "/links") {
        const body = `
${divider}
${GREEN}${BOLD}  Find me online${RESET}
${divider}

${WHITE}I'm most active on GitHub and Twitter.
Feel free to reach out anytime!${RESET}

${WHITE}  Github    ${link("github.com/nmdra", env.GITHUB_URL)}
${WHITE}  Twitter   ${link("@nimendra_", env.TWITTER_URL)}
${WHITE}  LinkedIn  ${link("in/nimendra", env.LINKEDIN_URL)}
${WHITE}  Blog      ${link("blog.nimendra.xyz", env.BLOG_URL)}
${WHITE}  Email     ${link(env.EMAIL, `mailto:${env.EMAIL}`)}

${footer}
`;
        return new Response(body, { headers: headers() });
      }

      // 404
      const body = `
${divider}
${RED}${BOLD}  404 — hmm, that doesn't exist${RESET}
${divider}

${WHITE}couldn't find "${path}" — but here's what's available:${RESET}

${WHITE}  curl api.nimendra.xyz${CYAN}/${RESET}
${WHITE}  curl api.nimendra.xyz${CYAN}/about${RESET}
${WHITE}  curl api.nimendra.xyz${CYAN}/now${RESET}
${WHITE}  curl api.nimendra.xyz${CYAN}/links${RESET}

${footer}
`;
      return new Response(body, { status: 404, headers: headers() });
    }

    return new Response("Not Found", { status: 404 });
  },
};
