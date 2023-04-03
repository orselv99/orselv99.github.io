import React, { useCallback, useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import './game.css';

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
      <button onClick={onClickFullScreen}>full</button>
      <div>
        <Unity
          unityProvider={unityProvider}
          style={{ width: 800, height: 600 }}
          devicePixelRatio={devicePixelRatio}
        />
      </div>
    </>
  )
}