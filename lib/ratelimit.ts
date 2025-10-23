type RateLimitStore = {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitStore>()

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 10 * 60 * 1000): boolean {
  const now = Date.now()
  const record = store.get(ip)

  if (!record || now > record.resetTime) {
    store.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of store.entries()) {
    if (now > record.resetTime) {
      store.delete(ip)
    }
  }
}, 60 * 1000) // Clean up every minute

