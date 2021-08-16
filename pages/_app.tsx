import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";

const queryClient = new QueryClient();

// const SafeHydrate = ({ children }: any) => {
//   return (
//     <div suppressHydrationWarning>
//       {typeof window === "undefined" ? null : children}
//     </div>
//   );
// };

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
