import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { useEthers } from '@usedapp/core'
//import useAuctionRepository from '../models/useAuctionRepository'
import {
    useDisclosure,
    useColorModeValue,
    Button, 
} from "@chakra-ui/react";
//import useDeedRepository from "../models/useDeedRepository";
import TokenList from "../components/BlackAuction/TokenList";
import Config from '../config'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import CreateDeedModal from "../components/BlackAuction/CreateDeedModal";

const contractAddress = Config.DEEDREPOSITORY_ADDRESS;
const contractAbi = Config.DEEDREPOSITORY_ABI;

const contractInterface = new utils.Interface(contractAbi)
const contract = new Contract(contractAddress, contractInterface);

const Auction = () => {

    const { account } = useEthers()
    const { isOpen: isCreateDeedOpen, onOpen: onCreateDeedOpen, onClose: onCreateDeedClose } = useDisclosure();

    return (
        <DefaultLayout>          
            <Button onClick={onCreateDeedOpen} disabled={!account}
                bg={useColorModeValue('gray.200', 'gray.700')}
                rounded={'xl'}
                border="1px solid transparent"
                _hover={{
                    borderColor: "whiteAlpha.700"
                }}>
            Create Deed
        </Button>
        <CreateDeedModal isOpen={isCreateDeedOpen} onClose={onCreateDeedClose}/>
         <TokenList contract={contract} />
        </DefaultLayout>
    );
}
export default Auction;