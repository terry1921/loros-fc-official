import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};
