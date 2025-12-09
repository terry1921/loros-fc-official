import React from "react";
import {News} from "../types";
import Image from "next/image";

interface FeaturedNewProps {
  featuredNews: News;
}

export const FeaturedNew: React.FC<FeaturedNewProps> = ({featuredNews}) => {
  return <div className="md:col-span-2 relative rounded-2xl overflow-hidden h-96 group cursor-pointer">
    <div className="absolute inset-0 bg-emerald-900"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
    <div className="absolute bottom-0 left-0 p-8 z-20 max-w-3xl">
      <span
        className="bg-yellow-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
          Destacado
        </span>
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
}
