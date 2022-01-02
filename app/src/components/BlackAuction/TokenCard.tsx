import React, { useState, useEffect } from "react"
import { chakra, Button, Flex, Box, useColorModeValue, ButtonGroup } from "@chakra-ui/react"
import { toHttpPath } from "../../utils";
import { DeedProperties } from "../../models/DeedRepository"
import { useContractMethod } from "../../hooks";
import { useEthers } from "@usedapp/core"
import Config from "../../config";
//import { TokenAuction } from "../../models/AuctionRepository"

type CreateAucionProps = {
  deedId: number,
};

export const CreateAucion = ({deedId}: CreateAucionProps) => {

  const bg700 = useColorModeValue('gray.200', 'gray.700')
  const bg800 = useColorModeValue('gray.300', 'gray.800')

  const { account } = useEthers()
  const [disabled, setDisabled] = useState(false)
  const { state: transferDeedState, send: transferDeed } = useContractMethod("transferFrom")

  function onClick() {
    if(account){
      setDisabled(true)
      transferDeed(account, Config.AUCTIONREPOSITORY_ADDRESS, deedId, { from: account })
    }
  }

  useEffect(() => {
    console.log("[CreateAucion] state: ", transferDeedState);
    if (transferDeedState.status != 'Mining') {  
      setDisabled(false)
    }
  }, [transferDeedState])

  return (
    <Button
    onClick={onClick}
    disabled={!account || disabled}
    bg={bg800}
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
    Create Auction
  </Button>
  )
}

type TokenCardProps = {
  index: number,
  photo: TokenCardImage,
};

type TokenCardImage = {
  width: number,
  height: number,
  src: string,
  deedId: number
}

export const TokenCard = ({ photo }: TokenCardProps) => {

  const bg700 = useColorModeValue('gray.200', 'gray.700')
  const bg800 = useColorModeValue('gray.300', 'gray.800')

  const [metadata, setMetadata] = useState<DeedProperties>(DeedProperties.Default)
  
  useEffect(() => {
    async function fetchSource() {
      try {
        const response = await fetch(toHttpPath(photo.src));
        if (response.ok) {
          const { properties: { name, description, image } } = await response.json();
          setMetadata(new DeedProperties(name, description, toHttpPath(image)))
        } else {
          const errorMessage = await response.text()
          console.log("Error:", errorMessage)
        }
      } catch (error) {
        console.log("Error:", error)
      }
    }
    fetchSource()
  }, [])


  return (
    <Flex mb={1}>
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
          roundedLeft={"xl"}
          shadow="md"
          bgSize="cover"
          bgPos="center"
          style={{
            backgroundImage:
              `url(${metadata.image})`,
          }}
        ></Box>

        <Box
          //w={{ base: 56, md: 64 }}
          w="sm"
          bg={"transparent"}
          mt={-10}
          shadow="lg"
          //rounded="lg"
          roundedBottomLeft={"xl"}
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
            {metadata.name}
          </chakra.h3>
        </Box>
      </Flex>

      <Box      
        roundedRight={"xl"}
        w="full"
        border="1px"
        borderStyle="solid"
        borderColor={useColorModeValue('gray.100', 'gray.600')}
        p={1} 
        shadow="md">

        <Flex
          alignItems="start"
          direction={"column"}
          justifyContent="space-between"
          py={2}
          px={3}
          bg={useColorModeValue("gray.200", "gray.700")}
          w="full"
          roundedRight="xl"
          h='full'
        >
          <chakra.span
            color={useColorModeValue("gray.800", "gray.200")}
          >
            {metadata.description}
          </chakra.span>
          <chakra.span
            color={useColorModeValue("gray.800", "gray.200")}
          >
            DeedID: {photo.deedId}
          </chakra.span>

          <ButtonGroup variant='outline' spacing='1' pt={2} borderTop="1px" borderColor={bg800}>

           <CreateAucion deedId={photo.deedId}/>

            <chakra.button
              bg={bg800}
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
            </chakra.button>

          </ButtonGroup>
        </Flex>
      </Box>
    </Flex>
  )
}