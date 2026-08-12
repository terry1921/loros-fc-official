'use client';

import type {ComponentType, FC} from 'react';
import AuthGuard from './AuthGuard';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent: FC<P> = (props) => {
    return (
      <AuthGuard requireAuth>
        <WrappedComponent {...props} />
      </AuthGuard>
    );
  };

  return WithAuthComponent;
};

export default withAuth;
