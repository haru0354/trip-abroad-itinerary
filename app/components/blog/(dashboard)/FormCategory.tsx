"use client";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import TextArea from "../../ui/TextArea";
import { useFormState } from "react-dom";
import { useState } from "react";
import Image from "next/image";

type FormCategoryProps = {
  category?: (Category & { postImage: PostImage | null }) | null;
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
};

type Category = {
  name: string;
  slug: string;
  content: string | null;
  description: string;
  title: string | null;
};

type PostImage = {
  id: number;
  altText: string;
  name: string;
  url: string;
};

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    slug?: string[] | undefined;
    altText?: string[] | undefined;
  };
};

const FormCategory: React.FC<FormCategoryProps> = ({
  category,
  buttonName,
  formAction,
}) => {
  const initialState = {
    message: null,
    errors: { name: undefined, slug: undefined },
  };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );

  const [image, setImage] = useState<{ preview: string; data: File | string }>({
    preview: "",
    data: "",
  });
  
  const [error, setError] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageTypes = ["image/jpeg", "image/png", "image/gif"];
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      if (!imageTypes.includes(selectedFile.type)) {
        setError("JPEG、PNG、GIF形式の画像ファイルを選択してください");
        e.target.value = ""; 
        return;
      }

      const img = {
        preview: URL.createObjectURL(selectedFile),
        data: selectedFile,
      };
      setImage(img);
      setError("");
    } else {
      console.error("ファイルが選択されていません");
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!(image.data instanceof File)) {
      formData.delete("postImageId");
      formData.delete("altText");
    }
    dispatch(formData);
  };



  return (
    <>
      <form onSubmit={handleSubmit}>
        {state.message && <p className="text-red-500">{state.message}</p>}
        <Form
          name={"name"}
          label={"カテゴリ名"}
          placeholder={"カテゴリ名を入力してください。"}
          defaultValue={category?.name}
        />
        {state.errors && <p className="text-red-500">{state.errors.name}</p>}
        <Form
          name={"slug"}
          label={"スラッグ"}
          placeholder={
            "カテゴリのスラッグを半角小文字の英数字で入力してください。"
          }
          defaultValue={category?.slug}
        />
        {state.errors && <p className="text-red-500">{state.errors.slug}</p>}
        <TextArea
          name={"description"}
          label={"カテゴリの説明(description)"}
          placeholder={
            "カテゴリの説明(description)を入力してください。この項目は必須ではありません。"
          }
          defaultValue={category?.description}
        />
        <p className="border-b my-5 pb-2 font-semibold">カテゴリを記事にする(カテゴリにコンテンツを表示)</p>
        <TextArea
          name={"title"}
          label={"カテゴリのタイトル"}
          placeholder={
            "カテゴリのタイトルを入力してください。カテゴリページにタイトルが表示されます。この項目は必須ではありません。"
          }
          defaultValue={category?.title || undefined}
        />
        <TextArea
          name={"content"}
          label={"カテゴリの内容"}
          placeholder={
            "カテゴリの内容を入力してください。カテゴリページに表示がされます。この項目は必須ではありません。"
          }
          defaultValue={category?.content || undefined}
        />
        <div className="flex mx-auto">
          {image.preview && (
            <>
              <div className="mr-10 w-full">
                <p className="text-lg font-bold border-b pb-2 mb-6 bold text-gray-900">
                  保存する画像
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
          {category?.postImage && (
            <div className="w-full">
              <p className="text-lg font-bold border-b pb-2 mb-6 bold text-gray-900">
                選択してる画像
              </p>
              <Image
                src={category?.postImage.url}
                alt={category?.postImage.altText}
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
        <Form
          name="postImageId"
          type="file"
          label="アイキャッチ画像"
          onChange={handleFileChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Form
          name="altText"
          label="画像の名前（alt）"
          placeholder="画像の名前を入力してください。"
          defaultValue={category?.postImage?.altText}
        />
        {state.errors && state.errors.altText && (
          <p className="text-red-500">{state.errors.altText}</p>
        )}
        <Button className="px-16 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
          {buttonName}
        </Button>
      </form>
    </>
  );
};

export default FormCategory;
