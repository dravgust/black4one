import React, { ReactNode, createContext, useContext, useReducer,/* useEffect, useMemo*/ } from 'react';
import { IERC721MetadataExt, ERC721MetadataExt } from '../../models/types';
import { create } from 'ipfs-http-client';
import { ensureIpfsUriPrefix, stripIpfsUriPrefix, toHttpPath } from "../../utils";

type Props = {
    children: ReactNode;
};

interface IContextProps {
    tokens: IERC721MetadataExt[];
    createToken: (token: IERC721MetadataExt) => void;
    createTokenData: (content: File, options: TokenOptions) => Promise<ICreateTokenDataResponse>;
}

interface ICreateTokenDataResponse {
    metadata: IERC721MetadataExt,
    assetURI: string
    metadataURI: string
    assetGatewayURL: string
    metadataGatewayURL: string
}

interface TokenOptions {
    path?: string,
    name: string,
    description: string,
    owner?: string | null | undefined
}

const nftClient = create({
    url: 'https://ipfs.infura.io:5001/api/v0'
})

const ERC721Context = createContext({} as IContextProps);

const ERC721Provider = ({ children }: Props) => {
    //const [tokens2, setTokenList] = useState<IERC721MetadataExt[]>([]);
    //const createToken2 = (token: IERC721MetadataExt) => setTokenList(allTokens => [...allTokens, token])

    const [tokens, addToken] = useReducer((tokens: IERC721MetadataExt[], token: IERC721MetadataExt) => [...tokens, token], [])
    function createToken(token: IERC721MetadataExt) {
        addToken(token)
    }
    /*const mintToken = async (ownerAddress: string, metadataURI: string) => {
    metadataURI = stripIpfsUriPrefix(metadataURI)
    const tx = await contract.registerDeed(metadataURI, { from: ownerAddress })
    const receit = await tx.wait()
    for(const event of receit.events) {
      if(event.event !== 'DeedRegistered') {
        console.log('ignoring unknown event type ', event.event)
        continue
      }
      return event.args.tokenId.toString()
    }

        throw new Error('unable to get token id')
    }

    const defaultOwnerAddress = () : string => {

        if(!account){
        throw new Error("account is not provided")
        }
        return account
    }*/

    const createTokenData = async (content: File, options: TokenOptions) => {
        const filePath = options.path || 'asset.bin'
        const basename = encodeURIComponent(filePath.replace(/^.*(\\|\/|\:)/, ''))

        const ipfsPath = '/nft/' + filePath
        const { cid: assetCid } = await nftClient.add({ path: ipfsPath, content })

        const assetURI = ensureIpfsUriPrefix(assetCid) + '/' + basename
        const metadata = new ERC721MetadataExt(options.name, options.description, assetURI)

        const { cid: metadataCid } = await nftClient.add({
            path: '/nft/metadata.json',
            content: JSON.stringify(metadata)
        })
        const metadataURI = ensureIpfsUriPrefix(metadataCid) + '/metadata.json'

        //let ownerAddress = options.owner
        //if(!ownerAddress){
        // ownerAddress = defaultOwnerAddress()
        //}

        //const tokenId = await mintToken(ownerAddress, metadataURI)

        return {
            //tokenId,
            metadata,
            assetURI: stripIpfsUriPrefix(assetURI),
            metadataURI: stripIpfsUriPrefix(metadataURI),
            assetGatewayURL: toHttpPath(assetURI),
            metadataGatewayURL: toHttpPath(metadataURI),
        }
    }

    return (
        <ERC721Context.Provider value={{ tokens, createToken, createTokenData }}>
            {children}
        </ERC721Context.Provider>
    )
}

export default ERC721Provider;
export const useERC721Context = () => useContext(ERC721Context);