import { getItineraryHome } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import ListItinerary from "@/app/(memorybook)/memorybook/components/itinerary/ListItinerary";
import Share from "@/app/(memorybook)/memorybook/components/Share";
import NotFound from "@/app/not-found";

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const itineraryHome = await getItineraryHome(
    params.trip_id,
    "itineraries"
  );

  return (
    <>
      {itineraryHome?.share ? (
        <>
          <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
            {itineraryHome?.name}
          </h2>
          <ListItinerary
            itineraries={itineraryHome?.itineraries}
            itineraryHomeId={itineraryHome?.id}
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
