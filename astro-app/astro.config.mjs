// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from 'vite';
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = env;
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error(
    'Missing Sanity project ID. Set PUBLIC_SANITY_STUDIO_PROJECT_ID in astro-app/.env ' +
      '(copy astro-app/.env.example) or in your hosting environment.',
  );
}

import sanity from '@sanity/astro';

const isProduction = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  ...(isProduction && {
    output: 'static',
    adapter: (await import('@astrojs/netlify')).default(),
  }),
  devToolbar: { enabled: false },
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2024-12-08',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
