import React from "react";
import { Box, Text } from "@chakra-ui/react";

 /* eslint-disable @typescript-eslint/no-explicit-any */
export default function Logo(props: any) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        Logo
      </Text>
    </Box>
  );
}