import prisma from "@/app/components/lib/prisma";
import Button from "../ui/Button";
import Link from "next/link";

const ListPost = async () => {
  const posts = await prisma.post.findMany();

  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post.id} className="flex border-b border-gray-500 p-4">
            <p className="border-r border-gray-500 py-1 px-10">
              {post.createdDate}
            </p>
            <p className="border-r border-gray-500 py-1 px-40">{post.title}</p>
            <p className="border-r border-gray-500 py-1 px-40">{post.category}</p>
            <Link href={`/home/${post.id}`}>
            <Button className="px-8 py-1 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
              編集
            </Button>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ListPost;
