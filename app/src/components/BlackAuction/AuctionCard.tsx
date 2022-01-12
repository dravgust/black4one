import React from "react"
import { chakra, Button, Flex, Box, useColorModeValue, ButtonGroup, Text } from "@chakra-ui/react"
import { toHttpPath } from "../../utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const AuctionCard = ({  deedId, metadata }: any) => {
  console.log("metadata", metadata)
  const bg700 = useColorModeValue('gray.200', 'gray.700')
  const bg800 = useColorModeValue('gray.300', 'gray.800')  
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
            DeedID: {deedId}
          </chakra.span>


            <Box p="4" background="gray.700" borderRadius="xl" width="300px" textAlign="center">
                <Text color="white" fontSize="8xl">
                    {0}
                </Text>
            </Box>

          <ButtonGroup variant='outline' spacing='1' pt={2} borderTop="1px" borderColor={bg800}>

            <Button
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
            </Button>

          </ButtonGroup>
        </Flex>
      </Box>
    </Flex>
  )
}