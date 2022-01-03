import { ERC721ExtProperties, ERC721ExtMetadata, KeyValue } from './types'
import { utils, Contract, BigNumber } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import Config from '../config';

export class DeedProperties implements ERC721ExtProperties {
    public name: string
    public description: string  
    public image: string
    public attributes: KeyValue<string, string>[]
    public link: string;
    /**
     * Asset Properties
     * @param name Identifies the asset to which this NFT represents
     * @param description Describes the asset to which this NFT represents
     * @param image A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents.
     * Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive.
     */
    constructor(name: string, description: string, image: string, attributes = [], link = ""){
        this.name = name;
        this.description = description;
        this.image = image;
        this.link = link;
        this.attributes = attributes;
    }

    static Default = () => new DeedProperties("...", "...", "")
} 


export class DeedMetadata implements ERC721ExtMetadata {
    public title = "Asset Metadata";
    public properties: DeedProperties;
    
    constructor(name: string, description: string, image: string, attributes = [], link = ""){
        this.properties = new DeedProperties(name, description, image, attributes, link); 
    }
}

export class DeedRepository {
    private _contract : Contract;
    private _web3Contract : Contract | null = null;

    constructor(){
        const contractInterface = new utils.Interface(Config.DEEDREPOSITORY_ABI)
        this._contract = new Contract(Config.DEEDREPOSITORY_ADDRESS, contractInterface);
    }

    setProvider(provider: Web3Provider){
        this._web3Contract = this._contract.connect(provider);
    }

    getContract(): Contract {
        if(this._web3Contract == null)
            throw new Error("Web3Provider not set");

        return this._web3Contract;
    }

    getContractAddress(): string {
        return this._contract.address;
    }

    async getTokenOfOwnerByIndex(account: string, index: number | BigNumber): Promise<number> {
        return (await this.getContract()['tokenOfOwnerByIndex'](account, index)).toNumber();       
    }

    async getTokenURI(tokenId: number | BigNumber): Promise<string> {
        return await this.getContract()['tokenURI(uint256)'](tokenId)
    }

}