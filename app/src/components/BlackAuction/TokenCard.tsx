import React, { useState, useEffect } from "react"
import { chakra, Flex, Box, useColorModeValue, ButtonGroup } from "@chakra-ui/react"
import { toHttpPath } from "../../utils";
import { TokenProperties } from "../../models/DeedRepository"

type TokenCardProps = {
  index: number,
  photo: TokenCardImage,
};

type TokenCardImage = {
  title: string,
  src: string
}

export const TokenCard = ({ photo }: TokenCardProps) => {
  const [metadata, setMetadata] = useState<TokenProperties>(TokenProperties.Default)

  useEffect(() => {
    async function fetchSource() {
      try {
        const response = await fetch(toHttpPath(photo.src));
        if (response.ok) {
          const { properties: { name, description, image } } = await response.json();
          setMetadata(new TokenProperties(name, description, toHttpPath(image)))
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
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="xs"
      mx={1}
      //mx="auto"
      mb={5}
    >
      <Box
        bg="gray.300"
        h={64}
        w="full"
        rounded="lg"
        shadow="md"
        bgSize="cover"
        bgPos="center"
        style={{
          backgroundImage:
            `url(${metadata.image})`,
        }}
      ></Box>

      <Box
        w={{ base: 56, md: 64 }}
        bg={useColorModeValue("white", "gray.800")}
        mt={-10}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <chakra.h3
          py={2}
          textAlign="center"
          fontWeight="bold"
          textTransform="uppercase"
          color={useColorModeValue("gray.800", "white")}
          letterSpacing={1}
        >
          {metadata.name}
        </chakra.h3>

        <Flex
          alignItems="center"
          direction={"column"}
          justifyContent="space-between"
          py={2}
          px={3}
          bg={useColorModeValue("gray.200", "gray.700")}
        >
          <chakra.span
            fontWeight="bold"
            color={useColorModeValue("gray.800", "gray.200")}
          >
            {metadata.description}
          </chakra.span>

          <ButtonGroup variant='outline' spacing='6' pt={2}>

            <chakra.button
              bg="gray.800"
              fontSize="xs"
              color="white"
              px={2}
              py={1}
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: useColorModeValue("gray.700", "gray.600"),
              }}
              _focus={{
                bg: useColorModeValue("gray.700", "gray.600"),
                outline: "none",
              }}
            >
              Transfer
            </chakra.button>
            <chakra.button
              bg="gray.800"
              fontSize="xs"
              color="white"
              px={2}
              py={1}
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: useColorModeValue("gray.700", "gray.600"),
              }}
              _focus={{
                bg: useColorModeValue("gray.700", "gray.600"),
                outline: "none",
              }}
            >
              Create Auction
            </chakra.button>
          </ButtonGroup>
        </Flex>
      </Box>
    </Flex>
  )
}