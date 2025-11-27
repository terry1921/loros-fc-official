import React from 'react';
import {Navbar} from '../components/layout';

interface ShopLayoutProps {
  children: React.ReactNode;
}

const ShopLayout: React.FC<ShopLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default ShopLayout;
