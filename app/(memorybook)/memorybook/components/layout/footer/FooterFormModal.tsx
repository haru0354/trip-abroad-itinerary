"use client";

import { usePathname } from "next/navigation";

import { addMemo } from "../../../action/actionMemo";
import { addItinerary } from "../../../action/actionItinerary";
import FormMemoModal from "../../memo/FormMemoModal";
import FormItineraryModal from "../../itinerary/FormItineraryModal";
import ButtonImage from "@/app/components/ui/button/ButtonImage";

type FooterFormModalProps = {
  tripId: string;
};

const FooterFormModal: React.FC<FooterFormModalProps> = ({ tripId }) => {
  const path = usePathname();

  return (
    <>
      {path === `/memorybook/${tripId}/memo` ? (
        <FormMemoModal
          tripId={tripId}
          buttonName="メモを追加"
          formAction={addMemo}
        />
      ) : path === `/memorybook/${tripId}/itinerary` ? (
        <FormItineraryModal
          tripId={tripId}
          buttonName="旅程を追加"
          formAction={addItinerary}
        />
      ) : (
        <div className="w-full h-full">
          <ButtonImage
            icon="plus"
            size="footer"
            type="button"
            className="cursor-not-allowed opacity-60"
          >
            追加
          </ButtonImage>
        </div>
      )}
    </>
  );
};

export default FooterFormModal;
