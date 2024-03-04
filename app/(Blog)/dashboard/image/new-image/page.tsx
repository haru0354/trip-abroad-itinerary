"use client";

import { addPostImage } from "@/app/action/action-postImage";
import FormPostImage from "@/app/components/blog/(dashboard)/FormPostImage";

const page = () => {

  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        画像の追加(action)
      </h2>
      <FormPostImage buttonName="画像を追加" formAction={addPostImage} />
    </>
  );
};
export default page;
