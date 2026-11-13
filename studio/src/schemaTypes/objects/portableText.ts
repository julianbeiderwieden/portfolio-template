import {defineArrayMember, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons/Link'

export default defineType({
  name: 'portableText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            icon: LinkIcon,
            fields: [
              {
                name: 'href',
                type: 'string',
                title: 'URL',
                description: 'Web address, email, or phone number.',
                validation: (Rule) =>
                  Rule.required().custom((value: string | undefined) => {
                    const v = value?.trim()
                    if (!v) return 'Required'
                    if (v.startsWith('/') && !v.startsWith('//')) return true
                    if (/^(https?:\/\/|mailto:|tel:)/i.test(v)) return true
                    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return true
                    if (/^[+()\d\s.-]{6,}$/.test(v) && /\d/.test(v)) return true
                    if (/^(?:[\w-]+\.)+[a-z]{2,}(?:[/?#].*)?$/i.test(v)) return true
                    return 'Use a web address, email, or phone number'
                  }),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
  ],
})
