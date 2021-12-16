import React, { ReactNode, useEffect } from "react";
import { Link as RouteLink, To, useLocation } from "react-router-dom";
import {
    Box, Flex, HStack, Stack, Button,
    IconButton,
    useDisclosure, useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import AccountButton from "../account/AccountButton";
import AccountModal from "../account/AccountModal";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
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
            py={2}
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { pathname } = useLocation()

    const bg700 = useColorModeValue('gray.200', 'gray.700')

    useEffect(() => {
        console.log(`[DefaultLayout] mount ${pathname}`);
        return () => {
            console.log(`[DefaultLayout] unmount ${pathname}`);
        };
    }, [pathname])

    return (
        <>
            <Box px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box textTransform="uppercase" fontWeight="bold">black4one</Box>
                        <HStack
                            as={'nav'}
                            spacing={1}
                            display={{ base: 'none', md: 'flex' }}
                            bg={bg700}
                            px={3}
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
                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink
                                    active={pathname === link.href}
                                    key={link.name} href={link.href}>{link.name}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
            <Box h="100vh"><Box>{children}</Box></Box>
        </>
    )
}

export default DefaultLayout