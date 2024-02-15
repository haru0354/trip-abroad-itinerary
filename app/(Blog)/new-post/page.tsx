import { addPost } from "@/app/action/action-post";
import FormPost from "@/app/components/blog/FormPost";

const page = () => {
  return (
    <>
      <div>
        <h2 className="bg-green-600 text-xl bold text-white rounded mt-10 mb-12 p-5 font-bold">
          記事の追加
        </h2>
        <FormPost buttonName="記事を追加する" formAction={addPost} dateName="createdDate"/>
      </div>
    </>
  );
};

export default page;
