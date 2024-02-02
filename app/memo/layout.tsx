import { ReactNode } from "react";
import FooterMenu from "../components/FooterMenu";
import HeaderItinerary from "../components/HeaderItinerary";
import Footer from "../components/Footer";

type layoutChildren = {
    children: ReactNode
}

const layout: React.FC<layoutChildren> = ({children}) => {
    return (
    <>
      <HeaderItinerary />
      {children}
      <Footer />
      <FooterMenu />
    </>
  );
};

export default layout;
