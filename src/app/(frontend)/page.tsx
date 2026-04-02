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

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.37a16 16 0 0 0 6.72 6.72l1.56-1.56a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
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
        <section className="bg-stone-800 border-b border-stone-700">
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
      <section className="relative bg-gradient-to-br from-stone-800 via-brand-800 to-stone-900 py-20 md:py-32 overflow-hidden">
        {/* Декоративный паттерн */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="container-main text-center relative">
          <div className="w-12 h-0.5 bg-brand-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {STORE.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-brand-200 mb-10 max-w-xl mx-auto">
            {STORE.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="inline-block bg-brand-400 hover:bg-brand-300 text-stone-900 font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg"
            >
              Перейти в каталог
            </Link>
            <Link
              href="/contacts"
              className="inline-block border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors backdrop-blur-sm"
            >
              Как нас найти
            </Link>
          </div>
        </div>
      </section>

      {/* Блоки с картинкой и текстом */}
      {contentBlocks.length > 0 && (
        <section className="pt-4 pb-4">
          <div className="container-main space-y-4">
            {contentBlocks.map((block, index) => (
              <ContentBlock key={block.id} block={block as any} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* CTA — позвонить */}
      <section className="bg-brand-700">
        <div className="container-main py-12 text-center">
          <p className="text-brand-200 text-lg mb-2">Хотите выбрать мебель?</p>
          <p className="text-white text-xl font-medium mb-6">Звоните — поможем подобрать</p>
          <a
            href={`tel:${STORE.phones[0].number.replace(/\D/g, '')}`}
            className="text-white text-3xl sm:text-4xl font-bold hover:text-brand-200 transition-colors"
          >
            {STORE.phones[0].number}
          </a>
        </div>
      </section>

      {/* Контакты (краткая версия) */}
      <section className="bg-stone-800 border-y border-stone-700 py-14">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Как нас найти</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-stone-900 rounded-xl p-6 border border-stone-700 hover:border-stone-600 transition-colors text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-stone-700 text-brand-400 mb-4">
                <IconMapPin />
              </div>
              <h3 className="font-semibold text-white mb-1">Адрес</h3>
              <p className="text-stone-400 text-sm">{STORE.address}</p>
            </div>
            <div className="bg-stone-900 rounded-xl p-6 border border-stone-700 hover:border-stone-600 transition-colors text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-stone-700 text-brand-400 mb-4">
                <IconPhone />
              </div>
              <h3 className="font-semibold text-white mb-2">Телефон</h3>
              {STORE.phones.map((p) => (
                <a
                  key={p.number}
                  href={`tel:${p.number.replace(/\D/g, '')}`}
                  className="block text-brand-400 hover:text-brand-300 font-medium text-sm transition-colors"
                >
                  {p.number}
                </a>
              ))}
            </div>
            <div className="bg-stone-900 rounded-xl p-6 border border-stone-700 hover:border-stone-600 transition-colors text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-stone-700 text-brand-400 mb-4">
                <IconClock />
              </div>
              <h3 className="font-semibold text-white mb-2">Режим работы</h3>
              {STORE.workingHours.map((wh) => (
                <p key={wh.days} className="text-stone-400 text-sm">
                  <span className="font-medium text-stone-300">{wh.days}:</span> {wh.hours}
                </p>
              ))}
            </div>
            <div className="bg-stone-900 rounded-xl p-6 border border-stone-700 hover:border-stone-600 transition-colors text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-stone-700 text-brand-400 mb-4">
                <IconGlobe />
              </div>
              <h3 className="font-semibold text-white mb-2">Мы в соцсетях</h3>
              {STORE.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
