import Config from '../config'
import { useBlockNumber, useEthers, useContractFunction } from '@usedapp/core'
//import { Contract} from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractEvents } from '../hooks';
import { utils } from 'ethers'

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;
//const gas = Config.GAS_AMOUNT;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

const useDeedRepository = () => {
    const { account } = useEthers();
    const blockNumber = useBlockNumber();
    console.log(`[useDeedRepository] account: ${account} blockNumber: ${blockNumber}`);
    
    const auctionCreated = useContractEvents(contract, "DeedRegistered");
    const bidSuccess = useContractEvents(contract, "Transfer");

    console.log("[useDeedRepository] events:", [...auctionCreated, ...bidSuccess]);

    //const [stateExists] = useContractCall({ abi: contractInterface, address: contractAddress, method: 'exists', args: [1]}) ?? [];
    const { state: stateCreate, send: sendCreate } = useContractFunction(contract, 'registerDeed', { });
    //const { state: stateTransferTo, send: sendTransferTo } = useContractFunction(contract, 'transferFrom', { });

    const create = async (deedURI: string) => {
        console.log("[useDeedRepository] call create function")
        const result = await sendCreate(deedURI, { from: account });
        console.log("result=", result);
        console.log("result state=", stateCreate);
        return stateCreate;
    }

    return { create }
}

export default useDeedRepository;