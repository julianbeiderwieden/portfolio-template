import type { APIRoute, GetStaticPaths } from 'astro';
import { getSettings, type ImageAsset } from '../../utils/sanity';
import { faviconPng, faviconSizes } from '../../utils/favicon';

export const getStaticPaths = (async () => {
  const favicon = (await getSettings())?.favicon;
  if (!favicon) return [];

  return faviconSizes.map(size => ({ params: { size: String(size) }, props: { favicon, size } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ favicon: ImageAsset; size: number }> = async ({ props }) => {
  const png = await faviconPng(props.favicon, props.size);

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
