import prisma from "@/app/components/lib/prisma";
import { updateItinerary } from "@/app/action/action-itinerary";
import FormItinerary from "@/app/components/itinerary/FormItinerary";
import DeleteItineraryModal from "@/app/components/itinerary/DeleteItineraryModal";
import getCurrentUser from "@/app/action/getCurrentUser";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

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
      <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
        {itineraryHome?.name}
      </h2>
      <FormItinerary
        itinerary={itinerary}
        formAction={updateItineraryWithId}
        buttonName="保存"
        itineraryHomeId={itineraryHomeId}
        userId={userId}
      />
      <Link href={`/travel_brochure/${itineraryHomeId}/itinerary`}>
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <DeleteItineraryModal
        itinerary={itinerary}
        itineraryHomeId={itineraryHomeId}
        userId={userId}
      />
    </>
  );
};

export default page;
