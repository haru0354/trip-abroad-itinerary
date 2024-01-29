import { ReactNode } from "react";
import FooterMenu from "../components/FooterMenu";
import HeaderItinerary from "../components/HeaderItinerary";

type layoutChildren = {
    children: ReactNode
}

const layout: React.FC<layoutChildren> = ({children}) => {
    return (
    <>
      <HeaderItinerary />
      {children}
      <FooterMenu />
    </>
  );
};

export default layout;
