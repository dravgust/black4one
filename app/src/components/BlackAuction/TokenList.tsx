import React, { useCallback, } from "react"
import {
  VStack, Box, Text, Heading, useDisclosure,
  useColorModeValue,
  Button,
} from "@chakra-ui/react"
//import { AddIcon } from "@chakra-ui/icons"
import { TokenCard } from "./TokenCard";
import Gallery/*, { PhotoProps }*/ from "react-photo-gallery";
import { useTokensOfOwner } from '../../hooks/useDeedRepository';
import { useEthers } from '@usedapp/core'
import { toHttpPath, } from "../../utils";
import styled from "styled-components";
import CreateDeedModal from "./CreateDeedModal";


const TokenList = () => {

  const { account } = useEthers()
  const { isOpen: isCreateDeedOpen, onOpen: onCreateDeedOpen, onClose: onCreateDeedClose } = useDisclosure();

  const tokens = useTokensOfOwner()
  const tokenList = tokens.map(token => ({
     deedId: token.tokenId,
      src: toHttpPath(token.metadataURI),
       width: 64,
       height: 64
     })).reverse()

  const imageRenderer = useCallback(
    ({ index, key, photo, left, top }) => {
      return (
        <TokenCard
          index={index}
          key={`${key}_${index}`}
          photo={photo}
          margin={"2px"}
          left={left}
          top={top}
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
        <Button onClick={onCreateDeedOpen} disabled={!account}
          bg={useColorModeValue('gray.200', 'gray.700')}
          rounded={'xl'}
          border="1px solid transparent"
          _hover={{
            borderColor: "whiteAlpha.700"
          }}>
          Create Deed
        </Button>
        <CreateDeedModal isOpen={isCreateDeedOpen} onClose={onCreateDeedClose} />
      </Box>
      <Box w={"full"}>
        {account && tokenList.length !== 0
          ? <Gallery photos={tokenList} renderImage={imageRenderer}/>
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