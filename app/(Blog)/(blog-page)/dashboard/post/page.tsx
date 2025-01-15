import Link from "next/link";
import ListDraftTruePosts from "@/app/(blog)/components/dashboard/list/posts/ListDraftTruePosts";
import Button from "@/app/components/ui/Button";

const page = () => {
  return (
    <>
      <ListDraftTruePosts />
      <div className="flex flex-wrap items-center justify-center mx-auto max-w-[600px]">
        <Button color="blue" size="normal" className="my-6">
          <Link href="/dashboard/post/new-post">新規記事の追加へ</Link>
        </Button>
        <Button color="gray" size="normal" className="my-6">
          <Link href="/dashboard/post/private-post">未公開記事一覧へ</Link>
        </Button>
      </div>
    </>
  );
};

export default page;
