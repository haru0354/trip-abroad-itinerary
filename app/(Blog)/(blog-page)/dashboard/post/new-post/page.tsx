import { addPost } from "@/app/(blog)/action/actionPost";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import FormPost from "@/app/(blog)/components/dashboard/form/FormPost";

const page = async () => {
  const categories = await getCategories()
  
  return (
    <>
      <h2 className="mb-12 p-5 text-xl font-bold rounded text-white bg-blog-dashboardHeading">
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
