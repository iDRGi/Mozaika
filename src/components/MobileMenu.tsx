'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { STORE } from '@/constants/store'

const NAV = [
  { href: '/',          label: 'Главная' },
  { href: '/catalog',   label: 'Каталог' },
  { href: '/suppliers', label: 'Поставщики' },
  { href: '/contacts',  label: 'Контакты' },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Закрытие по ESC и блокировка скролла
  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Кнопка-гамбургер */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Открыть меню"
        className="sm:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2 text-stone-300 hover:text-brand-400 transition-colors"
      >
        <span className="block w-6 h-0.5 bg-current rounded-full" />
        <span className="block w-6 h-0.5 bg-current rounded-full" />
        <span className="block w-6 h-0.5 bg-current rounded-full" />
      </button>

      {/* Оверлей */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-50 sm:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Выдвижная панель справа */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-stone-900 z-50 shadow-2xl sm:hidden flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Меню навигации"
      >
        {/* Шапка панели */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-stone-700 shrink-0">
          <span className="font-bold text-brand-400 text-lg">Меню</span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Закрыть меню"
            className="p-2 -mr-2 text-stone-400 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>
        </div>

        {/* Навигационные ссылки */}
        <nav className="flex-1 px-6 py-4 overflow-y-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center py-4 text-lg font-medium text-stone-300 hover:text-brand-400 border-b border-stone-700 transition-colors last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Телефон внизу */}
        <div className="px-6 py-6 border-t border-stone-700 shrink-0">
          {STORE.phones.map((p) => (
            <a
              key={p.number}
              href={`tel:${p.number.replace(/\D/g, '')}`}
              className="block text-base font-semibold text-brand-400 hover:text-brand-300 transition-colors mb-1"
            >
              {p.number}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
