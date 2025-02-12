import Link from "next/link";
import { deleteMemo } from "@/app/(memorybook)/memorybook/action/actionMemo";
import { updateMemo } from "@/app/(memorybook)/memorybook/action/actionMemo";
import {
  getTrip,
  getMemo,
} from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import FormMemo from "@/app/(memorybook)/memorybook/components/memo/FormMemo";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import Button from "@/app/components/ui/button/Button";

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
      <h3 className="p-5 my-4 text-xl font-semibold rounded text-white bg-itinerary-heading">
        メモの編集
      </h3>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6 border-itinerary-borderGray rounded bg-white max-w-[620px]">
          <FormMemo
            formAction={updateMemoWidthId}
            memo={memo}
            buttonName="保存"
            tripId={trip.id}
          />
        </div>
      </div>
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
