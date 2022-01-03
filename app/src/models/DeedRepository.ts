import { ERC721ExtProperties, ERC721ExtMetadata, KeyValue } from './types'
import { BigNumber } from 'ethers'
import Config from '../config';
import { Repository } from './Repository'

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

export class DeedRepository extends Repository{
    constructor(){
        super(Config.DEEDREPOSITORY_ADDRESS, Config.DEEDREPOSITORY_ABI)
    }

    getCurrentBlock(): Promise<number> {
        return this.getProvider().getBlockNumber()
    }

    async getTokenOfOwnerByIndex(account: string, index: number | BigNumber): Promise<number> {
        return (await this.getContract()['tokenOfOwnerByIndex'](account, index)).toNumber();       
    }

    async getTokenURI(tokenId: number | BigNumber): Promise<string> {
        return await this.getContract()['tokenURI(uint256)'](tokenId)
    }

}