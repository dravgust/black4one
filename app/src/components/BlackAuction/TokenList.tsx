import React, { useCallback, useEffect, useState} from "react"
import { VStack, Box, Text, Heading } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react"
import { TokenCard } from "./TokenCard";
import Gallery ,{ PhotoProps } from "react-photo-gallery";
import { useContractEvents } from '../../hooks';
import { Contract, Event } from '@ethersproject/contracts'
import { useEthers, useContractCalls } from '@usedapp/core'
import { toHttpPath } from "../../utils";

export const tokenListDefault = [
  {
    src: "https://ipfs.infura.io/ipfs/QmVq1E7snfeLksA5rtdrp5DeLumgLuh8vmwy2Ey1EArhKJ",
    width: 384,
    height: 298,
    title: "Token1"
  },
  {
    src: "https://ipfs.infura.io/ipfs/QmUvvYQga5QpWwpzsYvQWM62U8xx2FKo6VonzMu6z7zjzw",
    width: 384,
    height: 298,
    title: "Token2"
  },
  {
    src: "https://ipfs.infura.io/ipfs/QmTMgjEKzxHKesuJTnCsVEX6pLPCz5v5AkSg1kPEKNK7ic",
    width: 384,
    height: 298,
    title: "Token3"
  },
];

type TokenListProps = {
  contract: Contract,
}

interface TokenListItem {
  title: string
}

/*export function useContractMethod(methodName) {
  //const { chainId } = useEthers();
  const { state, send } = useContractFunction(contract, methodName, {});
  return { state, send };
}*/


function useTokensURI(contract: Contract): Array<Array<string>> {

  const { account } = useEthers()
  const transferEvents = useContractEvents(account ? contract : null, "Transfer", { to: account });
  const tokenURI = useContractCalls(
    transferEvents
      ? transferEvents.map((event: Event) => ({
        abi: contract.interface,
        address: contract.address,
        method: 'tokenURI(uint256)',
        args: [event.args?.tokenId],
      }))
      : []
  )

  return (tokenURI as string[][]).filter(t => t);
}

const fetchTokenList = async (tokensURI: string[][]) => {
  return await Promise.all(tokensURI.map(async (tokenURI: Array<string>) => {
    const [metadataURI] = tokenURI;

    console.log("fetch metadata from ", metadataURI)
    let result = null
    if (metadataURI) {
      try {
        const response = await fetch(toHttpPath(metadataURI));
        if (response.ok) {
          const { properties } = await response.json();
          const { name, description, image } = properties;

          console.log(`fetched metadata: name:${name}, description:${description}, image:${image}`)
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
}

const TokenList = ({ contract }: TokenListProps) => {

  const [tokenList, setTokenList] = useState<Array<PhotoProps<TokenListItem>>>([])
  const tokensURI = useTokensURI(contract);
  console.log("useTokensURI", tokensURI);
  
  useEffect(() => {
    async function getTokenList() {
        const token = await fetchTokenList(tokensURI);
        setTokenList(token);
    }
    if(tokenList.length == 0)
        getTokenList();
 }, [])

  console.log("useTokenList", tokenList);

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
        <Gallery photos={tokenListDefault} margin={5} renderImage={imageRenderer} />
      </Box>
    </VStack>
  )
}

export default TokenList;