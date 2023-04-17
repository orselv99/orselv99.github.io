import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Entrance } from './pages/entrance';
import { Menu, MenuData, MenuDatas } from './pages/menu';

export const App = () => {
  const [menudatas, setMenuDatas] = useState<MenuData[]>([]);
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    setMenuDatas(MenuDatas());
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Entrance />} />
          {
            menudatas.map((item) => {
              return (
                <Route path={item.path} element={item.element} key={item.path} />
              );
            })
          }
        </Routes>
      </BrowserRouter>
    </div >
  );
}

