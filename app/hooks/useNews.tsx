import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '../lib/firebase';
import { News } from '../types';

export const useNews = () => {
  const [news, setNews] = useState<Record<string, News>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    try {
      const newsRef = ref(database, 'data/news');
      const snapshot = await get(newsRef);
      if (snapshot.exists()) {
        setNews(snapshot.val());
      } else {
        setNews({});
      }
    } catch (err) {
      setError('Failed to fetch news.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { news, loading, error, refetch: fetchNews };
};
