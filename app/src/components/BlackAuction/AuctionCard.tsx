import React, { useEffect, useState } from "react"
import { chakra, Button, Flex, Box, useColorModeValue, ButtonGroup, Text, VStack, Heading } from "@chakra-ui/react"
import { toHttpPath } from "../../utils";
import { useCancelAuction, useCurrentBid } from "../../hooks/useAuctionRepository";
import { formatEther } from '@ethersproject/units';
import { useEthers } from "@usedapp/core";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const AuctionCard = ({ auctionName, auctionDescription, deedId, metadata }: any) => {

  const bg700 = useColorModeValue('gray.200', 'gray.700')

  const [disabled, setDisabled] = useState(false)
  const { account } = useEthers()
  const currendBid = useCurrentBid(deedId);
  const { state: cancelState, send: cancelAcution } = useCancelAuction()

  const onCancelClick = () => {
    if (account) {
      cancelAcution(deedId, { from: account })
      setDisabled(true)
    }
  }

  useEffect(() => {
    console.log("[AuctionCard] cancelState: ", cancelState);
    if (cancelState.status != 'Mining') {
      setDisabled(false)
    }
  }, [cancelState])

  return (
    <Flex mb={5}>
      <Flex
        direction="column"
        //justifyContent="center"
        alignItems="center"
      //w="sm"
      //mx={1}
      //mx="auto"
      //mb={5}
      >
        <Box
          bg="gray.300"
          //w={64}
          h={64}
          w="full"
          //roundedLeft={"xl"}
          shadow="md"
          bgSize="cover"
          bgPos="center"
          style={{
            backgroundImage:
              `url(${toHttpPath(metadata.image)})`,
          }}
        ></Box>

        <Box
          //w={{ base: 56, md: 64 }}
          w="sm"
          bg={"transparent"}
          mt={-10}
          shadow="lg"
          //rounded="lg"
          //roundedBottomLeft={"xl"}
          overflow="hidden"
        >
          <chakra.h3
            bg={useColorModeValue("white", "gray.800")}
            opacity={0.8}
            py={2}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            color={useColorModeValue("gray.800", "white")}
            letterSpacing={1}
          >
            #{deedId} {metadata.name}
          </chakra.h3>
        </Box>
        <Box w="sm" >
          <chakra.span
            color={useColorModeValue("gray.800", "gray.200")}
          >
            {metadata.description}
          </chakra.span>
        </Box>
      </Flex>

      <Box
        //roundedRight={"xl"}
        w="full"
        borderRight="1px"
        //border="1px"
        //borderStyle="solid"
        borderColor={useColorModeValue('gray.100', 'gray.600')}
        //p={1}
        shadow="md">

        <Flex
          alignItems="start"
          direction={"column"}
          justifyContent="space-between"
          py={2}
          px={3}
          //bg={useColorModeValue("gray.200", "gray.700")}
          w="full"
          //roundedRight="xl"
          h='full'
        >
          <Heading fontSize={"calc(10px + 2vmin)"} fontWeight="md">
            {auctionName}
          </Heading>
          <chakra.span>{auctionDescription}</chakra.span>
          <Flex direction={"row"}>
            <VStack>
              <Heading fontSize={"calc(10px + 2vmin)"} fontWeight="md">
                Current Bid
              </Heading>
              <Box p="4">
                <Text fontSize="6xl">
                  {currendBid ? formatEther(currendBid) : 0.0} <chakra.span fontSize={"3xl"}>ETH</chakra.span>
                </Text>
              </Box>
            </VStack>

          </Flex>

          <ButtonGroup variant='outline' spacing='1' pt={2}>

            <Button
              disabled={disabled}
              onClick={onCancelClick}
              bg={useColorModeValue('gray.200', 'gray.700')}
              border="1px solid transparent"
              _hover={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "whiteAlpha.700",
                backgroundColor: { bg700 },
              }}
              borderRadius="xl"
              m="1px"
              px={3}
              height="38px"
            >
              Cancel Aucion
            </Button>

          </ButtonGroup>
        </Flex>
      </Box>
    </Flex>
  )
}