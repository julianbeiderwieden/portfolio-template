import type { APIRoute } from 'astro';
import { getSettings } from '../utils/sanity';
import { absoluteUrl } from '../utils/seo';

export const GET: APIRoute = async () => {
  const settings = await getSettings();
  const sitemapUrl = absoluteUrl(settings?.siteUrl, '/sitemap.xml');

  const body = ['User-agent: *', 'Allow: /', sitemapUrl ? `Sitemap: ${sitemapUrl}` : '', ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
