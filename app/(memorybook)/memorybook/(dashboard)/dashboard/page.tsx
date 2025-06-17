import { Metadata } from "next";
import { Suspense } from "react";

import ListTrip from "../../components/trip/ListTrip";
import ListShare from "../../components/user/list/ListShare";
import Loading from "@/app/Loading";

export const metadata: Metadata = {
  title: "旅行の一覧",
};

const page = () => {
  return (
    <>
      <Suspense fallback={<Loading message="作成した旅行のしおり" />}>
        <ListTrip />
      </Suspense>
      <Suspense fallback={<Loading message="共有リスト" />}>
        <ListShare />
      </Suspense>
    </>
  );
};

export default page;
