import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Pokemon from './pages/pokemon';
import Berry from './pages/berry';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon" element={<Pokemon />} />
      <Route path="/berry" element={<Berry />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
