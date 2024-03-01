import FormPost from "@/app/components/blog/(dashboard)/FormPost";
import prisma from "../../../components/lib/prisma";
import { updatePost } from "@/app/action/action-post";
import DeletePostModal from "@/app/components/blog/(dashboard)/DeletePostModal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事の編集",
};

const page = async ({ params }: { params: { post_id: string } }) => {
  const id = Number(params.post_id);
  const updatePostWidthId = updatePost.bind(null, id);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      postImage: true,
    },
  });
  const categories = await prisma.category.findMany();

  return (
    <>
      <h2 className="bg-green-600 text-xl bold text-white rounded mb-12 p-5 font-bold">
        記事の編集
      </h2>
      <FormPost
        formAction={updatePostWidthId}
        post={post}
        categories={categories}
        buttonName={"編集内容を保存"}
      />
      <DeletePostModal post={post} />
    </>
  );
};

export default page;
