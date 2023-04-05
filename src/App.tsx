import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Header } from './pages/header';
import { Entrance } from './pages/entrance';
import { MenuData, MenuDatas } from './pages/menu';
import { Content1 } from './pages/contents/content1';

export const App = () => {
  const [menudatas, setMenuDatas] = useState<MenuData[]>([]);

  useEffect(() => {
    setMenuDatas(MenuDatas());
  }, []);

  return (
    <div className="app">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Entrance />} />
          {
            menudatas.map((item, index) => {
              return (
                <Route path={item.path} element={item.element} />
              );
            })
          }
        </Routes>
      </BrowserRouter>
    </div >
  );
}

