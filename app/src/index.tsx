import React from "react";
import ReactDOM from "react-dom";
import { ChainId, DAppProvider } from '@usedapp/core'
import App from './App';

const config = {
  readOnlyChainId: ChainId.Localhost,
  readOnlyUrls: {
    //[ChainId.Ropsten]: 'https://ropsten.infura.io/v3/17d71eefd03c45308bbcd99033962e59',
    [ChainId.Localhost]: "http://127.0.0.1:7545"
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);