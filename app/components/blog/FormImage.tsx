"use client";

import Form from "../ui/Form";
import Button from "../ui/Button";
import { useState } from "react";

type FormImageProps = {
  postImage?: PostImage | null;
  buttonName: string;
  formAction: (formData: FormData) => Promise<void>;
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
  const [image, setImage] = useState<{ preview: string; data: File | string }>({
    preview: "",
    data: "",
  });
  const [status, setStatus] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image.data);
    formData.append("altText", e.currentTarget.altText.value);

    formAction(formData);
  };

  return (
    <div>
      {image.preview && <img src={image.preview} width="300" height="300" />}
      <form onSubmit={handleSubmit}>
        <Form
          label="画像を追加"
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        <Form
          label="画像の名前(alt)"
          name="altText"
          defaultValue={postImage?.altText}
          placeholder={
            "どんな画像か入力してください。検索エンジンが画像を認識するのに役立ちます"
          }
        />
        <Button className="px-24 my-8 py-3 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-gray-900">
          {buttonName}
        </Button>
      </form>
    </div>
  );
};

export default FormImage;
