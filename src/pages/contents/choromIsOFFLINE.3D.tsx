import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { Menu } from '../menu';

export const ChromeIsOFFLINE3D = () => {
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
          style={{ width: 450, height: 600 }}
          devicePixelRatio={devicePixelRatio}
        />
      </div>
    </>
  )
}