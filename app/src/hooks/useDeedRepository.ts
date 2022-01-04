
import { useEffect, useState } from 'react';
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import Config from '../config';
import { useEthers, useContractCall, useTokenBalance } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import { range } from "../utils";
import { useContractEvents } from './useContract'
import { useContractMethod } from '.';

const contractInterface = new utils.Interface(Config.DEEDREPOSITORY_ABI)
const contract = new Contract(Config.DEEDREPOSITORY_ADDRESS, contractInterface);

 /* eslint-disable @typescript-eslint/no-explicit-any */
 export function useBlackDeedEvents(eventName: string, ...accountArgs : any) {
  return useContractEvents(contract, eventName, ...accountArgs);
}

export function useDeedContractMethod(methodName: string) {
  const { state, send } = useContractMethod(contract, methodName);
  return { state, send };
}

export const useTokenURI = (tokenId: number | BigNumber | Falsy) => {
  const [tokenURI] = useContractCall(
    tokenId && {
      abi: contractInterface,
      address: Config.DEEDREPOSITORY_ADDRESS,
      method: 'tokenURI',
      args: [tokenId]
    }) ?? []
  return tokenURI
}

export const useTokenOfOwnerByIndex = (index: number | BigNumber) => {
  const { account } = useEthers()
  const [tokenURI] = useContractCall(
    index &&
    account && {
      abi: contractInterface,
      address: Config.DEEDREPOSITORY_ADDRESS,
      method: 'tokenOfOwnerByIndex',
      args: [account, index]
    }) ?? []
  return tokenURI
}

type TokenProps = {
  tokenId: number,
  metadataURI: string
}

export const useTokensOfOwner = () => {
  const { account } = useEthers()
  const [tokens, setTokens] = useState<TokenProps[]>([])
  const { library: provider } = useEthers();
  const balanceResult = useTokenBalance(Config.DEEDREPOSITORY_ADDRESS, account)

  useEffect(() => {
      const getTokensOfOwner = async (balance: BigNumber | undefined) => {
          if (provider && account && balance) {
              try {
                  const connectedContract = contract.connect(provider)
                  const tokenList = await Promise.all(range(balance.toNumber()).map(async (i) => {
                      const tokenId = await connectedContract.tokenOfOwnerByIndex(account, i)
                      const metadataURI = await  connectedContract.tokenURI(tokenId)     
                      return { 
                          tokenId: tokenId.toNumber(),
                          metadataURI
                       }
                  }))
                  //console.log("[useTokenList] tokenList", tokenList)
                  setTokens(tokenList)
              }
              catch (error) {
                  console.error(error);
                  setTokens([])
              }

          }
      }

      getTokensOfOwner(balanceResult)

  }, [provider, account, balanceResult])

  return tokens

}

const DeedRepository = () => {

  const { library: account } = useEthers()
  const { state: stateCreate, send: sendCreate } = useContractMethod(contract, 'registerDeed');

  const RegisterDeed = async (deedURI: string) => {
    console.log("[useDeedRepository] call create function")
    const result = await sendCreate(deedURI, { from: account });
    console.log("result=", result);
    console.log("result state=", stateCreate);
    return stateCreate;
  }

  return { RegisterDeed }
}

export default DeedRepository;