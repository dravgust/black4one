import React, { ReactNode, createContext, useState, useContext } from 'react';
import { ERC721MetadataExt } from '../../models/types';

type Props = {
    children: ReactNode;
};


interface IContextProps {
    deeds: ERC721MetadataExt[];
    createDeed: (deed:ERC721MetadataExt) => void;
}

const DeedContext = createContext({} as IContextProps);
export const useDeeds = () => useContext(DeedContext);

const DeedProvider = ({ children }: Props) => {
    const [deeds, setDeeds] = useState<ERC721MetadataExt[]>([]);

    function createDeed(deed: ERC721MetadataExt){
        setDeeds([
            ...deeds,
            deed
        ])
    }

    return (
        <DeedContext.Provider value={{deeds, createDeed}}>
            {children}
        </DeedContext.Provider>
    )
}

export default DeedProvider;