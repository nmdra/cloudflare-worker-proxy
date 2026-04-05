import { COLORS } from "./config.js";

const { RESET, CYAN, DIM } = COLORS;

export const link = (text, href) =>
  `\x1b]8;;${href}\x1b\\${CYAN}${text}${RESET}\x1b]8;;\x1b\\`;

export const divider = `${DIM}${"─".repeat(40)}${RESET}`;

export const footer = (displayName) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.toLocaleString("en", { month: "long" });
  const day = now.getDate();

  return `
${divider}
${DIM}Made with ❤️  by ${displayName} | ${day} ${month} ${year}${RESET}
${DIM}Powered by Cloudflare Workers ⚡${RESET}
${divider}
`;
};