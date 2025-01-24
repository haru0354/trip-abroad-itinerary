import { addPostImage } from "@/app/(blog)/action/actionPostImage";
import FormPostImage from "@/app/(blog)/components/dashboard/form/FormPostImage";
import HeadingTwo from "@/app/(blog)/components/ui/dashboard/HeadingTwo";

const page = () => {
  return (
    <>
      <HeadingTwo>画像の追加</HeadingTwo>
      <FormPostImage buttonName="画像を追加" formAction={addPostImage} />
    </>
  );
};
export default page;
