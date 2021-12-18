import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
import {
    Box,
    useColorModeValue,
    Heading,
    Text
} from "@chakra-ui/react";

const BlackFaucet = () => {
    return (
        <DefaultLayout>
             <Box py={[0, 5]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Faucet
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                ...
              </Text>
            </Box>
            
        </DefaultLayout>
    );
}
export default BlackFaucet;