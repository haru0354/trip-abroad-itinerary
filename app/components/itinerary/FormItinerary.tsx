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

type FormItineraryProps = {
  itinerary?: Itinerary | null;
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
  userId?: number | undefined;
};

type Itinerary = {
  id: number;
  date: string;
  time: string;
  name: string;
  content: string;
  hideContent: string;
  isShowContent: boolean;
};

type FormState = {
  message?: string | null;
  errors?: {
    date?: string[] | undefined;
    time?: string[] | undefined;
    name?: string[] | undefined;
    content?: string[] | undefined;
    hideContent?: string[] | undefined;
    userId?: string[] | undefined;
  };
};

const FormItinerary: React.FC<FormItineraryProps> = ({
  itinerary,
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
  const [dateErrorMessage, setDateErrorMessage] = useState<
    string | undefined
  >();
  const [timeErrorMessage, setTimeErrorMessage] = useState<
    string | undefined
  >();
  const [nameErrorMessage, setNameErrorMessage] = useState<
    string | undefined
  >();

  const [dateValue, setDateValue] = useState<string>(itinerary?.date || "");
  const [timeValue, setTimeValue] = useState<string>(itinerary?.time || "");
  const [inputValue, setInputValue] = useState<string>(itinerary?.name || "");
  const [TextAreaValue, setTextAreaValue] = useState<string>(
    itinerary?.content || ""
  );
  const [hideTextAreaValue, setHideTextAreaValue] = useState<string>(
    itinerary?.hideContent || ""
  );

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await formAction(state, formData);
    if ("message" in result) {
      if (result.message === "add") {
        setDateValue("");
        setTimeValue("");
        setInputValue("");
        setTextAreaValue("");
        setHideTextAreaValue("");
        toast.success("旅程を保存しました！");
      } else if (result.message === "edit") {
        toast.success("旅程を編集しました！");
        router.replace("/travel_brochure/itinerary");
      } else if (result.message === "failure") {
        if (result.errors) {
          if (result.errors.date) {
            setDateErrorMessage(result.errors.date[0]);
          }
          if (result.errors.time) {
            setTimeErrorMessage(result.errors.time[0]);
          }
          if (result.errors.name) {
            setNameErrorMessage(result.errors.name[0]);
          }
        }
      }
    }
  };

  return (
    <div id="add">
      <h2 className="bg-blue-400 text-xl bold text-white rounded mt-10 mb-12 p-5">
        旅程の追加
      </h2>
      <form action={dispatch} onSubmit={handleSubmit}>
        <Date name={"date"} value={dateValue} onChange={handleDateChange} />
        {dateErrorMessage && <p className="text-red-500">{dateErrorMessage}</p>}
        <Time value={timeValue} onChange={handleTimeChange} />
        {timeErrorMessage && <p className="text-red-500">{timeErrorMessage}</p>}
        <Form
          label={"目的"}
          placeholder={"飛行機・食事・観光など"}
          name={"name"}
          value={inputValue}
          onChange={handleInputChange}
        />
        {nameErrorMessage && <p className="text-red-500">{nameErrorMessage}</p>}
        <TextArea
          label={"補足情報"}
          placeholder={
            "観光地なら服装の注意。料理ならおすすめの料理などメモを記載しましょう。"
          }
          name={"content"}
          value={TextAreaValue}
          onChange={handleTextareaChange}
        />
        <TextArea
          label={"補足情報2"}
          placeholder={
            "ここに記載したのは最初は非常時でボタンをクリックで表示されます。旅程表とは関係のない観光地の情報や乗り換え方法など記載しましょう。"
          }
          name={"hideContent"}
          value={hideTextAreaValue}
          onChange={handleHideTextareaChange}
        />
        <input type="hidden" name="userId" value={userId} />
        <Button className="btn blue">{buttonName}</Button>
      </form>
    </div>
  );
};

export default FormItinerary;
