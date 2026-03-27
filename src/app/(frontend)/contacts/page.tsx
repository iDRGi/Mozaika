import type { Metadata } from 'next'
import { STORE } from '@/constants/store'

export const metadata: Metadata = {
  title: 'Контакты',
  description: `Адрес, телефоны и схема проезда в мебельный магазин ${STORE.name}`,
}

export default function ContactsPage() {
  return (
    <div className="container-main py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Контакты</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Левая колонка — информация */}
        <div className="space-y-6">
          {/* Адрес */}
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <h2 className="text-lg font-semibold text-stone-700 mb-3 flex items-center gap-2">
              <span>📍</span> Адрес
            </h2>
            <p className="text-stone-600">{STORE.address}</p>
          </div>

          {/* Телефоны */}
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <h2 className="text-lg font-semibold text-stone-700 mb-3 flex items-center gap-2">
              <span>📞</span> Телефоны
            </h2>
            <div className="space-y-3">
              {STORE.phones.map((phone) => (
                <div key={phone.number}>
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-0.5">
                    {phone.label}
                  </p>
                  <a
                    href={`tel:${phone.number.replace(/\D/g, '')}`}
                    className="text-xl font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    {phone.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Режим работы */}
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <h2 className="text-lg font-semibold text-stone-700 mb-3 flex items-center gap-2">
              <span>🕐</span> Режим работы
            </h2>
            <table className="w-full text-sm">
              <tbody>
                {STORE.workingHours.map((wh) => (
                  <tr key={wh.days} className="border-b border-stone-100 last:border-0">
                    <td className="py-2 text-stone-500 font-medium w-24">{wh.days}</td>
                    <td className="py-2 text-stone-700">{wh.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Правая колонка — карта */}
        <div className="bg-white rounded-xl overflow-hidden border border-stone-200 min-h-[400px]">
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
  )
}
