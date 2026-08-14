interface RateLimitData {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting IP addresses
const ipCache = new Map<string, RateLimitData>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour window
const MAX_REQUESTS = 50; // Increased threshold for testing

export function isRateLimited(ip: string): boolean {
  // Allow unrestricted testing on localhost / development
  if (process.env.NODE_ENV !== 'production' || ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
    return false;
  }

  const now = Date.now();
  const cachedData = ipCache.get(ip);

  if (!cachedData) {
    ipCache.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS
    });
    return false;
  }

  if (now > cachedData.resetTime) {
    // Window expired, reset rate limit
    ipCache.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS
    });
    return false;
  }

  // Increment count
  cachedData.count += 1;
  
  if (cachedData.count > MAX_REQUESTS) {
    return true;
  }

  return false;
}
