import { COLORS, textHeaders } from "../config.js";
import { divider, footer } from "../utils.js";

const { RESET, BOLD, CYAN, GREEN, YELLOW, WHITE, DIM } = COLORS;

export function homePage(env) {
  const body = `
${divider}
${GREEN}${BOLD}  Hi, I'm ${env.DISPLAY_NAME} 👋${RESET}
${WHITE}A Software Engineering student at SLIIT, Sri Lanka${RESET}
${DIM}who loves to build things, break things, and learn from both.${RESET}
${divider}

${WHITE}I'm into DevOps, Linux, and Open Source — basically anything
that lets me dig deeper into how systems actually work.
Right now I'm exploring AWS, K8s, Go & Distributed Systems.${RESET}

${divider}

${YELLOW}Here's what you can explore:${RESET}
${WHITE}  curl api.nimendra.online${CYAN}/about${RESET}   ${DIM}— a bit more about me${RESET}
${WHITE}  curl api.nimendra.online${CYAN}/now${RESET}     ${DIM}— what i'm up to lately${RESET}
${WHITE}  curl api.nimendra.online${CYAN}/links${RESET}   ${DIM}— where to find me${RESET}

${footer(env.DISPLAY_NAME)}
`;
  return new Response(body, { headers: textHeaders() });
}