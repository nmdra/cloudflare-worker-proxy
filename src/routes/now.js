import { COLORS, textHeaders } from "../config.js";
import { divider, footer, link } from "../utils.js";

const { RESET, BOLD, GREEN, YELLOW, WHITE, DIM } = COLORS;

export function nowPage(env) {
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

${footer(env.DISPLAY_NAME)}
`;
  return new Response(body, { headers: textHeaders() });
}