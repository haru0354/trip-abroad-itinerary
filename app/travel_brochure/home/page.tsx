import FormItineraryHome from "@/app/components/itineraryHome/FormItineraryHome";
import ListItineraryHome from "@/app/components/itineraryHome/ListItineraryHome";
import getCurrentUser from "@/app/action/getCurrentUser";
import { addItineraryHome } from "@/app/action/action-ItineraryHome";
import DashboardItinerarySideMenu from "@/app/components/itineraryHome/DashboardItinerarySideMenu";
import prisma from "@/app/components/lib/prisma";

const page = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const itineraryHomes = await prisma.itineraryHome.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex bg-sky-50">
      <DashboardItinerarySideMenu itineraryHomes={itineraryHomes} />
      <div className="flex justify-center items-center mx-auto w-full max-w-[1200px] ml-0 sm:ml-96 bg-white border rounded border-gray-200 p-5 mt-8">
        <div className="w-full">
          <FormItineraryHome
            buttonName="追加"
            userId={userId}
            formAction={addItineraryHome}
          />
          <ListItineraryHome userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default page;
