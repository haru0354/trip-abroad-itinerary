import { Metadata } from "next";

import ListTrip from "../../components/trip/ListTrip";
import ListShare from "../../components/user/list/ListShare";

export const metadata: Metadata = {
  title: "旅行の一覧",
};

const page = () => {
  return (
    <>
      <ListTrip />
      <ListShare />
    </>
  );
};

export default page;
