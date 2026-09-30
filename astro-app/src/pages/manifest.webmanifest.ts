import type { APIRoute } from 'astro';
import { getSettings } from '../utils/sanity';
import { faviconPath } from '../utils/favicon';
import { themeColor } from '../utils/theme';

export const GET: APIRoute = async () => {
  const settings = await getSettings();
  const fav = settings?.favicon;
  const title = settings?.title ?? 'Portfolio';

  const manifest = {
    name: title,
    short_name: title,
    description: settings?.metaDescription,
    lang: settings?.language ?? 'en',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: themeColor,
    theme_color: themeColor,
    ...(fav && {
      icons: [
        { src: faviconPath(192), sizes: '192x192', type: 'image/png' },
        { src: faviconPath(512), sizes: '512x512', type: 'image/png' },
      ],
    }),
  };

  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
};
