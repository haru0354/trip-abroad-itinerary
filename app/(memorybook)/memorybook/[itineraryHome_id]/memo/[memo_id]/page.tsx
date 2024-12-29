import Link from "next/link";
import { deleteMemo } from "@/app/action/action-memo";
import { updateMemo } from "@/app/action/action-memo";
import { getItineraryHome, getMemo } from "@/app/components/lib/MemoryBookService";
import FormMemo from "@/app/components/memo/FormMemo";
import DeleteModal from "@/app/components/ui/DeleteModal";
import Button from "@/app/components/ui/Button";

const Page = async ({
  params,
}: {
  params: { memo_id: string; itineraryHome_id: string };
}) => {
  const id = Number(params.memo_id);

  const itineraryHome = await getItineraryHome(params.itineraryHome_id);
  const memo = await getMemo(params.memo_id);

  if (!itineraryHome) {
    return <div>旅行データが見つかりません。</div>;
  }

  const updateMemoWidthId = updateMemo.bind(null, id);

  return (
    <>
      <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
        {itineraryHome?.name}
      </h2>
      <FormMemo
        formAction={updateMemoWidthId}
        memo={memo}
        buttonName="保存"
        itineraryHomeId={itineraryHome.id}
      />
      <Link href={`/memorybook/${itineraryHome.id}/memo`}>
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <DeleteModal
        DeleteName="メモ"
        name={memo?.name}
        itineraryHomeId={itineraryHome.id}
        formAction={deleteMemo}
        id={memo?.id}
      />
    </>
  );
};

export default Page;
