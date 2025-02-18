import Modal from "@/app/components/ui/modal/Modal";
import FormItinerary from "./FormItinerary";

import type { ItineraryFormState } from "../../types/formState";

type FormItineraryModalProps = {
  tripId: number;
  buttonName: string;
  formAction: (
    state: ItineraryFormState,
    data: FormData
  ) => Promise<ItineraryFormState>;
};

const FormItineraryModal: React.FC<FormItineraryModalProps> = ({
  tripId,
  buttonName,
  formAction,
}) => {
  return (
    <Modal
      maxWidth="max-w-[620px]"
      buttonName="追加"
      iconButton={true}
      id="itinerary"
    >
      <FormItinerary
        tripId={tripId}
        buttonName={buttonName}
        formAction={formAction}
        modalId="itinerary"
      />
    </Modal>
  );
};

export default FormItineraryModal;
