import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
//import { Box } from "@chakra-ui/react"
import { Container, Section, SectionRow } from '../components/base/base'
import { Title } from '../typography/Title'

const BlackFaucet = () => {
    return (
        <DefaultLayout>
            <Container>
                <Section>
                    <SectionRow>
                        <Title>Faucet</Title>
                    </SectionRow>

                </Section>
            </Container>
        </DefaultLayout>
    );
}
export default BlackFaucet;