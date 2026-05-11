export const SITE_NAME = "AI Short Links";

/** Production canonical URL — set NEXT_PUBLIC_SITE_URL when deploying elsewhere */
export function getSiteUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "https://gotolnk.net";
}
