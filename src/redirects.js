export function handleRedirects(url, env) {
  const blogHostname = new URL(env.BLOG_URL).hostname;

  if (url.hostname === "nimendra.online" || url.hostname === "www.nimendra.online") {
    url.hostname = blogHostname;
    return Response.redirect(url.toString(), 301);
  }

  if (url.hostname === env.WORKERS_DEV_URL) {
    url.hostname = blogHostname;
    return Response.redirect(url.toString(), 301);
  }

  return null; // no redirect matched
}
