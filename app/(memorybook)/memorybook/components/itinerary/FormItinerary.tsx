"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import FormLayout from "../layout/FormLayout";
import Input from "@/app/components/ui/form/Input";
import InputHidden from "@/app/components/ui/form/InputHidden";
import TextArea from "@/app/components/ui/form/TextArea";
import Date from "@/app/components/ui/form/Date";
import Time from "@/app/components/ui/form/Time";
import FormImage from "@/app/components/ui/form/FormImage";

import type { ItineraryFormState } from "@/app/(memorybook)/memorybook/types/formState";
import type { ItineraryFormType } from "../../types/formType";

type FormItineraryProps = {
  itinerary?: Itinerary | null;
  buttonName: string;
  formAction: (
    state: ItineraryFormState,
    data: FormData
  ) => Promise<ItineraryFormState>;
  tripId: number | undefined;
  modalId?: string;
};

type Itinerary = {
  id: number;
  date: string;
  time: string;
  name: string;
  content?: string | null;
  hideContent?: string | null;
  isShowContent: boolean;
  url?: string | null;
  altText?: string | null;
};

const FormItinerary: React.FC<FormItineraryProps> = ({
  itinerary,
  buttonName,
  formAction,
  tripId,
  modalId,
}) => {
  const modalLayout = modalId ? true : false;
  const router = useRouter();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItineraryFormType>({
    mode: "onBlur",
  });

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

  const onSubmit: SubmitHandler<ItineraryFormType> = (data) => {
    try {
      const formData = new FormData();
      formData.append("date", data.date);
      formData.append("time", data.time);
      formData.append("name", data.name);
      formData.append("content", data.content || "");
      formData.append("hideContent", data.hideContent || "");
      if (data.image) {
        if (data.image instanceof FileList) {
          formData.append("image", data.image[0]);
        } else if (data.image instanceof File) {
          formData.append("image", data.image);
        }
      }
      if (data.altText) formData.append("altText", data.altText);
      formData.append("tripId", data.tripId);

      dispatch(formData);
    } catch (error) {
      console.error("エラーが発生しました:", error);
      toast.error("エラーが発生しました。" + error);
    }
  };

  useEffect(() => {
    if (state.message === "add") {
      setFormSubmitted((prev) => !prev);
      toast.success("旅程を保存しました！");

      if (modalId) {
        closeModal(modalId);
      }
    } else if (state.message === "edit") {
      toast.success("旅程を編集しました！");

      if (modalId) {
        closeModal(modalId);
      }
      router.replace(`/memorybook/${tripId}/itinerary/`);
    }
  }, [state.message]);

  return (
    <FormLayout
      formTitle="旅程表のフォーム"
      buttonName={buttonName}
      onSubmit={handleSubmit(onSubmit)}
      modalLayout={modalLayout}
    >
      <Date
        label="日付"
        name="date"
        defaultValue={itinerary?.date}
        register={register}
        required={true}
        error={errors.date?.message || state.errors?.date}
      />
      <Time
        label="時間"
        name="time"
        defaultValue={itinerary?.time}
        register={register}
        required={true}
        error={errors.time?.message || state.errors?.time}
      />
      <Input
        label="目的（何をするのか）"
        name="name"
        placeholder="観光なら「観光地名」移動なら「電車名」など"
        defaultValue={itinerary?.name}
        register={register}
        required={true}
        error={errors.name?.message || state.errors?.name}
      />
      <TextArea
        label="補足情報"
        placeholder="観光地なら服装の注意。レストランなら食べる予定の料理名などメモを記載しましょう。"
        name="content"
        defaultValue={itinerary?.content}
        register={register}
      />
      <TextArea
        label="補足情報2"
        placeholder="ボタンクリックで表示されるエリアです。電車なら乗り換え方法など必要な場面でのみ見たい情報を入力。"
        name="hideContent"
        defaultValue={itinerary?.hideContent}
        register={register}
      />
      <FormImage
        state={state}
        selectImage={itinerary}
        formSubmitted={formSubmitted}
        register={register}
        defaultValue={itinerary?.altText}
      />
      <InputHidden name="tripId" value={tripId} register={register} />
      {state.message && state.message !== "edit" && state.message !== "add" && (
        <p className="text-red-500">{state.message}</p>
      )}
    </FormLayout>
  );
};

export default FormItinerary;
