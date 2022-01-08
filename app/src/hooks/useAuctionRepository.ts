
import { useState, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import Config from '../config';
import { useContractEvents } from './useContract'
import { useContractCall, useContractCalls, useEthers } from '@usedapp/core'
import { Auction, TokenAuction } from '../models/auction'

const contractAddress = Config.AUCTIONREPOSITORY_ADDRESS;
const contractAbi = Config.AUCTIONREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

const tokenContractInterface = new utils.Interface(Config.DEEDREPOSITORY_ABI)
const tokenContract = new Contract(Config.DEEDREPOSITORY_ADDRESS, tokenContractInterface);

export function useBlackAuctionEvents(eventName: string, account: string | null | undefined = null) {
    return useContractEvents(contract, eventName, account);
}

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

export function useAuctionsById(auctionIds: number[] | undefined) {
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
    return auctions;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useAuctionList(address: string | null | undefined, activeOnly: boolean = false) {

    const [auctionList, setAuctionList] = useState<TokenAuction[]>([])
    const { library: provider } = useEthers();
    const auctionIds = useAuctionsOf(address)
    const auctions = useAuctionsById(auctionIds)

    useEffect(() => {

        const getAuctionData = async (auctions: any[] | undefined) => {
            if (provider && auctions) {
                try {
                    const list = auctions
                        .filter((a: Auction) => a && (!activeOnly || a.active))
                        .map(a => ({ ...a }))

                    if (list.length > 0) {
                        const connectedContract = tokenContract.connect(provider)
                        const auctionList = await Promise.all(list.map(async (a: Auction) => {
                            const metadataURI = await connectedContract.tokenURI(a.deedId)
                            return {
                                ...a,
                                tokenId: a.deedId.toNumber(),
                                metadataURI
                            }
                        }))
                        setAuctionList(auctionList)
                    }
                }
                catch (error) {
                    setAuctionList([])
                    console.log("[useAuctionList]", error)
                }
            }
        }

        getAuctionData(auctions)

    }, [provider, address, auctions])

    return auctionList;
}
