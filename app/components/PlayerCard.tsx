import React from 'react';
import { Player } from '../types';
import { Shield } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-300 shadow-xl">
        <div className={`aspect-square w-full ${player.img} flex items-center justify-center`}>
            <Shield size={100} className="text-white/50" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5">
            <p className="text-4xl font-black text-white leading-none tracking-tighter opacity-50">{player.number}</p>
            <h3 className="text-xl font-bold text-white mt-1">{player.name}</h3>
            <p className="text-yellow-400 text-sm font-semibold">{player.position}</p>
        </div>
    </div>
  );
};