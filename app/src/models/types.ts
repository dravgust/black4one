
export interface IAttributes {
    [key: string]: string;
}

export interface IERC721Metadata {
    name: string
    description: string
    image: string
}

export interface IERC721MetadataExt extends IERC721Metadata {
    attributes: KeyValue<string, string>[]
    link: string
}

export class ERC721MetadataExt implements IERC721MetadataExt {
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

    static Default = () => new ERC721MetadataExt(
        "...",
        "...",
        ""
    )} 

export interface ModalProps {
    isOpen: boolean
    onClose(): void
}

export declare interface KeyValue<K, V> {
    key: K;
    value: V;
}
