"use client";

import { useState, ChangeEvent } from "react";
import Button from "../ui/Button";
import Form from "../ui/Form";
import TextArea from "../ui/TextArea";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

type Memo = {
  id: number;
  name: string;
  content: string;
};

type FormMemoProps = {
  memo?: Memo | null;
  buttonName: string;
  userId?: number | undefined;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
};

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    content?: string[] | undefined;
    userId?: string[] | undefined;
  };
};

const FormMemoModal: React.FC<FormMemoProps> = ({
  memo,
  buttonName,
  formAction,
  userId,
}) => {
  const router = useRouter();
  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);
  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };

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
    if ("message" in result) {
      if (result.message === "add") {
        setInputValue("");
        setTextareaChange("");
        toast.success("メモを保存しました！");
      } else if (result.message === "edit") {
        toast.success("メモを編集しました！");
        router.replace("/travel_brochure/memo");
      } else if (result.message === "failure") {
        if (result.errors && result.errors.name) {
          setErrorMessage(result.errors.name[0]);
        }
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        {isDeleteModalOpen || (
          <Button onClick={toggleDeleteModal} className="btn blue">
            旅程を追加する
          </Button>
        )}
      </div>
      {isDeleteModalOpen && (
        <div
          className="bg-gray-200  bg-opacity-40 fixed z-50 w-full h-full flex justify-center items-center inset-0"
          onClick={closeModal}
        >
          <div className="bg-white">
            <form action={dispatch} onSubmit={handleSubmit}>
              <Form
                label={"メモの見出し"}
                name={"name"}
                placeholder="メモの見出しを記載しましょう。"
                value={inputValue}
                onChange={handleInputChange}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
        </div>
      )}
    </div>
  );
};

export default FormMemoModal;
