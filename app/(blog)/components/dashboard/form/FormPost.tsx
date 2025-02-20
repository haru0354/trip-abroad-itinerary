"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DOMPurify from "dompurify";

import FormContainer from "../../layout/dashboard/FormContainer";
import Input from "@/app/components/ui/form/Input";
import TextArea from "@/app/components/ui/form/TextArea";
import Button from "@/app/components/ui/button/Button";
import Select from "@/app/components/ui/form/Select";
import FormImage from "@/app/components/ui/form/FormImage";
import Checkbox from "@/app/components/ui/form/Checkbox";

import type { Category } from "@prisma/client";
import type { PostWithCategoryAndImage } from "@/app/(blog)/types/PostTypes";
import type { PostFormState } from "@/app/(blog)/types/formState";
import type { PostFormType } from "@/app/(blog)/types/formTypes";

type FormPostProps = {
  post?: PostWithCategoryAndImage | null;
  categories?: Category[] | null;
  formAction: (state: PostFormState, data: FormData) => Promise<PostFormState>;
  buttonName: string;
};

const FormPost: React.FC<FormPostProps> = ({
  post,
  categories,
  formAction,
  buttonName,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormType>({
    mode: "onBlur",
  });

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

  const onSubmit: SubmitHandler<PostFormType> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("categoryId", data.categoryId);
    formData.append("slug", data.slug);
    formData.append("content", data.content);
    formData.append("description", data.description);
    formData.append("draft", isDraft.toString());

    if (data.image) {
      if (data.image instanceof FileList) {
        formData.append("image", data.image[0]);
      } else if (data.image instanceof File) {
        formData.append("image", data.image);
      }
    }

    if (data.altText) formData.append("altText", data.altText);

    for (const [key, value] of formData.entries()) {
      if (key !== "image" && typeof value === "string") {
        const sanitizedValue = DOMPurify.sanitize(value, {
          ADD_TAGS: ["next"],
          ADD_ATTR: ["href"],
        });
        formData.set(key, sanitizedValue);
      }
    }

    try {
      dispatch(formData);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          label="記事のタイトル"
          defaultValue={post?.title}
          placeholder="記事のタイトルを31文字を目安に入力してください。"
          register={register}
          required={true}
          error={errors.title?.message || state.errors?.title}
        />
        <Select
          label="カテゴリ"
          name="categoryId"
          categories={categories}
          defaultValue={category?.id}
          register={register}
          required={true}
          error={errors.categoryId?.message || state.errors?.categoryId}
        />
        <Input
          name="slug"
          label="スラッグ"
          defaultValue={post?.slug}
          placeholder="記事のスラッグを入力してください。"
          register={register}
          required={true}
          error={errors.slug?.message || state.errors?.slug}
        />
        <TextArea
          name="content"
          label="記事の内容"
          defaultValue={post?.content}
          placeholder="記事の内容をこちらに入力してください。"
          register={register}
          required={true}
          error={errors.content?.message || state.errors?.content}
        />
        <TextArea
          name="description"
          label="記事の説明(description)"
          defaultValue={post?.description}
          placeholder="120文字を目安に記入してください。"
          register={register}
          required={true}
          error={errors.description?.message || state.errors?.description}
        />
        <FormImage
          selectImage={post?.postImage}
          state={state}
          register={register}
          defaultValue={post?.postImage?.altText}
        />
        <Checkbox
          checked={isDraft}
          name="draft"
          item="公開(未選択状態は下書き保存されます)"
          label="記事の公開設定"
          onChange={handleToggle}
        />
        {state.message && <p className="text-red-500">{state.message}</p>}
        <Button color="blue" size="normal" className="rounded mt-4">
          {buttonName}
        </Button>
      </form>
    </FormContainer>
  );
};

export default FormPost;
