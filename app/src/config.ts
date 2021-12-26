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

  DEEDREPOSITORY_ADDRESS: DeedRepository.networks[1337].address,
  AUCTIONREPOSITORY_ADDRESS: AuctionRepository.networks[1337].address,

  DEEDREPOSITORY_ABI: DeedRepository.abi,
  AUCTIONREPOSITORY_ABI: AuctionRepository.abi,
  GAS_AMOUNT: 500000,
}