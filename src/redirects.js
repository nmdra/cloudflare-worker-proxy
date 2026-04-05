export function handleRedirects(url, env) {
  const blogHostname = new URL(env.BLOG_URL).hostname;

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

  return null; // no redirect matched
}