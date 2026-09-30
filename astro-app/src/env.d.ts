/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface DocumentEventMap {
  /** Sent by the lightbox: the trigger of the image it shows, or no trigger once it has closed. */
  'lightbox:change': CustomEvent<{ trigger?: HTMLElement }>;
}

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_STUDIO_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_STUDIO_DATASET?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
}
