import { Suspense } from "react";

import FormItineraryHome from "@/app/components/itineraryHome/FormItineraryHome";
import ListItineraryHome from "@/app/components/itineraryHome/ListItineraryHome";
import { getCurrentUserId } from "@/app/components/lib/getCurrentUser";
import { addItineraryHome } from "@/app/action/action-ItineraryHome";
import ListShare from "@/app/components/itineraryHome/ListShare";
import Loading from "@/app/loading";

const page = async () => {
  const currentUserId = (await getCurrentUserId()) ?? undefined;

  return (
    <>
      <Suspense fallback={<Loading message="作成した旅行のしおり" />}>
        <ListItineraryHome userId={currentUserId} />
      </Suspense>
      <FormItineraryHome
        buttonName="追加"
        userId={currentUserId}
        formAction={addItineraryHome}
      />
      <Suspense fallback={<Loading message="共有リスト" />}>
        <ListShare userId={currentUserId} />
      </Suspense>
    </>
  );
};

export default page;
