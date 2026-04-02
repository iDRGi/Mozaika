import Link from 'next/link'
import { STORE } from '@/constants/store'
import MobileMenu from './MobileMenu'

const NAV = [
  { href: '/',         label: 'Главная' },
  { href: '/catalog',  label: 'Каталог' },
  { href: '/suppliers', label: 'Поставщики' },
  { href: '/contacts',  label: 'Контакты' },
]

export default function Header() {
  return (
    <header className="bg-stone-800 border-b border-stone-700 shadow-sm sticky top-0 z-50">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link href="/" className="text-xl font-bold text-brand-400 hover:text-brand-300 transition-colors">
            {STORE.name}
          </Link>

          {/* Навигация */}
          <nav className="hidden sm:flex items-center gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-stone-300 hover:text-brand-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Телефон */}
          <a
            href={`tel:${STORE.phones[0].number.replace(/\D/g, '')}`}
            className="hidden md:block text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            {STORE.phones[0].number}
          </a>

          {/* Мобильное меню — гамбургер */}
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
