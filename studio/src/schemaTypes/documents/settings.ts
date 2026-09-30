import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'
import {LanguageInput} from '../../components/LanguageInput'
import {languages} from '../../lib/languages'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  groups: [
    {name: 'general', title: 'General'},
    {name: 'seo', title: 'SEO'},
    {name: 'social', title: 'Social Preview'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site title',
      type: 'string',
      description: 'Fallback title for browsers, Google and the web app manifest.',
      group: 'general',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Site language (lang attribute, og:locale, manifest).',
      options: {list: languages},
      components: {input: LanguageInput},
      initialValue: 'en',
      group: 'general',
    }),
    defineField({
      name: 'navFooterText',
      title: 'Navigation footer text',
      type: 'text',
      rows: 4,
      description: 'Optional paragraph above Imprint and Privacy in the left navigation.',
      group: 'general',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'PNG, JPEG or SVG. All common favicon formats are generated automatically.',
      icon: ImageIcon,
      options: {
        accept: 'image/png,image/jpeg,image/svg+xml',
        storeOriginalFilename: true,
      },
      group: 'general',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      description: 'Title for Google and the browser tab. Falls back to the site title if empty.',
      validation: (Rule) =>
        Rule.max(60).warning('Google usually shows only about 50–60 characters.'),
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Short description for Google search results and link previews.',
      validation: (Rule) =>
        Rule.max(160).warning('Google usually shows only about 150–160 characters.'),
      group: 'seo',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'Canonical URL of the site, e.g. https://example.com',
      validation: (Rule) => Rule.uri({scheme: ['https', 'http']}),
      group: 'seo',
    }),
    defineField({
      name: 'openGraphTitle',
      title: 'Social title',
      type: 'string',
      description:
        'Optional title for social media link previews. Falls back to the SEO title if empty.',
      validation: (Rule) => Rule.max(70),
      group: 'social',
    }),
    defineField({
      name: 'openGraphDescription',
      title: 'Social description',
      type: 'text',
      rows: 3,
      description:
        'Optional description for link previews. Falls back to the meta description if empty.',
      validation: (Rule) => Rule.max(200),
      group: 'social',
    }),
    defineField({
      name: 'socialImage',
      title: 'Social image',
      type: 'image',
      description: 'Preview image for shared links. Recommended: 1200 × 630 px.',
      icon: ImageIcon,
      options: {
        accept: 'image/png,image/jpeg,image/webp',
        storeOriginalFilename: true,
      },
      group: 'social',
    }),
    defineField({
      name: 'socialImageAlt',
      title: 'Social image alt text',
      type: 'string',
      description: 'Describes the preview image for social media and screen readers.',
      validation: (Rule) => Rule.max(160),
      group: 'social',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Settings'}),
  },
})
