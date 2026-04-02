'use client'

import { useState } from 'react'
import type { Product } from '@/payload-types'
import ProductCard from './ProductCard'

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

export default function CatalogGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')

  const filtered = query
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : products

  return (
    <>
      {products.length > 0 && (
        <div className="relative mb-6">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
            <IconSearch />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию..."
            className="w-full bg-stone-700 border border-stone-600 rounded-xl text-white placeholder-stone-400 focus:border-brand-500 focus:outline-none pl-9 pr-10 py-2.5 text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Сбросить поиск"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-stone-500">Товары в этой категории пока не добавлены</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-stone-500">Ничего не найдено по запросу «{query}»</p>
          <button
            onClick={() => setQuery('')}
            className="mt-4 text-sm text-brand-400 hover:text-brand-300 transition-colors"
          >
            Сбросить поиск
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}
