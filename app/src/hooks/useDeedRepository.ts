
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import Config from '../config';
import { useContractEvents } from './useContractEvents'
import { useContractCall } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { useTokenList } from './useTokenList'

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

 /* eslint-disable @typescript-eslint/no-explicit-any */
export function useBlackDeedEvents(eventName: string, ...accountArgs : any) {
    return useContractEvents(contract, eventName, ...accountArgs);
}

export type Falsy = false | 0 | '' | null | undefined

export function useTokenOfOwnerByIndex(address: string | Falsy, index: number): BigNumber | undefined {
    const [tokenOfOwnerByIndex] =
      useContractCall(
          address && {
            abi: contractInterface,
            address: contractAddress,
            method: 'tokenOfOwnerByIndex',
            args: [address, index],
          }
      ) ?? []
    return tokenOfOwnerByIndex
  }

  export function useBlackDeedList(account: string | null | undefined) {
    return useTokenList(contract, account)
  }
