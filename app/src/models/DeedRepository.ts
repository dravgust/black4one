
export {}

export class TokenProperties {
    public name: string;
    public description: string  ; 
    public image: string;
    public meta: string ;
    /**
     * Asset Properties
     * @param name Identifies the asset to which this NFT represents
     * @param description Describes the asset to which this NFT represents
     * @param image A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents.
     * Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive.
     */
    constructor(name: string, description: string, image: string, meta = ""){
        this.name = name;
        this.description = description;
        this.image = image;
        this.meta = meta;
    }

    static Default = () => new TokenProperties("", "", "")
} 


export class TokenMetadata {
    public title = "Asset Metadata";
    public properties: TokenProperties;
    
    constructor(name: string, description: string, image: string, meta = ""){
        this.properties = new TokenProperties(name, description, image, meta); 
    }
}