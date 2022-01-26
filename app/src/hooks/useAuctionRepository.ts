
import { useState, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import Config from '../config';
import { useContractEvents } from './useContract'
import { useContractCall, useContractCalls, useEthers, } from '@usedapp/core'
//import { BigNumber } from '@ethersproject/bignumber'
import { Auction, TokenAuction } from '../models/auction'
import { useContractMethod } from '.';

const contractAddress = Config.AUCTIONREPOSITORY_ADDRESS;
const contractAbi = Config.AUCTIONREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

const tokenContractInterface = new utils.Interface(Config.DEEDREPOSITORY_ABI)
const tokenContract = new Contract(Config.DEEDREPOSITORY_ADDRESS, tokenContractInterface);

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useBlackAuctionEvents(eventName: string, account: string | null | undefined = null) {
    return useContractEvents(contract, eventName, account);
}
export const useBlackAuctionMethod = (methodName: string) => useContractMethod(contract, methodName)

export function useAuctionsOf(address: string | null | undefined) {
    const [auctionIds] =
        useContractCall(
            address && {
                abi: contractInterface,
                address: contractAddress,
                method: 'getAuctionsOf',
                args: [address],
            }
        ) ?? []
    return auctionIds;
}

export function useCurrentBid(auctionId: number) {
    const [currentBid] = useContractCall(
        {
            abi: contractInterface,
            address: contractAddress,
            method: 'getCurrentBid',
            args: [auctionId],
        }) ?? []
    return currentBid;
}

export function useAuctionsById(auctionIds: number[] | undefined) {

    const [result, setResult] = useState<any[]>([])
    const auctions =
        useContractCalls(
            auctionIds ? auctionIds.map(auctionId => (
                {
                    abi: contractInterface,
                    address: contractAddress,
                    method: 'getAuctionById',
                    args: [auctionId],
                }
            )) : []
        )

    useEffect(() => {
        auctionIds
            && auctions
            && setResult(auctions.map((a: any, i: number) =>
            (
                {
                    id: auctionIds[i],
                    ...a
                }
            )))
    }, [auctions])

    return result;
}

export function useAuctionList(address: string | null | undefined, activeOnly: boolean = false) {

    const [auctionList, setAuctionList] = useState<TokenAuction[]>([])
    const { library: provider } = useEthers();
    const auctionIds = useAuctionsOf(address)
    const auctions = useAuctionsById(auctionIds)

    useEffect(() => {

        const getAuctionData = async (list: any[] | undefined) => {
            if (provider && list) {
                try {
                    if (list.length > 0) {
                        const connectedContract = tokenContract.connect(provider)
                        const aList = await Promise.all(list.map(async (a: Auction) => {
                            const metadataURI = await connectedContract.tokenURI(a.deedId)
                            return {
                                ...a,
                                tokenId: a.deedId.toNumber(),
                                auctionId: a.id.toNumber(),
                                metadataURI
                            }
                        }))
                        setAuctionList(aList)
                    }else if(auctionList.length > 0){
                        setAuctionList([])
                    }
                }
                catch (error) {
                    setAuctionList([])
                    console.log("[useAuctionList]", error)
                }
            }
        }

        auctions && getAuctionData(
            auctions
                .filter((a: Auction) => a && (!activeOnly || a.active))
                .map(a => ({ ...a })))

    }, [provider, address, auctions])

    return auctionList;
}

export function useCancelAuction() {

    const { state, send } = useContractMethod(contract, 'cancelAuction')
    return { state, send }
}