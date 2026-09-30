import {defineField} from 'sanity'

/** SEO fields for pages and projects; they take precedence over the global settings. */
export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO title',
    type: 'string',
    description: 'Title for Google and the browser tab. Falls back to the page title if empty.',
    validation: (Rule) => Rule.max(60).warning('Google usually shows only about 50–60 characters.'),
    group: 'seo',
  }),
  defineField({
    name: 'seoDescription',
    title: 'Meta Description',
    type: 'text',
    rows: 3,
    description: 'Short description for Google search results and link previews.',
    validation: (Rule) =>
      Rule.max(160).warning('Google usually shows only about 150–160 characters.'),
    group: 'seo',
  }),
]
