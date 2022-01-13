import React, { useCallback, } from "react"
import {
  VStack, Box, Text, Heading, useColorModeValue, HStack
} from "@chakra-ui/react"
//import { AddIcon } from "@chakra-ui/icons"
import { AuctionCard } from "./AuctionCard";
import { useEthers } from '@usedapp/core'
import { toHttpPath, } from "../../utils";
import styled from "styled-components";
import { useAuctionList } from '../../hooks/useAuctionRepository'
import Fetch from "../Fetch";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AuctionList = () => {

  const { account } = useEthers()
  const auctions = useAuctionList(account, true)
  console.log(auctions)
  const auctionList = auctions.map(a => ({
    name: a.name,
    description: a.metadata,
    deedId: a.tokenId,
    src: toHttpPath(a.metadataURI),
  })).reverse()


  const imageRenderer = useCallback(
    ({ auctionName, auctionDescription, deedId, data }) => {
      return (
        <AuctionCard
          deedId={deedId}
          auctionName={auctionName}
          auctionDescription={auctionDescription}
          metadata={data}
        />
      )
    },
    []
  );

  return (
    <VStack
      //rounded={"xl"}
      //bg={useColorModeValue("white", "gray.700")}
      py={5}
    >
      <HStack w={"full"} px={1}>
        <Box display={"flex"} flexDir={"column"} my={"1.5rem"}>
          <Heading fontSize={"calc(10px + 2vmin)"} fontWeight="md" lineHeight="6">
            Auctions
          </Heading>
          <Text
            mt={1}
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >

          </Text>
        </Box>
        <Box textAlign={"right"} w="full">

        </Box>
      </HStack>
      <Box w={"full"}>
        {account && auctionList.length !== 0
          ? auctionList.map((item: any, i: number) => (
            <Fetch
              uri={item.src}
              key={i}
              renderSuccess={(data: any) => imageRenderer({...data, auctionName:item.name, auctionDescription:item.description, deedId: item.deedId})}
            />
          ))
          : <EmptyDescription>...</EmptyDescription>}
      </Box>
    </VStack>
  )
}

export default AuctionList;

const EmptyDescription = styled.h3`
    color: #2D3748;
    border-bottom: 4px solid #2D3748;
    width: max-content;
    margin: 0 auto;
    font-size: calc(10px + 2vmin)
`