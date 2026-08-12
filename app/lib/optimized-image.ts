const WEBP_ASSET_PREFIXES = [
  '/assets/players/',
  '/assets/wallpaper/',
  '/assets/news/',
];

const ALLOWED_REMOTE_IMAGE_HOSTS = new Set([
  'placehold.co',
  'storage.googleapis.com',
]);

export function getOptimizedImageSource(source: string) {
  if (!source.startsWith('/')) {
    return source;
  }

  const queryStart = source.indexOf('?');
  const path = queryStart === -1 ? source : source.slice(0, queryStart);
  const query = queryStart === -1 ? '' : source.slice(queryStart);

  if (path.endsWith('.png') && WEBP_ASSET_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    return `${path.slice(0, -4)}.webp${query}`;
  }

  return source;
}

export function isSafeHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isSafeImageSource(source: string) {
  if (!source) {
    return false;
  }

  return source.startsWith('/') || isSafeHttpsUrl(source);
}

export function isAllowedImageSource(source: string) {
  if (!source) {
    return false;
  }

  if (source.startsWith('/')) {
    return true;
  }

  if (!isSafeHttpsUrl(source)) {
    return false;
  }

  try {
    return ALLOWED_REMOTE_IMAGE_HOSTS.has(new URL(source).hostname);
  } catch {
    return false;
  }
}
