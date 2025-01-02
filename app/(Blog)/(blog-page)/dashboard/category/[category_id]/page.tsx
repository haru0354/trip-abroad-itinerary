import type { Metadata } from "next";
import Link from "next/link";
import { updateCategory, deleteCategory } from "@/app/(blog)/action/action-category";
import { getCategory } from "@/app/(blog)/lib/service/blogServiceUnique";
import FormCategory from "@/app/(blog)/components/dashboard/form/FormCategory";
import Button from "@/app/components/ui/Button";
import DeleteModal from "@/app/components/ui/DeleteModal";

export const metadata: Metadata = {
  title: "カテゴリの編集",
};

const page = async ({ params }: { params: { category_id: string } }) => {
  const id = Number(params.category_id);
  const updateCategoryWidthId = updateCategory.bind(null, id);

  const category = await getCategory("id", params.category_id, "postImage");

  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        カテゴリの編集
      </h2>
      <FormCategory
        formAction={updateCategoryWidthId}
        category={category}
        buttonName={"編集内容を保存"}
      />
      <Link href="/dashboard/category/">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <DeleteModal
        DeleteName="カテゴリ"
        name={category?.name}
        formAction={deleteCategory}
        id={category?.id}
      />
    </>
  );
};

export default page;
