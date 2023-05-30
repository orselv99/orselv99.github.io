import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';
import { Home, ChromeIsOFFLINE2D, ChromeIsOFFLINE3D, ProjectCD, Resume } from './contents';

interface MenuData {
  name: string;
  path: string;
  element?: JSX.Element;
  children?: MenuData[];
  active?: boolean;
}

export const MENUDATAS: MenuData[] = [
  {
    name: 'HOME',
    path: '/',
    element: <Home />
  },
  {
    name: 'DEV',
    path: '/dev',
    children: [
      {
        name: 'Chrome is OFFLINE 2D',
        path: '/cio.2d',
        element: <ChromeIsOFFLINE2D />
      },
      {
        name: 'Chrome is OFFLINE 3D',
        path: '/cio.3d',
        element: <ChromeIsOFFLINE3D />
      },
      {
        name: 'PROJECT CD',
        path: '/project.cd',
        element: <ProjectCD />
      },
    ]
  },
  // {
  //   name: 'DROPDOWN',
  //   path: '/dropdown',
  //   children: [
  //     {
  //       name: 'DROPDOWN TEST 1',
  //       path: '/resume',
  //       element: <Resume />
  //     },
  //     {
  //       name: 'DROPDOWN TEST 2',
  //       path: '/resume',
  //       element: <Resume />
  //     },
  //     {
  //       name: 'DROPDOWN TEST 3',
  //       path: '/resume',
  //       element: <Resume />
  //     },
  //     {
  //       name: 'DROPDOWN TEST 4',
  //       path: '/resume',
  //       element: <Resume />
  //     },
  //   ]
  // },
  {
    name: 'RESUME',
    path: '/resume',
    element: <Resume />
  },
];

// TODO:
// unity webgl bug (?) 로 인해 unload 가 자체적으로 안됨
// 따라서, menu 에서 props 를 받아서 다른페이지를 이동시 unload 후 navigate 처리
// 위 과정을 위해 페이지마다 Menu 를 추가해야함
interface MenuProps {
  unityUnload?: () => Promise<void>;
}

export const Menu = (props: MenuProps) => {
  const [menudatas, setMenuDatas] = useState([] as MenuData[]);
  const history = useNavigate();

  useEffect(() => {
    setMenuDatas(MENUDATAS);
  }, []);

  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    // dropdown 메뉴가 펼쳐진 상태에서 focus 가 풀리면 메뉴 감추기
    const focusOut = (e: MouseEvent) => {
      if ((e.target as Element).className.includes('menu_child_') === true) {
        console.log('SUBMENU');
      }
      else {
        setMenuDatas(menudatas.map((value) => {
          value.active = false;
          return value;
        }));
      }
    }

    document.addEventListener('mousedown', focusOut);
    return () => document.removeEventListener('mousedown', focusOut);
  }, [menudatas]);

  const onClickDropDown = (name: string, index: number) => {
    setMenuDatas(menudatas.map((value) => {
      value.active = (value.name === name) ? true : false;
      return value;
    }));
  }

  const onClickLinkTo = async (path: string) => {
    // unity unload 가 필요한 경우
    if (props.unityUnload) {
      await props.unityUnload();
    }

    // async await 을 Link event 에서 사용할 수가 없어서
    // Link a tag 대신 navigate 를 사용하여 전환
    history(path);
  }

  return (
    <header ref={ref}>
      <h1 id='logo' onClick={() => onClickLinkTo('/')}>ORSEL WORKSHOP</h1>
      <ul id='menu_list'>
        {menudatas.map((value, i) => {
          // 하위메뉴가 있음
          if (value.children) {
            return (
              <div key={`menu_div_${i}`} >
                <li className='menu_main' onClick={() => onClickDropDown(value.name, i)} key={`menu_${i}`} >
                  {value.name}
                  <div className='menu_child' >
                    <ul className={value.active ? 'menu_child_fade_in' : 'menu_child_fade_out'}>
                      {
                        (value.active === true) ?
                          value.children.map((child, j) => {
                            return (<li className={`menu_child_${j}`} onClick={() => onClickLinkTo(child.path)} key={`menu_child_${j}`}>{child.name}</li>);
                          })
                          :
                          null
                      }
                    </ul>
                  </div>
                </li>
              </div>
            );
          }

          // 일반
          return (
            <li className='menu_main' onClick={() => onClickLinkTo(value.path)} key={`menu_${i}`}>
              {value.name}
            </li>
          );
        })}
      </ul>
    </header>
  );
}