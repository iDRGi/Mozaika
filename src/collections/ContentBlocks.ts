import type { CollectionConfig } from 'payload'

const ContentBlocks: CollectionConfig = {
  slug: 'content-blocks',
  admin: {
    useAsTitle: 'title',
    description: 'Блоки с картинкой и текстом на главной странице',
    defaultColumns: ['title', 'imagePosition', 'isActive', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Изображение',
    },
    {
      name: 'imagePosition',
      type: 'radio',
      label: 'Позиция изображения',
      defaultValue: 'left',
      options: [
        { label: 'Слева', value: 'left' },
        { label: 'Справа', value: 'right' },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Показывать на сайте',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок (меньше — выше)',
      defaultValue: 0,
    },
  ],
  timestamps: true,
}

export default ContentBlocks
