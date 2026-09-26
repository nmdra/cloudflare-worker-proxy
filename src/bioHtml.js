// Terminal-style bio link page for browsers

const ICONS = {
  github: "https://cdn.simpleicons.org/github/6e7681",
  x: "https://cdn.simpleicons.org/x/6e7681",
  bluesky: "https://cdn.simpleicons.org/bluesky/6e7681",
  linkedin: "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/linkedin.svg",
  goodreads: "https://cdn.simpleicons.org/goodreads/6e7681",
  blog: "https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/pen-line.svg",
  email: "https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/mail.svg",
};

export function bioHtmlPage(env) {
  const links = [
    { label: "Blog", sub: "Writing and notes", href: env.BLOG_URL, primary: true, icon: ICONS.blog },
    { label: "GitHub", sub: "Projects and experiments", href: env.GITHUB_URL, icon: ICONS.github },
    { label: "Twitter", sub: "@nimendra_", href: env.TWITTER_URL, icon: ICONS.x },
    { label: "Bluesky", sub: "@nimendra.online", href: env.BSKY_URL, icon: ICONS.bluesky },
    { label: "LinkedIn", sub: "Work and experience", href: env.LINKEDIN_URL, icon: ICONS.linkedin },
    { label: "Goodreads", sub: "Books I'm reading", href: env.GOODREADS, icon: ICONS.goodreads },
    { label: "Email", sub: env.EMAIL, href: `mailto:${env.EMAIL}`, icon: ICONS.email },
  ];

  const buttons = links
    .map(
      (l) => `
      <a class="link${l.primary ? " primary" : ""}" href="${l.href}" rel="noopener">
        <span class="icon" style="-webkit-mask-image:url('${l.icon}');mask-image:url('${l.icon}')" aria-hidden="true"></span>
        <span class="label">${l.label}</span>
        <span class="sub">${l.sub}</span>
        <span class="arrow" aria-hidden="true">&gt;</span>
      </a>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0d1117">
  <meta name="description" content="Links for ${env.DISPLAY_NAME} — writing, projects, and more.">
  <meta property="og:title" content="${env.DISPLAY_NAME} — Links">
  <meta property="og:description" content="Find my writing, projects, and profiles in one place.">
  <meta property="og:type" content="profile">
  <meta property="og:image" content="https://links.nimendra.online/icon-512.png">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <title>${env.DISPLAY_NAME} — Links</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    :root {
      color-scheme: dark;
      --bg: #0d1117;
      --surface: #161b22;
      --border: #35404d;
      --text: #e6edf3;
      --muted: #aab4c0;
      --green: #63dc9b;
      --cyan: #84c8ff;
    }

    body {
      min-height: 100vh;
      margin: 0;
      padding: clamp(1rem, 5vw, 3rem) 1rem;
      background: radial-gradient(ellipse at 50% 0%, #173127 0%, var(--bg) 55%);
      color: var(--text);
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 15px;
      line-height: 1.5;
      display: grid;
      place-items: center;
      -webkit-font-smoothing: antialiased;
    }

    .card {
      width: min(100%, 540px);
      overflow: hidden;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: 0 24px 70px #0006;
    }

    .window-bar {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      min-height: 42px;
      padding: 0 1.25rem;
      border-bottom: 1px solid var(--border);
      color: var(--muted);
      font-size: 0.75rem;
    }

    .dot { width: 8px; height: 8px; border-radius: 50%; background: #5e6b78; }
    .dot:first-child { background: var(--green); }
    .window-title { margin-left: auto; }

    .content { padding: clamp(1.25rem, 5vw, 2.25rem); }

    .prompt { margin: 0 0 1rem; color: var(--muted); font-size: 0.8rem; }
    .prompt span { color: var(--cyan); }

    h1 {
      margin: 0;
      color: var(--green);
      font-size: clamp(1.75rem, 7vw, 2.5rem);
      letter-spacing: -0.04em;
      line-height: 1.2;
    }

    .bio { margin: 0.85rem 0 2rem; max-width: 43ch; color: var(--muted); }

    .section-heading {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 0 0 0.9rem;
      color: var(--muted);
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .section-heading::after { content: ""; height: 1px; flex: 1; background: var(--border); }

    .links { display: grid; gap: 0.65rem; }

    .link {
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr) 20px;
      grid-template-rows: auto auto;
      column-gap: 0.9rem;
      align-items: center;
      min-height: 68px;
      padding: 0.75rem 1rem;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 9px;
      color: var(--text);
      text-decoration: none;
      transition: border-color 0.15s ease, background-color 0.15s ease, transform 0.15s ease;
    }

    .link.primary { border-color: #3f8661; background: #14251d; }
    .link:hover { border-color: var(--green); background: #1b3026; transform: translateY(-2px); }
    .link:focus-visible { outline: 2px solid var(--cyan); outline-offset: 3px; }
    .link:active { transform: translateY(0); }

    .icon {
      grid-row: 1 / 3;
      width: 20px;
      height: 20px;
      background: var(--muted);
      -webkit-mask-size: contain;
      mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-position: center;
    }
    .primary .icon, .link:hover .icon { background: var(--green); }

    .label { grid-column: 2; font-weight: 700; }
    .primary .label { color: var(--green); }
    .sub { grid-column: 2; color: var(--muted); font-size: 0.8rem; overflow-wrap: anywhere; }
    .arrow { grid-column: 3; grid-row: 1 / 3; color: var(--muted); text-align: right; }
    .link:hover .arrow { color: var(--green); }

    .footer {
      margin: 1.75rem 0 0;
      color: var(--muted);
      font-size: 0.75rem;
      text-align: center;
    }
    .footer span { color: var(--cyan); }

    @media (max-width: 380px) {
      .link { column-gap: 0.7rem; padding-inline: 0.8rem; }
    }

    @media (prefers-reduced-motion: reduce) {
      .link { transition: none; }
      .link:hover { transform: none; }
    }
  </style>
</head>
<body>
  <main class="card">
    <div class="window-bar" aria-hidden="true">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span class="window-title">links.nimendra.online</span>
    </div>
    <div class="content">
      <p class="prompt"><span>~</span> $ whoami</p>
      <h1>${env.DISPLAY_NAME}</h1>
      <p class="bio">I tinker with SRE, AI, Linux, and open source. Here's where I write, build, and spend time online.</p>
      <h2 class="section-heading" id="links-heading">Find me online</h2>
      <nav class="links" aria-labelledby="links-heading">
${buttons}
      </nav>
      <p class="footer">Made for humans. <span>curl</span> welcome.</p>
    </div>
  </main>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
