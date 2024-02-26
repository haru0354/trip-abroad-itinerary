"use client";

import Form from "../ui/Form";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import { useFormState } from "react-dom";

type Category = {
  name: string;
  slug: string;
  content: string | null;
  description: string;
};

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    slug?: string[] | undefined;
  };
};

type FormCategoryProps = {
  category?: Category | null;
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
};

const FormCategory: React.FC<FormCategoryProps> = ({
  category,
  buttonName,
  formAction,
}) => {
  const initialState = { message: null, errors: { name: undefined, slug: undefined, } };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );
  return (
    <>
      <form action={dispatch}>
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
          name={"content"}
          label={"カテゴリの内容"}
          placeholder={
            "カテゴリの内容を入力してください。カテゴリページに表示がされます。この項目は必須ではありません。"
          }
          defaultValue={category?.content || undefined}
        />
        <TextArea
          name={"description"}
          label={"カテゴリの説明(description)"}
          placeholder={
            "カテゴリの説明(description)を入力してください。この項目は必須ではありません。"
          }
          defaultValue={category?.description}
        />
        <Button className="px-16 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
          {buttonName}
        </Button>
      </form>
    </>
  );
};

export default FormCategory;
