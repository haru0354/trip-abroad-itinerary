import { Metadata } from "next";

import {
  deleteTrip,
  updateTrip,
} from "@/app/(memorybook)/memorybook/action/actionTrip";
import { getTrip } from "../../lib/memoryBookService";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import FormTrip from "../../components/trip/FormTrip";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

export const metadata: Metadata = {
  title: "旅行の編集",
};

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const tripId = params.trip_id;
  const updateTripWidthId = updateTrip.bind(null, tripId);
  const trip = await getTrip(tripId);

  if (!trip) {
    console.error("個別の旅行データの取得に失敗しました。");
    return;
  }

  return (
    <>
      <FormTrip formAction={updateTripWidthId} trip={trip} buttonName="保存" />
      <div className="text-center">
        <ButtonNextLink
          href="/memorybook/dashboard"
          color="gray"
          className="mt-4 rounded"
        >
          キャンセル
        </ButtonNextLink>
      </div>
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
