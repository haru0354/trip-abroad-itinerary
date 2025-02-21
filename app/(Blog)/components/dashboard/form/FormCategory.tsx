"use client";

import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import FormContainer from "../../layout/dashboard/FormContainer";
import Input from "@/app/components/ui/form/Input";
import Button from "@/app/components/ui/button/Button";
import TextArea from "@/app/components/ui/form/TextArea";
import FormImage from "@/app/components/ui/form/FormImage";

import type { CategoryFormState } from "@/app/(blog)/types/formState";
import type { CategoryFormType } from "@/app/(blog)/types/formTypes";
import type { CategoryWithPostImage } from "@/app/(blog)/types/categoryTypes";

type FormCategoryProps = {
  category?: CategoryWithPostImage | null;
  buttonName: string;
  formAction: (
    state: CategoryFormState,
    data: FormData
  ) => Promise<CategoryFormState>;
};

const FormCategory: React.FC<FormCategoryProps> = ({
  category,
  buttonName,
  formAction,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormType>({
    mode: "onBlur",
  });

  const initialState = {
    message: null,
    errors: { name: undefined, slug: undefined, altText: undefined },
  };

  const [state, dispatch] = useFormState<CategoryFormState, FormData>(
    formAction,
    initialState
  );

  const onSubmit: SubmitHandler<CategoryFormType> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("description", data.description || "");
    formData.append("title", data.title || "");
    formData.append("content", data.content || "");
    if (data.image) {
      if (data.image instanceof FileList) {
        formData.append("image", data.image[0]);
      } else if (data.image instanceof File) {
        formData.append("image", data.image);
      }
    }
    if (data.altText) formData.append("altText", data.altText);
    try {
      dispatch(formData);
    } catch (error) {
      console.error("エラーが発生しました:", error);
      state.message = "エラーが発生しました。もう一度お試しください。";
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label="カテゴリ名"
          placeholder="カテゴリ名を入力してください。"
          defaultValue={category?.name}
          register={register}
          required={true}
          error={errors.name?.message || state.errors?.name}
        />
        <Input
          name="slug"
          label="スラッグ"
          placeholder={"スラッグを半角小文字の英数字で入力してください。"}
          defaultValue={category?.slug}
          register={register}
          required={true}
          error={errors.slug?.message || state.errors?.slug}
        />
        <TextArea
          name="description"
          label="カテゴリの説明(description)"
          placeholder={
            "カテゴリの説明(description)を入力してください。この項目は必須ではありません。"
          }
          defaultValue={category?.description ?? ""}
          register={register}
          error={errors.description?.message || state.errors?.description}
        />
        <p className="border-b my-5 pb-2 font-semibold">
          カテゴリを記事にする(カテゴリにコンテンツを表示)
        </p>
        <TextArea
          name="title"
          label="カテゴリのタイトル"
          placeholder={
            "カテゴリのタイトルを入力してください。カテゴリページにタイトルが表示されます。この項目は必須ではありません。"
          }
          defaultValue={category?.title || undefined}
          register={register}
          error={errors.title?.message || state.errors?.title}
        />
        <TextArea
          name="content"
          label="カテゴリの内容"
          placeholder={
            "カテゴリの内容を入力してください。カテゴリページに表示がされます。この項目は必須ではありません。"
          }
          defaultValue={category?.content || undefined}
          register={register}
          error={errors.content?.message || state.errors?.content}
        />
        <FormImage
          state={state}
          selectImage={category?.postImage}
          register={register}
          defaultValue={category?.postImage?.altText}
        />
        {state.message && <p className="text-red-500">{state.message}</p>}
        <Button color="blue" size="normal" className="rounded mt-4">
          {buttonName}
        </Button>
      </form>
    </FormContainer>
  );
};

export default FormCategory;
