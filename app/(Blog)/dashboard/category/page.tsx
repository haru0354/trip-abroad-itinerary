import ListCategory from "@/app/components/blog/(dashboard)/ListCategory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カテゴリの一覧",
};

const page = () => {
  return (
    <>
      <h2 className="bg-green-600 text-xl bold text-white rounded mb-12 p-5 font-bold">
        カテゴリの一覧
      </h2>
      <div className="flex border border-gray-500 py-4 mt-10">
        <p className="border-r border-gray-500 py-1 px-2 min-w-[110px]">
          カテゴリ名
        </p>
        <p className="border-r border-gray-500 py-1 px-2 min-w-[110px] max-w-[550px]">
          スラッグ
        </p>
        <p className="border-r border-gray-500 py-1 px-2 min-w-[110px] max-w-[550px]">
          コンテント
        </p>
        <p className="border-gray-500 py-1 px-2 min-w-[110px] max-w-[550px]">
          説明文
        </p>
      </div>
      <ListCategory />
    </>
  );
};

export default page;
