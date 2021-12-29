import React from 'react'
import { Text, Box, Icon, useColorModeValue, Flex } from "@chakra-ui/react"
import { useTransactions, shortenTransactionHash } from '@usedapp/core'
import {
    LinkIcon,
} from "@chakra-ui/icons";
import { utils } from 'ethers'
import moment from 'moment'

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
                                {moment(new Date(tx.submittedAt)).format('DD/MM/YYYY h:mm:ss')}
                            </Text>
                            <Text fontSize="sm">
                                {tx.transactionName}  {shortenTransactionHash(tx.transaction.hash)}
                            </Text>
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                               Gas Price: {utils.formatUnits(tx.transaction.gasPrice ?? 0, 'gwei')} Gwei
                            </Text>
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                               Gas Used: {utils.formatUnits(tx.receipt?.cumulativeGasUsed ?? 0, 10)}
                            </Text>
                        </Flex>
                    </Flex>
                )
            })}
        </Flex>
    )
}

export default Transactions