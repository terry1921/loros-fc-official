'use client';

import { useNews } from '../hooks/useNews';
import {News} from "../types";
import {FeaturedNew, LoadingSpinner, SectionTitle} from "../components";
import {StandardNews} from "../components/StandardNews";
import React, {useMemo, useState} from "react";
import {CURRENT_SEASON, getNewsSeason, sortSeasons} from "../lib/seasons";

function loadViews(news: News[]) {
  const featuredNews = news[0];
  const standardNews = news.slice(1);

  return <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {featuredNews && <FeaturedNew featuredNews={featuredNews}/>}
    {standardNews.map((newsItem, i) => (
      newsItem.active && <StandardNews key={newsItem.id}  news={newsItem}/>))}
  </div>;
}

function NewsSeasonGroup({season, news}: {season: string; news: News[]}) {
  return (
    <section aria-labelledby={`season-${season}`} className="mb-16 last:mb-0">
      <div className="mb-6 flex items-center gap-4">
        <h2 id={`season-${season}`} className="text-2xl font-black uppercase text-emerald-900 md:text-3xl">
          Temporada {season}
        </h2>
        <div className="h-1 flex-1 bg-yellow-400" />
      </div>
      {loadViews(news)}
    </section>
  );
}

const NewsScreen: React.FC = () => {
  const { news, loading, error } = useNews();
  const [selectedSeason, setSelectedSeason] = useState('Todas');

  const groupedNews = useMemo(() => {
    const activeNews = Object.values(news)
      .filter((newsItem) => newsItem.active !== false)
      .sort((a, b) => b.id.localeCompare(a.id));
    const groups = new Map<string, News[]>();

    activeNews.forEach((newsItem) => {
      const season = getNewsSeason(newsItem.season);
      groups.set(season, [...(groups.get(season) || []), newsItem]);
    });

    return sortSeasons(Array.from(groups.keys())).map((season) => ({
      season,
      news: groups.get(season) || [],
    }));
  }, [news]);

  const seasons = ['Todas', ...groupedNews.map((group) => group.season)];
  const visibleGroups = selectedSeason === 'Todas'
    ? groupedNews
    : groupedNews.filter((group) => group.season === selectedSeason);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Noticias del Club" subtitle="Mantente informado del día a día"/>
        {loading ? <LoadingSpinner/> : (
          <>
            {seasons.length > 1 && (
              <div className="mb-12 flex flex-wrap justify-center gap-3" aria-label="Filtrar noticias por temporada">
                {seasons.map((season) => (
                  <button
                    key={season}
                    type="button"
                    onClick={() => setSelectedSeason(season)}
                    aria-pressed={selectedSeason === season}
                    className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                      selectedSeason === season
                        ? 'bg-emerald-900 text-white'
                        : 'bg-white text-gray-600 hover:bg-emerald-50'
                    }`}
                  >
                    {season === 'Todas' ? season : `Temporada ${season}`}
                  </button>
                ))}
              </div>
            )}
            {visibleGroups.length > 0 ? visibleGroups.map((group) => (
              <NewsSeasonGroup key={group.season} season={group.season} news={group.news}/>
            )) : (
              <p className="rounded-xl bg-white p-8 text-center text-gray-600">No hay noticias publicadas para esta temporada.</p>
            )}
          </>
        )}
        {error && <p className="text-red-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{error}</p>}
      </div>
    </div>
  );
};


export default NewsScreen;
