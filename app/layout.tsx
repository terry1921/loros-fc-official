import './globals.css';
import {Inter} from 'next/font/google';
import {Layout} from './components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Loros FC',
  description: 'Sitio oficial de Loros Fútbol Club',
  favicon: '/assets/shields/loros.png'
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
