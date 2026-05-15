export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

const rateLimitCache = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(ip: string, options: RateLimitOptions = { limit: 10, windowMs: 60000 }) {
  const now = Date.now();
  const record = rateLimitCache.get(ip);

  if (!record) {
    rateLimitCache.set(ip, { count: 1, expiresAt: now + options.windowMs });
    return { success: true, remaining: options.limit - 1 };
  }

  if (now > record.expiresAt) {
    rateLimitCache.set(ip, { count: 1, expiresAt: now + options.windowMs });
    return { success: true, remaining: options.limit - 1 };
  }

  if (record.count >= options.limit) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  return { success: true, remaining: options.limit - record.count };
}
