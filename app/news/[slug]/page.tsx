import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {CalendarDays, Tag} from 'lucide-react';
import {getOptimizedImageSource} from '../../lib/optimized-image';
import {getNewsSeason} from '../../lib/seasons';
import {normalizeNews} from '../../lib/firebase-data';
import type {News} from '../../types';

type NewsDetailPageProps = {
  params: Promise<{slug: string}>;
};

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

function getNewsDetailUrl(slug: string) {
  return `/news/${encodeURIComponent(slug)}`;
}

function getDescription(news: News) {
  const source = news.summary || news.content || `Noticia oficial de Loros FC: ${news.title}.`;
  return source.replace(/\s+/g, ' ').trim().slice(0, 160);
}

function getAbsoluteUrl(pathOrUrl: string) {
  try {
    return new URL(pathOrUrl, getSiteUrl()).toString();
  } catch {
    return new URL('/opengraph-image', getSiteUrl()).toString();
  }
}

function getValidDate(date: string) {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function isPublishedNews(news: News) {
  return news.active !== false && Boolean(news.id && news.title);
}

async function getNewsBySlug(slug: string) {
  const databaseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  if (!databaseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${databaseUrl.replace(/\/$/, '')}/data/news.json`, {
      next: {revalidate: 300},
    });

    if (!response.ok) {
      return null;
    }

    const decodedSlug = decodeURIComponent(slug);
    return normalizeNews(await response.json()).find(
      (newsItem) => isPublishedNews(newsItem) && newsItem.id === decodedSlug,
    ) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({params}: NewsDetailPageProps): Promise<Metadata> {
  const {slug} = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    return {
      title: 'Noticia no encontrada',
      description: 'La noticia solicitada no está disponible en el sitio oficial de Loros FC.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = getDescription(news);
  const image = getAbsoluteUrl(getOptimizedImageSource(news.image));
  const url = getNewsDetailUrl(news.id);

  return {
    title: news.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: news.title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `Imagen de la noticia: ${news.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description,
      images: [image],
    },
  };
}

export default async function NewsDetailPage({params}: NewsDetailPageProps) {
  const {slug} = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const image = getOptimizedImageSource(news.image);
  const datePublished = getValidDate(news.date);
  const newsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    description: getDescription(news),
    image: [getAbsoluteUrl(image)],
    url: getAbsoluteUrl(getNewsDetailUrl(news.id)),
    ...(datePublished ? {datePublished: datePublished.toISOString()} : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Loros Fútbol Club',
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/assets/shields/loros_fc_shield.png'),
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(newsJsonLd)}}
      />
      <article className="min-h-screen bg-gray-50 pb-20">
        <section className="relative overflow-hidden bg-emerald-950 py-16 text-white md:py-20">
          <div className="absolute inset-0 bg-[url('/assets/textures/carbon-fibre.svg')] opacity-20" aria-hidden="true" />
        </section>

        <div className="container mx-auto max-w-4xl px-4 pt-12">
          <Link href="/news" className="font-bold text-emerald-700 hover:text-emerald-900">
            ← Volver a noticias
          </Link>

          <header className="mt-8">
            <div className="mb-5 flex flex-wrap gap-3 text-sm font-bold text-emerald-700">
              {news.category && (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1">
                  <Tag size={16} aria-hidden="true" />
                  {news.category}
                </span>
              )}
              {news.date && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1">
                  <CalendarDays size={16} aria-hidden="true" />
                  {news.date}
                </span>
              )}
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-emerald-900">
                Temporada {getNewsSeason(news.season)}
              </span>
            </div>
            <h1 className="text-4xl font-black uppercase leading-tight text-emerald-950 md:text-6xl">
              {news.title}
            </h1>
            {news.summary && (
              <p className="mt-6 text-xl leading-relaxed text-gray-600">
                {news.summary}
              </p>
            )}
          </header>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-emerald-950 shadow-lg">
            <Image
              src={image}
              alt={`Imagen de la noticia: ${news.title}`}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-10">
            <div className="space-y-5 text-lg leading-8 text-gray-700">
              {news.content.split(/\n+/).filter(Boolean).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
