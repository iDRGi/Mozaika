import Image from 'next/image'
import type { Product, Media } from '@/payload-types'

const CATEGORY_LABELS: Record<string, string> = {
  sofas:      'Диваны',
  armchairs:  'Кресла',
  beds:       'Кровати',
  tables:     'Столы',
  chairs:     'Стулья',
  wardrobes:  'Шкафы',
  dressers:   'Комоды',
  other:      'Другое',
}

export default function ProductCard({ product }: { product: Product }) {
  const image = typeof product.image === 'object' ? product.image as Media : null
  const imageUrl = image?.url?.replace(/^https?:\/\/[^/]+/, '') ?? null

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="aspect-square bg-stone-100 relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt || product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-5xl">
            🛋️
          </div>
        )}
      </div>

      <div className="p-4">
        {product.category && (
          <span className="text-xs text-stone-400 uppercase tracking-wide">
            {CATEGORY_LABELS[product.category] || product.category}
          </span>
        )}
        <h3 className="font-semibold text-stone-800 mt-1 leading-tight line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">{product.description}</p>
        )}
        {product.price != null && product.price > 0 && (
          <p className="mt-3 text-lg font-bold text-brand-700">
            {product.price.toLocaleString('ru-RU')} ₽
          </p>
        )}
      </div>
    </div>
  )
}
