"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { addItinerary } from "../../action/actionItinerary";
import { addMemo } from "../../action/actionMemo";
import FormMemoModal from "../memo/FormMemoModal";
import FormItineraryModal from "../itinerary/FormItineraryModal";
import ButtonImage from "@/app/components/ui/ButtonImage";

type FooterMenuProps = {
  tripId: number;
  userId?: number | undefined;
};

const FooterMenu: React.FC<FooterMenuProps> = ({ tripId }) => {
  const path = usePathname();

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
        {path === `/memorybook/${tripId}/memo` ? (
          <FormMemoModal
            tripId={tripId}
            buttonName="メモを追加"
            iconButton={true}
            formAction={addMemo}
          />
        ) : path === `/memorybook/${tripId}/itinerary` ? (
          <FormItineraryModal
            tripId={tripId}
            buttonName="旅程を追加"
            iconButton={true}
            formAction={addItinerary}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FooterMenu;
