import Link from "next/link";
import ListCategory from "@/app/(blog)/components/dashboard/list/ListCategory";
import Button from "@/app/components/ui/Button";

const page = () => {
  return (
    <>
      <ListCategory />
      <Button color="blue" size="normal" className="my-6">
        <Link href="/dashboard/category/new-category">カテゴリの追加へ</Link>
      </Button>
    </>
  );
};

export default page;
