import FormPost from "@/app/components/blog/FormPost";
import prisma from "../../../components/lib/prisma";
import { updatePost } from "@/app/action/action-post";
import DeletePostModal from "@/app/components/blog/DeletePostModal";

const page = async ({ params }: { params: { post_id: string } }) => {
  const id = Number(params.post_id);
  const updatePostWidthId = updatePost.bind(null, id);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
          <h2 className="bg-green-600 text-xl bold text-white rounded mb-12 p-5 font-bold">
            記事の編集
          </h2>
          <FormPost
            formAction={updatePostWidthId}
            post={post}
            buttonName={"編集内容を保存"}
          />
          <DeletePostModal post={post} />
    </>
  );
};

export default page;
