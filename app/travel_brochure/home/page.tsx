import FormItineraryHome from "@/app/components/itineraryHome/FormItineraryHome";
import ListItineraryHome from "@/app/components/itineraryHome/ListItineraryHome";
import getCurrentUser from "@/app/action/getCurrentUser";
import { addItineraryHome } from "@/app/action/action-ItineraryHome";

const page = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  return (
    <>
      <ListItineraryHome userId={userId} />
      <FormItineraryHome
        buttonName="追加"
        userId={userId}
        formAction={addItineraryHome}
      />
    </>
  );
};

export default page;
