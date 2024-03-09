import ListMemo from "@/app/components/memo/ListMemo";
import FormMemoModal from "@/app/components/memo/FormMemoModal";
import prisma from "@/app/components/lib/prisma";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const id = Number(params.itineraryHome_id);

  const itineraryHome = await prisma.itineraryHome.findUnique({
    where: {
      id,
    },
    include: {
      memos: true,
    },
  });

  return (
    <>
      <h2 className="text-center font-semibold text-xl text-gray-00 mt-4 py-2 border-b border-sky-700">
        {itineraryHome?.name}
      </h2>
      <ListMemo
        memos={itineraryHome?.memos}
        itineraryHomeId={itineraryHome?.id}
      />
      <FormMemoModal
        itineraryHomeId={itineraryHome?.id}
        buttonName="メモの追加"
        buttonName2="メモの追加"
      />
    </>
  );
};

export default Page;
