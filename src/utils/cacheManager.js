const CACHE_OPTIONS = {
  ttl: 1000 * 60 * 5 // 5 minutes
};

export const CACHE_KEYS = {
  referrals: 'referrals'
};

export function setCache(key, value, ttl = CACHE_OPTIONS.ttl) {
  const expirationTime = Date.now() + ttl;

  const cacheObject = {
    value,
    expirationTime
  };

  localStorage.setItem(key, JSON.stringify(cacheObject));
}

export function getCache(key) {
  const cacheObjectString = localStorage.getItem(key);

  if (cacheObjectString) {
    const cacheObject = JSON.parse(cacheObjectString);

    if (cacheObject.expirationTime > Date.now()) {
      return cacheObject.value;
    } else {
      localStorage.removeItem(key);
    }
  }

  return null;
}

export function clearCache(key) {
  localStorage.removeItem(key);
}
