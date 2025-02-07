"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

import toast from "react-hot-toast";
import Button from "@/app/components/ui/Button";
import Form from "@/app/components/ui/Form";
import TextArea from "@/app/components/ui/TextArea";

import type { MemoFormState } from "../../types/formState";

type FormMemoProps = {
  memos?: Memo[] | undefined | null;
  memo?: Memo | null;
  buttonName: string;
  formAction: (state: MemoFormState, data: FormData) => Promise<MemoFormState>;
  tripId?: number | undefined;
};

type Memo = {
  id: number;
  name: string;
  content: string;
};

const FormMemo: React.FC<FormMemoProps> = ({
  memo,
  buttonName,
  formAction,
  tripId,
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>(memo?.name || "");
  const [textAreaValue, setTextareaChange] = useState<string>(
    memo?.content || ""
  );

  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<MemoFormState, FormData>(
    formAction,
    initialState
  );

  useEffect(() => {
    if (state.message === "add") {
      setInputValue("");
      setTextareaChange("");
      toast.success("メモを保存しました！");
      state.message = "";
    } else if (state.message === "edit") {
      toast.success("メモを編集しました！");
      router.replace(`/memorybook/${tripId}/memo`);
      state.message = "";
    } else if (state.message === "failure") {
      toast.error("メモの保存に失敗しました。");
    }
  }, [state.message]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaChange(e.target.value);
  };

  return (
    <div>
      <h2 className="bg-itinerary-heading">メモの追加</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6 border-itinerary-borderGray rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
            メモのフォーム
          </p>
          <form action={dispatch} className="w-full py-3">
            <Form
              label="メモの見出し"
              name="name"
              placeholder="メモの見出しを記載しましょう。"
              value={inputValue}
              onChange={handleInputChange}
            />
            {state.errors && state.errors.name && (
              <p className="text-red-500">{state.errors.name}</p>
            )}
            <TextArea
              label="メモする内容"
              name="content"
              placeholder="メモする内容を記載しましょう。"
              value={textAreaValue}
              onChange={handleTextareaChange}
            />
            <input
              type="hidden"
              name="tripId"
              value={tripId}
            />
            {state.errors && state.message !== "failure" && (
              <p className="text-red-500">{state.message}</p>
            )}
            <Button color="blue" size="normal" className="rounded mt-4">
              {buttonName}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormMemo;
