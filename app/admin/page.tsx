'use client';

import React from 'react';
import Link from 'next/link';
import {auth} from '../lib/firebase';
import {signOut} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {LastMatchForm, SectionTitle} from '../components';
import withAuth from '../components/withAuth';
import {NextMatchForm} from "../components/NextMatchForm";

const AdminScreen: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <SectionTitle title="Admin Panel" subtitle="Manage application data"/>
          <button onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
            Logout
          </button>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Admin Sections</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/players-admin"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">
              Manage Players
            </Link>
            <Link href="/news-admin"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">
              Manage News
            </Link>
            <Link href="/products-admin"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">
              Manage Products
            </Link>
            <Link href="/directive-admin"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">
              Manage Directive
            </Link>
            <Link href="/sponsors-admin"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">
              Manage Sponsors
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LastMatchForm/>

          <NextMatchForm/>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminScreen);
