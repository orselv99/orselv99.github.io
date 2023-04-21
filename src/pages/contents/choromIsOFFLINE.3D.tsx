import React, { useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { Menu } from '../menu';
import { useMediaQuery } from 'react-responsive';

export const ChromeIsOFFLINE3D = () => {
  const isBrowser = useMediaQuery({ query: '(min-width: 800px)' });
  const [resolution, setResolution] = useState({});

  useEffect(() => {
    setResolution((isBrowser === true) ?
      { width: 450, height: 600 } :
      { width: 400, height: 500 });
  }, [isBrowser])

  const { unityProvider, unload } = useUnityContext({
    loaderUrl: 'ChromeIsOFFLINE.3D/build.loader.js',
    dataUrl: 'ChromeIsOFFLINE.3D/build.data',
    frameworkUrl: 'ChromeIsOFFLINE.3D/build.framework.js',
    codeUrl: 'ChromeIsOFFLINE.3D/build.wasm',

  });

  return (
    <>
      <Menu unityUnload={unload} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '100px 20px 20px 20px' }}>
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