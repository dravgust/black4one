import React, { ReactNode } from "react";
import { Link, To } from "react-router-dom";
import { Flex, Box, Spacer, Heading, Button, Grid, GridItem } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import AccountButton from "../account/AccountButton";
import AccountModal from "../account/AccountModal";

type Props = {
    children?: ReactNode;
};

type MenuItemsProps = {
    children?: ReactNode;
    href: To;
};

const MenuItems = ({ children, href }: MenuItemsProps) => (
    <Link to={href}>
        <Button bg="gray.700" color="white" borderRadius="xl" border="1px solid transparent" fontSize="md" m="1px" px={3}
            _hover={{
                borderColor: "blue.400"
            }}>
            {children}
        </Button>
    </Link>
);

const ChakraLayout = ({ children }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex flexDirection="column" bg="gray.800" h="100vh" justifyContent="start">
            <Flex p="4">
                <Box>
                    <Heading size="md" color="gray.400"></Heading>
                </Box>
                <Spacer />
                <Grid templateRows="repeat(2, 1fr)" gap={4} h="100%">
                    <GridItem>
                        {/* Desktop */}
                        <Flex color="white" bg="gray.700" borderRadius="xl">
                            <MenuItems href="/">Balance</MenuItems>
                            <MenuItems href="/prices">Prices</MenuItems>
                            <MenuItems href="/block">Block</MenuItems>
                            <MenuItems href="/tokens">Tokens</MenuItems>
                            <MenuItems href="/send">Send Ether</MenuItems>
                            <MenuItems href="/transactions">Transactions</MenuItems>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        {children}
                    </GridItem>
                </Grid>
                <Spacer />
                <Box>
                    <AccountButton handleOpenModal={onOpen} />
                    <AccountModal isOpen={isOpen} onClose={onClose} />
                </Box>
            </Flex>
        </Flex>
    )
}

export default ChakraLayout