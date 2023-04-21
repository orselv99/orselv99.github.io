import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/image/logo.png';
import { useMediaQuery } from 'react-responsive';
import './entrance.css';

export const Entrance = () => {
  const isBrowser = useMediaQuery({ query: '(min-width: 800px)' });
  const [logoSize, setLogoSize] = useState({});

  useEffect(() => {
    setLogoSize((isBrowser === true) ?
      { width: '380px', height: '240px' } :
      { width: '190px', height: '120px' });
  }, [isBrowser])

  return (
    <div id='container'>
      <div>
        <img id='logo_image' src={Logo} alt='main image' style={logoSize} />
        <div id='enter_string'>
          {/* 
            home 은 content1 고정  
            TODO: content 만들어서 의미있는 path 로 바꿀것 (menu.tsx 도 같이 수정)
          */}
          <Link to='/CIO.2D'>
            <h2 id='insert_coin'>Insert Coin To Play</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

Entrance.defaultProps = {}