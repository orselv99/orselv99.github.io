import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './gnb.css';

interface MenuItem {
  name: string;
  route: any;
}

const menus: MenuItem[] = [
  { name: 'Home', route: '/' },
  { name: 'Windows', route: '/Windows' },
  { name: 'Game', route: '/Game' },
  { name: 'Resume', route: 'Resume' },
];

export const GNB = () => {
  useEffect(() => {
  }, []);

  return (
    <>
      <nav>
        <ul id='menu'>
          {
            menus.map((item, index) => {
              return (
                <>
                  {(index != 0 && index < menus.length) && <li className='spacing' key={`spacing${index}`}>{'·'}</li>}
                  <Link to={item.route}>
                    <li className='name' key={`name${index}`}>{item.name}</li>
                  </Link>
                </>
              )
            })
          }
        </ul>
      </nav>
    </>
  )
}