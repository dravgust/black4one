
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import Config from '../../config';
import { useContractEvents } from '../useContractEvents'

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

 /* eslint-disable @typescript-eslint/no-explicit-any */
export function useBlackDeedEvents(eventName: string, ...accountArgs : any) {
    return useContractEvents(contract, eventName, ...accountArgs);
}