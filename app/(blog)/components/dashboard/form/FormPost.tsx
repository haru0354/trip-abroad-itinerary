"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import DOMPurify from "dompurify";
import FormContainer from "../../layout/dashboard/FormContainer";
import Form from "@/app/components/ui/Form";
import TextArea from "@/app/components/ui/TextArea";
import Button from "@/app/components/ui/Button";
import Select from "@/app/components/ui/Select";
import FormImage from "@/app/components/ui/FormImage";
import Checkbox from "@/app/components/ui/Checkbox";
import { PostFormState } from "@/app/(blog)/types/formState";

type FormPostProps = {
  post?: (Post & { category: Category; postImage: PostImage | null }) | null;
  categories?: Category[] | null;
  formAction: (state: PostFormState, data: FormData) => Promise<PostFormState>;
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

  const [state, dispatch] = useFormState<PostFormState, FormData>(
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
          ADD_TAGS: ["next"],
          ADD_ATTR: ["href"],
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
    <FormContainer>
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
    </FormContainer>
  );
};

export default FormPost;
