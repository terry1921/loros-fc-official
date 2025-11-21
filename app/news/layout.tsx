import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

interface NewsLayoutProps {
  children: React.ReactNode;
}

const NewsLayout: React.FC<NewsLayoutProps> = ({ children }) => {
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

export default NewsLayout;
