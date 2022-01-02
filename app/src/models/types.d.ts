
export declare interface KeyValue<K, V> {
    key: K;
    value: V;
}

export interface Attributes {
    [key: string]: string;
}

export interface ERC721Properties {
    name: string
    description: string
    image: string
}

export interface ERC721Metadata {
    title: string
    properties: ERC721Properties
}

export interface ERC721ExtProperties extends ERC721Properties {
    attributes: KeyValue<string, string>[]
    link: string
}

export interface ERC721ExtMetadata extends ERC721Metadata {
    properties: ERC721ExtProperties
}

export declare interface KeyValue<K, V> {
    key: K;
    value: V;
}

export interface ModalProps {
    isOpen: boolean
    onClose(): void
}