'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../lib/firebase';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <p>Loading...</p>; // Or a spinner component
    }

    if (!user) {
      return null; // Or a redirect component
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
