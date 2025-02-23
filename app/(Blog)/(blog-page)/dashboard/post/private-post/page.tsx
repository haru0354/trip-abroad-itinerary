import Link from "next/link";

import ListDraftFalsePosts from "@/app/(blog)/components/dashboard/list/posts/ListDraftFalsePosts";
import Button from "@/app/components/ui/button/Button";

const page = () => {
  return (
    <>
      <ListDraftFalsePosts />
      <Button color="blue" size="normal" className="my-6">
        <Link href="/dashboard/post/">公開記事に切り替え</Link>
      </Button>
    </>
  );
};

export default page;
