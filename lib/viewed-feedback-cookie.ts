const COOKIE_NAME = "metc-voices-viewed";
const COOKIE_VERSION = "v1:";

function cookieValue() {
  const prefix = `${COOKIE_NAME}=`;
  return document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(prefix))?.slice(prefix.length) ?? "";
}

export function readViewedFeedbackIds() {
  try {
    const value = decodeURIComponent(cookieValue());
    if (!value.startsWith(COOKIE_VERSION)) return new Set<string>();
    return new Set(value.slice(COOKIE_VERSION.length).split(",").filter((id) => /^[a-z0-9-]+$/i.test(id)));
  } catch {
    return new Set<string>();
  }
}

export function writeViewedFeedbackIds(ids: Set<string>) {
  // Cookie stores only short IDs; move to server/user state or localStorage if this archive becomes very large.
  const value = `${COOKIE_VERSION}${[...ids].join(",")}`;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
}

export function clearViewedFeedbackIds() {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;
}
