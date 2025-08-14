
import { Roboto } from "next/font/google";
import ListCard from "@/Container";
import useWithListCard from "@/Container/components/useWithListCard";
import HeaderCustom from "@/Container/components/HeaderCustom";
import { Props } from "@/Container/components/type";
import styles from '../styles/components/index.module.scss'
import type { Metadata } from "next";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "SOOFT Prueba Técnica",
  description: "SPA de prueba técnica de SOOFT",
  icons: {
    icon: "/favicon.ico",
  },
};


function Home({ handleCard, handleFocus, handleBlur, handleDelete, handleEdit }: Props) {
  return (
    <div className={`${roboto.className} ${styles.container_index}`}>
      <HeaderCustom handleCard={handleCard} handleFocus={handleFocus} handleBlur={handleBlur} />
      <ListCard handleDelete={handleDelete} handleEdit={handleEdit} />
    </div >
  );
}

export default useWithListCard(Home)