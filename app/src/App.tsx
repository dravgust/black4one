import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NotFound from './pages/NotFound';
import Balance from './pages/Balance';
import Prices from './pages/Prices';
import theme from "./theme";
import { Block } from './pages/Block';
import { Tokens } from './pages/Tokens';
import { SendEtherPage } from './pages/SendEtherPage';
import { Transactions } from './pages/Transactions';
import BlackFaucet from './pages/BlackFaucet';
import Auction from './pages/Auction';
import FileStorage from './pages/FileStorage';
import { DAppProvider } from '@usedapp/core'
import Config from './config'
import ERC721Provider from './components/BlackAuction/ERC721Provider';

const App = () => (
    <ChakraProvider theme={theme}>
        <DAppProvider config={Config.DAPP_CONFIG}>
            <ERC721Provider>
                <BrowserRouter>
                    <Routes>
                        <Route path='*' element={<NotFound />} />
                        <Route path='/' element={<Balance />} />
                        <Route path='/prices' element={<Prices />} />
                        <Route path='/block' element={<Block />} />
                        <Route path='/tokens' element={<Tokens />} />
                        <Route path='/faucet' element={<BlackFaucet />} />
                        <Route path='/send' element={<SendEtherPage />} />
                        <Route path='/transactions' element={<Transactions />} />
                        <Route path='/auction' element={<Auction />} />
                        <Route path='/storage' element={<FileStorage />} />
                    </Routes>
                </BrowserRouter>
            </ERC721Provider>
        </DAppProvider>
    </ChakraProvider>
);

export default App;