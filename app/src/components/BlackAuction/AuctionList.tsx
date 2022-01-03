import React, { useCallback,} from "react"
import {
  VStack, Box, Text, Heading, useColorModeValue,
} from "@chakra-ui/react"
//import { AddIcon } from "@chakra-ui/icons"
import { TokenCard } from "./TokenCard";
import Gallery/*, { PhotoProps }*/ from "react-photo-gallery";
import { useEthers } from '@usedapp/core'
import { toHttpPath, } from "../../utils";
import styled from "styled-components";
import { useAuctionList } from '../../hooks/useAuctionRepository'


const AuctionList = () => {

  const { account } = useEthers()
  const auctions = useAuctionList(account, true)

  const auctionList = auctions.map(a => ({
    deedId: a.tokenId,
     src: toHttpPath(a.metadataURI),
      width: 1,
      height: 1
    })).reverse()


  const imageRenderer = useCallback(
    ({ index, key, photo }) => {
      return (
        <TokenCard
          index={index}
          key={key}
          photo={photo}
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
      <Box w={"full"}>
        {account && auctionList.length !== 0
          ? <Gallery photos={auctionList} margin={5} direction="column" renderImage={imageRenderer} />
          : <EmptyDescription>There are no auctions</EmptyDescription>}
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