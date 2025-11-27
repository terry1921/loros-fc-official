import React from 'react';
import {SectionTitle} from '../components';
import {Shield} from 'lucide-react';
import {database} from '../lib/firebase';
import {get, ref} from 'firebase/database';
import {News} from "../types";
import Image from "next/image";

async function getRealtimeData() {
  const refData = ref(database, 'data/news');
  const snapshot = await get(refData);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
}

const NewsScreen: React.FC = async () => {
  const dataNews = await getRealtimeData();
  const news: News[] = Object.values(dataNews)
  news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const featuredNews: News | null = news.length > 0 ? news[0] : null
  const standardNews: News[] = news.length > 1 ? news.slice(1) : []

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Noticias del Club" subtitle="Mantente informado del día a día"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Featured News */}
          {featuredNews && (
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden h-96 group cursor-pointer">
              <div className="absolute inset-0 bg-emerald-900"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 p-8 z-20 max-w-3xl">
                <span
                  className="bg-yellow-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">Destacado</span>
                <h3
                  className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="text-gray-300 mb-4 hidden md:block">
                  {featuredNews.content}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <Image src={featuredNews.image} alt="Loros FC" className="object-cover" width={200} height={200}/>
              </div>
            </div>
          )}

          {/* Standard News Grid */}
          {standardNews.map((newsItem, i) => (
            newsItem.active && (
              <div key={i} className="flex gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow">
                <div
                  className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center bg-emerald-100">
                  <Image src={newsItem.image} alt="Loros FC" className="object-cover" width={100} height={100}/>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs text-emerald-600 font-bold uppercase mb-1">{newsItem.category}</span>
                  <h4 className="text-lg font-bold text-gray-800 leading-tight mb-2">{newsItem.title}</h4>
                  <span className="text-xs text-gray-400">{newsItem.date}</span>
                </div>
              </div>
            )))}
        </div>
      </div>
    </div>
  );
};

export default NewsScreen;
