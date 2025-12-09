'use client';

import { useNews } from '../hooks/useNews';
import {News} from "../types";
import {FeaturedNew, LoadingSpinner, SectionTitle} from "../components";
import {StandardNews} from "../components/StandardNews";
import React from "react";

function loadViews(standardNews: News[], featuredNews?: News) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {featuredNews && <FeaturedNew featuredNews={featuredNews}/>}
    {standardNews.map((newsItem, i) => (
      newsItem.active && <StandardNews key={newsItem.id}  news={newsItem}/>))}
  </div>;
}

const NewsScreen: React.FC = () => {
  const { news, loading, error } = useNews();
  const sortNews: News[] = Object.values(news).reverse()
  const featuredNews: News | undefined = sortNews.length > 0 ? sortNews[0] : undefined
  const standardNews: News[] = sortNews.length > 1 ? sortNews.slice(1) : []

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Noticias del Club" subtitle="Mantente informado del día a día"/>
        {loading ? <LoadingSpinner/> : loadViews(standardNews, featuredNews)}
        {error && <p className="text-red-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{error}</p>}
      </div>
    </div>
  );
};


export default NewsScreen;
