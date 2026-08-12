import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {Layout} from './components/layout';

const inter = Inter({ subsets: ['latin'] });

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

const siteUrl = getSiteUrl();
const siteOrigin = siteUrl.origin;
const clubJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsTeam',
  name: 'Loros Fútbol Club',
  alternateName: 'Loros FC',
  sport: 'Fútbol',
  url: siteOrigin,
  logo: new URL('/assets/shields/loros_fc_shield.png', siteOrigin).toString(),
  email: 'lorosfcqro@gmail.com',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61583836440400',
    'https://www.instagram.com/lorosfcqro/',
  ],
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'Loros FC | Sitio Oficial',
    template: '%s | Loros FC',
  },
  description: 'Sitio oficial de Loros Fútbol Club: noticias, plantilla, partidos, tienda y oportunidades de patrocinio.',
  keywords: ['Loros FC', 'Loros Fútbol Club', 'fútbol mexicano', 'fútbol en Querétaro', 'noticias Loros FC'],
  applicationName: 'Loros FC',
  alternates: {canonical: '/'},
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: '/',
    siteName: 'Loros FC',
    title: 'Loros FC | Sitio Oficial',
    description: 'Noticias, plantilla, partidos, tienda y oportunidades de patrocinio de Loros Fútbol Club.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Loros FC | Sitio Oficial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loros FC | Sitio Oficial',
    description: 'Noticias, plantilla, partidos, tienda y oportunidades de patrocinio de Loros Fútbol Club.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/assets/shields/loros.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(clubJsonLd)}}
        />
        <Layout>{children}</Layout>
        <SpeedInsights />
      </body>
    </html>
  );
}
