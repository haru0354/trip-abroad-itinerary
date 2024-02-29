import prisma from "@/app/components/lib/prisma";
import Button from "../../ui/Button";
import Link from "next/link";

const ListPost = async () => {
  const posts = await prisma.post.findMany({
    include: {
      category: true, // リレーションされたCategoryモデルの情報を含める
    },
  });

  return (
    <>
      <div className="mb-10">
        {posts.map((post) => {
          const formattedCreatedDate = new Date(
            post.createdDate
          ).toLocaleDateString();
          return (
            <div key={post.id} className="flex border-b border-gray-500 py-4">
              <p className="border-r border-gray-500 py-1 px-2 min-w-[110px]">
                {formattedCreatedDate}
              </p>
              <p className="flex-grow border-r border-gray-500 py-1 px-2 min-w-[110px] max-w-[550px]">
                {post.title}
              </p>
              <p className="py-1 px-2 border-r border-gray-500 min-w-[130px] max-w-[130px]">
                {post.category.name}
              </p>
              <Link href={`/${post.category.slug}/${post.slug}`}>
                <Button className="min-w-[100px] px-6 py-1 mx-2 shadow font-bold bg-blue-700 text-white hover:bg-white hover:text-black border border-sky-900">
                  ページへ
                </Button>
              </Link>
              <Link href={`/dashboard/${post.id}`}>
                <Button className="min-w-[100px] px-6 py-1 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-sky-900">
                  編集
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListPost;
