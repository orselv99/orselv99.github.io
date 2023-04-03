import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.css';

import { Header } from './pages/header';
import { GNB } from './pages/gnb';
import { Game } from './pages/game';
import { Home } from './pages/home';
import { Windows } from './pages/windows';
import { Resume } from './pages/resume';

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
          <Route path='/Game' element={/* <Game /> */ null} />
          <Route path='/Resume' element={<Resume />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

