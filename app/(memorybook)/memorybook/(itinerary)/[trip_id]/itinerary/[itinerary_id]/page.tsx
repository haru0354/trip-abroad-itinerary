import type { Metadata } from "next";

import { updateItinerary } from "@/app/(memorybook)/memorybook/action/actionItinerary";
import { deleteItinerary } from "@/app/(memorybook)/memorybook/action/actionItinerary";
import {
  getTrip,
  getItinerary,
} from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import { notFound } from "next/navigation";
import FormItinerary from "@/app/(memorybook)/memorybook/components/itinerary/FormItinerary";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

export const metadata: Metadata = {
  title: "旅程の編集",
};

const page = async ({
  params,
}: {
  params: { itinerary_id: string; trip_id: string };
}) => {
  const itineraryId = params.itinerary_id;
  const tripId = params.trip_id;

  const updateItineraryWithId = updateItinerary.bind(null, itineraryId);

  const trip = await getTrip(tripId);

  if (!trip) {
    notFound();
  }

  const itinerary = await getItinerary(itineraryId);

  if (!itinerary) {
    notFound();
  }

  return (
    <>
      <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
        {trip?.name}
      </h2>
      <h3 className="p-5 my-4 text-xl font-semibold rounded text-white bg-itinerary-heading">
        旅程の編集
      </h3>
      <FormItinerary
        itinerary={itinerary}
        formAction={updateItineraryWithId}
        buttonName="保存"
        tripId={trip.id}
      />
      <div className="text-center">
        <ButtonNextLink
          href={`/memorybook/${trip.id}/itinerary`}
          color="gray"
          className="mt-4 rounded"
        >
          キャンセル
        </ButtonNextLink>
      </div>
      <DeleteModal
        DeleteName="旅程"
        name={itinerary?.name}
        tripId={trip.id}
        formAction={deleteItinerary}
        id={itinerary?.id}
      />
    </>
  );
};

export default page;
