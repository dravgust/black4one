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

  console.log("[AuctionList]", auctions)

  const auctionList = auctions.map(a => ({
    id: a.auctionId,
    name: a.name,
    description: a.metadata,
    deedId: a.tokenId,
    startPrice: a.startPrice,
    blockDeadline: a.blockDeadline,
    src: toHttpPath(a.metadataURI),
  })).reverse()


  const imageRenderer = useCallback(
    ({ auctionId, auctionName, auctionDescription, blockDeadline, startPrice, deedId, data }) => {
      return (
        <AuctionCard
          deedId={deedId}
          auctionId={auctionId}
          auctionName={auctionName}
          auctionDescription={auctionDescription}
          startPrice={startPrice}
          blockDeadline={blockDeadline}
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
              renderSuccess={(data: any) => imageRenderer({
                ...data,
                auctionId: item.id,
                auctionName: item.name,
                auctionDescription: item.description,
                deedId: item.deedId,
                startPrice: item.startPrice,
                blockDeadline: item.blockDeadline
              })}
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