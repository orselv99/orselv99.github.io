import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';
import { Content1 } from './contents/content1';
import { Resume } from './contents/resume';
import { Switch } from '@mui/material';
import { ChromeIsOFFLINE2D } from './contents/chromeIsOFFLINE.2D';
import { ChromeIsOFFLINE3D } from './contents/choromIsOFFLINE.3D';

export interface MenuData {
  name: string;
  path: string;
  hasUnityContext: boolean;
  element: JSX.Element;
}

export const MenuDatas = (): MenuData[] => {
  return [
    {
      name: 'CIO.2D',
      path: '/CIO.2D',
      hasUnityContext: true,
      element: <ChromeIsOFFLINE2D />
    },
    {
      name: 'CIO.3D',
      path: '/CIO.3D',
      hasUnityContext: true,
      element: <ChromeIsOFFLINE3D />
    },
    {
      name: 'RESUME',
      path: '/resume',
      hasUnityContext: false,
      element: <Resume />
    },
  ]
}

interface MenuProps {
  unityUnload?: () => Promise<void>
}

export const Menu = (props: MenuProps) => {
  // const [date, setDate] = useState('');
  // const [darkmode, setDarkMode] = useState(false);
  const [menudatas, setMenuDatas] = useState<MenuData[]>([]);
  const history = useNavigate();

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

  const onClickLinkTo = async (path: string) => {
    // unity unload 가 필요한 경우
    if (props && props.unityUnload) {
      await props.unityUnload();
    }

    // async await 을 Link event 에서 사용할 수가 없어서
    // Link a tag 대신 navigate 를 사용하여 전환
    history(path);
  }

  return (
    <nav>
      <div id='menus'>
        <ul id='menu_list'>
          {
            menudatas.map((item, index) => {
              return (
                <div className='menu_item' key={'menu_' + index} onClick={() => onClickLinkTo(item.path)}>
                  {
                    (index !== 0 && index < menudatas.length) &&
                    <p className='spacing'>·</p>
                  }
                  <li className='name'>{item.name}</li>
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