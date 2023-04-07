import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './menu.css';
import { Content1 } from './contents/content1';
import { Game } from './contents/game';

export interface MenuData {
  name: string;
  path: string;
  element: JSX.Element;
}

export const MenuDatas = (): MenuData[] => {
  return [
    { name: 'content1', path: '/content1', element: <Content1 /> },
    { name: 'content2', path: '/content2', element: <Content1 /> },
    { name: 'content3', path: '/content3', element: <Game /> },
  ]
}

export const Menu = () => {
  const [menudatas, setMenuDatas] = useState<MenuData[]>([]);

  useEffect(() => {
    setMenuDatas(MenuDatas());
  }, []);

  return (
    <nav>
      <div id='menus'>
        <ul>
          {
            menudatas.map((item, index) => {
              return (
                <div key={'menu_' + index}>
                  <Link to={item.path}>
                    {
                      (index != 0 && index < menudatas.length) &&
                      <li className='spacing'>·</li>
                    }
                    <li className='name'>{item.name}</li>
                  </Link>
                </div>
              );
            })
          }
        </ul>
      </div>
    </nav>
  );
}