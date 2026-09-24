// Browser Notice for API

export function browserResponse(blogUrl) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="5;url=${blogUrl}">
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
    .green { color: #3fb950; }
    .dim   { color: #6e7681; }
    .cyan  { color: #58a6ff; }
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
    <code>curl api.nimendra.online</code>
    <p class="redirect dim">
      redirecting to <span class="cyan">${blogUrl}</span> in 5 seconds...
    </p>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}