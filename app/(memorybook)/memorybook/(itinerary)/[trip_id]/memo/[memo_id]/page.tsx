import type { Metadata } from "next";

import { deleteMemo } from "@/app/(memorybook)/memorybook/action/actionMemo";
import { updateMemo } from "@/app/(memorybook)/memorybook/action/actionMemo";
import {
  getMemo,
} from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import { notFound } from "next/navigation";
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
  const updateMemoWidthId = updateMemo.bind(null, memoId);

  const memo = await getMemo(memoId);

  if (!memo) {
    notFound();
  }

  return (
    <>
      <h3 className="p-5 my-4 text-xl font-semibold rounded text-white bg-itinerary-heading">
        メモの編集
      </h3>
      <FormMemo
        formAction={updateMemoWidthId}
        memo={memo}
        buttonName="保存"
        tripId={memo.tripId}
      />
      <div className="text-center">
        <ButtonNextLink
          href={`/memorybook/${memo.tripId}/memo`}
          color="gray"
          className="mt-4 rounded"
        >
          キャンセル
        </ButtonNextLink>
      </div>
      <DeleteModal
        DeleteName="メモ"
        name={memo?.name}
        tripId={memo.tripId}
        formAction={deleteMemo}
        id={memo?.id}
      />
    </>
  );
};

export default Page;
