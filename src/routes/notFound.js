import { COLORS, textHeaders } from "../config.js";
import { divider, footer } from "../utils.js";

const { RESET, BOLD, CYAN, RED, WHITE } = COLORS;

export function notFoundPage(path, env) {
  const body = `
${divider}
${RED}${BOLD}  404 — hmm, that doesn't exist${RESET}
${divider}

${WHITE}couldn't find "${path}" — but here's what's available:${RESET}

${WHITE}  curl api.nimendra.online${CYAN}/${RESET}
${WHITE}  curl api.nimendra.online${CYAN}/about${RESET}
${WHITE}  curl api.nimendra.online${CYAN}/now${RESET}
${WHITE}  curl api.nimendra.online${CYAN}/links${RESET}

${footer(env.DISPLAY_NAME)}
`;
  return new Response(body, { status: 404, headers: textHeaders() });
}