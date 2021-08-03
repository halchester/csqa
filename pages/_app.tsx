import { AppProps } from "next/dist/next-server/lib/router/router";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const SafeHydrate = ({ children }: any) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <SafeHydrate>
          <Component {...pageProps} />
        </SafeHydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
