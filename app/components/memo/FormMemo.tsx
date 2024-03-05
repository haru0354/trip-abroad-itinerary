"use client";

import { useState, ChangeEvent } from "react";
import Button from "../ui/Button";
import Form from "../ui/Form";
import TextArea from "../ui/TextArea";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

type FormMemoProps = {
  memos?: Memo[] | undefined | null;
  memo?: Memo | null;
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
  itineraryHomeId?: number | undefined;
};

type Memo = {
  id: number;
  name: string;
  content: string;
}

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    content?: string[] | undefined;
    userId?: string[] | undefined;
  };
};

const FormMemo: React.FC<FormMemoProps> = ({
  memo,
  memos,
  buttonName,
  formAction,
  itineraryHomeId,
}) => {
  const router = useRouter();
  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );
  const [errorMessage, setErrorMessage] = useState<FormState>();

  const [inputValue, setInputValue] = useState<string>(memo?.name || "");
  const [textAreaValue, setTextareaChange] = useState<string>(
    memo?.content || ""
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
    switch (result.message) {
      case "add":
        setInputValue("");
        setTextareaChange("");
        toast.success("メモを保存しました！");
        break;
      case "edit":
        toast.success("メモを編集しました！");
        router.replace(`/travel_brochure/${itineraryHomeId}/memo`);
        break;
      default:
        setErrorMessage(result);
        break;
    }
  };

  return (
    <div>
      <h2 className="bg-blue-400 text-xl bold text-white rounded mt-10 mb-12 p-5">
        メモの追加
      </h2>
      <form onSubmit={handleSubmit}>
        <Form
          label={"メモの見出し"}
          name={"name"}
          placeholder="メモの見出しを記載しましょう。"
          value={inputValue}
          onChange={handleInputChange}
        />
        {errorMessage && errorMessage.errors && errorMessage.errors.name && (
          <p className="text-red-500">{errorMessage.errors.name}</p>
        )}
        <TextArea
          label={"メモする内容"}
          name={"content"}
          placeholder="メモする内容を記載しましょう。"
          value={textAreaValue}
          onChange={handleTextareaChange}
        />
        <input type="hidden" name="itineraryHomeId" value={itineraryHomeId} />
        {errorMessage && errorMessage.message !== "failure" && (
          <p className="text-red-500">{errorMessage.message}</p>
        )}
        <Button className="btn blue">{buttonName}</Button>
      </form>
    </div>
  );
};

export default FormMemo;
