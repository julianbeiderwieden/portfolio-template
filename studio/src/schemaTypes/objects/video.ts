import {defineField, defineType} from 'sanity'
import {VideoIcon} from '@sanity/icons/Video'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  icon: VideoIcon,
  fields: [
    defineField({
      name: 'file',
      title: 'Video file',
      type: 'file',
      description:
        'MP4 (H.264) plays in every browser. The file is served as uploaded, so keep it small (ideally under 20 MB).',
      options: {accept: 'video/mp4,video/webm'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'loop',
      title: 'Play as moving image',
      type: 'boolean',
      description:
        'On: plays muted and looping, without controls, while it is on screen. Off: a player with sound and controls.',
      initialValue: true,
    }),
    defineField({
      name: 'poster',
      title: 'Poster image',
      type: 'image',
      description:
        'Shown until the video plays. Also reserves its space, so the page does not jump while the video loads.',
    }),
    defineField({
      name: 'title',
      title: 'Description',
      type: 'string',
      description: 'Describes the video for screen readers.',
      validation: (Rule) => Rule.required().warning('Please add a description.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {caption: 'caption', title: 'title', loop: 'loop', media: 'poster'},
    prepare: ({caption, title, loop, media}) => ({
      title: caption || title || 'Video',
      subtitle: loop === false ? 'Video with controls' : 'Moving image',
      media,
    }),
  },
})
