"use client";

import Form from "../ui/Form";
import Button from "../ui/Button";
import { useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";

type FormImageProps = {
  postImage?: PostImage | null;
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
};

type PostImage = {
  url: string;
  altText: string;
};

type FormState = {
  message?: string | null;
  errors?: {
    file?: string[] | undefined;
    altText?: string[] | undefined;
  };
};

const FormImage: React.FC<FormImageProps> = ({
  postImage,
  buttonName,
  formAction,
}) => {
  const initialState = {
    message: null,
    errors: { file: undefined, altText: undefined },
  };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );

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

    dispatch(formData);
  };

  return (
    <div>
      <div className="flex mx-auto">
        {image.preview && (
          <>
            <div className="mr-10 w-full">
              <p className="text-lg font-bold border-b pb-2 mb-6 bold text-gray-900">
                変更後の画像
              </p>
              <img
                src={image.preview}
                width="300"
                height="300"
                className="pb-2 mb-6"
              />
            </div>
          </>
        )}
        {postImage && (
          <div className="w-full">
            <p className="text-lg font-bold border-b pb-2 mb-6 bold text-gray-900">
              選択してる画像
            </p>
            <Image
              src={postImage.url}
              alt={postImage.altText}
              width={300}
              height={300}
              style={{
                width: "300px",
                height: "auto",
              }}
            />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        {state.message && <p className="text-red-500">{state.message}</p>}

        <Form
          label="画像を選択"
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        {state.errors && <p className="text-red-500">{state.errors.file}</p>}
        <Form
          label="画像の名前(alt)"
          name="altText"
          defaultValue={postImage?.altText}
          placeholder={
            "どんな画像か入力してください。検索エンジンが画像を認識するのに役立ちます"
          }
        />
        {state.errors && <p className="text-red-500">{state.errors.altText}</p>}
        <Button className="px-24 my-8 py-3 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-gray-900">
          {buttonName}
        </Button>
      </form>
    </div>
  );
};

export default FormImage;
