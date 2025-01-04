"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { addItinerary } from "../action/action-itinerary";
import FormMemoModal from "./memo/FormMemoModal";
import FormItineraryModal from "./itinerary/FormItineraryModal";
import ButtonImage from "@/app/components/ui/ButtonImage";

type FooterMenuProps = {
  itineraryHomeId: number;
  userId?: number | undefined;
};

const FooterMenu: React.FC<FooterMenuProps> = ({ itineraryHomeId, userId }) => {
  const path = usePathname();

  return (
    <div className="fixed z-[100] bottom-0 w-full h-16 bg-white border-t border-gray-300 shadow">
      <div className="max-w-lg flex h-full  justify-center items-center mx-auto ">
        <div className="w-full h-full">
          <Link href="/memorybook/dashboard">
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
