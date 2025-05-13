import ListDraftTruePosts from "@/app/(blog)/components/dashboard/list/posts/ListDraftTruePosts";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

const page = () => {
  return (
    <>
      <ListDraftTruePosts />
      <div className="flex flex-wrap items-center justify-center mx-auto max-w-[600px]">
        <ButtonNextLink
          href="/dashboard/post/new-post"
          className="my-6 rounded"
        >
          新規記事の追加へ
        </ButtonNextLink>
        <ButtonNextLink
          href="/dashboard/post/private-post"
          color="gray"
          className="my-6 rounded"
        >
          未公開記事一覧へ
        </ButtonNextLink>
      </div>
    </>
  );
};

export default page;
