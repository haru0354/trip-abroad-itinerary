import {
  deletePostImage,
  updatePostImage,
} from "@/app/(blog)/action/actionPostImage";
import { getPostImage } from "@/app/(blog)/lib/service/blogServiceUnique";

import FormPostImage from "@/app/(blog)/components/dashboard/form/FormPostImage";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import HeadingTwo from "@/app/(blog)/components/ui/dashboard/HeadingTwo";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

const page = async ({ params }: { params: { image_id: string } }) => {
  const id = params.image_id;
  const updatePostImageWidthId = updatePostImage.bind(null, id);
  const postImage = await getPostImage(params.image_id);

  return (
    <>
      <HeadingTwo>画像の編集</HeadingTwo>
      <FormPostImage
        formAction={updatePostImageWidthId}
        postImage={postImage}
        buttonName="編集内容を保存"
      />
      <div className="text-center">
        <ButtonNextLink
          href="/dashboard/image"
          color="gray"
          className="mt-4 rounded"
        >
          キャンセル
        </ButtonNextLink>
      </div>
      <DeleteModal
        DeleteName="画像"
        name={postImage?.name}
        formAction={deletePostImage}
        id={postImage?.id}
      />
    </>
  );
};

export default page;
