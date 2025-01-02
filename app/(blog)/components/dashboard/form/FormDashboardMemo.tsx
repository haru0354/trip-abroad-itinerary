"use client";

import { useState, ChangeEvent } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/app/components/ui/Button";
import Form from "@/app/components/ui/Form";
import TextArea from "@/app/components/ui/TextArea";

type FormMemoProps = {
  dashboardMemo?: DashboardMemo | null;
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
};

type DashboardMemo = {
  id: number;
  name: string;
  content: string;
};

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    content?: string[] | undefined;
  };
};

const FormDashboardMemo: React.FC<FormMemoProps> = ({
  dashboardMemo,
  buttonName,
  formAction,
}) => {
  const router = useRouter();
  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [inputValue, setInputValue] = useState<string>(
    dashboardMemo?.name || ""
  );
  const [textAreaValue, setTextareaChange] = useState<string>(
    dashboardMemo?.content || ""
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaChange(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await formAction(state, formData);
    if ("message" in result) {
      if (result.message === "add") {
        setInputValue("");
        setTextareaChange("");
        toast.success("メモを保存しました！");
      } else if (result.message === "edit") {
        toast.success("メモを編集しました！");
        router.replace("/dashboard");
      } else if (result.message === "failure") {
        if (result.errors && result.errors.name) {
          setErrorMessage(result.errors.name[0]);
        }
      }
    }
  };

  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        メモの追加
      </h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-full">
          <form action={dispatch} onSubmit={handleSubmit}>
            <Form
              label="メモの見出し"
              name="name"
              placeholder="メモの見出しを記載しましょう。"
              value={inputValue}
              onChange={handleInputChange}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <TextArea
              label="メモする内容"
              name="content"
              placeholder="メモする内容を記載しましょう。"
              value={textAreaValue}
              onChange={handleTextareaChange}
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

export default FormDashboardMemo;
