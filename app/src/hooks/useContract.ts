import { useEffect, useState } from 'react'
import { useBlockNumber, useEthers, useContractFunction } from '@usedapp/core'
import { Contract, Event } from '@ethersproject/contracts'

export function useContractMethod(contract: Contract, methodName: string) {
    const { state, send } = useContractFunction(contract, methodName, { transactionName: methodName });
    return { state, send };
}

/*type FilterProps = {
    to?: string | null | undefined,
    fromBlock?: number,
    toBlock?: number
}*/
//'Transfer', { filter: {'to': toAddr}, fromBlock: 0, toBlock: 'latest'}

 /* eslint-disable @typescript-eslint/no-explicit-any */
export function useContractEvents(contract: Contract, eventName: string, ...accountArgs : any) {

    const { library: provider } = useEthers();
    const latestBlockNumber = useBlockNumber();

    const [events, setContractEvents] = useState<Array<Event>>([]);

    useEffect(() => {
        async function fetchEvents(contract: Contract) {
            if(provider && latestBlockNumber){
                try{
                    const filter = contract.filters[eventName](...accountArgs);
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
        latestBlockNumber && fetchEvents(contract);
    }, [provider, latestBlockNumber])

    return events;
}
