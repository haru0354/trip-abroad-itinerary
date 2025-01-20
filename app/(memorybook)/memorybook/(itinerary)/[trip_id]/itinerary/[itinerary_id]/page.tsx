import Link from "next/link";
import { updateItinerary } from "@/app/(memorybook)/memorybook/action/actionItinerary";
import { deleteItinerary } from "@/app/(memorybook)/memorybook/action/actionItinerary";
import {
  getTrip,
  getItinerary,
} from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import FormItinerary from "@/app/(memorybook)/memorybook/components/itinerary/FormItinerary";
import Button from "@/app/components/ui/Button";
import DeleteModal from "@/app/components/ui/DeleteModal";

const page = async ({
  params,
}: {
  params: { itinerary_id: string; trip_id: string };
}) => {
  const itineraryId = Number(params.itinerary_id);
  const updateItineraryWithId = updateItinerary.bind(null, itineraryId);

  const itineraryHome = await getTrip(params.trip_id);

  if (!itineraryHome) {
    return <div>旅行データが見つかりません。</div>;
  }

  const itinerary = await getItinerary(params.itinerary_id);

  return (
    <>
      <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
        {itineraryHome?.name}
      </h2>
      <FormItinerary
        itinerary={itinerary}
        formAction={updateItineraryWithId}
        buttonName="保存"
        itineraryHomeId={itineraryHome.id}
      />
      <Link href={`/memorybook/${itineraryHome.id}/itinerary`}>
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <DeleteModal
        DeleteName="旅程"
        name={itinerary?.name}
        itineraryHomeId={itineraryHome.id}
        formAction={deleteItinerary}
        id={itinerary?.id}
      />
    </>
  );
};

export default page;
