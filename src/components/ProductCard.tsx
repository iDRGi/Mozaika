'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product, Media } from '@/payload-types'
import ProductModal from './ProductModal'

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
  const [open, setOpen] = useState(false)

  const image = typeof product.image === 'object' ? product.image as Media : null
  const imageUrl = image?.url?.replace(/^https?:\/\/[^/]+/, '') ?? null

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-stone-800 rounded-xl border border-stone-700 overflow-hidden hover:shadow-lg hover:shadow-black/40 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      >
        <div className="aspect-square bg-stone-700 relative overflow-hidden">
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

        <div className="p-3 sm:p-4">
          {product.category && (
            <span className="text-xs text-stone-400 uppercase tracking-wide">
              {CATEGORY_LABELS[product.category] || product.category}
            </span>
          )}
          <h3 className="font-semibold text-white mt-1 leading-tight line-clamp-2 text-sm sm:text-base">
            {product.name}
          </h3>
          {product.description && (
            <p className="hidden sm:block text-sm text-stone-400 mt-1 line-clamp-2">{product.description}</p>
          )}
          {product.price != null && product.price > 0 && (
            <p className="mt-2 sm:mt-3 text-base sm:text-lg font-bold text-brand-400">
              {product.price.toLocaleString('ru-RU')} ₽
            </p>
          )}
        </div>
      </div>

      {open && (
        <ProductModal
          product={product as any}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
