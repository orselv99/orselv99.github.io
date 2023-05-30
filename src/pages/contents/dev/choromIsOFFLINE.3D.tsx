import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useMediaQuery } from 'react-responsive';
import { Menu } from '../../menu';
import './games.css';

export const ChromeIsOFFLINE3D = () => {
  const isBrowser = useMediaQuery({ query: '(min-width: 800px)' });
  const [resolution, setResolution] = useState({});
  const { unityProvider, unload } = useUnityContext({
    loaderUrl: 'dev/ChromeIsOFFLINE.3D/build.loader.js',
    dataUrl: 'dev/ChromeIsOFFLINE.3D/build.data',
    frameworkUrl: 'dev/ChromeIsOFFLINE.3D/build.framework.js',
    codeUrl: 'dev/ChromeIsOFFLINE.3D/build.wasm',
  });

  useEffect(() => {
    setResolution((isBrowser === true) ?
      { width: 450, height: 600 } :
      { width: 400, height: 500 });
  }, [isBrowser]);

  return (
    <>
      <Menu unityUnload={unload} />
      <div className='game_container'>
        <h1>Chrome is OFFLINE 3D</h1>
        <Unity
          unityProvider={unityProvider}
          style={resolution}
          devicePixelRatio={devicePixelRatio}
        />
      </div>
    </>
  )
}