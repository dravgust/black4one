import React, { useCallback, useState, useEffect, useRef, RefObject } from "react"
import {
  VStack, Box, Text, Heading, useDisclosure,
  useColorModeValue, HStack, Button, ButtonGroup
} from "@chakra-ui/react"
//import { AddIcon } from "@chakra-ui/icons"
import { TokenCard } from "./TokenCard";
import Gallery/*, { PhotoProps }*/ from "react-photo-gallery";
import { useTokensOfOwner } from '../../hooks/useDeedRepository';
import { useEthers } from '@usedapp/core'
import { toHttpPath, } from "../../utils";
import styled from "styled-components";
import CreateDeedModal from "./CreateDeedModal";
import { useBlackDeedMethod } from "../../hooks/useDeedRepository";
import Config from "../../config";
//import { TokenAuction } from "../../models/AuctionRepository"

/* eslint-disable @typescript-eslint/no-explicit-any */
type TransferDeedProps = {
  selectedList: RefObject<number[]>,
};

export const TransferDeed = ({ selectedList }: TransferDeedProps) => {

  const { account } = useEthers()
  const [disabled, setDisabled] = useState(false)
  const { state: transferDeedState, send: transferDeed } = useBlackDeedMethod("transferFrom")

  function onClick() {
    if (account) {
      const [deedId] = selectedList.current ?? []
      if (deedId)
        transferDeed(account, Config.AUCTIONREPOSITORY_ADDRESS, deedId, { from: account })
      setDisabled(true)
    }
  }
  useEffect(() => {
    console.log("[TransferDeed] state: ", transferDeedState);
    if (transferDeedState.status != 'Mining') {
      setDisabled(false)
    }
  }, [transferDeedState])

  return (
    <Button onClick={onClick} disabled={!account || disabled}
      bg={useColorModeValue('gray.200', 'gray.700')}
      rounded={0}
      border="1px solid transparent"
      _hover={{
        borderColor: "whiteAlpha.700"
      }}>
      Transfer
    </Button>
  )
}

const TokenList = () => {

  const { account } = useEthers()
  const { isOpen: isCreateDeedOpen, onOpen: onCreateDeedOpen, onClose: onCreateDeedClose } = useDisclosure();
  const selectedList = useRef<number[]>([])

  const tokens = useTokensOfOwner()
  const tokenList = tokens.map(token => ({
    deedId: token.tokenId,
    src: toHttpPath(token.metadataURI),
    width: 64,
    height: 64
  })).reverse()

  const onItemSelect = (deedId: number) =>
    (isSelected: boolean) => {
      selectedList.current = isSelected
        ? [...selectedList.current, deedId]
        : selectedList.current.filter(e => e != deedId)
    }

  const imageRenderer = useCallback(
    ({ index, key, photo, left, top }) => (
      <TokenCard
        onSelect={onItemSelect(photo.deedId)}
        selected={false}
        index={index}
        key={`${key}_${index}`}
        photo={photo}
        margin={"2px"}
        left={left}
        top={top}
      />
    ),
    []
  );

  return (
    <VStack py={5}>
      <HStack w={"full"} px={1}>
        <Box display={"flex"} flexDir={"column"} my={"1.5rem"}>
          <Heading fontSize={"calc(10px + 2vmin)"} fontWeight="md" lineHeight="6">
            Assets
          </Heading>
          <Text
            mt={1}
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >

          </Text>
        </Box>
        <Box textAlign={"right"} w="full">
          <ButtonGroup variant='outline' spacing='1'>
            <TransferDeed selectedList={selectedList} />

            <Button onClick={onCreateDeedOpen} disabled={!account}
              bg={useColorModeValue('gray.200', 'gray.700')}
              rounded={0}
              border="1px solid transparent"
              _hover={{
                borderColor: "whiteAlpha.700"
              }}>
              Create
            </Button>
            <CreateDeedModal isOpen={isCreateDeedOpen} onClose={onCreateDeedClose} />
          </ButtonGroup>
        </Box>
      </HStack>

      <Box w={"full"}>
        {account && tokenList.length !== 0
          ? <Gallery photos={tokenList} renderImage={imageRenderer} />
          : <EmptyDescription>There are no tokens in your cart</EmptyDescription>}
      </Box>
    </VStack>
  )
}

export default TokenList;

const EmptyDescription = styled.h3`
    color: #2D3748;
    border-bottom: 4px solid #2D3748;
    width: max-content;
    margin: 0 auto;
    font-size: calc(10px + 2vmin)
`