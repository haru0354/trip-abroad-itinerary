import Modal from "@/app/components/ui/modal/Modal";
import FormMemo from "./FormMemo";

import type { MemoFormState } from "../../types/formState";

type FormItineraryModalProps = {
  tripId: number;
  buttonName: string;
  formAction: (state: MemoFormState, data: FormData) => Promise<MemoFormState>;
};

const FormMemoModal: React.FC<FormItineraryModalProps> = ({
  tripId,
  buttonName,
  formAction,
}) => {
  return (
    <Modal
      maxWidth="max-w-[620px]"
      buttonName="追加"
      iconButton={true}
      id="memo"
    >
      <FormMemo
        tripId={tripId}
        buttonName={buttonName}
        formAction={formAction}
        modalId="memo"
      />
    </Modal>
  );
};

export default FormMemoModal;
