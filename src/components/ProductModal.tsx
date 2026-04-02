'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { STORE } from '@/constants/store'

type ModalProduct = {
  id: number
  name: string
  description?: string | null
  price?: number | null
  image?: (number | null) | Media
  images?: (number | Media)[] | null
  category?: string | null
}

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

type Props = {
  product: ModalProduct
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const allImages: Media[] = []
  if (product.image && typeof product.image === 'object') {
    allImages.push(product.image as Media)
  }
  if (product.images) {
    for (const img of product.images) {
      if (typeof img === 'object') {
        allImages.push(img as Media)
      }
    }
  }

  const currentImage = allImages[currentIndex] ?? null
  const imageUrl = currentImage?.url?.replace(/^https?:\/\/[^/]+/, '') ?? null
  const total = allImages.length

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && total > 1) {
        setCurrentIndex((i) => (i - 1 + total) % total)
      } else if (e.key === 'ArrowRight' && total > 1) {
        setCurrentIndex((i) => (i + 1) % total)
      }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, total])

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-stone-100">
          <h2 className="text-lg font-semibold text-stone-800 leading-tight truncate">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-stone-400 hover:text-stone-700 transition-colors text-3xl leading-none w-8 h-8 flex items-center justify-center"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        {/* Тело */}
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Левая колонка: картинка + навигация */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div className="rounded-xl overflow-hidden bg-stone-50 h-72 flex items-center justify-center">
              {imageUrl && currentImage ? (
                <Image
                  src={imageUrl}
                  alt={currentImage.alt || product.name}
                  width={currentImage.width ?? 800}
                  height={currentImage.height ?? 600}
                  className="object-contain w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <span className="text-stone-300 text-6xl">🛋️</span>
              )}
            </div>

            {total > 1 && (
              <div className="flex items-center justify-center gap-3 mt-3">
                <button
                  onClick={() => setCurrentIndex((i) => (i - 1 + total) % total)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 text-xl transition-colors"
                  aria-label="Предыдущее фото"
                >
                  ‹
                </button>
                <div className="flex gap-1.5">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentIndex ? 'bg-brand-600' : 'bg-stone-300 hover:bg-stone-400'
                      }`}
                      aria-label={`Фото ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentIndex((i) => (i + 1) % total)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 text-xl transition-colors"
                  aria-label="Следующее фото"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          {/* Правая колонка: детали */}
          <div className="flex-1 flex flex-col min-h-0">
            {product.category && (
              <span className="text-xs text-stone-400 uppercase tracking-wide mb-3">
                {CATEGORY_LABELS[product.category] || product.category}
              </span>
            )}
            {product.description && (
              <p className="text-stone-600 leading-relaxed whitespace-pre-line flex-1">
                {product.description}
              </p>
            )}
            {product.price != null && product.price > 0 && (
              <p className="text-3xl font-bold text-brand-700 mt-4">
                {product.price.toLocaleString('ru-RU')} ₽
              </p>
            )}
            <div className="sticky bottom-0 bg-white pt-3 -mx-6 px-6 pb-1 md:static md:mx-0 md:px-0 md:pb-0 md:pt-0">
              <a
                href={`tel:${STORE.phones[0].number.replace(/\D/g, '')}`}
                className="mt-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center block"
              >
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
