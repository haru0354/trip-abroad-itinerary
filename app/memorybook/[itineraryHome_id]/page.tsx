import Link from "next/link";
import prisma from "@/app/components/lib/prisma";

import FormItineraryHome from "@/app/components/itineraryHome/FormItineraryHome";
import Button from "@/app/components/ui/Button";
import DeleteModal from "@/app/components/ui/DeleteModal";

import { updateItineraryHome } from "@/app/action/action-ItineraryHome";
import { deleteItineraryHome } from "@/app/action/action-ItineraryHome";
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
