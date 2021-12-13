import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
//import { Box } from "@chakra-ui/react"
import { Container, Section, SectionRow } from '../components/base/base'
import { Title } from '../typography/Title'

import { AuctionRepository } from '../models/AuctionRepository'

const Auction = () => {

    const repo = new AuctionRepository();
    repo.setAccount("test");

    return (
        <DefaultLayout>
            <Container>
                <Section>
                    <SectionRow>
                        <Title>Auction</Title>
                    </SectionRow>

                </Section>
            </Container>
        </DefaultLayout>
    );
}
export default Auction;