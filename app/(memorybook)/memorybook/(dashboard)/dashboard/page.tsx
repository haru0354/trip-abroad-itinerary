import { Suspense } from "react";
import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import { addTrip } from "@/app/(memorybook)/memorybook/action/actionTrip";
import FormItineraryHome from "../../components/dashboard/form/FormItineraryHome";
import ListItineraryHome from "../../components/dashboard/list/ListItineraryHome";
import ListShare from "../../components/dashboard/list/ListShare";
import Loading from "@/app/Loading";

const page = async () => {
  const currentUserId = (await getCurrentUserId()) ?? undefined;

  return (
    <>
      <Suspense fallback={<Loading message="作成した旅行のしおり" />}>
        <ListItineraryHome userId={currentUserId} />
      </Suspense>
      <FormItineraryHome
        buttonName="追加"
        formAction={addTrip}
      />
      <Suspense fallback={<Loading message="共有リスト" />}>
        <ListShare userId={currentUserId} />
      </Suspense>
    </>
  );
};

export default page;
