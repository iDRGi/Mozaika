import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import BannerSection from '@/components/BannerSection'
import ContentBlock from '@/components/ContentBlock'
import { STORE } from '@/constants/store'

export const metadata: Metadata = {
  title: 'Главная',
}

export const dynamic = 'force-dynamic'

async function getActiveBanners() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'banners',
    where: { isActive: { equals: true } },
    sort: '-updatedAt',
    limit: 3,
  })
  return docs
}

async function getContentBlocks() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'content-blocks',
    where: { isActive: { equals: true } },
    sort: 'order',
    limit: 20,
    depth: 1,
  })
  return docs
}

export default async function HomePage() {
  const [banners, contentBlocks] = await Promise.all([
    getActiveBanners(),
    getContentBlocks(),
  ])

  return (
    <>
      {/* Баннеры / Акции */}
      {banners.length > 0 && (
        <section className="bg-white border-b border-stone-200">
          <div className="container-main py-6">
            <div className="space-y-3">
              {banners.map((banner) => (
                <BannerSection key={banner.id} banner={banner} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-stone-100 py-16 md:py-24">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            {STORE.name}
          </h1>
          <p className="text-xl text-stone-500 mb-8">{STORE.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Перейти в каталог
            </Link>
            <Link
              href="/contacts"
              className="inline-block bg-white hover:bg-stone-50 text-stone-700 font-semibold px-8 py-3 rounded-lg border border-stone-300 transition-colors"
            >
              Как нас найти
            </Link>
          </div>
        </div>
      </section>

      {/* Блоки с картинкой и текстом */}
      {contentBlocks.length > 0 && (
        <section className="py-16">
          <div className="container-main space-y-16">
            {contentBlocks.map((block) => (
              <ContentBlock key={block.id} block={block as any} />
            ))}
          </div>
        </section>
      )}

      {/* Контакты (краткая версия) */}
      <section className="py-12">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-stone-200 text-center">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold text-stone-700 mb-1">Адрес</h3>
              <p className="text-stone-500 text-sm">{STORE.address}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone-200 text-center">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-semibold text-stone-700 mb-2">Телефон</h3>
              {STORE.phones.map((p) => (
                <a
                  key={p.number}
                  href={`tel:${p.number.replace(/\D/g, '')}`}
                  className="block text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors"
                >
                  {p.number}
                </a>
              ))}
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone-200 text-center">
              <div className="text-3xl mb-3">🕐</div>
              <h3 className="font-semibold text-stone-700 mb-2">Режим работы</h3>
              {STORE.workingHours.map((wh) => (
                <p key={wh.days} className="text-stone-500 text-sm">
                  <span className="font-medium text-stone-600">{wh.days}:</span> {wh.hours}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
