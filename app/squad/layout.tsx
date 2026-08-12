import type {ReactNode} from 'react';

interface SquadLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Plantilla',
  description: 'Conoce a la plantilla y los jugadores de Loros Fútbol Club.',
};

const SquadLayout = ({children}: SquadLayoutProps) => children;

export default SquadLayout;
