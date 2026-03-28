import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['drizzle-kit', '@esbuild-kit/core-utils', 'esbuild'],
  images: {
    // Добавляйте домены поставщиков сюда по мере необходимости
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ocherednichenko.ru',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

export default withPayload(nextConfig)
