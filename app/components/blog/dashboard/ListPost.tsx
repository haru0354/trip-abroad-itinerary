import prisma from "@/app/components/lib/prisma";
import Button from "../../ui/Button";
import Link from "next/link";

const ListPost = async () => {
  const posts = await prisma.post.findMany({
    include: {
      category: true,
    },
  });

  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        記事の一覧
      </h2>
      <div className="flex flex-col border border-gray-500 sm:flex-row py-4 items-center w-full sm:w-auto">
        <p className="sm:border-r border-gray-500  w-full py-1 px-2 sm:w-auto min-w-[120px]">
          投稿日
        </p>
        <p className="sm:border-r flex-wrap  w-full border-gray-500 py-1 px-2 sm:w-auto min-w-[120px]">
          カテゴリ
        </p>
        <p className=" flex-wrap  w-full border-gray-500 py-1 px-2 sm:w-auto  min-w-[250px] max-w-[650px]">
          タイトル
        </p>
      </div>
      <div className="mb-10">
        {posts.map((post) => {
          const formattedCreatedDate = new Date(
            post.createdDate
          ).toLocaleDateString();
          return (
            <div
              key={post.id}
              className="flex justify-between flex-col sm:flex-row border-b border-gray-500 w-full"
            >
              <div className="flex flex-col  sm:flex-row py-4 items-center w-full sm:w-auto">
                <p className="sm:border-r border-gray-500  w-full py-1 px-2 sm:w-auto min-w-[120px]">
                  {formattedCreatedDate}
                </p>
                <p className="sm:border-r flex-wrap  w-full border-gray-500 py-1 px-2 sm:w-auto min-w-[120px]">
                  {post.category.name}
                </p>
                <p className="py-1 px-2 w-full sm:w-auto min-w-[250px] max-w-[650px]">
                  {post.title && post.title.length > 36
                    ? `${post.title.slice(0, 36)}...`
                    : post.title}
                </p>
              </div>
              <div className="flex sm:justify-end items-center my-4 sm:max-w-[240px]">
                <Link href={`/${post.category.slug}/${post.slug}`}>
                  <Button color="blue" size="small">
                    ページ
                  </Button>
                </Link>
                <Link href={`/dashboard/post/${post.id}`}>
                  <Button color="gray" size="small">
                    編集
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListPost;
