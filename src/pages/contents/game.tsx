import React, { useCallback, useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import './game.css';
import { Menu } from '../menu';

export const Game = () => {
  const { unityProvider, requestFullscreen } = useUnityContext({
    loaderUrl: 'GameBuild/build.loader.js',
    dataUrl: 'GameBuild/build.data.unityweb',
    frameworkUrl: 'GameBuild/build.framework.js.unityweb',
    codeUrl: 'GameBuild/build.wasm.unityweb',
  });

  const [fullScreen, setFullScreen] = useState(false);
  const onClickFullScreen = () => {
    setFullScreen(!fullScreen);
    requestFullscreen(fullScreen);
  }

  return (
    <>
      <Menu />
      <div id='game_container'>
        {/* <button onClick={onClickFullScreen}>full</button> */}
        <div>
          Unity WebGL Update getBoundingClientRect 오류로 인해 패치까지 iframe 으로 대체
          {/* <Unity
          unityProvider={unityProvider}
          style={{ width: 800, height: 600 }}
          devicePixelRatio={devicePixelRatio}
          /> */}
        </div>
        <iframe src='https://orselv99.netlify.app/' width={1000} height={650} style={{ border: 'none' }}></iframe>
      </div>
    </>
  )
}