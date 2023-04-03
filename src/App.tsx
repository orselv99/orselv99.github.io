import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Unity, useUnityContext } from 'react-unity-webgl';


function App() {
  const { unityProvider } = useUnityContext({
    loaderUrl: 'GameBuild/build.loader.js',
    dataUrl: 'GameBuild/build.data.br',
    frameworkUrl: 'GameBuild/build.framework.js.br',
    codeUrl: 'GameBuild/build.wasm.br'
  });


  return (
    <div className="App">
      <header className="App-header">
        <Unity unityProvider={unityProvider} />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
