import { AppProps } from "next/dist/next-server/lib/router/router";
import * as React from "react";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
