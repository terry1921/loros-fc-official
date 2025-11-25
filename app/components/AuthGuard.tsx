'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname.startsWith('/admin')) {
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user && pathname.startsWith('/admin')) {
    return null; 
  }

  return <>{children}</>;
};

export default AuthGuard;
