
import { useState, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import Config from '../config';
import { useContractEvents } from './useContractEvents'
import { useContractCall, useContractCalls, useEthers } from '@usedapp/core'

const contractAddress = Config.AUCTIONREPOSITORY_ADDRESS;
const contractAbi = Config.AUCTIONREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

const tokenContractAddress = Config.DEEDREPOSITORY_ADDRESS;
const tokenContractAbi = Config.DEEDREPOSITORY_ABI;

const tokenContractInterface = new utils.Interface(tokenContractAbi)
const tokenContract = new Contract(tokenContractAddress, tokenContractInterface);

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

export function useAuctionList(address: string | null | undefined, activeOnly: boolean = false) {

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const [auctionList, setAuctionList] = useState<any[]>([])
    const { library: provider } = useEthers();
    const auctionIds = useAuctionsOf(address)
    const auctions = useAuctionsById(auctionIds)

    useEffect(() => {

        const getAuctionData = async (auctions: any[]) => {
            if (provider && auctions) {
                try {
                    const list = auctions
                        .filter((a: any) => a && (!activeOnly || a.active))
                        .map(a => ({ ...a }))

                    if (list.length > 0) {
                        const connectedContract = tokenContract.connect(provider);
                        const auctionList = await Promise.all(list.map(async (a) => {
                            const tokenURI = await connectedContract['tokenURI(uint256)'](a.deedId)

                            return {
                                ...a,
                                tokenId: a.deedId.toNumber(),
                                metadataURI: tokenURI
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
