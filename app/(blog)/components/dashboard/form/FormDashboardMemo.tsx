"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import FormContainer from "../../layout/dashboard/FormContainer";
import Input from "@/app/components/ui/form/Input";
import Button from "@/app/components/ui/Button";
import TextArea from "@/app/components/ui/form/TextArea";

import type { DashboardFormState } from "@/app/(blog)/types/formState";

type FormMemoProps = {
  dashboardMemo?: DashboardMemo | null;
  buttonName: string;
  formAction: (state: DashboardFormState, data: FormData) => Promise<DashboardFormState>;
};

type DashboardMemo = {
  id: number;
  name: string;
  content: string;
};

const FormDashboardMemo: React.FC<FormMemoProps> = ({
  dashboardMemo,
  buttonName,
  formAction,
}) => {
  const router = useRouter();
  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<DashboardFormState, FormData>(
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
      <FormContainer>
        <form action={dispatch}>
          <Input
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
