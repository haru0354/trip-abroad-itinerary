import Link from "next/link";
import ListDraftTruePosts from "@/app/(blog)/components/dashboard/list/posts/ListDraftTruePosts";
import Button from "@/app/components/ui/Button";

const page = () => {
  return (
    <>
      <ListDraftTruePosts />
      <Button color="blue" size="normal" className="my-6">
        <Link href="/dashboard/post/private-post">未公開記事に切り替え</Link>
      </Button>
    </>
  );
};

export default page;
