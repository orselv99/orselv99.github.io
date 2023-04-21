import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { Menu } from '../menu';

export const ChromeIsOFFLINE2D = () => {
  const { unityProvider, unload } = useUnityContext({
    loaderUrl: 'ChromeIsOFFLINE.2D/build.loader.js',
    dataUrl: 'ChromeIsOFFLINE.2D/build.data',
    frameworkUrl: 'ChromeIsOFFLINE.2D/build.framework.js',
    codeUrl: 'ChromeIsOFFLINE.2D/build.wasm',

  });

  return (
    <>
      <Menu unityUnload={unload} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '100px 20px 20px 20px' }}>
        <h1>Chrome is OFFLINE 2D</h1>
        <Unity
          unityProvider={unityProvider}
          style={{ width: 600, height: 450 }}
          devicePixelRatio={devicePixelRatio}
        />
      </div>
    </>
  )
}