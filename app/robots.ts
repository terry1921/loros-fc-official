import type {MetadataRoute} from 'next';

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!configuredUrl) {
    return new URL('http://localhost:3000');
  }

  try {
    return new URL(configuredUrl);
  } catch {
    return new URL('http://localhost:3000');
  }
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/',
        '/directive-admin',
        '/directive-admin/',
        '/news-admin',
        '/news-admin/',
        '/players-admin',
        '/players-admin/',
        '/products-admin',
        '/products-admin/',
        '/sponsors-admin',
        '/sponsors-admin/',
        '/login',
        '/login/',
      ],
    },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  };
}
