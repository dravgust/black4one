import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NotFound from './pages/NotFound';
import DefaultLayout from './components/layouts/DefaultLayout';
import Home from './pages/Home';
import theme from "./theme";


const App = () => (
    <ChakraProvider theme={theme}>
        <DefaultLayout>
            <BrowserRouter>
                
                <Routes>
                    <Route path='*' element={<NotFound />} />
                    <Route path='/' element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </DefaultLayout>
    </ChakraProvider>
  );

  export default App;