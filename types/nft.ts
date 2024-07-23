
export type Trait = "type" | "paint" 
export type NftAttribute = {
    trait_type: Trait;
    value: string;
}

export type NftMeta ={
    attributes: any;
    name: string;
    artist_name: string;
    description: string;
    image: string;
    width: string;
    height: string;
    created_at: string;
    attribute: NftAttribute[];
}

export type NftCore = {
    tokenId : number;
    price: number;
    creator: string;
    isListed: boolean
}

export type Nft = {
    meta : NftMeta
} & NftCore

export type FileReq = {
    bytes : Uint8Array;
    contentType: string;
    fileName: string;
}

export type PinataRes = {
    IpfsHash : string;
    PinSize : number;
    Timestamp : string;
    isDuplicate : boolean;
}