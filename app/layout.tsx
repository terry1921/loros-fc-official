import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Layout} from './components/layout';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? {metadataBase: new URL(siteUrl)} : {}),
  title: {
    default: 'Loros FC | Sitio Oficial',
    template: '%s | Loros FC',
  },
  description: 'Sitio oficial de Loros Fútbol Club: noticias, plantilla, partidos, tienda y oportunidades de patrocinio.',
  keywords: ['Loros FC', 'Loros Fútbol Club', 'fútbol mexicano', 'fútbol en Querétaro', 'noticias Loros FC'],
  applicationName: 'Loros FC',
  alternates: siteUrl ? {canonical: siteUrl} : undefined,
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl || undefined,
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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
