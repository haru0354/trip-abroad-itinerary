import Link from "next/link";
import {
  deletePostImage,
  updatePostImage,
} from "@/app/(blog)/action/action-postImage";
import { getPostImage } from "@/app/(blog)/lib/service/blogServiceUnique";
import FormPostImage from "@/app/(blog)/components/dashboard/form/FormPostImage";
import Button from "@/app/components/ui/Button";
import DeleteModal from "@/app/components/ui/DeleteModal";

const page = async ({ params }: { params: { image_id: string } }) => {
  const id = Number(params.image_id);
  const updatePostImageWidthId = updatePostImage.bind(null, id);
  const postImage = await getPostImage(params.image_id)

  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        画像の編集
      </h2>
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
