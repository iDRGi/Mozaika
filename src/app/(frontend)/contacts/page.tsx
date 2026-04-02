import type { Metadata } from 'next'
import { STORE } from '@/constants/store'

export const metadata: Metadata = {
  title: 'Контакты',
  description: `Адрес, телефоны и схема проезда в мебельный магазин ${STORE.name}`,
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.37a16 16 0 0 0 6.72 6.72l1.56-1.56a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

export default function ContactsPage() {
  return (
    <div className="flex flex-col flex-1">
      {/* Шапка */}
      <div className="bg-stone-800 border-b border-stone-700">
        <div className="container-main py-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Контакты</h1>
          <p className="text-stone-400 text-sm sm:text-base">Приезжайте — покажем все коллекции в живую</p>
        </div>
      </div>

      <div className="container-main py-8 sm:py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая колонка — информация */}
          <div className="space-y-4">
            {/* Адрес */}
            <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-stone-700 text-brand-400">
                  <IconMapPin />
                </span>
                Адрес
              </h2>
              <p className="text-stone-300 pl-10">{STORE.address}</p>
            </div>

            {/* Телефоны */}
            <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-stone-700 text-brand-400">
                  <IconPhone />
                </span>
                Телефоны
              </h2>
              <div className="space-y-3 pl-10">
                {STORE.phones.map((phone) => (
                  <div key={phone.number}>
                    <p className="text-xs text-stone-500 uppercase tracking-wide mb-0.5">
                      {phone.label}
                    </p>
                    <a
                      href={`tel:${phone.number.replace(/\D/g, '')}`}
                      className="text-xl font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      {phone.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Режим работы */}
            <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-stone-700 text-brand-400">
                  <IconClock />
                </span>
                Режим работы
              </h2>
              <table className="w-full text-sm pl-10">
                <tbody>
                  {STORE.workingHours.map((wh) => (
                    <tr key={wh.days} className="border-b border-stone-700 last:border-0">
                      <td className="py-2 text-stone-400 font-medium w-24">{wh.days}</td>
                      <td className="py-2 text-stone-200">{wh.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Мы в соцсетях */}
            <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
              <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-stone-700 text-brand-400">
                  <IconGlobe />
                </span>
                Мы в соцсетях
              </h2>
              <div className="flex flex-col gap-3 pl-10">
                {STORE.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors"
                  >
                    <span>{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка — карта */}
          <div className="bg-stone-800 rounded-xl overflow-hidden border border-stone-700 min-h-[400px]">
            <iframe
              src="https://yandex.com/map-widget/v1/?from=mapframe&ll=38.243608%2C55.415774&mode=search&oid=116335412734&ol=biz&z=16"
              width="100%"
              height="100%"
              style={{ minHeight: 400, border: 0 }}
              allowFullScreen
              title="Мебельная мозаика на карте"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
