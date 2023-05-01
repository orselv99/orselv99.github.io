import React, { useEffect, useState } from 'react';
import './home.css';
import { Menu } from '../menu';

const TEXTS = ['ALWAYS BE DEVELOPING', 'ALWAYS BE EXPERIENCING NEW', 'AND ALWAYS BE HAPPY',];
const ANIMATED_PROPS = {
  texts: TEXTS,
  index: 0,
  offset: 0,
  length: TEXTS.length,
  forward: true,
  skip: {
    count: 0,
    delay: 15,
  }
}

export const Home = () => {
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    let { texts, index, offset, length, forward, skip } = ANIMATED_PROPS;
    let { count, delay } = skip;

    setInterval(() => {
      if (forward === true) {
        if (offset >= texts[index].length) {
          count++;
          if (delay === count) {
            forward = false;
            count = 0;
          }
        }
      }
      else {
        // text 가 끝나면 다음 배열로 이동
        if (offset === 0) {
          forward = true;
          index++;
          offset = 0;

          // 다시 처음 배열로 이동
          if (index >= length) {
            index = 0;
          }
        }
      }

      setAnimatedText(texts[index].substring(0, offset));

      // 한 글자씩 이동
      if (count === 0) {
        if (forward) {
          offset++;
        }
        else {
          offset--;
        }
      }
    }, 100);
  }, []);

  return (
    <>
      <Menu />
      <section>
        <div id='intro_text'>
          <h5># Software Engineer & Game Junkie</h5>
          <h1>orseL</h1>
          <p>I'm a person who's totally into various hobbies like <b id='intro_emphasis'>Developing, Video Game, Outgoing Activity</b>.
            Also really into <b id='intro_emphasis'>Fantasy Contents</b>. So these days, looking for a <b id='intro_emphasis'>TRUCK</b> to take me to <b id='intro_emphasis'>ANOTHER WORLD</b> :)</p>
          <a href='mailto:orselv99@gmail.com' className='intro_button'>CONTACT</a>
        </div>
        <div id='intro_text_animation'>
          <h2>
            {animatedText}
          </h2>
        </div>
      </section>
    </>
  );
}