export type Tab = 'home' | 'squad' | 'news' | 'shop';

export interface NavLinkProps {
  tab: Tab;
  label: string;
}

export interface Match {
  opponent: string;
  date?: string;
  time?: string;
  stadium?: string;
  home?: boolean;
  score?: string;
  result?: 'W' | 'L' | 'D';
  scorer?: string;
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

export interface MockData {
  nextMatch: Match;
  lastMatch: Match;
  players: Player[];
  news: News[];
}