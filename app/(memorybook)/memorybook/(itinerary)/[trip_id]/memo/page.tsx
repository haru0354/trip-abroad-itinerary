import { Metadata } from "next";
import { Suspense } from "react";

import { getTrip } from "../../../lib/memoryBookService";
import { notFound } from "next/navigation";
import ListMemo from "../../../components/memo/ListMemo";
import Loading from "@/app/Loading";

export const metadata: Metadata = {
  title: "メモの一覧",
};

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const tripId = params.trip_id;

  const trip = await getTrip(tripId, "memos");

  if (!trip) {
    notFound();
  }

  return (
    <>
      <h2 className="bg-white mt-0 md:mt-8 p-2 text-lg md:text-2xl text-center text-black border-b border-solid border-blue-800">
        {trip?.name}
      </h2>
      <Suspense fallback={<Loading message="作成したメモ" />}>
        <ListMemo memos={trip?.memos} tripId={trip?.id} />
      </Suspense>
    </>
  );
};

export default Page;
