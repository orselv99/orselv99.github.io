import React, { useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useMediaQuery } from 'react-responsive';
import { Menu } from '../../menu';
import './games.css';

export const ChromeIsOFFLINE2D = () => {
  const isBrowser = useMediaQuery({ query: '(min-width: 800px)' });
  const [resolution, setResolution] = useState({});
  const { unityProvider, unload } = useUnityContext({
    loaderUrl: 'dev/ChromeIsOFFLINE.2D/build.loader.js',
    dataUrl: 'dev/ChromeIsOFFLINE.2D/build.data',
    frameworkUrl: 'dev/ChromeIsOFFLINE.2D/build.framework.js',
    codeUrl: 'dev/ChromeIsOFFLINE.2D/build.wasm',
  });

  useEffect(() => {
    setResolution((isBrowser === true) ?
      { width: 600, height: 450 } :
      { width: 400, height: 300 });
  }, [isBrowser]);

  return (
    <>
      <Menu unityUnload={unload} />
      <div className='game_container'>
        <h1>Chrome is OFFLINE 2D</h1>
        <Unity
          unityProvider={unityProvider}
          style={resolution}
          devicePixelRatio={devicePixelRatio}
        />
      </div>
    </>
  );
}
