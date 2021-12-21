import { useEffect, useState } from 'react'
import { useBlockNumber, useEthers } from '@usedapp/core'
import { Contract, Event } from '@ethersproject/contracts'

type FilterProps = {
    to?: string | null | undefined,
    fromBlock?: number,
    toBlock?: number
}
//'Transfer', { filter: {'to': toAddr}, fromBlock: 0, toBlock: 'latest'}
/* eslint-disable @typescript-eslint/no-explicit-any */
export function useContractEvents(contract: Contract | null, name: string, args?: FilterProps) {
    const [events, setContractEvents] = useState<Array<Event>>([]);
    const { library: provider } = useEthers();
    const latestBlockNumber = useBlockNumber();

    useEffect(() => {
        async function fetchEvents(contract: Contract) {
            if(provider && latestBlockNumber){
                try{
                    const filter = contract.filters[name](null, args?.to);
                    const connectedContract = contract.connect(provider);
                    //latestBlockNumber, 'latest'
                    const result = await connectedContract.queryFilter(filter);
                    setContractEvents(result);
                } catch (error){
                    console.error(error);
                    setContractEvents([]);
                }
            }
        }
        contract && fetchEvents(contract);
    }, [contract, provider, latestBlockNumber])

    return events;
}