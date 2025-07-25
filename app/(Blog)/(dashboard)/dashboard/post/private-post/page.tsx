import ListDraftFalsePosts from "@/app/(blog)/components/dashboard/list/posts/ListDraftFalsePosts";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

const page = () => {
  return (
    <>
      <ListDraftFalsePosts />
      <div className="text-center">
        <ButtonNextLink href="/dashboard/post/" className="my-6 rounded">
          公開記事に切り替え
        </ButtonNextLink>
      </div>
    </>
  );
};

export default page;
