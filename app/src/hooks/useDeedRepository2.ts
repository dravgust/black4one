
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import Config from '../config';
import { useEthers, useContractCall, useContractFunction } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';

const contractInterface = new utils.Interface(Config.DEEDREPOSITORY_ABI)
const contract = new Contract(Config.DEEDREPOSITORY_ADDRESS, contractInterface);

export function useContractMethod(methodName: string) {
  const { state, send } = useContractFunction(contract, methodName, { transactionName: methodName });
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

const DeedRepository = () => {

  const { library: account } = useEthers()
  const { state: stateCreate, send: sendCreate } = useContractMethod('registerDeed');

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