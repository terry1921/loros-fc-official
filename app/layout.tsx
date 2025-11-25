import './globals.css';
import { Inter } from 'next/font/google';
import { Layout } from './components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Loros FC',
  description: 'Official website of Loros FC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
