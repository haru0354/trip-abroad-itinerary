import Link from "next/link";
import prisma from "@/app/components/lib/prisma";

import FormItinerary from "@/app/components/itinerary/FormItinerary";
import Button from "@/app/components/ui/Button";
import DeleteModal from "@/app/components/ui/DeleteModal";

import { updateItinerary } from "@/app/action/action-itinerary";
import { deleteItinerary } from "@/app/action/action-itinerary";
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
      <Link href={`/memorybook/${itineraryHomeId}/itinerary`}>
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <DeleteModal
        DeleteName="旅程"
        name={itinerary?.name}
        itineraryHomeId={itineraryHomeId}
        formAction={deleteItinerary}
        id={itinerary?.id}
        userId={userId}
      />
    </>
  );
};

export default page;
