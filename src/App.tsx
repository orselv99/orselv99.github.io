import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.css';

import { Header } from './pages/header';
import { GNB } from './pages/gnb';
import { Game } from './pages/contents/game';
import { Home } from './pages/contents/home';
import { Windows } from './pages/contents/windows';
import { Resume } from './pages/contents/resume';

export const App = () => {
  useEffect(() => {
    // initializeCookie();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <GNB />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Windows' element={<Windows />} />
          <Route path='/Game' element={<Game />} />
          <Route path='/Resume' element={<Resume />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

