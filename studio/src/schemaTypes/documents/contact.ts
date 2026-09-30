import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {seoFields} from '../objects/seoFields'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'portableText',
      description: 'Full page content (paragraphs, links, etc.).',
      group: 'content',
    }),
    ...seoFields,
  ],
  preview: {
    prepare: () => ({title: 'Contact'}),
  },
})
