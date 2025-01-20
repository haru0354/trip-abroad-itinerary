import Link from "next/link";
import { deleteTrip, updateTrip } from "@/app/(memorybook)/memorybook/action/actionTrip";
import { getTrip } from "../../lib/memoryBookService";
import FormTrip from "../../components/dashboard/form/FormTrip";
import Button from "@/app/components/ui/Button";
import DeleteModal from "@/app/components/ui/DeleteModal";

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const id = Number(params.trip_id);
  const updateItineraryHomeWidthId = updateTrip.bind(null, id);
  const trip = await getTrip(params.trip_id);

  return (
    <>
      <FormTrip
        formAction={updateItineraryHomeWidthId}
        trip={trip}
        buttonName="保存"
      />
      <Link href="/memorybook/dashboard">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <DeleteModal
        DeleteName="旅行"
        name={trip?.name}
        formAction={deleteTrip}
        id={trip?.id}
      />
    </>
  );
};

export default Page;
