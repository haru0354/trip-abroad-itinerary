import { Metadata } from "next";
import { Suspense } from "react";

import { getTrip } from "../../../lib/memoryBookService";
import ListItinerary from "../../../components/itinerary/ListItinerary";
import Loading from "@/app/Loading";

export const metadata: Metadata = {
  title: "旅程表",
};

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const tripId = Number(params.trip_id);
  const trip = await getTrip(tripId, "itineraries");

  if (!trip) {
    console.error("個別の旅行データの取得に失敗しました。");
    return;
  }

  return (
    <>
      <h2 className="bg-white mt-0 md:mt-8 p-2 text-lg md:text-2xl text-center text-itinerary-black border-b border-solid border-blue-800">
        {trip?.name}
      </h2>
      <Suspense fallback={<Loading message="作成した旅程表" />}>
        <ListItinerary itineraries={trip?.itineraries} tripId={trip?.id} />
      </Suspense>
    </>
  );
};

export default Page;
