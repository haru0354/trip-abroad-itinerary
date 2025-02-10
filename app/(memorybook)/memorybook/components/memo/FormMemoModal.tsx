"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import Modal from "@/app/components/ui/Modal";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/form/Input";
import TextArea from "@/app/components/ui/form/TextArea";

import type { MemoFormState } from "../../types/formState";

type FormMemoProps = {
  buttonName: string;
  tripId: number | undefined;
  formAction: (state: MemoFormState, data: FormData) => Promise<MemoFormState>;
  iconButton?: boolean;
};

const FormMemoModal: React.FC<FormMemoProps> = ({
  buttonName,
  tripId,
  formAction,
  iconButton = false,
}) => {
  const router = useRouter();
  const { closeModal } = useModal();

  const [inputValue, setInputValue] = useState<string>("");
  const [textAreaValue, setTextareaChange] = useState<string>("");

  const initialState = {
    message: null,
    errors: { name: undefined,},
  };
  
  const [state, dispatch] = useFormState<MemoFormState, FormData>(
    formAction,
    initialState
  );

  useEffect(() => {
    if (state.message === "add") {
      setInputValue("");
      setTextareaChange("");
      closeModal();
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
    <Modal maxWidth="max-w-[620px]" buttonName="追加" iconButton={iconButton}>
      <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
        メモのフォーム
      </p>
      <form action={dispatch} className="w-full py-3">
        <Input
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
        <input type="hidden" name="tripId" value={tripId} />
        {state.errors && state.message !== "failure" && (
          <p className="text-red-500">{state.message}</p>
        )}
        <Button color="blue" size="normal" className="rounded mt-4">
          {buttonName}
        </Button>
      </form>
    </Modal>
  );
};

export default FormMemoModal;
