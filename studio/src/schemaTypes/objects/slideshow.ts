import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'

export default defineType({
  name: 'slideshow',
  title: 'Slideshow',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Shown one at a time, changing every few seconds. Reorder by dragging.',
      of: [defineArrayMember({type: 'figure'})],
      options: {layout: 'grid'},
      validation: (Rule) =>
        Rule.min(2).warning('With a single image, the slideshow is shown as a normal image.'),
    }),
  ],
  preview: {
    select: {images: 'images', media: 'images.0'},
    prepare: ({images, media}) => ({
      title: 'Slideshow',
      subtitle: images?.length === 1 ? '1 image' : `${images?.length ?? 0} images`,
      media,
    }),
  },
})
