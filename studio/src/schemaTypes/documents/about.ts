import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons/User'
import {seoFields} from '../objects/seoFields'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'portableText',
      description: 'Full page content.',
      group: 'content',
    }),
    ...seoFields,
  ],
  preview: {
    prepare: () => ({title: 'About'}),
  },
})
