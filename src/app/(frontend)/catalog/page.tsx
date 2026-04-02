import type { Metadata } from 'next'
import { type Where, getPayload } from 'payload'
import config from '@payload-config'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Каталог',
  description: 'Каталог мебели магазина Мозаика',
}

export const dynamic = 'force-dynamic'

const CATEGORIES = [
  { value: 'all',       label: 'Все' },
  { value: 'sofas',     label: 'Диваны' },
  { value: 'armchairs', label: 'Кресла' },
  { value: 'beds',      label: 'Кровати' },
  { value: 'tables',    label: 'Столы' },
  { value: 'chairs',    label: 'Стулья' },
  { value: 'wardrobes', label: 'Шкафы' },
  { value: 'dressers',  label: 'Комоды' },
  { value: 'other',     label: 'Другое' },
]

async function getProducts(category?: string) {
  const payload = await getPayload({ config })
  const where: Where = { isVisible: { equals: true } }
  if (category && category !== 'all') {
    where.category = { equals: category }
  }
  const { docs } = await payload.find({
    collection: 'products',
    where,
    sort: '-createdAt',
    limit: 100,
    depth: 1,
  })
  return docs
}

type Props = {
  searchParams: Promise<{ category?: string }>
}

export default async function CatalogPage({ searchParams }: Props) {
  const { category } = await searchParams
  const products = await getProducts(category)
  const activeCategory = category || 'all'

  return (
    <div className="flex flex-col flex-1">
    <div className="bg-stone-800 border-b border-stone-700">
      <div className="container-main py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Каталог мебели</h1>
        <p className="text-stone-400 text-sm sm:text-base">Выберите категорию и найдите мебель для вашего дома</p>
      </div>
    </div>

    {/* Фильтр категорий — вынесен на уровень полной ширины чтобы overflow-x-auto работал корректно */}
    <div className="bg-stone-800/80 border-b border-stone-700 overflow-x-auto">
      <div className="flex flex-nowrap sm:flex-wrap gap-2 px-4 sm:px-6 lg:px-8 py-4 sm:max-w-6xl sm:mx-auto">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.value}
            href={cat.value === 'all' ? '/catalog' : `/catalog?category=${cat.value}`}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? 'bg-brand-600 text-white'
                : 'bg-stone-700 text-stone-300 border border-stone-600 hover:border-brand-400 hover:text-brand-400'
            }`}
          >
            {cat.label}
          </a>
        ))}
      </div>
    </div>

    <div className="w-full container-main py-6 sm:py-10 flex-1">

      {products.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p className="text-lg text-stone-500">Товары в этой категории пока не добавлены</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
    </div>
  )
}
