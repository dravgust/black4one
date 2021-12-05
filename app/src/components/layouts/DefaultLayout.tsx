import React, { ReactNode } from "react";
import { Flex, Box, Spacer, Heading, Grid, GridItem } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import AccountButton from "../account/AccountButton";
import AccountModal from "../account/AccountModal";

type Props = {
  children?: ReactNode;
};

const ChakraLayout = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex flexDirection="column" justifyContent="center" h="100vh" bg="gray.800">
      <Flex>
        <Box p="4">
          <Heading size="md" color="gray.400">black4one</Heading>
        </Box>
        <Spacer />
        <Box p="4">
          <AccountButton handleOpenModal={onOpen} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </Box>
      </Flex>
      <Grid h="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem rowSpan={2} colSpan={1} />
        <GridItem rowSpan={2} colSpan={2}>
          {children}
        </GridItem>
        <GridItem rowSpan={2} colSpan={1} />
      </Grid>
    </Flex>
  )
}

export default ChakraLayout