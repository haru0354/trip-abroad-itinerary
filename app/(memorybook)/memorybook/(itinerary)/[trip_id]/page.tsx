import Link from "next/link";

import {
  deleteTrip,
  updateTrip,
} from "@/app/(memorybook)/memorybook/action/actionTrip";
import { getTrip } from "../../lib/memoryBookService";
import DeleteModal from "@/app/components/ui/DeleteModal";
import FormTrip from "../../components/dashboard/form/FormTrip";
import Button from "@/app/components/ui/Button";

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const id = Number(params.trip_id);
  const updateTripWidthId = updateTrip.bind(null, id);
  const trip = await getTrip(params.trip_id);

  return (
    <>
      <FormTrip formAction={updateTripWidthId} trip={trip} buttonName="保存" />
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
