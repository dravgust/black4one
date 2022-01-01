import React, { useCallback, useEffect, useState, /*useState*/ } from "react"
import {
  VStack, Box, Text, Heading, useDisclosure,
  useColorModeValue,
  Button,
} from "@chakra-ui/react"
//import { AddIcon } from "@chakra-ui/icons"
import { TokenCard } from "./TokenCard";
import Gallery, { PhotoProps } from "react-photo-gallery";
import { useBlackDeedEvents } from '../../hooks/BlackDeed/useContractEvents';
import { Contract, Event } from '@ethersproject/contracts'
import { useContractCalls, useEthers, useTokenBalance } from '@usedapp/core'
import { toHttpPath } from "../../utils";
import styled from "styled-components";
import CreateDeedModal from "./CreateDeedModal";
import Config from "../../config";
import { useTokenOfOwnerByIndex } from "../../hooks/BlackDeed/useContractEvents";


function useTokens() {

  const [balance, setBalance] = useState<number>()
  const balanceResult = useTokenBalance(Config.DEEDREPOSITORY_ADDRESS, '0x6f807535408B31C79A854985ad98d63A42C6C6E2')
  const tokenOfOwnerByIndex = useTokenOfOwnerByIndex('0x6f807535408B31C79A854985ad98d63A42C6C6E2', 0)

  useEffect(() => {
    if(balanceResult){
      const length = balanceResult.toNumber() - 1;
      //for(let i = 0; i <= length; i++){
        //let uri = tokenOfOwnerByIndex('0x6f807535408B31C79A854985ad98d63A42C6C6E2', i)
      //}

      console.log(length)
      console.log(tokenOfOwnerByIndex)

      setBalance(balanceResult.toNumber())
    }
  }, [balanceResult])

  return { balance }
}

function useTokensURI(contract: Contract, account: string | null | undefined): PhotoProps[] {

  const [tokensURI, settokensURI] = useState<PhotoProps[]>([])
  const transferEvents = useBlackDeedEvents("Transfer", null, account);

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
      .map((result, index) => {
        if(result){
          const deedId = transferEvents[index].args?.tokenId;
          const [uri] = result as string[];
          return ({ deedId: deedId.toNumber(), src: toHttpPath(uri), width: 1, height: 1 })
        }
        return result;
      })
      .filter(t => t)
      .reverse()

      
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

  const tokens = useTokens()
  console.log(tokens)

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
      <Box w={"full"}>
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