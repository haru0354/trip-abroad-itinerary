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
      <FormCategory buttonName="カテゴリを追加する" formAction={addCategory} />
      <Link href="/home/category">
        <Button className="px-24 my-8 py-3 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-sky-900">
          戻る
        </Button>
      </Link>
    </>
  );
};

export default page;
