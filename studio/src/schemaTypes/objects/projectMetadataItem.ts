import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectMetadataItem',
  title: 'Metadata item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', content: 'content'},
    prepare: ({title, content}) => ({title: title ? `${title}:` : 'Metadata', subtitle: content}),
  },
})
