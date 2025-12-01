'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PlayerCard, SectionTitle } from '../components';
import { database } from '../lib/firebase';
import { get, ref } from 'firebase/database';
import { Player } from '../types';

const filterOptions: { label: string; value?: Player['position'] }[] = [
  { label: 'Todos' },
  { label: 'Porteros', value: 'Goalkeeper' },
  { label: 'Defensas', value: 'Defender' },
  { label: 'Medios', value: 'Midfielder' },
  { label: 'Delanteros', value: 'Forward' },
];

function getPlayerView(loading: boolean, error: string, selectedPosition: string, filteredPlayers: Player[]) {

  if (loading) {
    return <div className="text-center"><p>Loading players...</p></div>;
  }

  if (error) {
    return <div className="text-center text-red-500"><p>{error}</p></div>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filterOptions.map(option => {
          const isActive = option.value === selectedPosition || (!option.value && !selectedPosition);
          const href = option.value ? `/squad?position=${encodeURIComponent(option.value)}` : '/squad';
          return (
            <Link
              key={option.label}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                isActive ? 'bg-emerald-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredPlayers.map(player => (
          <PlayerCard key={player.id} player={player}/>
        ))}
      </div>
    </>
  );
}

const SquadContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [players, setPlayers] = useState<Record<string, Player>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const selectedPosition: string = searchParams.get('position') || '';

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const playersRef = ref(database, 'data/players');
        const snapshot = await get(playersRef);
        if (snapshot.exists()) {
          setPlayers(snapshot.val());
        } else {
          setPlayers({});
        }
      } catch (err) {
        setError('Failed to fetch players.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const playerList = Object.values(players);
  const filteredPlayers = selectedPosition
    ? playerList.filter(player => player.position === selectedPosition)
    : playerList;

  return getPlayerView(loading, error, selectedPosition, filteredPlayers);
};

const SquadPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Plantilla 2025/2026" subtitle="Conoce a los guerreros que defienden nuestros colores" />
        <Suspense fallback={<div className="text-center">Loading filters...</div>}>
          <SquadContent />
        </Suspense>
      </div>
    </div>
  );
};

export default SquadPage;
