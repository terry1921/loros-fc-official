'use client';

import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {FirebaseError} from 'firebase/app';
import { useRouter } from 'next/navigation';

function getLoginErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return 'No pudimos iniciar sesión. Intenta nuevamente.';
  }

  const messages: Record<string, string> = {
    'auth/invalid-email': 'Revisa el formato del correo electrónico.',
    'auth/user-disabled': 'Esta cuenta está deshabilitada. Contacta al administrador.',
    'auth/user-not-found': 'No encontramos una cuenta con ese correo.',
    'auth/wrong-password': 'La contraseña no es correcta.',
    'auth/invalid-credential': 'El correo o la contraseña no son correctos.',
    'auth/too-many-requests': 'Se hicieron demasiados intentos. Espera unos minutos antes de volver a intentar.',
    'auth/network-request-failed': 'No pudimos conectar con el servicio de acceso. Revisa tu conexión.',
    'auth/missing-password': 'Escribe tu contraseña para continuar.',
  };

  return messages[error.code] || 'No pudimos iniciar sesión. Revisa tus datos e intenta nuevamente.';
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (error: unknown) {
      setError(getLoginErrorMessage(error));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Acceso administrativo</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
