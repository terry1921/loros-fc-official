import React from 'react';
import { Footer, Navbar } from '../components/layout';


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
