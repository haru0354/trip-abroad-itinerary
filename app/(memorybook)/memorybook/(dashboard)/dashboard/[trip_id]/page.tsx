import { Metadata } from "next";

import { getTrip } from "../../../lib/memoryBookService";
import { updateShare } from "../../../action/actionTrip";
import FormShare from "../../../components/user/form/FormShare";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

export const metadata: Metadata = {
  title: "旅程表の共有設定",
};

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const tripId = params.trip_id;
  const updateShareWidthId = updateShare.bind(null, tripId);
  const trip = await getTrip(tripId);

  if (!trip) {
    console.error("個別の旅行データの取得に失敗しました。");
    return;
  }

  return (
    <>
      <FormShare
        trip={trip}
        formAction={updateShareWidthId}
        buttonName="保存"
      />
      <div className="text-center">
        <ButtonNextLink
          href="/memorybook/dashboard"
          color="gray"
          className="mt-4 rounded"
        >
          キャンセル
        </ButtonNextLink>
      </div>
    </>
  );
};

export default Page;
