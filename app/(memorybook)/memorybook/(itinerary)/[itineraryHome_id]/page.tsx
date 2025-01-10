import Link from "next/link";
import { deleteTrip, updateTrip } from "@/app/(memorybook)/memorybook/action/actionTrip";
import { getItineraryHome } from "../../lib/memoryBookService";
import FormItineraryHome from "../../components/dashboard/form/FormItineraryHome";
import Button from "@/app/components/ui/Button";
import DeleteModal from "@/app/components/ui/DeleteModal";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const id = Number(params.itineraryHome_id);
  const updateItineraryHomeWidthId = updateTrip.bind(null, id);
  const itineraryHome = await getItineraryHome(params.itineraryHome_id);

  return (
    <>
      <FormItineraryHome
        formAction={updateItineraryHomeWidthId}
        itineraryHome={itineraryHome}
        buttonName="保存"
      />
      <Link href="/memorybook/dashboard">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <DeleteModal
        DeleteName="旅行"
        name={itineraryHome?.name}
        formAction={deleteTrip}
        id={itineraryHome?.id}
      />
    </>
  );
};

export default Page;
