import { addImage } from "@/app/action/action-postImage";
import FormImage from "@/app/components/blog/FormImage";

const page = () => {
  return (
    <>
      <div>画像の追加</div>
      <FormImage buttonName="画像を追加"/>
    </>
  );
};

export default page;
