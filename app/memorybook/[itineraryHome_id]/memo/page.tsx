import ListMemo from "@/app/components/memo/ListMemo";
import FormMemoModal from "@/app/components/memo/FormMemoModal";
import { getItineraryHome } from "@/app/components/lib/MemoryBookService";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const itineraryHome = await getItineraryHome(params.itineraryHome_id, "memos");

  return (
    <>
      <h2 className="bg-white mt-0 md:mt-8 p-2 text-lg md:text-2xl text-center text-black border-b border-solid border-blue-800">
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
