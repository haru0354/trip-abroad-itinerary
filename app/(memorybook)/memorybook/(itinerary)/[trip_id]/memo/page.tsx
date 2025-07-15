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
    <Suspense fallback={<Loading message="作成したメモ" />}>
      <ListMemo memos={trip?.memos} />
    </Suspense>
  );
};

export default Page;
