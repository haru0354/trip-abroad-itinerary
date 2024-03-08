"use client";

import Form from "../ui/Form";
import TextArea from "../ui/TextArea";
import Date from "../ui/Date";
import Time from "../ui/Time";
import Button from "../ui/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import FormImage from "../ui/FormImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

type FormItineraryProps = {
  buttonName: string;
  buttonName2: string;
  itineraryHomeId: number | undefined;
  userId: number | undefined;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
};

type FormState = {
  message?: string | null;
  errors?: {
    date?: string[] | undefined;
    time?: string[] | undefined;
    name?: string[] | undefined;
    altText?: string[] | undefined;
    image?: string[] | undefined;
  };
};

const FormItineraryModal: React.FC<FormItineraryProps> = ({
  buttonName,
  buttonName2,
  itineraryHomeId,
  userId,
  formAction,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleDeleteModal = () => setIsModalOpen((prev) => !prev);
  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };
  const initialState = {
    message: null,
    errors: {
      date: undefined,
      time: undefined,
      name: undefined,
      altText: undefined,
    },
  };

  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );
  const [errorMessage, setErrorMessage] = useState<FormState>();

  const [dateValue, setDateValue] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [TextAreaValue, setTextAreaValue] = useState<string>("");
  const [hideTextAreaValue, setHideTextAreaValue] = useState<string>("");
  const [altTextValue, setAltTextValue] = useState<string>("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  const handleHideTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setHideTextAreaValue(e.target.value);
  };

  const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAltTextValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await formAction(state, formData);
    switch (result.message) {
      case "add":
        setDateValue("");
        setTimeValue("");
        setInputValue("");
        setTextAreaValue("");
        setHideTextAreaValue("");
        setAltTextValue("");
        setFormSubmitted((prev) => !prev);
        toggleDeleteModal();
        toast.success("旅程を保存しました！");
        break;
      case "edit":
        toast.success("旅程を編集しました！");
        router.replace(`/travel_brochure/${itineraryHomeId}/itinerary/`);
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
            <Button onClick={toggleDeleteModal} className="btn-footer">
              <FontAwesomeIcon icon={faSquarePlus} />
              <span className="text-gray-500">{buttonName}</span>
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button
            onClick={toggleDeleteModal}
            className="block mx-auto px-16  mt-10 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900"
          >
            {buttonName}
          </Button>
        </>
      )}
      {isModalOpen && (
        <div
          className="bg-gray-200 bg-opacity-40 fixed z-50 w-full  flex justify-center items-center inset-0"
          onClick={closeModal}
        >
          <div className="flex items-center justify-center w-[620px]">
            <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-[620px] max-h-[80vh] overflow-y-auto">
              <p className="text-center border-b pb-4 border-gray-300 text-gray-600 font-bold">
                旅程表のフォーム
              </p>
              <form onSubmit={handleSubmit} className="w-full py-3">
                <Date
                  name={"date"}
                  value={dateValue}
                  onChange={handleDateChange}
                />
                {errorMessage &&
                  errorMessage.errors &&
                  errorMessage.errors.date && (
                    <p className="text-red-500">{errorMessage.errors.date}</p>
                  )}
                <Time value={timeValue} onChange={handleTimeChange} />
                {errorMessage &&
                  errorMessage.errors &&
                  errorMessage.errors.time && (
                    <p className="text-red-500">{errorMessage.errors.time}</p>
                  )}
                <Form
                  label={"目的（何をするのか）"}
                  placeholder={"移動・食事・観光など"}
                  name={"name"}
                  value={inputValue}
                  onChange={handleInputChange}
                />
                {errorMessage &&
                  errorMessage.errors &&
                  errorMessage.errors.name && (
                    <p className="text-red-500">{errorMessage.errors.name}</p>
                  )}
                <TextArea
                  label={"補足情報"}
                  placeholder={
                    "観光地なら服装の注意。レストランなら食べる予定の料理名などメモを記載しましょう。"
                  }
                  name={"content"}
                  value={TextAreaValue}
                  onChange={handleTextareaChange}
                />
                <TextArea
                  label={"補足情報2"}
                  placeholder={
                    "ボタンクリックで表示されるエリアです。電車なら乗り換え方法など必要な場面でのみ見たい情報を入力。"
                  }
                  name={"hideContent"}
                  value={hideTextAreaValue}
                  onChange={handleHideTextareaChange}
                />
                <FormImage
                  state={errorMessage}
                  formSubmitted={formSubmitted}
                  altTextValue={altTextValue}
                  onChangeAltText={handleAltTextChange}
                  label="画像の名前(何の画像)"
                  placeholder="例)観光地の写真⇒観光地名を入力、料理の写真⇒料理名を入力"
                />
                <input type="hidden" name="userId" value={userId} />
                <input
                  type="hidden"
                  name="itineraryHomeId"
                  value={itineraryHomeId}
                />
                {errorMessage && errorMessage.message !== "failure" && (
                  <p className="text-red-500">{errorMessage.message}</p>
                )}
                <Button className="block mx-auto px-16 py-3 mt-5 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
                  {buttonName2}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormItineraryModal;
