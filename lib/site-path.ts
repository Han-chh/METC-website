const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const defaultResourceBaseUrl = "https://pub-620425b2c5d3430ca480ab9c8f71dea4.r2.dev";
const configuredResourceBaseUrl = process.env.NEXT_PUBLIC_RESOURCE_BASE_URL?.trim()
  || defaultResourceBaseUrl;

/** The optional deployment prefix, normalized without a trailing slash. */
export const SITE_BASE_PATH = configuredBasePath === "/"
  ? ""
  : configuredBasePath.replace(/\/+$/, "");
export const RESOURCE_BASE_URL = configuredResourceBaseUrl.replace(/\/+$/, "");

/**
 * Resolve a public asset or generated resource URL for the current deployment.
 * Existing resource indexes were generated for GitHub Pages, so their legacy
 * `/METC-website` prefix must be removed on a Vercel root deployment.
 */
export function withSiteBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const legacyBasePath = "/METC-website";

  if (SITE_BASE_PATH && (normalizedPath === SITE_BASE_PATH || normalizedPath.startsWith(`${SITE_BASE_PATH}/`))) {
    return normalizedPath;
  }

  const withoutLegacyPrefix = normalizedPath === legacyBasePath
    ? "/"
    : normalizedPath.startsWith(`${legacyBasePath}/`)
      ? normalizedPath.slice(legacyBasePath.length)
      : normalizedPath;

  if (!SITE_BASE_PATH) return withoutLegacyPrefix;
  return withoutLegacyPrefix === "/"
    ? `${SITE_BASE_PATH}/`
    : `${SITE_BASE_PATH}${withoutLegacyPrefix}`;
}

/** Resolve a generated resource URL against the public R2 asset host. */
export function withResourceBaseUrl(path: string | null): string | null {
  if (!path) return null;

  const sitePath = withSiteBasePath(path);
  const pathWithoutSitePrefix = SITE_BASE_PATH && sitePath.startsWith(`${SITE_BASE_PATH}/`)
    ? sitePath.slice(SITE_BASE_PATH.length)
    : sitePath;

  if (!pathWithoutSitePrefix.startsWith("/resources/")) return sitePath;
  return `${RESOURCE_BASE_URL}${pathWithoutSitePrefix}`;
}
