export function normalizeSiteUrl(siteUrl?: string): string | undefined {
  if (!siteUrl) return undefined;

  return siteUrl.replace(/\/+$/, '');
}

export function absoluteUrl(siteUrl: string | undefined, path = '/'): string | undefined {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl);
  if (!normalizedSiteUrl) return undefined;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedSiteUrl}${normalizedPath}`;
}

export function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
