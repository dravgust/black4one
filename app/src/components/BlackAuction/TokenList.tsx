import React, { useCallback, useEffect, useState, /*useState*/} from "react"
import { VStack, Box, Text, Heading } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react"
import { TokenCard } from "./TokenCard";
import Gallery ,{ PhotoProps } from "react-photo-gallery";
import { useContractEvents } from '../../hooks';
import { Contract, Event } from '@ethersproject/contracts'
import { useContractCalls } from '@usedapp/core'
import { toHttpPath } from "../../utils";

function useTokensURI(contract: Contract): Array<Array<string>> {

  const [tokensURI, settokensURI] = useState<string[][]>([])
  const transferEvents = useContractEvents(contract, "Transfer");
  const callResult = useContractCalls(
    transferEvents
    ?transferEvents.map((event: Event) => ({
      abi: contract.interface,
      address: contract.address,
      method: 'tokenURI(uint256)',
      args: [event.args?.tokenId],
    })) 
    :[]
  )

  useEffect(() => {
    const list = callResult.filter(t => t);
      if(list.length > 0){
        settokensURI(list as string[][])
      }
  }, [callResult])
  
  return tokensURI;
}

interface TokenListItem {
  title: string
}

const useTokenList = (contract: Contract) => {
  const [tokenList, setTokenList] = useState<Array<PhotoProps<TokenListItem>>>([])
  const tokensURI = useTokensURI(contract)

  useEffect(() => {

    async function fetchTokenList(list: string[][]) {
      const result = await Promise.all(list.map(async (tokenURI: Array<string>) => {
        const [metadataURI] = tokenURI;
        let result = null
        if (metadataURI) {
          try {
            const response = await fetch(toHttpPath(metadataURI));
            if (response.ok) {
              const { properties } = await response.json();
              const { name, description, image } = properties;
    
              //console.log(`fetched metadata: name:${name}, description:${description}, image:${image}`)
              result = { name, description, image }
            } else {
              const errorMessage = await response.text()
              console.log("Error:", errorMessage)
            }
          } catch (error) {
            console.log("catch Error:", error)
          }
        }
    
        return { src: toHttpPath(result?.image), width: 1, height: 1, title: result?.name }
      }))

      setTokenList(result);
    }

   tokensURI && fetchTokenList(tokensURI) 
  }, [tokensURI])

  return tokenList;
}


type TokenListProps = {
  contract: Contract,
}

const TokenList = ({ contract }: TokenListProps) => {

  const tokenList = useTokenList(contract);
  console.log("[TokenList] tkenList", tokenList);

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
      <Box display={"flex"} flexDir={"column"} my={"3rem"}>
        <Heading fontSize={"calc(10px + 2vmin)"} fontWeight="md" lineHeight="6">
          Token List
        </Heading>
        <Text
          mt={1}
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          ...
        </Text>
      </Box>
      <Box>
        <Gallery photos={tokenList} margin={5} renderImage={imageRenderer} />
      </Box>
    </VStack>
  )
}

export default TokenList;