import React, { useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useMediaQuery } from 'react-responsive';
import { Menu } from '../../menu';
import './games.css';

export const ProjectCD = () => {
  const isBrowser = useMediaQuery({ query: '(min-width: 800px)' });
  const [resolution, setResolution] = useState({});
  const { unityProvider, unload } = useUnityContext({
    loaderUrl: 'dev/projectCD/build.loader.js',
    dataUrl: 'dev/projectCD/build.data',
    frameworkUrl: 'dev/projectCD/build.framework.js',
    codeUrl: 'dev/projectCD/build.wasm',
  });

  useEffect(() => {
    setResolution((isBrowser === true) ?
      { width: 400, height: 700 } :
      { width: 400, height: 700 });
  }, [isBrowser]);

  return (
    <>
      <Menu unityUnload={unload} />
      <div className='game_container'>
        <h1>PROJECT CD</h1>
        <Unity
          unityProvider={unityProvider}
          style={resolution}
          devicePixelRatio={devicePixelRatio}
        />
      </div>
    </>
  );
}
