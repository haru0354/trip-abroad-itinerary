import Link from "next/link";
import { getCurrentUserId } from "@/app/(memorybook)/memorybook/lib/getCurrentUser";
import { updateItinerary } from "@/app/(memorybook)/memorybook/action/action-itinerary";
import { deleteItinerary } from "@/app/(memorybook)/memorybook/action/action-itinerary";
import {
  getItineraryHome,
  getItinerary,
} from "@/app/components/lib/MemoryBookService";
import FormItinerary from "@/app/components/itinerary/FormItinerary";
import Button from "@/app/components/ui/Button";
import DeleteModal from "@/app/components/ui/DeleteModal";


const page = async ({
  params,
}: {
  params: { itinerary_id: string; itineraryHome_id: string };
}) => {
  const id = Number(params.itinerary_id);
  const updateItineraryWithId = updateItinerary.bind(null, id);

  const itineraryHome = await getItineraryHome(params.itineraryHome_id);
  const itinerary = await getItinerary(params.itinerary_id);

  const currentUserId = (await getCurrentUserId()) ?? undefined;

  if (!itineraryHome) {
    return <div>旅行データが見つかりません。</div>;
  }

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
        userId={currentUserId}
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
        userId={currentUserId}
      />
    </>
  );
};

export default page;
