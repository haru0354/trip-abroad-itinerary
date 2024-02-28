import ListImages from "@/app/components/blog/ListImages";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

const page = () => {
  return (
    <div>
      <Link href="/home/image/new-image">
        <Button className="px-16 mx-6 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
          画像の追加
        </Button>
      </Link>
      <h2>画像ライブラリー</h2>
      <ListImages />
    </div>
  );
};

export default page;
