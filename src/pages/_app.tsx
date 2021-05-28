import { AppProps } from "next/app";
import { AuthProvider } from "~/firebase/auth";
import { ChakraProvider } from "@chakra-ui/react";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function App({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
    </SafeHydrate>
  );
}

export default App;
