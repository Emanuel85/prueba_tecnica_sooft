
import { Roboto } from "next/font/google";
import ListCard from "@/Container";
import useWithListCard from "@/Container/components/useWithListCard";
import HeaderCustom from "@/Container/components/HeaderCustom";
import { Props } from "@/Container/components/type";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});


function Home({ handleCard, handleFocus, handleBlur }: Props) {
  return (
    <div className={`${roboto.className}`}>
      <HeaderCustom handleCard={handleCard} handleFocus={handleFocus} handleBlur={handleBlur} />
      {/*ACABA EL HEADER QUE BUSCA LAS CARD*/}
      {/* <HeaderCustom handleCard={handleCard} handleFocus={handleFocus} handleBlur={handleBlur} /> */}
      <ListCard />
    </div>
  );
}

export default useWithListCard(Home)