export type Position = 'Portero' | 'Defensa' | 'Medio' | 'Delantero' | undefined;


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
