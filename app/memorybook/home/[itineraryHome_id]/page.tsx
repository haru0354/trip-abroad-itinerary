import Link from "next/link";

import Button from "@/app/components/ui/Button";
import FormShare from "@/app/components/itineraryHome/FormShare";

import { updateShare } from "@/app/action/action-ItineraryHome";
import getCurrentUser from "@/app/action/getCurrentUser";
import { getItineraryHome } from "@/app/components/lib/MemoryBookService";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const id = Number(params.itineraryHome_id);
  const updateShareWidthId = updateShare.bind(null, id);
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const itineraryHome = await getItineraryHome(params.itineraryHome_id);

  return (
    <>
      <FormShare
        itineraryHome={itineraryHome}
        formAction={updateShareWidthId}
        buttonName="保存"
        userId={userId}
      />
      <Link href="/memorybook/home">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
    </>
  );
};

export default Page;
