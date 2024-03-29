import Link from "next/link";

import FormItineraryHome from "@/app/components/itineraryHome/FormItineraryHome";
import Button from "@/app/components/ui/Button";
import DeleteModal from "@/app/components/ui/DeleteModal";

import { updateItineraryHome } from "@/app/action/action-ItineraryHome";
import { deleteItineraryHome } from "@/app/action/action-ItineraryHome";

import { getItineraryHome } from "@/app/components/lib/MemoryBookService";
import { getCurrentUserId } from "@/app/components/lib/getCurrentUser";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const id = Number(params.itineraryHome_id);
  const updateItineraryHomeWidthId = updateItineraryHome.bind(null, id);
  const currentUserId = (await getCurrentUserId()) ?? undefined;
  const itineraryHome = await getItineraryHome(params.itineraryHome_id);

  return (
    <>
      <FormItineraryHome
        formAction={updateItineraryHomeWidthId}
        itineraryHome={itineraryHome}
        buttonName="保存"
        userId={currentUserId}
      />
      <Link href="/memorybook/home">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <DeleteModal
        DeleteName="旅行"
        name={itineraryHome?.name}
        formAction={deleteItineraryHome}
        id={itineraryHome?.id}
      />
    </>
  );
};

export default Page;
