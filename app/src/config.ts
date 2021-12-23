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

  DEEDREPOSITORY_ADDRESS: '0xF00b19a21982F8cb2E535c2857726de0680FFf78',
  AUCTIONREPOSITORY_ADDRESS: '0x1ae9633380de121E99c81C462530A6EB654f4Cc0',

  DEEDREPOSITORY_ABI: DeedRepository.abi,
  AUCTIONREPOSITORY_ABI: AuctionRepository.abi,
  GAS_AMOUNT: 500000,
}