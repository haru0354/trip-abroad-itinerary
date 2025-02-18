import Link from "next/link";

import FooterFormModal from "./FooterFormModal";
import ButtonImage from "@/app/components/ui/button/ButtonImage";

type FooterMenuProps = {
  tripId: number;
};

const FooterMenu: React.FC<FooterMenuProps> = ({ tripId }) => {

  return (
    <div className="fixed z-[100] bottom-0 w-full h-16 bg-white border-t border-itinerary-borderGray shadow">
      <div className="max-w-lg flex h-full  justify-center items-center mx-auto ">
        <div className="w-full h-full">
          <Link href="/memorybook/dashboard">
            <ButtonImage size="footer" icon="house">
              ホーム
            </ButtonImage>
          </Link>
        </div>
        <div className="w-full h-full">
          <Link href={`/memorybook/${tripId}/itinerary`}>
            <ButtonImage size="footer" icon="plane">
              旅程表
            </ButtonImage>
          </Link>
        </div>
        <div className="w-full h-full">
          <Link href={`/memorybook/${tripId}/memo`}>
            <ButtonImage size="footer" icon="pen">
              メモ帳
            </ButtonImage>
          </Link>
        </div>
        <FooterFormModal tripId={tripId} />
      </div>
    </div>
  );
};

export default FooterMenu;
