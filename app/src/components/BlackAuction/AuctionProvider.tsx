import React, { ReactNode, createContext } from 'react';

type Props = {
    children: ReactNode;
};

const defaultState = {

};

const AuctionContext = createContext(defaultState);

const AuctionProvider = ({ children }: Props) => {

    return (
        <AuctionContext.Provider value={{}}>
            {children}
        </AuctionContext.Provider>
    )
}

export default AuctionProvider;