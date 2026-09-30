import type { APIRoute } from 'astro';
import { getSettings } from '../utils/sanity';
import { faviconPng } from '../utils/favicon';
import { pngsToIco } from '../utils/ico';

export const GET: APIRoute = async () => {
  const settings = await getSettings();
  const fav = settings?.favicon;

  if (!fav) {
    return new Response(null, { status: 404 });
  }

  const pngs = await Promise.all([16, 32, 48].map(size => faviconPng(fav, size)));
  const ico = pngsToIco(pngs);

  return new Response(new Uint8Array(ico), {
    headers: {
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
