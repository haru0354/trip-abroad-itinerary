import type { Metadata } from "next";

import {
  updateCategory,
  deleteCategory,
} from "@/app/(blog)/action/actionCategory";
import { getCategory } from "@/app/(blog)/lib/service/blogServiceUnique";
import FormCategory from "@/app/(blog)/components/dashboard/form/FormCategory";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import HeadingTwo from "@/app/(blog)/components/ui/dashboard/HeadingTwo";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

export const metadata: Metadata = {
  title: "カテゴリの編集",
};

const page = async ({ params }: { params: { category_id: string } }) => {
  const id = params.category_id;
  const updateCategoryWidthId = updateCategory.bind(null, id);

  const category = await getCategory("id", params.category_id, "postImage");

  return (
    <>
      <HeadingTwo>カテゴリの編集</HeadingTwo>
      <FormCategory
        formAction={updateCategoryWidthId}
        category={category}
        buttonName={"編集内容を保存"}
      />
      <div className="text-center">
        <ButtonNextLink
          href="/dashboard/category/"
          color="gray"
          className="min-w-[194px] mt-4 rounded"
        >
          キャンセル
        </ButtonNextLink>
      </div>
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
