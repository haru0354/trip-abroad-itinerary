import { addItinerary } from "@/app/action/action-itinerary";
import ListItinerary from "@/app/components/itinerary/ListItinerary";
import prisma from "@/app/components/lib/prisma";
import getCurrentUser from "@/app/action/getCurrentUser";
import FormItineraryModal from "@/app/components/itinerary/FormItineraryModal";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const id = Number(params.itineraryHome_id);
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  const itineraryHome = await prisma.itineraryHome.findUnique({
    where: {
      id,
    },
    include: {
      itineraries: true,
    },
  });

  return (
    <>
      <h2 className="text-center font-semibold text-xl text-gray-600 mt-4 py-2 border-b border-sky-700">
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
