import Link from "next/link";
import { deletePost, updatePost } from "@/app/(blog)/action/actionPost";
import { getPost } from "@/app/(blog)/lib/service/blogServiceUnique";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import FormPost from "@/app/(blog)/components/dashboard/form/FormPost";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import Button from "@/app/components/ui/button/Button";
import HeadingTwo from "@/app/(blog)/components/ui/dashboard/HeadingTwo";

const page = async ({ params }: { params: { post_id: string } }) => {
  const id = Number(params.post_id);
  const updatePostWidthId = updatePost.bind(null, id);
  const post = await getPost("id", params.post_id, "categoryAndPostImage");
  const categories = await getCategories();

  return (
    <>
      <HeadingTwo>記事の編集</HeadingTwo>
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
