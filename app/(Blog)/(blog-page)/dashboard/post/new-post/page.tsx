import { addPost } from "@/app/(blog)/action/action-post";

import FormPost from "@/app/components/blog/dashboard/FormPost";
import { getCategories } from "@/app/components/lib/BlogServiceMany";

const page = async () => {
  const categories = await getCategories()
  
  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        記事の追加
      </h2>
      <FormPost
        buttonName="記事を追加"
        formAction={addPost}
        categories={categories}
      />
    </>
  );
};

export default page;
