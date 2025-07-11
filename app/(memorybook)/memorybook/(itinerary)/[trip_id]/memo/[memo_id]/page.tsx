import { Metadata } from "next";

import { deleteMemo } from "@/app/(memorybook)/memorybook/action/actionMemo";
import { updateMemo } from "@/app/(memorybook)/memorybook/action/actionMemo";
import {
  getTrip,
  getMemo,
} from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import FormMemo from "@/app/(memorybook)/memorybook/components/memo/FormMemo";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

export const metadata: Metadata = {
  title: "メモの編集",
};

const Page = async ({
  params,
}: {
  params: { memo_id: string; trip_id: string };
}) => {
  const memoId = params.memo_id;
  const tripId = params.trip_id;

  const memo = await getMemo(memoId);

  if (!memo) {
    console.error("個別のメモの取得に失敗しました。");
    return;
  }

  const trip = await getTrip(tripId);

  if (!trip) {
    console.error("個別の旅行データの取得に失敗しました。");
    return;
  }

  const updateMemoWidthId = updateMemo.bind(null, memoId);

  return (
    <>
      <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
        {trip?.name}
      </h2>
      <h3 className="p-5 my-4 text-xl font-semibold rounded text-white bg-itinerary-heading">
        メモの編集
      </h3>
      <FormMemo
        formAction={updateMemoWidthId}
        memo={memo}
        buttonName="保存"
        tripId={trip.id}
      />
      <div className="text-center">
        <ButtonNextLink
          href={`/memorybook/${trip.id}/memo`}
          color="gray"
          className="mt-4 rounded"
        >
          キャンセル
        </ButtonNextLink>
      </div>
      <DeleteModal
        DeleteName="メモ"
        name={memo?.name}
        tripId={trip.id}
        formAction={deleteMemo}
        id={memo?.id}
      />
    </>
  );
};

export default Page;
