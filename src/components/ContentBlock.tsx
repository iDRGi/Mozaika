import Image from 'next/image'

type MediaImage = {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

type ContentBlockData = {
  id: string | number
  title: string
  text?: string | null
  image?: MediaImage | null
  imagePosition?: 'left' | 'right' | null
}

const THEMES = [
  { bg: 'bg-white',    border: 'border-stone-200' },
  { bg: 'bg-brand-50', border: 'border-brand-100' },
  { bg: 'bg-stone-50', border: 'border-stone-200' },
] as const

export default function ContentBlock({ block, index = 0 }: { block: ContentBlockData; index?: number }) {
  const isRight = block.imagePosition === 'right'
  const imageUrl = block.image?.url?.replace(/^https?:\/\/[^/]+/, '') ?? null
  const theme = THEMES[index % THEMES.length]

  return (
    <div className={`rounded-2xl border ${theme.bg} ${theme.border} p-6 md:p-8`}>
      <div
        className={`flex flex-col gap-8 items-center ${
          block.image ? 'md:flex-row' : ''
        } ${isRight ? 'md:flex-row-reverse' : ''}`}
      >
        {imageUrl && (
          <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={imageUrl}
              alt={block.image?.alt || block.title}
              width={block.image?.width ?? 800}
              height={block.image?.height ?? 600}
              style={{ width: '100%', height: 'auto' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className={imageUrl ? 'w-full md:w-1/2' : 'w-full max-w-2xl mx-auto text-center'}>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">{block.title}</h2>
          {block.text && (
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">{block.text}</p>
          )}
        </div>
      </div>
    </div>
  )
}
