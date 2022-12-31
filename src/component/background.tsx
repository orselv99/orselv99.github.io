import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// 달
const MoonAnimation = keyframes`
  0%{
    box-shadow: 0 0 160px 0px #ffffff, 0 0 30px -4px #ffffff, 0 0 8px 2px rgba(255, 255, 255, 0.26);
  }
  50% {
    box-shadow: 0 0 80px 0px #ffffff, 0 0 30px -4px #ffffff, 0 0 8px 2px rgba(255, 255, 255, 0.26);
  }
  100% {
    box-shadow: 0 0 160px 0px #ffffff, 0 0 30px -4px #ffffff, 0 0 8px 2px rgba(255, 255, 255, 0.26);
  }
`
const Moon = styled.img.attrs({ src: 'https://raw.githubusercontent.com/interaminense/starry-sky/master/src/img/bgMoon.png' })`
  position: absolute;
  top: 150px;
  right: 200px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #ffffff;
  animation-name: ${MoonAnimation};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 10s;
`
// 별
type StarProps = {
  width: number;
  height: number;
  top: number;
  left: number;
  opacity: number;
  duration: number;
  delay: number;
  withColorAnimation: boolean;
}
const StarAnimation = keyframes`
  0% {
    box-shadow: 0 0 10px 0px rgba(255, 255, 255, 0.05);
  }
  50% {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 10px 0px rgba(255, 255, 255, 0.05);
  }
`
const StarColorAnimation = keyframes`
  0% {
    background-color: #ffffff;
    box-shadow: 0 0 10px 0px rgba(255, 255, 255, 1);
  }
  20% {
    background-color: #ffc4c4;
    box-shadow: 0 0 10px 0px rgb(255, 100, 100, 1);
  }
  80% {
    background-color: #c4cfff;
    box-shadow: 0 0 10px 0px rgb(196, 207, 255, 1);
  }
  100% {
    background-color: #ffffff;
    box-shadow: 0 0 10px 0px rgba(255, 255, 255, 0.2);
  }
`
const Star = styled.span<{ value: StarProps }>`
  width: ${(props) => props.value.width}px; 
  height: ${(props) => props.value.height}px; 
  left: ${(props) => props.value.top}px; 
  top: ${(props) => props.value.left}px; 
  opacity: .${(props) => props.value.opacity}; 
  background-color: white;
  border-radius: 50%;
  position: absolute;
  animation-name: ${(props) => props.value.withColorAnimation === true ? StarColorAnimation : StarAnimation};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: ${(props) => props.value.duration}s; 
  animation-delay: .${(props) => props.value.delay}s; 
`;

export const Background = () => {
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    // 별 랜덤 생성
    const temp = [];
    const makeRandom = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < 200; i++) {
      const size = makeRandom(1, 3);
      const top = makeRandom(50, window.innerWidth - 50);
      const left = makeRandom(50, window.innerHeight - 50);
      const opacity = makeRandom(0, 9);
      const delay = makeRandom(0, 9);
      const withColorAnimation = makeRandom(0, 9) === 1 ? true : false;

      temp.push({
        width: size,
        height: size,
        top: top,
        left: left,
        opacity: opacity,
        duration: 0.5,
        delay: delay,
        withColorAnimation: withColorAnimation
      });
    }

    setStars(temp);
  }, []);

  return (
    <>
      <Moon />
      <div>
        {
          stars.length > 0 &&
          stars.map((value) => {
            return (
              <Star value={{
                width: value.width,
                height: value.height,
                top: value.top,
                left: value.left,
                opacity: value.opacity,
                duration: value.duration,
                delay: value.delay,
                withColorAnimation: value.withColorAnimation
              }}
              />
            );
          })
        }
      </div>
    </>
  );
}