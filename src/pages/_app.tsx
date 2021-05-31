import { AppProps } from "next/app";
import { AuthProvider } from "~/firebase/auth";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

const breakpoints = createBreakpoints({
  sm: "23em", // Small Phones
  md: "30em", // Larger Phones
  lg: "62em", // Tablet
  xl: "80em", // Laptop
  "2xl": "96em", // Big screen
})

const theme = extendTheme({ breakpoints })

function App({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
    </SafeHydrate>
  );
}

export default App;
