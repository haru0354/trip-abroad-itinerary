"use client";

import { useState, ChangeEvent } from "react";
import Button from "../ui/Button";
import Form from "../ui/Form";
import TextArea from "../ui/TextArea";
import toast from "react-hot-toast";

type Memo = {
  id: number;
  name: string;
  content: string;
};

type FormMemoProps = {
  memo?: Memo | null;
  buttonName: string;
  formAction?: (data: FormData) => Promise<void> | Promise<never> 
  userId?: number | undefined;
};

const FormMemo: React.FC<FormMemoProps> = ({
  memo,
  buttonName,
  formAction,
  userId,
}) => {
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

  const addMemoClear = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    setInputValue("");
    setTextareaChange("");
    toast.success("メモを保存しました！");
  };

  return (
    <div>
      <h2 className="bg-blue-400 text-xl bold text-white rounded mt-10 mb-12 p-5">
        メモの追加
      </h2>
      <form action={formAction} onSubmit={addMemoClear}>
        <Form
          label={"メモの見出し"}
          name={"name"}
          placeholder="メモの見出しを記載しましょう。"
          value={inputValue}
          onChange={handleInputChange}
        />
        <TextArea
          label={"メモする内容"}
          name={"content"}
          placeholder="メモする内容を記載しましょう。"
          value={textAreaValue}
          onChange={handleTextareaChange}
        />
        <input type="hidden" name="userId" value={userId} />
        <Button className="btn blue">{buttonName}</Button>
      </form>
    </div>
  );
};

export default FormMemo;
