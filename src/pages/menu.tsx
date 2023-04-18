import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import { Content1 } from './contents/content1';
import { Game } from './contents/game';
import { Resume } from './contents/resume';
import { Switch } from '@mui/material';

export interface MenuData {
  name: string;
  path: string;
  element: JSX.Element;
}

export const MenuDatas = (): MenuData[] => {
  return [
    { name: 'CONTENT1', path: '/content1', element: <Content1 /> },
    { name: 'MATCH COLOR', path: '/content3', element: <Game /> },
    { name: 'RESUME', path: '/resume', element: <Resume /> },
  ]
}

export const Menu = () => {
  // const [date, setDate] = useState('');
  // const [darkmode, setDarkMode] = useState(false);
  const [menudatas, setMenuDatas] = useState<MenuData[]>([]);

  useEffect(() => {
    // const getDate = () => {
    //   const now = new Date();
    //   const h = String(now.getHours()).padStart(2, '0');
    //   const m = String(now.getMinutes()).padStart(2, '0');
    //   const s = String(now.getSeconds()).padStart(2, '0');
    //   const d = ['일', '월', '화', '수', '목', '금', '토',].at(now.getDay());

    //   return `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${d}요일 ${h}:${m}:${s}`;
    // }

    // // 째깍째깍
    // setInterval(() => { setDate(getDate()); }, 1000);
    // setDate(getDate());

    // // darkmode (default 값 light)
    // const mode = window.localStorage.getItem('mode') ?? 'light';
    // setDarkMode((mode === 'dark'));
    // window.localStorage.setItem('mode', mode);
    // document.body.dataset.theme = mode;

    // 메뉴
    setMenuDatas(MenuDatas());
  }, []);

  // const onClickDarkMode = () => {
  //   const mode = window.localStorage.getItem('mode') === 'light' ? 'dark' : 'light';
  //   document.body.dataset.theme = mode;
  //   window.localStorage.setItem('mode', mode);
  //   setDarkMode((mode === 'dark'));
  // }

  return (
    <nav>
      <div id='menus'>
        <ul id='menu_list'>
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
      {/* <div id='right'>
        <div>{date}</div>
        <Switch value='darkmode' onClick={onClickDarkMode} checked={darkmode} />
      </div> */}
    </nav>
  );
}