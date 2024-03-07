"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faPenToSquare,
  faHouse,
  faCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Button from "./ui/Button";
import FormMemoModal from "./memo/FormMemoModal";
import { usePathname } from "next/navigation";
import FormItineraryModal from "./itinerary/FormItineraryModal";
import { addItinerary } from "../action/action-itinerary";

type FooterMenuProps = {
  itineraryHomeId: number;
  userId?: number | undefined;
  itinerary?: Itinerary | null | undefined;
};

type Itinerary = {
  id: number;
  date: string;
  time: string;
  name: string;
  content?: string | null;
  hideContent?: string | null;
  isShowContent: boolean;
  url?: string | null;
  altText?: string | null;
};

const FooterMenu: React.FC<FooterMenuProps> = ({
  itineraryHomeId,
  userId,
  itinerary,
}) => {
  const path = usePathname();

  return (
    <div className="fixed z-50 bottom-0 w-full h-16 bg-white border-t border-gray-300 shadow">
      <div className="max-w-lg flex h-full  justify-center items-center mx-auto ">
        <div className="w-full h-full">
          <Link href="/travel_brochure/home">
            <Button className="btn-footer">
              <FontAwesomeIcon icon={faHouse} />
              <span className="text-gray-500">ホーム</span>
            </Button>
          </Link>
        </div>
        <div className="w-full h-full">
          <Link href={`/travel_brochure/${itineraryHomeId}/itinerary`}>
            <Button className="btn-footer">
              <FontAwesomeIcon icon={faPlane} />
              <span className="text-gray-500">旅程表</span>
            </Button>
          </Link>
        </div>
        <div className="w-full h-full">
          <Link href={`/travel_brochure/${itineraryHomeId}/memo`}>
            <Button className="btn-footer">
              <FontAwesomeIcon icon={faPenToSquare} />
              <span className="text-gray-500">メモ帳</span>
            </Button>
          </Link>
        </div>
        {path === `/travel_brochure/${itineraryHomeId}/memo` ? (
          <FormMemoModal
            itineraryHomeId={itineraryHomeId}
            buttonName="追加"
            buttonName2="メモを追加"
          />
        ) : path === `/travel_brochure/${itineraryHomeId}/itinerary` ? (
          <FormItineraryModal
            itineraryHomeId={itineraryHomeId}
            buttonName="追加"
            buttonName2="旅程を追加"
            userId={userId}
            itinerary={itinerary}
            formAction={addItinerary}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FooterMenu;
