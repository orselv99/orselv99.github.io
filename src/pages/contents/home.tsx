import React, { useEffect, useState } from 'react';
import './home.css';
import { Menu } from '../menu';

export const Home = () => {
  return (
    <>
      <Menu />
      <section>
        <div id='intro_text'>
          <h5># Software Engineer & Game Junkie</h5>
          <h1>orseL</h1>
          <p>I'm a person who's totally into various hobbies like <b id='intro_emphasis'>Developing, Video Games, Outgoing Activity</b>.
            Also really into <b id='intro_emphasis'>Fantasy Contents</b>. So these days, looking for a <b id='intro_emphasis'>TRUCK</b> to take me to <b id='intro_emphasis'>ANOTHER WORLD</b> :)</p>
          <a href='mailto:orselv99@gmail.com' className='intro_button'>CONTACT</a>
        </div>
        <div id='intro_text_art' style={{ width: '100px' }}>
          <p>------------------------------------</p>
          <p>------------------------------------</p>
          <p>------------------------------------</p>
          <p>------------------------------------</p>
          <p>----------IN--CONSTRUCTION----------</p>
          <p>------------------------------------</p>
          <p>------------------------------------</p>
          <p>------------------------------------</p>
          <p>------------------------------------</p>
        </div>
      </section>
    </>
  );
}