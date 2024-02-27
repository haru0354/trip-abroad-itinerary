"use client";
import { addImage } from "@/app/action/action-postImage";

import Form from "../ui/Form";
import Button from "../ui/Button";
import { useState } from "react";

type FormImageProps = {
  postImage?: PostImage | null;
  buttonName: string;
  formAction?: (formData: FormData) => Promise<void>;
};

type PostImage = {
  url: string;
  altText: string;
};

const FormImage: React.FC<FormImageProps> = ({
  postImage,
  buttonName,
  formAction,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<ArrayBuffer | null>(null);

  const [image, setImage] = useState<{ preview: string; data: File | string }>({
    preview: "",
    data: "",
  });

  const handleUploadClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("file0", image.data);

    // 元のフォームデータを含めるようにする
    for (const [key, value] of data.entries()) {
      formData.append(key, value);
    }
    console.log("image.dataの内容だよ", image.data);

    addImage(formData);
  };

  return (
    <div>
      {image.preview && <img src={image.preview} width="300" height="300" />}
      <form action={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleUploadClick}
        />
        <Form
          label="画像の名前"
          name="altText"
          placeholder="画像の名前を入力してください。"
          defaultValue={postImage?.altText}
        />
        <Button className="px-24 my-8 py-3 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-sky-900">
          {buttonName}
        </Button>
      </form>
    </div>
  );
};

export default FormImage;
