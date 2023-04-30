import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MENUDATAS, Menu } from './pages/menu';
import './app.css';
import Heart from './assets/heart.png';
import { Home } from './pages/contents/home';
import { Footer } from './pages/footer';

export const App = () => {
  useEffect(() => {
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {
            MENUDATAS.map((value, index) =>
              <Route path={value.path} element={value.element} key={`route_${index}`} />
            )
          }
        </Routes>
        <Footer />
      </BrowserRouter>
    </div >
  );
}

