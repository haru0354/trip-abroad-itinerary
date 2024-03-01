import { addPost } from "@/app/action/action-post";
import FormPost from "@/app/components/blog/(dashboard)/FormPost";
import Button from "@/app/components/ui/Button";
import Link from "next/link";
import prisma from "@/app/components/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事の追加",
};

const page = async () => {
  const categories = await prisma.category.findMany();

  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        記事の追加
      </h2>
      <FormPost
        buttonName="記事を追加する"
        formAction={addPost}
        categories={categories}
      />
      <Link href="/home">
        <Button className="px-24 my-8 py-3 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-sky-900">
          戻る
        </Button>
      </Link>
    </>
  );
};

export default page;
