import { useEffect, useState } from 'react'
import { useBlockNumber, useEthers } from '@usedapp/core'
import { Contract, Event } from 'ethers'

export function useContractEvents(contract: Contract, eventName: string) {
    const [events, setContractEvents] = useState<Array<Event>>([]);
    const { library: provider } = useEthers();
    const latestBlockNumber = useBlockNumber();

    useEffect(() => {
        async function fetchEvents(contract: Contract, eventName: string) {
            if(provider && latestBlockNumber){
                try{
                    const filter = contract.filters[eventName]();
                    const connectedContract = contract.connect(provider);
                    const result = await connectedContract.queryFilter(filter, latestBlockNumber - 1, 'latest');
                    setContractEvents(result);
                } catch (error){
                    console.error(error);
                    setContractEvents([]);
                }
            }
        }
        fetchEvents(contract, eventName);
    }, [provider, latestBlockNumber])

    return events;
}