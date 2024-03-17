"use client";

import Link from "next/link";
import FormMemoModal from "./memo/FormMemoModal";
import { usePathname } from "next/navigation";
import FormItineraryModal from "./itinerary/FormItineraryModal";
import { addItinerary } from "../action/action-itinerary";
import ButtonImage from "./ui/ButtonImage";

type FooterMenuProps = {
  itineraryHomeId: number;
  userId?: number | undefined;
};

const FooterMenu: React.FC<FooterMenuProps> = ({ itineraryHomeId, userId }) => {
  const path = usePathname();

  return (
    <div className="fixed z-50 bottom-0 w-full h-16 bg-white border-t border-gray-300 shadow">
      <div className="max-w-lg flex h-full  justify-center items-center mx-auto ">
        <div className="w-full h-full">
          <Link href="/memorybook/home">
            <ButtonImage size="footer" icon="house">
              ホーム
            </ButtonImage>
          </Link>
        </div>
        <div className="w-full h-full">
          <Link href={`/memorybook/${itineraryHomeId}/itinerary`}>
            <ButtonImage size="footer" icon="plane">
              旅程表
            </ButtonImage>
          </Link>
        </div>
        <div className="w-full h-full">
          <Link href={`/memorybook/${itineraryHomeId}/memo`}>
            <ButtonImage size="footer" icon="pen">
              メモ帳
            </ButtonImage>
          </Link>
        </div>
        {path === `/memorybook/${itineraryHomeId}/memo` ? (
          <FormMemoModal
            itineraryHomeId={itineraryHomeId}
            buttonName="追加"
            buttonName2="メモを追加"
          />
        ) : path === `/memorybook/${itineraryHomeId}/itinerary` ? (
          <FormItineraryModal
            itineraryHomeId={itineraryHomeId}
            buttonName="追加"
            buttonName2="旅程を追加"
            userId={userId}
            formAction={addItinerary}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FooterMenu;
