const WEBP_ASSET_PREFIXES = [
  '/assets/players/',
  '/assets/wallpaper/',
  '/assets/news/',
];

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
