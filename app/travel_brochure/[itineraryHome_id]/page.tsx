import prisma from "@/app/components/lib/prisma";
import FormItineraryHome from "@/app/components/itineraryHome/FormItineraryHome";
import { updateItineraryHome } from "@/app/action/action-ItineraryHome";
import DeleteItineraryHomeModal from "@/app/components/itineraryHome/DeleteItineraryHomeModal";
import getCurrentUser from "@/app/action/getCurrentUser";



const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const id = Number(params.itineraryHome_id);
  const updateItineraryHomeWidthId = updateItineraryHome.bind(null, id);
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  const itineraryHome = await prisma.itineraryHome.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
      <FormItineraryHome
        formAction={updateItineraryHomeWidthId}
        itineraryHome={itineraryHome}
        buttonName="保存"
        userId={userId}
      />

      <DeleteItineraryHomeModal itineraryHome={itineraryHome} />
    </>
  );
};

export default Page;
