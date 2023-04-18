import React, { useCallback, useEffect, useState } from 'react';
import { Menu } from '../menu';
import './resume.css'

export const Resume = () => {
  return (
    <>
      <Menu />
      <article style={{ margin: '100px 20px 20px 20px' }}>
        <div className='resume_container'>
          <h1 id='resume_name'>Jeongho Ha</h1>
          <div id='resume_contact'>
            <div style={{ margin: '0 10px 0 0' }}>
              <a href='mailto:orselv99@gmail.com'>
                <img src='https://img.shields.io/badge/M-orselv99@gmail.com-bd515a?style=flat' alt='mail' />
              </a>
            </div>
            <div>
              <a href='https://github.com/orselv99' target='_blank'>
                <img src='https://img.shields.io/badge/G-https://github.com/orselv99-4885d4?style=flat' alt='github' />
              </a>
            </div>
          </div>
        </div>
        {/* introduce */}
        <div className='resume_container'>
          <h2 className='resume_subject'>Introduce</h2>
          <p>Windows 환경에서 사용자 PC 클라이언트 및 백오피스, 운영툴 등 다양한 개발을 해온 개발자입니다.</p>
          <p>최근에는 Unity, Flutter 를 공부하고 있으며, 쏟아지는 AI 기술들을 경험해보고 있습니다.</p>
        </div>
        {/* technical bases */}
        <div className='resume_container'>
          <h2 className='resume_subject'>Technical Bases</h2>
          <p>· C/C++ (11, 14, 17)</p>
          <p>· C# (.Net Framework)</p>
          <p>· NodeJS, Node-gyp, ReactJS, Redux (JavaScript, TypeScript)</p>
          <p>· VB6</p>
          <p>· Jenkins, Advanced Installer, Inno Setup, NSIS</p>
          <p>· Unity, MagicVoxel</p>
        </div>
        {/* work experiences */}
        <div className='resume_container'>
          <h2 className='resume_subject'>Work Experiences</h2>
          <div style={{ margin: '30px 0 40px 0' }}>
            <h3 className='resume_company'>WonderPeople (2021.10 ~ 2023.01)</h3>
            <p className='resume_project'>GeeGee 게임 플랫폼 PC 클라이언트</p>
            <p>· 게임 런쳐 & 게임사 배포용 SDK (C++: Qt, CEF)</p>
            <p>· 게임 설치, 업데이트 관리 (Zstandard, RTPatch)</p>
            <p>· steam 연계</p>
            <p>· 게임 런쳐 차세대 버전 & 개발용 운영툴 개발 (Electron: Node, React)</p>
            <p>· 빌드 및 패키징 (Jenkins, Advanced Installer)</p>
          </div>
          <div style={{ margin: '30px 0 40px 0' }}>
            <h3 className='resume_company'>Inzent (2018.05 ~ 2021.09)</h3>
            <p className='resume_project'>XEDM (문서중앙화화 및 DLP 솔루션)</p>
            <p>· 사용자 pc 클라이언트 (C# : WPF)</p>
            <p>· 보안 모듈 (C++ : Win32API, Message Hooking, C : File Filter Driver)</p>
            <p>· 탐색기 커스터마이징 모듈 (C++ : Shell Extension, Shell Namespace)</p>
            <p>· 빌드 및 패키징 (Jenkins, Innosetup, NSIS)</p>
            <p>· 사용자 정책 백오피스 (Javascript : Vanilla + Node)</p>
          </div>
          <div style={{ margin: '30px 0 40px 0' }}>
            <p className='resume_project'>스마트워크 (근태관리 및 사용자 이벤트 추적 솔루션)</p>
            <p>· 사용자 pc 클라이언트 (C# : WPF)</p>
            <p>· 사용자 이벤트 수집 (C++ : Win32 API)</p>
            <p>· 빌드 및 패키징 (Jenkins, InnoSetup)</p>
            <p>· 사용자 정책 백오피스, 데이터 수집서버 개발 (Javascript : Vanilla + Node)</p>
          </div>
          <div>
            <h3 className='resume_company'>ITMSystem (2012.11 ~ 2018.05)</h3>
            <p className='resume_project'>MyGuard (DLP 솔루션)</p>
            <p>· 사용자 pc 클라이언트 개발 (VB6)</p>
            <p>· 보안 모듈 개발 (C++ : Win32API, Message Hooking, C : File Filter Driver)</p>
            <p>· 사용자 정책 백오피스 개발 (VB6)</p>
          </div>
        </div>
      </article>
    </>
  )
}