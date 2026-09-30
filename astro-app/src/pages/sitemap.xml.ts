import type { APIRoute } from 'astro';
import { getProjectList, getSettings } from '../utils/sanity';
import { absoluteUrl, escapeXml } from '../utils/seo';

export const GET: APIRoute = async () => {
  const [settings, projects] = await Promise.all([getSettings(), getProjectList()]);

  if (!absoluteUrl(settings?.siteUrl)) {
    return new Response('', {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
  }

  const pages = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/projects', changefreq: 'weekly', priority: '0.9' },
    ...projects.map(project => ({ path: `/projects/${project.slug}`, changefreq: 'monthly', priority: '0.8' })),
    { path: '/about', changefreq: 'monthly', priority: '0.6' },
    { path: '/contact', changefreq: 'yearly', priority: '0.5' },
    { path: '/imprint', changefreq: 'yearly', priority: '0.2' },
    { path: '/privacy', changefreq: 'yearly', priority: '0.2' },
  ];

  const lastmod = new Date().toISOString();
  const urls = pages
    .map(
      page => `  <url>
    <loc>${escapeXml(absoluteUrl(settings?.siteUrl, page.path)!)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
