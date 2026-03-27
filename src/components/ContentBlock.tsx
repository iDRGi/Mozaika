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

export default function ContentBlock({ block }: { block: ContentBlockData }) {
  const isRight = block.imagePosition === 'right'
  // Приводим к относительному пути, чтобы Next.js Image работал без remotePatterns
  const imageUrl = block.image?.url?.replace(/^https?:\/\/[^/]+/, '') ?? null

  return (
    <div
      className={`flex flex-col gap-8 items-center ${
        block.image ? 'md:flex-row' : ''
      } ${isRight ? 'md:flex-row-reverse' : ''}`}
    >
      {imageUrl && (
        <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
          <Image
            src={imageUrl}
            alt={block.image?.alt || block.title}
            fill
            className="object-cover"
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
  )
}
