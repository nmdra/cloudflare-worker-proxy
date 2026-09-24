import { COLORS, textHeaders } from "../config.js";
import { divider, footer, link } from "../utils.js";

const { RESET, BOLD, GREEN, WHITE, DIM, CYAN } = COLORS;

export function bioTextPage(env) {
  const body = `
${divider}
${DIM}~ / ${CYAN}links${RESET}
${GREEN}${BOLD}  ${env.DISPLAY_NAME}${RESET}
${DIM}DevOps · Linux · open source${RESET}
${divider}

${WHITE}  > Blog      ${link("blog.nimendra.online",           env.BLOG_URL)}
${WHITE}  > GitHub    ${link("github.com/nmdra",               env.GITHUB_URL)}
${WHITE}  > Twitter   ${link("@nimendra_",                     env.TWITTER_URL)}
${WHITE}  > LinkedIn  ${link("in/nimendra",                    env.LINKEDIN_URL)}
${WHITE}  > Goodreads ${link("goodreads.com/nimendra",         env.GOODREADS)}
${WHITE}  > Email     ${link(env.EMAIL,                        `mailto:${env.EMAIL}`)}

${footer(env.DISPLAY_NAME)}
`;
  return new Response(body, { headers: textHeaders() });
}
