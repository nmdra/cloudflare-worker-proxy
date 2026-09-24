import { COLORS, textHeaders } from "../config.js";
import { divider, footer } from "../utils.js";

const { RESET, BOLD, GREEN, YELLOW, WHITE } = COLORS;

export function aboutPage(env) {
  const body = `
${divider}
${GREEN}${BOLD}  About me${RESET}
${divider}

${WHITE}I'm ${env.DISPLAY_NAME}. I spend most of my time tinkering with systems,
automating things I probably shouldn't, and going down
rabbit holes on Linux, SRE, and AI.${RESET}

${WHITE}Outside of tech, I enjoy reading — mostly sci-fi, self-help,
and the occasional manga when I need a break.${RESET}

${YELLOW}Things I care about:${RESET}
${WHITE}  SRE · AI · Linux · Open Source · Philosophy${RESET}

${footer(env.DISPLAY_NAME)}
`;
  return new Response(body, { headers: textHeaders() });
}