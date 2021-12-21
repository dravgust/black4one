import React, { useCallback } from "react"
import { VStack, Box, Text, Heading } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react"
import { TokenCard } from "./TokenCard";
import Gallery from "react-photo-gallery";
import { useContractEvents } from '../../hooks';
import { Contract, Event} from '@ethersproject/contracts'
import { useEthers, useContractCalls } from '@usedapp/core'

export const tokenList = [
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


/*export function useContractMethod(methodName) {
  //const { chainId } = useEthers();
  const { state, send } = useContractFunction(contract, methodName, {});
  return { state, send };
}*/

function useTokensURI(contract: Contract) {

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



  return tokenURI.filter(t => t).join(', ');
}

const TokenList = ({contract}: TokenListProps) => {

  const tokensURI = useTokensURI(contract);
  console.log(tokensURI);

  const imageRenderer = useCallback(
    ({ index, key, photo }) => {
      return(
      <TokenCard
        index={index}
        key={key}
        photo={photo}
      />
    )},
    []
  );

  return (
    <VStack
        rounded={"xl"}
        //bg={useColorModeValue("white", "gray.700")}
        py={5}
      >
        <Box alignItems={'left'} w={"100%"} px={5} mb={5}>
          <Heading fontSize="lg" fontWeight="md" lineHeight="6">
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