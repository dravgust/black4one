import { ERC721MetadataExt } from '../models/types';
import { create } from 'ipfs-http-client';
import { ensureIpfsUriPrefix, stripIpfsUriPrefix, toHttpPath } from "../utils";

interface TokenOptions {
    path?: string,
    name: string,
    description: string,
    owner?: string | null | undefined
}

const nftClient = create({
    url: 'https://ipfs.infura.io:5001/api/v0'
})

export const createTokenData = async (content: File, options: TokenOptions) => {
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