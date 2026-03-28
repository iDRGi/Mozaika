import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Мозаика',
    default: 'Мозаика — Мебельный магазин',
  },
  description: 'Мебельный магазин Мозаика. Большой выбор мебели для дома.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
