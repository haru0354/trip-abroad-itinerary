import FormItineraryHome from "@/app/components/itineraryHome/FormItineraryHome";
import ListItineraryHome from "@/app/components/itineraryHome/ListItineraryHome";
import { getCurrentUserId } from "@/app/components/lib/getCurrentUser";
import { addItineraryHome } from "@/app/action/action-ItineraryHome";
import ListShare from "@/app/components/itineraryHome/ListShare";

const page = async () => {
  const currentUserId = (await getCurrentUserId()) ?? undefined;

  return (
    <>
      <FormItineraryHome
        buttonName="追加"
        userId={currentUserId}
        formAction={addItineraryHome}
      />
      <ListItineraryHome userId={currentUserId} />
      <ListShare userId={currentUserId} />
    </>
  );
};

export default page;
