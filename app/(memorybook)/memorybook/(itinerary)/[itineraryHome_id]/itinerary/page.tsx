import { Suspense } from "react";
import { getItineraryHome } from "../../../lib/memoryBookService";
import ListItinerary from "../../../components/itinerary/ListItinerary";
import Loading from "@/app/Loading";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const itineraryHome = await getItineraryHome(
    params.itineraryHome_id,
    "itineraries"
  );

  return (
    <>
      <h2 className="bg-white mt-0 md:mt-8 p-2 text-lg md:text-2xl text-center text-black border-b border-solid border-blue-800">
        {itineraryHome?.name}
      </h2>
      <Suspense fallback={<Loading message="作成した旅程表" />}>
        <ListItinerary
          itineraries={itineraryHome?.itineraries}
          itineraryHomeId={itineraryHome?.id}
        />
      </Suspense>
    </>
  );
};

export default Page;
