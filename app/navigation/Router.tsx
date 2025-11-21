import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeScreen, NewsScreen, SquadScreen, ShopScreen } from '../screens';
import { Layout } from '../components/layout/Layout';

export const AppRouter: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/squad" element={<SquadScreen />} />
        <Route path="/news" element={<NewsScreen />} />
        <Route path="/shop" element={<ShopScreen />} />
      </Routes>
    </Layout>
  );
};
