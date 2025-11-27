import React from 'react';
import {Navbar} from '../components/layout';

interface SquadLayoutProps {
  children: React.ReactNode;
}

const SquadLayout: React.FC<SquadLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default SquadLayout;
