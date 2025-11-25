import React from 'react';
import Image from 'next/image';
import {Player, Position} from '../types';
import {Shield} from 'lucide-react';

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
      return undefined
  }
}

export const PlayerCard: React.FC<PlayerCardProps> = ({player}) => {
  const position: String = translatePosition(player.position) || '';
  return (
    <div
      className="relative rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-300 shadow-xl">
      <div className={`aspect-square w-full ${player.img} flex items-center justify-center`}>
        <Shield size={100} className="text-white/50"/>
        <Image src={player.photoUrl} alt={player.name} className="object-cover" width={100} height={100}/>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-5">
        <p className="text-4xl font-black text-white leading-none tracking-tighter opacity-50">{player.number}</p>
        <h3 className="text-xl font-bold text-white mt-1">{player.name}</h3>
        <p className="text-yellow-400 text-sm font-semibold">{position}</p>
      </div>
    </div>
  );
};
