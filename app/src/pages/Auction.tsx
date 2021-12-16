import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
//import { Box } from "@chakra-ui/react"
import { Container, Section, SectionRow } from '../components/base/base'
import { Title } from '../typography/Title'
//import useAuctionRepository from '../models/useAuctionRepository'
//import { Flex, Text, Button, Box } from "@chakra-ui/react";
//import useDeedRepository from "../models/useDeedRepository";
import { DeedRepositoryForm } from "../components/BlackAuction/DeedRepositoryForm";

const Auction = () => {

    //const { stateGetCount, create } = useAuctionRepository();
    //const { create: createDeed } = useDeedRepository();
    //console.log(Date.now() + 1000 * 60 * 3); 3 min
    return (
        <DefaultLayout>
            <Container>
                <Section>
                    <SectionRow>
                        <Title>Auction</Title>
                    </SectionRow>

                    <DeedRepositoryForm/>

                    {/*<Flex direction="row" align="center" mt="4" justifyContent={'space-between'}>
                        <Flex direction="column">
                            <Box p="4" mb={2} background="gray.700" borderRadius="xl" width="300px" height="200px" textAlign="center">
                                <Text color={"white"} fontSize={"8xl"}>
                                    
                                </Text>
                            </Box>
                            <Button colorScheme="teal" size="lg" onClick={() => createDeed("https://www.pixelstalk.net/wp-content/uploads/2016/08/Awesome-Sunset-Beaches-Images.jpg")}>
                                Create Deed
                            </Button>
                        </Flex>
                        <Flex direction="column">
                            <Box p="4" mb={2} background="gray.700" borderRadius="xl" width="300px" height="200px" textAlign="center">
                                <Text color={"white"} fontSize={"8xl"}>
                                    {stateGetCount?.toNumber()}
                                </Text>
                            </Box>
                            <Button colorScheme="teal" size="lg" onClick={() => create(1, "test auction", "test metadata", 1, (Date.now() / 1000) + 60 * 5)}>
                                Create Auction
                            </Button>
                        </Flex>
    </Flex>*/}
                </Section>
            </Container>
        </DefaultLayout>
    );
}
export default Auction;