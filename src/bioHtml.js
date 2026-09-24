// Terminal-style bio link page for browsers

export function bioHtmlPage(env) {
  const links = [
    { label: "Blog", sub: "writing & notes", href: env.BLOG_URL, primary: true },
    { label: "GitHub", sub: "code & projects", href: env.GITHUB_URL },
    { label: "Twitter", sub: "@nimendra_", href: env.TWITTER_URL },
    { label: "LinkedIn", sub: "in/nimendra", href: env.LINKEDIN_URL },
    { label: "Goodreads", sub: "what i'm reading", href: env.GOODREADS },
    { label: "Email", sub: env.EMAIL, href: `mailto:${env.EMAIL}` },
  ];

  const buttons = links
    .map(
      (l) => `
      <a class="btn${l.primary ? " primary" : ""}" href="${l.href}" rel="noopener">
        <span class="prompt">&gt;</span>
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
  <meta name="description" content="Links for ${env.DISPLAY_NAME} — blog, GitHub, and more.">
  <meta property="og:title" content="${env.DISPLAY_NAME} — Links">
  <meta property="og:description" content="Find me online: blog, GitHub, Twitter, LinkedIn, and more.">
  <meta property="og:type" content="profile">
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

    .btn .prompt {
      color: var(--dim);
      font-weight: 700;
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

    .btn.primary .prompt,
    .btn.primary .label {
      color: var(--green);
    }

    .btn:hover {
      border-color: var(--green);
      background: #1c2128;
      transform: translateY(-1px);
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
    <p class="bio">SE student · DevOps · Linux · open source</p>
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
