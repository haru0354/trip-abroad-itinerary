import ListCategory from "@/app/(blog)/components/dashboard/list/ListCategory";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

const page = () => {
  return (
    <>
      <ListCategory />
      <div className="text-center">
        <ButtonNextLink
          href="/dashboard/category/new-category"
          className="rounded"
        >
          カテゴリの追加へ
        </ButtonNextLink>
      </div>
    </>
  );
};

export default page;
