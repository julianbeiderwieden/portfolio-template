/** Shared Tailwind classes for the large, bold body text in the content area. */
export const contentText = 'text-body tracking-tight';

const richTextBase =
  'space-y-[0.9em] [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a:hover]:text-muted';

/** Portable Text container: spaced paragraphs, underlined links. */
export const richText = `${contentText} ${richTextBase}`;

/** Portable Text in a two-column block: smaller text, same spacing and links. */
export const columnRichText = `text-column ${richTextBase}`;
