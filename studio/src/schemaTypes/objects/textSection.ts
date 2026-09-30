import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons/Text'

export default defineType({
  name: 'textSection',
  title: 'Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {text: 'text'},
    prepare: ({text}) => {
      const block = (text ?? []).find((b: {_type: string}) => b._type === 'block')
      const plain = block?.children?.map((child: {text?: string}) => child.text ?? '').join('')
      return {title: plain || 'Text', subtitle: 'Text'}
    },
  },
})
