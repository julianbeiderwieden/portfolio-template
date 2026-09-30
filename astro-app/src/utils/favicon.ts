import sharp from 'sharp';
import type { ImageAsset } from './sanity';

/** PNG sizes generated at build time: browser tabs (16–48), Apple touch icon (180), web app manifest (192, 512). */
export const faviconSizes = [16, 32, 48, 180, 192, 512] as const;

export type FaviconSize = (typeof faviconSizes)[number];

export const faviconPath = (size: FaviconSize) => `/icons/${size}.png`;

/** Renders the favicon as a square PNG.
 *  Raster sources are scaled by the Sanity image pipeline. SVG sources are rendered locally,
 *  at a density that matches the target size, so small and large icons stay sharp. */
export async function faviconPng(asset: ImageAsset, size: number): Promise<Buffer> {
  if (asset.mimeType !== 'image/svg+xml') {
    return download(`${asset.url}?w=${size}&h=${size}&fit=crop&fm=png`);
  }

  const svg = await download(asset.url);
  // Metadata reports the SVG's intrinsic size at the default density of 72 DPI.
  const { width = size, height = size } = await sharp(svg).metadata();
  const density = Math.min(100_000, Math.max(1, (72 * size) / Math.min(width, height)));
  return sharp(svg, { density }).resize(size, size, { fit: 'cover' }).png().toBuffer();
}

async function download(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Favicon download failed (${response.status}): ${url}`);
  return Buffer.from(await response.arrayBuffer());
}
