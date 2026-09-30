import {defineField, defineType} from 'sanity'
import {LockIcon} from '@sanity/icons/Lock'

export default defineType({
  name: 'privacy',
  title: 'Privacy',
  type: 'document',
  icon: LockIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Privacy'}),
  },
})
