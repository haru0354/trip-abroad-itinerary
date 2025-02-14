import Link from "next/link";

import {
  deleteTrip,
  updateTrip,
} from "@/app/(memorybook)/memorybook/action/actionTrip";
import { getTrip } from "../../lib/memoryBookService";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import FormTrip from "../../components/dashboard/form/FormTrip";
import Button from "@/app/components/ui/button/Button";

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const tripId = Number(params.trip_id);
  const updateTripWidthId = updateTrip.bind(null, tripId);
  const trip = await getTrip();

  if (!trip) {
    console.error("個別の旅行データの取得に失敗しました。");
    return;
  }

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
