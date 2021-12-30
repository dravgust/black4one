import { useContractFunction } from '@usedapp/core'
import { utils } from 'ethers'
import Config from '../config';
import { Contract } from '@ethersproject/contracts'

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

export function useContractMethod(methodName: string) {
    const { state, send } = useContractFunction(contract, methodName, { transactionName: methodName });
    return { state, send };
}
