import React from "react";
import {News} from "../types";
import Image from "next/image";

interface StandardNewsProps {
  news: News
}

export const StandardNews: React.FC<StandardNewsProps> = ({news}) => {
  return <div className="flex gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow">
    <div
      className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center bg-emerald-100">
      <Image src={news.image} alt="Loros FC" className="object-cover" width={100} height={100}/>
    </div>
    <div className="flex flex-col justify-center">
      <span className="text-xs text-emerald-600 font-bold uppercase mb-1">{news.category}</span>
      <h4 className="text-lg font-bold text-gray-800 leading-tight mb-2">{news.title}</h4>
      <span className="text-xs text-gray-400">{news.date}</span>
    </div>
  </div>
}