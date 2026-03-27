type BannerType = 'promo' | 'new' | 'info' | 'urgent'

type Banner = {
  id:      string | number
  title:   string
  content?: string | null
  type?:   BannerType | null
}

const TYPE_STYLES: Record<BannerType, string> = {
  promo:  'bg-amber-50  border-amber-300  text-amber-800',
  new:    'bg-green-50  border-green-300  text-green-800',
  info:   'bg-blue-50   border-blue-300   text-blue-800',
  urgent: 'bg-red-50    border-red-300    text-red-800',
}

const TYPE_BADGES: Record<BannerType, string> = {
  promo:  'Акция',
  new:    'Новинка',
  info:   'Информация',
  urgent: 'Срочно',
}

export default function BannerSection({ banner }: { banner: Banner }) {
  const type = (banner.type as BannerType) || 'info'
  const styles = TYPE_STYLES[type]
  const badge  = TYPE_BADGES[type]

  return (
    <div className={`rounded-lg border px-5 py-4 flex items-start gap-4 ${styles}`}>
      <span className="inline-block text-xs font-bold uppercase tracking-wide opacity-70 mt-0.5 shrink-0">
        {badge}
      </span>
      <div>
        <p className="font-semibold">{banner.title}</p>
        {banner.content && (
          <p className="text-sm opacity-80 mt-0.5">{banner.content}</p>
        )}
      </div>
    </div>
  )
}
