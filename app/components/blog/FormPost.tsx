"use client";

import TextArea from "@/app/components/ui/TextArea";
import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import Select from "../ui/Select";
import { useFormState } from "react-dom";

type FormPostProps = {
  post?: Post & { category: Category } | null;
  categories?: Category[] | null;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
  buttonName: string;
};

type Category = {
  id: number;
  name: string;
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
    },
  };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );
    const category = post?.category;

  return (
    <>
      <form action={dispatch}>
        <Form
          name={"title"}
          label={"記事のタイトル"}
          defaultValue={post?.title}
          placeholder={"記事のタイトルを31文字を目安に入力してください。"}
        />
        {state.errors && <p className="text-red-500">{state.errors.title}</p>}
        <Select label={"カテゴリ"} name={"categoryId"} categories={categories} 
        defaultValue={category?.id}/>
        <Form
          name={"slug"}
          label={"スラッグ"}
          defaultValue={post?.slug}
          placeholder={"記事のスラッグを入力してください。"}
        />
        {state.errors && <p className="text-red-500">{state.errors.slug}</p>}
        <TextArea
          name={"content"}
          label={"記事の内容"}
          defaultValue={post?.content}
          placeholder={"記事の内容をこちらに入力してください。"}
        />
        {state.errors && <p className="text-red-500">{state.errors.content}</p>}
        <TextArea
          name={"description"}
          label={"記事の説明(description)"}
          defaultValue={post?.description}
          placeholder={"120文字を目安に記入してください。"}
        />
        {state.errors && <p className="text-red-500">{state.errors.description}</p>}
        <Button className="px-16 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
          {buttonName}
        </Button>
      </form>
    </>
  );
};

export default FormPost;
