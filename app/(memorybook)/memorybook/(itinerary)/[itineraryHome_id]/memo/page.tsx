import { Suspense } from "react";
import { getItineraryHome } from "../../../lib/memoryBookService";
import ListMemo from "../../../components/memo/ListMemo";
import Loading from "@/app/Loading";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const itineraryHome = await getItineraryHome(
    params.itineraryHome_id,
    "memos"
  );

  return (
    <>
      <h2 className="bg-white mt-0 md:mt-8 p-2 text-lg md:text-2xl text-center text-black border-b border-solid border-blue-800">
        {itineraryHome?.name}
      </h2>
      <Suspense fallback={<Loading message="作成したメモ" />}>
        <ListMemo
          memos={itineraryHome?.memos}
          itineraryHomeId={itineraryHome?.id}
        />
      </Suspense>
    </>
  );
};

export default Page;
