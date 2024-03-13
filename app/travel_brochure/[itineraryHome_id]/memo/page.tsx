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
      <h2 className="bg-white text-2xl text-center text-black border-b border-solid border-blue-800">
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
