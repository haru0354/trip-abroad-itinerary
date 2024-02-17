import { addCategory } from "@/app/action/action-post";
import FormCategory from "@/app/components/blog/FormCategory";
import ListCategory from "@/app/components/blog/ListCategory";
import Button from "@/app/components/ui/Button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="max-w-screen-lg flex justify-center items-center mx-auto">
        <div className="w-full">
          <h2 className="bg-green-600 text-xl bold text-white rounded mt-10 mb-12 p-5 font-bold">
            カテゴリの追加
          </h2>
          <FormCategory
            buttonName="カテゴリを追加する"
            formAction={addCategory}
          />
          <Link href="/home">
            <Button className="px-24 my-8 py-3 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-sky-900">
              戻る
            </Button>
          </Link>
          <ListCategory />
        </div>
      </div>
    </>
  );
};

export default page;
