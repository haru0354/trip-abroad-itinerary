"use client";

import { addImage } from "@/app/action/action-postImage";
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
      <FormImage buttonName="画像を追加" formAction={addImage} />
      <div>
        <h2 className="bg-green-600 text-xl bold text-white rounded mb-12 p-5 font-bold">
          画像の追加(express)
        </h2>
        {image.preview && <img src={image.preview} width="300" height="300" />}
        <form onSubmit={handleSubmit}>
          <input type="file" name="file" onChange={handleFileChange}></input>
          <button type="submit"  className="px-24 my-8 py-3 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-sky-900">画像の追加</button>
        </form>
        {status && <h4>{status}</h4>}
      </div>
    </>
  );
};
export default page;
