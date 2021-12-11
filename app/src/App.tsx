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


const App = () => (
    <ChakraProvider theme={theme}>
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
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
);

export default App;