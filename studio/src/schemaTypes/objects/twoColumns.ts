import {defineArrayMember, defineField, defineType} from 'sanity'
import {SplitVerticalIcon} from '@sanity/icons/SplitVertical'

type ColumnItem = {_type: string}

const column = (name: 'left' | 'right', title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    description:
      'Text and images, stacked. Add two images to the columns to show them side by side.',
    of: [defineArrayMember({type: 'textSection'}), defineArrayMember({type: 'figure'})],
  })

const describe = (items?: ColumnItem[]) =>
  items?.length
    ? items.map((item) => (item._type === 'figure' ? 'Image' : 'Text')).join(', ')
    : 'Empty'

export default defineType({
  name: 'twoColumns',
  title: 'Two columns',
  type: 'object',
  icon: SplitVerticalIcon,
  description:
    'Always two equal columns, text set smaller than in full-width text. Stacked on narrow phones.',
  fields: [column('left', 'Left column'), column('right', 'Right column')],
  validation: (Rule) =>
    Rule.custom((value?: {left?: ColumnItem[]; right?: ColumnItem[]}) =>
      value?.left?.length || value?.right?.length ? true : 'Add content to at least one column.',
    ),
  preview: {
    select: {left: 'left', right: 'right'},
    prepare: ({left, right}) => ({
      title: 'Two columns',
      subtitle: `${describe(left)} | ${describe(right)}`,
      // The first image in either column; Studio renders image values as thumbnails.
      media: [...(left ?? []), ...(right ?? [])].find(
        (item: ColumnItem) => item._type === 'figure',
      ),
    }),
  },
})
