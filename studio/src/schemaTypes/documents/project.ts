import {defineArrayMember, defineField, defineType} from 'sanity'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {seoFields} from '../objects/seoFields'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'media', title: 'Cover'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Part of the URL: /projects/<slug>',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first. Without a value, projects are sorted by title.',
      group: 'content',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'array',
      description: 'Facts shown under the project title (e.g. year, location, client).',
      of: [defineArrayMember({type: 'projectMetadataItem'})],
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'One or two sentences. Used as the fallback meta description.',
      validation: (Rule) => Rule.max(200).warning('Please keep it short.'),
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'figure',
      description: 'Shown in the project overview and used as the social image.',
      group: 'media',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Text sections, images, slideshows, two-column blocks and videos in any order.',
      of: [
        defineArrayMember({type: 'textSection'}),
        defineArrayMember({type: 'figure'}),
        defineArrayMember({type: 'slideshow'}),
        defineArrayMember({type: 'twoColumns'}),
        defineArrayMember({type: 'video'}),
      ],
      group: 'content',
    }),
    ...seoFields,
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderRankAsc',
      by: [
        {field: 'orderRank', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'title', metadata: 'metadata', media: 'coverImage'},
    prepare: ({title, metadata, media}) => {
      const first = metadata?.[0]
      return {
        title,
        subtitle: first?.title && first?.content ? `${first.title}: ${first.content}` : undefined,
        media,
      }
    },
  },
})
