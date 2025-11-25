import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-emerald-900 uppercase tracking-tighter">{title}</h2>
        <p className="text-lg text-gray-500 mt-2 max-w-2xl mx-auto">{subtitle}</p>
        <div className="h-1.5 w-24 bg-yellow-400 mt-6 mx-auto"></div>
    </div>
  );
};