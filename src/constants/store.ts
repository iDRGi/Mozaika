// Информация о магазине — редактируйте здесь
export const STORE = {
  name: 'Мебельная Мозайка',
  tagline: 'Мебель для вашего дома',
  phones: [
    { label: 'Основной', number: '+7 (993) 275-19-29' },
    { label: 'Дополнительный',  number: '+7 (901) 519-44-17' },
  ],
  address: 'Каширский переулок, 68, Бронницы, Московская область, 140170',
  workingHours: [
    { days: 'Пн–Вс', hours: '10:00 – 19:00' },
  ],
  socials: [
    { label: 'Telegram', url: 'https://t.me/placeholder', icon: '✈️' },
    { label: 'MAX',      url: 'https://max.ru/placeholder', icon: '💬' },
  ],
} as const
