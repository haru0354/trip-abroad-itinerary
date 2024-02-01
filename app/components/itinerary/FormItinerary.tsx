"use client";

import Form from "../Form";
import TextArea from "../TextArea";
import Date from "../Date";
import Time from "../Time";
import Button from "../Button";
import { useState, ChangeEvent } from "react";

type Itinerary = {
  id: number;
  date: string;
  time: string;
  name: string;
  content: string;
  hideContent: string;
  isShowContent: boolean;
};

type FormItineraryProps = {
  itinerary?: Itinerary | null;
  buttonName: string;
  formAction: (data: FormData) => Promise<void> | Promise<never> | null;
};

const FormItinerary: React.FC<FormItineraryProps> = ({
  itinerary,
  buttonName,
  formAction,
}) => {
  const [dateValue, setDateValue] = useState(itinerary?.date || "");
  const [timeValue, setTimeValue] = useState(itinerary?.time || "");
  const [inputValue, setInputValue] = useState(itinerary?.name || "");
  const [TextAreaValue, setTextAreaValue] = useState(itinerary?.content || "");
  const [hideTextAreaValue, setHideTextAreaValue] = useState(
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

  const addItinerary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    setDateValue("");
    setTimeValue("");
    setInputValue("");
    setTextAreaValue("");
    setHideTextAreaValue("");
  };

  return (
    <div>
      <h2 className="bg-blue-400 text-xl bold text-white rounded mt-10 mb-12 p-5">
        旅程表の追加
      </h2>
      <form action={formAction} onSubmit={addItinerary}>
        <Date value={dateValue} onChange={handleDateChange} />
        <Time value={timeValue} onChange={handleTimeChange} />
        <Form
          label={"目的"}
          placeholder={"飛行機・食事・観光など"}
          name={"name"}
          value={inputValue}
          onChange={handleInputChange}
        />
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
        <Button className="btn blue">{buttonName}</Button>
      </form>
    </div>
  );
};

export default FormItinerary;
