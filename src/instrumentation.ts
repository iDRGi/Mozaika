export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { getPayload } = await import('payload')
    const { default: config } = await import('@payload-config')
    const payload = await getPayload({ config })

    try {
      // Синхронизируем схему БД при старте (создаёт таблицы если их нет)
      await (payload.db as any).push({ payload, force: true })
    } catch (err) {
      console.error('[instrumentation] DB push failed:', err)
    }
  }
}
