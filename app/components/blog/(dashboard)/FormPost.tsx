"use client";

import TextArea from "@/app/components/ui/TextArea";
import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import Select from "../../ui/Select";
import { useFormState } from "react-dom";
import { useState } from "react";
import Image from "next/image";

type FormPostProps = {
  post?: (Post & { category: Category; postImage: PostImage | null }) | null;
  categories?: Category[] | null;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
  buttonName: string;
};

type Category = {
  id: number;
  name: string;
};

type PostImage = {
  id: number;
  altText: string;
  name: string;
  url: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  slug: string;
  description: string;
};

type FormState = {
  message?: string | null;
  errors?: {
    title?: string[] | undefined;
    content?: string[] | undefined;
    slug?: string[] | undefined;
    description?: string[] | undefined;
    categoryId?: string[] | undefined;
    altText?: string[] | undefined;
  };
};

const FormPost: React.FC<FormPostProps> = ({
  post,
  categories,
  formAction,
  buttonName,
}) => {
  const initialState = {
    message: null,
    errors: {
      title: undefined,
      categoryId: undefined,
      slug: undefined,
      content: undefined,
      description: undefined,
      altText: undefined,
    },
  };
  const category = post?.category;

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
        <Form
          name="title"
          label="記事のタイトル"
          defaultValue={post?.title}
          placeholder="記事のタイトルを31文字を目安に入力してください。"
        />
        {state.errors && state.errors.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
        <Select
          label="カテゴリ"
          name="categoryId"
          categories={categories}
          defaultValue={category?.id}
        />
        <Form
          name="slug"
          label="スラッグ"
          defaultValue={post?.slug}
          placeholder="記事のスラッグを入力してください。"
        />
        {state.errors && state.errors.slug && (
          <p className="text-red-500">{state.errors.slug}</p>
        )}
        <TextArea
          name="content"
          label="記事の内容"
          defaultValue={post?.content}
          placeholder="記事の内容をこちらに入力してください。"
        />
        {state.errors && state.errors.content && (
          <p className="text-red-500">{state.errors.content}</p>
        )}
        <TextArea
          name="description"
          label="記事の説明(description)"
          defaultValue={post?.description}
          placeholder="120文字を目安に記入してください。"
        />
        {state.errors && state.errors.description && (
          <p className="text-red-500">{state.errors.description}</p>
        )}
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
          {post?.postImage && (
            <div className="w-full">
              <p className="text-lg font-bold border-b pb-2 mb-6 bold text-gray-900">
                選択してる画像
              </p>
              <Image
                src={post?.postImage.url}
                alt={post?.postImage.altText}
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
          label="アイキャッチ"
          onChange={handleFileChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Form
          name="altText"
          label="画像の名前（alt）"
          placeholder="画像の名前を入力してください。"
          defaultValue={post?.postImage?.altText}
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

export default FormPost;
