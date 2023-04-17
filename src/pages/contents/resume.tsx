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
          <p>최근에는 Unity 를 공부하고 있으며, 쏟아지는 AI 기술들을 경험해보고 있습니다.</p>
        </div>
        {/* technical bases */}
        <div className='resume_container'>
          <h2 className='resume_subject'>Technical Bases</h2>
          <p>C/C++ (11, 14, 17)</p>
          <p>C# (.Net Framework)</p>
          <p>NodeJS, Node-gyp, ReactJS, Redux (JavaScript, TypeScript)</p>
          <p>VB6</p>
          <p>Jenkins, Advanced Installer, Inno Setup, NSIS</p>
          <p>Unity</p>
        </div>
        {/* work experiences */}
        <div className='resume_container'>
          <h2 className='resume_subject'>Work Experiences</h2>
          <p>WonderPeople (2021.10 ~ 2023.01)</p>
          <ul>
            <li>플랫폼 PC 클라이언트</li>
            <li>SDK</li>
            <li>운영툴</li>
            <li>배포</li>
          </ul>
          <p>Inzent (2018.05 ~ 2021.09)</p>
          <ul>
            <li>DLP Hooking (Win32 API, Message Hooking)</li>
            <li>Shell Namespace, Extension</li>
            <li>사용자 이벤트 감지</li>
            <li>PC 클라이언트</li>
            <li>운영툴</li>
            <li>배포</li>
          </ul>
          <p>ITMSystem (2012.11 ~ 2018.05)</p>
          <ul>
            <li>DLP Hooking (Win32 API, Message Hooking)</li>
            <li>PC 클라이언트 및 백오피스 </li>
            <li>운영툴</li>
            <li>배포</li>
          </ul>
        </div>
        {/* projects */}
        <div className='resume_container'>
          <h2 className='resume_subject'>Projects</h2>
          <ul>
            <li>GeeGee Game Platform</li>
            <li>XEDM 6</li>
            <li>SmartWork</li>
            <li>MyGuard</li>
          </ul>
        </div>
      </article>
    </>
  )
}