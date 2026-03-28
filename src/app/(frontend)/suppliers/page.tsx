import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { STORE } from '@/constants/store'

export const metadata: Metadata = {
  title: 'Наши поставщики',
  description: `Поставщики мебели магазина ${STORE.name}`,
}

export const dynamic = 'force-dynamic'

async function getSuppliers() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'suppliers',
    where: { isActive: { equals: true } },
    sort: 'name',
    limit: 100,
    depth: 1,
  })
  return docs
}

export default async function SuppliersPage() {
  const suppliers = await getSuppliers()

  return (
    <div className="container-main py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-3">Наши поставщики</h1>
      <p className="text-stone-500 mb-2">
        С полным ассортиментом вы можете ознакомиться на сайте нашего поставщика.
      </p>
      <p className="text-stone-600 mb-10">
        Мы работаем напрямую с фабриками мебели. Предлагаем лучшие розничные цены.
      </p>

      {suppliers.length === 0 ? (
        <p className="text-stone-400 text-center py-20">Поставщики пока не добавлены.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {suppliers.map((supplier) => {
            const logo = supplier.logo && typeof supplier.logo === 'object' ? supplier.logo : null

            return (
              <div
                key={supplier.id}
                className="bg-white rounded-xl border border-stone-200 p-5 flex items-center gap-6"
              >
                {/* Логотип */}
                <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center bg-stone-50 rounded-lg border border-stone-100 overflow-hidden">
                  {logo?.url ? (
                    <Image
                      src={logo.url}
                      alt={logo.alt || supplier.name}
                      width={96}
                      height={96}
                      className="object-contain w-full h-full p-2"
                    />
                  ) : (
                    <span className="text-4xl text-stone-300">🏭</span>
                  )}
                </div>

                {/* Информация */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-stone-800 mb-1">{supplier.name}</h2>
                  {supplier.description && (
                    <p className="text-stone-500 text-sm">{supplier.description}</p>
                  )}
                </div>

                {/* Кнопка */}
                {supplier.website && (
                  <a
                    href={supplier.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 bg-brand-600 hover:bg-brand-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Перейти на сайт
                  </a>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
