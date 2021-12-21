import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
//import useAuctionRepository from '../models/useAuctionRepository'
import {
    Box,
    Heading,
} from "@chakra-ui/react";
//import useDeedRepository from "../models/useDeedRepository";
import { DeedRepositoryForm } from "../components/BlackAuction/DeedRepositoryForm";
import TokenList from "../components/BlackAuction/TokenList";
import Config from '../config'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import FileStorageForm from "../components/BlackAuction/FileStorageForm";

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

const Auction = () => {

    //const { stateGetCount, create } = useAuctionRepository();
    //const { create: createDeed } = useDeedRepository();
    //console.log(Date.now() + 1000 * 60 * 3); 3 min
    return (
        <DefaultLayout>
            <Box py={5}>
                <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                    Auction
                </Heading>
            </Box>
            <Box py={5}>
                <DeedRepositoryForm />
            </Box>
            <Box>
                <FileStorageForm />
            </Box>
            <Box py={5}>
                <TokenList contract={contract} />
            </Box>
        </DefaultLayout>
    );
}
export default Auction;