export type Position = 'Portero' | 'Defensa' | 'Medio' | 'Delantero' | "Jugador";
export type Category = 'Playera' | 'Sticker' | 'Iman' | 'Pin' | 'Bumper Sticker'
export type NewsCategory = 'Torneo Fut 6' | 'Liga Premier' | ''

export interface Data {
  lastMatch: Match;
  nextMatch: Match;
  news: News[];
  players: Player[];
}

export interface Match {
  opponent: string;
  opponentLogo?: string;
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
  category: NewsCategory;
  content: string;
  summary: string;
  active: boolean;
}

export interface Product {
  id: string;
  name: string,
  category: Category,
  image: string,
  features: string[],
  url: string,
}

export interface Directive {
  name: string;
  role: string;
  photoUrl: string;
}

export interface Sponsor {
  name: string;
  logoUrl: string;
  url: string;
}
