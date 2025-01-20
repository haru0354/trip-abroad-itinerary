import Link from "next/link";
import { deleteMemo } from "@/app/(memorybook)/memorybook/action/actionMemo";
import { updateMemo } from "@/app/(memorybook)/memorybook/action/actionMemo";
import {
  getTrip,
  getMemo,
} from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import FormMemo from "@/app/(memorybook)/memorybook/components/memo/FormMemo";
import DeleteModal from "@/app/components/ui/DeleteModal";
import Button from "@/app/components/ui/Button";

const Page = async ({
  params,
}: {
  params: { memo_id: string; trip_id: string };
}) => {
  const memoId = Number(params.memo_id);
  const memo = await getMemo(params.memo_id);

  const trip = await getTrip(params.trip_id);

  if (!trip) {
    return <div>旅行データが見つかりません。</div>;
  }

  const updateMemoWidthId = updateMemo.bind(null, memoId);

  return (
    <>
      <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
        {trip?.name}
      </h2>
      <FormMemo
        formAction={updateMemoWidthId}
        memo={memo}
        buttonName="保存"
        tripId={trip.id}
      />
      <Link href={`/memorybook/${trip.id}/memo`}>
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
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
