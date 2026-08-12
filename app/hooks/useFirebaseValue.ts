import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {get, QueryConstraint, query, ref} from 'firebase/database';
import {database} from '../lib/firebase';

type FirebaseValueOptions = {
  queryConstraints?: QueryConstraint[];
  queryKey?: string;
};

const EMPTY_QUERY_CONSTRAINTS: QueryConstraint[] = [];
const valueCache = new Map<string, unknown>();
const pendingValueRequests = new Map<string, Promise<unknown>>();

function getRequestKey(path: string, queryKey?: string): string {
  return queryKey ? `${path}?${queryKey}` : path;
}

async function fetchValue(path: string, queryConstraints: QueryConstraint[], cacheKey: string, force = false) {
  if (!force && valueCache.has(cacheKey)) {
    return valueCache.get(cacheKey);
  }

  if (!force && pendingValueRequests.has(cacheKey)) {
    return pendingValueRequests.get(cacheKey);
  }

  const baseReference = ref(database, path);
  const request = get(queryConstraints.length > 0 ? query(baseReference, ...queryConstraints) : baseReference)
    .then((snapshot) => {
      const value = snapshot.exists() ? snapshot.val() : null;
      valueCache.set(cacheKey, value);
      pendingValueRequests.delete(cacheKey);
      return value;
    })
    .catch((error) => {
      pendingValueRequests.delete(cacheKey);
      throw error;
    });

  pendingValueRequests.set(cacheKey, request);
  return request;
}

export function useFirebaseValue<T>(
  path: string,
  parse: (value: unknown) => T,
  initialValue: T,
  errorMessage: string,
  options?: FirebaseValueOptions,
) {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState('');
  const [settledCacheKey, setSettledCacheKey] = useState('');
  const mountedRef = useRef(false);
  const requestIdRef = useRef(0);
  const initialValueRef = useRef(initialValue);
  const queryConstraintsRef = useRef<QueryConstraint[]>(options?.queryConstraints ?? EMPTY_QUERY_CONSTRAINTS);
  const cacheKey = useMemo(
    () => getRequestKey(path, options?.queryKey),
    [options?.queryKey, path],
  );
  const loading = isLoading || settledCacheKey !== cacheKey;
  const error = settledCacheKey === cacheKey ? errorState : '';

  const readValue = useCallback(async (force = false) => {
    const nextValue = await fetchValue(path, queryConstraintsRef.current, cacheKey, force);
    return nextValue === null ? initialValueRef.current : parse(nextValue);
  }, [cacheKey, parse, path]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    queryConstraintsRef.current = options?.queryConstraints ?? EMPTY_QUERY_CONSTRAINTS;
  }, [options?.queryConstraints]);

  const refetch = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoading(true);
    setErrorState('');

    try {
      const nextValue = await readValue(true);

      if (mountedRef.current && requestIdRef.current === requestId) {
        setValue(nextValue);
        setErrorState('');
      }
    } catch (err) {
      if (mountedRef.current && requestIdRef.current === requestId) {
        setErrorState(errorMessage);
      }
      console.error(err);
    } finally {
      if (mountedRef.current && requestIdRef.current === requestId) {
        setSettledCacheKey(cacheKey);
        setIsLoading(false);
      }
    }
  }, [cacheKey, errorMessage, readValue]);

  useEffect(() => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    void readValue()
      .then((nextValue) => {
        if (mountedRef.current && requestIdRef.current === requestId) {
          setValue(nextValue);
          setErrorState('');
        }
      })
      .catch((err) => {
        if (mountedRef.current && requestIdRef.current === requestId) {
          setErrorState(errorMessage);
        }
        console.error(err);
      })
      .finally(() => {
        if (mountedRef.current && requestIdRef.current === requestId) {
          setSettledCacheKey(cacheKey);
          setIsLoading(false);
        }
      });
  }, [cacheKey, errorMessage, readValue]);

  return {value, loading, error, refetch};
}
