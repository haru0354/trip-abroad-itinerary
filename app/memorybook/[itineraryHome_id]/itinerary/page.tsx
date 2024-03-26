import { addItinerary } from "@/app/action/action-itinerary";
import getCurrentUser from "@/app/action/getCurrentUser";

import ListItinerary from "@/app/components/itinerary/ListItinerary";
import FormItineraryModal from "@/app/components/itinerary/FormItineraryModal";
import { getItineraryHome } from "@/app/components/lib/MemoryBookService";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const itineraryHome = await getItineraryHome(params.itineraryHome_id, "itineraries");
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  return (
    <>
      <h2 className="bg-white mt-0 md:mt-8 p-2 text-lg md:text-2xl text-center text-black border-b border-solid border-blue-800">
        {itineraryHome?.name}
      </h2>
      <ListItinerary
        itineraries={itineraryHome?.itineraries}
        itineraryHomeId={itineraryHome?.id}
      />
      <FormItineraryModal
        itineraryHomeId={itineraryHome?.id}
        buttonName="旅程を追加"
        buttonName2="旅程を追加"
        userId={userId}
        formAction={addItinerary}
      />
    </>
  );
};

export default Page;
