import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {get, QueryConstraint, query, ref} from 'firebase/database';
import {database} from '../lib/firebase';
import {normalizeCollection} from '../lib/firebase-data';
import {Identified} from '../types';

type FirebaseCollectionOptions<T> = {
  queryConstraints?: QueryConstraint[];
  queryKey?: string;
  validate?: (candidate: unknown) => candidate is T;
};

const EMPTY_QUERY_CONSTRAINTS: QueryConstraint[] = [];
const collectionCache = new Map<string, unknown>();
const pendingCollectionRequests = new Map<string, Promise<unknown>>();

function getRequestKey(path: string, queryKey?: string): string {
  return queryKey ? `${path}?${queryKey}` : path;
}

async function fetchCollectionValue(path: string, queryConstraints: QueryConstraint[], cacheKey: string, force = false) {
  if (!force && collectionCache.has(cacheKey)) {
    return collectionCache.get(cacheKey);
  }

  if (!force && pendingCollectionRequests.has(cacheKey)) {
    return pendingCollectionRequests.get(cacheKey);
  }

  const baseReference = ref(database, path);
  const request = get(queryConstraints.length > 0 ? query(baseReference, ...queryConstraints) : baseReference)
    .then((snapshot) => {
      const value = snapshot.exists() ? snapshot.val() : null;
      collectionCache.set(cacheKey, value);
      pendingCollectionRequests.delete(cacheKey);
      return value;
    })
    .catch((error) => {
      pendingCollectionRequests.delete(cacheKey);
      throw error;
    });

  pendingCollectionRequests.set(cacheKey, request);
  return request;
}

export function useFirebaseCollection<T>(
  path: string,
  errorMessage: string,
  options?: FirebaseCollectionOptions<T>,
) {
  const [items, setItems] = useState<Identified<T>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState('');
  const [settledCacheKey, setSettledCacheKey] = useState('');
  const mountedRef = useRef(false);
  const requestIdRef = useRef(0);
  const queryConstraintsRef = useRef<QueryConstraint[]>(options?.queryConstraints ?? EMPTY_QUERY_CONSTRAINTS);
  const cacheKey = useMemo(
    () => getRequestKey(path, options?.queryKey),
    [options?.queryKey, path],
  );
  const loading = isLoading || settledCacheKey !== cacheKey;
  const error = settledCacheKey === cacheKey ? errorState : '';

  const readCollection = useCallback(async (force = false) => {
    const value = await fetchCollectionValue(path, queryConstraintsRef.current, cacheKey, force);
    return normalizeCollection<T>(value, options?.validate);
  }, [cacheKey, options?.validate, path]);

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
      const nextItems = await readCollection(true);

      if (mountedRef.current && requestIdRef.current === requestId) {
        setItems(nextItems);
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
  }, [cacheKey, errorMessage, readCollection]);

  useEffect(() => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    void readCollection()
      .then((nextItems) => {
        if (mountedRef.current && requestIdRef.current === requestId) {
          setItems(nextItems);
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
  }, [cacheKey, errorMessage, readCollection]);

  return {items, loading, error, refetch};
}
