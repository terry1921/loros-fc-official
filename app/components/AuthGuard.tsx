'use client';

import React, {useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../lib/firebase';
import {usePathname, useRouter} from 'next/navigation';

const ADMIN_PATHS = [
  '/admin',
  '/directive-admin',
  '/news-admin',
  '/players-admin',
  '/products-admin',
  '/sponsors-admin',
];

function isAdminPath(pathname: string) {
  return ADMIN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
};

const AuthGuard = ({children, requireAuth}: AuthGuardProps) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const shouldRequireAuth = requireAuth ?? isAdminPath(pathname);

  useEffect(() => {
    if (!loading && !user && shouldRequireAuth) {
      router.replace('/login');
    }
  }, [user, loading, router, shouldRequireAuth]);

  if (loading) {
    return <div role="status">Cargando...</div>;
  }

  if (!user && shouldRequireAuth) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
