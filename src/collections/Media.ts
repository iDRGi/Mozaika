import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // публичный доступ к медиафайлам
  },
  admin: {
    useAsTitle: 'filename',
    description: 'Изображения и файлы',
  },
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    staticURL: '/media', // Next.js отдаёт public/media как /media — без авторизации
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Описание (alt)',
    },
  ],
}

export default Media
