import React from 'react';
import Link from 'next/link';
import { PlayerCard, SectionTitle } from '../components';
import { database } from '../lib/firebase';
import { get, ref } from 'firebase/database';
import { Player } from '../types';

async function getRealtimeData(): Promise<Record<string, Player> | Player[]> {
  const refData = ref(database, 'data/players');
  const snapshot = await get(refData);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
}

const filterOptions: { label: string; value?: Player['position'] }[] = [
  { label: 'Todos' },
  { label: 'Porteros', value: 'Goalkeeper' },
  { label: 'Defensas', value: 'Defender' },
  { label: 'Medios', value: 'Midfielder' },
  { label: 'Delanteros', value: 'Forward' },
];

const SquadScreen: React.FC<{ searchParams?: { position?: Player['position'] } }> = async ({ searchParams }) => {
  const params = await searchParams;
  const players = await getRealtimeData();
  const selectedPosition = params?.position;
  const playerList = Object.values(players);
  const filteredPlayers = selectedPosition ? playerList.filter(player => player.position === selectedPosition) : playerList;

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Plantilla 2025/2026" subtitle="Conoce a los guerreros que defienden nuestros colores" />

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
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SquadScreen;
