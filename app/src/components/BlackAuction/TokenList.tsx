import React, { useCallback, useEffect, useState, /*useState*/ } from "react"
import {
  VStack, Box, Text, Heading, useDisclosure,
  useColorModeValue,
  Button,
} from "@chakra-ui/react"
//import { AddIcon } from "@chakra-ui/icons"
import { TokenCard } from "./TokenCard";
import Gallery, { PhotoProps } from "react-photo-gallery";
import { useContractEvents } from '../../hooks';
import { Contract, Event } from '@ethersproject/contracts'
import { useContractCalls, useEthers } from '@usedapp/core'
import { toHttpPath } from "../../utils";
import styled from "styled-components";
import CreateDeedModal from "./CreateDeedModal";

function useTokensURI(contract: Contract, account: string | null | undefined): PhotoProps[] {

  const [tokensURI, settokensURI] = useState<PhotoProps[]>([])
  const transferEvents = useContractEvents(contract, "Transfer", account);
  const callResult = useContractCalls(
    transferEvents
      ? transferEvents.map((event: Event) => ({
        abi: contract.interface,
        address: contract.address,
        method: 'tokenURI(uint256)',
        args: [event.args?.tokenId],
      }))
      : []
  )

  useEffect(() => {
    const list = callResult
      .filter(t => t)
      .map(result => {

        const [uri] = result as string[];
        return ({ src: toHttpPath(uri), width: 1, height: 1 })
      })

    if (list.length > 0) {
      settokensURI(list as PhotoProps[])
    }
  }, [callResult, account])

  return tokensURI;
}

type TokenListProps = {
  contract: Contract,
}

const TokenList = ({ contract }: TokenListProps) => {

  const { account } = useEthers()
  const { isOpen: isCreateDeedOpen, onOpen: onCreateDeedOpen, onClose: onCreateDeedClose } = useDisclosure();
  const tokenList = useTokensURI(contract, account)

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
      <Box>
        {account && tokenList.length !== 0
          ? <Gallery photos={tokenList} margin={5} direction="column" renderImage={imageRenderer} />
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