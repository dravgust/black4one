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
            <Box py={5}>
                <TokenList/>
            </Box>
        </DefaultLayout>
    );
}
export default Auction;