export type Position = 'Portero' | 'Defensa' | 'Medio' | 'Delantero' | "Jugador";

export interface Data {
  lastMatch: Match;
  nextMatch: Match;
  news: News[];
  players: Player[];
}

export interface Match {
  opponent: string;
  date?: string;
  time?: string;
  stadium?: string;
  home?: boolean;
  score?: string;
  result?: 'W' | 'L' | 'D';
  scorers?: Scorer[];
}

export interface Scorer {
  name: string;
  quantity: number;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  img: string;
  photoUrl: string;
  active: boolean;
}

export interface News {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
  content: string;
  summary: string;
  active: boolean;
}
