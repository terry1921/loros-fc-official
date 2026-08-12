import type {MetadataRoute} from 'next';
import type {News} from './types';
import {normalizeNews} from './lib/firebase-data';

const publicRoutes = [
  '',
  '/news',
  '/squad',
  '/shop',
  '/sponsors',
  '/directive',
  '/history',
  '/wallpapers',
  '/privacy',
  '/terms',
  '/contact',
];

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

function getNewsUrl(slug: string) {
  return `/news/${encodeURIComponent(slug)}`;
}

function isIndexableNews(news: News) {
  return news.active !== false && Boolean(news.id && news.title);
}

function getLastModified(date: string | undefined, fallback: Date) {
  if (!date) {
    return fallback;
  }

  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime()) ? fallback : parsedDate;
}

async function getPublishedNews() {
  const databaseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  if (!databaseUrl) {
    return [];
  }

  try {
    const response = await fetch(`${databaseUrl.replace(/\/$/, '')}/data/news.json`, {
      next: {revalidate: 3600},
    });

    if (!response.ok) {
      return [];
    }

    return normalizeNews(await response.json()).filter(isIndexableNews);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const news = await getPublishedNews();

  return [
    ...publicRoutes.map((route) => ({
      url: new URL(route, siteUrl).toString(),
      lastModified: now,
      changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...news.map((newsItem) => ({
      url: new URL(getNewsUrl(newsItem.id), siteUrl).toString(),
      lastModified: getLastModified(newsItem.date, now),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
