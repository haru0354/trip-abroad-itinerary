import prisma from "@/app/components/lib/prisma";
import { updateMemo } from "@/app/action/action-memo";
import FormMemo from "@/app/components/memo/FormMemo";
import DeleteModal from "@/app/components/memo/DeleteMemoModal";

const Page = async ({
  params,
}: {
  params: { memo_id: string; itineraryHome_id: string };
}) => {
  const id = Number(params.memo_id);
  const itineraryHomeId = Number(params.itineraryHome_id);

  const updateMemoWidthId = updateMemo.bind(null, id);

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

  return (
    <>
      <h2 className="text-center font-semibold text-xl text-gray-600 mt-4 py-2 border-b border-sky-700">
        {itineraryHome?.name}
      </h2>
      <FormMemo
        formAction={updateMemoWidthId}
        memo={memo}
        buttonName="保存"
        itineraryHomeId={itineraryHomeId}
      />

      <DeleteModal memo={memo} itineraryHomeId={itineraryHomeId} />
    </>
  );
};

export default Page;
