import ListCategory from "@/app/components/blog/dashboard/ListCategory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カテゴリの一覧",
};

const page = () => {
  return (
    <>
      <ListCategory />
    </>
  );
};

export default page;
