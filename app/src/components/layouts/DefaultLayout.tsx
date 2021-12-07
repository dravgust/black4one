import React, { ReactNode } from "react";
import { Link as RouteLink, To } from "react-router-dom";
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

type Props = {
    children?: ReactNode;
};

type NavLinkProps = {
    children?: ReactNode;
    href: To;
};

const Links = [
    { name: 'Balance', href: '/' },
    { name: 'Prices', href: '/prices' },
    { name: 'Block', href: '/block' },
    { name: 'Tokens', href: '/tokens' },
    { name: 'Send Ethers', href: '/send' },
    { name: 'Transactions', href: '/transactions' },
];

const NavLink = ({ children, href }: NavLinkProps) => (
    <RouteLink to={href}>
        <Box
            px={4}
            py={2}
            rounded={'xl'}
            border="1px solid transparent"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            maxWidth="120px"
            _hover={{
                textDecoration: 'none',
                borderColor: "blue.400",
            }}>
            {children}
        </Box>
    </RouteLink>
);

const ChakraLayout = ({ children }: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen: isAccountOpen, onOpen: onAccountOpen, onClose: onAccountClose } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box bg={useColorModeValue('white', 'gray.800')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                    <Box>black4one</Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                            bg={useColorModeValue('gray.200', 'gray.700')}
                            px={3}
                            rounded={'xl'}>
                            {Links.map((link) => (
                                <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
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
                                <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
            <Box h="100vh" bg={useColorModeValue('white', 'gray.800')} p={4}>{children}</Box>
        </>
    )
}

export default ChakraLayout