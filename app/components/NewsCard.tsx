import React from 'react';
import { News } from '../types';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
  item: News;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
        <div className="h-48 bg-emerald-200"></div>
        <div className="p-6">
            <p className="text-xs font-bold uppercase text-emerald-600 mb-2">{item.category}</p>
            <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.summary}</p>
            <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{item.date}</span>
                <span className="flex items-center gap-1 font-bold text-emerald-700 group-hover:gap-2 transition-all">
                    Leer más <ArrowRight size={14} />
                </span>
            </div>
        </div>
    </div>
  );
};