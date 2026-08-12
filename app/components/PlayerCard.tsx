import React from 'react';
import Image from 'next/image';
import {Player, Position} from '../types';
import {getOptimizedImageSource, isSafeImageSource} from '../lib/optimized-image';

interface PlayerCardProps {
  player: Player;
}

function translatePosition(position: string): Position {
  switch (position) {
    case 'Goalkeeper':
      return 'Portero'
    case 'Defender':
      return 'Defensa'
    case 'Midfielder':
      return 'Medio'
    case 'Forward':
      return 'Delantero'
    default:
      return "Jugador"
  }
}

export const PlayerCard: React.FC<PlayerCardProps> = ({player}) => {
  const imageSource = isSafeImageSource(player.photoUrl)
    ? getOptimizedImageSource(player.photoUrl)
    : '/assets/players/default.webp';

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className={`h-64 w-full ${player.img} flex items-end justify-center pb-4 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent z-10"></div>
        <Image src={imageSource} alt={`Fotografía de ${player.name}, jugador de Loros FC`}
               className="object-contain text-emerald-800/50 transform group-hover:scale-110 transition-transform duration-500"
               fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"/>
        <div className="absolute bottom-4 left-4 z-20 text-white">
          <span
            className="text-5xl font-black text-yellow-400 opacity-90 font-mono leading-none block -mb-2">{player.number}</span>
        </div>
      </div>
      <div className="p-4 relative z-30 bg-white">
        <p
          className="text-sm font-bold text-yellow-600 uppercase tracking-wider mb-1">{translatePosition(player.position)}</p>
        <h3 className="text-xl font-bold text-gray-800">{player.name}</h3>
      </div>
    </div>
  );
};
