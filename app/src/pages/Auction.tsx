import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
//import useAuctionRepository from '../models/useAuctionRepository'
//import useDeedRepository from "../models/useDeedRepository";
import TokenList from "../components/BlackAuction/TokenList";
import Config from '../config'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

const Auction = () => {

    return (
        <DefaultLayout>           
            <TokenList contract={contract} />
        </DefaultLayout>
    );
}
export default Auction;