
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import Config from '../../config';
import { useContractEvents } from '../useContractEvents'

const contractAddress = Config.AUCTIONREPOSITORY_ADDRESS;
const contractAbi = Config.AUCTIONREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

export function useBlackAuctionEvents(eventName: string, account: string | null | undefined = null) {
    return useContractEvents(contract, eventName, account);
}