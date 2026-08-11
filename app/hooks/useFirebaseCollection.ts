import {useCallback, useEffect, useRef, useState} from 'react';
import {get, ref} from 'firebase/database';
import {database} from '../lib/firebase';
import {normalizeCollection} from '../lib/firebase-data';

export function useFirebaseCollection<T>(path: string, errorMessage: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const mountedRef = useRef(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const snapshot = await get(ref(database, path));
      if (mountedRef.current) {
        setItems(snapshot.exists() ? normalizeCollection<T>(snapshot.val()) : []);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(errorMessage);
      }
      console.error(err);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [errorMessage, path]);

  useEffect(() => {
    mountedRef.current = true;
    void refetch();

    return () => {
      mountedRef.current = false;
    };
  }, [refetch]);

  return {items, loading, error, refetch};
}
