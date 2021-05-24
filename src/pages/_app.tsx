import { AppProps } from "next/app";
import { AuthProvider } from "~/firebase/auth" // Had to modify this. Not sure why
import { ChakraProvider } from "@chakra-ui/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
