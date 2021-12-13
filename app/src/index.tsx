import React from "react";
import ReactDOM from "react-dom";
import { DAppProvider } from '@usedapp/core'
import Config from './config'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={Config.DAPP_CONFIG}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);