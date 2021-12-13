import Config from '../config'

export class AuctionRepository {

    account : string;
    gas : number;

    constructor(){
        this.account = '';
        this.gas = Config.GAS_AMOUNT || 4476768;
    }

    setAccount(account : string){
        this.account = account;
    }
}