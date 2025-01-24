"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormContainer from "../../layout/FormContainer";
import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import TextArea from "@/app/components/ui/TextArea";
import HeadingTwo from "../../ui/dashboard/HeadingTwo";

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

  useEffect(() => {
    if (state.message === "add") {
      setInputValue("");
      setTextareaChange("");
      state.message = "";
      toast.success("メモを保存しました！");
    } else if (state.message === "edit") {
      toast.success("メモを編集しました！");
      state.message = "";
      router.replace("/dashboard");
    } else if (state.message === "failure") {
      toast.error("メモの保存に失敗しました。");
    }
  }, [state.message]);

  return (
    <>
      <HeadingTwo>メモの追加</HeadingTwo>
      <FormContainer>
        <form action={dispatch}>
          <Form
            label="メモの見出し"
            name="name"
            placeholder="メモの見出しを記載しましょう。"
            value={inputValue}
            onChange={handleInputChange}
          />
          {state.errors && <p className="text-red-500">{state.errors.name}</p>}
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
      </FormContainer>
    </>
  );
};

export default FormDashboardMemo;
