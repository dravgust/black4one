import { useEffect } from 'react';
import Config from '../config'
import { useBlockNumber, useEthers, useContractFunction, useContractCall } from '@usedapp/core'
//import { Contract} from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractEvents } from '../hooks';
import { utils } from 'ethers'

/*function useTokensBalance(tokenList?: TokenInfo[], account?: string | null) {
    return useContractCalls(
      tokenList && account
        ? tokenList.map((token: TokenInfo) => ({
            abi: ERC20Interface,
            address: token.address,
            method: 'balanceOf',
            args: [account],
          }))
        : []
    )
  }*/

const contractAddress = Config.AUCTIONREPOSITORY_ADDRESS;
const contractAbi = Config.AUCTIONREPOSITORY_ABI;
//const gas = Config.GAS_AMOUNT;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

const AuctionRepository = () => {

    const { account } = useEthers();
    const blockNumber = useBlockNumber();
    console.log(`[AuctionRepository] account: ${account} blockNumber: ${blockNumber}`);
    
    const auctionCreated = useContractEvents(contract, "AuctionCreated");
    const bidSuccess = useContractEvents(contract, "BidSuccess");
    const auctionCanceled = useContractEvents(contract, "AuctionCanceled");
    const auctionFinalized = useContractEvents(contract, "AuctionFinalized");

    console.log("[AuctionRepository] events:", [...auctionCreated, ...bidSuccess, ...auctionCanceled, ...auctionFinalized]);

    const { state: stateGetCurrentBid, send: sendGetCurrentBid } = useContractFunction(contract, 'getCurrentBid', { });
    const { state: stateCreateAuction, send: sendCreateAuction } = useContractFunction(contract, 'createAuction', { });
    const [stateGetCount] = useContractCall({ abi: contractInterface, address: contractAddress, method: 'getCount', args: []}) ?? [];

    const getCurrentBid = (auctionId: number) => {
        sendGetCurrentBid(auctionId, {from: account})
        return stateGetCurrentBid;
    }

    const create = async (deedId : number, auctionTitle: string, metadata: string, startingPrice: number, blockDeadline: number) => {
        console.log("[AuctionRepository] call create function")
        const result = await sendCreateAuction(Config.DEEDREPOSITORY_ADDRESS, deedId, auctionTitle, metadata, startingPrice, blockDeadline, {from: account });
        console.log("result=", result);
        console.log("result state=", stateCreateAuction);
        return stateCreateAuction;
    }

    useEffect(() => {
        console.log("[AuctionRepository] mount")
        const setup = () => {
            return;
        }

        setup();

        return () => {
            console.log("[AuctionRepository] unmount")
        }
    }, [])

    return { stateGetCount, getCurrentBid, create }
}

export default AuctionRepository;