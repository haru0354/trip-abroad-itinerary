import prisma from "@/app/components/lib/prisma";
import FormItineraryHome from "@/app/components/itineraryHome/FormItineraryHome";
import { updateShare } from "@/app/action/action-ItineraryHome";
import DeleteItineraryHomeModal from "@/app/components/itineraryHome/DeleteItineraryHomeModal";
import getCurrentUser from "@/app/action/getCurrentUser";
import Button from "@/app/components/ui/Button";
import Link from "next/link";
import FormShare from "@/app/components/itineraryHome/FormShare";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const id = Number(params.itineraryHome_id);
  const updateShareWidthId = updateShare.bind(null, id);
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  const itineraryHome = await prisma.itineraryHome.findUnique({
    where: {
      id,
    },
  });

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
