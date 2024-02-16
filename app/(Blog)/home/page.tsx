import Link from "next/link";
import ListPost from "@/app/components/blog/ListPost";
import Button from "@/app/components/ui/Button";
import SideCategoryMenu from "@/app/components/blog/SideCategoryMenu";

const page = async () => {
  return (
    <>
      <div className="max-w-screen-lg flex justify-center items-center mx-auto">
        <div className="w-full">
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
          <div className="flex border border-gray-500 p-4 my-10">
            <p className="border-r border-gray-500 py-1 px-10">投稿日</p>
            <p className="border-r border-gray-500 py-1 px-40">記事タイトル</p>
            <p className="border-r border-gray-500 py-1 px-40">カテゴリ</p>
          </div>
          <ListPost />
          <SideCategoryMenu />
        </div>
      </div>
    </>
  );
};

export default page;
