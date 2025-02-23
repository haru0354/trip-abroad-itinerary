import { Suspense } from "react";

import { addTrip } from "@/app/(memorybook)/memorybook/action/actionTrip";
import FormTrip from "../../components/trip/FormTrip";
import ListTrip from "../../components/trip/ListTrip";
import ListShare from "../../components/user/list/ListShare";
import Loading from "@/app/Loading";
import Modal from "@/app/components/ui/modal/Modal";

const page = () => {
  return (
    <>
      <Suspense fallback={<Loading message="作成した旅行のしおり" />}>
        <ListTrip />
      </Suspense>
      <Modal maxWidth="max-w-[620px]" buttonName="旅行のしおりの追加" id="trip">
        <FormTrip buttonName="追加" formAction={addTrip} modalId="trip"/>
      </Modal>
      <Suspense fallback={<Loading message="共有リスト" />}>
        <ListShare />
      </Suspense>
    </>
  );
};

export default page;
