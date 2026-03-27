export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { getPayload } = await import('payload')
    const { default: config } = await import('@payload-config')
    const payload = await getPayload({ config })

    try {
      const { pushSchema } = await import('drizzle-kit/api')
      const db     = (payload.db as any).drizzle
      const schema = (payload.db as any).schema
      const { apply } = await pushSchema(schema, db)
      await apply()
      console.log('[instrumentation] DB schema synced')
    } catch (err) {
      console.error('[instrumentation] DB schema sync failed:', err)
    }
  }
}
