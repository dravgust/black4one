 
 import { utils, Contract } from 'ethers'
 import { Provider } from '@ethersproject/providers'

 /* eslint-disable @typescript-eslint/no-explicit-any */
 export class Repository {
    private _contract : Contract;
    private _web3Contract : Contract | null = null;

    constructor(address: string, abi: any[]){
        const contractInterface = new utils.Interface(abi)
        this._contract = new Contract(address, contractInterface);
    }

    setProvider(provider: Provider){
        this._web3Contract = this._contract.connect(provider);
    }

    getContract(): Contract {
        if(this._web3Contract == null)
            throw new Error("Web3Provider not set");

        return this._web3Contract;
    }

    getProvider(): Provider {
        return this.getContract().provider;
    }

    getContractAddress(): string {
        return this._contract.address;
    }

    getCurrentBlock(): Promise<number> {
        return this.getProvider().getBlockNumber()
    }
}