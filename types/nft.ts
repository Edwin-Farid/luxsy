
export type Trait = "type" | "paint" 
export type NftAttribute = {
    traitType: Trait;
    value: string;
}

export type NftMeta ={
    name: string;
    artistName: string;
    description: string;
    image: string;
    width: number;
    height: number;
    createdAt: number;
    attributes: NftAttribute[];
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