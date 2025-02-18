"use client";

import { usePathname } from "next/navigation";

import { addMemo } from "../../../action/actionMemo";
import { addItinerary } from "../../../action/actionItinerary";
import FormMemoModal from "../../memo/FormMemoModal";
import FormItineraryModal from "../../itinerary/FormItineraryModal";

type FooterFormModalProps = {
  tripId: number;
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
      ) : null}
    </>
  );
};

export default FooterFormModal;
