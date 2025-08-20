
import ModalCustom from "@/Container/components/ModalCustom";
import { useStore } from "@/store/useStore";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const { modal } = useStore();
  return (
    <>
      <Head>
        <title>SOOF Prueba Técnica</title>
        <meta name="description" content="SPA de prueba técnica de SOOFT" />
      </Head>
      <Component {...pageProps} />
      <ModalCustom
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        title={modal.title}
        title_secondary={modal.title_secondary}
        buttonFooter={modal.buttonFooter}
      />
    </>
  );
}
