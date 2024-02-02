import Link from "next/link";
import HeaderItinerary from "./components/HeaderItinerary";
import FooterMenu from "./components/FooterMenu";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Footer />
      <FooterMenu />
    </>
  );
}
