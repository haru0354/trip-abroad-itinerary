import Link from "next/link";
import ListPost from "@/app/components/blog/ListPost";
import Button from "@/app/components/ui/Button";
import SideCategoryMenu from "@/app/components/blog/SideCategoryMenu";

const page = async () => {
  return (
    <>
      <div className="max-w-screen-lg flex justify-center items-center py-4 mx-auto">
        <div className="w-full bg-white">
          <h2 className="bg-green-600 text-xl bold text-white rounded mt-10 mb-12 p-5 font-bold">
            投稿の一覧
          </h2>
          <div className="mx-auto flex justify-center items-center">
            <Link href="./home/new-post">
              <Button className="px-16 mx-6 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
                記事を追加する
              </Button>
            </Link>
          </div>
          <div className="flex border border-gray-500 py-4 mt-10">
            <p className="text-center border-r border-gray-500 py-1 px-2 min-w-[110px]">
              投稿日
            </p>
            <p className="text-center border-r flex-grow border-gray-500 py-1 px-2 min-w-[110px] max-w-[550px]">
              記事タイトル
            </p>
            <p className="text-center border-r border-gray-500 py-1 px-2 min-w-[130px] max-w-[130px]">
              カテゴリ
            </p>
            <p className="text-center py-1 px-2 min-w-[130px] max-w-[130px]">
              その他
            </p>
          </div>
          <ListPost />
          <SideCategoryMenu />
        </div>
      </div>
    </>
  );
};

export default page;
