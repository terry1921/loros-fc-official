import type {ReactNode} from 'react';

interface ShopLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Tienda oficial',
  description: 'Productos oficiales de Loros Fútbol Club para la afición.',
};

const ShopLayout = ({children}: ShopLayoutProps) => children;

export default ShopLayout;
