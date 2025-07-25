import { getPost } from "@/app/(blog)/lib/service/blogServiceUnique";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import { deletePost, updatePost } from "@/app/(blog)/action/actionPost";

import FormPost from "@/app/(blog)/components/dashboard/form/FormPost";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import HeadingTwo from "@/app/(blog)/components/ui/dashboard/HeadingTwo";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

const page = async ({ params }: { params: { post_id: string } }) => {
  const postId = params.post_id;
  const updatePostWidthId = updatePost.bind(null, postId);
  const post = await getPost("id", postId, "categoryAndPostImage");
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
      <div className="text-center">
        <ButtonNextLink
          href="/dashboard/post"
          color="gray"
          className="mt-4 rounded"
        >
          キャンセル
        </ButtonNextLink>
      </div>
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
