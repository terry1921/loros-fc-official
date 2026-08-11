import { News } from '../types';
import {useFirebaseCollection} from './useFirebaseCollection';

export const useNews = () => {
  const {items: news, loading, error, refetch} = useFirebaseCollection<News>(
    'data/news',
    'No se pudieron cargar las noticias.',
  );

  return {news, loading, error, refetch};
};
