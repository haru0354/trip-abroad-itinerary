import ListPost from "@/app/components/blog/dashboard/ListPost";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事の一覧",
};

const page = async () => {
  return (
    <>
      <ListPost />
    </>
  );
};

export default page;
