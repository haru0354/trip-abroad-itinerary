import { addPostImage } from "@/app/(blog)/action/actionPostImage";
import FormPostImage from "@/app/(blog)/components/dashboard/form/FormPostImage";

const page = () => {
  return (
    <>
      <h2 className="mb-12 p-5 text-xl font-bold rounded text-white bg-blog-dashboardHeading">
        画像の追加
      </h2>
      <FormPostImage buttonName="画像を追加" formAction={addPostImage} />
    </>
  );
};
export default page;
