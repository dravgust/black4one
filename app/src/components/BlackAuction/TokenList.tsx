import React from "react"
import { VStack, Box, Flex, Text, Heading } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react"
import { TokenCard } from "./TokenCard";

const Tokens = [{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }]

const TokenList = () => {

    return (
        <VStack
            rounded={"xl"}
            bg={useColorModeValue("white", "gray.700")}
            py={5}
        >
            <Box alignItems={'left'} w={"100%"} px={5}>
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
            <Flex
                spacing={5}
                p={5}
                w="full"
                direction={{ base: 'column-reverse', md: 'row' }}
                alignItems="center"
                justifyContent="center">
                {Tokens.map((token) => (<TokenCard key={token.name}>{token.name}</TokenCard>))}
            </Flex>
        </VStack>
    )
}

export default TokenList;