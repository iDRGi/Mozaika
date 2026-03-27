import type { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Каталог товаров',
    defaultColumns: ['name', 'category', 'price', 'isVisible'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название товара',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Цена (руб.)',
      min: 0,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото товара',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      options: [
        { label: 'Диваны',     value: 'sofas' },
        { label: 'Кресла',     value: 'armchairs' },
        { label: 'Кровати',    value: 'beds' },
        { label: 'Столы',      value: 'tables' },
        { label: 'Стулья',     value: 'chairs' },
        { label: 'Шкафы',      value: 'wardrobes' },
        { label: 'Комоды',     value: 'dressers' },
        { label: 'Другое',     value: 'other' },
      ],
    },
    {
      name: 'isVisible',
      type: 'checkbox',
      label: 'Показывать на сайте',
      defaultValue: true,
    },
  ],
  timestamps: true,
}

export default Products
