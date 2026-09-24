import { COLORS, textHeaders } from "../config.js";
import { divider, footer, link } from "../utils.js";

const { RESET, BOLD, GREEN, WHITE } = COLORS;

export function linksPage(env) {
  const body = `
${divider}
${GREEN}${BOLD}  Find me online${RESET}
${divider}

${WHITE}I'm most active on GitHub, Twitter, and Bluesky.
Feel free to reach out anytime!${RESET}

${WHITE}  Github    ${link("github.com/nmdra",  env.GITHUB_URL)}
${WHITE}  Twitter   ${link("@nimendra_",        env.TWITTER_URL)}
${WHITE}  Bluesky   ${link("@nimendra.online", env.BSKY_URL)}
${WHITE}  LinkedIn  ${link("in/nimendra",       env.LINKEDIN_URL)}
${WHITE}  Blog      ${link("blog.nimendra.online", env.BLOG_URL)}
${WHITE}  Email     ${link(env.EMAIL,           `mailto:${env.EMAIL}`)}

${footer(env.DISPLAY_NAME)}
`;
  return new Response(body, { headers: textHeaders() });
}
