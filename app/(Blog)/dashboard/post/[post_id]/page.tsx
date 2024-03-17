import Link from "next/link";
import prisma from "../../../../components/lib/prisma";

import FormPost from "@/app/components/blog/dashboard/FormPost";
import DeleteModal from "@/app/components/ui/DeleteModal";
import Button from "@/app/components/ui/Button";

import { deletePost, updatePost } from "@/app/action/action-post";

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
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        記事の編集
      </h2>
      <FormPost
        formAction={updatePostWidthId}
        post={post}
        categories={categories}
        buttonName={"編集内容を保存"}
      />
      <Link href="/dashboard/post/">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <DeleteModal
        DeleteName="記事"
        name={post?.title}
        formAction={deletePost}
        id={post?.id}
      />
    </>
  );
};

export default page;
