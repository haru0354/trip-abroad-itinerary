import { addCategory } from "@/app/action/action-category";
import FormCategory from "@/app/components/blog/dashboard/FormCategory";
import Button from "@/app/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カテゴリの追加",
};

const page = async () => {
  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        カテゴリの追加
      </h2>
      <FormCategory buttonName="カテゴリを追加" formAction={addCategory} />
    </>
  );
};

export default page;
