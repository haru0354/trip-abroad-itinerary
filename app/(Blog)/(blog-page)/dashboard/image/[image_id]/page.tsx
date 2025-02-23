import Link from "next/link";

import {
  deletePostImage,
  updatePostImage,
} from "@/app/(blog)/action/actionPostImage";
import { getPostImage } from "@/app/(blog)/lib/service/blogServiceUnique";
import FormPostImage from "@/app/(blog)/components/dashboard/form/FormPostImage";
import Button from "@/app/components/ui/button/Button";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import HeadingTwo from "@/app/(blog)/components/ui/dashboard/HeadingTwo";

const page = async ({ params }: { params: { image_id: string } }) => {
  const id = Number(params.image_id);
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
      <Link href="/dashboard/image/">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
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
