import prisma from "@/app/components/lib/prisma";
import DeleteCategoryModal from "@/app/components/blog/(dashboard)/DeleteCategoryModal";
import FormCategory from "@/app/components/blog/(dashboard)/FormCategory";
import { updateCategory } from "@/app/action/action-category";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カテゴリの編集",
};

const page = async ({ params }: { params: { category_id: string } }) => {
  const id = Number(params.category_id);
  const updateCategoryWidthId = updateCategory.bind(null, id);

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    include:{
      postImage: true,
    }
  });

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
      <DeleteCategoryModal category={category} />
    </>
  );
};

export default page;
