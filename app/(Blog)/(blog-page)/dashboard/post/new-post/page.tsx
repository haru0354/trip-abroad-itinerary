import { addPost } from "@/app/(blog)/action/actionPost";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import FormPost from "@/app/(blog)/components/dashboard/form/FormPost";
import HeadingTwo from "@/app/(blog)/components/ui/dashboard/HeadingTwo";

const page = async () => {
  const categories = await getCategories();

  return (
    <>
      <HeadingTwo>記事の追加</HeadingTwo>
      <FormPost
        buttonName="記事を追加"
        formAction={addPost}
        categories={categories}
      />
    </>
  );
};

export default page;
