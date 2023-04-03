import React, { useEffect, useState } from 'react';
import './header.css';
import { DarkModeSwitch } from '../components/darkmode';

export const Header = () => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const getDate = () => {
      var now = new Date();

      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const d = ['일', '월', '화', '수', '목', '금', '토',].at(now.getDay());

      return `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${d}요일 ${h}:${m}:${s}`;
    }

    // 째깍째깍
    setInterval(() => { setDate(getDate()); }, 1000);

    setDate(getDate());
  }, []);

  return (
    <>
      <header>
        <div id='title'>orseL</div>
        <div id='right'>
          <div>{date}</div>
          <DarkModeSwitch />
        </div>
      </header>
    </>
  );
}