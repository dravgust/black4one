import React, { useEffect, useState } from "react"
import { chakra, Button, Flex, Box, useColorModeValue, ButtonGroup, Text, VStack, Heading, HStack, Spacer } from "@chakra-ui/react"
import { toHttpPath } from "../../utils";
import { useCancelAuction, useCurrentBid } from "../../hooks/useAuctionRepository";
import { formatEther, formatUnits } from '@ethersproject/units';
import { useEthers } from "@usedapp/core";
import moment from "moment";
import { BigNumber } from '@ethersproject/bignumber'

function EtherAmount(amount: BigNumber) {
  switch(true){
    case amount.gt(BigNumber.from(1000000000000000)):
      return [formatUnits(amount,'ether'), 'ETH']
    case amount.gt(BigNumber.from(1000000000000)):
      return [formatUnits(amount,'ether'), 'GWei']
    case amount.gt(BigNumber.from(1000000000)):
      return [formatUnits(amount,'ether'), 'MWei']
    case amount.gt(BigNumber.from(1000000)):
      return [formatUnits(amount,'gwei'), 'GWei']
      case amount.gt(BigNumber.from(1000)):
      return [formatUnits(amount,'kwei'), 'KWei']
    default:
      return [formatUnits(amount,'wei'), 'Wei']
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const AuctionCard = ({ auctionId, auctionName, auctionDescription, startPrice, blockDeadline, deedId, metadata }: any) => {

  const bg700 = useColorModeValue('gray.200', 'gray.700')

  const [disabled, setDisabled] = useState(false)
  const { account } = useEthers()
  const currendBid = useCurrentBid(auctionId);
  const { state: cancelState, send: cancelAcution } = useCancelAuction()

  const onCancelClick = () => {
    if (account) {
      cancelAcution(auctionId, { from: account })
      setDisabled(true)
    }
  }

  useEffect(() => {
    console.log("[AuctionCard] cancelState: ", cancelState);
    if (cancelState.status != 'Mining') {
      setDisabled(false)
    }
  }, [cancelState])

  const [sPrice, ...sUnits] = EtherAmount(startPrice)

  return (
    <VStack mb={5}>
      <HStack w={"full"} px={1}>
        <Box display={"flex"} flexDir={"column"} my={"1.5rem"} w={"full"}>
          <Heading fontSize={"calc(10px + 2vmin)"} fontWeight="md" lineHeight="6">
            #{auctionId} {auctionName}
          </Heading>
          <Text
            mt={1}
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {auctionDescription}
          </Text>
        </Box>
        <Box textAlign={"right"} w="full">

        </Box>
      </HStack>
      <Flex w={"full"} shadow="md">
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
          <Box w="sm" py={2} h={58} color={useColorModeValue("gray.800", "gray.200")}>
            <chakra.span>
              {metadata.description}
            </chakra.span>
          </Box>
        </Flex>

        <Box
          w="full">

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
            <Box textAlign={"right"} w={"full"}>
              <Heading fontSize={12}>
                {moment(new Date(blockDeadline.toNumber())).format('DD/MM/YYYY HH:mm:ss')}
              </Heading>
            </Box>
            <Flex
              direction={"row"}
              justifyContent="center"
              width={"full"}
            >
              <Spacer />
              <VStack>
                <Heading fontSize={"calc(12px + 2vmin)"} fontWeight="md">
                  Start Price
                </Heading>
                <Box p="4">
                  <Text fontSize="6xl">
                    {sPrice} <chakra.span fontSize={"xl"}>{sUnits}</chakra.span>
                  </Text>
                </Box>
              </VStack>
              <Spacer />
              <VStack>
                <Heading fontSize={"calc(12px + 2vmin)"} fontWeight="md">
                  Current Bid
                </Heading>
                <Box p="4">
                  <Text fontSize="6xl">
                    {currendBid ? formatEther(currendBid) : 0.0} <chakra.span fontSize={"xl"}>ETH</chakra.span>
                  </Text>
                </Box>
              </VStack>
              <Spacer />
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

              <Button
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
                Finalize Aucion
              </Button>

            </ButtonGroup>
          </Flex>
        </Box>
      </Flex>
    </VStack>
  )
}