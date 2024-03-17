import Link from "next/link";
import prisma from "@/app/components/lib/prisma";

import FormMemo from "@/app/components/memo/FormMemo";
import DeleteModal from "@/app/components/ui/DeleteModal";
import Button from "@/app/components/ui/Button";

import { deleteMemo } from "@/app/action/action-memo";
import { updateMemo } from "@/app/action/action-memo";


const Page = async ({
  params,
}: {
  params: { memo_id: string; itineraryHome_id: string };
}) => {
  const id = Number(params.memo_id);
  const itineraryHomeId = Number(params.itineraryHome_id);

  const itineraryHome = await prisma.itineraryHome.findUnique({
    where: {
      id: itineraryHomeId,
    },
  });

  const memo = await prisma.memo.findUnique({
    where: {
      id,
    },
  });

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
        itineraryHomeId={itineraryHomeId}
      />
      <Link href={`/memorybook/${itineraryHomeId}/memo`}>
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <DeleteModal
        DeleteName="メモ"
        name={memo?.name}
        itineraryHomeId={itineraryHomeId}
        formAction={deleteMemo}
        id={memo?.id}
      />
    </>
  );
};

export default Page;
