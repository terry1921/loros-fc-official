'use client';

import {News} from "../types";
import {DataState, FeaturedNew, SectionTitle} from "../components";
import {StandardNews} from "../components/StandardNews";
import React, {useMemo, useState} from "react";
import {getNewsSeason, sortSeasons} from "../lib/seasons";
import {useFirebaseCollection} from '../hooks/useFirebaseCollection';
import {isNews} from '../lib/validation';

function loadViews(news: News[]) {
  const featuredNews = news[0];
  const standardNews = news.slice(1);

  return <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {featuredNews && <FeaturedNew featuredNews={featuredNews}/>}
    {standardNews.map((newsItem) => (
      <StandardNews key={newsItem.id} news={newsItem}/>))}
  </div>;
}

function NewsSeasonGroup({season, news}: Readonly<{ season: string; news: News[] }>) {
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
  const {items: news, loading, error, refetch} = useFirebaseCollection<News>(
    'data/news',
    'No se pudieron cargar las noticias.',
    {validate: isNews},
  );
  const [selectedSeason, setSelectedSeason] = useState('Todas');
  const groupedNews = useMemo(() => {
    const activeNews = news
      .filter((newsItem) => newsItem.active)
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
    <>
      <section className="relative overflow-hidden bg-emerald-950 py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[url('/assets/textures/carbon-fibre.svg')] opacity-20" aria-hidden="true" />
      </section>
      <div className="pt-16 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Noticias del Club" subtitle="Mantente informado del día a día"/>
          <DataState
            loading={loading}
            error={error}
            empty={visibleGroups.length === 0}
            loadingLabel="Cargando noticias..."
            emptyTitle="No hay noticias publicadas"
            emptyMessage="Cuando publiquemos nuevas noticias del club aparecerán aquí."
            onRetry={() => void refetch()}
          >
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
              {visibleGroups.map((group) => (
                <NewsSeasonGroup key={group.season} season={group.season} news={group.news}/>
              ))}
            </>
          </DataState>
        </div>
      </div>
    </>
  );
};


export default NewsScreen;
