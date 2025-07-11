import { Metadata } from "next";

import { getTrip } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import ListItinerary from "@/app/(memorybook)/memorybook/components/itinerary/ListItinerary";
import Share from "@/app/(memorybook)/memorybook/components/Share";
import NotFound from "@/app/not-found";

export const metadata: Metadata = {
  title: "共有された旅行記",
  robots: {
    index: false,
  },
};

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const tripId = params.trip_id;
  
  const trip = await getTrip(tripId, "itineraries");

  if (!trip) {
    console.error("個別の旅行データの取得に失敗しました。");
    return;
  }

  return (
    <>
      {trip?.share ? (
        <>
          <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
            {trip?.name}
          </h2>
          <ListItinerary
            itineraries={trip?.itineraries}
            tripId={trip?.id}
            isShare={true}
          />
          <Share />
        </>
      ) : (
        <>
          <NotFound />
          共有された旅程表がありません。
        </>
      )}
    </>
  );
};

export default Page;
