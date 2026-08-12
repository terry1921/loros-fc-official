import type {ReactNode} from 'react';

interface NewsLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Noticias',
  description: 'Noticias oficiales de Loros Fútbol Club organizadas por temporada.',
};

const NewsLayout = ({children}: NewsLayoutProps) => children;

export default NewsLayout;
