
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SOOF Prueba Técnica</title>
        <meta name="description" content="SPA de prueba técnica de SOOFT" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
