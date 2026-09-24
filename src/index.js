import { handleRedirects }  from "./redirects.js";
import { browserResponse }  from "./browser.js";
import { homePage }         from "./routes/home.js";
import { aboutPage }        from "./routes/about.js";
import { nowPage }          from "./routes/now.js";
import { linksPage }        from "./routes/links.js";
import { notFoundPage }     from "./routes/notFound.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";
    const isCurl = userAgent.toLowerCase().includes("curl");

    // ── Redirects ────────────────────────────────────────
    const redirect = handleRedirects(url, env);
    if (redirect) return redirect;

    // ── API ──────────────────────────────────────────────
    if (url.hostname === "api.nimendra.online") {

      if (!isCurl) return browserResponse(env.BLOG_URL);

      // ── Rate Limiting ──────────────────────────────────
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const { success } = await env.RATE_LIMITER.limit({ key: `${ip}:${url.pathname}` });

      if (!success) {
        return new Response(
          "\x1b[31m\x1b[1m  429 — slow down!\x1b[0m\n  you're making too many requests. try again in a minute.\n\n",
          { status: 429, headers: { "Content-Type": "text/plain; charset=utf-8", "Retry-After": "60" } }
        );
      }

      // ── Routes ────────────────────────────────────────
      const path = url.pathname;

      if (path === "/" || path === "") return homePage(env);
      if (path === "/about")          return aboutPage(env);
      if (path === "/now")            return nowPage(env);
      if (path === "/links")          return linksPage(env);

      return notFoundPage(path, env);
    }

    return new Response("Not Found", { status: 404 });
  },
};