"use client";

import { useState, ChangeEvent } from "react";
import Button from "../ui/Button";
import Form from "../ui/Form";
import TextArea from "../ui/TextArea";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { addMemo } from "@/app/action/action-memo";
import ButtonImage from "../ui/ButtonImage";
import AnimatedItem from "../lib/AnimatedItem";

type FormMemoProps = {
  buttonName: string;
  buttonName2: string;
  itineraryHomeId?: number | undefined;
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
  buttonName,
  buttonName2,
  itineraryHomeId,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleDeleteModal = () => setIsModalOpen((prev) => !prev);
  const closeModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };

  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<FormState, FormData>(
    addMemo,
    initialState
  );
  const [errorMessage, setErrorMessage] = useState<FormState>();

  const [inputValue, setInputValue] = useState<string>("");
  const [textAreaValue, setTextareaChange] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaChange(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await addMemo(state, formData);
    switch (result.message) {
      case "add":
        setInputValue("");
        setTextareaChange("");
        toast.success("メモを保存しました！");
        toggleDeleteModal();
        break;
      case "edit":
        toast.success("メモを編集しました！");
        router.replace(`/memorybook/${itineraryHomeId}/memo`);
        break;
      default:
        setErrorMessage(result);
        break;
    }
  };

  return (
    <>
      {buttonName === "追加" ? (
        <>
          <div className="w-full h-full">
            <ButtonImage icon="plus" size="footer" onClick={toggleDeleteModal}>
              {buttonName}
            </ButtonImage>
          </div>
        </>
      ) : (
        <>
          <Button onClick={toggleDeleteModal} color="blue" size="normal">
            {buttonName}
          </Button>
        </>
      )}
      {isModalOpen && (
        <AnimatedItem
          elementType="div"
          animation="fadeInVariants"
          className="bg-gray-400  bg-opacity-40 fixed z-50 w-full h-full flex justify-center items-center inset-0"
          onClick={closeModal}
        >
          <div className="flex items-center justify-center w-[620px]">
            <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-[620px]">
              <p className="text-center border-b pb-4 border-gray-300 text-gray-600 font-bold">
                メモのフォーム
              </p>
              <form onSubmit={handleSubmit} className="w-full py-3">
                <Form
                  label={"メモの見出し"}
                  name={"name"}
                  placeholder="メモの見出しを記載しましょう。"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                {errorMessage &&
                  errorMessage.errors &&
                  errorMessage.errors.name && (
                    <p className="text-red-500">{errorMessage.errors.name}</p>
                  )}
                <TextArea
                  label={"メモする内容"}
                  name={"content"}
                  placeholder="メモする内容を記載しましょう。"
                  value={textAreaValue}
                  onChange={handleTextareaChange}
                />
                <input
                  type="hidden"
                  name="itineraryHomeId"
                  value={itineraryHomeId}
                />
                {errorMessage && errorMessage.message !== "failure" && (
                  <p className="text-red-500">{errorMessage.message}</p>
                )}
                <Button color="blue" size="normal" className="rounded mt-4">
                  {buttonName2}
                </Button>
              </form>
            </div>
          </div>
        </AnimatedItem>
      )}
    </>
  );
};

export default FormMemoModal;
