import prisma from "@/app/components/lib/prisma";
import { updatePost } from "@/app/action/action-post";
import DeleteCategoryModal from "@/app/components/blog/DeleteCategoryModal";
import FormCategory from "@/app/components/blog/FormCategory";
import { updateCategory } from "@/app/action/action-category";

const page = async ({ params }: { params: { category_id: string } }) => {
  const id = Number(params.category_id);
  const updateCategoryWidthId = updateCategory.bind(null, id);

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
      <div className="max-w-screen-lg flex justify-center items-center mx-auto">
        <div className="w-full">
          <h2 className="bg-green-600 text-xl bold text-white rounded mt-10 mb-12 p-5 font-bold">
            記事の編集
          </h2>
          <FormCategory
            formAction={updateCategoryWidthId}
            category={category}
            buttonName={"編集内容を保存"}
          />
          <DeleteCategoryModal category={category} />
        </div>
      </div>
    </>
  );
};

export default page;
