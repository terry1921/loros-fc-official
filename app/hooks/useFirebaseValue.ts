import {useCallback, useEffect, useRef, useState} from 'react';
import {get, ref} from 'firebase/database';
import {database} from '../lib/firebase';

export function useFirebaseValue<T>(
  path: string,
  parse: (value: unknown) => T,
  initialValue: T,
  errorMessage: string,
) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const mountedRef = useRef(true);
  const initialValueRef = useRef(initialValue);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const snapshot = await get(ref(database, path));
      if (mountedRef.current) {
        setValue(snapshot.exists() ? parse(snapshot.val()) : initialValueRef.current);
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
  }, [errorMessage, parse, path]);

  useEffect(() => {
    mountedRef.current = true;
    void refetch();

    return () => {
      mountedRef.current = false;
    };
  }, [refetch]);

  return {value, loading, error, refetch};
}
