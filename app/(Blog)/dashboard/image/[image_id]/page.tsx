import prisma from "@/app/components/lib/prisma";
import { updatePostImage } from "@/app/action/action-postImage";
import type { Metadata } from "next";
import FormPostImage from "@/app/components/blog/dashboard/FormPostImage";
import DeletePostImageModal from "@/app/components/blog/dashboard/DeletePostImageModal";

export const metadata: Metadata = {
  title: "画像の編集",
};

const page = async ({ params }: { params: { image_id: string } }) => {
  const id = Number(params.image_id);
  const updatePostImageWidthId = updatePostImage.bind(null, id);

  const postImage = await prisma.postImage.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        画像の編集
      </h2>
      <FormPostImage
        formAction={updatePostImageWidthId}
        postImage={postImage}
        buttonName={"編集内容を保存"}
      />
      <DeletePostImageModal postImage={postImage} />
    </>
  );
};

export default page;
