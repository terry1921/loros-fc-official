import React from 'react';
import {News} from '../types';
import Image from "next/image";

interface NewsCardProps {
  item: News;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
        <div className="h-48 bg-emerald-200 rounded-t-xl flex justify-center items-center">
          <Image src={item.image} alt="Loros FC" className="object-cover" width={150} height={150}/>
        </div>
        <div className="p-6">
            <p className="text-xs font-bold uppercase text-emerald-600 mb-2">{item.category}</p>
            <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.content}</p>
            <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{item.date}</span>
            </div>
        </div>
    </div>
  );
};