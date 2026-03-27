import type { Metadata } from 'next'
import { type Where, getPayload } from 'payload'
import config from '@payload-config'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Каталог',
  description: 'Каталог мебели магазина Мозаика',
}

export const revalidate = 60

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
    <div className="container-main py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Каталог мебели</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.value}
            href={cat.value === 'all' ? '/catalog' : `/catalog?category=${cat.value}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? 'bg-brand-600 text-white'
                : 'bg-white text-stone-600 border border-stone-300 hover:border-brand-400 hover:text-brand-600'
            }`}
          >
            {cat.label}
          </a>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p className="text-lg">Товары в этой категории пока не добавлены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
