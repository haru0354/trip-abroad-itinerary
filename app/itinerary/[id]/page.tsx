import prisma from "@/app/components/lib/prisma";
import { updateItinerary, deleteItinerary } from "@/app/action/action-itinerary";
import Date from "@/app/components/Date";
import Form from "@/app/components/Form";
import Textarea from "@/app/components/Textarea";
import Time from "@/app/components/Time";
import Button from "@/app/components/Button";
import FormItinerary from "@/app/components/itinerary/FormItinerary";
import DeleteItineraryModal from "@/app/components/itinerary/DeleteItineraryModal";

const page = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const updateItineraryWithId = updateItinerary.bind(null, id);
  const itinerary = await prisma.itinerary.findUnique({
    where: {
      id,
    },
  });

  return (
    <main className="flex justify-center p-8">
      <div className="flex justify-center p-8">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <FormItinerary itinerary={itinerary} />
          <Button formAction={updateItineraryWithId}>
            保存
          </Button>
          <DeleteItineraryModal itinerary={itinerary}/>
        </form>
      </div>
    </main>
  )
}

export default page