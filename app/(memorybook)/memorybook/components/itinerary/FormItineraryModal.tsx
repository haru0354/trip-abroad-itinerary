"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import Modal from "@/app/components/ui/Modal";
import Form from "@/app/components/ui/Form";
import TextArea from "@/app/components/ui/TextArea";
import Date from "@/app/components/ui/form/Date";
import Time from "@/app/components/ui/Time";
import Button from "@/app/components/ui/Button";
import FormImage from "@/app/components/ui/FormImage";

import type { ItineraryFormState } from "@/app/(memorybook)/memorybook/types/formState";

type FormItineraryProps = {
  buttonName: string;
  tripId: number | undefined;
  formAction: (
    state: ItineraryFormState,
    data: FormData
  ) => Promise<ItineraryFormState>;
  iconButton?: boolean;
};

const FormItineraryModal: React.FC<FormItineraryProps> = ({
  buttonName,
  tripId,
  formAction,
  iconButton = false,
}) => {
  const router = useRouter();
  const { closeModal } = useModal();

  const [dateValue, setDateValue] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [TextAreaValue, setTextAreaValue] = useState<string>("");
  const [hideTextAreaValue, setHideTextAreaValue] = useState<string>("");
  const [altTextValue, setAltTextValue] = useState<string>("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const initialState = {
    message: null,
    errors: {
      date: undefined,
      time: undefined,
      name: undefined,
      altText: undefined,
    },
  };

  const [state, dispatch] = useFormState<ItineraryFormState, FormData>(
    formAction,
    initialState
  );

  useEffect(() => {
    if (state.message === "add") {
      setDateValue("");
      setTimeValue("");
      setInputValue("");
      setTextAreaValue("");
      setHideTextAreaValue("");
      setAltTextValue("");
      setFormSubmitted((prev) => !prev);
      toast.success("旅程を保存しました！");
      closeModal();
      state.message = "";
    } else if (state.message === "edit") {
      toast.success("旅程を編集しました！");
      closeModal();
      state.message = "";
      router.replace(`/memorybook/${tripId}/itinerary/`);
    } else if (state.message === "failure") {
      toast.error("旅程の保存に失敗しました。");
    }
  }, [state.message]);

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

  return (
    <Modal maxWidth="max-w-[620px]" buttonName="追加" iconButton={iconButton}>
      <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
        旅程表のフォーム
      </p>
      <form action={dispatch} className="w-full py-3">
        <Date name="date" value={dateValue} onChange={handleDateChange} />
        {state.errors && state.errors.date && (
          <p className="text-red-500">{state.errors.date}</p>
        )}
        <Time value={timeValue} onChange={handleTimeChange} />
        {state.errors && state.errors.time && (
          <p className="text-red-500">{state.errors.time}</p>
        )}
        <Form
          label="目的（何をするのか）"
          placeholder="移動・食事・観光など"
          name="name"
          value={inputValue}
          onChange={handleInputChange}
        />
        {state.errors && state.errors.name && (
          <p className="text-red-500">{state.errors.name}</p>
        )}
        <TextArea
          label="補足情報"
          placeholder="観光地なら服装の注意。レストランなら食べる予定の料理名などメモを記載しましょう。"
          name="content"
          value={TextAreaValue}
          onChange={handleTextareaChange}
        />
        <TextArea
          label="補足情報2"
          placeholder="ボタンクリックで表示されるエリアです。電車なら乗り換え方法など必要な場面でのみ見たい情報を入力。"
          name="hideContent"
          value={hideTextAreaValue}
          onChange={handleHideTextareaChange}
        />
        <FormImage
          state={state}
          formSubmitted={formSubmitted}
          altTextValue={altTextValue}
          onChangeAltText={handleAltTextChange}
          label="画像の名前(何の画像)"
          placeholder="例)観光地の写真⇒観光地名を入力、料理の写真⇒料理名を入力"
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

export default FormItineraryModal;
