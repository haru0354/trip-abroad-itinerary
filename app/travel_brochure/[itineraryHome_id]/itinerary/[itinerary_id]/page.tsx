import prisma from "@/app/components/lib/prisma";
import { updateItinerary } from "@/app/action/action-itinerary";
import FormItinerary from "@/app/components/itinerary/FormItinerary";
import DeleteItineraryModal from "@/app/components/itinerary/DeleteItineraryModal";
import getCurrentUser from "@/app/action/getCurrentUser";


const page = async ({
  params,
}: {
  params: { itinerary_id: string; itineraryHome_id: string };
}) => {
  const id = Number(params.itinerary_id);
  const itineraryHomeId = Number(params.itineraryHome_id);

  const updateItineraryWithId = updateItinerary.bind(null, id);
  const itinerary = await prisma.itinerary.findUnique({
    where: {
      id,
    },
  });

  const itineraryHome = await prisma.itineraryHome.findUnique({
    where: {
      id: itineraryHomeId,
    },
  });

  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  return (
    <>
      <h2 className="text-center font-semibold text-xl text-gray-600 mt-4 py-2 border-b border-sky-700">
        {itineraryHome?.name}
      </h2>
      <FormItinerary
        itinerary={itinerary}
        formAction={updateItineraryWithId}
        buttonName="保存"
        itineraryHomeId={itineraryHomeId}
        userId={userId}
      />

      <DeleteItineraryModal
        itinerary={itinerary}
        itineraryHomeId={itineraryHomeId}
        userId={userId}
      />
    </>
  );
};

export default page;
