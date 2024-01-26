import prisma from "@/app/lib/prisma";
import { updateItinerary } from "@/app/action/action-itinerary";
import Date from "@/app/components/Date";
import Form from "@/app/components/Form";
import Textarea from "@/app/components/Textarea";
import Time from "@/app/components/Time";
import Button from "@/app/components/Button";

const page = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const updateItineraryId = updateItinerary.bind(null, id);
  const itinerary = await prisma.itinerary.findUnique({
    where: {
      id,
    },
  });

  return (
    <main className="flex justify-center p-8">
      <div className="flex justify-center p-8">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" action={updateItineraryId} >
          <Date defaultValue={itinerary?.date}/>
          <Time defaultValue={itinerary?.time}/>
          <Form label={"目的"} name={"name"} defaultValue={itinerary?.name} />
          <Textarea label={"補足説明"} name={"content"} defaultValue={itinerary?.content}  />
          <Textarea label={"補足説明"} name={"hideContent"} defaultValue={itinerary?.hideContent}  />
          <Button>
            保存
          </Button>
        </form>
      </div>
    </main>
  )
}

export default page