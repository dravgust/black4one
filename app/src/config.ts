import { ChainId } from '@usedapp/core'
import DeedRepository from './contracts/BlackDeedRepository.json'
import AuctionRepository from './contracts/BlackAuctionRepository.json'

export default {
  DAPP_CONFIG: {
    readOnlyChainId: ChainId.Localhost,
    readOnlyUrls: {
      //[ChainId.Ropsten]: 'https://ropsten.infura.io/v3/17d71eefd03c45308bbcd99033962e59',
      [ChainId.Localhost]: "http://127.0.0.1:7545"
    },
  },

  DEEDREPOSITORY_ADDRESS: '0x0803Ab45A3F05690C6166eE4a4169DEc75065471',
  AUCTIONREPOSITORY_ADDRESS: '0x85A6CB79Ea1BAA4F50f2AA58AdE4F7E6Fb587e45',

  DEEDREPOSITORY_ABI: DeedRepository.abi,
  AUCTIONREPOSITORY_ABI: AuctionRepository.abi,
  GAS_AMOUNT: 500000,
}