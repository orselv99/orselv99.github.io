import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';
import { Home, Resume } from './contents';

interface MenuData {
  name: string;
  path: string;
  hasUnityContext: boolean;
  element?: JSX.Element;
  children?: MenuData;
}

export const MENUDATAS: MenuData[] = [
  {
    name: 'HOME',
    path: '/',
    hasUnityContext: true,
    element: <Home />
  },
  {
    name: 'CIO.2D',
    path: '/CIO.2D',
    hasUnityContext: true,
    element: {} as JSX.Element
  },
  {
    name: 'CIO.3D',
    path: '/CIO.3D',
    hasUnityContext: true,
    element: {} as JSX.Element
  },
  {
    name: 'RESUME',
    path: '/resume',
    hasUnityContext: false,
    element: <Resume />
  },
];


interface MenuProps {
  unityUnload?: () => Promise<void>
}

export const Menu = (props: MenuProps) => {
  const history = useNavigate();

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