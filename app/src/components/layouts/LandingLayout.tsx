import React from "react";
import { Flex } from "@chakra-ui/react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

 /* eslint-disable @typescript-eslint/no-explicit-any */
const LandingLayout = (props: any) => {
    return (
        <Flex
            direction={"column"}
            align={"center"}
            maxW={{ xl: "1200px" }}
            m="0 auto"
            {...props}
        >
            <Header/>
            {props.children}
            <Footer/>
        </Flex>
    )
}

export default LandingLayout;