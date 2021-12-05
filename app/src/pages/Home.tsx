import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Flex, Box, Heading, Spacer, Grid, GridItem } from "@chakra-ui/react";
import AccountButton from "../components/account/AccountButton";
import AccountModal from "../components/account/AccountModal";

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
        <> 
          <Flex>
                    <Box p="4">
                        <Heading size="md"></Heading>
                    </Box>
                    <Spacer />
                    <Box p="2">
                        <AccountButton handleOpenModal={onOpen} />
                        <AccountModal isOpen={isOpen} onClose={onClose} />     
                    </Box>
                </Flex>
                <Grid h="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)" gap={6}>
                    <GridItem rowSpan={2} colSpan={1} />
                    <GridItem rowSpan={2} colSpan={2}>
                        
                    </GridItem>
                    <GridItem rowSpan={2} colSpan={1} />
                </Grid>  
        </>
    )
}

export default Home;