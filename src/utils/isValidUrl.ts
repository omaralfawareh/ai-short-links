/** An absolute http(s) URL with a dotted hostname (so "localhost" is rejected). */
export function isValidUrl(value: string) {
  try {
    const u = new URL(value);
    return (u.protocol === "http:" || u.protocol === "https:") && u.hostname.includes(".");
  } catch {
    return false;
  }
}
