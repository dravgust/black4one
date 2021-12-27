import React from 'react'
import { Text, Box, Icon, useColorModeValue, Flex } from "@chakra-ui/react"
import { useTransactions, shortenTransactionHash } from '@usedapp/core'
import {
    LinkIcon,
} from "@chakra-ui/icons";

const Transactions = () => {

    const { transactions } = useTransactions()
    const gray600gray400 = useColorModeValue("gray.600", "gray.400")
    const bgIconColor = useColorModeValue("white.300", "gray.700");

    return (
        <Flex direction="column">
            {transactions.map((tx, index, arr) => {
                console.log("[Transactions]", tx)
                return (
                    <Flex alignItems="center" justifyContent="start" key={index}>
                        <Flex direction="column" h="100%">
                            <Icon
                                as={LinkIcon}
                                bg={bgIconColor}
                                color={gray600gray400}
                                h={"30px"}
                                w={"26px"}
                                pe="6px"
                                zIndex="1"
                                position="relative"
                                left={"-8px"}
                            />
                            <Box
                                w="2px"
                                bg="gray.200"
                                h={index === arr.length - 1 ? "15px" : "28px"}
                            ></Box>
                        </Flex>
                        <Flex direction="column" justifyContent="flex-start" h="100%">
                            <Text fontSize="sm" fontWeight="bold">
                                {tx.transactionName}
                            </Text>
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                {shortenTransactionHash(tx.transaction.hash)}
                            </Text>
                        </Flex>
                    </Flex>
                )
            })}
        </Flex>
    )
}

export default Transactions