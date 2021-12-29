import React from "react";
import { Box, Container, Text, Stack, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box color={useColorModeValue('gray.700', 'gray.200')} position={"fixed"} left={0} bottom={0} right={0}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text color={"#2D3748"}>© 2021 dr.@vgust. All rights reserved</Text>
            </Container>
        </Box>
    )
}

export default Footer;