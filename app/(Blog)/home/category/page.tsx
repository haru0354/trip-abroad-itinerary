import { addCategory } from "@/app/action/action-category";
import FormCategory from "@/app/components/blog/FormCategory";
import ListCategory from "@/app/components/blog/ListCategory";
import Button from "@/app/components/ui/Button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <h2 className="bg-green-600 text-xl bold text-white rounded mb-12 p-5 font-bold">
        カテゴリの一覧
      </h2>
      <div className="mx-auto flex justify-center items-center">
        <Link href="/home">
          <Button className="px-16 mx-6 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
            記事の確認・追加
          </Button>
        </Link>
      </div>
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
      <h2 className="bg-green-600 text-xl bold text-white rounded mt-10 mb-12 p-5 font-bold">
        カテゴリの追加
      </h2>
      <FormCategory buttonName="カテゴリを追加する" formAction={addCategory} />
      <Link href="/home">
        <Button className="px-24 my-8 py-3 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-sky-900">
          戻る
        </Button>
      </Link>
    </>
  );
};

export default page;
