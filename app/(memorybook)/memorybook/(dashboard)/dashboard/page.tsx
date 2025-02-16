import { Suspense } from "react";

import { addTrip } from "@/app/(memorybook)/memorybook/action/actionTrip";
import FormTrip from "../../components/trip/FormTrip";
import ListTrip from "../../components/trip/ListTrip";
import ListShare from "../../components/user/list/ListShare";
import Loading from "@/app/Loading";

const page = () => {
  return (
    <>
      <Suspense fallback={<Loading message="作成した旅行のしおり" />}>
        <ListTrip />
      </Suspense>
      <FormTrip buttonName="追加" formAction={addTrip} />
      <Suspense fallback={<Loading message="共有リスト" />}>
        <ListShare />
      </Suspense>
    </>
  );
};

export default page;
