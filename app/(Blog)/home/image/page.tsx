import ListImages from "@/app/components/blog/ListImages";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

const page = () => {
  return (
    <div>
      <h2 className="bg-green-600 text-xl bold text-white rounded mb-12 p-5 font-bold">
        画像ライブラリー
      </h2>
      <div className="mx-auto flex justify-center items-center">
        <Link href="/home/image/new-image">
          <Button className="px-16 mx-6 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
            画像の追加
          </Button>
        </Link>
        <Link href="/home">
          <Button className="px-16 mx-6 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
            記事の一覧
          </Button>
        </Link>
        <Link href="/home/category">
          <Button className="px-16 mx-6 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
            カテゴリの一覧
          </Button>
        </Link>
      </div>
      <ListImages />
    </div>
  );
};

export default page;
