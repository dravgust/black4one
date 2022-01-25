import React, { useCallback, useState, useEffect, memo,} from "react"
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
import CreateDeedModal from "./CreateDeedModal";
import { useBlackDeedMethod } from "../../hooks/useDeedRepository";
import { useBlackAuctionMethod } from "../../hooks/useAuctionRepository";
import Config from "../../config";

/* eslint-disable @typescript-eslint/no-explicit-any */
type ApproveDeedProps = {
  selectedItem: any | undefined,
};

export const ApproveDeed = ({ selectedItem }: ApproveDeedProps) => {

  const { account } = useEthers()
  const [disabled, setDisabled] = useState(false)
  const { state: approveDeedState, send: approveDeed } = useBlackDeedMethod("approve")

  function onClick() {
    if (account) {
      if (selectedItem)
      approveDeed(Config.AUCTIONREPOSITORY_ADDRESS, selectedItem.deedId, { from: account })
      setDisabled(true)
    }
  }

  useEffect(() => {
    console.log("[ApproveDeed] state: ", approveDeedState);
    if (approveDeedState.status != 'Mining') {
      setDisabled(false)
    }
  }, [approveDeedState])

  return (
    <Button onClick={onClick} disabled={!account || disabled || !selectedItem || selectedItem.approved}
      bg={useColorModeValue('gray.200', 'gray.700')}
      rounded={"xl"}
      border="1px solid transparent"
      _hover={{
        borderColor: "whiteAlpha.700"
      }}>
      Approve
    </Button>
  )
}

type CreateAuctionProps = {
  selectedItem: any | undefined,
};

export const CreateAuction = ({selectedItem}: CreateAuctionProps) => {
  const { account } = useEthers()
  const [disabled, setDisabled] = useState(false)

  const { state: createAuctionState, send: createAuction } = useBlackAuctionMethod("createAuctionByOwner")

  const auctionTitle = `auction Title`;
  const auctionMetadata = `auction metadata`;
  const startingPrice = 0;
  const blockDeadline = (Date.now() + 1000 * 60 * 5);

  function onClick() {
    if (account) {
      if (selectedItem)
      createAuction(Config.DEEDREPOSITORY_ADDRESS, selectedItem.deedId, auctionTitle, auctionMetadata, startingPrice, blockDeadline, {from: account })
      setDisabled(true)
    }
  }

  useEffect(() => {
    console.log("[CreateAuction] state: ", createAuctionState);
    if (createAuctionState.status != 'Mining') {
      setDisabled(false)
    }
  }, [createAuctionState])

  return (
    <Button onClick={onClick} disabled={!account || disabled || !selectedItem || !selectedItem?.approved}
      bg={useColorModeValue('gray.200', 'gray.700')}
      rounded={"xl"}
      border="1px solid transparent"
      _hover={{
        borderColor: "whiteAlpha.700"
      }}>
      Create Auction
    </Button>
  )
}

const PureTokenCard = memo(TokenCard, 
  (prevProps, nextProps) => 
  prevProps.photo.deedId === nextProps.photo.deedId 
  && prevProps.selected === nextProps.selected)


 /* eslint-disable @typescript-eslint/no-explicit-any */
const TokenList = () => {

  const { account } = useEthers()
  const { isOpen: isCreateDeedOpen, onOpen: onCreateDeedOpen, onClose: onCreateDeedClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<any>()

  const tokens = useTokensOfOwner()
  const tokenList = tokens.map(token => ({
    deedId: token.tokenId,
    approved: token.approved,
    src: toHttpPath(token.metadataURI),
    width: 64,
    height: 64
  })).reverse()

  const onItemSelect = (item: any) =>
    (isSelected: boolean) =>
     setSelectedItem(isSelected ? item : undefined) 

  const imageRenderer = useCallback(
    ({ index, key, photo, left, top }) => (
      <PureTokenCard
        onSelect={onItemSelect(photo)}
        selected={selectedItem?.deedId == photo.deedId}
        index={index}
        key={`${key}_${index}`}
        photo={photo}
        margin={"2px"}
        left={left}
        top={top}
      />
    ),
    [selectedItem]
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
            <CreateAuction selectedItem={selectedItem} />
            <ApproveDeed selectedItem={selectedItem} />
            <Button onClick={onCreateDeedOpen} disabled={!account}
              bg={useColorModeValue('gray.200', 'gray.700')}
              rounded={"xl"}
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
          : <Box height={20}></Box>}
      </Box>
    </VStack>
  )
}

export default TokenList;