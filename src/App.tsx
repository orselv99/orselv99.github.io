import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import './app.css';

import { Header } from './pages/header';
import { GNB } from './pages/gnb';
import { Game } from './pages/contents/game';
import { Home } from './pages/contents/home';
import { Windows } from './pages/contents/windows';
import { Resume } from './pages/contents/resume';

import SVGGamePad from './assets/gamepad.svg';
import SVGHome from './assets/home.svg';
import SVGWindows from './assets/windows.svg';
import SVGResume from './assets/resume.svg';

export const App = () => {
  // 

  const style: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', margin: '0 25px 0 25px', position: 'relative', bottom: 0 };
  return (
    <div className="app">
      <BrowserRouter>
        <BrowserView>
          <Header />
          <GNB />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Windows' element={<Windows />} />
            <Route path='/Game' element={<Game />} />
            <Route path='/Resume' element={<Resume />} />
            <Route path='/*' element={<Navigate to="/"></Navigate>} />
          </Routes>
        </BrowserView>
        <MobileView>
          {/* 모바일 뷰 테스트중  */}
          <div>
            <div style={{ height: '89vh', display: 'inline-flex', alignItems: 'center' }}>
              <div style={{}}>
                <div>title</div>
                <div>
                  <div>updates</div>
                  <div>updates</div>
                  <div>updates</div>
                  <div>updates</div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative', display: 'flex', height: '11vh', justifyContent: 'center', backgroundColor: '#3c3c3c', borderRadius: '10px', padding: '0 10px 0 10px', margin: '0 10px 10px 10px' }}>
              <div style={style}>
                <img src={SVGHome} width={32} height={32} />
              </div>
              <div style={style}>
                <img src={SVGWindows} width={32} height={32} />
              </div>
              <div style={style}>
                <img src={SVGGamePad} width={32} height={32} />
              </div>
              <div style={style}>
                <img src={SVGResume} width={32} height={32} />
              </div>
            </div>
          </div>
        </MobileView>
      </BrowserRouter>
    </div >
  );
}

