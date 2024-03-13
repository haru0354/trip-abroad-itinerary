import FormItineraryHome from "@/app/components/itineraryHome/FormItineraryHome";
import ListItineraryHome from "@/app/components/itineraryHome/ListItineraryHome";
import getCurrentUser from "@/app/action/getCurrentUser";
import { addItineraryHome } from "@/app/action/action-ItineraryHome";
import ListShare from "@/app/components/itineraryHome/ListShare";

const page = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  return (
    <>
      <FormItineraryHome
        buttonName="追加"
        userId={userId}
        formAction={addItineraryHome}
      />
      <ListItineraryHome userId={userId} />
      <ListShare  userId={userId} />
    </>
  );
};

export default page;
