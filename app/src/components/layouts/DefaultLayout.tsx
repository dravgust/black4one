import React, { ReactNode, useEffect } from "react";
import { Link as RouteLink, To, useLocation } from "react-router-dom";
import {
    Box, Flex, HStack, Stack, Button, SimpleGrid, GridItem,
    useDisclosure, useColorMode,
    useColorModeValue, Container, Text
} from '@chakra-ui/react';
import AccountButton from "../account/AccountButton";
import AccountModal from "../account/AccountModal";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { dataAttr } from "@chakra-ui/utils";

type Props = {
    children?: ReactNode;
};

type NavLinkProps = {
    children?: ReactNode;
    href: To;
    active: boolean;
};

const Links = [
    { name: 'Balance', href: '/' },
    { name: 'Prices', href: '/prices' },
    { name: 'Block', href: '/block' },
    { name: 'Tokens', href: '/tokens' },
    { name: 'Faucet', href: '/faucet' },
    { name: 'Send Ethers', href: '/send' },
    { name: 'Transactions', href: '/transactions' },
    { name: 'Auction', href: '/auction' },
];

const NavLink = ({ children, href, active }: NavLinkProps) => (
    <RouteLink to={href}>
        <Box
            px={4}
            py={1.5}
            height={"40px"}
            rounded={'xl'}
            borderWidth={"1px"}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            maxWidth="130px"
            fontWeight={"semibold"}
            _hover={{
                textDecoration: 'none',
                borderColor: "blue.400",
            }}
            data-active={dataAttr(active)}
            _active={{
                bg: useColorModeValue('gray.300', 'gray.800')
            }}>
            {children}
        </Box>
    </RouteLink>
);

/*const Colors = {
    main_bg: '#20232a',
    post_bg: '#303135',
    post_text_bg: '#20232a',
}*/

const DefaultLayout = ({ children }: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen: isAccountOpen, onOpen: onAccountOpen, onClose: onAccountClose } = useDisclosure();
    const { pathname } = useLocation()

    const gray200gray700 = useColorModeValue('gray.200', 'gray.700')

    useEffect(() => {
        console.log(`[DefaultLayout] mount ${pathname}`);
        return () => {
            console.log(`[DefaultLayout] unmount ${pathname}`);
        };
    }, [pathname])

    return (
        <>
            <Box pos="fixed" w="100vw" zIndex={9999} bg={useColorModeValue('white', 'gray.800')}>
                <Flex h={16} px={5} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box textTransform="uppercase" fontWeight="bold">black4one</Box>
                        <HStack
                            as={'nav'}
                            spacing={0.5}
                            display={{ base: 'none', md: 'flex' }}
                            bg={gray200gray700}
                            rounded={'xl'}>
                            {Links.map((link) => (
                                <NavLink active={pathname === link.href} key={link.name} href={link.href}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button bg={useColorModeValue('white', 'gray.800')} rounded={"xl"}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue('gray.200', 'gray.700'),
                                }} onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            <AccountButton handleOpenModal={onAccountOpen} />
                            <AccountModal isOpen={isAccountOpen} onClose={onAccountClose} />
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
            <Box h="100vh" pt={16}>
                <SimpleGrid
                    display={{ base: "initial", md: "grid" }}
                    columns={{ md: 5 }}
                    spacing={{ md: 6 }}
                >
                    <GridItem colSpan={{ md: 1 }}>

                    </GridItem>
                    <GridItem px={5} mt={[5, null, 0]} colSpan={{ md: 3 }}>
                        {children}
                    </GridItem>
                    <GridItem colSpan={{ md: 1 }}>

                    </GridItem>
                </SimpleGrid>
                <Box
                color={useColorModeValue('gray.700', 'gray.200')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>© 2021 dr.@vgust. All rights reserved</Text>
                </Container>
            </Box>
            </Box>       
        </>
    )
}

export default DefaultLayout