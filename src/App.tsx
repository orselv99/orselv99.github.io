import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MENUDATAS } from './pages/menu';
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

