import type { Metadata } from "next";

import { addCategory } from "@/app/(blog)/action/actionCategory";
import FormCategory from "@/app/(blog)/components/dashboard/form/FormCategory";
import HeadingTwo from "@/app/(blog)/components/ui/dashboard/HeadingTwo";

export const metadata: Metadata = {
  title: "カテゴリの追加",
};

const page = async () => {
  return (
    <>
      <HeadingTwo>カテゴリの追加</HeadingTwo>
      <FormCategory buttonName="カテゴリを追加" formAction={addCategory} />
    </>
  );
};

export default page;
