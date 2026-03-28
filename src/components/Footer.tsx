import Link from 'next/link'
import { STORE } from '@/constants/store'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-stone-800 text-stone-300 mt-auto">
      <div className="container-main py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О магазине */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">{STORE.name}</h3>
            <p className="text-stone-400 text-sm">{STORE.tagline}</p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-white font-semibold mb-3">Разделы</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/"         className="hover:text-white transition-colors">Главная</Link></li>
              <li><Link href="/catalog"  className="hover:text-white transition-colors">Каталог</Link></li>
              <li><Link href="/suppliers" className="hover:text-white transition-colors">Поставщики</Link></li>
              <li><Link href="/contacts"  className="hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white font-semibold mb-3">Контакты</h3>
            <div className="space-y-1 text-sm">
              <p className="text-stone-400">{STORE.address}</p>
              {STORE.phones.map((p) => (
                <a
                  key={p.number}
                  href={`tel:${p.number.replace(/\D/g, '')}`}
                  className="block hover:text-white transition-colors"
                >
                  {p.number}
                </a>
              ))}
            </div>
          </div>

          {/* Соцсети */}
          <div>
            <h3 className="text-white font-semibold mb-3">Мы в соцсетях</h3>
            <div className="space-y-2 text-sm">
              {STORE.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-8 pt-6 text-sm text-stone-500 text-center">
          © {year} {STORE.name}. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
