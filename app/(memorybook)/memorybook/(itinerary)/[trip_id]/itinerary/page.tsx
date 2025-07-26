import type { Metadata } from "next";
import { Suspense } from "react";

import { getTrip } from "../../../lib/memoryBookService";
import { notFound } from "next/navigation";
import ListItinerary from "../../../components/itinerary/ListItinerary";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "旅程表",
};

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const tripId = params.trip_id;
  const trip = await getTrip(tripId, "itineraries");

  if (!trip) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading message="作成した旅程表" />}>
      <ListItinerary itineraries={trip?.itineraries} />
    </Suspense>
  );
};

export default Page;
