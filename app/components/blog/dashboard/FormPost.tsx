"use client";

import TextArea from "@/app/components/ui/TextArea";
import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import Select from "../../ui/Select";
import { useFormState } from "react-dom";
import FormImage from "../../ui/FormImage";
import DOMPurify from "dompurify";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";

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
  draft: boolean;
};

type FormState = {
  message?: string | null;
  errors?: {
    title?: string[] | undefined;
    content?: string[] | undefined;
    slug?: string[] | undefined;
    description?: string[] | undefined;
    image?: string[] | undefined;
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
  const [isDraft, setIsDraft] = useState<boolean>(post?.draft ?? false); 

  const handleToggle = () => {
    setIsDraft(!isDraft); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const sanitizedFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      if (key !== "image" && typeof value === "string") {
        const sanitizedValue = DOMPurify.sanitize(value, {
          ALLOWED_TAGS: ["next"],
          ALLOWED_ATTR: ["href"]
        });
        sanitizedFormData.append(key, sanitizedValue);
      } else {
        sanitizedFormData.append(key, value);
      }
    }
    sanitizedFormData.set("draft", isDraft.toString());

    dispatch(sanitizedFormData);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-full">
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
            <FormImage
              selectImage={post?.postImage}
              state={state}
              label="画像の名前(alt)"
              placeholder="どんな画像か入力してください。検索エンジンが画像を認識するのに役立ちます"
            />
            <Checkbox
              checked={isDraft}
              name="draft"
              item="公開(未選択状態は下書き保存されます)"
              label="記事の公開設定"
              onChange={handleToggle}
            />
            <Button color="blue" size="normal" className="rounded mt-4">
              {buttonName}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormPost;
