import { addPost } from "@/app/action/action-post";
import FormPost from "@/app/components/blog/FormPost";
import Button from "@/app/components/ui/Button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="max-w-screen-lg flex justify-center items-center mx-auto">
        <div className="w-full">
          <h2 className="bg-green-600 text-xl bold text-white rounded mt-10 mb-12 p-5 font-bold">
            記事の追加
          </h2>
          <FormPost
            buttonName="記事を追加する"
            formAction={addPost}
            dateName="createdDate"
          />
          <Link href="/home">
            <Button className="px-24 my-8 py-3 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-sky-900">
              戻る
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
