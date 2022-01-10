
import { Contract } from '@ethersproject/contracts'
import { ethers, } from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'
import {/*useState, */useRef, useEffect } from "react";
import artifact from "../contracts/BlackDeedRepository.json";
import { range } from "../utils";
//import Config from '../config';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useDeedRepository = () => {
  //const [count, setCount] = useState();
  const contract = useRef<Contract>();

  const getBalanceOf = async (account: string): Promise<BigNumber> => await contract.current?.balanceOf(account);
  const getTokenURI = async (tokenId: number | BigNumber) => await contract.current?.tokenURI(tokenId);
  const getTokenOfOwnerByIndex = async (account: string, index: number | BigNumber) => await contract.current?.tokenOfOwnerByIndex(account, index);

  const getTokensOfOwner = async (account: string) => {
    try {
      const balance = await getBalanceOf(account);
      const tokenList = await Promise.all(range(balance.toNumber())
        .map(async (i) => {   
          const tokenId = await getTokenOfOwnerByIndex(account, i)
          const metadataURI = await getTokenURI(tokenId)
          return {
            tokenId,
            metadataURI
          }
        }))

      return tokenList;
    }
    catch (error) {
      console.error(error);
      return []
    }
  }

  useEffect(() => {
    const setup = async () => {
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
      const contractAddress = artifact.networks["1337"].address;

      contract.current = new ethers.Contract(
        contractAddress,
        artifact.abi,
        provider.getSigner(),
      );

      //await updateTokenURI();
    };
    setup();
  }, [])

  return {
    getBalanceOf,
    getTokenURI,
    getTokenOfOwnerByIndex,
    getTokensOfOwner
  }
}

    /*const mintToken = async (ownerAddress: string, metadataURI: string) => {
    metadataURI = stripIpfsUriPrefix(metadataURI)
    const tx = await contract.registerDeed(metadataURI, { from: ownerAddress })
    const receit = await tx.wait()
    for(const event of receit.events) {
      if(event.event !== 'DeedRegistered') {
        console.log('ignoring unknown event type ', event.event)
        continue
      }
      return event.args.tokenId.toString()
    }

        throw new Error('unable to get token id')
    }

    const defaultOwnerAddress = () : string => {

        if(!account){
        throw new Error("account is not provided")
        }
        return account
    }*/

    