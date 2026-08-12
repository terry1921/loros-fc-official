export type Position =
  | 'Goalkeeper'
  | 'Defender'
  | 'Midfielder'
  | 'Forward'
  | 'Player'
  | 'Portero'
  | 'Defensa'
  | 'Medio'
  | 'Delantero'
  | 'Jugador';
export type Category = 'Playera' | 'Sticker' | 'Iman' | 'Pin' | 'Bumper Sticker';
export type NewsCategory = 'Torneo Fut 6' | 'Liga Premier' | 'Copa Premier';
export type MatchResult = 'W' | 'L' | 'D';
export type Season = `${number}` | `${number}/${number}` | `Copa ${number}`;

export type Identified<T> = T & { id: string };

export type FirebaseCollection<T> = Record<string, T> | T[] | null | undefined;

export interface Data {
  lastMatch?: Match;
  nextMatch?: Match;
  news?: News[];
  players?: Player[];
}

export interface MatchBase {
  home?: boolean;
  opponent: string;
  opponentLogo?: string;
}

export interface Match extends MatchBase {
  date?: string;
  time?: string;
  stadium?: string;
  score?: string;
  result?: MatchResult;
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
  position: Position;
  img: string;
  photoUrl: string;
  active: boolean;
}

export interface News {
  id: string;
  title: string;
  date: string;
  season?: Season;
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
  id: string;
  name: string;
  role: string;
  photoUrl: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  url: string;
}
