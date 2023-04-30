import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';
import { Home, ChromeIsOFFLINE2D, ChromeIsOFFLINE3D, Resume } from './contents';

interface MenuData {
  name: string;
  path: string;
  element?: JSX.Element;
  children?: MenuData;
}

export const MENUDATAS: MenuData[] = [
  {
    name: 'HOME',
    path: '/',
    element: <Home />
  },
  {
    name: 'CIO.2D',
    path: '/cio.2d',
    element: <ChromeIsOFFLINE2D />
  },
  {
    name: 'CIO.3D',
    path: '/cio.3d',
    element: <ChromeIsOFFLINE3D />
  },
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
  const history = useNavigate();

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
    <header>
      <h1 id='logo' onClick={() => onClickLinkTo('/')}>ORSEL WORKSHOP</h1>
      <ul id='menu_list'>
        {MENUDATAS.map((value, index) =>
          <li onClick={() => onClickLinkTo(value.path)} key={`menu_${index}`}>
            {value.name}
          </li>
        )}
      </ul>
    </header>
  );
}