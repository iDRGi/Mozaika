import type { CollectionConfig } from 'payload'

const Banners: CollectionConfig = {
  slug: 'banners',
  admin: {
    useAsTitle: 'title',
    description: 'Баннеры и акции на главной странице',
    defaultColumns: ['title', 'type', 'isActive', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Текст',
    },
    {
      name: 'type',
      type: 'select',
      label: 'Тип',
      defaultValue: 'promo',
      options: [
        { label: 'Акция',       value: 'promo' },
        { label: 'Новинка',     value: 'new' },
        { label: 'Информация',  value: 'info' },
        { label: 'Срочно',      value: 'urgent' },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Показывать на сайте',
      defaultValue: true,
    },
  ],
  timestamps: true,
}

export default Banners
