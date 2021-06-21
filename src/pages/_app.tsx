import { AppProps } from "next/app";
import { AuthProvider } from "~/firebase/auth";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { useEffect } from "react";

const breakpoints = createBreakpoints({
  sm: "23em", // Small Phones
  md: "30em", // Larger Phones
  lg: "62em", // Tablet
  xl: "80em", // Laptop
  "2xl": "96em", // Big screen
});

const theme = extendTheme({ breakpoints });

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {}, []);
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
