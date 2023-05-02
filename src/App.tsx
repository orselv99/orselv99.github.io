import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MENUDATAS } from './pages/menu';
import { Footer } from './pages/footer';

export const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {
            MENUDATAS.map((value, index) => {
              if (value.children) {
                return value.children.map((child, index) => {
                  return (
                    <Route path={child.path} element={child.element} key={`route_child_${index}`} />
                  );
                })
              }

              return (
                <Route path={value.path} element={value.element} key={`route_${index}`} />
              );
            })
          }
        </Routes>
        <Footer />
      </BrowserRouter>
    </div >
  );
}

