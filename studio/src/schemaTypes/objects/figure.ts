import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

export default defineType({
  name: 'figure',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: {
    storeOriginalFilename: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describes the image for screen readers and search engines.',
      validation: (Rule) => Rule.required().warning('Please add alt text.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'caption', subtitle: 'alt', media: 'asset'},
    prepare: ({title, subtitle, media}) => ({title: title || subtitle || 'Image', media}),
  },
})
