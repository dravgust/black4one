import { BigNumber } from '@ethersproject/bignumber'

export class Auction {
    public id: BigNumber
    public name: string
    public blockDeadline: BigNumber
    public startPrice: BigNumber
    public deedId: BigNumber
    public metadata: string
    public deedRepositoryAddress: string
    public owner: string
    public active: boolean
    public finalized: boolean

    constructor(auction: Auction){
        this.id = auction.id
        this.name = auction.name
        this.blockDeadline = auction.blockDeadline
        this.startPrice = auction.startPrice
        this.deedId = auction.deedId
        this.metadata = auction.metadata
        this.deedRepositoryAddress = auction.deedRepositoryAddress
        this.owner = auction.owner
        this.active = auction.active
        this.finalized = auction.finalized

    }
}

export class TokenAuction extends Auction {
    public auctionId: number | null = null
    public tokenId: number | null = null
    public metadataURI: string = ''
}