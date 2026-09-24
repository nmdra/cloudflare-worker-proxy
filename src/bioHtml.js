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
    { label: "Blog", sub: "writing & notes", href: env.BLOG_URL, primary: true, icon: ICONS.blog },
    { label: "GitHub", sub: "code & projects", href: env.GITHUB_URL, icon: ICONS.github },
    { label: "Twitter", sub: "@nimendra_", href: env.TWITTER_URL, icon: ICONS.x },
    { label: "Bluesky", sub: "@nimendra.online", href: env.BSKY_URL, icon: ICONS.bluesky },
    { label: "LinkedIn", sub: "in/nimendra", href: env.LINKEDIN_URL, icon: ICONS.linkedin },
    { label: "Goodreads", sub: "what i'm reading", href: env.GOODREADS, icon: ICONS.goodreads },
    { label: "Email", sub: env.EMAIL, href: `mailto:${env.EMAIL}`, icon: ICONS.email },
  ];

  const buttons = links
    .map(
      (l) => `
      <a class="btn${l.primary ? " primary" : ""}" href="${l.href}" rel="noopener">
        <span class="icon" style="-webkit-mask-image:url('${l.icon}');mask-image:url('${l.icon}')" aria-hidden="true"></span>
        <span class="label">${l.label}</span>
        <span class="sub">${l.sub}</span>
      </a>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0d1117">
  <meta name="description" content="Links for ${env.DISPLAY_NAME} — blog, GitHub, Bluesky, and more.">
  <meta property="og:title" content="${env.DISPLAY_NAME} — Links">
  <meta property="og:description" content="Find me online: blog, GitHub, Bluesky, LinkedIn, and more.">
  <meta property="og:type" content="profile">
  <meta property="og:image" content="https://links.nimendra.online/icon-512.png">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <title>${env.DISPLAY_NAME} — Links</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0d1117;
      --surface: #161b22;
      --border: #30363d;
      --text: #c9d1d9;
      --dim: #6e7681;
      --green: #3fb950;
      --cyan: #58a6ff;
    }

    html { height: 100%; }

    body {
      min-height: 100%;
      background: var(--bg);
      color: var(--text);
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 15px;
      line-height: 1.5;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 2.5rem 1rem;
      -webkit-font-smoothing: antialiased;
    }

    .card {
      width: 100%;
      max-width: 420px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.75rem 1.5rem;
    }

    .prompt-line {
      color: var(--dim);
      font-size: 0.8rem;
      margin-bottom: 1.25rem;
    }

    .prompt-line .path { color: var(--cyan); }

    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--green);
      margin-bottom: 0.35rem;
    }

    .bio {
      color: var(--dim);
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
    }

    .divider {
      border: none;
      border-top: 1px dashed var(--border);
      margin: 0 0 1.25rem;
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .btn {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 0.75rem;
      min-height: 48px;
      padding: 0.65rem 0.9rem;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text);
      text-decoration: none;
      transition: border-color 0.15s ease, background-color 0.15s ease, transform 0.1s ease;
    }

    .btn .icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      background-color: var(--dim);
      -webkit-mask-size: contain;
      mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-position: center;
      transition: background-color 0.15s ease;
    }

    .btn .label {
      font-weight: 600;
      color: var(--text);
    }

    .btn .sub {
      color: var(--dim);
      font-size: 0.75rem;
      text-align: right;
      max-width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .btn.primary {
      border-color: var(--green);
    }

    .btn.primary .icon {
      background-color: var(--green);
    }

    .btn.primary .label {
      color: var(--green);
    }

    .btn:hover {
      border-color: var(--green);
      background: #1c2128;
      transform: translateY(-1px);
    }

    .btn:hover .icon {
      background-color: var(--green);
    }

    .btn:focus-visible {
      outline: 2px solid var(--cyan);
      outline-offset: 2px;
    }

    .btn:active {
      transform: translateY(0);
    }

    .footer {
      margin-top: 1.5rem;
      text-align: center;
      color: var(--dim);
      font-size: 0.75rem;
    }

    .footer .host { color: var(--cyan); }

    @media (max-width: 380px) {
      .btn {
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
      }
      .btn .sub {
        grid-column: 2;
        text-align: left;
        max-width: none;
      }
      .btn .icon {
        grid-row: 1;
      }
      .btn .label {
        grid-column: 2;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .btn { transition: none; }
      .btn:hover { transform: none; }
    }
  </style>
</head>
<body>
  <main class="card">
    <p class="prompt-line">~ / <span class="path">links</span></p>
    <h1>${env.DISPLAY_NAME}</h1>
    <p class="bio">SRE · AI · Linux · open source</p>
    <hr class="divider">
    <nav class="links" aria-label="Links">
${buttons}
    </nav>
    <p class="footer"><span class="host">links.nimendra.online</span></p>
  </main>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
