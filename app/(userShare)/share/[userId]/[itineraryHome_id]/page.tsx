import React from "react";
import ListItinerary from "@/app/components/itinerary/ListItinerary";
import prisma from "@/app/components/lib/prisma";
import Share from "@/app/components/Share";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const id = Number(params.itineraryHome_id);
  const itineraryHome = await prisma.itineraryHome.findUnique({
    where: {
      id,
    },
    include: {
      itineraries: true,
    },
  });

  return (
    <>
      {itineraryHome?.share && (
        <>
          <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
            {itineraryHome?.name}
          </h2>
          <ListItinerary
            itineraries={itineraryHome?.itineraries}
            itineraryHomeId={itineraryHome?.id}
            isShare={true}
          />
          <Share/>
        </>
      )}
    </>
  );
};

export default Page;
