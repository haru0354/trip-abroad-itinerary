import { Metadata } from "next";

import { getShareTrip } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
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

  const shareTrip = await getShareTrip(tripId);

  if (!shareTrip) {
    return <NotFound />;
  }

  return (
    <>
      <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
        {shareTrip?.name}
      </h2>
      <ListItinerary
        itineraries={shareTrip?.itineraries}
        tripId={shareTrip?.id}
        isShare={true}
      />
      <Share />
    </>
  );
};

export default Page;
