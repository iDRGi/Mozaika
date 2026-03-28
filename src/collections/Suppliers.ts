import type { CollectionConfig } from 'payload'

const Suppliers: CollectionConfig = {
  slug: 'suppliers',
  admin: {
    useAsTitle: 'name',
    description: 'Поставщики мебели — отображаются на странице /suppliers',
    defaultColumns: ['name', 'website', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название поставщика',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Логотип',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Краткое описание',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Сайт поставщика',
      admin: {
        placeholder: 'https://example.ru',
      },
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

export default Suppliers
