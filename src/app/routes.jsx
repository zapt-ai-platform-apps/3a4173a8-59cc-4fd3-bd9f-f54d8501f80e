import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ProductPage from './pages/ProductPage';
import HowItWorksPage from './pages/HowItWorksPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}