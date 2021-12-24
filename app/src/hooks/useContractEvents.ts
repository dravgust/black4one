import { useEffect, useState } from 'react'
import { useBlockNumber, useEthers } from '@usedapp/core'
import { Contract, Event } from '@ethersproject/contracts'

/*type FilterProps = {
    to?: string | null | undefined,
    fromBlock?: number,
    toBlock?: number
}*/
//'Transfer', { filter: {'to': toAddr}, fromBlock: 0, toBlock: 'latest'}
/* eslint-disable @typescript-eslint/no-explicit-any */
export function useContractEvents(contract: Contract, name: string) {

    const { account } = useEthers()
    const { library: provider } = useEthers();
    const latestBlockNumber = useBlockNumber();

    const [events, setContractEvents] = useState<Array<Event>>([]);

    useEffect(() => {
        async function fetchEvents(contract: Contract) {
            if(provider && latestBlockNumber){
                try{
                    const filter = contract.filters[name](null, account);
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
        account && latestBlockNumber && fetchEvents(contract);
    }, [account, provider, latestBlockNumber])

    return events;
}