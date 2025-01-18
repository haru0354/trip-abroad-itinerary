import type { Metadata } from "next";
import { addCategory } from "@/app/(blog)/action/actionCategory";
import FormCategory from "@/app/(blog)/components/dashboard/form/FormCategory";

export const metadata: Metadata = {
  title: "カテゴリの追加",
};

const page = async () => {
  return (
    <>
      <h2 className="bg-blog-dashboardHeading text-xl bold text-white rounded mb-12 p-5 font-bold">
        カテゴリの追加
      </h2>
      <FormCategory buttonName="カテゴリを追加" formAction={addCategory} />
    </>
  );
};

export default page;
