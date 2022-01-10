import React, { ReactNode, createContext, useContext, useReducer, /* useEffect, useMemo*/ } from 'react';
//import { useTokensOfOwner } from '../../hooks/useDeedRepository';
import { IERC721MetadataExt, } from '../../models/types';

type Props = {
    children: ReactNode;
};

interface IContextProps {
    tokens: IERC721MetadataExt[];
    createToken: (token: IERC721MetadataExt) => void;
}
//localStorage, sessionStorage
//const loadJSON = ((repo: Storage) =>
//(key: string) => key && JSON.parse(repo.getItem(key) || ""))(localStorage);
//const saveJSON = ((repo: Storage) => 
//(key: string, data:any) => repo.setItem(key, JSON.stringify(data)))(localStorage);

const ERC721Context = createContext({} as IContextProps);
 /* eslint-disable @typescript-eslint/no-explicit-any */
const ERC721Provider = ({ children }: Props) => {
    //const [tokens2, setTokenList] = useState<IERC721MetadataExt[]>([]);
    //const createToken2 = (token: IERC721MetadataExt) => setTokenList(allTokens => [...allTokens, token])

    const [tokens, addToken] = useReducer((tokens: IERC721MetadataExt[], token: IERC721MetadataExt) => [...tokens, token], [])
    function createToken(token: IERC721MetadataExt) {
        addToken(token)
    }

    return (
        <ERC721Context.Provider value={{ tokens, createToken }}>
            {children}
        </ERC721Context.Provider>
    )
}

export default ERC721Provider;
export const useERC721Context = () => useContext(ERC721Context);