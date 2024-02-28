"use client";

import { addPostImage } from "@/app/action/action-postImage";
import FormImage from "@/app/components/blog/FormImage";
import { useState } from "react";

const page = () => {
  const [image, setImage] = useState<{ preview: string; data: File | string }>({
    preview: "",
    data: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);
    const response = await fetch("http://localhost:5000/image", {
      method: "POST",
      body: formData,
    });
    if (response) setStatus(response.statusText);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      const img = {
        preview: URL.createObjectURL(selectedFile),
        data: selectedFile,
      };
      setImage(img);
    } else {
      console.error("ファイルが選択されていません");
      return;
    }
  };

  return (
    <>
      <h2 className="bg-green-600 text-xl bold text-white rounded mb-12 p-5 font-bold">
        画像の追加(action)
      </h2>
      <FormImage buttonName="画像を追加" formAction={addPostImage} />
    </>
  );
};
export default page;
