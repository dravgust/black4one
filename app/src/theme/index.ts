import { extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';

type Props = {
  a?:string
};
export default extendTheme({
  styles: {
    global: (props:Props) => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.800')(props),
        lineHeight: 'base',
      }
    }),
  },
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
});