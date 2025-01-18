"use client";

import { useFormState } from "react-dom";
import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import TextArea from "@/app/components/ui/TextArea";
import FormImage from "@/app/components/ui/FormImage";

type FormCategoryProps = {
  category?: (Category & { postImage: PostImage | null }) | null;
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
};

type Category = {
  name: string;
  slug: string;
  content: string | null;
  description: string | null;
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
    image?: string[] | undefined;
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
    errors: { name: undefined, slug: undefined, altText: undefined },
  };
  
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-blog-borderGray  rounded bg-white max-w-full">
          <form action={dispatch}>
            {state.message && <p className="text-red-500">{state.message}</p>}
            <Form
              name="name"
              label="カテゴリ名"
              placeholder={"カテゴリ名を入力してください。"}
              defaultValue={category?.name}
            />
            {state.errors && (
              <p className="text-red-500">{state.errors.name}</p>
            )}
            <Form
              name="slug"
              label="スラッグ"
              placeholder={
                "カテゴリのスラッグを半角小文字の英数字で入力してください。"
              }
              defaultValue={category?.slug}
            />
            {state.errors && (
              <p className="text-red-500">{state.errors.slug}</p>
            )}
            <TextArea
              name="description"
              label="カテゴリの説明(description)"
              placeholder={
                "カテゴリの説明(description)を入力してください。この項目は必須ではありません。"
              }
              defaultValue={category?.description ?? ""}
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
            />
            <TextArea
              name="content"
              label="カテゴリの内容"
              placeholder={
                "カテゴリの内容を入力してください。カテゴリページに表示がされます。この項目は必須ではありません。"
              }
              defaultValue={category?.content || undefined}
            />
            <FormImage
              selectImage={category?.postImage}
              state={state}
              label="画像の名前(alt)"
              placeholder="どんな画像か入力してください。検索エンジンが画像を認識するのに役立ちます"
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

export default FormCategory;
