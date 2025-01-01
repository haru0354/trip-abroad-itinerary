import Link from "next/link";
import { deletePost, updatePost } from "@/app/(blog)/action/action-post";
import { getPost } from "@/app/(blog)/lib/service/blogServiceUnique";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import FormPost from "@/app/(blog)/components/dashboard/form/FormPost";
import DeleteModal from "@/app/components/ui/DeleteModal";
import Button from "@/app/components/ui/Button";

const page = async ({ params }: { params: { post_id: string } }) => {
  const id = Number(params.post_id);
  const updatePostWidthId = updatePost.bind(null, id);
  const post = await getPost("id", params.post_id, "categoryAndPostImage")
  const categories = await getCategories()

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
