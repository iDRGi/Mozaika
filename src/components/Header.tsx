import Link from 'next/link'
import { STORE } from '@/constants/store'

const NAV = [
  { href: '/',         label: 'Главная' },
  { href: '/catalog',  label: 'Каталог' },
  { href: '/contacts', label: 'Контакты' },
]

export default function Header() {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link href="/" className="text-xl font-bold text-brand-700 hover:text-brand-800 transition-colors">
            {STORE.name}
          </Link>

          {/* Навигация */}
          <nav className="hidden sm:flex items-center gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-stone-600 hover:text-brand-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Телефон */}
          <a
            href={`tel:${STORE.phones[0].number.replace(/\D/g, '')}`}
            className="hidden md:block text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            {STORE.phones[0].number}
          </a>

          {/* Мобильное меню — простые ссылки */}
          <div className="flex sm:hidden gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-stone-600 hover:text-brand-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
