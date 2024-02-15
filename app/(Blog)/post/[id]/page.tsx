import FormPost from "@/app/components/blog/FormPost";
import prisma from "../../../components/lib/prisma";
import { updatePost } from "@/app/action/action-post";
import DeletePostModal from "@/app/components/blog/DeletePostModal";

const page = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const updatePostWidthId = updatePost.bind(null, id);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
      <FormPost
        formAction={updatePostWidthId}
        post={post}
        buttonName={"編集内容を保存"}
        dateName="updatedDate"
      />

      <DeletePostModal 
      post={post} />
    </>
  );
};

export default page;
