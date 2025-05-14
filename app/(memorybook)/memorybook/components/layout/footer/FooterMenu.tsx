import FooterFormModal from "./FooterFormModal";
import ButtonImageLink from "@/app/components/ui/button/ButtonImageLink";

type FooterMenuProps = {
  tripId: number;
};

const FooterMenu: React.FC<FooterMenuProps> = ({ tripId }) => {
  return (
    <div className="fixed z-[100] bottom-0 w-full h-16 bg-white border-t border-itinerary-borderGray shadow">
      <div className="max-w-lg flex h-full  justify-center items-center mx-auto ">
        <div className="w-full h-full">
          <ButtonImageLink
            href="/memorybook/dashboard"
            size="footer"
            icon="house"
          >
            ホーム
          </ButtonImageLink>
        </div>
        <div className="w-full h-full">
          <ButtonImageLink
            href={`/memorybook/${tripId}/itinerary`}
            size="footer"
            icon="plane"
          >
            旅程表
          </ButtonImageLink>
        </div>
        <div className="w-full h-full">
          <ButtonImageLink
            href={`/memorybook/${tripId}/memo`}
            size="footer"
            icon="pen"
          >
            メモ帳
          </ButtonImageLink>
        </div>
        <FooterFormModal tripId={tripId} />
      </div>
    </div>
  );
};

export default FooterMenu;
